import { PrimaryWeapon, SecondaryWeapon, Grenade, Misc } from "@/types/weapon";

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

export const playerHasBomb = (weapons: number[]) => {
  return weapons.includes(Misc.C4);
};

export const hasImportantWeapons = (
  importantWeapons: number[],
  weapons: number[]
): string => {
  const playerImportantWeapon = weapons.find((weapon) =>
    importantWeapons.includes(weapon)
  );

  if (!playerImportantWeapon) {
    return "";
  }

  return PrimaryWeapon[playerImportantWeapon];
};
