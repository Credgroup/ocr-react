import {
  FiEye,
  FiMoreVertical,
  FiPlus,
  FiUpload,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { Button } from "../ui/button";
import Loader from "../Loader";

type DocItemActionButtonsType =
  | "upload-destop"
  | "upload-mobile"
  | "option-mobile"
  | "loading"
  | "pending"
  | "success"
  | "error"
  | "show-preview";

type DocActionProps = {
  type: DocItemActionButtonsType;
  dispatch?: () => void;
};

export default function DocAction({ type, dispatch }: Readonly<DocActionProps>) {
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

  if (type == "loading" || type == "pending") {
    return <Loader />;
  }

  if (type == "success") {
    return (
      <div className="w-6 h-6 bg-lime-400 rounded-full flex justify-center items-center">
        <FiCheck className="text-lime-600" strokeWidth={3} />
      </div>
    );
  }

  if (type == "error") {
    return (
      <div className="w-6 h-6 bg-red-400 rounded-full flex justify-center items-center">
        <FiX className="text-white-300" strokeWidth={3} />
      </div>
    );
  }

  if (type == "option-mobile") {
    return (
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={dispatch ? () => dispatch() : () => {}}
      >
        <FiMoreVertical />
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
