import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useDocStore from "@/stores/useDocStore";
import useThemeStore from "@/stores/useThemeStore";
import axios, { AxiosRequestConfig } from "axios";
import useAuthStore from "@/stores/authentication";
import { log } from "@/lib/utils";
import { FiAlertTriangle, FiCheckCircle, FiRotateCw } from "react-icons/fi";
import { Doc } from "@/types";
import { useUploadDocs } from "@/hooks/useSendDocs";

type ConfirmSendDocsProps = {
  readonly className?: string;
};

type reqStatusType = {
  state: "success" | "error" | null;
  msg: string | null;
};

export default function ConfirmSendDocs({ className }: ConfirmSendDocsProps) {
  const [isChecked, setIsChecked] = useState(false);
  const auth = useAuthStore((state) => state.auth);
  const [resendMessageButton, setResendMessageButton] = useState(false);
  const [shouldDisableButton, setShouldDisableButton] = useState(true);
  const docs = useDocStore((state) => state.docs);
  const updateDoc = useDocStore((state) => state.updateDocFile);
  const theme = useThemeStore((state) => state.pageContent);
  const [reqStatus, setReqStatus] = useState<reqStatusType>({
    state: null,
    msg: null,
  });

  const {
    mutate: sendDocs,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useUploadDocs();

  const handleChangeChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleRefetchDocs = () => {
    log("Refetch");
    sendDocs();
  };

  useEffect(() => {
    const hasPendingDocs = docs?.some(
      (doc) => doc.file && doc.statusUpload !== "success"
    );
    // const hasRequiredDocsNotUploaded = docs?.some(
    //   (doc) => doc.Obrigatorio && !doc.file
    // );

    setShouldDisableButton(!hasPendingDocs || !isChecked || isLoading);
  }, [docs, isChecked, isLoading]);

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <label
        htmlFor="TermsCheckBox"
        className="flex items-center gap-3"
        id="TermsAndConditions"
      >
        <Checkbox
          id="TermsCheckBox"
          checked={isChecked}
          onClick={handleChangeChecked}
        />
        <span>
          Eu declaro que li e aceito os{" "}
          <a href="#TermsAndConditions" className="font-bold hover:underline">
            termos e condições
          </a>
          .
        </span>
      </label>

      {!isError && !isSuccess && (
        <div className="flex justify-end">
          <Button
            onClick={() => sendDocs()}
            disabled={isLoading}
            style={{
              background: theme.buttonColor,
              color: theme.textButtonColor,
            }}
          >
            Enviar documentos
          </Button>
        </div>
      )}
      {isError && (
        <div className="w-full min-h-12 px-4 py-3 gap-4 flex justify-between items-center border border-yellow-300 bg-yellow-300 bg-opacity-30 rounded-xl">
          <div className="flex items-center justify-start gap-4">
            <FiAlertTriangle
              fontSize={24}
              className="text-yellow-600 min-w-7"
            />
            <h1 className="font-semibold text-black-700 text-md">
              {error.message || "Algum erro aconteceu no envio dos documentos"}
            </h1>
          </div>
          <Button
            variant={"warning"}
            disabled={shouldDisableButton}
            onClick={() => handleRefetchDocs()}
          >
            <FiRotateCw />
            Tentar novamente
          </Button>
        </div>
      )}
      {isSuccess && (
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
            disabled={shouldDisableButton}
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
