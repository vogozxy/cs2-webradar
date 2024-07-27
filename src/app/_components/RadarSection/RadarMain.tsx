import { useContext } from "react";

import { PLAYER_COLORS } from "@/constants/player";

import { getPlayerRadarPosition, getPlayerViewDirection } from "@/lib/player";
import { hasImportantWeapons } from "@/lib/weapon";
import { getBombRadarPosition } from "@/lib/bomb";

import { SettingsContext } from "@/contexts/settings";
import { GameContext } from "@/contexts/game";

import Canvas from "@/components/Canvas";

export default function RadarMain() {
  const settingsCtx = useContext(SettingsContext);
  const gameCtx = useContext(GameContext);

  const radarTheme = settingsCtx.radarTheme;
  const mapData = gameCtx.mapData;
  const currentMap = gameCtx.currentMap;
  const localPlayerTeam = gameCtx.gameData?.local_player.team;
  const bombInfo = gameCtx.gameData?.bomb;
  const players =
    (gameCtx.gameData && [
      gameCtx.gameData.local_player,
      ...gameCtx.gameData.players,
    ]) ??
    [];

  const drawBomb = (context: CanvasRenderingContext2D) => {
    if (!mapData || !bombInfo) return;

    const bombPos = getBombRadarPosition(bombInfo.position, mapData);

    // Offset position if playing on two-level map
    if (mapData.z_cutoff) {
      bombPos.x += mapData.width / 4;

      if (bombPos.z < mapData.z_cutoff) {
        bombPos.y += mapData.height / 2;
      }
    }

    context.beginPath();
    context.font = "bold 20px Verdana, sans-serif";
    context.textAlign = "center";
    context.shadowColor = "gray";
    context.shadowBlur = 1;
    context.strokeStyle = "black";
    context.strokeText("C4", bombPos.x, bombPos.y);
    context.shadowColor = "";
    context.shadowBlur = 0;
    context.fillStyle = "#FFD700";
    context.fillText("C4", bombPos.x, bombPos.y);
  };

  const drawPlayers = (context: CanvasRenderingContext2D) => {
    if (!mapData || !localPlayerTeam) return;

    for (const player of players) {
      if (!player.alive) continue;
      if (!player.position.x || !player.position.y) continue;

      const dotSize = settingsCtx.settings.player.dotSize;
      const isTeammate = player.team === localPlayerTeam;
      const color =
        radarTheme === "default"
          ? PLAYER_COLORS[player.color]
          : isTeammate
            ? "#00ff00"
            : "#ff0000";

      const playerPosition = getPlayerRadarPosition(player.position, mapData);

      // Offset position if playing on two-level map
      if (mapData.z_cutoff) {
        playerPosition.x += mapData.width / 4;

        if (playerPosition.z < mapData.z_cutoff) {
          playerPosition.y += mapData.height / 2;
        }
      }

      const playerViewDirection = getPlayerViewDirection(
        playerPosition,
        player.view_angles,
        settingsCtx.settings.player.viewAngleLength
      );

      // Draw view direction
      context.beginPath();
      context.moveTo(playerPosition.x, playerPosition.y);
      context.lineTo(playerViewDirection.x, playerViewDirection.y);
      context.strokeStyle = color;
      context.lineWidth = 3;
      context.stroke();
      context.lineWidth = 1;

      // Begin drawing player circle
      context.beginPath();
      context.arc(
        playerPosition.x,
        playerPosition.y,
        Math.abs(dotSize),
        0,
        2 * Math.PI
      );

      if (isTeammate) {
        if (radarTheme === "default") {
          context.strokeStyle = color;
          context.stroke();
        } else {
          context.fillStyle = color;
          context.fill();
        }
      } else {
        context.lineWidth = 3;
        context.strokeStyle = "#666666";
        context.stroke();
        context.lineWidth = 1;
        context.fillStyle = color;
        context.fill();
      }

      // Display important weapons on map
      const importantWeapon = hasImportantWeapons(
        settingsCtx.settings.player.importantWeapons,
        player.weapons
      );
      context.beginPath();
      context.font = "13px Verdana, sans-serif";
      context.textAlign = "center";
      context.shadowColor = "black";
      context.shadowBlur = 1;
      context.strokeStyle = "black";
      context.strokeText(
        importantWeapon,
        playerPosition.x,
        playerPosition.y + dotSize * 3
      );
      context.shadowColor = "";
      context.shadowBlur = 0;
      context.fillStyle = "#FFFFE0";
      context.fillText(
        importantWeapon,
        playerPosition.x,
        playerPosition.y + dotSize * 3
      );
    }
  };

  const drawMain = (context: CanvasRenderingContext2D) => {
    context.reset();

    if (currentMap === "" || currentMap === "<empty>") {
      return;
    }

    if (!mapData) return;

    // Calculate scale based on the background canvas size
    const scale = Math.min(
      context.canvas.width / mapData.width,
      context.canvas.height / mapData.height
    );

    // Apply scaling to the context
    context.scale(scale, scale);

    // Calculate offset to center the radar elements
    const offsetX = (context.canvas.width / scale - mapData.width) / 2;
    const offsetY = (context.canvas.height / scale - mapData.height) / 2;

    // Save the current state to revert back later after applying transformations
    context.save();
    context.translate(offsetX, offsetY);

    drawPlayers(context);
    drawBomb(context);

    // Restore the context state to avoid affecting other drawings
    context.restore();
  };

  return <Canvas className="absolute inset-0 mx-auto" draw={drawMain} />;
}
