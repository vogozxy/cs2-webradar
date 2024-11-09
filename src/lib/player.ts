import type { MapData } from "@/types/mapData";
import type { PlayerPosition, PlayerViewAngles } from "@/types/player";

export const getPlayerRadarPosition = (
  playerPosition: PlayerPosition,
  map: MapData
) => {
  if (!playerPosition || !map) return { x: 0, y: 0, z: 0 };
  if (!playerPosition.x || !playerPosition.y) return { x: 0, y: 0, z: 0 };
  if (!map.pos_x || !map.pos_y || !map.scale) return { x: 0, y: 0, z: 0 };

  return {
    x: (playerPosition.x - map.pos_x) / map.scale,
    y: (playerPosition.y - map.pos_y) / -map.scale,
    z: playerPosition.z,
  };
};

export const getPlayerViewDirection = (
  playerPosition: PlayerPosition,
  playerViewAngles: PlayerViewAngles,
  viewAngleLength: number
) => {
  if (!playerViewAngles) return { x: playerPosition.x, y: playerPosition.y };
  if (!playerViewAngles.y) return { x: playerPosition.x, y: playerPosition.y };

  return {
    x:
      playerPosition.x +
      Math.cos((playerViewAngles.y * Math.PI) / 180) * viewAngleLength,
    y:
      playerPosition.y +
      -Math.sin((playerViewAngles.y * Math.PI) / 180) * viewAngleLength,
  };
};
