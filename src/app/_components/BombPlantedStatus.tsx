import { DefuseStatus } from "@/types/bomb";

import { getBombDefuseStatus } from "@/lib/bomb";

import MaskedIcon from "@/components/MaskedIcon";

export default function BombPlantedStatus({
  bombSite,
  detonationTime,
}: {
  bombSite: "A" | "B" | "";
  detonationTime: number;
}) {
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

  if (bombSite === "") {
    bombTimerColor = "";
  }

  return (
    <section className="inline-flex gap-1">
      <MaskedIcon
        path="/assets/icons/c4-planted.svg"
        width={26}
        height={26}
        className="brightness-[0.25] dark:brightness-100"
        alt="C4"
      />
      <span className="font-medium">{bombSite || "N/A"}</span>
      <span className={bombTimerColor}>
        ({Math.max(0, detonationTime).toFixed(2)})
      </span>
    </section>
  );
}
