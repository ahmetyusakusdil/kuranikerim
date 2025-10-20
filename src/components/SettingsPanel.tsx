import { X } from 'lucide-react';
import { Settings } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onUpdateSettings: (updates: Partial<Settings>) => void;
}

export function SettingsPanel({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#f5f1e8] dark:bg-[#1e1e1e] rounded-lg shadow-2xl z-50 overflow-hidden">
        <div className="bg-[#1a4d2e] text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Ayarlar</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#1a4d2e] dark:text-white mb-2">
              Tema
            </label>
            <div className="flex gap-2">
              {(['light', 'dark', 'sepia'] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => onUpdateSettings({ theme })}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                    settings.theme === theme
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#1a4d2e] dark:text-white font-medium'
                      : 'border-[#1a4d2e]/20 dark:border-white/20 hover:border-[#d4af37]/50 text-[#1a4d2e]/70 dark:text-white/70'
                  }`}
                >
                  {theme === 'light' && 'Aydınlık'}
                  {theme === 'dark' && 'Karanlık'}
                  {theme === 'sepia' && 'Sepya'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a4d2e] dark:text-white mb-2">
              Sayfa Çevirme Hızı
            </label>
            <div className="flex gap-2">
              {(['slow', 'normal', 'fast'] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => onUpdateSettings({ pageFlipSpeed: speed })}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                    settings.pageFlipSpeed === speed
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#1a4d2e] dark:text-white font-medium'
                      : 'border-[#1a4d2e]/20 dark:border-white/20 hover:border-[#d4af37]/50 text-[#1a4d2e]/70 dark:text-white/70'
                  }`}
                >
                  {speed === 'slow' && 'Yavaş'}
                  {speed === 'normal' && 'Normal'}
                  {speed === 'fast' && 'Hızlı'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#1a4d2e] dark:text-white">
                Ses Efektleri
              </span>
              <button
                onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-[#1a4d2e]' : 'bg-[#1a4d2e]/30'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>

          <div>
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#1a4d2e] dark:text-white">
                Otomatik Oynatma
              </span>
              <button
                onClick={() =>
                  onUpdateSettings({ autoPlayEnabled: !settings.autoPlayEnabled })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoPlayEnabled ? 'bg-[#1a4d2e]' : 'bg-[#1a4d2e]/30'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoPlayEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>

          {settings.autoPlayEnabled && (
            <div>
              <label className="block text-sm font-medium text-[#1a4d2e] dark:text-white mb-2">
                Otomatik Oynatma Aralığı: {settings.autoPlayInterval / 1000}s
              </label>
              <input
                type="range"
                min="2000"
                max="10000"
                step="1000"
                value={settings.autoPlayInterval}
                onChange={(e) =>
                  onUpdateSettings({ autoPlayInterval: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-[#1a4d2e]/20 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#1a4d2e] dark:text-white mb-2">
              Varsayılan Zoom: {Math.round(settings.zoomLevel * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={settings.zoomLevel}
              onChange={(e) => onUpdateSettings({ zoomLevel: parseFloat(e.target.value) })}
              className="w-full h-2 bg-[#1a4d2e]/20 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
            />
          </div>
        </div>

        <div className="p-4 border-t border-[#1a4d2e]/20 dark:border-white/10 bg-[#1a4d2e]/5 dark:bg-[#0f2819]">
          <p className="text-xs text-[#1a4d2e]/70 dark:text-white/70 text-center">
            Ayarlar otomatik olarak kaydedilir
          </p>
        </div>
      </div>
    </>
  );
}
