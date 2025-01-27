import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "@/components/Camera"; // Importe o componente de câmera aqui
import useDocStore from "@/stores/useDocStore"; // Adicionar import do Zustand
import { FileIconType } from "@/types";
import { formatFileSize } from "@/lib/utils";

interface CameraModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  docId: string;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  docId,
}) => {
  const [photo, setPhoto] = useState<File | null>(null); // Alterado para File
  const updateDocFile = useDocStore((state) => state.updateDocFile); // Usar o estado do Zustand
  const selectedDocId = docId; // ID do documento selecionado

  const handleCapture = (capturedPhoto: File) => {
    // Alterado para File
    setPhoto(capturedPhoto);
  };

  const handleConfirm = () => {
    if (photo && selectedDocId) {
      // Atualizar o Zustand com o novo arquivo

      let [_, fileType] = photo.type.split("/");

      const validFileTypes: FileIconType[] = [
        "pdf",
        "png",
        "jpg",
        "jpeg",
        "unknown",
      ];
      const typeOfFile: FileIconType = validFileTypes.includes(
        fileType as FileIconType
      )
        ? (fileType as FileIconType)
        : "unknown";

      const newDoc = {
        checked: true,
        description: `${photo.name} | ${formatFileSize(photo.size)}`,
        file: photo, // Utilizando o File diretamente
        type: typeOfFile, // Defina o tipo conforme necessário
      };

      updateDocFile(selectedDocId, newDoc); // Atualiza o arquivo no Zustand

      // Fechar o modal e resetar a foto
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
              src={URL.createObjectURL(photo)} // Exibe a imagem capturada
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
