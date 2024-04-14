import Image from "next/image";

export default function MaskedIcon({
  path,
  width,
  height,
  alt = "",
}: {
  path: string;
  width: number;
  height: number;
  alt?: string;
}) {
  return <Image src={path} alt={alt} width={width} height={height} />;
}
