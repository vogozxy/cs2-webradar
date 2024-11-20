import { memo, useMemo } from "react";

import { Team } from "@/types/team";

import { PLAYER_COLORS } from "@/constants/player";

import {
  getPrimaryWeapon,
  getSecondaryWeapon,
  getNades,
  playerHasBomb,
} from "@/lib/weapon";
import { cn } from "@/lib/utils";

import PlayerPrimaryWeapon from "./PlayerPrimaryWeapon";
import PlayerSecondaryWeapon from "./PlayerSecondaryWeapon";
import PlayerArmor from "./PlayerArmor";
import PlayerNades from "./PlayerNades";
import PlayerMisc from "./PlayerMisc";

type PlayerStatsProps = {
  index: number;
  color: number;
  nickname: string;
  team: Team;
  health: number;
  armor: number;
  hasHelmet: boolean;
  money: number;
  weapons: number[];
  hasDefuser: boolean;
};

function PlayerStats({
  index,
  color,
  nickname,
  team,
  health,
  armor,
  hasHelmet,
  money,
  weapons,
  hasDefuser,
}: PlayerStatsProps) {
  const playerStats = useMemo(() => {
    return {
      primaryWeapon: getPrimaryWeapon(weapons),
      secondaryWeapon: getSecondaryWeapon(weapons),
      nades: getNades(weapons),
    };
  }, [weapons]);

  return (
    <div className="overflow-hidden rounded-md bg-black/5 text-zinc-800 dark:bg-white/5 dark:text-white">
      <div className="relative grid w-full grid-cols-3 items-center justify-between bg-black/20 p-1.5 text-white dark:bg-white/5">
        <div
          className={cn(
            "absolute h-full w-[0%]",
            team === Team.Terrorist
              ? "bg-[hsl(36,74%,23%)]"
              : "bg-[hsl(219,33%,52%)]"
          )}
          style={{ width: `${health}%` }}
        ></div>
        <span className="relative">{health}</span>
        <span className="relative truncate">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill={`${PLAYER_COLORS[color]}`}
              className="pointer-events-none inline"
            >
              <circle cx="10" cy="10" r="5" />
            </svg>
          </span>{" "}
          {nickname}
        </span>
        <PlayerPrimaryWeapon weapon={playerStats.primaryWeapon} />
      </div>

      <div className="grid w-full grid-cols-2 gap-2 p-1.5 md:grid-cols-3 md:gap-0">
        <span data-money={money} className="text-green-500">
          ${money}
        </span>
        <PlayerNades playerIndex={index} nades={playerStats.nades} />
        <div className="col-span-2 flex flex-row-reverse items-center justify-between md:col-span-1 md:flex-row">
          <div className="flex gap-1.5 brightness-[0.25] dark:brightness-100">
            <PlayerArmor armor={armor} hasHelmet={hasHelmet} />
            <PlayerMisc
              hasDefuser={hasDefuser}
              hasBomb={playerHasBomb(weapons)}
            />
          </div>
          <PlayerSecondaryWeapon weapon={playerStats.secondaryWeapon} />
        </div>
      </div>
    </div>
  );
}

export default memo(PlayerStats);
