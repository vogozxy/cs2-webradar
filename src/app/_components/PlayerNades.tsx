import { Grenade } from "@/types/weapon";

import MaskedIcon from "@/components/MaskedIcon";

const Nade = ({ nade }: { nade?: number }) => {
  return (
    <li className="list-none rounded-[0.25em] bg-[hsla(0,0%,80%,0.3)]">
      {nade ? (
        <MaskedIcon
          path={`/assets/icons/${Grenade[nade].toLowerCase()}.svg`}
          width={12}
          height={12}
          alt={Grenade[nade]}
        />
      ) : (
        <>&bull;</>
      )}
    </li>
  );
};

export default function PlayerNades({ nades }: { nades: number[] }) {
  return (
    <ul data-nades={nades} className="flex gap-[0.5em]">
      {nades.length ? (
        nades.map((nade, i) => <Nade key={i} nade={nade} />)
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
