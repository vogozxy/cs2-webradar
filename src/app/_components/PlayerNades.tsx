import { Grenade } from "@/types/weapon";

import MaskedIcon from "@/components/MaskedIcon";

const Nade = ({ nade }: { nade?: number }) => {
  return (
    <li className="list-none rounded-md bg-black/10 dark:bg-white/5 w-6 h-6 text-center flex items-center justify-center">
      {nade ? (
        <MaskedIcon
          path={`/assets/icons/${Grenade[nade].toLowerCase()}.svg`}
          width={20}
          height={20}
          className="w-5 h-5 brightness-[0.25] dark:brightness-100"
          alt={Grenade[nade]}
        />
      ) : (
        <></>
      )}
    </li>
  );
};

export default function PlayerNades({ nades }: { nades: number[] }) {

  return (
    <ul data-nades={nades} className="flex gap-1">
      {nades.length ? (
        [...Array(4)].map((x, i) => <Nade key={i} nade={nades[i]} />)
      ) : (
        <>
          <Nade />
          <Nade />
          <Nade />
          <Nade />
        </>
      )}
    </ul>
  );
}
