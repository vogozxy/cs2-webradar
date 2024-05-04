export enum DefuseStatus {
  NoTime,
  DefuseWithKit,
  Defuseable,
}

export type BombPosition = {
  x: number;
  y: number;
};

export type Bomb = {
  position: BombPosition;
  is_planted: boolean;
  site: "A" | "B" | "";
  detonation_time: number;
  is_defused: boolean;
  is_defusing: boolean;
  defuse_time: number;
};
