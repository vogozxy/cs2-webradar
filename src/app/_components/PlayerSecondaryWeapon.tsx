import { SecondaryWeapon } from "@/types/weapon";

export default function PlayerSecondaryWeapon({ weapon }: { weapon: number }) {
  return (
    <span>
      {weapon ? SecondaryWeapon[weapon] : <>&ndash;</>}
    </span>
  );
}
