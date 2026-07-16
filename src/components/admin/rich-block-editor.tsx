"use client";

import "@blocknote/mantine/style.css";
import * as React from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { createClient } from "@/lib/supabase/client";

// Notion-style block editor (BlockNote). Controlled via onChange (emits HTML).
// Inline image drops upload to the Supabase "media" bucket (docs/admin-v2.sql).
export function RichBlockEditor({ defaultHTML = "", onChange }: {
  defaultHTML?: string;
  onChange: (html: string) => void;
}) {
  const [dark] = React.useState(() =>
    typeof document === "undefined" ||
    document.documentElement.getAttribute("data-admin-theme") !== "light",
  );

  const editor = useCreateBlockNote({
    uploadFile: async (file: File) => {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
      if (error) throw error;
      return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
    },
  });

  // Load initial HTML into blocks once (editor API + no setState → lint-safe).
  React.useEffect(() => {
    let active = true;
    (async () => {
      if (defaultHTML.trim()) {
        const blocks = await editor.tryParseHTMLToBlocks(defaultHTML);
        if (active) editor.replaceBlocks(editor.document, blocks);
      }
    })();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <div className="rounded-md border border-border bg-background py-2">
      <BlockNoteView
        editor={editor}
        theme={dark ? "dark" : "light"}
        onChange={async () => {
          onChange(await editor.blocksToHTMLLossy(editor.document));
        }}
      />
    </div>
  );
}
