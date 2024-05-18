import CurrentProject from "~/components/dashboard/CurrentProject";
import MainSection from "~/components/dashboard/MainSection";
import TitleSection from "~/components/dashboard/TitleSection";
import { getUserProject } from "~/server/queries";

export default async function CharactersPage({
  params,
}: {
  params: { project: unknown };
}) {
  const projectId = String(params.project);

  const currentProject = await getUserProject(projectId);
  const projectName = String(currentProject?.project_name);

  return (
    <MainSection>
      <CurrentProject projectName={projectName} />

      <TitleSection
        title="Characters"
        description="Characters and Casts associated with the project."
      />
    </MainSection>
  );
}
