import { decrypt, getFetchHeaders } from "@/lib/utils";
import axios from "axios";

type themApiProps = {
  idwhitelabel: string | number;
  idusuario: string | number;
};

export default async function fetchThemeApi({
  idwhitelabel,
  idusuario,
}: themApiProps) {
  const header = getFetchHeaders();
  const parameters = {
    idwhitelabel,
    idusuario,
  };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/api/keepins/v1/whitelabel/consltar`,
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
      const errorMessage = error.message || "Erro desconhecido da API THEME";
      throw new Error(errorMessage);
    } else if (error instanceof Error) {
      throw new Error(error.message || "Erro desconhecido");
    } else {
      throw new Error("Erro desconhecido");
    }
  }
}
