import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { log } from "@/lib/utils";

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
};

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
}: Readonly<UploadModalProps>) {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Função para tratar a seleção do arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;

    if (selectedFile) {
      // Verifica a extensão do arquivo e o tipo MIME
      const fileExtension = selectedFile.type;
      const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

      if (allowedMimeTypes.includes(fileExtension)) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Arquivo não suportado",
          description: "Envie apenas arquivos JPG, JPEG, PNG ou PDF.",
          variant: "destructive",
        }); 
        setFile(null);
        if(inputRef && inputRef.current) {
          inputRef.current.value = '' 
        }
      }
    }
  };

  // Função para enviar o arquivo
  const handleUpload = () => {
    if (file) {
      log("Arquivo carregado:", file);
      onUpload(file); // Atualiza o arquivo no estado global (Zustand)
      onClose(); // Fecha o modal após o upload
      setFile(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent className="w-full max-w-[500px] p-6 rounded-lg shadow-lg">
        <DialogTitle>Faça o Upload do Documento</DialogTitle>
        <DialogDescription>
          Selecione o arquivo para o upload. Apenas arquivos JPG, JPEG, PNG e PDF são permitidos.
        </DialogDescription>

        <div className="mt-4">
          <input
            ref={inputRef}
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
          <DialogClose
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
