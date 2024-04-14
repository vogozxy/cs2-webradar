import MaskedIcon from "@/components/MaskedIcon";

export default function PlayerArmor({
  armor,
  hasHelmet,
}: {
  armor: number;
  hasHelmet: boolean;
}) {
  if (armor <= 0) {
    return <span>&ndash;</span>;
  }

  return (
    <MaskedIcon
      path={`/assets/icons/${hasHelmet ? "kevlar_helmet" : "kevlar"}.svg`}
      width={hasHelmet ? 20 : 12}
      height={hasHelmet ? 20 : 12}
      alt={`${armor}`}
    />
  );
}
