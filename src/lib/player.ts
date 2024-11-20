import type { PlayerViewAngles } from "@/types/player";

export const getPlayerViewDirection = (viewAngles: PlayerViewAngles) => {
  if (!viewAngles) return 0;
  if (!viewAngles.y) return 0;

  return (90 - viewAngles.y + 360) % 360;
};
