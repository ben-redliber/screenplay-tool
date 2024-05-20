import { auth } from "@clerk/nextjs/server";
import BodySection from "~/components/dashboard/BodySection";
import MainSection from "~/components/dashboard/MainSection";
import ScreenplayAdd from "~/components/dashboard/ScreenplayAdd";
import TitleSection from "~/components/dashboard/TitleSection";
import { getUserStp } from "~/server/queries";

export default async function ProjectPage() {
  const userStp = await getUserStp();
  const revisionsColour = userStp.filter(
    (item) => item.stp_category == "revision_colours",
  );
  const stpColour = revisionsColour[0]?.stp_content;
  return (
    <MainSection>
      <TitleSection
        title="New Screenplay"
        description="Add a new fdx file and configure how it affects the project."
      >
        <></>
      </TitleSection>
      <BodySection>
        <ScreenplayAdd stp={stpColour!} />
      </BodySection>
    </MainSection>
  );
}
