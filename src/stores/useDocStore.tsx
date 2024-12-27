import { create } from "zustand";
import { Doc, updateDoc } from "@/types";

// Criação do estado usando Zustand v5.0.2
const useDocStore = create<{
  docs: Doc[];
  setDocs: (docs: Doc[]) => void;
  updateDocFile: (id: string, updatedDoc: updateDoc) => void;
}>((set) => ({
  docs: [] as Doc[], // Define o estado inicial como um array de Doc
  setDocs: (docs: Doc[]) => set({ docs }), // Atualiza a lista de docs
  updateDocFile: (id: string, updatedDoc: updateDoc) =>
    set((state) => ({
      docs: state.docs.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              type: updatedDoc.type,
              checked: updatedDoc.checked,
              description: updatedDoc.description,
              file: updatedDoc.file,
            }
          : doc
      ),
    })),
}));

export default useDocStore;
