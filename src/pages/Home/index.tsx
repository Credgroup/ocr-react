import useAuthStore from "@/stores/authentication";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthType, Doc } from "@/types";
import { log } from "@/lib/utils";
import useDocStore from "@/stores/useDocStore";
import useThemeStore from "@/stores/useThemeStore";
import { v4 as uuidv4 } from "uuid";

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
  // const url = {
  //   hostname: window.location.hostname,
  //   params:
  //     "?info=%7B%22nome%22%3A%22Lucas%20iFood%22%2C%22idSegurado%22%3A29573%2C%22idSeguro%22%3A1565470%2C%22idSinistroCobertura%22%3A1007%2C%22idSinistro%22%3A16%2C%22idUsuario%22%3A1005%7D&docs=%5B%7B%22Fixo%22%3Afalse%2C%22Nome%22%3A%22Boletim%20de%20Ocorrencia%20%22%2C%22Obrigatorio%22%3Afalse%2C%22CampoApi%22%3A%22boletim_ocorrencia%22%2C%22ObrigatorioInicial%22%3Afalse%2C%22ModelExtrairOcr%22%3Anull%2C%22ModelClassificarOcr%22%3Anull%2C%22TpDocumento%22%3Anull%2C%22CamposExtrairOcr%22%3Anull%2C%22TipoDocOcr%22%3Anull%2C%22ChaveDocumento%22%3Anull%7D%2C%7B%22Fixo%22%3Afalse%2C%22Nome%22%3A%22Comprovante%20de%20residencia%20%28terceiro%29%22%2C%22Obrigatorio%22%3Afalse%2C%22CampoApi%22%3A%22comprovante_terceiro_residencia%22%2C%22ObrigatorioInicial%22%3Afalse%2C%22ModelExtrairOcr%22%3Anull%2C%22ModelClassificarOcr%22%3Anull%2C%22TpDocumento%22%3Anull%2C%22CamposExtrairOcr%22%3Anull%2C%22TipoDocOcr%22%3Anull%2C%22ChaveDocumento%22%3Anull%7D%2C%7B%22Fixo%22%3Afalse%2C%22Nome%22%3A%22Atestado%20M%5Cu00E9dico%20com%20Informacao%20do%20Periodo%20Afastamento%22%2C%22Obrigatorio%22%3Afalse%2C%22CampoApi%22%3A%22atestado_periodo_afastamento%22%2C%22ObrigatorioInicial%22%3Afalse%2C%22ModelExtrairOcr%22%3Anull%2C%22ModelClassificarOcr%22%3Anull%2C%22TpDocumento%22%3Anull%2C%22CamposExtrairOcr%22%3Anull%2C%22TipoDocOcr%22%3Anull%2C%22ChaveDocumento%22%3Anull%7D%2C%7B%22Fixo%22%3Afalse%2C%22Nome%22%3A%22Complementar%22%2C%22Obrigatorio%22%3Afalse%2C%22CampoApi%22%3A%22complementar%22%2C%22ObrigatorioInicial%22%3Afalse%2C%22ModelExtrairOcr%22%3Anull%2C%22ModelClassificarOcr%22%3Anull%2C%22TpDocumento%22%3Anull%2C%22CamposExtrairOcr%22%3Anull%2C%22TipoDocOcr%22%3Anull%2C%22ChaveDocumento%22%3Anull%7D%5D&theme=%7B%22headerStyles%22%3A%7B%22backgroundType%22%3A%22color%22%2C%22backgroundColor%22%3A%22%23ff0000%22%2C%22avatarBackground%22%3A%22%23f7f7f7%22%2C%22avatarBorder%22%3A%22%23c7c7c7%22%2C%22avatarTextColor%22%3A%22%23ff0000%22%7D%2C%22pageContent%22%3A%7B%22buttonColor%22%3A%22%23ff0000%22%2C%22textButtonColor%22%3A%22%23ffffff%22%7D%2C%22footerStyles%22%3A%7B%22backgroundColor%22%3A%22%23ededed%22%2C%22textColor%22%3A%22%23525252%22%2C%22titleColor%22%3A%22%23ff0000%22%2C%22logoImage%22%3A%22https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F90%2FIFood_logo.svg%2F1280px-IFood_logo.svg.png%22%2C%22address%22%3A%22Rua%20Ifood%20Pra%20Toda%20Hora%22%2C%22contacts%22%3A%7B%220%22%3A%7B%22content%22%3A%22111111111111111%22%7D%2C%221%22%3A%7B%22content%22%3A%22contato%40gmail.com%22%7D%7D%7D%7D",
  // };

  const enviroment = import.meta.env.VITE_ENVIRONMENT_VARIABLE;
  const appVersion = import.meta.env.VITE_IMAGE_VERSION;

  useEffect(() => {
    // Capturar os parâmetros de auth da URL
    if (authParams) {
      console.log(authParams);
      let authParamsObj = JSON.parse(decodeURIComponent(authParams));
      const authObj: AuthType = {
        name: authParamsObj.nome,
        idSegurado: authParamsObj.idSegurado,
        idSeguro: authParamsObj.idSeguro,
        idSinistroCobertura: authParamsObj.idSinistroCobertura,
        idSinistro: authParamsObj.idSinistro,
        idUsuario: authParamsObj.idUsuario,
        nmCobertura: authParamsObj.nmCobertura,
        dtCobertura: authParamsObj.dtCobertura,
      };

      log("Parâmetro auth:", authObj);
      setAuth(authObj);
    }

    if (docsParam) {
      const docs = JSON.parse(decodeURIComponent(docsParam));
      docs.forEach((item: Doc) => {
        item.id = uuidv4();
        item.statusUpload = null;
      });
      setDocs(docs);
      log("Parâmetro de docs:", docs);
    }

    if (themeParams) {
      console.log("esse é o parametro theme");
      console.log({ themeParams });
      const themeObj = JSON.parse(decodeURIComponent(themeParams));
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
    }

    redirect();
  }, []);

  const redirect = () => {
    navigate("/docs", { replace: true });
  };

  return (
    <>
      <h1>
        {enviroment} - v{appVersion}
        {/* <a href={`http://${url.hostname}/${url.params}`} target="_blank" className="underline text-blue-400">
          {url.hostname}
        </a> */}
      </h1>
    </>
  );
}
