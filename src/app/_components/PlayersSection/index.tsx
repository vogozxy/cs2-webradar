import { useContext } from "react";

import { Team } from "@/types/team";

import { GameContext } from "@/contexts/game";

import PlayersInfo from "./PlayersInfo";

export default function PlayersSection() {
  const gameCtx = useContext(GameContext);

  return (
    <section
      id="players"
      className={
        (gameCtx.gameData?.local_player.team == Team.Terrorist
          ? "flex-col"
          : "flex-col-reverse") + " flex h-fit w-full shrink-0 lg:max-w-xl"
      }
    >
      <PlayersInfo team={Team.CounterTerrorist} />

      <PlayersInfo team={Team.Terrorist} />
    </section>
  );
}
