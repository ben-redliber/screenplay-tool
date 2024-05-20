/* eslint-disable */

import { auth } from "@clerk/nextjs/server";
import BodySection from "~/components/dashboard/BodySection";
import TitleSection from "~/components/dashboard/TitleSection";
import { getSingleScreenplay, getUserProject } from "~/server/queries";
import { getFdxObject } from "~/server/r2Queries";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  collectActs,
  collectCharacters,
  collectDialogues,
  collectElementSettings,
  collectLocations,
  collectMeta,
  collectScenes,
  collectTexts,
} from "~/lib/fdx-tooling/content";
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
  const characters = finalDraftRoot.Cast.Member;
  const elements = finalDraftRoot.ElementSettings;

  const collectParagraphs = await collectTexts(paragraphs);
  const collectLocs = await collectLocations(paragraphs);
  const collectChars = await collectCharacters(characters);
  const collectDlgs = await collectDialogues(paragraphs);
  const collectScns = await collectScenes(paragraphs);
  const collectActsData = await collectActs(paragraphs);

  const collectElmts = await collectElementSettings(elements);
  // console.log(collectElmts);

  console.log("collected Scenes -->", collectScns);
  const collectMt = await collectMeta(paragraphs, collectScns, collectActsData);

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
            <p className="font-displayz text-3xl font-black uppercase text-foreground dark:text-background ">
              Metadata
            </p>
            <ScrollArea className=" h-[500px] w-72 max-w-sm ">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-0">
                  <p className="font-mono text-lg font-black text-foreground dark:text-background">
                    PAGE TOTAL: {collectMt.page_amt}
                  </p>
                </div>
              </div>
            </ScrollArea>
          </div>
          <div className="flex flex-col gap-2 border border-muted-foreground p-4">
            <p className="font-displayz text-3xl font-black uppercase text-foreground dark:text-background">
              Contents
            </p>
            <ScrollArea className="h-[500px] w-72 max-w-sm">
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
            <ScrollArea className=" h-[500px] w-72 max-w-sm ">
              <div className="flex flex-col gap-10">
                {collectLocs.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-0">
                    <p className="font-mono text-lg font-black text-foreground dark:text-background">
                      {item.loc}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      <strong>TIME:</strong> {item.timeOfDay}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      <strong>OCCURRENCES:</strong> {item.amount}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      <strong>FILMING:</strong> {item.filming}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="flex flex-col gap-2 border border-muted-foreground p-4">
            <p className="font-displayz text-3xl font-black uppercase text-foreground dark:text-background ">
              Characters
            </p>
            <ScrollArea className=" h-[500px] w-72 max-w-sm ">
              <div className="flex flex-col gap-2">
                {collectChars.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-0">
                    <p className="font-mono text-foreground dark:text-background">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="flex flex-col gap-2 border border-muted-foreground p-4">
            <p className="font-displayz text-3xl font-black uppercase text-foreground dark:text-background ">
              Dialogues
            </p>
            <ScrollArea className=" h-[500px] w-72 max-w-sm ">
              <div className="flex flex-col gap-2">
                {collectDlgs.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-0">
                    <p className="font-mono font-extrabold text-foreground dark:text-background">
                      {item.character}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      {item.dialogue}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="flex flex-col gap-2 border border-muted-foreground p-4">
            <p className="font-displayz text-3xl font-black uppercase text-foreground dark:text-background ">
              Scenes
            </p>
            <ScrollArea className=" h-[500px] w-72 max-w-sm ">
              <div className="flex flex-col gap-10">
                {collectScns.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-0">
                    <p className="font-mono text-lg font-black text-foreground dark:text-background">
                      {item?.scene_name}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      <strong>NUMBER:</strong> {item?.scene_number}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      <strong>PAGE #:</strong> {item?.page_number}
                    </p>
                    <p className="font-mono text-foreground dark:text-background">
                      <strong>LENGTH:</strong> {item?.scene_length}
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
