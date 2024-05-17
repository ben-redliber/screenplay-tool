import { auth } from "@clerk/nextjs/server";
import BodySection from "~/components/dashboard/BodySection";
import TitleSection from "~/components/dashboard/TitleSection";
import { getSingleScreenplay, getUserProject } from "~/server/queries";
import { getFdxObject } from "~/server/r2Queries";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { ScrollArea } from "~/components/ui/scroll-area";
import { collectTexts } from "~/lib/fdx-tooling/content";

export default async function ProjectPage({
  params,
}: {
  params: { screenplay: number };
}) {
  const screenplayId = String(params.screenplay);
  const screenplayDetail = await getSingleScreenplay(screenplayId);
  const { userId } = auth();
  const fdxKey = `${userId}/fdx/${screenplayDetail?.screenplay_r2_key}`;
  const getFdx = await getFdxObject(fdxKey);

  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
  });
  const jObj = xmlParser.parse(getFdx!) as object;

  const builder = new XMLBuilder();
  const xmlContent: unknown = builder.build(jObj);

  // @ts-expect-error xml file
  // eslint-disable-next-line
  const paragraphs = jObj.FinalDraft.Content.Paragraph;

  const collectParagraphs = await collectTexts(paragraphs);

  return (
    <main className="flex min-h-screen flex-col bg-background py-12 text-white dark:bg-foreground">
      <TitleSection
        title={screenplayDetail?.screenplay_name}
        description={screenplayDetail?.screenplay_description}
      >
        <></>
      </TitleSection>
      <BodySection>
        <p className="text-3xl text-foreground dark:text-background">
          Paragraphs
        </p>
        <ScrollArea className="h-[600px] ">
          {/* eslint-disable-next-line */}
          {collectParagraphs.map((paragraph: unknown, idx: number) => {
            return (
              <div
                className="py-4 font-mono text-foreground dark:text-background"
                key={idx}
              >
                <p>{paragraph}</p>
              </div>
            );
          })}
        </ScrollArea>
        {/* <pre>{JSON.stringify(contents, null, 2)}</pre> */}
      </BodySection>
    </main>
  );
}
