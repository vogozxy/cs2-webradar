import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
  Fragment,
} from "react";

import { PLAYER_COLORS } from "@/constants/player";

import { useGameContext } from "@/lib/hooks/use-game-context";
import { useSettingsContext } from "@/lib/hooks/use-settings-context";
import { getRadarPosition } from "@/lib/radar";
import { getPlayerRotationAngle } from "@/lib/player";
import { hasImportantWeapons } from "@/lib/weapon";

import { BombIcon, PlayerIcon } from "@/components/Icons";

import { Player } from "@/types/player";
import { Team } from "@/types/team";
import { Bomb } from "@/types/bomb";

const calculateRadarEffectiveDimensions = (radarSize: {
  width: number;
  height: number;
}) => {
  const aspectRatio = 1024 / 1024; // Aspect ratio of the radar image
  const containerAspectRatio = radarSize.width / radarSize.height;

  let effectiveWidth = radarSize.width;
  let effectiveHeight = radarSize.height;

  if (containerAspectRatio > aspectRatio) {
    // Container is wider than the image aspect ratio
    effectiveWidth = radarSize.height * aspectRatio;
  } else {
    // Container is taller than the image aspect ratio
    effectiveHeight = radarSize.width / aspectRatio;
  }

  const offsetX = (radarSize.width - effectiveWidth) / 2;
  const offsetY = (radarSize.height - effectiveHeight) / 2;

  return { effectiveWidth, effectiveHeight, offsetX, offsetY };
};

type CustomPlayer = {
  importantWeapon: string;
  rotationAngle: number;
} & Player;

type RadarMainProps = {
  radarSize: {
    width: number;
    height: number;
  };
};

function RadarMain({ radarSize }: RadarMainProps) {
  const [players, setPlayers] = useState<CustomPlayer[]>([]);
  const [playerRotations, setPlayerRotations] = useState(
    new Map<number, number>()
  );

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const { gameData, mapData } = useGameContext();
  const { settings, radarTheme } = useSettingsContext();

  const showHealth = settings.player.showHealth;
  const showWeapon = settings.player.showWeapon;
  const dotSize = settings.player.dotSize;
  const importantWeapons = settings.player.importantWeapons;

  const localPlayerTeam = useMemo(() => {
    if (!gameData || !gameData.local_player) return Team.None;

    return gameData.local_player.team;
  }, [gameData]);

  const bombInfo: Bomb = useMemo(() => {
    if (!gameData || !gameData.bomb || !mapData) return null;

    const { effectiveWidth, effectiveHeight, offsetX, offsetY } =
      calculateRadarEffectiveDimensions(radarSize);

    const bombRadarPosition = getRadarPosition(gameData.bomb.position, mapData);

    const scaledX =
      (bombRadarPosition.x / mapData.width) * effectiveWidth + offsetX;
    const scaledY =
      (bombRadarPosition.y / mapData.height) * effectiveHeight + offsetY;

    return {
      ...gameData.bomb,
      position: {
        ...bombRadarPosition,
        x: scaledX,
        y: scaledY,
      },
    };
  }, [gameData, mapData, radarSize]);

  const initPlayers = useCallback(() => {
    if (!gameData || !mapData) return;

    const { effectiveWidth, effectiveHeight, offsetX, offsetY } =
      calculateRadarEffectiveDimensions(radarSize);

    const updatedPlayerRotations = new Map(playerRotations);
    const updatedPlayers = [gameData.local_player, ...gameData.players]
      .filter(
        (player) =>
          player?.alive &&
          player?.health &&
          (player?.position.x || player?.position.y)
      )
      .map((player) => {
        const playerRadarPosition = getRadarPosition(player.position, mapData);

        const scaledX =
          (playerRadarPosition.x / mapData.width) * effectiveWidth + offsetX;
        const scaledY =
          (playerRadarPosition.y / mapData.height) * effectiveHeight + offsetY;

        const importantWeapon = hasImportantWeapons(
          importantWeapons,
          player.weapons
        );

        const previousRotation = updatedPlayerRotations.get(player.index) ?? 0;
        const newRotation = getPlayerRotationAngle(
          player.view_angles,
          previousRotation
        );

        updatedPlayerRotations.set(player.index, newRotation);

        return {
          ...player,
          position: {
            ...playerRadarPosition,
            x: scaledX,
            y: scaledY,
          },
          importantWeapon,
          rotationAngle: newRotation,
        };
      });

    setPlayers(updatedPlayers);
    setPlayerRotations(updatedPlayerRotations);
  }, [gameData, mapData, radarSize, importantWeapons, playerRotations]);

  useEffect(() => {
    initPlayers();
  }, [initPlayers]);

  useEffect(() => {
    const handleZoom = () => {
      const zoom = window.devicePixelRatio || 1;
      setZoomLevel(zoom);
    };

    window.addEventListener("resize", handleZoom);
    handleZoom();

    return () => {
      window.removeEventListener("resize", handleZoom);
    };
  }, []);

  return (
    <div id="radar-main" className="absolute inset-0 border-yellow-700">
      {players.map((player, index) => {
        const isTeammate = player.team === localPlayerTeam;
        const dotColor =
          radarTheme === "default"
            ? PLAYER_COLORS[player.color]
            : isTeammate
              ? "#00ff00"
              : "#ff0000";
        const arrowColor =
          radarTheme === "default" && !isTeammate ? "#ff0000" : null;

        return (
          <Fragment key={`player-radar-${player.index}`}>
            <div
              className="pointer-events-none absolute z-[1] select-none text-center"
              style={{
                left: `${player.position.x}px`,
                top: `${player.position.y}px`,
                transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`,
                transition:
                  "left 0.2s ease, top 0.2s ease, transform 0.2s ease",
              }}
            >
              {showHealth && !isTeammate && (
                <div
                  className="absolute z-[2] text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
                  style={{
                    bottom: `${dotSize}px`,
                    left: "50%",
                    transform: `translate(-50%, -50%)`,
                    fontVariant: "unicase",
                  }}
                >
                  {player.health}
                </div>
              )}
              <PlayerIcon
                size={dotSize}
                dotColor={dotColor}
                {...(arrowColor && { arrowColor })}
                className="z-[2]"
                style={{
                  transform: `rotate(${player.rotationAngle}deg)`,
                  transition: "transform 0.1s ease",
                }}
              />
              {showWeapon && (
                <div
                  className="absolute z-[2] text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
                  style={{
                    top: `${dotSize}px`,
                    left: "50%",
                    transform: `translateX(-50%)`,
                    fontVariant: "unicase",
                  }}
                >
                  {player.importantWeapon}
                </div>
              )}
            </div>
          </Fragment>
        );
      })}

      {bombInfo && (
        <div
          id="bomb"
          className="pointer-events-none absolute z-[1] select-none"
          style={{
            left: `${bombInfo.position.x}px`,
            top: `${bombInfo.position.y}px`,
            transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`,
            transition: "left 0.2s ease, top 0.2s ease, transform 0.2s ease",
          }}
        >
          <BombIcon size={16} className="text-[#FFD700]" />
        </div>
      )}
    </div>
  );
}

export default memo(RadarMain);
