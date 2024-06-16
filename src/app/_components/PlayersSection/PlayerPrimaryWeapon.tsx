import { PrimaryWeapon } from "@/types/weapon";

export default function PlayerPrimaryWeapon({ weapon }: { weapon: number }) {
  return (
    <span className="relative text-right">
      {weapon ? PrimaryWeapon[weapon] : <>&ndash;</>}
    </span>
  );
}
