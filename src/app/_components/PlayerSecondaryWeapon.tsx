import { SecondaryWeapon } from "@/types/weapon";

export default function PlayerSecondaryWeapon({ weapon }: { weapon: number }) {
  return (
    <span className="px-2 py-1 text-right">
      {weapon ? SecondaryWeapon[weapon] : <>&ndash;</>}
    </span>
  );
}
