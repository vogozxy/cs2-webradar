import { isBombDefuseable } from "@/lib/bomb";

export default function BombDefuseStatus({
  isDefusing,
  detonationTime,
  defuseTime,
}: {
  isDefusing: boolean;
  detonationTime: number;
  defuseTime: number;
}) {
  const bombDefuseableColor = !isDefusing
    ? ""
    : isBombDefuseable(detonationTime, defuseTime)
      ? "text-green-600"
      : "text-red-600";

  return (
    <section className="inline-flex gap-1">
      <span className={`font-medium`}>
        {isDefusing ? "Defusing" : "Not Defusing"}
      </span>
      <span className={bombDefuseableColor}>
        ({isDefusing ? defuseTime.toFixed(2) : "0.00"})
      </span>
    </section>
  );
}
