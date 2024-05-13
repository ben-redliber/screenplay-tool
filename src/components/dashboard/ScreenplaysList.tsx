import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  type Screenplay,
  columns,
} from "~/app/(user)/dashboard/[project]/screenplays/columns";
import { DataTable } from "../ui/DataTable";

export default function ScreenplaysList({ data }: { data: Screenplay[] }) {
  console.log(data[0]);
  return <DataTable columns={columns} data={data} />;
}
