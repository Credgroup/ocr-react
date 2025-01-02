import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

interface CameraModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function CameraModal({ isModalOpen, setIsModalOpen }: CameraModalProps) {
  const cameraRef = useRef<Webcam>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]); // Armazenar as câmeras
  const [selectedDevice, setSelectedDevice] = useState<string>(""); // Dispositivo selecionado
  const [currentDeviceId, setCurrentDeviceId] = useState<string>(""); // ID do dispositivo atual

  // Função para solicitar permissão para acessar a câmera
  const requestPermission = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { deviceId: selectedDevice } })
      .then(() => {
        setHasPermission(true);
        setError(null); // Reseta o erro se a permissão for concedida
      })
      .catch((err) => {
        setHasPermission(false);
        let errorMessage = "Erro desconhecido ao acessar a câmera.";

        // Tratamento de erros específicos
        if (
          err.name === "NotFoundError" ||
          err.name === "DevicesNotFoundError"
        ) {
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
      });
  };

  // Função para listar os dispositivos de mídia disponíveis
  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    setVideoDevices(videoDevices);
    if (videoDevices.length > 0) {
      setSelectedDevice(videoDevices[0].deviceId); // Defina a primeira câmera como selecionada
      setCurrentDeviceId(videoDevices[0].deviceId);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getDevices(); // Carregar dispositivos de vídeo quando o modal for aberto
    }
  }, [isModalOpen]);

  const capture = useCallback(() => {
    if (cameraRef.current) {
      const imageSrc = cameraRef.current.getScreenshot();
      setPhoto(imageSrc);
    }
  }, []);

  const handleTakePhoto = () => {
    capture();
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

  const handleSwitchCamera = () => {
    const nextDeviceIndex =
      (videoDevices.findIndex((device) => device.deviceId === currentDeviceId) +
        1) %
      videoDevices.length; // Alterna entre as câmeras
    const nextDeviceId = videoDevices[nextDeviceIndex].deviceId;
    setCurrentDeviceId(nextDeviceId);
    setSelectedDevice(nextDeviceId);
  };

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
              Você precisa conceder permissão para acessar a câmera e o
              microfone.
            </div>
          ) : !photo ? (
            <>
              <Webcam
                ref={cameraRef}
                width={300}
                height={450}
                screenshotFormat="image/png"
                className="border border-red-400"
                videoConstraints={{
                  deviceId: { exact: selectedDevice },
                }}
              />
            </>
          ) : (
            <img
              src={photo}
              alt="Preview da Foto"
              className="w-full h-64 object-contain bg-gray-200"
            />
          )}

          <div className="flex gap-2">
            {!photo ? (
              <Button onClick={handleTakePhoto}>Tirar Foto</Button>
            ) : (
              <>
                <Button onClick={handleConfirm}>Confirmar</Button>
                <Button onClick={handleCancel} variant="error">
                  Cancelar
                </Button>
              </>
            )}
          </div>

          {/* Botão para solicitar permissão manualmente */}
          {!hasPermission && !photo && (
            <Button onClick={requestPermission} variant="secondary">
              Solicitar Permissão
            </Button>
          )}

          {/* Botão para alternar entre as câmeras */}
          {videoDevices.length > 1 && !photo && (
            <Button onClick={handleSwitchCamera} variant="secondary">
              Trocar Câmera
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
