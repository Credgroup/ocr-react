import DocIcon, { DocIconProps } from "../DocIcon";

type DocFileIconProps = DocIconProps;

export default function DocFileIcon({ type, checked }: DocFileIconProps) {
  return <DocIcon type={type} checked={checked} />;
}
