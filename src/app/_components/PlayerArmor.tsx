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
      className="w-5 h-5"
      alt={`${armor}`}
    />
  );
}
