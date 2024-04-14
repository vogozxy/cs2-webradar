import { Team } from "@/types/team";
import type { Player } from "@/types/player";

import PlayerStats from "@/components/PlayerStats";

export default function PlayersInfo({
  currentTeam,
  localPlayer,
  otherPlayers,
}: Readonly<{
  currentTeam: Team;
  localPlayer: Player | undefined;
  otherPlayers: Player[] | undefined;
}>) {
  return (
    <section id={`${Team[currentTeam]}`}>
      <h1
        className={`lowercase ${currentTeam === Team.CounterTerrorist ? "text-[hsl(219,33%,52%)]" : "text-[hsl(36,72%,54%)]"}`}
        style={{ fontVariant: "small-caps" }}
      >
        {currentTeam === Team.CounterTerrorist
          ? "Counter-Terrorists"
          : "Terrorists"}
      </h1>

      {localPlayer?.team === currentTeam && (
        <PlayerStats
          color={localPlayer.color}
          nickname={localPlayer.nickname}
          team={localPlayer.team}
          health={localPlayer.health}
          armor={localPlayer.armor}
          hasHelmet={localPlayer.has_helmet}
          money={localPlayer.money}
          weapons={localPlayer.weapons}
          hasDefuser={localPlayer.has_defuser}
        />
      )}

      {otherPlayers
        ?.filter((player) => player.team === currentTeam)
        ?.map((player) => (
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
    </section>
  );
}
