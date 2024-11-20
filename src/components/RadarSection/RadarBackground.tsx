import Image from "next/image";

import { useGameContext } from "@/lib/hooks/use-game-context";

export default function RadarBackground() {
  const { currentMap } = useGameContext();

  return (
    <div id="radar-background" className="absolute inset-0 border-red-700">
      <Image
        src={`/maps/${currentMap}/radar.png`}
        alt="Map background"
        style={{ objectFit: "contain" }}
        fill
        priority
      />
    </div>
  );
}
