import { useMemo } from 'react';
import type { CommentaryEntry as CommentaryEntryType } from '@/types';
import { COMMENTARY_ACTIVE_DURATION } from '@/constants';
import { CommentaryEntry } from './CommentaryEntry';
import './CommentaryPanel.css';

interface CommentaryPanelProps {
  commentary: CommentaryEntryType[];
  currentTime: number;
}

export function CommentaryPanel({ commentary, currentTime }: CommentaryPanelProps) {
  const activeEntries = useMemo(() => {
    return commentary.filter((entry) => {
      return currentTime >= entry.timestamp && currentTime < entry.timestamp + COMMENTARY_ACTIVE_DURATION;
    });
  }, [commentary, currentTime]);

  return (
    <div className="commentary-panel">
      <h3 className="commentary-panel__heading">Commentary</h3>
      {activeEntries.length === 0 ? (
        <p className="commentary-panel__empty">No active commentary at this point</p>
      ) : (
        <div className="commentary-panel__entries">
          {activeEntries.map((entry, i) => (
            <CommentaryEntry key={`${entry.timestamp}-${entry.type}-${i}`} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}