"use client";

import { useContext } from "react";

import { GameContext } from "@/contexts/game";

import Header from "@/components/Header";
import BombSection from "@/components/BombSection";
import PlayersSection from "@/components/PlayersSection";
import RadarSection from "@/components/RadarSection";
import SettingsSection from "@/components/SettingsSection";

export default function Home() {
  const gameCtx = useContext(GameContext);

  return (
    <>
      <BombSection />

      {gameCtx.inMatch ? (
        <main className="grid h-full grid-cols-1 gap-2.5 lg:grid-cols-2">
          <div className="order-2 flex flex-col gap-2 self-start lg:order-1">
            <Header />
            <PlayersSection />
          </div>
          <RadarSection className="relative order-1 h-full rounded-lg bg-black/5 lg:order-2 dark:bg-white/5" />
        </main>
      ) : (
        <div className="fixed inset-0 -z-10 flex items-center justify-center drop-shadow-xl">
          <div className="text-center font-mono text-2xl">
            <div className="bg-red-600 text-white">ATTENTION</div>
            <div className="bg-sky-500 px-8 py-6 text-black">
              NO SIGNAL INPUT
            </div>
          </div>
        </div>
      )}

      <SettingsSection />

      <div className="fixed inset-0 -z-20 overflow-hidden blur-md">
        <div className="bg"></div>
      </div>
    </>
  );
}
