import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/Button";
export default function DashTopNav() {
  const dashContents = [
    { name: "SCREENPLAYS", href: "/screenplays" },
    { name: "CHARACTERS", href: "/characters" },
    { name: "LOCATIONS", href: "/locations" },
    { name: "SCENES", href: "/scenes" },
  ];
  const contents = [
    { name: "HOME", href: "/" },
    { name: "FEATURES", href: "/" },
    { name: "DOCS", href: "/" },
  ];
  return (
    <header className="sticky top-0 border-b-[0.5px] border-b-zinc-50/30 bg-gradient-to-bl from-zinc-800 to-black ">
      <nav className="hidden flex-col justify-between gap-6  p-1 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex flex-row justify-center gap-4 self-center align-middle text-white">
          {dashContents.map(({ name, href }) => (
            <Link href={`/dashboard${href}`} key={name}>
              <Button variant="ghost">{name}</Button>
            </Link>
          ))}
        </div>
        <div className="flex flex-row gap-4 pr-4 text-white">
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
