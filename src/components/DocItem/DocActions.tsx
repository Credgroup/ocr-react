import { ReactNode } from "react";

export default function DocActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end sm:w-full max-w-40 gap-2">{children}</div>
  );
}
