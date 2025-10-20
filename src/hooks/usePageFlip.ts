import { useState, useCallback, useEffect } from 'react';
import { TOTAL_IMAGES } from '../utils/pageUtils';
import { useLocalStorage } from './useLocalStorage';

export function usePageFlip() {
  const [currentImageIndex, setCurrentImageIndex] = useLocalStorage<number>('quran_current_page', 0);
  const [isFlipping, setIsFlipping] = useState(false);

  const canGoNext = currentImageIndex < TOTAL_IMAGES - 1;
  const canGoPrev = currentImageIndex > 0;

  const goToImageIndex = useCallback((index: number, animate = true) => {
    if (index < 0 || index >= TOTAL_IMAGES || isFlipping) return;

    if (animate) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsFlipping(false);
      }, 800);
    } else {
      setCurrentImageIndex(index);
    }
  }, [isFlipping, setCurrentImageIndex]);

  const goToPage = useCallback((pageNumber: number, animate = true) => {
    const imageIndex = Math.floor((pageNumber - 1) / 2);
    goToImageIndex(imageIndex, animate);
  }, [goToImageIndex]);

  const nextPage = useCallback(() => {
    if (canGoNext && !isFlipping) {
      goToImageIndex(currentImageIndex + 1);
    }
  }, [canGoNext, currentImageIndex, isFlipping, goToImageIndex]);

  const prevPage = useCallback(() => {
    if (canGoPrev && !isFlipping) {
      goToImageIndex(currentImageIndex - 1);
    }
  }, [canGoPrev, currentImageIndex, isFlipping, goToImageIndex]);

  const firstPage = useCallback(() => {
    if (!isFlipping) {
      goToImageIndex(0);
    }
  }, [isFlipping, goToImageIndex]);

  const lastPage = useCallback(() => {
    if (!isFlipping) {
      goToImageIndex(TOTAL_IMAGES - 1);
    }
  }, [isFlipping, goToImageIndex]);

  return {
    currentImageIndex,
    isFlipping,
    canGoNext,
    canGoPrev,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    goToPage,
    goToImageIndex,
  };
}
