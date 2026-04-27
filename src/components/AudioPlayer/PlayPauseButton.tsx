interface PlayPauseButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function PlayPauseButton({ isPlaying, onToggle }: PlayPauseButtonProps) {
  return (
    <button
      className="play-pause-button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause' : 'Play'}
      title={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <polygon points="6,4 20,12 6,20" />
        </svg>
      )}
    </button>
  );
}