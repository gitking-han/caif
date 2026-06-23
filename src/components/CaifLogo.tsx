import React, { useId } from "react";

interface CaifLogoProps {
  iconSize?: number;
  textSize?: string;
  showText?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

/**
 * Mathematically precise vector-based icon for CAIF logo.
 * It features a squircle with a nested rounded plus-sign cut-out.
 * The cutout is dynamic and transparent via SVG masking, so it looks stunning
 * on any background (including gradients, dark themes, and transparent menus).
 */
export const CaifIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = "text-[#5D3EFC]" }) => {
  const maskId = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      id={`caif-icon-svg-${maskId}`}
    >
      <defs>
        <mask id={maskId}>
          {/* Base shape: solid squircle in mask (white = visible) */}
          <rect x="0" y="0" width="100" height="100" rx="30" fill="white" />
          
          {/* Vertical cut: centered at X=50, width=15, height=60, rounded caps (black = masked/cut) */}
          <rect x="42.5" y="20" width="15" height="60" rx="7.5" fill="black" />
          
          {/* Horizontal cut: centered at Y=50, height=15, width=80 starting at X=20, cutting open the right edge (black = masked/cut) */}
          <rect x="20" y="42.5" width="80" height="15" rx="7.5" fill="black" />
        </mask>
      </defs>
      {/* Outer squircle filled with currentColor and masked by the plus shape */}
      <rect x="0" y="0" width="100" height="100" rx="30" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
};

/**
 * Combined CAIF Brand Logo component incorporating the vector Icon and geometric wordmark text.
 */
export const CaifLogo: React.FC<CaifLogoProps> = ({
  iconSize = 34,
  textSize = "text-xl",
  showText = true,
  className = "flex items-center gap-2.5",
  iconClassName = "text-[#5D3EFC]",
  textClassName = "text-slate-900 dark:text-slate-100",
}) => {
  return (
    <div className={className} id="caif-full-logo-container">
      <CaifIcon size={iconSize} className={iconClassName} />
      {showText && (
        <span
          className={`font-['Montserrat'] font-black tracking-tight select-none leading-none ${textSize} ${textClassName}`}
          id="caif-logo-text"
        >
          CAIF
        </span>
      )}
    </div>
  );
};
