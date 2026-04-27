import type { CommentaryType } from '@/types';
import './TimelineMarker.css';

interface TimelineMarkerProps {
  position: number; // 0-1 ratio
  type: CommentaryType | 'image';
  text: string;
  onSeek: (seconds: number) => void;
  duration: number;
}

export function TimelineMarker({ position, type, text, onSeek, duration }: TimelineMarkerProps) {
  const markerClass = type === 'image' ? 'timeline-marker--image' : `timeline-marker--${type}`;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSeek(position * duration);
  };

  return (
    <div
      className={`timeline-marker ${markerClass}`}
      style={{ left: `${position * 100}%` }}
      onClick={handleClick}
      title={text}
    >
      <div className="timeline-marker__dot" />
      <div className="timeline-marker__preview">
        <span className="timeline-marker__preview-type">
          {type === 'image' ? 'Image' : type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        <span className="timeline-marker__preview-text">{text}</span>
      </div>
    </div>
  );
}