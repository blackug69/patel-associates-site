"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "@/app/admin/form-state";
import type { Collection, Field } from "@/lib/admin/collections";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Textarea } from "@/components/admin/ui/textarea";
import { Card, CardContent } from "@/components/admin/ui/card";

type Row = Record<string, unknown>;
type Action = (prev: FormState, fd: FormData) => Promise<FormState>;

const HINT: Record<string, string> = {
  lines: "One item per line.",
  kvlines: "One per line as:  Name | Description",
  qalines: "One per line as:  Question | Answer",
};

function serialize(f: Field, v: unknown): string {
  if (v == null) return "";
  if (f.type === "lines" && Array.isArray(v)) return v.join("\n");
  if (f.type === "kvlines" && Array.isArray(v))
    return (v as { name?: string; desc?: string }[]).map((i) => `${i.name ?? ""} | ${i.desc ?? ""}`).join("\n");
  if (f.type === "qalines" && Array.isArray(v))
    return (v as { q?: string; a?: string }[]).map((i) => `${i.q ?? ""} | ${i.a ?? ""}`).join("\n");
  return String(v);
}

export function CollectionForm({ collection, action, defaults }: { collection: Collection; action: Action; defaults?: Row }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, null);
  const d = defaults ?? {};
  const isArea = (t: Field["type"]) => t === "textarea" || t === "lines" || t === "kvlines" || t === "qalines";

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
      <input type="hidden" name="__collection" value={collection.key} />
      {d.id != null && <input type="hidden" name="__id" value={String(d.id)} />}

      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          {collection.fields.map((f) => {
            if (f.type === "checkbox") {
              const checked = d[f.name] !== undefined ? Boolean(d[f.name]) : f.default ?? false;
              return (
                <label key={f.name} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name={f.name} defaultChecked={checked} className="size-4 accent-current" />
                  {f.label}
                </label>
              );
            }
            const hint = f.help ?? HINT[f.type];
            return (
              <div key={f.name} className="flex flex-col gap-2">
                <Label>{f.label}{f.required ? " *" : ""}</Label>
                {isArea(f.type) ? (
                  <Textarea name={f.name} defaultValue={serialize(f, d[f.name])} required={f.required} className="min-h-24" />
                ) : (
                  <Input
                    name={f.name}
                    type={f.type === "number" ? "number" : "text"}
                    defaultValue={serialize(f, d[f.name])}
                    required={f.required}
                    placeholder={f.placeholder}
                  />
                )}
                {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {state?.error && (
        <p role="alert" className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive-foreground">{state.error}</p>
      )}
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save"}</Button>
        <Button asChild variant="outline"><Link href={`/admin/${collection.key}`}>Cancel</Link></Button>
      </div>
    </form>
  );
}
