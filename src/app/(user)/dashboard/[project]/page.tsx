import TitleSection from "~/components/dashboard/TitleSection";
import { getUserProject } from "~/server/queries";

export default async function ProjectPage({
  params,
}: {
  params: { project: number };
}) {
  const projectId = String(params.project);
  const projectDetail = await getUserProject(projectId);

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 py-12 text-white">
      <TitleSection
        title={projectDetail?.project_name}
        description={projectDetail?.project_description}
      >
        <></>
      </TitleSection>
    </main>
  );
}
