import { useContext } from "react";

import { GameContext } from "@/contexts/game";

import Radar from "./Radar";
import RadarMain from "./RadarMain";
import RadarBackground from "./RadarBackground";

export default function RadarSection() {
  const gameCtx = useContext(GameContext);

  return (
    <section className="relative h-[calc(100vw-2rem-1px)] w-full rounded-lg bg-black/5 lg:h-auto dark:bg-white/5">
      {!gameCtx.inMatch ? (
        <div className="absolute flex h-full w-full items-center justify-center">
          <div className="text-center font-mono text-2xl">
            <div className="bg-red-600 text-white">ATTENTION</div>
            <div className="bg-sky-500 px-8 py-6 text-black">
              NO SIGNAL INPUT
            </div>
          </div>
        </div>
      ) : null}
      <Radar id="radar" className="h-full w-full">
        <RadarBackground />
        <RadarMain />
      </Radar>
    </section>
  );
}
