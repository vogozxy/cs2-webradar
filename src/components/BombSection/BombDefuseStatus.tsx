import { useMemo } from "react";

import { isBombDefuseable } from "@/lib/bomb";
import { cn } from "@/lib/utils";

import { useGameContext } from "@/lib/hooks/use-game-context";

export default function BombDefuseStatus() {
  const { gameData } = useGameContext();

  const isDefusing = gameData?.bomb?.state === "defusing";
  const detonationTime = gameData?.bomb?.detonation_time ?? 0;
  const defuseTime = gameData?.bomb?.defuse_time ?? 0;

  const bombDefuseableColor = useMemo(() => {
    if (!isDefusing) return "";
    return isBombDefuseable(detonationTime, defuseTime)
      ? "text-green-600"
      : "text-red-600";
  }, [isDefusing, detonationTime, defuseTime]);

  return (
    <section className="inline-flex items-center gap-1">
      <span className={cn("font-medium", isDefusing && "text-blue-500")}>
        {isDefusing ? "Defusing..." : "Not Defusing"}
      </span>
      <span className={bombDefuseableColor}>
        ({isDefusing ? defuseTime.toFixed(2) : "0.00"})
      </span>
    </section>
  );
}
