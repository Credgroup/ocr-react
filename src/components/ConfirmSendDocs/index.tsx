import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useDocStore from "@/stores/useDocStore";
import useThemeStore from "@/stores/useThemeStore";
import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "@/stores/authentication";
import { log } from "@/lib/utils";

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

    const selectDocs = docs?.filter((item) => item.file);

    if (selectDocs) {
      const header: AxiosRequestConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Strict-Transport-Security":
            "max-age=2592000; includeSubDomains; preload",
          "Content-Type": "multipart/form-data",
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJlbmFuLmxpbWFAa2VlcGlucy5jb20uYnIiLCJyb2xlIjoiMSIsIlRva2VuVmVyc2lvbiI6IjM5NCIsIklkQWNjZXNzIjoiMjExNyIsIm5iZiI6MTczNjc5ODgyOCwiZXhwIjoxNzM2ODA4NDI4LCJpYXQiOjE3MzY3OTg4MjgsImlzcyI6ImtlZXBpbnMiLCJhdWQiOiJjcmVkZ3JvdXAifQ.a4xNGG6lVDZLIRNZuM311xSfP2UnaynABbvMVYvLdno",
        },
      };
      selectDocs.forEach((item) => {
        log("Estrutura do documento: " + item.CampoApi);
        log(item);

        const formData = new FormData();

        let obj = {
          ChaveDocumento: item.CampoApi,
          tpDocumento: item.TpDocumento,
          ModelClassificarOcr: item.ModelClassificarOcr,
          ModelExtrairOcr: item.ModelExtrairOcr,
          CamposExtrairOcr: item.CamposExtrairOcr,
          idSinistro: auth?.idSinistro,
          idSegurado: auth?.idSegurado,
          idSinistroCobertura: auth?.idSinistroCobertura,
          idSeguro: auth?.idSeguro,
          idUsuario: auth?.idUsuario,
        };

        log("Parametros do documento: " + item.CampoApi);
        log(obj);
        const params = JSON.stringify(obj);
        // Adicionando o arquivo, verificando se ele existe
        formData.append("Conf", params);
        if (item?.file) {
          formData.append("Files", item.file);
        }

        log("FormData Enviado:");
        formData.forEach((value, key) => {
          log(`${key}: ${value}`);
        });

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
            if (!res.data.upload) {
              console.log("ERRO");
            }
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
    const missingDocs = docs?.filter((item) => {
      if (item.Obrigatorio && item.file == null) {
        return item;
      }
    });
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
