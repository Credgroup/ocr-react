import useAuthStore from "@/stores/authentication";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthType } from "@/types";
import { log } from "@/lib/utils";
import useDocStore from "@/stores/useDocStore";
import useThemeStore from "@/stores/useThemeStore";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { CameraModal } from "@/components/CameraModal";

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
  const [photo, setPhoto] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const cameraRef = useRef<any>(null);

  const enviroment = import.meta.env.VITE_ENVIRONMENT_VARIABLE;
  const appVersion = import.meta.env.VITE_IMAGE_VERSION;
  const handleTakePhoto = () => {
    capture();
  };

  const capture = useCallback(() => {
    if (cameraRef.current) {
      const imageSrc = cameraRef.current.getScreenshot();
      console.log(imageSrc);
      setPhoto(imageSrc);
    }
  }, []);

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
      </h1>
      <>
        <Webcam
          ref={cameraRef}
          width={300}
          height={450}
          screenshotFormat="image/png"
          videoConstraints={{
            facingMode: { exact: "environment" },
          }}
          className="border border-red-400"
        />
        <Button onClick={handleTakePhoto}>Tirar Foto</Button>
        {photo && (
          <img
            src={photo}
            alt="Preview da Foto"
            className="w-full h-64 object-contain bg-gray-200"
          />
        )}
      </>

      <CameraModal isModalOpen={open} setIsModalOpen={setOpen} />
      <button onClick={() => setOpen(true)}>abrir</button>
    </>
  );
}
