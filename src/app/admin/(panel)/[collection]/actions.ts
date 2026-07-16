"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createClient } from "@/lib/supabase/server";
import { getCollection, type Collection } from "@/lib/admin/collections";
import type { FormState } from "@/app/admin/form-state";

async function fromTable(table: string) {
  const sb = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (sb as any).from(table);
}

function parsePairs(value: string, a: string, b: string) {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf("|");
      return { [a]: (i === -1 ? l : l.slice(0, i)).trim(), [b]: (i === -1 ? "" : l.slice(i + 1)).trim() };
    });
}

function buildRow(coll: Collection, fd: FormData): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  for (const f of coll.fields) {
    if (f.type === "checkbox") {
      row[f.name] = fd.get(f.name) === "on";
      continue;
    }
    const val = String(fd.get(f.name) ?? "").trim();
    switch (f.type) {
      case "number":
        if (val !== "") row[f.name] = Number(val);
        break;
      case "lines":
        row[f.name] = val === "" ? [] : val.split("\n").map((s) => s.trim()).filter(Boolean);
        break;
      case "kvlines":
        row[f.name] = parsePairs(val, "name", "desc");
        break;
      case "qalines":
        row[f.name] = parsePairs(val, "q", "a");
        break;
      default:
        row[f.name] = val === "" ? (f.required ? "" : null) : val;
    }
  }
  return row;
}

function missingRequired(coll: Collection, row: Record<string, unknown>): string | null {
  for (const f of coll.fields) {
    if (!f.required) continue;
    const v = row[f.name];
    if (v === "" || v == null) return `${f.label} is required.`;
  }
  return null;
}

export async function saveCollection(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const coll = getCollection(String(fd.get("__collection") ?? ""));
  if (!coll) return { error: "Unknown collection." };
  const id = String(fd.get("__id") ?? "");
  const row = buildRow(coll, fd);
  const missing = missingRequired(coll, row);
  if (missing) return { error: missing };

  const q = await fromTable(coll.table);
  const { error } = id ? await q.update(row).eq("id", id) : await q.insert(row);
  if (error) return { error: error.message };

  coll.revalidate.forEach((p) => revalidatePath(p));
  if (coll.key === "services" && typeof row.slug === "string") {
    revalidatePath(`/services/${row.slug}`);
    revalidatePath("/sitemap.xml");
  }
  revalidatePath(`/admin/${coll.key}`);
  redirect(`/admin/${coll.key}`);
}

export async function deleteCollection(fd: FormData) {
  await requireAdmin();
  const coll = getCollection(String(fd.get("__collection") ?? ""));
  if (!coll) return;
  const id = String(fd.get("__id") ?? "");
  if (!id) return;

  const q = await fromTable(coll.table);
  await q.delete().eq("id", id);
  coll.revalidate.forEach((p) => revalidatePath(p));
  revalidatePath(`/admin/${coll.key}`);
}
