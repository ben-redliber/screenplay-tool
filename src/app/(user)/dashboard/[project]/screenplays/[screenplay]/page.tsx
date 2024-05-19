/* eslint-disable */

import { auth } from "@clerk/nextjs/server";
import BodySection from "~/components/dashboard/BodySection";
import TitleSection from "~/components/dashboard/TitleSection";
import { getSingleScreenplay, getUserProject } from "~/server/queries";
import { getFdxObject } from "~/server/r2Queries";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { ScrollArea } from "~/components/ui/scroll-area";
import { collectLocations, collectTexts } from "~/lib/fdx-tooling/content";
import CurrentProject from "~/components/dashboard/CurrentProject";
import MainSection from "~/components/dashboard/MainSection";

export default async function ProjectPage({
  params,
}: {
  params: { screenplay: number };
}) {
  const screenplayId = String(params.screenplay);
  const screenplayDetail = await getSingleScreenplay(screenplayId);

  const currentProject = await getUserProject(
    String(screenplayDetail?.project_id),
  );
  const projectName = String(currentProject?.project_name);

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
  const finalDraftRoot = jObj.FinalDraft;

  const paragraphs = finalDraftRoot.Content.Paragraph;
  const collectParagraphs = await collectTexts(paragraphs);
  const collectLocs = await collectLocations(paragraphs);

  return (
    <MainSection>
      <CurrentProject projectName={projectName} />

      <TitleSection
        title={screenplayDetail?.screenplay_name}
        description={screenplayDetail?.screenplay_description}
      >
        <></>
      </TitleSection>
      <BodySection>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-2 border border-muted-foreground p-4">
            <p className="font-displayz text-3xl font-black uppercase text-foreground dark:text-background">
              Contents
            </p>
            <ScrollArea className="h-[500px] max-w-sm">
              {collectParagraphs.map((paragraph: unknown, idx: number) => {
                return (
                  <div className="py-4 font-mono" key={idx}>
                    <p className="text-foreground dark:text-background">
                      {paragraph}
                    </p>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
          <div className="flex flex-col gap-2 border border-muted-foreground p-4">
            <p className="font-displayz text-3xl font-black uppercase text-foreground dark:text-background ">
              Locations
            </p>
            <ScrollArea className=" h-[500px] max-w-sm ">
              <div className="flex flex-col gap-10">
                {collectLocs.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-0">
                    <p className="font-mono text-foreground dark:text-background">
                      Location: {item.loc}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      Time: {item.timeOfDay}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      Occurrences: {item.amount}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      Filming: {item.filming}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </BodySection>
    </MainSection>
  );
}
