import DashTopNav from "~/components/navs/DashTopNav";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/Button";

export const dynamic = "force-dynamic";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contents = [
    { name: "HOME", href: "/" },
    { name: "FEATURES", href: "/" },
    { name: "DOCS", href: "/" },
  ];
  return (
    <div>
      <div className="border-b-[0.5px] border-b-zinc-50/30 bg-gradient-to-bl from-zinc-800 to-black">
        <nav className="hidden flex-col justify-between gap-6  p-1 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <div className="flex flex-row justify-center gap-4 text-white">
            {contents.map(({ name, href }) => (
              <Link href={`/dashboard${href}`} key={name}>
                <Button variant="ghost">{name}</Button>
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <DashTopNav />
      {children}
    </div>
  );
}
