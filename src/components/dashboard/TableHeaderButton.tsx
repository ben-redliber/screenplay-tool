import { ArrowUpDown } from "lucide-react";

export default function TableHeaderButton({ data }: { data: string }) {
  return (
    <>
      <ArrowUpDown className="cursor-pointer hover:fill-zinc-50" size={14} />
      <p className="cursor-pointer text-secondary-foreground hover:text-primary dark:hover:text-primary-foreground">
        {" "}
        &nbsp; {data}
      </p>{" "}
    </>
  );
}
