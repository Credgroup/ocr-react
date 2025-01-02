import { useEffect, useRef, useState } from "react";

interface CameraProps {
  onCapture: (photo: string) => void; // Callback para devolver a foto capturada
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
  const [currentFacingMode, setCurrentFacingMode] = useState(facingMode);

  // Solicita permissão para acessar a câmera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const userMedia = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: currentFacingMode },
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
    };
  }, [currentFacingMode]);

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
      const photo = canvas.toDataURL("image/png");
      onCapture(photo); // Retorna a foto para o callback
    }
  };

  // Alterna entre a câmera frontal e traseira
  const toggleCamera = () => {
    setCurrentFacingMode((prev) => (prev === "user" ? "environment" : "user"));
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
        <button
          onClick={toggleCamera}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Alternar Câmera
        </button>
      </div>
    </div>
  );
};
