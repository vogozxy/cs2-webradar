import type { MapData } from "@/types/map";

export const getRadarPosition = (
  position: { x: number; y: number; z: number },
  map: MapData
) => {
  if (!position || !map) return { x: 0, y: 0, z: 0 };
  if (!position.x || !position.y) return { x: 0, y: 0, z: 0 };
  if (!map.pos_x || !map.pos_y || !map.scale) return { x: 0, y: 0, z: 0 };

  const x = (position.x - map.pos_x) / map.scale;
  const y = (position.y - map.pos_y) / -map.scale;

  const calculatedPosition = { x, y, z: 0 };

  // Offset position if playing on two-level map
  if (map.z_cutoff) {
    calculatedPosition.x += map.width / 4;

    if (position.z < map.z_cutoff) {
      calculatedPosition.y += map.height / 2;
    }
  }

  return calculatedPosition;
};
