import type { MapData } from "@/types/mapData";
import { type BombPosition, DefuseStatus } from "@/types/bomb";

export const getBombRadarPosition = (
  bombPosition: BombPosition,
  map: MapData
): BombPosition => {
  if (!bombPosition || !map) return { x: 0, y: 0 };
  if (!bombPosition.x || !bombPosition.y) return { x: 0, y: 0 };
  if (!map.pos_x || !map.pos_y || !map.scale) return { x: 0, y: 0 };

  return {
    x: (bombPosition.x - map.pos_x) / map.scale,
    y: (bombPosition.y - map.pos_y) / -map.scale,
  };
};

export const isBombDefuseable = (
  detonationTime: number,
  defuseTime: number
) => {
  return detonationTime - defuseTime >= 0;
};

export const getBombDefuseStatus = (detonationTime: number): DefuseStatus => {
  if (detonationTime >= 10) return DefuseStatus.Defuseable;
  if (detonationTime >= 5) return DefuseStatus.DefuseWithKit;

  return DefuseStatus.NoTime;
};
