"use client";

import * as React from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { DataTable, facetFilterFn } from "@/components/admin/ui/data-table";
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/admin/ui/alert-dialog";
import { deleteCollection } from "@/app/admin/(panel)/[collection]/actions";
import type { Collection } from "@/lib/admin/collections";

type Row = Record<string, unknown>;

function renderCell(v: unknown, col: string): React.ReactNode {
  if (typeof v === "boolean") {
    if (col === "published") return <Badge variant={v ? "success" : "secondary"}>{v ? "Published" : "Draft"}</Badge>;
    return v ? "Yes" : "No";
  }
  return v == null || v === "" ? "—" : String(v);
}

function RowActions({ collectionKey, id }: { collectionKey: string; id: string }) {
  const [, start] = React.useTransition();
  return (
    <div className="flex justify-end gap-1">
      <Button asChild variant="ghost" size="icon" aria-label="Edit">
        <Link href={`/admin/${collectionKey}/${id}`}><Pencil className="h-4 w-4" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const fd = new FormData();
                fd.set("__collection", collectionKey);
                fd.set("__id", id);
                start(() => { void deleteCollection(fd); });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function CollectionTable({ collection, rows }: { collection: Collection; rows: Row[] }) {
  const columns: ColumnDef<Row>[] = [
    ...collection.listColumns.map(
      (c): ColumnDef<Row> => ({
        accessorKey: c,
        header: c.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
        ...(c === "published" ? { filterFn: facetFilterFn } : {}),
        cell: ({ row }) => <span>{renderCell(row.original[c], c)}</span>,
      }),
    ),
    { id: "actions", cell: ({ row }) => <RowActions collectionKey={collection.key} id={String(row.original.id)} /> },
  ];
  const hasPublished = collection.listColumns.includes("published");
  return (
    <DataTable
      columns={columns}
      data={rows}
      searchKey={collection.listColumns[0]}
      searchPlaceholder="Search…"
      filters={hasPublished ? [{ columnId: "published", title: "Status", options: [{ label: "Published", value: "true" }, { label: "Draft", value: "false" }] }] : []}
    />
  );
}
