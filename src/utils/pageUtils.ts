const GITHUB_REPO = 'https://media.githubusercontent.com/media/ahmetyusakusdil/Images/refs/heads/main';

const fileMapping: { [key: number]: string } = {
  0: 'SevkiMushaf_TSMK_MR4_Kab1a2.jpg',
  1: 'SevkiMushaf_TSMK_MR4_1b2a2.jpg',
  2: 'SevkiMushaf_TSMK_MR4_3b4a.jpg',
  3: 'SevkiMushaf_TSMK_MR4_4b5a.jpg',
  4: 'SevkiMushaf_TSMK_MR4_5b6a.jpg',
  5: 'SevkiMushaf_TSMK_MR4_6b7a.jpg',
  6: 'SevkiMushaf_TSMK_MR4_7b8a.jpg',
  7: 'SevkiMushaf_TSMK_MR4_8b9a.jpg',
  8: 'SevkiMushaf_TSMK_MR4_9b10a.jpg',
  9: 'SevkiMushaf_TSMK_MR4_10b11a.jpg',
  10: 'SevkiMushaf_TSMK_MR4_11b12a.jpg',
  11: 'SevkiMushaf_TSMK_MR4_12b13a.jpg',
  12: 'SevkiMushaf_TSMK_MR4_13b14a.jpg',
  13: 'SevkiMushaf_TSMK_MR4_14b15a.jpg',
  14: 'SevkiMushaf_TSMK_MR4_17b18a.jpg',
  15: 'SevkiMushaf_TSMK_MR4_18b19a.jpg',
  16: 'SevkiMushaf_TSMK_MR4_19b20a.jpg',
  17: 'SevkiMushaf_TSMK_MR4_20b21a.jpg',
  18: 'SevkiMushaf_TSMK_MR4_21b22a.jpg',
  19: 'SevkiMushaf_TSMK_MR4_22b23a.jpg',
  20: 'SevkiMushaf_TSMK_MR4_23b24a.jpg',
};

let currentIndex = 21;
for (let i = 24; i <= 101; i++) {
  fileMapping[currentIndex] = `SevkiMushaf_TSMK_MR4_${i}b${i + 1}a.jpg`;
  currentIndex++;
}

fileMapping[currentIndex] = 'SevkiMushaf_TSMK_MR4_104b105a.jpg';
currentIndex++;
fileMapping[currentIndex] = 'SevkiMushaf_TSMK_MR4_106b107a.jpg';
currentIndex++;

for (let i = 107; i <= 116; i++) {
  fileMapping[currentIndex] = `SevkiMushaf_TSMK_MR4_${i}b${i + 1}a.jpg`;
  currentIndex++;
}

fileMapping[currentIndex] = 'SevkiMushaf_TSMK_MR4_117b118a.jpg';
currentIndex++;

for (let i = 118; i <= 345; i++) {
  fileMapping[currentIndex] = `SevkiMushaf_TSMK_MR4_${i}b${i + 1}a.jpg`;
  currentIndex++;
}

fileMapping[currentIndex] = 'SevkiMushaf_TSMK_MR4_346b.jpg';

export const TOTAL_IMAGES = Object.keys(fileMapping).length;
export const TOTAL_PAGES = TOTAL_IMAGES * 2;

export const generatePageUrl = (imageIndex: number): string => {
  const filename = fileMapping[imageIndex];
  if (!filename) {
    return `${GITHUB_REPO}/SevkiMushaf_TSMK_MR4_Kab1a2.jpg`;
  }
  return `${GITHUB_REPO}/${filename}`;
};

export const getImageIndexFromPage = (pageNumber: number): number => {
  return Math.floor((pageNumber - 1) / 2);
};

export const getPageRange = (imageIndex: number): { start: number; end: number } => {
  if (imageIndex === 0) {
    return { start: 1, end: 2 };
  }

  const start = imageIndex * 2;
  const end = start + 1;

  return { start, end };
};

export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
};

export const preloadAdjacentPages = async (currentImageIndex: number): Promise<void> => {
  const imagesToPreload: number[] = [];

  for (let i = -2; i <= 2; i++) {
    const index = currentImageIndex + i;
    if (index >= 0 && index < TOTAL_IMAGES && index !== currentImageIndex) {
      imagesToPreload.push(index);
    }
  }

  await Promise.all(
    imagesToPreload.map(index => preloadImage(generatePageUrl(index)))
  );
};
