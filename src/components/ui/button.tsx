import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[inherit] whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--Green-300,#A5D14F)] text-[var(--Black-700)] hover:bg-[var(--Green-400,#96C545)] disabled:bg-[var(--Green-200,#C7E59C)]",
        secondary:
          "bg-[var(--White-400,#E3E4E5)] text-[var(--Black-100)] hover:bg-[var(--White-600,#D9DBDE)] disabled:bg-[var(--White-600,#D9DBDE)]",
        warning:
          "bg-[var(--Warning-300,#EBBC3B)] text-[var(--Black-100)] hover:bg-[var(--Warning-400,#D9A434)] disabled:bg-[var(--Warning-200,#F0D58A)]",
        error:
          "bg-[var(--Danger-400,#F73B3B)] text-white-300 hover:bg-[var(--Danger-400,#FF6F6F)] disabled:bg-[var(--Danger-200,#FFC1C1)]",
        ghost:
          "bg-transparent text-[var(--Black-700)] hover:bg-[var(--White-400,#E3E4E5)] dark:text-[var(--White-300)] dark:hover:bg-[var(--Black-900)]",
        link: "text-[var(--Black-700)] underline-offset-4 hover:underline dark:text-[var(--White-300)]",
      },
      size: {
        default: "h-10 px-4 py-3 gap-3 text-sm",
        sm: "h-8 px-4 py-4 gap-3 text-xs",
        lg: "h-11 px-8 py-4 gap-5 text-lg",
        icon: "h-8 w-8 p-2 gap-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
