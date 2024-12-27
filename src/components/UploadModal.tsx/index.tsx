import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
};

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
}: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);

  // Função para tratar a seleção do arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  // Função para enviar o arquivo
  const handleUpload = () => {
    if (file) {
      console.log("Arquivo carregado:", file);
      onUpload(file); // Atualiza o arquivo no estado global (Zustand)
      onClose(); // Fecha o modal após o upload
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent className="w-full max-w-[500px] p-6 rounded-lg shadow-lg">
        <DialogTitle>Faça o Upload do Documento</DialogTitle>
        <DialogDescription>
          Selecione o arquivo para o upload. Após o envio, ele será associado ao
          seu documento.
        </DialogDescription>

        <div className="mt-4">
          <input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Upload
          </button>
          <DialogClose>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
