import { FiEye, FiMoreVertical, FiPlus, FiUpload } from "react-icons/fi";
import { Button } from "../ui/button";

type DocItemActionButtonsType =
  | "upload-destop"
  | "upload-mobile"
  | "option-mobile"
  | "loading"
  | "success"
  | "error"
  | "show-preview";

type DocActionProps = {
  type: DocItemActionButtonsType;
  dispatch?: () => void;
};

export default function DocAction({ type, dispatch }: DocActionProps) {
  if (type == "upload-destop") {
    return (
      <Button
        variant="secondary"
        size="sm"
        onClick={dispatch ? () => dispatch() : () => {}}
      >
        <FiUpload />
        Dispositivo
      </Button>
    );
  }

  if (type == "upload-mobile") {
  }

  if (type == "loading") {
  }

  if (type == "success") {
  }

  if (type == "error") {
  }

  if (type == "option-mobile") {
    return (
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={dispatch ? () => dispatch() : () => {}}
      >
        <FiPlus />
      </Button>
    );
  }

  if (type == "show-preview") {
    return (
      <Button
        variant="secondary"
        size="icon"
        onClick={dispatch ? () => dispatch() : () => {}}
      >
        <FiEye />
      </Button>
    );
  }
}
