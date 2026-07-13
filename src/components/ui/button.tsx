import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The single source of truth for buttons across the site.
 *
 * Styled entirely with warm-monochrome tokens from globals.css (§6 of
 * DESIGN_DIRECTION.md) — never the pine/brass palette. Use `asChild` to render
 * as a link (next/link or <a>) while keeping identical styling:
 *
 *   <Button asChild variant="primary">
 *     <Link href="/contact">Book a Consultation <span className="arrow" aria-hidden>↗</span></Link>
 *   </Button>
 *
 * On `.on-dark` sections the colors invert automatically (see globals.css).
 */
const buttonVariants = cva(
  // NOTE: `no-underline` and an explicit font-family are required because this
  // project runs Tailwind WITHOUT Preflight — nothing else resets the UA
  // underline on <a> (asChild links) or the UA font on a bare <button>.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer no-underline font-[family-name:var(--sans)] font-semibold rounded-[var(--radius-sm)] border border-transparent transition-[background-color,color,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-60 [&_.arrow]:transition-transform [&_.arrow]:duration-200 hover:[&_.arrow]:translate-x-[2px] hover:[&_.arrow]:-translate-y-[2px]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--ink-900)] text-[var(--paper-0)] hover:bg-[var(--ink-700)]",
        outline:
          "bg-transparent text-[var(--ink-900)] border-[var(--ink-900)] hover:bg-[var(--ink-900)] hover:text-[var(--paper-0)]",
      },
      size: {
        default: "text-[0.95rem] px-6 py-3.5",
        sm: "text-[0.85rem] px-4 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant = "primary",
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "primary"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
