import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-none border-l-2 pl-2.5 pr-1 py-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em]",
  {
    variants: {
      variant: {
        default: "border-brass bg-transparent text-pine",
        secondary: "border-brass-soft bg-transparent text-brass-soft",
        outline: "border-paper/40 bg-transparent text-paper/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
