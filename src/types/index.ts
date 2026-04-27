export type CommentaryType = 'clarification' | 'aside' | 'addition' | 'info';

export interface ImageEntry {
  src: string;
  timestamp: number;
  alt: string;
}

export interface CommentaryEntry {
  timestamp: number;
  type: CommentaryType;
  text: string;
}

export interface ChapterData {
  id: string;
  title: string;
  audioSrc: string;
  images: ImageEntry[];
  commentary: CommentaryEntry[];
  transcript: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  error: string | null;
}
