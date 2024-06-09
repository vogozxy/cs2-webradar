import { PrimaryWeapon } from "@/types/weapon";

export default function PlayerPrimaryWeapon({ weapon }: { weapon: number }) {
  return (
    <span className="relative px-2 py-1 text-right">
      {weapon ? PrimaryWeapon[weapon] : <>&ndash;</>}
    </span>
  );
}
