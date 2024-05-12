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
import { getProjects } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const projects = await getProjects();
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
            ({ project_name, project_id, project_description, created_at }) => (
              <Link href={`/dashboard/${project_id}`} key={project_id}>
                <Card className="max-w-72 hover:bg-zinc-200">
                  <CardHeader>
                    <CardTitle className="text-2xl tracking-widest">
                      {project_name}
                    </CardTitle>
                    <CardDescription>{project_description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <p className=" text-xs font-thin text-zinc-500/75">
                      Created {created_at.toLocaleDateString()}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
