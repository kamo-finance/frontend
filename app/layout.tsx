import "@/styles/global.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import { TxProvider } from "./contexts/TxContext";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { handwriting } from "@/config/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kamo Finance - Unlock Liquidity, Maximize Returns",
  description:
    "A DeFi protocol that enables users to maximize their yield through innovative tokenization and trading strategies.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${handwriting.variable}`}
      lang="en"
    >
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background antialiased",
          handwriting.className
        )}
      >
        <Providers themeProps={{ attribute: "class", forcedTheme: "light" }}>
          <TxProvider>
            <div className="relative flex flex-col h-screen overflow-hidden">
              <Header />
              <Sidebar />
              <main className="flex-grow py-4 mx-12 md:mx-24 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {children}
              </main>
              {/* <Footer /> */}
            </div>
          </TxProvider>
        </Providers>
      </body>
    </html>
  );
}
