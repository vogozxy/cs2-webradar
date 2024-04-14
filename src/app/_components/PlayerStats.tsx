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
    <div className="mt-[0.5em] rounded-[0.25em] bg-[hsla(0,2%,40%,0.773)] text-white">
      <div className="relative flex w-full items-center justify-between rounded-[0.25em] bg-[hsla(0,5%,81%,0.773)]">
        <div
          className={`absolute h-full w-[0%] rounded-[0.25em] ${team === Team.Terrorist ? "bg-[hsl(36,74%,23%)]" : "bg-[hsl(219,33%,52%)]"}`}
          style={{ width: `${health}%` }}
        ></div>

        <span className="relative pe-[0.5em] ps-[0.5em]">{health}</span>
        <span className="relative pe-[0.5em] ps-[0.5em]">
          <span style={{ color: playerColors[color] }}>&#x25cf;</span>{" "}
          {nickname}
        </span>
        <PlayerPrimaryWeapon weapon={getPrimaryWeapon(weapons)} />
      </div>

      <div className="flex w-full items-center justify-between gap-[2em] pe-[0.5em] ps-[0.15em]">
        <span data-money={money} className="text-[hsl(139,100%,50%)]">
          ${money}
        </span>
        <PlayerNades nades={getNades(weapons)} />
        <PlayerArmor armor={armor} hasHelmet={hasHelmet} />
        <PlayerMisc
          hasDefuser={hasDefuser}
          hasBomb={isPlayerHasBomb(weapons)}
        />
        <PlayerSecondaryWeapon weapon={getSecondaryWeapon(weapons)} />
      </div>
    </div>
  );
}
