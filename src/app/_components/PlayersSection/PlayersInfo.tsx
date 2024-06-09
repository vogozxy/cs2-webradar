import { useContext } from "react";

import { Team } from "@/types/team";

import { GameContext } from "@/contexts/game";

import PlayerStats from "./PlayerStats";

export default function PlayersInfo({ team }: { team: Team }) {
  const gameCtx = useContext(GameContext);

  const players =
    (gameCtx.gameData && [
      gameCtx.gameData.local_player,
      ...gameCtx.gameData.players,
    ]) ??
    [];

  return (
    <section id={`${Team[team]}`} className="mb-1 space-y-2.5">
      <h1
        className={`lowercase ${team === Team.CounterTerrorist ? "text-[hsl(219,33%,52%)]" : "text-[hsl(36,72%,54%)]"}`}
        style={{ fontVariant: "small-caps" }}
      >
        {team === Team.CounterTerrorist ? "Counter-Terrorists" : "Terrorists"}
      </h1>

      {gameCtx.inMatch && (
        <>
          {players
            .filter((player) => player.team === team)
            .map((player) => (
              <PlayerStats
                key={player.index}
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
        </>
      )}
    </section>
  );
}
