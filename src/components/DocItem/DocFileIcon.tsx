import DocIcon, { DocIconProps } from "../DocIcon";

type DocFileIconProps = DocIconProps;

export default function DocFileIcon({ type, checked }: Readonly<DocFileIconProps>) {
  return <DocIcon type={type} checked={checked} />;
}
