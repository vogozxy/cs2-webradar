import { useContext } from "react";

import { DefuseStatus } from "@/types/bomb";

import { getBombDefuseStatus } from "@/lib/bomb";

import { GameContext } from "@/contexts/game";

import NextIMage from "@/components/NextImage";

export default function BombPlantedStatus() {
  const gameCtx = useContext(GameContext);

  const detonationTime = gameCtx.gameData?.bomb.detonation_time ?? 0;
  const bombSite = gameCtx.gameData?.bomb.site || "N/A";
  let bombTimerColor = "";

  switch (getBombDefuseStatus(detonationTime)) {
    case DefuseStatus.Defuseable:
      bombTimerColor = "text-green-600";
      break;
    case DefuseStatus.DefuseWithKit:
      bombTimerColor = "text-yellow-600";
      break;
    case DefuseStatus.NoTime:
      bombTimerColor = "text-red-600";
      break;
  }

  if (bombSite === "N/A") {
    bombTimerColor = "";
  }

  return (
    <section className="inline-flex gap-1">
      <NextIMage
        src="/assets/icons/c4-planted.svg"
        width={26}
        height={26}
        className="brightness-[0.25] dark:brightness-100"
        alt="C4"
      />
      <span className="font-medium">{bombSite}</span>
      <span className={bombTimerColor}>
        ({Math.max(0, detonationTime).toFixed(2)})
      </span>
    </section>
  );
}
