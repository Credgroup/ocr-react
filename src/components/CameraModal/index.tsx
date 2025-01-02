import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "@/components/Camera";
import { useState, useEffect } from "react";

interface CameraModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function CameraModal({ isModalOpen, setIsModalOpen }: CameraModalProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");

  // Obtém as câmeras disponíveis
  useEffect(() => {
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoDevices(videoInputs);
      if (videoInputs.length > 0) {
        setSelectedDevice(videoInputs[0].deviceId); // Define a primeira câmera como padrão
      }
    };

    if (isModalOpen) {
      getDevices();
    }
  }, [isModalOpen]);

  const handlePhotoTaken = (photo: string) => {
    setPhoto(photo);
  };

  const handleSwitchCamera = () => {
    const currentIndex = videoDevices.findIndex(
      (device) => device.deviceId === selectedDevice
    );
    const nextIndex = (currentIndex + 1) % videoDevices.length;
    setSelectedDevice(videoDevices[nextIndex].deviceId);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-lg p-4 rounded-md">
        <DialogTitle>Capturar Foto</DialogTitle>
        <DialogDescription>
          Use a câmera para capturar uma imagem. Confirme se estiver satisfeito.
        </DialogDescription>

        <div className="flex flex-col items-center gap-4">
          {!photo ? (
            <>
              <Camera
                deviceId={selectedDevice}
                onPhotoTaken={handlePhotoTaken}
                className="w-full h-64"
              />
              {videoDevices.length > 1 && (
                <Button onClick={handleSwitchCamera}>Trocar Câmera</Button>
              )}
            </>
          ) : (
            <img
              src={photo}
              alt="Foto Capturada"
              className="w-full h-64 object-contain bg-gray-200"
            />
          )}

          <div className="flex gap-2">
            {!photo ? (
              <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            ) : (
              <>
                <Button onClick={() => console.log("Foto Confirmada:", photo)}>
                  Confirmar
                </Button>
                <Button onClick={() => setPhoto(null)} variant="error">
                  Retirar Foto
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
