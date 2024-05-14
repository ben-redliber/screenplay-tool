import TitleSection from "~/components/dashboard/TitleSection";
import { getUserProject } from "~/server/queries";

export default async function LocationsPage({ params }: { params: unknown }) {
  // const projectId = String(params.project);
  // const projectDetail = await getUserProject(projectId);

  return (
    <main className="flex min-h-screen flex-col bg-background py-12 text-white dark:bg-foreground">
      <TitleSection
        title="Locations"
        description="Locations associated with the project."
      />
    </main>
  );
}
