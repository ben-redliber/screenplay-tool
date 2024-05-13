import BodySection from "~/components/dashboard/BodySection";
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
  // console.log("projectScreenplays ->", projectScreenplays);

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 py-12 text-white">
      <TitleSection
        title="Screenplays"
        description="FDX Files associated with the project."
      >
        <Button> Add Screenplay </Button>
      </TitleSection>
      <BodySection>
        <ScreenplaysList data={projectScreenplays} />
      </BodySection>
    </main>
  );
}
