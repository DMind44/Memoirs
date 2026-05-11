import { useEffect, useMemo, useState } from 'react';
import { parseChapter } from '@/parsers/chapterParser';
import type { ChapterData } from '@/types';

export const CHAPTERS = [
  { id: 'chapter-1', title: 'Editor\'s Note' },
  { id: 'chapter-2', title: 'Early Memories' },
  { id: 'chapter-3', title: 'En La Calle' },
  { id: 'chapter-4', title: 'The Drum and Bugle Corps' },
  { id: 'chapter-5', title: 'Christmas in La Paz' },
  { id: 'chapter-6', title: 'The House of a Hundred Steps' },
  { id: 'chapter-7', title: 'Carnaval' },
  { id: 'chapter-8', title: 'Casa Cayara' },
  { id: 'chapter-9', title: 'Fool\'s Gold' },
  { id: 'chapter-10', title: 'Ice Cream and Creamed Spinach' },
  { id: 'chapter-11', title: 'La Family' },
  { id: 'chapter-12', title: 'My Two Grandmothers' },
  { id: 'chapter-13', title: 'The Day of the Dead' },
  { id: 'chapter-14', title: 'Potions and Amulets' },
  { id: 'chapter-15', title: 'Well Shod' },
  { id: 'chapter-16', title: 'Tragedy' },
  { id: 'chapter-17', title: 'My Uncle Bill' },
  { id: 'chapter-18', title: 'College Days' },
  { id: 'chapter-19', title: 'Fitting In' },
  { id: 'chapter-20', title: 'Prisoner of El Panóptico' },
  { id: 'chapter-21', title: 'Pledge of Allegiance' },
  { id: 'chapter-22', title: 'Underground' },
  { id: 'chapter-23', title: 'Friends Old and Renewed' },
  { id: 'chapter-24', title: 'Scotland in Knots' },
  { id: 'chapter-25', title: 'China Bound' },
  { id: 'chapter-26', title: 'Three More Blessings' },
  { id: 'chapter-27', title: 'Rubes in Cairo' },
  { id: 'chapter-28', title: 'The Fiftieth Anniversary Week' },
  { id: 'chapter-29', title: 'The Turquoise Voyage' },
  { id: 'chapter-30', title: 'Recollections' },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]['id'];

export function useChapterContent(chapterId: string): {
  chapterData: ChapterData | null;
  error: string | null;
} {
  const [rawContent, setRawContent] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setRawContent(null);
    setFetchError(null);
    fetch(`${import.meta.env.BASE_URL}content/chapters/${chapterId}.md`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(setRawContent)
      .catch((e) => setFetchError((e as Error).message));
  }, [chapterId]);

  const parsed = useMemo(() => {
    if (!rawContent) return { chapterData: null, error: null };
    try {
      const data = parseChapter(rawContent, chapterId);
      return { chapterData: data, error: null };
    } catch (e) {
      return { chapterData: null, error: (e as Error).message };
    }
  }, [rawContent, chapterId]);

  const error = fetchError || parsed.error;
  return { chapterData: parsed.chapterData, error };
}
