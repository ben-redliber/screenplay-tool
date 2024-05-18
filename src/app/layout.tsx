import "~/styles/globals.css";
import { DM_Sans, Inter_Tight } from "next/font/google";
import local from "next/font/local";

import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "~/components/navs/TopNav";
import { ThemeProvider } from "~/components/providers/theme-provider";

export const viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
};

export const metadata = {
  title: "Screenplay Tool by redliber",
  description: "Automatically generate screenplay breakdowns",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const displayFont = Inter_Tight({
  subsets: ["latin"],
  // weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-displayz",
});

const condensed = local({
  src: [
    {
      path: "../../public/fonts/sprat/Sprat-CondensedThin.otf",
      weight: "100",
    },
    {
      path: "../../public/fonts/sprat/Sprat-CondensedLight.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/sprat/Sprat-CondensedRegular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/sprat/Sprat-CondensedMedium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/sprat/Sprat-CondensedBold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/sprat/Sprat-CondensedBlack.otf",
      weight: "900",
    },
  ],
  variable: "--font-serif-condensed",
});

const extended = local({
  src: [
    {
      path: "../../public/fonts/sprat/Sprat-ExtendedThin.otf",
      weight: "100",
    },
    {
      path: "../../public/fonts/sprat/Sprat-ExtendedLight.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/sprat/Sprat-ExtendedRegular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/sprat/Sprat-ExtendedMedium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/sprat/Sprat-ExtendedBold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/sprat/Sprat-ExtendedBlack.otf",
      weight: "900",
    },
  ],
  variable: "--font-serif-extended",
});

const sprat = local({
  src: [
    {
      path: "../../public/fonts/sprat/Sprat-RegularThin.otf",
      weight: "100",
    },
    {
      path: "../../public/fonts/sprat/Sprat-RegularLight.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/sprat/Sprat-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/sprat/Sprat-RegularMedium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/sprat/Sprat-RegularBold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/sprat/Sprat-RegularBlack.otf",
      weight: "900",
    },
  ],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${condensed.variable} ${extended.variable} ${sprat.variable} ${font.className} ${displayFont.variable} `}
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
