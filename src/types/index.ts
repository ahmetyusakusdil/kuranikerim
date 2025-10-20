export interface Sura {
  no: number;
  name: string;
  nameArabic: string;
  startPage: number;
  ayahCount: number;
}

export interface Bookmark {
  id: string;
  pageNumber: number;
  suraName: string;
  note?: string;
  createdAt: Date;
}

export interface Settings {
  theme: 'light' | 'dark' | 'sepia';
  soundEnabled: boolean;
  pageFlipSpeed: 'slow' | 'normal' | 'fast';
  zoomLevel: number;
  autoPlayEnabled: boolean;
  autoPlayInterval: number;
}

export interface ReadingProgress {
  currentPage: number;
  totalPages: number;
  percentage: number;
  lastReadAt: Date;
  totalReadingTime: number;
}

export type PageFlipDirection = 'next' | 'prev';
