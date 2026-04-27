import { useCallback, useEffect, useRef, useState } from 'react';
import type { CommentaryEntry, ImageEntry } from '@/types';
import { TimelineMarker } from './TimelineMarker';
import './Timeline.css';

interface TimelineProps {
  currentTime: number;
  duration: number;
  commentary: CommentaryEntry[];
  images: ImageEntry[];
  onSeek: (seconds: number) => void;
}

export function Timeline({ currentTime, duration, commentary, images, onSeek }: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const isDraggingRef = useRef(false);

  const progress = duration > 0 ? (isDragging ? dragTime : currentTime) / duration : 0;

  const getTimeFromMouseEvent = useCallback(
    (e: MouseEvent): number => {
      if (!trackRef.current || duration === 0) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      return fraction * duration;
    },
    [duration]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const time = getTimeFromMouseEvent(e);
      setDragTime(time);
    };

    const handleMouseUp = (e: MouseEvent) => {
      const time = getTimeFromMouseEvent(e);
      onSeek(time);
      setIsDragging(false);
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, getTimeFromMouseEvent, onSeek]);

  const handleTrackMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      isDraggingRef.current = true;
      const time = getTimeFromMouseEvent(e.nativeEvent);
      setDragTime(time);
      onSeek(time);
    },
    [getTimeFromMouseEvent, onSeek]
  );

  const markers = duration > 0
    ? [
        ...commentary.map((c) => (
          <TimelineMarker
            key={`c-${c.timestamp}`}
            position={c.timestamp / duration}
            type={c.type}
            text={c.text}
            onSeek={onSeek}
            duration={duration}
          />
        )),
        ...images.map((img) => (
          <TimelineMarker
            key={`i-${img.timestamp}`}
            position={img.timestamp / duration}
            type="image"
            text={img.alt}
            onSeek={onSeek}
            duration={duration}
          />
        )),
      ]
    : [];

  return (
    <div className="timeline" ref={trackRef} onMouseDown={handleTrackMouseDown}>
      <div className="timeline__track">
        <div className="timeline__progress" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="timeline__markers">{markers}</div>
      <div className="timeline__scrubber" style={{ left: `${progress * 100}%` }} />
    </div>
  );
}