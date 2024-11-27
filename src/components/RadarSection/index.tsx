import { useRef, useMemo } from "react";
import { useMeasure } from "@uidotdev/usehooks";

import { useGameContext } from "@/lib/hooks/use-game-context";
import { useSettingsContext } from "@/lib/hooks/use-settings-context";
import { getPlayerRotationAngle } from "@/lib/player";

import RadarMain from "./RadarMain";
import RadarBackground from "./RadarBackground";

type RadarSectionProps = {} & React.HTMLAttributes<HTMLElement>;

export default function RadarSection({ ...props }: RadarSectionProps) {
  const [radarRef, radarSize] = useMeasure();
  const playerPreviousRotationRef = useRef<number>(0);
  const { gameData } = useGameContext();
  const { settings } = useSettingsContext();

  const playerRotation = useMemo(() => {
    if (!gameData || !settings.player.mapRotation || !settings.player.steamId64)
      return 0;

    const player = [gameData.local_player, ...gameData.players].find(
      (player) => {
        // Convert the player's steamId3 to a steamId64
        const baseSteamId64 = BigInt(76561197960265728);
        const steamId64 = baseSteamId64 + BigInt(player.steamid3);

        // Check if the steamId64 matches the one in the settings
        return steamId64.toString() === settings.player.steamId64;
      }
    );
    if (!player) return 0;

    const previousRotation = playerPreviousRotationRef.current ?? 0;

    const newRotation = getPlayerRotationAngle(
      player.view_angles,
      previousRotation
    );

    playerPreviousRotationRef.current = newRotation;

    return -newRotation;
  }, [gameData, settings.player.steamId64, settings.player.mapRotation]);

  const scaleFactor = useMemo(() => {
    const radians = (playerRotation * Math.PI) / 180;
    return 1 / (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians)));
  }, [playerRotation]);

  return (
    <section ref={radarRef} id="radar" {...props}>
      <RadarBackground
        radar={{
          width: radarSize.width || 0,
          height: radarSize.height || 0,
          rotation: playerRotation,
          scaleFactor,
        }}
      />
      <RadarMain
        radar={{
          width: radarSize.width || 0,
          height: radarSize.height || 0,
          rotation: playerRotation,
          scaleFactor,
        }}
      />
    </section>
  );
}
