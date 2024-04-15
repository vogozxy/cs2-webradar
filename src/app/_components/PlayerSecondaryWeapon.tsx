import { SecondaryWeapon } from "@/types/weapon";

export default function PlayerSecondaryWeapon({ weapon }: { weapon: number }) {
  return <span className="py-1 px-2 text-right">{weapon ? SecondaryWeapon[weapon] : <>&ndash;</>}</span>;
}
