import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
interface CameraProps {
  onCapture: (photo: File) => void; // Alterado para aceitar File
  facingMode?: "user" | "environment"; // Define a câmera: frontal ou traseira
  className?: string; // Classe para estilização
}

export const Camera = ({
  onCapture,
  facingMode = "environment", // Câmera traseira por padrão
  className = "",
}: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Solicita permissão para acessar a câmera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const userMedia = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode },
        });
        setStream(userMedia);
        if (videoRef.current) {
          videoRef.current.srcObject = userMedia;
        }
        setError(null);
      } catch (err) {
        setError("Não foi possível acessar a câmera.");
        console.error("Erro ao acessar a câmera:", err);
      }
    };

    startCamera();

    return () => {
      // Para o uso da câmera quando o componente é desmontado
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
    };
  }, []);

  // Captura uma imagem do vídeo
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL("image/png");
      const generedIdImage = uuidv4()

      // Converter DataURL para File
      fetch(photoDataUrl)
        .then((res) => res.blob()) // Obtém o blob da imagem
        .then((blob) => {
          const file = new File([blob], `photo-${generedIdImage}.png`, {
            type: "image/png",
          });
          onCapture(file); // Passa o File para o callback
        })
        .catch((err) =>
          console.error("Erro ao converter imagem para File:", err)
        );
    }
  };

  return (
    <div className={`relative ${className}`}>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-auto"
        ></video>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        <button
          onClick={capturePhoto}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Capturar Foto
        </button>
      </div>
    </div>
  );
};
