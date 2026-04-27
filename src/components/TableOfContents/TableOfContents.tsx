import './TableOfContents.css';

interface ChapterSummary {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  chapters: ChapterSummary[];
  selectedChapterId: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelectChapter: (chapterId: string) => void;
}

export function TableOfContents({
  chapters,
  selectedChapterId,
  isOpen,
  onToggle,
  onSelectChapter,
}: TableOfContentsProps) {
  return (
    <aside className={`toc ${isOpen ? 'toc--open' : 'toc--closed'}`}>
      <button
        className="toc__toggle"
        onClick={onToggle}
        aria-label={isOpen ? 'Close table of contents' : 'Open table of contents'}
        title={isOpen ? 'Close' : 'Open'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="toc__content">
          <h2 className="toc__heading">Chapters</h2>
          <nav className="toc__list">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                className={`toc__item ${
                  chapter.id === selectedChapterId ? 'toc__item--active' : ''
                }`}
                onClick={() => onSelectChapter(chapter.id)}
              >
                <span className="toc__item-title">{chapter.title}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </aside>
  );
}