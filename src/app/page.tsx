"use client";

import { useEffect } from "react";
import Image from "next/image";

import { useGameContext } from "@/lib/hooks/use-game-context";
import { useWakeLock } from "@/lib/hooks/use-wake-lock";

import Header from "@/components/Header";
import BombSection from "@/components/BombSection";
import PlayersSection from "@/components/PlayersSection";
import RadarSection from "@/components/RadarSection";
import SettingsSection from "@/components/SettingsSection";

export default function Home() {
  const { inMatch } = useGameContext();

  const { isSupported, request, release } = useWakeLock({
    reacquireOnPageVisible: true,
  });

  useEffect(() => {
    if (!isSupported) return;

    request();

    return () => {
      release();
    };
  }, [isSupported, request, release]);

  return (
    <>
      {inMatch ? (
        <>
          <main className="h-full space-y-1.5 lg:flex lg:flex-col lg:gap-1.5 lg:space-y-0">
            <BombSection />
            <div className="h-full lg:flex lg:flex-row-reverse lg:gap-1.5">
              <RadarSection className="relative h-full overflow-hidden rounded-lg bg-black/5 lg:w-3/5 dark:bg-white/5" />
              <div className="py-1.5 lg:w-2/5">
                <Header />
                <PlayersSection />
              </div>
            </div>
          </main>

          <SettingsSection />
        </>
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
