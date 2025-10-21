import { useState, useEffect, useRef } from 'react';
import { generatePageUrl, getPageRange } from '../utils/pageUtils';

interface MushafPageProps {
  imageIndex: number;
  isFlipping: boolean;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  zoomLevel: number;
  onZoomChange: (newZoom: number) => void;
}

export function MushafPage({
  imageIndex,
  isFlipping,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  zoomLevel,
  onZoomChange,
}: MushafPageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageUrl = generatePageUrl(imageIndex);
  const pageRange = getPageRange(imageIndex);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastDistanceRef = useRef<number>(0);
  const isPinchingRef = useRef<boolean>(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [imageIndex]);

  // Pinch-to-zoom gesture handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        isPinchingRef.current = true;
        // İki parmak arasındaki mesafeyi hesapla
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        lastDistanceRef.current = distance;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isPinchingRef.current) {
        e.preventDefault(); // Varsayılan zoom davranışını engelle

        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        if (lastDistanceRef.current > 0) {
          // Oran bazlı zoom (daha hassas ve doğal)
          const scale = distance / lastDistanceRef.current;
          const newZoom = Math.max(0.5, Math.min(3, zoomLevel * scale));

          // Minimum değişim threshold'u - çok küçük değişimleri görmezden gel
          if (Math.abs(newZoom - zoomLevel) > 0.01) {
            onZoomChange(newZoom);
          }
        }

        lastDistanceRef.current = distance;
      }
    };

    const handleTouchEnd = () => {
      lastDistanceRef.current = 0;
      isPinchingRef.current = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [zoomLevel, onZoomChange]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error('Failed to load image:', imageUrl);
    setImageError(true);
    setImageLoaded(true);
  };

  const handleLeftClick = () => {
    if (canGoPrev && !isFlipping) {
      onPrev();
    }
  };

  const handleRightClick = () => {
    if (canGoNext && !isFlipping) {
      onNext();
    }
  };

  // Zoom yapıldığında scroll'u etkinleştir
  const isZoomed = zoomLevel > 1.05;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-auto bg-[#f5f1e8] dark:bg-[#2a2a2a] select-none"
      style={{
        // Mobilde smooth scroll için
        WebkitOverflowScrolling: 'touch',
        // Zoom yapıldığında pan, normal durumda pinch-zoom
        touchAction: isZoomed ? 'pan-x pan-y' : 'pan-x pan-y pinch-zoom',
        // Header (64px) ve toolbar (100px) için alan bırak
        height: 'calc(100vh - 0px)',
        paddingTop: '64px',
        paddingBottom: '100px',
        boxSizing: 'border-box',
      }}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[#1a4d2e] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#1a4d2e] dark:text-[#d4af37] font-medium">
              Sayfa {pageRange.start}-{pageRange.end} yükleniyor...
            </p>
          </div>
        </div>
      )}

      <div
        className="relative flex items-center justify-center transition-opacity duration-300"
        style={{
          width: `${zoomLevel * 100}%`,
          height: `${zoomLevel * 100}%`,
          minWidth: '100%',
          minHeight: 'calc(100vh - 164px)', // 100vh - paddingTop - paddingBottom
          opacity: imageLoaded ? 1 : 0,
        }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-800 ${
            isFlipping ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
          }`}
        >
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-[#f5f1e8] dark:bg-[#2a2a2a] text-red-600 dark:text-red-400">
              <div className="text-center p-8">
                <p className="text-xl font-medium mb-2">Sayfa yüklenemedi</p>
                <p className="text-sm opacity-70 mb-2">Sayfa {pageRange.start}-{pageRange.end}</p>
                <p className="text-xs opacity-50 break-all max-w-md">{imageUrl}</p>
              </div>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={`Mushaf Sayfa ${pageRange.start}-${pageRange.end}`}
              className="w-full h-full object-contain"
              onLoad={handleImageLoad}
              onError={handleImageError}
              draggable={false}
              style={{
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Navigation butonları sadece zoom yapılmadığında göster */}
          {!isZoomed && (
            <>
              <button
                onClick={handleLeftClick}
                className={`absolute left-0 top-0 bottom-0 w-1/4 cursor-pointer opacity-0 hover:opacity-10 transition-opacity bg-gradient-to-r from-[#1a4d2e] to-transparent ${
                  !canGoPrev || isFlipping ? 'cursor-not-allowed' : ''
                }`}
                disabled={!canGoPrev || isFlipping}
                aria-label="Önceki sayfa"
              />

              <button
                onClick={handleRightClick}
                className={`absolute right-0 top-0 bottom-0 w-1/4 cursor-pointer opacity-0 hover:opacity-10 transition-opacity bg-gradient-to-l from-[#1a4d2e] to-transparent ${
                  !canGoNext || isFlipping ? 'cursor-not-allowed' : ''
                }`}
                disabled={!canGoNext || isFlipping}
                aria-label="Sonraki sayfa"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
