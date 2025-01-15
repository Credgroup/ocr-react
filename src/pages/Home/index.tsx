import useAuthStore from "@/stores/authentication";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthType, Doc } from "@/types";
import { decrypt, formatDate, log } from "@/lib/utils";
import useDocStore from "@/stores/useDocStore";
import useThemeStore from "@/stores/useThemeStore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";

export default function Home() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setDocs = useDocStore((state) => state.setDocs);
  const setHeaderStyles = useThemeStore((state) => state.setHeaderStyles);
  const setFooterStyles = useThemeStore((state) => state.setFooterStyles);
  const setPageContent = useThemeStore((state) => state.setPageContent);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const authParams = params.get("info");
  const docsParam = params.get("docs");
  const themeParams = params.get("theme");

  const enviroment = import.meta.env.VITE_ENVIRONMENT_VARIABLE;
  const appVersion = import.meta.env.VITE_IMAGE_VERSION;

  useEffect(() => {
    let vrfy = 0;
    // Capturar os parâmetros de auth da URL
    if (authParams) {
      try {
        const authParamsDecrypted = decrypt(authParams);
        const authParamsObj = JSON.parse(authParamsDecrypted);

        const authObj: AuthType = {
          name: authParamsObj.nome,
          idSegurado: authParamsObj.idSegurado,
          idSeguro: authParamsObj.idSeguro,
          idSinistroCobertura: authParamsObj.idSinistroCobertura,
          idSinistro: authParamsObj.idSinistro,
          idUsuario: authParamsObj.idUsuario,
          nmCobertura: authParamsObj.nmCobertura,
          dtCobertura: formatDate(authParamsObj.dtCobertura),
        };

        log("Parâmetro auth:", authObj);
        setAuth(authObj);
        vrfy++;
      } catch (error) {
        console.log(error);
        toast({
          title: "Algum erro aconteceu",
          description: "O parâmetro info está com algum problema",
        });
      }
    }

    if (docsParam) {
      try {
        const docsParamDecrypted = decrypt(docsParam);
        const docs = JSON.parse(docsParamDecrypted);
        // return
        // const docs = JSON.parse(decodeURIComponent(docsParam));
        docs.forEach((item: Doc) => {
          item.id = uuidv4();
          item.statusUpload = null;
        });
        setDocs(docs);
        log("Parâmetro de docs:", docs);
        vrfy++;
      } catch (error) {
        console.log(error);
        toast({
          title: "Algum erro aconteceu",
          description: "O parâmetro docs está com algum problema",
        });
      }
    }

    if (themeParams) {
      try {
        const themeParamsDecrypted = decrypt(themeParams);
        const themeObj = JSON.parse(themeParamsDecrypted);

        console.log({ themeObj });
        if (themeObj.headerStyles) {
          setHeaderStyles(themeObj.headerStyles); // Define os estilos do Header
        }

        if (themeObj.footerStyles) {
          setFooterStyles(themeObj.footerStyles); // Define os estilos do Footer
        }

        if (themeObj.pageContent) {
          setPageContent(themeObj.pageContent);
        }

        log("Parâmetro de tema:", themeObj);
        vrfy++;
      } catch (error) {
        log(error);
        toast({
          title: "Algum erro aconteceu",
          description: "O parâmetro theme está com algum problema",
          variant: "destructive",
        });
      }
    }

    if (vrfy == 3) {
      redirect();
    }
  }, []);

  const redirect = () => {
    navigate("/docs", { replace: true });
  };

  return (
    <>
      <h1>
        {enviroment} - v{appVersion}
        {(enviroment == "development" || enviroment == "homologation") && (
          <p>Você está em {enviroment}</p>
        )}
      </h1>
    </>
  );
}
