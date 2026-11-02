import React, { useState } from 'react';

interface MediaImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

/**
 * Hybrid Media Image Component
 * Supports both remote URLs (https://...) and local asset paths (/assets/...).
 * Features graceful SVG fallback on load failure and smooth opacity transition.
 */
export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  loading = 'lazy',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback SVG data URI with an appetizing artisanal wheat & bread graphic
  const defaultFallback =
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none">
        <rect width="100%" height="100%" fill="#EBDDCB"/>
        <g opacity="0.6">
          <circle cx="400" cy="270" r="140" fill="#D9C3A8"/>
          <path d="M320 280 C330 220 470 220 480 280 C470 330 330 330 320 280 Z" fill="#98521A"/>
          <path d="M350 255 C370 240 430 240 450 255" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
          <path d="M360 280 C380 268 420 268 440 280" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
        </g>
        <text x="50%" y="460" font-family="serif" font-size="24" fill="#6B5A4D" text-anchor="middle" font-weight="600">
          Levain &amp; Co. Panificação Artesanal
        </text>
      </svg>
    `);

  const effectiveSrc = hasError ? fallbackSrc || defaultFallback : src;

  return (
    <div className={`relative overflow-hidden bg-[var(--color-surface-muted)] ${className}`}>
      {/* Skeleton placeholder while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-[var(--color-surface-muted)] flex items-center justify-center">
          <span className="text-xs text-[var(--color-text-muted)] font-mono opacity-50">carregando...</span>
        </div>
      )}

      <img
        src={effectiveSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        {...props}
      />
    </div>
  );
};
