import { FiEye, FiUpload } from "react-icons/fi";
import DocIcon from "../DocIcon";
import { SmallContainer } from "../Layout/Conainer";
import { Button } from "../ui/button";

export default function DocItem() {
  return (
    <SmallContainer className="bg-white-300 min-h-14 rounded-xl p-3 flex justify-between items-center flex-row flex-nowrap">
      <div className="flex flex-row gap-3 items-center justify-start">
        <DocIcon type="unknown" />
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-base font-bold leading-none">
            Frente do documento de identificação
          </h1>
          <p className="text-xs">Clique para fazer upload</p>
        </div>
      </div>
      <div className="flex justify-end w-full max-w-40 gap-2">
        <Button variant="secondary" size="icon">
          <FiEye />
        </Button>
        <Button variant="secondary" size="sm">
          <FiUpload />
          Dispositivo
        </Button>
      </div>
    </SmallContainer>
  );
}
