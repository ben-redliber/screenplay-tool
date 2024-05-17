import Link from "next/link";
import MainSection from "~/components/dashboard/MainSection";
import TopNav from "~/components/navs/TopNav";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <MainSection>
        <div className="container flex flex-col justify-center gap-12 ">
          <div className="flex flex-col gap-4">
            <p className="font-displayz text-8xl font-black uppercase">
              Screenplay Tool
            </p>
            <p className="pl-2 text-2xl font-thin text-muted-foreground">
              Automatically generate script breakdown from your screenplay
              files.
            </p>
          </div>
        </div>
      </MainSection>
    </>
  );
}
