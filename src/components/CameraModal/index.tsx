import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Camera } from "react-camera-pro";

interface CameraModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function CameraModal({ isModalOpen, setIsModalOpen }: CameraModalProps) {
  const cameraRef = useRef<any>(null); // Usando `any` para o ref
  const [photo, setPhoto] = useState<string | null>(null);

  const handleTakePhoto = () => {
    if (cameraRef.current) {
      const newPhoto = cameraRef.current.takePhoto(); // Método `takePhoto` chamado
      setPhoto(newPhoto);
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

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-lg p-4 rounded-md">
        <DialogTitle>Capturar Foto</DialogTitle>
        <DialogDescription>
          Use a câmera para capturar uma imagem. Confirme se estiver satisfeito.
        </DialogDescription>

        <div className="flex flex-col items-center gap-4">
          {!photo ? (
            <Camera
              ref={cameraRef}
              aspectRatio={16 / 9}
              facingMode="user"
              errorMessages={{
                noCameraAccessible: "Não foi possível acessar a câmera.",
              }} // Usando a chave correta
            />
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
