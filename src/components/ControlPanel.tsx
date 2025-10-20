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
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a4d2e]/95 dark:bg-[#0f2819]/95 backdrop-blur-sm text-white py-2 md:py-3 px-2 md:px-4 shadow-lg border-t border-[#d4af37]/20 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Birinci satır (mobilde) - Navigasyon */}
        <div className="flex items-center justify-between w-full md:w-auto gap-1 md:gap-2">
          <div className="flex items-center gap-0.5 md:gap-1">
            <button
              onClick={onFirst}
              disabled={!canGoPrev || isFlipping}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="İlk sayfa (Home)"
              aria-label="İlk sayfa"
            >
              <ChevronsLeft size={18} className="md:w-5 md:h-5" />
            </button>

            <button
              onClick={onPrev}
              disabled={!canGoPrev || isFlipping}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Önceki sayfa (←)"
              aria-label="Önceki sayfa"
            >
              <ChevronLeft size={18} className="md:w-5 md:h-5" />
            </button>
          </div>

          <button
            onClick={onPageClick}
            className="px-2 md:px-4 py-1.5 md:py-2 hover:bg-white/10 rounded-lg transition-colors text-xs md:text-sm font-medium min-w-[100px] md:min-w-[140px]"
            title="Sayfaya git"
          >
            Sayfa {currentPage} / {totalPages}
          </button>

          <div className="flex items-center gap-0.5 md:gap-1">
            <button
              onClick={onNext}
              disabled={!canGoNext || isFlipping}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Sonraki sayfa (→)"
              aria-label="Sonraki sayfa"
            >
              <ChevronRight size={18} className="md:w-5 md:h-5" />
            </button>

            <button
              onClick={onLast}
              disabled={!canGoNext || isFlipping}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Son sayfa (End)"
              aria-label="Son sayfa"
            >
              <ChevronsRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* İkinci satır (mobilde) - Zoom ve diğer kontroller */}
        <div className="flex items-center justify-between w-full md:w-auto gap-1 md:gap-2">
          {/* Zoom kontrolleri - artık mobilde de görünür */}
          <div className="flex items-center gap-0.5 md:gap-1 md:ml-4 md:pl-4 md:border-l border-white/20">
            <button
              onClick={onZoomOut}
              disabled={zoomLevel <= 0.5}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Uzaklaştır"
              aria-label="Uzaklaştır"
            >
              <ZoomOut size={16} className="md:w-[18px] md:h-[18px]" />
            </button>

            <span className="text-[10px] md:text-xs px-1 md:px-2 min-w-[40px] md:min-w-[50px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              onClick={onZoomIn}
              disabled={zoomLevel >= 3}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Yakınlaştır"
              aria-label="Yakınlaştır"
            >
              <ZoomIn size={16} className="md:w-[18px] md:h-[18px]" />
            </button>
          </div>

          {/* Diğer kontroller */}
          <div className="flex items-center gap-0.5 md:gap-1 md:ml-4 md:pl-4 md:border-l border-white/20">
            <button
              onClick={onToggleBookmark}
              className={`p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors ${
                isBookmarked ? 'text-[#d4af37]' : ''
              }`}
              title="Yer imi (B)"
              aria-label="Yer imi"
            >
              <Bookmark size={16} className="md:w-[18px] md:h-[18px]" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={onToggleSuraIndex}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Sure indeksi (S)"
              aria-label="Sure indeksi"
            >
              <List size={16} className="md:w-[18px] md:h-[18px]" />
            </button>

            <button
              onClick={onToggleTheme}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Tema değiştir"
              aria-label="Tema değiştir"
            >
              {isDark ? <Sun size={16} className="md:w-[18px] md:h-[18px]" /> : <Moon size={16} className="md:w-[18px] md:h-[18px]" />}
            </button>

            <button
              onClick={onToggleSettings}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Ayarlar"
              aria-label="Ayarlar"
            >
              <Settings size={16} className="md:w-[18px] md:h-[18px]" />
            </button>

            <button
              onClick={onToggleFullscreen}
              className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Tam ekran (F)"
              aria-label="Tam ekran"
            >
              {isFullscreen ? <Minimize size={16} className="md:w-[18px] md:h-[18px]" /> : <Maximize size={16} className="md:w-[18px] md:h-[18px]" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
