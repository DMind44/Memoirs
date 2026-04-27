import { useEffect, useMemo, useState } from 'react';
import { parseChapter } from '@/parsers/chapterParser';
import type { ChapterData } from '@/types';

export const CHAPTERS = [
  { id: 'chapter-1', title: 'Editor\'s Note' },
  { id: 'chapter-2', title: 'Early Memories' },
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
    fetch(`/content/chapters/${chapterId}.md`)
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
