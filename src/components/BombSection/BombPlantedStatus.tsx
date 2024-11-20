import { useMemo } from "react";

import { DefuseStatus } from "@/types/bomb";

import { getBombDefuseStatus } from "@/lib/bomb";

import { useGameContext } from "@/lib/hooks/use-game-context";

import { BombPlantedIcon } from "@/components/Icons";

export default function BombPlantedStatus() {
  const { gameData } = useGameContext();

  const detonationTime = gameData?.bomb?.detonation_time ?? 0;
  const bombSite = gameData?.bomb?.site || "N/A";

  const bombTimerColor = useMemo(() => {
    if (bombSite === "N/A") {
      return "";
    }

    switch (getBombDefuseStatus(detonationTime)) {
      case DefuseStatus.Defuseable:
        return "text-green-600";
      case DefuseStatus.DefuseWithKit:
        return "text-yellow-600";
      case DefuseStatus.NoTime:
        return "text-red-600";
      default:
        return "";
    }
  }, [detonationTime, bombSite]);

  return (
    <section className="inline-flex items-center gap-1">
      <BombPlantedIcon size={26} />
      <span className="font-medium">{bombSite}</span>
      <span className={bombTimerColor}>
        ({Math.max(0, detonationTime).toFixed(2)})
      </span>
    </section>
  );
}
