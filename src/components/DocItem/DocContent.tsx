import { ReactNode } from "react";
type DocContentProps = {
  children: ReactNode;
};
export default function DocContent({ children }: Readonly<DocContentProps>) {
  return (
    <div className="flex flex-row gap-3 items-center justify-start">
      {children}
    </div>
  );
}
