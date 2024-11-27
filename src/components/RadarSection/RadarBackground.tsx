import { memo } from "react";
import Image from "next/image";

import { useGameContext } from "@/lib/hooks/use-game-context";

type RadarBackgroundProps = {
  radar: {
    width: number;
    height: number;
    rotation: number;
    scaleFactor: number;
  };
};

function RadarBackground({ radar }: RadarBackgroundProps) {
  const { currentMap } = useGameContext();

  return (
    <div
      id="radar-background"
      className="absolute inset-0 border-red-700"
      style={{
        transform: `rotate(${radar.rotation}deg) scale(${radar.scaleFactor})`,
      }}
    >
      {currentMap !== "<unsupported>" ? (
        <Image
          src={`/maps/${currentMap}/radar.png`}
          alt="Map background"
          className="object-contain"
          fill
          priority
        />
      ) : (
        <>
          <div className="absolute inset-0 z-[-10] flex items-center justify-center drop-shadow-xl">
            <div className="text-center font-mono text-2xl">
              <div className="bg-red-600 text-white">ATTENTION</div>
              <div className="bg-sky-500 px-8 py-6 text-black">
                UNSUPPORTED MAP
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(RadarBackground);
