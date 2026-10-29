import React from 'react';

interface OfficialEmblemProps {
  className?: string;
  size?: number;
}

export const OfficialEmblem: React.FC<OfficialEmblemProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Resmi Kementerian Agama Republik Indonesia"
    >
      <defs>
        <linearGradient id="kemenagGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <linearGradient id="kemenagGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Outer Golden Border Pentagonal Shield */}
      <polygon
        points="50,4 92,24 84,78 50,96 16,78 8,24"
        fill="url(#kemenagGreen)"
        stroke="url(#kemenagGold)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Inner Thin Gold Trim */}
      <polygon
        points="50,8 88,26 80,74 50,91 20,74 12,26"
        fill="none"
        stroke="#fde68a"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* Top 5-Pointed Star (Ketuhanan Yang Maha Esa) */}
      <polygon
        points="50,14 52.5,21 59.5,21 54,25.5 56,32 50,28 44,32 46,25.5 40.5,21 47.5,21"
        fill="#fef08a"
        stroke="#b45309"
        strokeWidth="0.5"
      />

      {/* Scales of Justice (Keadilan) */}
      {/* Central Axis */}
      <line x1="50" y1="31" x2="50" y2="56" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
      {/* Horizontal Beam */}
      <path d="M 32 37 Q 50 35 68 37" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Left Pan Strings & Pan */}
      <line x1="33" y1="37" x2="28" y2="47" stroke="#fef08a" strokeWidth="1" />
      <line x1="33" y1="37" x2="38" y2="47" stroke="#fef08a" strokeWidth="1" />
      <path d="M 26 47 Q 33 52 40 47 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.6" />
      {/* Right Pan Strings & Pan */}
      <line x1="67" y1="37" x2="62" y2="47" stroke="#fef08a" strokeWidth="1" />
      <line x1="67" y1="37" x2="72" y2="47" stroke="#fef08a" strokeWidth="1" />
      <path d="M 60 47 Q 67 52 74 47 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.6" />

      {/* Open Holy Book (Kitab Suci Terbuka) */}
      <path
        d="M 50 54 Q 38 49 28 52 L 28 64 Q 38 61 50 66 Q 62 61 72 64 L 72 52 Q 62 49 50 54 Z"
        fill="#ffffff"
        stroke="#064e3b"
        strokeWidth="1.2"
      />
      <line x1="50" y1="54" x2="50" y2="66" stroke="#064e3b" strokeWidth="1.2" />
      {/* Text lines on book */}
      <line x1="32" y1="55" x2="46" y2="57" stroke="#94a3b8" strokeWidth="0.7" />
      <line x1="32" y1="58" x2="46" y2="60" stroke="#94a3b8" strokeWidth="0.7" />
      <line x1="54" y1="57" x2="68" y2="55" stroke="#94a3b8" strokeWidth="0.7" />
      <line x1="54" y1="60" x2="68" y2="58" stroke="#94a3b8" strokeWidth="0.7" />

      {/* Rice and Cotton Wreath (Padi & Kapas) */}
      <path
        d="M 22 42 C 18 55 20 68 32 75"
        stroke="#fbbf24"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 78 42 C 82 55 80 68 68 75"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom Ribbon with "IKHLAS BERAMAL" */}
      <path
        d="M 20 78 Q 50 73 80 78 L 78 84 Q 50 80 22 84 Z"
        fill="#fbbf24"
        stroke="#b45309"
        strokeWidth="1"
      />
      <text
        x="50"
        y="82"
        fill="#1e293b"
        fontSize="5"
        fontWeight="800"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="0.4"
      >
        IKHLAS BERAMAL
      </text>
    </svg>
  );
};
