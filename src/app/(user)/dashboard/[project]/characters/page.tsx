import MainSection from "~/components/dashboard/MainSection";
import TitleSection from "~/components/dashboard/TitleSection";
import { getUserProject } from "~/server/queries";

export default async function CharactersPage({ params }: { params: unknown }) {
  // const projectId = String(params.project);
  // const projectDetail = await getUserProject(projectId);

  return (
    <MainSection>
      <TitleSection
        title="Characters"
        description="Characters and Casts associated with the project."
      />
    </MainSection>
  );
}
