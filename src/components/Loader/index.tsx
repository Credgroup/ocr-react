import clsx from "clsx";

interface LoaderProps {
  size?: number;
  className?: string;
}

export default function Loader({ size = 24, className }: LoaderProps) {
  return (
    <div
      className="relative flex justify-center items-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div
        className="absolute rounded-full border-4 border-white-500"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></div>
      <div
        className={clsx(
          "animate-spin rounded-full border-4 border-t-transparent border-white-900 absolute",
          className
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></div>
    </div>
  );
}
