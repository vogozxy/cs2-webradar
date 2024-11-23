export type MapData = {
  pos_x: number;
  pos_y: number;
  scale: number;
  width: number;
  height: number;
  rotate?: number;
  zoom?: number;
  z_cutoff?: number;
} | null;

export enum Map {
  de_ancient = "de_ancient",
  de_anubis = "de_anubis",
  de_dust2 = "de_dust2",
  de_inferno = "de_inferno",
  de_mirage = "de_mirage",
  de_nuke = "de_nuke",
  de_overpass = "de_overpass",
  de_vertigo = "de_vertigo",
}
