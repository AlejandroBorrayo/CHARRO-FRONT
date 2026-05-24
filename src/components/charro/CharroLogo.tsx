import Image from "next/image";
import Link from "next/link";
import { CHARRO_LOGO_ALT, CHARRO_LOGO_SRC } from "@/lib/brandAssets";

type CharroLogoProps = {
  /** Enlaza a la página de inicio. */
  href?: string;
  /** Ancho y alto en px (imagen cuadrada 166×166). */
  size?: number;
  className?: string;
  priority?: boolean;
};

export function CharroLogo({
  href = "/",
  size = 140,
  className = "",
  priority = false,
}: CharroLogoProps) {
  const image = (
    <Image
      src={CHARRO_LOGO_SRC}
      alt={CHARRO_LOGO_ALT}
      width={size}
      height={size}
      priority={priority}
      className={`charro-logo ${className}`.trim()}
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link href={href} className="charro-logo__link inline-block">
      {image}
    </Link>
  );
}
