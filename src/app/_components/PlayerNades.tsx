import { Grenade } from "@/types/weapon";

import MaskedIcon from "@/components/MaskedIcon";

const Nade = ({ nade }: { nade?: number }) => {
  return (
    <li className="flex h-6 w-6 shrink-0 list-none items-center justify-center rounded-md bg-black/10 text-center dark:bg-white/5">
      {nade ? (
        <MaskedIcon
          path={`/assets/icons/${Grenade[nade].toLowerCase()}.svg`}
          width={20}
          height={20}
          className="h-5 w-5 brightness-[0.25] dark:brightness-100"
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
    <ul data-nades={nades} className="flex justify-end md:justify-normal gap-1">
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
