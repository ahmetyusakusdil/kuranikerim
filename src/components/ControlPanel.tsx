import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Moon,
  Sun,
  Bookmark,
  List,
  Settings,
} from 'lucide-react';

interface ControlPanelProps {
  currentPage: number;
  totalPages: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  isFlipping: boolean;
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
  onToggleFullscreen: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleTheme: () => void;
  onToggleBookmark: () => void;
  onToggleSuraIndex: () => void;
  onToggleSettings: () => void;
  onPageClick: () => void;
  isFullscreen: boolean;
  isDark: boolean;
  isBookmarked: boolean;
  zoomLevel: number;
}

export function ControlPanel({
  currentPage,
  totalPages,
  canGoNext,
  canGoPrev,
  isFlipping,
  onNext,
  onPrev,
  onFirst,
  onLast,
  onToggleFullscreen,
  onZoomIn,
  onZoomOut,
  onToggleTheme,
  onToggleBookmark,
  onToggleSuraIndex,
  onToggleSettings,
  onPageClick,
  isFullscreen,
  isDark,
  isBookmarked,
  zoomLevel,
}: ControlPanelProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a4d2e]/95 dark:bg-[#0f2819]/95 backdrop-blur-sm text-white py-3 px-4 shadow-lg border-t border-[#d4af37]/20 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={onFirst}
            disabled={!canGoPrev || isFlipping}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="İlk sayfa (Home)"
            aria-label="İlk sayfa"
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            onClick={onPrev}
            disabled={!canGoPrev || isFlipping}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Önceki sayfa (←)"
            aria-label="Önceki sayfa"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <button
          onClick={onPageClick}
          className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium min-w-[140px]"
          title="Sayfaya git"
        >
          Sayfa {currentPage} / {totalPages}
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={onNext}
            disabled={!canGoNext || isFlipping}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Sonraki sayfa (→)"
            aria-label="Sonraki sayfa"
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={onLast}
            disabled={!canGoNext || isFlipping}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Son sayfa (End)"
            aria-label="Son sayfa"
          >
            <ChevronsRight size={20} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-white/20">
          <button
            onClick={onZoomOut}
            disabled={zoomLevel <= 0.5}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Uzaklaştır"
            aria-label="Uzaklaştır"
          >
            <ZoomOut size={18} />
          </button>

          <span className="text-xs px-2 min-w-[50px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            onClick={onZoomIn}
            disabled={zoomLevel >= 3}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Yakınlaştır"
            aria-label="Yakınlaştır"
          >
            <ZoomIn size={18} />
          </button>
        </div>

        <div className="flex items-center gap-1 ml-4 pl-4 border-l border-white/20">
          <button
            onClick={onToggleBookmark}
            className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${
              isBookmarked ? 'text-[#d4af37]' : ''
            }`}
            title="Yer imi (B)"
            aria-label="Yer imi"
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          <button
            onClick={onToggleSuraIndex}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Sure indeksi (S)"
            aria-label="Sure indeksi"
          >
            <List size={18} />
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Tema değiştir"
            aria-label="Tema değiştir"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onToggleSettings}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Ayarlar"
            aria-label="Ayarlar"
          >
            <Settings size={18} />
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Tam ekran (F)"
            aria-label="Tam ekran"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
