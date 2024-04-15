import Image from "next/image";

export default function MaskedIcon({
  path,
  width,
  height,
  alt = "",
  className = ""
}: {
  path: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
}) {
  return <Image src={path} alt={alt} width={width} height={height} className={className}/>;
}
