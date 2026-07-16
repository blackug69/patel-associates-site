"use client";

import * as React from "react";
import { Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/admin/ui/button";

// Uploads to the public "media" Supabase Storage bucket (see docs/admin-v2.sql)
// and stores the resulting public URL in a hidden input named `name`, so it
// submits inside a normal <form>. Requires an authenticated admin session.
export function ImageUpload({ name, defaultUrl, folder = "uploads" }: {
  name: string;
  defaultUrl?: string | null;
  folder?: string;
}) {
  const [url, setUrl] = React.useState(defaultUrl ?? "");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, {
        upsert: false,
        contentType: file.type,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={url} />
      {url ? (
        <div className="relative w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="h-28 w-auto rounded-md border border-border object-cover" />
          <Button
            type="button" variant="outline" size="icon"
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
            onClick={() => setUrl("")} aria-label="Remove image"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={busy}>
          <Upload className="h-4 w-4" /> {busy ? "Uploading…" : "Upload image"}
        </Button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );
}
