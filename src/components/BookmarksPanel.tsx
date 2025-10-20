import { X, Trash2, BookmarkCheck } from 'lucide-react';
import { Bookmark } from '../types';

interface BookmarksPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onBookmarkClick: (pageNumber: number) => void;
  onBookmarkDelete: (id: string) => void;
  currentPage: number;
}

export function BookmarksPanel({
  isOpen,
  onClose,
  bookmarks,
  onBookmarkClick,
  onBookmarkDelete,
  currentPage,
}: BookmarksPanelProps) {
  if (!isOpen) return null;

  const sortedBookmarks = [...bookmarks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleBookmarkClick = (pageNumber: number) => {
    onBookmarkClick(pageNumber);
    onClose();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-0 left-0 bottom-0 w-full max-w-md bg-[#f5f1e8] dark:bg-[#1e1e1e] shadow-2xl z-50 overflow-hidden flex flex-col">
        <div className="bg-[#1a4d2e] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookmarkCheck size={24} />
            <h2 className="text-xl font-bold">Yer İmleri</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sortedBookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#1a4d2e]/50 dark:text-white/50 p-8">
              <BookmarkCheck size={64} className="mb-4 opacity-20" />
              <p className="text-lg font-medium mb-2">Henüz yer imi yok</p>
              <p className="text-sm text-center">
                Bir sayfayı yer imlerine eklemek için <br />
                <kbd className="px-2 py-1 bg-[#1a4d2e]/10 dark:bg-white/10 rounded text-xs font-mono">
                  B
                </kbd>{' '}
                tuşuna basın
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#1a4d2e]/10 dark:divide-white/10">
              {sortedBookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className={`group px-4 py-4 hover:bg-[#1a4d2e]/5 dark:hover:bg-white/5 transition-colors ${
                    bookmark.pageNumber === currentPage
                      ? 'bg-[#d4af37]/10 border-l-4 border-[#d4af37]'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => handleBookmarkClick(bookmark.pageNumber)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1a4d2e] dark:bg-[#d4af37] text-white dark:text-[#1a4d2e] text-sm font-bold">
                          {bookmark.pageNumber}
                        </span>
                        <span className="font-bold text-[#1a4d2e] dark:text-white">
                          {bookmark.suraName}
                        </span>
                      </div>
                      {bookmark.note && (
                        <p className="text-sm text-[#1a4d2e]/70 dark:text-white/70 mt-2 ml-10">
                          {bookmark.note}
                        </p>
                      )}
                      <p className="text-xs text-[#1a4d2e]/50 dark:text-white/50 mt-2 ml-10">
                        {formatDate(bookmark.createdAt)}
                      </p>
                    </button>

                    <button
                      onClick={() => onBookmarkDelete(bookmark.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Yer imini sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#1a4d2e]/20 dark:border-white/10 bg-[#1a4d2e]/5 dark:bg-[#0f2819]">
          <p className="text-sm text-[#1a4d2e]/70 dark:text-white/70 text-center">
            {sortedBookmarks.length} yer imi
          </p>
        </div>
      </div>
    </>
  );
}
