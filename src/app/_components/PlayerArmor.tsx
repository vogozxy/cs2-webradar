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
      width={20}
      height={20}
      className="h-5 w-5"
      alt={`${armor}`}
    />
  );
}
