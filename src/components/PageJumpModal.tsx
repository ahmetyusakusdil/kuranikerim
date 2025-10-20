import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PageJumpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export function PageJumpModal({
  isOpen,
  onClose,
  onJumpToPage,
  currentPage,
  totalPages,
}: PageJumpModalProps) {
  const [pageInput, setPageInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPageInput(currentPage.toString());
      setError('');
    }
  }, [isOpen, currentPage]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const page = parseInt(pageInput);

    if (isNaN(page)) {
      setError('Geçerli bir sayı girin');
      return;
    }

    if (page < 1 || page > totalPages) {
      setError(`1 ile ${totalPages} arasında bir sayfa numarası girin`);
      return;
    }

    onJumpToPage(page);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#f5f1e8] dark:bg-[#1e1e1e] rounded-lg shadow-2xl z-50 overflow-hidden">
        <div className="bg-[#1a4d2e] text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Sayfaya Git</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="pageNumber"
                className="block text-sm font-medium text-[#1a4d2e] dark:text-white mb-2"
              >
                Sayfa Numarası (1-{totalPages})
              </label>
              <input
                id="pageNumber"
                type="number"
                min="1"
                max={totalPages}
                value={pageInput}
                onChange={(e) => {
                  setPageInput(e.target.value);
                  setError('');
                }}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#1a4d2e]/20 dark:border-white/20 bg-white dark:bg-[#2a2a2a] text-[#2c2c2c] dark:text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>

            <div className="text-sm text-[#1a4d2e]/60 dark:text-white/60">
              Şu anda: Sayfa {currentPage}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border-2 border-[#1a4d2e]/20 dark:border-white/20 text-[#1a4d2e] dark:text-white hover:bg-[#1a4d2e]/5 dark:hover:bg-white/5 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 rounded-lg bg-[#1a4d2e] text-white hover:bg-[#1a4d2e]/90 transition-colors font-medium"
              >
                Git
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
