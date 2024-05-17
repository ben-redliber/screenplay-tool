import { auth } from "@clerk/nextjs/server";
import BodySection from "~/components/dashboard/BodySection";
import MainSection from "~/components/dashboard/MainSection";
import ScreenplayAdd from "~/components/dashboard/ScreenplayAdd";
import TitleSection from "~/components/dashboard/TitleSection";

export default function ProjectPage() {
  return (
    <MainSection>
      <TitleSection
        title="New Screenplay"
        description="Add a new fdx file and configure how it affects the project."
      >
        <></>
      </TitleSection>
      <BodySection>
        <ScreenplayAdd />
      </BodySection>
    </MainSection>
  );
}
