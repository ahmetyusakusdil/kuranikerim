import { useState, useCallback } from 'react';
import { Bookmark } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useBookmark() {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('quran_bookmarks', []);

  const addBookmark = useCallback((pageNumber: number, suraName: string, note?: string) => {
    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      pageNumber,
      suraName,
      note,
      createdAt: new Date(),
    };

    setBookmarks((prev) => [...prev, newBookmark]);
  }, [setBookmarks]);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  }, [setBookmarks]);

  const isBookmarked = useCallback((pageNumber: number) => {
    return bookmarks.some((bookmark) => bookmark.pageNumber === pageNumber);
  }, [bookmarks]);

  const getBookmarkForPage = useCallback((pageNumber: number) => {
    return bookmarks.find((bookmark) => bookmark.pageNumber === pageNumber);
  }, [bookmarks]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkForPage,
  };
}
