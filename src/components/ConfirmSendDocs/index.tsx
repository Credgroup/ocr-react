import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useDocStore from "@/stores/useDocStore";
import useThemeStore from "@/stores/useThemeStore";
import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "@/stores/authentication";

type ConfirmSendDocsProps = {
  className?: string;
};

export default function ConfirmSendDocs({ className }: ConfirmSendDocsProps) {
  const [isChecked, setIsChecked] = useState(false);
  const auth = useAuthStore((state) => state.auth);
  const [disabledButton, setDisableButton] = useState(true);
  const docs = useDocStore((state) => state.docs);
  const theme = useThemeStore((state) => state.pageContent);

  const handleSendFiles = () => {
    console.log("Enviando documentos...");
    console.log(docs);
    if (docs) {
      const header: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJlbmFuLmxpbWFAa2VlcGlucy5jb20uYnIiLCJyb2xlIjoiMSIsIlRva2VuVmVyc2lvbiI6IjM4MSIsIklkQWNjZXNzIjoiMjExNyIsIm5iZiI6MTczNjU0MjQ0OSwiZXhwIjoxNzM2NTUyMDQ5LCJpYXQiOjE3MzY1NDI0NDksImlzcyI6ImtlZXBpbnMiLCJhdWQiOiJjcmVkZ3JvdXAifQ.hwRaBu7tkNrMKVDyid2qYJ99MfnxXamySJke_d1_wFs",
        },
      };
      docs.forEach((item) => {
        const formData = new FormData();
        formData.append("Conf[ChaveDocumento]", item?.ChaveDocumento ?? "");
        formData.append("Conf[tpDocumento]", item?.TpDocumento ?? "");
        formData.append(
          "Conf[ModelClassificarOcr]",
          item?.ModelClassificarOcr ?? ""
        );
        formData.append("Conf[ModelExtrairOcr]", item?.ModelExtrairOcr ?? "");
        formData.append("Conf[idSinistro]", auth?.idSinistro?.toString() ?? "");
        formData.append("Conf[idSegurado]", auth?.idSegurado?.toString() ?? "");
        formData.append(
          "Conf[idSinistroCobertura]",
          auth?.idSinistroCobertura?.toString() ?? ""
        );
        formData.append("Conf[idSeguro]", auth?.idSeguro?.toString() ?? "");
        formData.append("Conf[idUsuario]", auth?.idUsuario?.toString() ?? "");

        // Adicionando o arquivo, verificando se ele existe
        if (item?.file) {
          formData.append("Files", item.file);
        }

        console.log(formData);

        axios
          .post(
            `${
              import.meta.env.VITE_API_ENDPOINT
            }/api/keepins/v1/cobertura/documento/ocr/importar`,
            formData,
            header
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };
  const handleChangeChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    console.log(docs);
    const missingDocs = docs?.filter((item) => item.file == null);
    console.log(theme);
    if (missingDocs && missingDocs?.length == 0 && isChecked) {
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
  }, [docs, isChecked]);

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <label htmlFor="TermsCheckBox" className="flex items-center gap-3">
        <Checkbox
          id="TermsCheckBox"
          checked={isChecked}
          onClick={handleChangeChecked}
        />
        <span>
          Eu declaro que li e aceito os{" "}
          <a href="#" className="font-bold hover:underline">
            termos e condições
          </a>
          .
        </span>
      </label>
      <div className="flex justify-end">
        <Button
          onClick={() => handleSendFiles()}
          disabled={disabledButton}
          style={{
            background: theme.buttonColor,
            color: theme.textButtonColor,
          }}
        >
          Enviar documentos
        </Button>
      </div>
    </div>
  );
}
