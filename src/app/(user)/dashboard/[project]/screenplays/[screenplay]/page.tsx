import { auth } from "@clerk/nextjs/server";
import BodySection from "~/components/dashboard/BodySection";
import TitleSection from "~/components/dashboard/TitleSection";
import { getSingleScreenplay, getUserProject } from "~/server/queries";
import { getFdxObject } from "~/server/r2Queries";
import { XMLParser, XMLBuilder } from "fast-xml-parser";

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
  const stringFdx = JSON.stringify(getFdx);
  const xmlData = stringFdx.substring(1, stringFdx.length - 1);

  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
  });
  const jObj = xmlParser.parse(xmlData) as object;

  const builder = new XMLBuilder();
  const xmlContent: unknown = builder.build(jObj);

  // @ts-expect-error xml file
  // eslint-disable-next-line
  const contents = jObj.FinalDraft.Content.Paragraph;

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 py-12 text-white">
      <TitleSection
        title={screenplayDetail?.screenplay_name}
        description={screenplayDetail?.screenplay_description}
      >
        <></>
      </TitleSection>
      <BodySection>
        {/* eslint-disable-next-line */}
        {/* {contents.map((content: unknown, idx: number) => {
          return <p key={idx}>{JSON.stringify(content)}</p>;
        })} */}
        <pre>{JSON.stringify(contents, null, 2)}</pre>
      </BodySection>
    </main>
  );
}
