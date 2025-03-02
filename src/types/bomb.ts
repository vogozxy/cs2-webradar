export enum DefuseStatus {
  NoTime,
  DefuseWithKit,
  Defuseable,
}

export type BombPosition = {
  x: number;
  y: number;
  z: number;
};

export type Bomb = {
  state:
    | "carried"
    | "planted"
    | "exploded"
    | "defused"
    | "defusing"
    | "dropped";
  position: BombPosition;
  site: "A" | "B" | "";
  detonation_time: number;
  defuse_time: number;
} | null;
