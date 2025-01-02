import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

interface CameraModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function CameraModal({ isModalOpen, setIsModalOpen }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para solicitar permissão e iniciar a stream da câmera
  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      setError(null); // Reseta o erro caso exista
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      setHasPermission(false);
      let errorMessage = "Erro desconhecido ao acessar a câmera.";

      // Tratamento de erros específicos
      if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        errorMessage = "Nenhuma câmera foi encontrada.";
      } else if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        errorMessage = "Você deve conceder permissão para acessar a câmera.";
      } else if (
        err.name === "NotReadableError" ||
        err.name === "TrackStartError"
      ) {
        errorMessage =
          "Houve um erro ao tentar acessar a câmera. Tente novamente.";
      } else {
        errorMessage = `Erro: ${err.message}`;
      }

      setError(errorMessage);
      console.error("Erro ao solicitar permissão:", err);
    }
  };

  // Captura a foto atual da stream da câmera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Ajusta o canvas para o tamanho do vídeo
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Desenha o frame do vídeo no canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Obtém a imagem como base64
        const imageData = canvas.toDataURL("image/png");
        setPhoto(imageData);
      }
    }
  };

  const handleConfirm = () => {
    if (photo) {
      console.log("Base64 da foto:", photo);
      setPhoto(null); // Reseta a foto para novas capturas
      setIsModalOpen(false); // Fecha o modal
    }
  };

  const handleCancel = () => {
    setPhoto(null); // Permite tirar uma nova foto
  };

  // Para parar a stream quando o modal for fechado
  const stopStream = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      requestPermission();
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [isModalOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-lg p-4 rounded-md">
        <DialogTitle>Capturar Foto</DialogTitle>
        <DialogDescription>
          Use a câmera para capturar uma imagem. Confirme se estiver satisfeito.
        </DialogDescription>

        <div className="flex flex-col items-center gap-4">
          {error && <div className="text-red-500">{error}</div>}

          {!hasPermission ? (
            <div className="text-center text-red-500">
              Você precisa conceder permissão para acessar a câmera.
            </div>
          ) : !photo ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-auto border border-gray-400 rounded-md"
                playsInline
              />
            </>
          ) : (
            <img
              src={photo}
              alt="Preview da Foto"
              className="w-full h-64 object-contain bg-gray-200"
            />
          )}

          <canvas ref={canvasRef} className="hidden" />

          <div className="flex gap-2">
            {!photo ? (
              <Button onClick={capturePhoto}>Tirar Foto</Button>
            ) : (
              <>
                <Button onClick={handleConfirm}>Confirmar</Button>
                <Button onClick={handleCancel} variant="error">
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
