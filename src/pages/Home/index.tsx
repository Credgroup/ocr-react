import useAuthStore from "@/stores/authentication";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthType } from "@/types";
import { log } from "@/lib/utils";

export default function Home() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const authParams = params.get("auth");

  useEffect(() => {
    // Capturar os parâmetros de auth da URL
    if (authParams) {
      let authParamsObj = JSON.parse(authParams);
      const authObj: AuthType = {
        name: authParamsObj.name,
        id: authParamsObj.id,
      };

      log("Parâmetro auth:", authObj);
      setAuth(authObj);

      // Redirect para pagina de documentos
      navigate("/docs", { replace: true });
    }
  }, []);

  return (
    <>
      <p>Carregando...</p>
    </>
  );
}
