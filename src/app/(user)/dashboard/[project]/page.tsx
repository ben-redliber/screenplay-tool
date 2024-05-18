import MainSection from "~/components/dashboard/MainSection";
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
    <MainSection>
      <TitleSection
        title={projectDetail?.project_name}
        description={projectDetail?.project_description}
      >
        <></>
      </TitleSection>
    </MainSection>
  );
}
