/**
 * OmniRoute logo component — renders Aries emblem / brand logo.
 */

type OmniRouteLogoProps = {
  size?: number;
  className?: string;
  variant?: "icon" | "full";
};

export default function OmniRouteLogo({
  size = 24,
  className = "",
  variant = "icon",
}: OmniRouteLogoProps) {
  const src = variant === "full" ? "/omniroute-logo.png" : "/omniroute-icon.png";
   
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="OmniRoute Logo"
      width={size}
      height={size}
      className={`rounded-full object-contain shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
