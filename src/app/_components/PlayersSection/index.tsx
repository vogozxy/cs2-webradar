import { useContext } from "react";

import { Team } from "@/types/team";

import { GameContext } from "@/contexts/game";

import PlayersInfo from "./PlayersInfo";

export default function PlayersSection({ className }: { className?: string }) {
  const gameCtx = useContext(GameContext);

  return (
    <section
      id="players"
      className={`${className} ${gameCtx.gameData?.local_player.team === Team.Terrorist ? "flex-col" : "flex-col-reverse"} flex`}
    >
      <PlayersInfo team={Team.CounterTerrorist} />

      <PlayersInfo team={Team.Terrorist} />
    </section>
  );
}
