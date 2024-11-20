import { memo, useMemo } from "react";

import { Team } from "@/types/team";

import { useGameContext } from "@/lib/hooks/use-game-context";
import { cn } from "@/lib/utils";

import PlayerStats from "./PlayerStats";

type PlayersInfoProps = {
  team: Team;
};

function PlayersInfo({ team }: PlayersInfoProps) {
  const { gameData } = useGameContext();

  const players = useMemo(() => {
    if (!gameData) return [];

    return [gameData.local_player, ...gameData.players];
  }, [gameData]);

  return (
    <section id={`${Team[team]}`} className="h-full space-y-2">
      <h1
        className={cn(
          "lowercase",
          team === Team.CounterTerrorist
            ? "text-[hsl(219,33%,52%)]"
            : "text-[hsl(36,72%,54%)]"
        )}
        style={{ fontVariant: "small-caps" }}
      >
        {team === Team.CounterTerrorist ? "Counter-Terrorists" : "Terrorists"}
      </h1>
      {players
        .filter((player) => player.team === team)
        .map((player) => (
          <PlayerStats
            key={`player-info-${player.index}`}
            index={player.index}
            color={player.color}
            nickname={player.nickname}
            team={player.team}
            health={player.health}
            armor={player.armor}
            hasHelmet={player.has_helmet}
            money={player.money}
            weapons={player.weapons}
            hasDefuser={player.has_defuser}
          />
        ))}
    </section>
  );
}

export default memo(PlayersInfo);
