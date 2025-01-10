import { FileIconType } from "@/types";
import { FiCheck, FiFile } from "react-icons/fi";

export type DocIconProps = {
  type: FileIconType;
  checked?: boolean;
};

export default function DocIcon({ type, checked }: DocIconProps) {
  return (
    <div className="relative flex justify-center items-center aspect-square min-w-12 rounded-lg bg-white-500">
      {checked && (
        <div className="absolute flex justify-center items-center top-[-3px] right-[-3px] aspect-square bg-blue-900 rounded-full p-[2px]">
          <FiCheck className="text-[10px] text-white-300" />
        </div>
      )}
      {type == "jpg" && <p>jpg</p>}
      {type == "png" && <p>png</p>}
      {type == "pdf" && <p>pdf</p>}
      {type == "unknown" && <FiFile className="text-2xl text-white-900" />}
    </div>
  );
}
