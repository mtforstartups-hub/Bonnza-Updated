/**
 * Provisional BONNZA wordmark & standalone B emblem concepts.
 * Marked internally as provisional pending final brand approval.
 */

export function BonnzaMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="64" height="64" rx="14" fill="#1A1B1A" />
      <path
        d="M19 16h15.5c6.9 0 11.5 3.6 11.5 9.1 0 3.6-2 6.4-5.2 7.6 4 1.1 6.7 4.3 6.7 8.7 0 6-5 10.6-12.5 10.6H19V16zm8.2 13.7h6.3c2.9 0 4.6-1.4 4.6-3.6 0-2.3-1.7-3.6-4.6-3.6h-6.3v7.2zm0 15.6h7c3.3 0 5.3-1.5 5.3-4.1 0-2.5-2-4.1-5.3-4.1h-7v8.2z"
        fill="#F4C940"
      />
    </svg>
  );
}

export function BonnzaWordmark({
  light = false,
  className = '',
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <BonnzaMark size={28} />
      <svg
        width="102"
        height="22"
        viewBox="0 0 102 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="BONNZA"
      >
        <text
          x="0"
          y="18"
          fill={light ? '#FFFFFF' : '#1A1B1A'}
          fontFamily="Manrope, system-ui, sans-serif"
          fontWeight="800"
          fontSize="20"
          letterSpacing="0.06em"
        >
          BONNZA
        </text>
      </svg>
    </span>
  );
}

export const BrandWordmark = BonnzaWordmark;

