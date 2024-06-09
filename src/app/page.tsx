"use client";

import Header from "@/components/Header";
import BombSection from "@/components/BombSection";
import PlayersSection from "@/components/PlayersSection";
import RadarSection from "@/components/RadarSection";
import SettingsSection from "@/components/SettingsSection";

export default function Home() {
  return (
    <>
      <Header />

      <BombSection />

      <main className="flex min-h-[calc(100vh-72px)] flex-col-reverse justify-center px-4 pb-4 lg:flex-row lg:gap-4">
        <PlayersSection />
        <RadarSection />
      </main>

      <SettingsSection />

      <div className="fixed inset-0 -z-10 overflow-hidden blur-md">
        <div className="bg"></div>
      </div>
    </>
  );
}
