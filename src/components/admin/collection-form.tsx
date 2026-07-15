"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "@/app/admin/form-state";
import type { Collection, Field } from "@/lib/admin/collections";

type Action = (prev: FormState, fd: FormData) => Promise<FormState>;
type Row = Record<string, unknown>;

// Serializes a stored value back into the textarea string for a given field type.
function serialize(field: Field, value: unknown): string {
  if (value == null) return "";
  if (field.type === "lines" && Array.isArray(value)) return value.join("\n");
  if (field.type === "kvlines" && Array.isArray(value)) {
    return (value as { name?: string; desc?: string }[])
      .map((i) => `${i.name ?? ""} | ${i.desc ?? ""}`)
      .join("\n");
  }
  if (field.type === "qalines" && Array.isArray(value)) {
    return (value as { q?: string; a?: string }[])
      .map((i) => `${i.q ?? ""} | ${i.a ?? ""}`)
      .join("\n");
  }
  return String(value);
}

export function CollectionForm({
  collection,
  action,
  defaults,
}: {
  collection: Collection;
  action: Action;
  defaults?: Row;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, null);
  const d = defaults ?? {};
  const isTextarea = (t: Field["type"]) =>
    t === "textarea" || t === "lines" || t === "kvlines" || t === "qalines";

  return (
    <form action={formAction} className="admin__form">
      <input type="hidden" name="__collection" value={collection.key} />
      {d.id != null && <input type="hidden" name="__id" value={String(d.id)} />}

      {collection.fields.map((f) => {
        if (f.type === "checkbox") {
          const checked = d[f.name] !== undefined ? Boolean(d[f.name]) : f.default ?? false;
          return (
            <label key={f.name} className="admin__actions">
              <input type="checkbox" name={f.name} defaultChecked={checked} />
              <span>{f.label}</span>
            </label>
          );
        }
        return (
          <label key={f.name} className="admin-field">
            <span>{f.label}{f.required ? " *" : ""}</span>
            {isTextarea(f.type) ? (
              <textarea name={f.name} defaultValue={serialize(f, d[f.name])} required={f.required} />
            ) : (
              <input
                name={f.name}
                type={f.type === "number" ? "number" : "text"}
                defaultValue={serialize(f, d[f.name])}
                required={f.required}
                placeholder={f.placeholder}
              />
            )}
            {f.help && <small style={{ color: "var(--ink-500)" }}>{f.help}</small>}
          </label>
        );
      })}

      {state?.error && <p className="admin-error" role="alert">{state.error}</p>}

      <div className="admin__actions">
        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
        <Link href={`/admin/${collection.key}`} className="admin-btn admin-btn--ghost">Cancel</Link>
      </div>
    </form>
  );
}
