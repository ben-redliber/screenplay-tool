export const dynamic = "force-dynamic";
import Link from "next/link";
import BodySection from "~/components/dashboard/BodySection";
import CurrentProject from "~/components/dashboard/CurrentProject";
import MainSection from "~/components/dashboard/MainSection";
import ScreenplaysList from "~/components/dashboard/ScreenplaysList";
import TitleSection from "~/components/dashboard/TitleSection";
import { Button } from "~/components/ui/Button";
import { getScreenplays, getUserProject } from "~/server/queries";

export default async function ScreenplaysPage({
  params,
}: {
  params: { project: number };
}) {
  const projectId = String(params.project);
  const projectScreenplays = await getScreenplays(projectId);

  const currentProject = await getUserProject(projectId);
  const projectName = String(currentProject?.project_name);

  return (
    <MainSection>
      <CurrentProject projectName={projectName} />
      <TitleSection
        title="Screenplays"
        description="FDX Files associated with the project."
      >
        <Link href={`/dashboard/${projectId}/screenplays/add`}>
          <Button> Add Screenplay </Button>
        </Link>
      </TitleSection>
      <BodySection>
        <ScreenplaysList data={projectScreenplays} />
      </BodySection>
    </MainSection>
  );
}
