"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import TableHeaderButton from "~/components/dashboard/TableHeaderButton";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Screenplay = {
  screenplay_id: number;
  screenplay_name: string;
  screenplay_description: string;
  screenplay_r2_key: string;
  screenplay_revision: string;
  screenplay_draft: number;
  project_id: number;
  created_at: Date;
};

export const columns: ColumnDef<Screenplay>[] = [
  {
    accessorKey: "screenplay_id",
    header: ({ column }) => {
      return <div className="invisible hidden"></div>;
    },
    cell: ({ row }) => {
      return <div className="invisible hidden"></div>;
    },
  },
  {
    accessorKey: "screenplay_name",
    header: ({ column }) => {
      return (
        <a
          className="flex flex-row items-center px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TableHeaderButton data="Name" />
        </a>
      );
    },
    cell: ({ row }) => {
      const screenplay_id: number = row.getValue("screenplay_id");
      console.log("SCID", screenplay_id);
      return (
        <Link
          href={`screenplays/${screenplay_id}`}
          className="max-w-sm items-start justify-start px-2"
        >
          <p className="text-zinc-10 cursor-pointer tracking-widest hover:text-zinc-300">
            {row.getValue("screenplay_name")}
          </p>
        </Link>
      );
    },
  },
  {
    accessorKey: "screenplay_description",
    header: ({ column }) => {
      return (
        <a
          className="flex flex-row items-center  px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TableHeaderButton data="Description" />
        </a>
      );
    },
    cell: ({ row }) => {
      const descValue = String(row.getValue("screenplay_description"));
      const cutDesc =
        descValue.length > 75 ? descValue.substring(0, 75) + "..." : descValue;
      return (
        <div className=" max-w-xs px-2">
          <p className=" text-zinc-400">{cutDesc}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "screenplay_revision",
    header: ({ column }) => {
      return (
        <a
          className="flex min-w-24 flex-row items-center  px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TableHeaderButton data="Revision" />
        </a>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="min-w-16 px-2">
          <p className=" text-zinc-400">
            {String(row.getValue("screenplay_revision"))}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "screenplay_draft",
    header: ({ column }) => {
      return (
        <a
          className="flex flex-row items-center  px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TableHeaderButton data="Draft" />
        </a>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="min-w-16 px-2">
          <p className=" text-zinc-400">{row.getValue("screenplay_draft")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <a
          className="flex flex-row items-center  px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <TableHeaderButton data="Created At" />
        </a>
      );
    },
    cell: ({ row }) => {
      const createdDate = new Date(row.getValue("created_at"));
      return (
        <div className="min-w-16 px-2">
          <p className=" text-zinc-400">{createdDate.toDateString()}</p>
          <p className=" text-zinc-400">
            {createdDate.toTimeString().substring(0, 9)}
          </p>
        </div>
      );
    },
  },
];
