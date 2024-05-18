"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/Button";
import { usePathname, useRouter } from "next/navigation";
export default function DashTopNav() {
  const dashContents = [
    { name: "Overview", href: "/" },
    { name: "Screenplays", href: "/screenplays/" },
    { name: "Characters", href: "/characters/" },
    { name: "Locations", href: "/locations/" },
    { name: "Scenes", href: "/scenes/" },
    { name: "Productions", href: "/productions/" },
  ];

  const currentRoute = usePathname() + "/";
  const selectedProjectId = currentRoute.split("/")[2];
  console.log("Current Route -->", currentRoute);

  return (
    <header className="sticky top-0 border-b-[0.5px] border-b-primary bg-gradient-to-bl from-muted to-background dark:border-b-secondary dark:from-primary dark:to-foreground">
      <nav className="hidden flex-col justify-between gap-4  p-1 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex flex-row justify-center gap-4 self-center align-middle">
          {dashContents.map(({ name, href }) => {
            const linkRoute = `/dashboard/${selectedProjectId}${href}`;

            const currentTab = currentRoute.split("/")[3];
            const linkTab = linkRoute.split("/")[3];

            if (linkRoute == currentRoute || currentTab == linkTab) {
              return (
                <Link
                  className="border-b-2 border-b-primary dark:border-b-secondary"
                  href={linkRoute}
                  key={name}
                >
                  <Button variant="ghost" className="">
                    {name.toUpperCase()}
                  </Button>
                </Link>
              );
            } else {
              return (
                <Link href={linkRoute} key={name}>
                  <Button variant="ghost" className="">
                    {name.toUpperCase()}
                  </Button>
                </Link>
              );
            }
          })}
        </div>
        <div className="flex flex-row gap-4 pr-4 text-white">
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
