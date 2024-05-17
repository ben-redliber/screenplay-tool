import Link from "next/link";
import BodySection from "~/components/dashboard/BodySection";
import DashboardCard from "~/components/dashboard/DashboardCard";
import MainSection from "~/components/dashboard/MainSection";
import TitleSection from "~/components/dashboard/TitleSection";
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
    <MainSection>
      <div className=" flex flex-col justify-center gap-6 ">
        <TitleSection
          title={"Dashboard"}
          description={
            "Automatically generate script breakdown from your screenplay files."
          }
        >
          <Button>New Project</Button>
        </TitleSection>
        <BodySection>
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
        </BodySection>
      </div>
    </MainSection>
  );
}
