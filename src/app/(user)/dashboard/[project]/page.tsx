import TitleSection from "~/components/dashboard/TitleSection";
import { getUserProject } from "~/server/queries";

export default async function ProjectPage({
  params,
}: {
  params: { project: number };
}) {
  const projectId = String(params.project);
  const projectDetail = await getUserProject(projectId);
  console.log(projectDetail);
  return (
    <main className="flex min-h-screen flex-col bg-background py-12 text-white dark:bg-foreground">
      <TitleSection
        title={projectDetail?.project_name}
        description={projectDetail?.project_description}
      >
        <></>
      </TitleSection>
    </main>
  );
}
