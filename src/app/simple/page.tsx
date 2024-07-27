"use client";

import { useContext } from "react";

import { GameContext } from "@/contexts/game";

import BombSection from "@/components/BombSection";
import RadarSection from "@/components/RadarSection";

export default function Home() {
  const gameCtx = useContext(GameContext);

  return (
    <>
      <BombSection />

      {gameCtx.inMatch ? (
        <main>
          <RadarSection className="relative h-[calc(100svh-5rem)] rounded-lg bg-black/5 dark:bg-white/5" />
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

      <div className="fixed inset-0 -z-20 overflow-hidden blur-md">
        <div className="bg"></div>
      </div>
    </>
  );
}
