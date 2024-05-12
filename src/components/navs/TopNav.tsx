import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/Button";
export default function TopNav() {
  const contents = [
    { name: "HOME", href: "/" },
    { name: "FEATURES", href: "/" },
    { name: "DOCS", href: "/" },
  ];
  return (
    <header className="sticky top-0 border-b-[0.5px] border-b-zinc-50/30 bg-gradient-to-bl from-zinc-800 to-black">
      <nav className="hidden flex-col justify-between gap-6  p-2 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex flex-row justify-center gap-4 text-white">
          {contents.map(({ name, href }) => (
            <Link href={`/dashboard${href}`} key={name}>
              <Button variant="ghost">{name}</Button>
            </Link>
          ))}
        </div>
        <div className="flex flex-row gap-4 text-white">
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button className="text-black" variant="outline">
                SIGN IN
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button className="border border-zinc-50/30">DASHBOARD</Button>
            </Link>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
