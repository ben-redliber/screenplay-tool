import Link from "next/link";
import TopNav from "~/components/navs/TopNav";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main className="flex min-h-screen flex-col bg-zinc-950 px-16 py-28 text-white">
        <div className="container flex flex-col justify-center gap-12 ">
          <div className="flex max-w-2xl flex-col gap-4">
            <p className="text-8xl tracking-widest">SCREENPLAY TOOL</p>
            <p className="pl-2 text-2xl font-thin text-zinc-300">
              Automatically generate script breakdown from your screenplay
              files.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
