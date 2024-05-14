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
    { name: "Home", href: "/", replace: true },
    { name: "Features", href: "/", replace: true },
    { name: "Docs", href: "/", replace: true },
  ];
  return (
    <div>
      <div className="border-b-[0.5px] border-b-primary bg-gradient-to-bl from-muted to-background dark:border-b-secondary dark:from-primary dark:to-foreground">
        <nav className="hidden flex-col justify-between gap-6  p-1 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <div className="flex flex-row justify-center gap-4">
            <div className="flex flex-row items-center justify-center">
              <Link href={`/dashboard`}>
                <Button variant="ghost" className="">
                  Dashboard
                </Button>
              </Link>
              <p className="pl-2">|</p>
            </div>
            <div className="flex flex-row justify-center gap-4">
              {contents.map(({ name, href }) => (
                <Link href={`${href}`} key={name}>
                  <Button variant="ghost" className="">
                    {name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
      <DashTopNav />
      {children}
    </div>
  );
}
