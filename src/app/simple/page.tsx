"use client";

import Image from "next/image";

import { useGameContext } from "@/lib/hooks/use-game-context";

import BombSection from "@/components/BombSection";
import RadarSection from "@/components/RadarSection";

export default function Home() {
  const { inMatch } = useGameContext();

  return (
    <>
      {inMatch ? (
        <main className="h-full space-y-1.5 lg:flex lg:flex-col lg:gap-1.5 lg:space-y-0">
          <BombSection />
          <RadarSection className="relative h-full rounded-lg bg-black/5 dark:bg-white/5" />
        </main>
      ) : (
        <>
          <div className="fixed inset-0 z-[-10] overflow-hidden bg-repeat blur-md">
            <Image
              src="/assets/cs2.webp"
              alt="Counter-Strike 2 Background"
              className="shadow-light dark:shadow-dark"
              fill
            />
          </div>
          <div className="fixed inset-0 z-[-10] flex items-center justify-center drop-shadow-xl">
            <div className="text-center font-mono text-2xl">
              <div className="bg-red-600 text-white">ATTENTION</div>
              <div className="bg-sky-500 px-8 py-6 text-black">
                NO SIGNAL INPUT
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
