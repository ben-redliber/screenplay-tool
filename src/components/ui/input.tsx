import * as React from "react";

import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-muted-foreground bg-transparent px-3 py-1 text-sm text-primary shadow-sm transition-colors file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-muted/50 dark:text-primary-foreground dark:placeholder:text-muted-foreground dark:focus-visible:ring-zinc-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
