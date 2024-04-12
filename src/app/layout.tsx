import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header";
import { Providers } from "./Providers";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Finder",
  description:
    "An application to help pair programming with random devs online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
        <Providers>
          <Toaster />
          <NextTopLoader />
          <Header />
          <div className="container mx-auto">{children}</div>
        </Providers>
        </main>
      </body>
    </html>
  );
}
