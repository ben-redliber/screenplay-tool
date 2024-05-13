import TitleSection from "~/components/dashboard/TitleSection";
import { getUserProject } from "~/server/queries";

export default async function ScenesPage({ params }: { params: unknown }) {
  // const projectId = String(params.project);
  // const projectDetail = await getUserProject(projectId);

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 py-12 text-white">
      <TitleSection
        title="Scenes"
        description="Scenes associated with the project."
      />
    </main>
  );
}
