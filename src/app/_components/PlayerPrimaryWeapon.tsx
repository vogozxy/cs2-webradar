import { PrimaryWeapon } from "@/types/weapon";

export default function PlayerPrimaryWeapon({ weapon }: { weapon: number }) {
  return (
    <span className="relative pe-[0.5em] ps-[0.5em]">
      {weapon ? PrimaryWeapon[weapon] : <>&ndash;</>}
    </span>
  );
}
