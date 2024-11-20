import { memo } from "react";

import { PrimaryWeapon } from "@/types/weapon";

type PlayerPrimaryWeaponProps = {
  weapon: number;
};

function PlayerPrimaryWeapon({ weapon }: PlayerPrimaryWeaponProps) {
  return (
    <span className="relative text-right">
      {weapon ? PrimaryWeapon[weapon] : <>&ndash;</>}
    </span>
  );
}

export default memo(PlayerPrimaryWeapon);
