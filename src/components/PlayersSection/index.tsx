import { useMemo } from "react";

import { Team } from "@/types/team";

import { useGameContext } from "@/lib/hooks/use-game-context";

import PlayersInfo from "./PlayersInfo";

export default function PlayersSection() {
  const { gameData } = useGameContext();

  const enemyTeam = useMemo(() => {
    if (!gameData || !gameData.local_player) return Team.None;

    return gameData.local_player.team === Team.CounterTerrorist
      ? Team.Terrorist
      : Team.CounterTerrorist;
  }, [gameData]);

  return (
    <section id="players" className="flex flex-col">
      <PlayersInfo team={enemyTeam} />
    </section>
  );
}
