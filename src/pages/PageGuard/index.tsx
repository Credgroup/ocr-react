import { AuthType } from "@/types";
import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type PageGuardProps = {
  Page: ComponentType;
  auth: AuthType | null;
};

export default function PageGuard({ Page, auth }: Readonly<PageGuardProps>) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/authdenied", { replace: true });
    }
  }, []);

  if (!auth) {
    return null;
  }

  return <Page />;
}
