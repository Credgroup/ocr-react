import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

interface CameraProps {
  onPhotoTaken?: (photo: string) => void; // Callback para enviar a foto capturada
  deviceId?: string; // ID do dispositivo (frontal ou traseira)
  className?: string; // Classes para estilização
}

export function Camera({ onPhotoTaken, deviceId, className }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Solicita permissão para usar a câmera
  useEffect(() => {
    const requestPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        setError(null);
      } catch (err: any) {
        setHasPermission(false);
        setError(
          err.name === "NotAllowedError"
            ? "Permissão negada para usar a câmera."
            : "Erro ao acessar a câmera."
        );
      }
    };

    requestPermission();

    return () => {
      // Libera recursos quando o componente é desmontado
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      });
    };
  }, []);

  // Captura a foto
  const takePhoto = useCallback(() => {
    if (webcamRef.current) {
      const photo = webcamRef.current.getScreenshot();
      if (photo && onPhotoTaken) {
        onPhotoTaken(photo);
      }
    }
  }, [onPhotoTaken]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!hasPermission) {
    return <div className="text-yellow-500">Aguardando permissão...</div>;
  }

  return (
    <div className={className}>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{
          deviceId: deviceId ? { exact: deviceId } : undefined,
        }}
        className="rounded-md border border-gray-300"
      />
      <button
        onClick={takePhoto}
        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Tirar Foto
      </button>
    </div>
  );
}
