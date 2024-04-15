import { Team } from "@/types/team";

import { playerColors } from "@/constants/playerColors";

import {
  getPrimaryWeapon,
  getSecondaryWeapon,
  getNades,
  isPlayerHasBomb,
} from "@/lib/player";

import PlayerPrimaryWeapon from "@/components/PlayerPrimaryWeapon";
import PlayerSecondaryWeapon from "@/components/PlayerSecondaryWeapon";
import PlayerArmor from "@/components/PlayerArmor";
import PlayerNades from "@/components/PlayerNades";
import PlayerMisc from "@/components/PlayerMisc";

export default function PlayerStats({
  color,
  nickname,
  team,
  health,
  armor,
  hasHelmet,
  money,
  weapons,
  hasDefuser,
}: any) {
  return (
    <div className="bg-black/5 dark:bg-white/5 text-zinc-800 dark:text-white rounded-md overflow-hidden">
      <div className="relative grid grid-cols-3 w-full items-center justify-between bg-black/20 dark:bg-white/5 text-white">
        <div
          className={`absolute h-full w-[0%] ${team === Team.Terrorist ? "bg-[hsl(36,74%,23%)]" : "bg-[hsl(219,33%,52%)]"}`}
          style={{ width: `${health}%` }}
        ></div>

        <span className="relative py-1 px-2">{health}</span>
        <span className="relative py-1 px-2">
          <span style={{ color: playerColors[color] }}>&#x25cf;</span>{" "}
          {nickname}
        </span>
        <PlayerPrimaryWeapon weapon={getPrimaryWeapon(weapons)} />
      </div>

      <div className="grid grid-cols-4 w-full items-center justify-between gap-[2em] pe-[0.5em] ps-[0.15em]">
        <span data-money={money} className="text-green-500 py-1 px-2">
          ${money}
        </span>
        <PlayerNades nades={getNades(weapons)} />
        <div className="flex gap-2 brightness-[0.25] dark:brightness-100">
          <PlayerArmor armor={armor} hasHelmet={hasHelmet} />
          <PlayerMisc
            hasDefuser={hasDefuser}
            hasBomb={isPlayerHasBomb(weapons)}
          />
        </div>
        <PlayerSecondaryWeapon weapon={getSecondaryWeapon(weapons)} />
      </div>
    </div>
  );
}
