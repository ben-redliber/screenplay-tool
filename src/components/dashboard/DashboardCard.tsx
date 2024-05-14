"use client";
import Link from "next/link";
import IconPlusSquareFill from "~/components/svg/IconPlusSquareFill";
import { Button } from "~/components/ui/Button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "~/components/ui/card";

type Project = {
  project_id: number;
  project_name: string | null;
  project_description: string | null;
  created_at: Date;
  updated_at: Date;
  user_id: string | null;
};

export default function DashboardCard({
  project_id,
  project_name,
  project_description,
  created_at,
  updated_at,
  user_id,
}: Project) {
  return (
    <Card className="max-w-72 ">
      <CardHeader>
        <CardTitle className="text-2xl tracking-widest">
          <Link href={`/dashboard/${project_id}`}>{project_name}</Link>
        </CardTitle>
        <CardDescription>{project_description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p className="text-xs font-thin text-inherit">
          Created {created_at.toDateString()}
        </p>
        <p className="text-xs font-thin text-inherit">
          Last Updated {updated_at.toDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
