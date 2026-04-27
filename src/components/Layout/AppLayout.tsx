import type { ReactNode } from 'react';
import './AppLayout.css';

interface AppLayoutProps {
  tableOfContents: ReactNode;
  imageViewer: ReactNode;
  commentaryPanel: ReactNode;
  audioPlayer: ReactNode;
  title: string;
}

export function AppLayout({ tableOfContents, imageViewer, commentaryPanel, audioPlayer, title }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <div className="app-layout__sidebar">
        {tableOfContents}
      </div>
      <div className="app-layout__body">
        <header className="app-layout__header">
          <h1 className="app-layout__title">{title}</h1>
        </header>
        <main className="app-layout__main">
          <div className="app-layout__image">{imageViewer}</div>
          <div className="app-layout__commentary">{commentaryPanel}</div>
        </main>
        <footer className="app-layout__player">{audioPlayer}</footer>
      </div>
    </div>
  );
}