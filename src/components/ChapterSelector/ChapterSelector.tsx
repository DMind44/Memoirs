import type { ChapterData } from '@/types';
import './ChapterSelector.css';

interface ChapterSelectorProps {
  chapters: Pick<ChapterData, 'id' | 'title'>[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ChapterSelector({ chapters, selectedId, onSelect }: ChapterSelectorProps) {
  if (chapters.length <= 1) return null;

  return (
    <div className="chapter-selector">
      {chapters.map((ch) => (
        <button
          key={ch.id}
          className={`chapter-selector__item ${ch.id === selectedId ? 'chapter-selector__item--active' : ''}`}
          onClick={() => onSelect(ch.id)}
        >
          {ch.title}
        </button>
      ))}
    </div>
  );
}