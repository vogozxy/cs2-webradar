import { memo } from "react";

import { SecondaryWeapon } from "@/types/weapon";

type PlayerSecondaryWeaponProps = {
  weapon: number;
};

function PlayerSecondaryWeapon({ weapon }: PlayerSecondaryWeaponProps) {
  return <span>{weapon ? SecondaryWeapon[weapon] : <>&ndash;</>}</span>;
}

export default memo(PlayerSecondaryWeapon);
