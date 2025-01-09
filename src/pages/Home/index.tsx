import useAuthStore from "@/stores/authentication";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthType } from "@/types";
import { log } from "@/lib/utils";
import useDocStore from "@/stores/useDocStore";
import useThemeStore from "@/stores/useThemeStore";

// const videoConstraints = {
//   facingMode: { exact: "environment" },
// };

export default function Home() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setDocs = useDocStore((state) => state.setDocs);
  const setHeaderStyles = useThemeStore((state) => state.setHeaderStyles);
  const setFooterStyles = useThemeStore((state) => state.setFooterStyles);
  const setFooterContent = useThemeStore((state) => state.setFooterContent);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const authParams = params.get("auth");
  const docsParam = params.get("docs");
  const themeParams = params.get("theme");
  const url = {
    hostname:window.location.hostname,
    params: "auth=%7B%22name%22%3A%22Renan%20Lima%22%2C%22id%22%3A123%7D&docs=%5B%7B%22id%22%3A%221%22%2C%22title%22%3A%22RG%20%28Frente%20e%20Verso%29%22%2C%22description%22%3A%22Fa%C3%A7a%20o%20upload%20do%20seu%20RG%22%2C%22file%22%3Anull%7D%2C%7B%22id%22%3A%222%22%2C%22title%22%3A%22Protocolo%20de%20Atendimento%22%2C%22description%22%3A%22Envie%20o%20protocolo%20recebido%20na%20solicita%C3%A7%C3%A3o%22%2C%22file%22%3Anull%7D%2C%7B%22id%22%3A%223%22%2C%22title%22%3A%22Carteira%20do%20Posto%22%2C%22description%22%3A%22Envie%20a%20carteira%20do%20posto%20de%20atendimento%22%2C%22file%22%3Anull%7D%5D&theme=%7B%22headerStyles%22%3A%7B%22backgroundType%22%3A%22img%22%2C%22background%22%3A%22https%3A%2F%2Fwkfkeepinsmarsh.blob.core.windows.net%2Farquivamento%2Fdocumentos%2Fmulticanal%2Fwhatsapp%2Finteracoes%2F15001%2Fbackground1.png%22%7D%2C%22footerStyles%22%3A%7B%22backgroundColor%22%3A%22%23f0f0f0%22%2C%22backgroundImage%22%3A%22https%3A%2F%2Fwkfkeepinsmarsh.blob.core.windows.net%2Farquivamento%2Fdocumentos%2Fmulticanal%2Fwhatsapp%2Finteracoes%2F15001%2Fbackground1.png%22%2C%22textColor%22%3A%22%23000000%22%2C%22titleColor%22%3A%22%230064ff%22%7D%2C%22content%22%3A%7B%22logoImage%22%3A%22https%3A%2F%2Fwkfkeepinsmarsh.blob.core.windows.net%2Farquivamento%2Fdocumentos%2Fmulticanal%2Fwhatsapp%2Finteracoes%2F15001%2Flogo2.png%22%2C%22address%22%3A%22Endere%C3%A7o%20da%20Keepins%22%2C%22contacts%22%3A%5B%7B%22type%22%3A%22telefone%22%2C%22content%22%3A%22%2811%29%204000-0000%22%7D%2C%7B%22type%22%3A%22email%22%2C%22content%22%3A%22contato%40empresa.com%22%7D%5D%7D%7D"
  }
  const enviroment = import.meta.env.VITE_ENVIRONMENT_VARIABLE;
  const appVersion = import.meta.env.VITE_IMAGE_VERSION;

  useEffect(() => {
    // Capturar os parâmetros de auth da URL
    if (authParams) {
      let authParamsObj = JSON.parse(authParams);
      const authObj: AuthType = {
        name: authParamsObj.name,
        id: authParamsObj.id,
      };

      log("Parâmetro auth:", authObj);
      setAuth(authObj);
    }

    if (docsParam) {
      const docs = JSON.parse(decodeURIComponent(docsParam));
      setDocs(docs);
      log("Parâmetro de docs:", docs);
    }

    if (themeParams) {
      const themeObj = JSON.parse(decodeURIComponent(themeParams));

      if (themeObj.headerStyles) {
        setHeaderStyles(themeObj.headerStyles); // Define os estilos do Header
      }

      if (themeObj.footerStyles) {
        setFooterStyles(themeObj.footerStyles); // Define os estilos do Footer
      }

      if (themeObj.content) {
        setFooterContent(themeObj.content);
      }

      log("Parâmetro de tema:", themeObj);
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
        <Link to={{search:url.params}} className="underline text-blue-400">{url.hostname}</Link>
      </h1>
    </>
  );
}
