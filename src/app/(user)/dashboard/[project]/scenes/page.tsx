import CurrentProject from "~/components/dashboard/CurrentProject";
import MainSection from "~/components/dashboard/MainSection";
import TitleSection from "~/components/dashboard/TitleSection";
import { getUserProject } from "~/server/queries";

export default async function ScenesPage({
  params,
}: {
  params: { project: number };
}) {
  const projectId = String(params.project);

  const currentProject = await getUserProject(projectId);
  const projectName = String(currentProject?.project_name);

  return (
    <MainSection>
      <CurrentProject projectName={projectName} />
      <TitleSection
        title="Scenes"
        description="Scenes associated with the project."
      />
    </MainSection>
  );
}
