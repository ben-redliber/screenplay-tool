import Link from "next/link";
import DashboardCard from "~/components/dashboard/DashboardCard";
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
import { getProjects } from "~/server/queries";

type Project = {
  project_id: number;
  project_name: string | null;
  project_description: string | null;
  created_at: Date;
  updated_at: Date;
  user_id: string | null;
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const projects: Project[] = await getProjects();
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 px-12 py-12 text-white">
      <div className="container flex flex-col justify-center gap-6 ">
        <div id="title-section" className="flex max-w-2xl flex-col gap-0">
          <p className="text-4xl tracking-widest">DASHBOARD</p>
          <p className=" text-lg font-thin text-zinc-300">
            Automatically generate script breakdown from your screenplay files.
          </p>
        </div>
        <div id="buttons-section" className="flex flex-wrap">
          <Button>New Project</Button>
        </div>
        <div id="projects-section" className="flex flex-wrap gap-4">
          {projects.map(
            ({
              project_id,
              project_name,
              project_description,
              created_at,
              user_id,
              updated_at,
            }: Project) => (
              <DashboardCard
                key={project_id}
                project_id={project_id}
                project_name={project_name}
                project_description={project_description}
                created_at={created_at}
                updated_at={updated_at}
                user_id={user_id}
              />
            ),
          )}
        </div>
      </div>
    </main>
  );
}
