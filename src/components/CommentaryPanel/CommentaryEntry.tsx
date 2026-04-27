import type { CommentaryEntry as CommentaryEntryType } from '@/types';
import { getCommentaryClass, getCommentaryLabel } from '@/utils/commentaryColors';
import './CommentaryEntry.css';

interface CommentaryEntryProps {
  entry: CommentaryEntryType;
}

export function CommentaryEntry({ entry }: CommentaryEntryProps) {
  const typeClass = getCommentaryClass(entry.type);
  const label = getCommentaryLabel(entry.type);

  return (
    <div className={`commentary-entry ${typeClass}`}>
      <span className="commentary-entry__badge">{label}</span>
      <p className="commentary-entry__text">{entry.text}</p>
    </div>
  );
}