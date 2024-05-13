import { ArrowUpDown } from "lucide-react";

export default function TableHeaderButton({ data }: { data: string }) {
  return (
    <>
      <ArrowUpDown className="cursor-pointer hover:fill-zinc-50" size={14} />
      <p className="cursor-pointer hover:text-zinc-50"> &nbsp; {data}</p>{" "}
    </>
  );
}
