import { useContext } from "react";

import { isBombDefuseable } from "@/lib/bomb";

import { GameContext } from "@/contexts/game";

export default function BombDefuseStatus() {
  const gameCtx = useContext(GameContext);

  const isDefusing = gameCtx.gameData?.bomb.is_defusing ?? false;
  const detonationTime = gameCtx.gameData?.bomb.detonation_time ?? 0;
  const defuseTime = gameCtx.gameData?.bomb.defuse_time ?? 0;

  const bombDefuseableColor = isDefusing
    ? isBombDefuseable(detonationTime, defuseTime)
      ? "text-green-600"
      : "text-red-600"
    : "";

  return (
    <section className="inline-flex gap-1">
      <span className={`font-medium ${isDefusing ? "text-blue-500" : ""}`}>
        {isDefusing ? "Defusing..." : "Not Defusing"}
      </span>
      <span className={bombDefuseableColor}>
        ({isDefusing ? defuseTime.toFixed(2) : "0.00"})
      </span>
    </section>
  );
}
