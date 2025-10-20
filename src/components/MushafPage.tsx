import { useState, useEffect } from 'react';
import { generatePageUrl, getPageRange } from '../utils/pageUtils';

interface MushafPageProps {
  imageIndex: number;
  isFlipping: boolean;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  zoomLevel: number;
}

export function MushafPage({
  imageIndex,
  isFlipping,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  zoomLevel,
}: MushafPageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageUrl = generatePageUrl(imageIndex);
  const pageRange = getPageRange(imageIndex);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [imageIndex]);

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
      className="relative w-full h-full overflow-auto bg-[#f5f1e8] dark:bg-[#2a2a2a] select-none"
      style={{
        // Mobilde smooth scroll için
        WebkitOverflowScrolling: 'touch',
        touchAction: isZoomed ? 'pan-x pan-y' : 'none',
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
          minHeight: '100%',
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
