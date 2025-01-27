import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useDocStore from "@/stores/useDocStore";
import useThemeStore from "@/stores/useThemeStore";
import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "@/stores/authentication";
import { log } from "@/lib/utils";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { FiRotateCw } from "react-icons/fi";
import { Doc } from "@/types";

type ConfirmSendDocsProps = {
  className?: string;
};

type reqStatusType = {
  state: "success" | "error" | null;
  msg: string | null;
};

export default function ConfirmSendDocs({ className }: ConfirmSendDocsProps) {
  const [isChecked, setIsChecked] = useState(false);
  const auth = useAuthStore((state) => state.auth);
  const [disabledButton, setDisableButton] = useState(true);
  const [resendMessageButton, setResendMessageButton] = useState(false);
  const docs = useDocStore((state) => state.docs);
  const updateDoc = useDocStore((state) => state.updateDocFile);
  const theme = useThemeStore((state) => state.pageContent);
  const [reqStatus, setReqStatus] = useState<reqStatusType>({
    state: null,
    msg: null,
  });

  const handleSendFiles = async () => {
    console.log("Enviando documentos...");
    console.log(docs);
  
    const selectDocs = docs?.filter(
      (item) => item.file && item.statusUpload !== "success"
    );
  
    if (selectDocs) {
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
  
      let errorCount = 0;

      const uploadPromises = selectDocs.map(async (item: Doc) => {
        log("Estrutura do documento: " + item.CampoApi);
        log(item);
        updateDoc(item.id, { statusUpload: "pending" });
  
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
  
        formData.append("Conf", params);
        if (item?.file) {
          formData.append("Files", item.file);
        }
  
        log("FormData Enviado:");
        formData.forEach((value, key) => {
          log(`${key}: ${value}`);
        });
  
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/api/keepins/v1/cobertura/documento/ocr/externo/importar`,
            formData,
            header
          );
  
          console.log(res);
          if (!res.data.sucesso) {
            throw new Error(res.data.mensagem);
          }
  
          updateDoc(item.id, { statusUpload: "success" });
        } catch (err: any) {
          console.log(err);
          updateDoc(item.id, { statusUpload: "error" });
          errorCount++;
        }
      });
  
      try {
        await Promise.all(uploadPromises);
  
        if (errorCount > 0) {
          setReqStatus({
            state: "error",
            msg: "Um ou mais documentos falharam no envio.",
          });
        } else {
          setReqStatus({
            state: "success",
            msg: "Todos os documentos selecionados foram enviados com sucesso!",
          });
        }
      } catch (err) {
        console.error("Erro geral no envio de documentos:", err);
        setReqStatus({
          state: "error",
          msg: "Houve um erro no envio dos documentos.",
        });
      }
    }
  };
  
  
  const handleChangeChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleRefetchDocs = () => {
    log("Refetch");
    handleSendFiles();
  };

  useEffect(() => {
    const hasAtLeastOneDoc = docs?.some((item) => item.file !== undefined && item.statusUpload !== "success");
    const hasDocNotUploaded = docs?.some((item) => item.file == undefined || item.file == null)
    setResendMessageButton(hasDocNotUploaded ? true : false)
    if (hasAtLeastOneDoc && isChecked) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
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

      {reqStatus.state == null && (
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
      )}
      {reqStatus.state == "error" && (
        <div className="w-full min-h-12 px-4 py-3 gap-4 flex justify-between items-center border border-yellow-300 bg-yellow-300 bg-opacity-30 rounded-xl">
          <div className="flex items-center justify-start gap-4">
            <FiAlertTriangle
              fontSize={24}
              className="text-yellow-600 min-w-7"
            />
            <h1 className="font-semibold text-black-700 text-md">
              {reqStatus.msg || "Algum erro aconteceu no envio dos documentos"}
            </h1>
          </div>
          <Button
            variant={"warning"}
            disabled={disabledButton}
            onClick={() => handleRefetchDocs()}
          >
            <FiRotateCw />
            Tentar novamente
          </Button>
        </div>
      )}
      {reqStatus.state == "success" && (
        <div className="w-full min-h-12 px-4 py-3 gap-4 flex justify-between items-center border border-lime-300 bg-lime-300 bg-opacity-30 rounded-xl">
          <div className="flex items-center justify-start gap-4">
            <FiCheckCircle
              fontSize={24}
              strokeWidth={2.5}
              className="text-lime-600 min-w-7"
            />
            <div className="">
              <h1 className="font-semibold text-black-700 text-md leading-5 mb-1">
                {reqStatus.msg || "Documentos enviados com sucesso!"}
              </h1>
              {resendMessageButton && (
                <p className="text-xs">
                  Ainda restam alguns documentos para ser enviados.
                </p>
              )}
            </div>
          </div>
          <Button
            disabled={disabledButton}
            onClick={() => handleRefetchDocs()}
            style={{
              background: theme.buttonColor,
              color: theme.textButtonColor,
            }}
          >
            Enviar restantes
          </Button>
        </div>
      )}
    </div>
  );
}
