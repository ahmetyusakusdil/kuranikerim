import { useState, useEffect, useCallback } from 'react';
import { MushafPage } from './components/MushafPage';
import { ControlPanel } from './components/ControlPanel';
import { SuraIndex } from './components/SuraIndex';
import { SettingsPanel } from './components/SettingsPanel';
import { PageJumpModal } from './components/PageJumpModal';
import { BookmarksPanel } from './components/BookmarksPanel';
import { usePageFlip } from './hooks/usePageFlip';
import { useBookmark } from './hooks/useBookmark';
import { useSettings } from './hooks/useSettings';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { getPageRange, TOTAL_PAGES } from './utils/pageUtils';
import { SURA_INDEX } from './data/suraIndex';

function App() {
  const {
    currentImageIndex,
    isFlipping,
    canGoNext,
    canGoPrev,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    goToPage,
  } = usePageFlip();

  const { bookmarks, addBookmark, removeBookmark, isBookmarked, getBookmarkForPage } =
    useBookmark();

  const { settings, updateSettings } = useSettings();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSuraIndex, setShowSuraIndex] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPageJump, setShowPageJump] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(settings.zoomLevel);

  const pageRange = getPageRange(currentImageIndex);
  const currentPage = pageRange.start;

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('sepia');
    } else if (settings.theme === 'sepia') {
      root.classList.add('sepia');
      root.classList.remove('dark');
    } else {
      root.classList.remove('dark', 'sepia');
    }
  }, [settings.theme]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleBookmark = useCallback(() => {
    const currentSura = SURA_INDEX.find(
      (sura, index) =>
        currentPage >= sura.startPage &&
        (index === SURA_INDEX.length - 1 || currentPage < SURA_INDEX[index + 1].startPage)
    );

    if (isBookmarked(currentPage)) {
      const bookmark = getBookmarkForPage(currentPage);
      if (bookmark) {
        removeBookmark(bookmark.id);
      }
    } else {
      addBookmark(currentPage, currentSura?.name || 'Bilinmeyen Sure');
    }
  }, [currentPage, isBookmarked, getBookmarkForPage, removeBookmark, addBookmark]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleToggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'sepia'> = ['light', 'dark', 'sepia'];
    const currentIndex = themes.indexOf(settings.theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    updateSettings({ theme: nextTheme });
  };

  const closeAllPanels = useCallback(() => {
    setShowSuraIndex(false);
    setShowSettings(false);
    setShowPageJump(false);
    setShowBookmarks(false);
  }, []);

  useKeyboardNav({
    onNextPage: nextPage,
    onPrevPage: prevPage,
    onFirstPage: firstPage,
    onLastPage: lastPage,
    onToggleFullscreen: toggleFullscreen,
    onToggleBookmark: handleToggleBookmark,
    onToggleSuraIndex: () => {
      setShowSuraIndex((prev) => !prev);
      setShowSettings(false);
      setShowPageJump(false);
      setShowBookmarks(false);
    },
    onEscape: closeAllPanels,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (settings.autoPlayEnabled && canGoNext && !isFlipping) {
      interval = setInterval(() => {
        nextPage();
      }, settings.autoPlayInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [settings.autoPlayEnabled, settings.autoPlayInterval, canGoNext, isFlipping, nextPage]);

  return (
    <div className="fixed inset-0 bg-[#f5f1e8] dark:bg-[#2a2a2a] sepia:bg-[#f4ecd8] overflow-hidden">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 bg-[#1a4d2e]/90 backdrop-blur-sm text-white px-6 py-2 rounded-full shadow-lg">
        <h1 className="text-lg font-bold text-center">Kuran-ı Kerim</h1>
      </div>

      <div className="fixed inset-0">
        <MushafPage
          imageIndex={currentImageIndex}
          isFlipping={isFlipping}
          onNext={nextPage}
          onPrev={prevPage}
          canGoNext={canGoNext}
          canGoPrev={canGoPrev}
          zoomLevel={zoomLevel}
        />
      </div>

      <ControlPanel
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        isFlipping={isFlipping}
        onNext={nextPage}
        onPrev={prevPage}
        onFirst={firstPage}
        onLast={lastPage}
        onToggleFullscreen={toggleFullscreen}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onToggleTheme={handleToggleTheme}
        onToggleBookmark={() => setShowBookmarks((prev) => !prev)}
        onToggleSuraIndex={() => setShowSuraIndex((prev) => !prev)}
        onToggleSettings={() => setShowSettings((prev) => !prev)}
        onPageClick={() => setShowPageJump(true)}
        isFullscreen={isFullscreen}
        isDark={settings.theme === 'dark'}
        isBookmarked={isBookmarked(currentPage)}
        zoomLevel={zoomLevel}
      />

      <SuraIndex
        isOpen={showSuraIndex}
        onClose={() => setShowSuraIndex(false)}
        onSuraClick={goToPage}
        currentPage={currentPage}
      />

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
      />

      <PageJumpModal
        isOpen={showPageJump}
        onClose={() => setShowPageJump(false)}
        onJumpToPage={goToPage}
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
      />

      <BookmarksPanel
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        bookmarks={bookmarks}
        onBookmarkClick={goToPage}
        onBookmarkDelete={removeBookmark}
        currentPage={currentPage}
      />

      <div className="fixed top-0 left-0 right-0 h-1 bg-[#1a4d2e]/20 dark:bg-white/10 z-30">
        <div
          className="h-full bg-[#d4af37] transition-all duration-300"
          style={{ width: `${(currentPage / TOTAL_PAGES) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default App;
