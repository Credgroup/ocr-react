import { ReactNode } from "react";
import { SmallContainer } from "../Layout/Conainer";
type DocRootProps = {
  children: ReactNode;
};
export default function DocRoot({ children }: DocRootProps) {
  return (
    <SmallContainer className="bg-white-300 min-h-14 rounded-xl p-3 flex justify-between items-center flex-row flex-nowrap">
      {children}
    </SmallContainer>
  );
}
