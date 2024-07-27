import { useContext } from "react";

import { Team } from "@/types/team";

import { GameContext } from "@/contexts/game";

import PlayersInfo from "./PlayersInfo";

export default function PlayersSection({ className }: { className?: string }) {
  const gameCtx = useContext(GameContext);
  const enemyTeam =
    gameCtx.gameData?.local_player.team === Team.CounterTerrorist
      ? Team.Terrorist
      : Team.CounterTerrorist;

  return (
    <section
      id="players"
      className={`${className} ${gameCtx.gameData?.local_player.team === Team.Terrorist ? "flex-col" : "flex-col-reverse"} flex`}
    >
      <PlayersInfo team={enemyTeam} />
    </section>
  );
}
