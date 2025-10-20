import { useEffect } from 'react';

interface KeyboardNavCallbacks {
  onNextPage: () => void;
  onPrevPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onToggleFullscreen: () => void;
  onToggleBookmark: () => void;
  onToggleSuraIndex: () => void;
  onEscape: () => void;
}

export function useKeyboardNav(callbacks: KeyboardNavCallbacks) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          callbacks.onNextPage();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          callbacks.onPrevPage();
          break;
        case ' ':
          event.preventDefault();
          if (event.shiftKey) {
            callbacks.onPrevPage();
          } else {
            callbacks.onNextPage();
          }
          break;
        case 'PageDown':
          event.preventDefault();
          callbacks.onNextPage();
          break;
        case 'PageUp':
          event.preventDefault();
          callbacks.onPrevPage();
          break;
        case 'Home':
          event.preventDefault();
          callbacks.onFirstPage();
          break;
        case 'End':
          event.preventDefault();
          callbacks.onLastPage();
          break;
        case 'f':
        case 'F':
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            callbacks.onToggleFullscreen();
          }
          break;
        case 'F11':
          event.preventDefault();
          callbacks.onToggleFullscreen();
          break;
        case 'b':
        case 'B':
          event.preventDefault();
          callbacks.onToggleBookmark();
          break;
        case 's':
        case 'S':
          event.preventDefault();
          callbacks.onToggleSuraIndex();
          break;
        case 'Escape':
          callbacks.onEscape();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callbacks]);
}
