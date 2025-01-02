import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "@/components/Camera"; // Importe o componente de câmera aqui

interface CameraModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [photo, setPhoto] = useState<string | null>(null);

  const handleCapture = (capturedPhoto: string) => {
    setPhoto(capturedPhoto);
  };

  const handleConfirm = () => {
    if (photo) {
      console.log("Foto capturada (base64):", photo);
      setPhoto(null);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setPhoto(null); // Reseta a foto para novas capturas
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
            <Camera onCapture={handleCapture} className="w-full" />
          ) : (
            <img
              src={photo}
              alt="Preview da Foto"
              className="w-full h-64 object-contain bg-gray-200"
            />
          )}

          <div className="flex gap-2">
            {photo ? (
              <>
                <Button onClick={handleConfirm}>Confirmar</Button>
                <Button onClick={handleCancel} variant="error">
                  Cancelar
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
