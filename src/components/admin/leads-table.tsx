"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { DataTable, SortableHeader, facetFilterFn } from "@/components/admin/ui/data-table";
import { Button } from "@/components/admin/ui/button";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/admin/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/admin/ui/sheet";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/admin/ui/alert-dialog";
import { updateLeadStatus, deleteLead } from "@/app/admin/(panel)/leads/actions";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string;
  status: string;
  created_at: string;
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function StatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, start] = React.useTransition();
  return (
    <Select
      defaultValue={status}
      onValueChange={(v) => {
        const fd = new FormData();
        fd.set("id", id);
        fd.set("status", v);
        start(() => {
          void updateLeadStatus(fd);
        });
      }}
    >
      <SelectTrigger className="h-8 w-[130px]" disabled={pending}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">New</SelectItem>
        <SelectItem value="contacted">Contacted</SelectItem>
        <SelectItem value="closed">Closed</SelectItem>
      </SelectContent>
    </Select>
  );
}

function LeadActions({ lead }: { lead: Lead }) {
  const [open, setOpen] = React.useState(false);
  const [, start] = React.useTransition();
  return (
    <div className="flex justify-end gap-1">
      <Button variant="ghost" size="icon" aria-label="View details" onClick={() => setOpen(true)}>
        <Eye className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this lead?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes {lead.name}&apos;s enquiry. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const fd = new FormData();
                fd.set("id", lead.id);
                start(() => {
                  void deleteLead(fd);
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{lead.name}</SheetTitle>
            <SheetDescription>Received {fmt(lead.created_at)}</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4 pb-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
              <a className="text-brass" href={`tel:${lead.phone}`}>{lead.phone}</a>
            </div>
            {lead.email && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p>
                <a className="text-brass" href={`mailto:${lead.email}`}>{lead.email}</a>
              </div>
            )}
            {lead.service && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Service</p>
                <p>{lead.service}</p>
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Message</p>
              <p className="whitespace-pre-wrap">{lead.message}</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => <SortableHeader column={column}>Received</SortableHeader>,
    cell: ({ row }) => <span className="text-muted-foreground">{fmt(row.original.created_at)}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    id: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="text-sm">
        <a className="hover:text-brass" href={`tel:${row.original.phone}`}>{row.original.phone}</a>
        {row.original.email && (
          <>
            <br />
            <a className="text-muted-foreground hover:text-brass" href={`mailto:${row.original.email}`}>
              {row.original.email}
            </a>
          </>
        )}
      </div>
    ),
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.service ?? "—"}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: facetFilterFn,
    cell: ({ row }) => <StatusSelect id={row.original.id} status={row.original.status} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <LeadActions lead={row.original} />,
  },
];

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <DataTable
      columns={columns}
      data={leads}
      searchKey="name"
      searchPlaceholder="Search by name…"
      filters={[
        {
          columnId: "status",
          title: "Status",
          options: [
            { label: "New", value: "new" },
            { label: "Contacted", value: "contacted" },
            { label: "Closed", value: "closed" },
          ],
        },
      ]}
    />
  );
}
