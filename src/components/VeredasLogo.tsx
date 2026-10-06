import React from 'react';

interface VeredasLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'cream';
}

export const VeredasLogo: React.FC<VeredasLogoProps> = ({
  className = '',
  size = 56,
  showText = false,
  variant = 'dark'
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* SVG Official Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200"
      >
        {/* Outer subtle shadow/border */}
        <circle cx="100" cy="100" r="98" fill="#0D4B46" stroke="#093330" strokeWidth="2" />
        
        {/* Parchment/Cream Ring */}
        <circle cx="100" cy="100" r="93" fill="#FBF6E5" stroke="#D1BA78" strokeWidth="1.5" />
        
        {/* Curved Path for TOP Text: COLÉGIO CRISTÃO */}
        <defs>
          <path
            id="textPathTop"
            d="M 28,100 A 72,72 0 0,1 172,100"
            fill="none"
          />
          <path
            id="textPathBottom"
            d="M 166,108 A 72,72 0 0,1 34,108"
            fill="none"
          />
        </defs>

        {/* Text Top: COLÉGIO CRISTÃO */}
        <text
          fill="#0D4B46"
          fontSize="13.5"
          fontWeight="800"
          fontFamily="'Cinzel', Georgia, serif"
          letterSpacing="2.5"
        >
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            COLÉGIO CRISTÃO
          </textPath>
        </text>

        {/* Text Bottom: VEREDAS */}
        <text
          fill="#0D4B46"
          fontSize="14.5"
          fontWeight="800"
          fontFamily="'Cinzel', Georgia, serif"
          letterSpacing="4.5"
        >
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            VEREDAS
          </textPath>
        </text>

        {/* Inner teal border and circle */}
        <circle cx="100" cy="100" r="63" fill="#0D4B46" stroke="#D1BA78" strokeWidth="2.5" />

        {/* Decorative inner golden ring */}
        <circle cx="100" cy="100" r="60" fill="none" stroke="#F6E5B8" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Open Bible Symbol & Cross-V */}
        <g transform="translate(100, 106) scale(0.95)">
          {/* Left open Bible page curves */}
          <path
            d="M -38,10 C -25,2 -12,2 0,12 C -12,6 -25,6 -38,10 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <path
            d="M -38,14 C -25,6 -12,6 0,16 C -12,10 -25,10 -38,14 Z"
            fill="#FFFFFF"
            opacity="0.75"
          />
          <path
            d="M -36,18 C -24,11 -12,11 0,20 C -12,14 -24,14 -36,18 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
          {/* Right open Bible page curves */}
          <path
            d="M 38,10 C 25,2 12,2 0,12 C 12,6 25,6 38,10 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <path
            d="M 38,14 C 25,6 12,6 0,16 C 12,10 25,10 38,14 Z"
            fill="#FFFFFF"
            opacity="0.75"
          />
          <path
            d="M 36,18 C 24,11 12,11 0,20 C 12,14 24,14 36,18 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />

          {/* Book Spine / Base */}
          <path
            d="M -38,19 C -20,27 20,27 38,19 C 20,24 -20,24 -38,19 Z"
            fill="#F6E5B8"
          />

          {/* Christian Cross forming "V" of Veredas */}
          {/* Latin Cross vertical post with slight tilt */}
          <path
            d="M -6,-36 L 0,12 L 3,12 L -3,-36 Z"
            fill="#FFFFFF"
          />
          {/* Horizontal beam of the cross */}
          <path
            d="M -18,-24 L 7,-20 L 7,-17 L -18,-21 Z"
            fill="#FFFFFF"
          />

          {/* Dynamic "V" angle branch rising from the cross to the right */}
          <path
            d="M 0,12 L 17,-22 L 14,-23 L -1,10 Z"
            fill="#FFFFFF"
          />

          {/* Golden glow lines behind cross */}
          <circle cx="0" cy="-22" r="3" fill="#F6E5B8" opacity="0.8" />
        </g>
      </svg>

      {/* Optional institution typographic title */}
      {showText && (
        <div className="flex flex-col">
          <span className={`text-[11px] font-bold tracking-widest uppercase ${
            variant === 'light' ? 'text-emerald-100' : 'text-[#0D4B46]'
          }`}>
            Colégio Cristão
          </span>
          <span className={`text-xl font-extrabold tracking-wider font-crest ${
            variant === 'light' ? 'text-white' : 'text-[#0D4B46]'
          }`}>
            VEREDAS
          </span>
          <span className={`text-[10px] tracking-wide font-medium ${
            variant === 'light' ? 'text-[#F6E5B8]' : 'text-[#8C6D23]'
          }`}>
            Educação & Princípios Cristãos
          </span>
        </div>
      )}
    </div>
  );
};
