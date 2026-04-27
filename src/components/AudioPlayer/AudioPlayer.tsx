import { useEffect, useRef } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { formatTime } from '@/utils/timeUtils';
import { SKIP_INTERVAL } from '@/constants';
import { PlayPauseButton } from './PlayPauseButton';
import { Timeline } from './Timeline';
import type { CommentaryEntry, ImageEntry } from '@/types';
import './AudioPlayer.css';

interface AudioPlayerProps {
  audioSrc: string;
  commentary: CommentaryEntry[];
  images: ImageEntry[];
  onTimeUpdate: (currentTime: number) => void;
}

export function AudioPlayer({ audioSrc, commentary, images, onTimeUpdate }: AudioPlayerProps) {
  const player = useAudioPlayer();
  const lastReportedTime = useRef(0);

  useEffect(() => {
    const delta = Math.abs(player.currentTime - lastReportedTime.current);
    if (delta > 0.2) {
      lastReportedTime.current = player.currentTime;
      onTimeUpdate(player.currentTime);
    }
  }, [player.currentTime, onTimeUpdate]);

  return (
    <div className="audio-player">
      <audio ref={player.audioRef} src={audioSrc} preload="metadata" />

      <PlayPauseButton isPlaying={player.isPlaying} onToggle={player.togglePlayPause} />

      <button
        className="audio-player__skip"
        onClick={() => player.skipBackward(SKIP_INTERVAL)}
        aria-label="Skip back 10 seconds"
        title="Back 10s"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2-.67C21.08 11.68 17.15 8 12.5 8z" transform="scale(-1,1) translate(-24,0)" />
        </svg>
      </button>

      <Timeline
        currentTime={player.currentTime}
        duration={player.duration}
        commentary={commentary}
        images={images}
        onSeek={player.seek}
      />

      <button
        className="audio-player__skip"
        onClick={() => player.skipForward(SKIP_INTERVAL)}
        aria-label="Skip forward 10 seconds"
        title="Forward 10s"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M11.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2-.67C20.08 11.68 16.15 8 11.5 8z" />
        </svg>
      </button>

      <span className="audio-player__time">
        {formatTime(player.currentTime)} / {formatTime(player.duration)}
      </span>

      {player.error && <span className="audio-player__error">{player.error}</span>}
    </div>
  );
}