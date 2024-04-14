import type { MapData } from "@/types/mapData";
import { PrimaryWeapon, SecondaryWeapon, Grenade, Misc } from "@/types/weapon";
import type { Player, PlayerPosition, PlayerViewAngles } from "@/types/player";

export const getPrimaryWeapon = (weapons: number[]) => {
  return (
    weapons.find((weapon) => Object.values(PrimaryWeapon).includes(weapon)) ?? 0
  );
};

export const getSecondaryWeapon = (weapons: number[]) => {
  return (
    weapons.find((weapon) => Object.values(SecondaryWeapon).includes(weapon)) ??
    0
  );
};

export const getNades = (weapons: number[]) => {
  return weapons.filter((weapon) => Object.values(Grenade).includes(weapon));
};

export const isPlayerHasBomb = (weapons: number[]) => {
  return weapons.includes(Misc.C4);
};

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
    z: 0,
  };
};

export const getPlayerViewDirection = (
  playerPosition: PlayerPosition,
  playerViewAngles: PlayerViewAngles,
  viewAngleLength: number = 20
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
