import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useAuthStore from "@/stores/authentication";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthType, Doc } from "@/types";
import { decrypt, formatDate, log } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import fetchThemeApi from "@/api/FetchThemeApi";
import fetchDocsApi from "@/api/FectchDocsApi";
import useThemeStore, { stylesTheme } from "@/stores/useThemeStore";
import useDocStore from "@/stores/useDocStore";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const auth = useAuthStore((state) => state.auth);
  const setHeaderStyles = useThemeStore((state) => state.setHeaderStyles);
  const setFooterStyles = useThemeStore((state) => state.setFooterStyles);
  const setPageContent = useThemeStore((state) => state.setPageContent);
  const headerStyles = useThemeStore((state) => state.headerStyles);
  const setDocs = useDocStore((state) => state.setDocs);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const authParams = params.get("info");
  const [authError, setAuthError] = useState(false)

  const enviroment = import.meta.env.VITE_ENVIRONMENT_VARIABLE;
  const appVersion = import.meta.env.VITE_IMAGE_VERSION;

  useEffect(() => {
    if (authParams) {
      setAuthError(false)
      try {
        log("parametro info:")
        const authParamsDecrypted = decrypt(authParams);
        log(authParamsDecrypted)
        const authParamsObj = JSON.parse(authParamsDecrypted);
        log(authParamsObj);
        const authObj: AuthType = {
          name: authParamsObj.nome,
          idSegurado: authParamsObj.idSegurado,
          idSeguro: authParamsObj.idSeguro,
          idSinistroCobertura: authParamsObj.idSinistroCobertura,
          idSinistro: authParamsObj.idSinistro,
          idUsuario: authParamsObj.idUsuario,
          nmCobertura: authParamsObj.nmCobertura,
          docsId: authParamsObj.docs,
          theme: authParamsObj.theme,
          dtCobertura: formatDate(authParamsObj.dtCobertura),
        };

        log("Parâmetro auth:", authObj);
        setAuth(authObj);
      } catch (error) {
        log(error);
        setAuthError(true)
        toast({
          title: "Algum erro aconteceu",
          description: "O parâmetro info está com algum problema",
          variant: "destructive",
        });
      }
    }
  }, [authParams, setAuth]);

  // Consulta de tema (Theme)
  const {
    data: theme,
    isLoading: themeLoading,
    isError: themeError,
    isSuccess: themeSuccess,
    error: themeErrorObj,
  } = useQuery({
    queryKey: ["theme", auth],
    queryFn: () => {
      if (auth) {
        return fetchThemeApi({
          idwhitelabel: auth.theme,
          idusuario: auth.idUsuario,
        });
      }
    },
    enabled: !!auth,
    onSuccess: (themeData: any) => {
      log(themeData);
      setHeaderStyles(themeData.headerStyles);
      setFooterStyles(themeData.footerStyles);
      setPageContent(themeData.pageContent);
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity, 
  } as UseQueryOptions<any, Error, stylesTheme>);

  // Consulta de documentos (Docs)
  const {
    data: docs,
    isLoading: docsLoading,
    isError: docsError,
    isSuccess: docsSuccess,
    error: docsErrorObj,
  } = useQuery({
    queryKey: ["docs", headerStyles],
    queryFn: () => {
      if (headerStyles && auth) {
        return fetchDocsApi({
          idsisnistrocobertura: auth.docsId,
          idusuario: auth.idUsuario,
        });
      }
    },
    enabled: themeSuccess && !!headerStyles,
    onSuccess: (docsData: Doc[]) => {
      if (docsData) {
        log(docsData);
        setDocs(docsData);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity, 
  } as UseQueryOptions<any, Error, Doc[]>);

  useEffect(() => {
    if (themeSuccess && theme) {
      log(theme);
      setHeaderStyles(theme.headerStyles);
      setFooterStyles(theme.footerStyles);
      setPageContent(theme.pageContent);
    }
  }, [themeSuccess]);

  useEffect(() => {
    if (docsSuccess && docs) {
      log("Docs antes de ter id proprio");
      log(docs);
      docs.forEach((item) => {
        item.id = uuidv4();
      });
      setDocs(docs);
      log("Depois");
      log(docs);
      redirect();
    }
  }, [docsSuccess]);

  if (themeErrorObj) {
    log(themeErrorObj);
  }

  const redirect = () => {
    navigate("/docs", { replace: true });
  };

  return (
    <>
      {(themeLoading || docsLoading) && (
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <div className="flex justify-center items-center gap-4">
            <Loader />
            <p className="text-black-400 font-semibold text-lg">
              Carregando seus dados
            </p>
          </div>
          <span className="fixed bottom-6 text-black-100 capitalize">
            {enviroment} - v{appVersion}
          </span>
        </div>
      )}
      {(docsError || themeError) && (
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <p className="text-black-400 font-semibold text-lg">
            Falha ao carregar dados
          </p>
          {docsErrorObj && (
            <p>
              {docsErrorObj?.name}: {docsErrorObj?.message}
            </p>
          )}
          {themeErrorObj && (
            <p>
              {themeErrorObj.name}: {themeErrorObj?.message}
            </p>
          )}
          <span className="fixed bottom-6 text-black-100 capitalize">
            {enviroment} - v{appVersion}
          </span>
        </div>
      )}
      {
        authError && (
          <div className="w-full h-screen flex justify-center items-center flex-col">
          <div className="flex justify-center items-center gap-4">
            <p className="text-black-400 font-semibold text-lg text-center">
              Aconteceu algum problema na hora de processar seus dados.
            </p>
          </div>
          <span className="fixed bottom-6 text-black-100 capitalize">
            {enviroment} - v{appVersion}
          </span>
        </div>
        )
      }
    </>
  );
}
