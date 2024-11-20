import { DefuseStatus } from "@/types/bomb";

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
