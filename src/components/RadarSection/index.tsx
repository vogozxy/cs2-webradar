import { useContext } from "react";

import { GameContext } from "@/contexts/game";

import Radar from "./Radar";
import RadarMain from "./RadarMain";
import RadarBackground from "./RadarBackground";

export default function RadarSection({ className }: { className?: string }) {
  const gameCtx = useContext(GameContext);

  return (
    <section className={className}>
      {gameCtx.inMatch && (
        <Radar id="radar" className="h-full w-full">
          <RadarBackground />
          <RadarMain />
        </Radar>
      )}
    </section>
  );
}
