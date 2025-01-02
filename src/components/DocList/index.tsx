import useDocStore from "@/stores/useDocStore";
import { useEffect, useState } from "react";
import DocItem from "../DocItem";
import UploadModal from "../UploadModal.tsx";
import { Doc, updateDoc } from "@/types/index.ts";
import { FileIconType } from "@/types";
import { log } from "@/lib/utils.ts";
import PreviewModal from "../PreviewModal/index.tsx";
import { OptionMobileModal } from "../OptionsModal/index.tsx";
import { CameraModal } from "../CameraModal/index.tsx";

export default function DocList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const docs = useDocStore((state) => state.docs);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const updateDocFile = useDocStore((state) => state.updateDocFile);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Considera mobile se a largura for menor ou igual a 768px
    };

    handleResize(); // Verifica o tamanho inicial
    window.addEventListener("resize", handleResize); // Adiciona o listener

    return () => {
      window.removeEventListener("resize", handleResize); // Remove o listener na desmontagem
    };
  }, []);

  const openUploadModal = (id: string) => {
    log(id);
    setSelectedDocId(id);
    setIsModalOpen(true);
  };
  const openOptionModal = (doc: Doc) => {
    log(doc);
    setSelectedDocId(doc.id);
    if (doc.file) {
      setSelectedDoc(doc);
    }
    setIsOptionModalOpen(true);
  };

  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} Bytes`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  const handleUpload = (file: File) => {
    log(file);
    log(selectedDocId);
    if (selectedDocId) {
      let [_, fileType] = file.type.split("/");

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

      const newDoc: updateDoc = {
        checked: true,
        description: `${file.name} | ${formatFileSize(file.size)}`,
        file: file,
        type: typeOfFile,
      };

      log(newDoc);

      updateDocFile(selectedDocId, newDoc);
      log("Arquivo carregado:", file);
    }
    setIsModalOpen(false);
    setSelectedDoc(null);
  };

  const openPreviewModal = (img: File | null) => {
    log(img);
    if (img) {
      setPreviewFile(img);
      setIsPreviewModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Modal de Upload */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDoc(null);
        }}
        onUpload={handleUpload}
      />

      {/* Modal de Preview */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setSelectedDoc(null);
        }}
        file={previewFile}
      />

      <OptionMobileModal
        isModalOpen={isOptionModalOpen}
        setIsModalOpen={() => {
          setIsOptionModalOpen(false);
          setSelectedDoc(null);
        }}
        type={selectedDoc?.type || ""}
        actions={[
          () => {
            setIsModalOpen(true);
            setIsOptionModalOpen(false);
          },
          () => {
            setIsPreviewModalOpen(true);
            openPreviewModal(selectedDoc?.file || null);
            setIsOptionModalOpen(false);
          },
          () => {
            setIsCameraModalOpen(true);
            setIsOptionModalOpen(false);
          },
        ]}
      />

      <CameraModal
        isModalOpen={isCameraModalOpen}
        setIsModalOpen={() => setIsCameraModalOpen(false)}
        docId={selectedDocId || ""}
      />

      {/* Listando os documentos */}
      {docs?.map((doc) => (
        <DocItem.Root key={doc.id}>
          <DocItem.ContentContainer>
            <DocItem.FileIcon
              type={doc.file ? doc.type : "unknown"} // Mostra o ícone de arquivo enviado ou desconhecido
              checked={doc.file ? true : false}
            />
            <DocItem.ContentText
              title={doc.title}
              description={doc.description || "Clique para fazer upload"}
            />
          </DocItem.ContentContainer>
          <DocItem.Actions>
            {doc.file && doc.type !== "pdf" && !isMobile && (
              <DocItem.Action
                type="show-preview"
                dispatch={() => openPreviewModal(doc.file)}
              />
            )}
            {isMobile ? (
              doc.file ? (
                <DocItem.Action
                  type="option-mobile"
                  dispatch={() => openOptionModal(doc)} // Alterna a visibilidade do popover para este documento
                />
              ) : (
                <DocItem.Action
                  type="upload-mobile"
                  dispatch={() => openOptionModal(doc)} // Alterna a visibilidade do popover para este documento
                />
              )
            ) : (
              <DocItem.Action
                type="upload-destop"
                dispatch={() => openUploadModal(doc.id)}
              />
            )}
          </DocItem.Actions>
        </DocItem.Root>
      ))}
    </div>
  );
}
