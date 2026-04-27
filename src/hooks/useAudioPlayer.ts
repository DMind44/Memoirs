import { useCallback, useEffect, useRef, useState } from 'react';
import type { AudioPlayerState } from '@/types';

interface UseAudioPlayerReturn extends AudioPlayerState {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  seek: (seconds: number) => void;
  skipForward: (delta?: number) => void;
  skipBackward: (delta?: number) => void;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const onEnded = () => setIsPlaying(false);
    const onError = () => {
      setError('Failed to load audio');
      setIsLoading(false);
    };
    const onCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(seconds, audio.duration || 0));
    }
  }, []);

  const skipForward = useCallback((delta = 10) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + delta, audio.duration || 0);
    }
  }, []);

  const skipBackward = useCallback((delta = 10) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - delta, 0);
    }
  }, []);

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    error,
    play,
    pause,
    togglePlayPause,
    seek,
    skipForward,
    skipBackward,
  };
}