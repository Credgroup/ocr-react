import { ReactNode } from "react";

type DocActionsProps = {
  children: ReactNode
}

export default function DocActions({ children }: Readonly<DocActionsProps>) {
  return (
    <div className="flex justify-end sm:w-full max-w-40 gap-2">{children}</div>
  );
}
