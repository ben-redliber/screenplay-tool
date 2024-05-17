import MainSection from "~/components/dashboard/MainSection";
import TitleSection from "~/components/dashboard/TitleSection";
import { getUserProject } from "~/server/queries";

export default async function LocationsPage({ params }: { params: unknown }) {
  // const projectId = String(params.project);
  // const projectDetail = await getUserProject(projectId);

  return (
    <MainSection>
      <TitleSection
        title="Locations"
        description="Locations associated with the project."
      />
    </MainSection>
  );
}
