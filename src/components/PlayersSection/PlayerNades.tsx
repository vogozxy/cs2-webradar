import { memo } from "react";

import { GrenadeIcon } from "@/components/Icons";

type NadeProps = {
  nade?: number;
};

function Nade({ nade }: NadeProps) {
  return (
    <li className="flex h-6 w-6 shrink-0 list-none items-center justify-center rounded-md bg-black/10 text-center dark:bg-white/5">
      {nade && <GrenadeIcon nade={nade} size={20} />}
    </li>
  );
}

type PlayerNadesProps = {
  playerIndex: number;
  nades: number[];
};

function PlayerNades({ playerIndex, nades }: PlayerNadesProps) {
  return (
    <ul data-nades={nades} className="flex justify-end gap-1 md:justify-normal">
      {nades.length
        ? [...Array(4)].map((_, i) => (
            <Nade key={`player-nade-${playerIndex}-${i}`} nade={nades[i]} />
          ))
        : Array.from({ length: 4 }, (_, i) => (
            <Nade key={`player-nade-${playerIndex}-${i}`} />
          ))}
    </ul>
  );
}

export default memo(PlayerNades);
