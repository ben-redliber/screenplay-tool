import { auth } from "@clerk/nextjs/server";
import BodySection from "~/components/dashboard/BodySection";
import MainSection from "~/components/dashboard/MainSection";
import ProjectAdd from "~/components/dashboard/ProjectAdd";
import TitleSection from "~/components/dashboard/TitleSection";
import TopNav from "~/components/navs/TopNav";

export default function AddProject() {
  const { userId } = auth();
  return (
    <>
      <TopNav
        hasBasicRoutes={false}
        hasAuth={false}
        backButtonRoute="/dashboard"
      />
      <MainSection>
        <TitleSection
          title={"Create New Project"}
          description={"To start a new project, fill the forms below."}
        />
        <BodySection>
          <ProjectAdd userId={String(userId)} />
        </BodySection>
      </MainSection>
    </>
  );
}
