import { useMutation } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "@/stores/authentication";
import useDocStore from "@/stores/useDocStore";
import { Doc } from "@/types";
import { log } from "@/lib/utils";

const uploadDoc = async (doc: Doc, auth: any) => {
  const header: AxiosRequestConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Strict-Transport-Security":
        "max-age=2592000; includeSubDomains; preload",
      "Content-Type": "multipart/form-data",
      Authorization: "bearer ",
    },
  };

  log("Estrutura do documento: " + doc.CampoApi);
  log(doc);

  const formData = new FormData();
  const params = JSON.stringify({
    ChaveDocumento: doc.CampoApi,
    tpDocumento: doc.TpDocumento,
    ModelClassificarOcr: doc.ModelClassificarOcr,
    ModelExtrairOcr: doc.ModelExtrairOcr,
    CamposExtrairOcr: doc.CamposExtrairOcr,
    idSinistro: auth?.idSinistro,
    idSegurado: auth?.idSegurado,
    idSinistroCobertura: auth?.idSinistroCobertura,
    idSeguro: auth?.idSeguro,
    idUsuario: auth?.idUsuario,
  });

  formData.append("Conf", params);
  if (doc.file) {
    formData.append("Files", doc.file);
  }

  log("FormData Enviado:");
  formData.forEach((value, key) => {
    log(`${key}: ${value}`);
  });

  const res = await axios.post(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }/api/keepins/v1/cobertura/documento/ocr/externo/importar`,
    formData,
    header
  );

  if (!res.data.sucesso) {
    throw new Error(res.data.mensagem);
  }
};

export function useUploadDocs() {
  const auth = useAuthStore((state) => state.auth);
  const { docs, updateDocFile } = useDocStore();

  return useMutation({
    mutationFn: async () => {
      const selectDocs = docs?.filter(
        (item) => item.file && item.statusUpload !== "success"
      );

      if (!selectDocs || selectDocs.length === 0) {
        throw new Error("Nenhum documento para enviar.");
      }

      let errorCount = 0;
      for (const doc of selectDocs) {
        updateDocFile(doc.id, { statusUpload: "pending" });
        try {
          await uploadDoc(doc, auth);
          updateDocFile(doc.id, { statusUpload: "success" });
        } catch (err) {
          console.error("Erro no envio do documento:", err);
          updateDocFile(doc.id, { statusUpload: "error" });
          errorCount++;
        }
      }

      if (errorCount > 0) {
        throw new Error("Um ou mais documentos falharam no envio.");
      }
    },
    onError: (err) => {
      console.log(err);
      console.log(err.message);
    },
  });
}
