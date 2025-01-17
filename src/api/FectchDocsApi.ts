import { decrypt, getFetchHeaders } from "@/lib/utils";
import axios from "axios";

type docsApiProps = {
  idusuario: string | number;
  idsisnistrocobertura: string | number;
};
export default async function fetchDocsApi({
  idsisnistrocobertura,
  idusuario,
}: docsApiProps) {
  const header = getFetchHeaders();
  const parameters = {
    Idsinistrocobertura: idsisnistrocobertura,
    idusuario,
  };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/api/keepins/v1/layou/consultar`,
      parameters,
      header
    );

    if (res.status !== 200) {
      throw new Error(`Erro: Status da resposta ${res.status}`);
    }

    const decry = decrypt(res.data);
    const data = JSON.parse(decry);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.message || "Erro desconhecido da API DOCS";
      throw new Error(errorMessage);
    } else if (error instanceof Error) {
      throw new Error(error.message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
}
