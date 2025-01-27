import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  props?: any;
}

export function SmallContainer({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={clsx(" max-w-[560px] w-full", className)} {...props}>
      {children}
    </div>
  );
}

export function LargeContainer({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx("border border-red-500 max-w-[1280px] w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}
export function ScreenContainer({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx("w-screen flex flex-col items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
