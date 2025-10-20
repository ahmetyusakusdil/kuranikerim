import { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { SURA_INDEX } from '../data/suraIndex';
import { Sura } from '../types';

interface SuraIndexProps {
  isOpen: boolean;
  onClose: () => void;
  onSuraClick: (pageNumber: number) => void;
  currentPage: number;
}

export function SuraIndex({ isOpen, onClose, onSuraClick, currentPage }: SuraIndexProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuras = useMemo(() => {
    if (!searchQuery.trim()) return SURA_INDEX;

    const query = searchQuery.toLowerCase();
    return SURA_INDEX.filter(
      (sura) =>
        sura.name.toLowerCase().includes(query) ||
        sura.nameArabic.includes(query) ||
        sura.no.toString().includes(query)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSuraClick = (sura: Sura) => {
    onSuraClick(sura.startPage);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#f5f1e8] dark:bg-[#1e1e1e] shadow-2xl z-50 overflow-hidden flex flex-col">
        <div className="bg-[#1a4d2e] text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Sure İndeksi</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-[#1a4d2e]/20 dark:border-white/10">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a4d2e]/50 dark:text-white/50"
              size={20}
            />
            <input
              type="text"
              placeholder="Sure ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#1a4d2e]/20 dark:border-white/20 bg-white dark:bg-[#2a2a2a] text-[#2c2c2c] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredSuras.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[#1a4d2e]/50 dark:text-white/50">
              <p>Sonuç bulunamadı</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1a4d2e]/10 dark:divide-white/10">
              {filteredSuras.map((sura) => (
                <button
                  key={sura.no}
                  onClick={() => handleSuraClick(sura)}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-[#1a4d2e]/5 dark:hover:bg-white/5 transition-colors text-left ${
                    currentPage >= sura.startPage &&
                    (filteredSuras[sura.no] === undefined ||
                      currentPage < filteredSuras[sura.no].startPage)
                      ? 'bg-[#d4af37]/10 border-l-4 border-[#d4af37]'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1a4d2e] dark:bg-[#d4af37] text-white dark:text-[#1a4d2e] font-bold text-sm">
                      {sura.no}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[#1a4d2e] dark:text-white">
                        {sura.name}
                      </div>
                      <div className="text-sm text-[#1a4d2e]/60 dark:text-white/60">
                        {sura.ayahCount} ayet
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-xl text-[#1a4d2e] dark:text-[#d4af37] font-arabic">
                      {sura.nameArabic}
                    </div>
                    <div className="text-xs text-[#1a4d2e]/60 dark:text-white/60">
                      Sayfa {sura.startPage}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#1a4d2e]/20 dark:border-white/10 bg-[#1a4d2e]/5 dark:bg-[#0f2819]">
          <p className="text-sm text-[#1a4d2e]/70 dark:text-white/70 text-center">
            Toplam {SURA_INDEX.length} sure
          </p>
        </div>
      </div>
    </>
  );
}
