import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/Button";
export default function TopNav() {
  const contents = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/" },
    { name: "Docs", href: "/" },
  ];
  return (
    <header className="sticky top-0 border-b-[0.5px] border-b-primary bg-gradient-to-bl from-muted to-background dark:border-b-secondary dark:from-primary dark:to-foreground">
      <nav className="hidden flex-col justify-between gap-6  p-1 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex flex-row justify-center gap-4 text-primary dark:text-primary-foreground">
          {contents.map(({ name, href }) => (
            <Link href={`/dashboard${href}`} key={name}>
              <Button variant="ghost">{name}</Button>
            </Link>
          ))}
        </div>
        <div className="flex flex-row gap-4 text-white">
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
