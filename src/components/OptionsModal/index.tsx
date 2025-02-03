import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Action = () => void;

interface OptionMobileModalProps {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  actions: Action[];
  type: string;
}

export function OptionMobileModal({
  isModalOpen,
  setIsModalOpen,
  actions,
  type,
}: Readonly<OptionMobileModalProps>) {
  const [uploadModal, previewModal, cameraModal] = actions;

  const handleAction = (action: string) => {
    console.log(action);
    if (action === "visualizar") {
      previewModal();
    }
    if (action === "carregar") {
      uploadModal();
    }
    if (action === "camera") {
      cameraModal();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <button onClick={setIsModalOpen}></button>
      </DialogTrigger>
      {/* Sobrescrevendo o DialogContent */}
      <DialogHeader className="hidden"></DialogHeader>
      <DialogContent className="max-w-xs p-1 rounded-md">
        {/* Aqui o botão "X" não será renderizado */}
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <div className="grid gap-2">
          {type && type !== "pdf" && (
            <Button
              variant="ghost"
              className="w-full"
              size="sm"
              onClick={() => handleAction("visualizar")}
            >
              Visualizar Documento
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full"
            size="sm"
            onClick={() => handleAction("camera")}
          >
            Tirar Foto
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            size="sm"
            onClick={() => handleAction("carregar")}
          >
            Carregar do Dispositivo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
