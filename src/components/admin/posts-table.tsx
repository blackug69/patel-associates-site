"use client";

import * as React from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { DataTable, SortableHeader } from "@/components/admin/ui/data-table";
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/admin/ui/alert-dialog";
import { deletePost } from "@/app/admin/(panel)/posts/actions";

export type PostRow = {
  id: string;
  title: string;
  category: string;
  published: boolean;
  updated_at: string;
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function PostActions({ id }: { id: string }) {
  const [, start] = React.useTransition();
  return (
    <div className="flex justify-end gap-1">
      <Button asChild variant="ghost" size="icon" aria-label="Edit">
        <Link href={`/admin/posts/${id}`}><Pencil className="h-4 w-4" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>This permanently removes the article from the site.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { const fd = new FormData(); fd.set("id", id); start(() => { void deletePost(fd); }); }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

const columns: ColumnDef<PostRow>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <SortableHeader column={column}>Title</SortableHeader>,
    cell: ({ row }) => <Link href={`/admin/posts/${row.original.id}`} className="font-medium hover:text-brass">{row.original.title}</Link>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>,
  },
  {
    accessorKey: "published",
    header: "Status",
    cell: ({ row }) => <Badge variant={row.original.published ? "success" : "secondary"}>{row.original.published ? "Published" : "Draft"}</Badge>,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => <SortableHeader column={column}>Updated</SortableHeader>,
    cell: ({ row }) => <span className="text-muted-foreground">{fmt(row.original.updated_at)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <PostActions id={row.original.id} />,
  },
];

export function PostsTable({ posts }: { posts: PostRow[] }) {
  return <DataTable columns={columns} data={posts} searchKey="title" searchPlaceholder="Search posts…" />;
}
