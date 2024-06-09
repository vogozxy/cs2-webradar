import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { SettingsProvider } from "@/contexts/settings";
import { GameProvider } from "@/contexts/game";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CS2 Webradar",
  description: "CS2 Webradar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SettingsProvider>
          <GameProvider>{children}</GameProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
