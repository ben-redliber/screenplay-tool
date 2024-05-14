import { auth } from "@clerk/nextjs/server";
import BodySection from "~/components/dashboard/BodySection";
import ScreenplayAdd from "~/components/dashboard/ScreenplayAdd";
import TitleSection from "~/components/dashboard/TitleSection";

export default function ProjectPage() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 py-12 text-white">
      <TitleSection
        title="New Screenplay"
        description="Add a new fdx file and configure how it affects the project."
      >
        <></>
      </TitleSection>
      <BodySection>
        <ScreenplayAdd />
      </BodySection>
    </main>
  );
}
