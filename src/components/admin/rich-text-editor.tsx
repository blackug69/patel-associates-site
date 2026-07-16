"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Manual prose styles shared with PostBody — no @tailwindcss/typography plugin here.
const prose = cn(
  "text-foreground [&_p]:my-3 [&_p]:leading-relaxed",
  "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2",
  "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2",
  "[&_ul]:list-disc [&_ul]:ps-5 [&_ul]:my-3",
  "[&_ol]:list-decimal [&_ol]:ps-5 [&_ol]:my-3",
  "[&_li]:my-1",
  "[&_a]:text-accent-foreground [&_a]:underline [&_a]:underline-offset-2",
  "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:ps-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-4",
  "[&_strong]:font-semibold",
);

function ToolButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md bg-transparent text-muted-foreground",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active && "bg-accent text-accent-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev ?? "https://");
    if (url === null) return; // cancelled
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 rounded-t-md border-b border-border bg-card p-1.5">
      <ToolButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Link" active={editor.isActive("link")} onClick={setLink}>
        <LinkIcon className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="h-4 w-4" />
      </ToolButton>
      <ToolButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="h-4 w-4" />
      </ToolButton>
    </div>
  );
}

export function RichTextEditor({ name, defaultHTML = "", onChange }: {
  name?: string;
  defaultHTML?: string;
  onChange?: (html: string) => void;
}) {
  const [html, setHtml] = useState(defaultHTML);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ],
    content: defaultHTML,
    onUpdate: ({ editor }) => {
      const h = editor.getHTML();
      setHtml(h);
      onChange?.(h);
    },
    editorProps: {
      attributes: {
        class: cn(
          prose,
          "min-h-[320px] rounded-b-md bg-background px-4 py-3",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        ),
      },
    },
  });

  return (
    <div className="rounded-md border border-border bg-card">
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
      {name && <input type="hidden" name={name} value={html} />}
    </div>
  );
}
