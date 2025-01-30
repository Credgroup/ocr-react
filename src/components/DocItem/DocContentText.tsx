type DocContentTextProps = {
  title: string;
  description: string;
};

export default function DocContentText({
  title,
  description,
}: Readonly<DocContentTextProps>) {
  return (
    <div className="flex flex-col gap-[6px]">
      <h1 className="text-base font-bold leading-none">{title} </h1>
      <p className="text-xs">{description}</p>
    </div>
  );
}
