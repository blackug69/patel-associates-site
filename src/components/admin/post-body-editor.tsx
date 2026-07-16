"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { cn } from "@/lib/utils";

// BlockNote is browser-only — load it client-side to avoid SSR issues.
const RichBlockEditor = dynamic(
  () => import("@/components/admin/rich-block-editor").then((m) => m.RichBlockEditor),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[320px] rounded-md border border-border bg-background p-4 text-sm text-muted-foreground">
        Loading editor…
      </div>
    ),
  },
);

function ModeBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded bg-transparent px-3 py-1 text-xs font-medium transition-colors",
        active ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

// Body editor with two switchable experiences that share one HTML value:
// "Rich" (BlockNote, Notion-style) and "Simple" (Tiptap toolbar).
export function PostBodyEditor({ name, defaultHTML = "" }: { name: string; defaultHTML?: string }) {
  const [mode, setMode] = React.useState<"rich" | "simple">("rich");
  const [html, setHtml] = React.useState(defaultHTML);

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={html} />
      <div className="flex w-fit gap-1 rounded-md border border-border bg-card p-1">
        <ModeBtn active={mode === "rich"} onClick={() => setMode("rich")}>Rich</ModeBtn>
        <ModeBtn active={mode === "simple"} onClick={() => setMode("simple")}>Simple</ModeBtn>
      </div>
      {mode === "rich" ? (
        <RichBlockEditor defaultHTML={html} onChange={setHtml} />
      ) : (
        <RichTextEditor defaultHTML={html} onChange={setHtml} />
      )}
    </div>
  );
}
