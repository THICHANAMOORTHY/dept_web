import React, { useState, useEffect } from 'react';
import './ProgressiveImage.css';

/**
 * ProgressiveImage component with skeleton shimmer, native lazy loading,
 * blur-to-clear transition, and error fallback support.
 */
const ProgressiveImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  containerClassName = '',
  containerStyle = {},
  fallbackType = 'generic', // 'generic' | 'avatar'
  fallbackText = '',
  loading = 'lazy',
  onLoad,
  onError,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset state when src changes
  useEffect(() => {
    if (!src || typeof src !== 'string' || !src.trim()) {
      setHasError(true);
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
      setHasError(false);
    }
  }, [src]);

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e) => {
    setHasError(true);
    setIsLoaded(true); // stop skeleton on error
    if (onError) onError(e);
  };

  return (
    <div
      className={`progressive-img-container ${containerClassName}`}
      style={{ ...containerStyle }}
    >
      {!isLoaded && <div className="progressive-img-skeleton" aria-hidden="true" />}

      {hasError ? (
        <div className="progressive-img-fallback">
          {fallbackType === 'avatar' ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          )}
          {fallbackText && <span>{fallbackText}</span>}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`progressive-img ${isLoaded ? 'progressive-img-loaded' : ''} ${className}`}
          style={{ ...style }}
          {...restProps}
        />
      )}
    </div>
  );
};

export default ProgressiveImage;
