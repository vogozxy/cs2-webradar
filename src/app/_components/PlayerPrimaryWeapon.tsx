import { PrimaryWeapon } from "@/types/weapon";

export default function PlayerPrimaryWeapon({ weapon }: { weapon: number }) {
  return (
    <span className="relative py-1 px-2 text-right">
      {weapon ? PrimaryWeapon[weapon] : <>&ndash;</>}
    </span>
  );
}
