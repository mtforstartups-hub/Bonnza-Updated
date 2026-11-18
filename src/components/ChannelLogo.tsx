import { useId } from 'react';
import type { ChannelSlug } from '../domain/types';

export type ChannelLogoSize = 'sm' | 'md' | 'lg';

interface ChannelLogoProps {
  slug: ChannelSlug;
  size?: ChannelLogoSize;
  label?: string;
  decorative?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<ChannelLogoSize, { tile: string; svg: string }> = {
  sm: {
    tile: 'w-7 h-7 rounded-[8px] p-1',
    svg: 'w-full h-full',
  },
  md: {
    tile: 'w-11 h-11 rounded-[12px] p-1.5',
    svg: 'w-full h-full',
  },
  lg: {
    tile: 'w-16 h-16 rounded-[16px] p-2.5',
    svg: 'w-full h-full',
  },
};

const DEFAULT_CHANNEL_LABELS: Record<ChannelSlug, string> = {
  meesho: 'Meesho logo',
  'amazon-india': 'Amazon India logo',
  etsy: 'Etsy logo',
  'amazon-global': 'Amazon Global logo',
  'whatsapp-selling': 'WhatsApp logo',
  'social-selling': 'Instagram, Meta, and Facebook logos',
  shopify: 'Shopify logo',
  wix: 'Wix logo',
};

function MeeshoSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {/* Stylized Meesho double-arch 'm' in signature magenta/plum */}
      <path
        d="M5.5 25.5V15.2C5.5 11.9 8.1 9.4 11.4 9.4C13.6 9.4 15.5 10.5 16.5 12.2C17.5 10.5 19.4 9.4 21.6 9.4C24.9 9.4 27.5 11.9 27.5 15.2V25.5"
        stroke="#F43397"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 12.6V25.5"
        stroke="#580A46"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <circle cx="29.8" cy="11.2" r="2.2" fill="#FF9D00" />
    </svg>
  );
}

function AmazonIndiaSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {/* Bold lowercase 'a' */}
      <path
        d="M10.5 12.2C12 10.5 14.3 9.7 16.8 9.7C20.5 9.7 22.8 11.6 22.8 15.1V21.7C22.8 22.6 23.1 23.3 23.6 23.9L21 25.2C20.4 24.4 20.1 23.6 20 22.7C18.8 24.2 16.9 25 14.6 25C11.6 25 9.5 23.2 9.5 20.4C9.5 17.3 12 15.7 16.2 15.4L19.6 15.1V14.5C19.6 13 18.6 12.2 16.6 12.2C15 12.2 13.7 12.8 12.7 13.9L10.5 12.2ZM19.6 17.3L16.8 17.5C14.1 17.7 12.8 18.6 12.8 20.1C12.8 21.5 13.9 22.4 15.5 22.4C17.8 22.4 19.6 20.7 19.6 18.2V17.3Z"
        fill="#1A1B1A"
      />
      {/* Official Amazon Smile Arrow */}
      <path
        d="M6.8 26.8C11.8 30.2 19.6 30.8 26.8 27.6"
        stroke="#FF9900"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M24.4 25.6L28.2 26.8L26.5 30.4"
        stroke="#FF9900"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crisp IN tag mark */}
      <rect x="23.2" y="4" width="10.8" height="7.5" rx="2" fill="#232F3E" />
      <text
        x="28.6"
        y="9.5"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="5.4"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        IN
      </text>
    </svg>
  );
}

function AmazonGlobalSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {/* Bold lowercase 'a' */}
      <path
        d="M8.8 13.2C10.2 11.6 12.3 10.8 14.6 10.8C18.1 10.8 20.2 12.6 20.2 15.9V21.9C20.2 22.7 20.5 23.4 21 23.9L18.6 25.1C18.1 24.4 17.8 23.6 17.7 22.8C16.5 24.2 14.8 25 12.6 25C9.8 25 7.9 23.3 7.9 20.7C7.9 17.8 10.2 16.3 14.2 16L17.3 15.7V15.2C17.3 13.8 16.4 13.1 14.5 13.1C13 13.1 11.8 13.6 10.9 14.6L8.8 13.2ZM17.3 17.7L14.7 17.9C12.2 18.1 11 19 11 20.4C11 21.7 12 22.5 13.5 22.5C15.6 22.5 17.3 20.9 17.3 18.6V17.7Z"
        fill="#1A1B1A"
      />
      {/* Amazon Smile Arrow */}
      <path
        d="M5.8 26.8C10.6 30.1 17.9 30.7 24.6 27.6"
        stroke="#FF9900"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M22.4 25.8L25.9 26.9L24.4 30.2"
        stroke="#FF9900"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Global export globe emblem */}
      <circle cx="27.2" cy="10.2" r="6" fill="#232F3E" />
      <circle cx="27.2" cy="10.2" r="4.3" stroke="#FFFFFF" strokeWidth="1.15" />
      <ellipse cx="27.2" cy="10.2" rx="2.1" ry="4.3" stroke="#FFFFFF" strokeWidth="1.05" />
      <line x1="22.9" y1="10.2" x2="31.5" y2="10.2" stroke="#FF9900" strokeWidth="1.15" />
    </svg>
  );
}

function EtsySvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {/* Classic Etsy serif wordmark block / 'Etsy' crisp typography in Etsy Orange */}
      <rect x="2" y="2" width="32" height="32" rx="7" fill="#F56400" />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="13.2"
        fontWeight="700"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="-0.3"
      >
        Etsy
      </text>
    </svg>
  );
}

function WhatsAppSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {/* Green rounded speech bubble */}
      <path
        d="M18 4C10.27 4 4 10.16 4 17.75C4 20.53 4.85 23.12 6.3 25.28L4.7 31.2L10.8 29.62C12.92 30.82 15.38 31.5 18 31.5C25.73 31.5 32 25.34 32 17.75C32 10.16 25.73 4 18 4Z"
        fill="#25D366"
      />
      {/* White phone handset inside bubble */}
      <path
        d="M24.2 21.1C23.88 20.94 22.3 20.16 22 20.06C21.7 19.95 21.48 19.9 21.26 20.22C21.04 20.54 20.42 21.27 20.23 21.49C20.04 21.71 19.85 21.73 19.53 21.57C19.21 21.41 18.18 21.07 16.95 19.97C16 19.12 15.36 18.08 15.17 17.76C14.98 17.44 15.15 17.27 15.31 17.11C15.46 16.97 15.63 16.73 15.79 16.54C15.95 16.35 16.01 16.21 16.12 15.99C16.23 15.77 16.17 15.58 16.09 15.42C16.01 15.26 15.37 13.68 15.1 13.04C14.84 12.42 14.57 12.5 14.37 12.49C14.18 12.48 13.97 12.48 13.75 12.48C13.53 12.48 13.18 12.56 12.88 12.88C12.58 13.2 11.74 13.99 11.74 15.58C11.74 17.17 12.91 18.71 13.07 18.92C13.23 19.13 15.36 22.43 18.62 23.84C19.4 24.18 20.01 24.38 20.48 24.53C21.26 24.78 21.97 24.74 22.53 24.66C23.16 24.57 24.47 23.87 24.74 23.11C25.01 22.35 25.01 21.7 24.93 21.57C24.85 21.44 24.52 21.26 24.2 21.1Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function SocialMediaClusterSvg({ className }: { className?: string }) {
  const gradId = useId();
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="4" y1="22" x2="20" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCAF45" />
          <stop offset="35%" stopColor="#F77737" />
          <stop offset="68%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>

      {/* Top-left: Instagram */}
      <rect x="3" y="4" width="16.5" height="16.5" rx="4.6" fill={`url(#${gradId})`} />
      <rect
        x="6.1"
        y="7.1"
        width="10.3"
        height="10.3"
        rx="2.9"
        stroke="#FFFFFF"
        strokeWidth="1.45"
      />
      <circle cx="11.25" cy="12.25" r="2.3" stroke="#FFFFFF" strokeWidth="1.4" />
      <circle cx="14.55" cy="8.95" r="0.85" fill="#FFFFFF" />

      {/* Top-right: Facebook */}
      <circle cx="25.5" cy="12.2" r="7.5" fill="#1877F2" />
      <path
        d="M27.7 13H26.1V19.6H23.7V13H22.4V10.9H23.7V9.5C23.7 8.1 24.5 7 26.4 7H28V9H26.9C26.2 9 26.1 9.3 26.1 9.8V10.9H28L27.7 13Z"
        fill="#FFFFFF"
      />

      {/* Bottom-center: Meta */}
      <rect x="6" y="21.5" width="24" height="11.2" rx="5.6" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="1" />
      <path
        d="M11.6 27.2C11.6 25.3 13 24.1 14.5 24.1C16 24.1 17 25.4 18 27.1C19 28.8 20 30.1 21.5 30.1C23 30.1 24.4 28.9 24.4 27C24.4 25.1 23 24.1 21.5 24.1C20.2 24.1 19.3 25 18.6 26.1M17.4 28.1C16.7 29.2 15.8 30.1 14.5 30.1C13 30.1 11.6 29.1 11.6 27.2Z"
        stroke="#0081FB"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShopifySvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {/* Bag handle */}
      <path
        d="M13.8 9.2C13.8 6.4 15.6 4.5 18 4.5C20.4 4.5 22.2 6.4 22.2 9.2"
        stroke="#5E8E3E"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Main green shopping bag body */}
      <path d="M8.5 9.2H25.2L27.8 29.8L6 29.8L8.5 9.2Z" fill="#95BF47" />
      {/* Right depth flap in Shopify dark green */}
      <path d="M25.2 9.2L29.6 10.4L30.8 28.8L27.8 29.8L25.2 9.2Z" fill="#5E8E3E" />
      {/* Crisp white 'S' glyph */}
      <path
        d="M19.8 16.5C19 15.9 17.8 15.6 16.7 15.8C15.4 16 14.7 16.8 14.8 17.8C14.9 18.9 15.9 19.3 17.3 19.7C18.8 20.1 19.8 20.8 19.7 22.3C19.6 23.9 18.1 25 16.2 25C14.8 25 13.6 24.5 12.9 23.8L14 22.1C14.6 22.6 15.4 22.9 16.2 22.9C17.1 22.9 17.6 22.5 17.6 21.9C17.6 21.3 17 20.9 15.6 20.5C14.1 20.1 12.9 19.4 12.9 17.8C12.9 16.1 14.3 14.8 16.6 14.6C18.1 14.5 19.4 14.9 20.4 15.6L19.8 16.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function WixSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      {/* Signature geometric Wix wordmark on white */}
      <path
        d="M3.5 12.5L6.5 23.8H8.6L10.8 16.2L13 23.8H15.1L18.1 12.5H15.8L14 20.1L11.8 12.5H9.8L7.6 20.1L5.8 12.5H3.5Z"
        fill="#000000"
      />
      {/* Distinct Wix 'i' stem + warm gold accent dot */}
      <rect x="19.6" y="15.2" width="2.3" height="8.6" rx="0.5" fill="#000000" />
      <circle cx="20.75" cy="12.5" r="1.45" fill="#FAAD4D" />
      {/* Geometric 'X' */}
      <path
        d="M23.7 12.5L27.1 18L23.5 23.8H26L28.4 19.7L30.8 23.8H33.3L29.7 18L33.1 12.5H30.6L28.4 16.3L26.2 12.5H23.7Z"
        fill="#000000"
      />
    </svg>
  );
}

export function ChannelLogo({
  slug,
  size = 'md',
  label,
  decorative = true,
  className = '',
}: ChannelLogoProps) {
  const { tile, svg } = SIZE_CLASSES[size];
  const resolvedLabel = label || DEFAULT_CHANNEL_LABELS[slug];

  const renderSvg = () => {
    switch (slug) {
      case 'meesho':
        return <MeeshoSvg className={svg} />;
      case 'amazon-india':
        return <AmazonIndiaSvg className={svg} />;
      case 'amazon-global':
        return <AmazonGlobalSvg className={svg} />;
      case 'etsy':
        return <EtsySvg className={svg} />;
      case 'whatsapp-selling':
        return <WhatsAppSvg className={svg} />;
      case 'social-selling':
        return <SocialMediaClusterSvg className={svg} />;
      case 'shopify':
        return <ShopifySvg className={svg} />;
      case 'wix':
        return <WixSvg className={svg} />;
    }
  };

  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : resolvedLabel}
      className={`inline-flex items-center justify-center shrink-0 bg-[#FFFFFF] border border-[#E6E6DF] shadow-2xs select-none ${tile} ${className}`}
    >
      {renderSvg()}
    </span>
  );
}
