import { useState } from 'react';
import { useChapterContent, CHAPTERS } from '@/hooks/useChapterContent';
import { AppLayout } from '@/components/Layout';
import { ImageViewer } from '@/components/ImageViewer';
import { CommentaryPanel } from '@/components/CommentaryPanel';
import { AudioPlayer } from '@/components/AudioPlayer';
import { TableOfContents } from '@/components/TableOfContents';
import './App.css';

export default function App() {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(CHAPTERS[0].id);
  const [currentTime, setCurrentTime] = useState(0);
  const [tocOpen, setTocOpen] = useState(true);

  const { chapterData, error } = useChapterContent(selectedChapterId);

  const handleSelectChapter = (chapterId: string) => {
    if (chapterId !== selectedChapterId) {
      setSelectedChapterId(chapterId);
      setCurrentTime(0);
    }
  };

  if (error) {
    return <div className="app-error">Error: {error}</div>;
  }

  if (!chapterData) {
    return <div className="app-loading">Loading...</div>;
  }

  return (
    <AppLayout
      title={chapterData.title}
      tableOfContents={
        <TableOfContents
          chapters={CHAPTERS.map((c) => ({ id: c.id, title: c.title }))}
          selectedChapterId={selectedChapterId}
          isOpen={tocOpen}
          onToggle={() => setTocOpen(!tocOpen)}
          onSelectChapter={handleSelectChapter}
        />
      }
      imageViewer={
        <ImageViewer images={chapterData.images} currentTime={currentTime} />
      }
      commentaryPanel={
        <CommentaryPanel commentary={chapterData.commentary} currentTime={currentTime} />
      }
      audioPlayer={
        <AudioPlayer
          audioSrc={chapterData.audioSrc}
          commentary={chapterData.commentary}
          images={chapterData.images}
          onTimeUpdate={setCurrentTime}
        />
      }
    />
  );
}