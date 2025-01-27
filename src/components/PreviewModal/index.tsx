import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: File | null;
}

export default function PreviewModal({
  isOpen,
  onClose,
  file,
}: PreviewModalProps) {
  if (!file) return null;

  const fileURL = URL.createObjectURL(file);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[500px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Visualização do Documento</DialogTitle>
          <DialogDescription>{file.name}</DialogDescription>
          <DialogClose />
        </DialogHeader>
        <div className="flex justify-center items-center">
          <img
            src={fileURL}
            alt={`Preview do Documento ${file.name}`}
            className="max-w-full max-h-[500px] rounded-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
