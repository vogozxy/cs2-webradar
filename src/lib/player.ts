import type { PlayerViewAngles } from "@/types/player";

export const getPlayerRotationAngle = (
  viewAngles: PlayerViewAngles,
  previousRotation: number
) => {
  if (!viewAngles) return 0;
  if (!viewAngles.y) return 0;

  const targetRotation = (90 - viewAngles.y + 360) % 360;

  // Calculate the shortest rotation path
  const diff = targetRotation - previousRotation;

  // Maps the difference to [-180, 180]
  const adjustedDiff = ((diff + 180) % 360) - 180;
  const newRotation = previousRotation + adjustedDiff;

  return newRotation;
};
