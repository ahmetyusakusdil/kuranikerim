import { Settings } from '../types';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  soundEnabled: false,
  pageFlipSpeed: 'normal',
  zoomLevel: 1,
  autoPlayEnabled: false,
  autoPlayInterval: 5000,
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>('quran_settings', DEFAULT_SETTINGS);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const getFlipDuration = () => {
    switch (settings.pageFlipSpeed) {
      case 'slow':
        return 1200;
      case 'fast':
        return 500;
      default:
        return 800;
    }
  };

  return {
    settings,
    updateSettings,
    getFlipDuration,
  };
}
