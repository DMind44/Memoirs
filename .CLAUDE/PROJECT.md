# Narrated Book Player — Project Details

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Plain CSS with CSS custom properties
- **Content format:** YAML frontmatter + Markdown (parsed with js-yaml)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build (runs tsc + vite build)
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## Architecture

### Content Pipeline
1. Chapter content lives in `public/content/chapters/*.md` as YAML+MD files
2. `useChapterContent` hook fetches the .md file at runtime and parses it with `chapterParser.ts`
3. Parser uses `js-yaml` to extract YAML frontmatter and MD body (custom frontmatter splitter, no gray-matter dependency)
4. Timestamps in `mm:ss` format are converted to seconds
5. Result is a typed `ChapterData` object consumed by all components

### Component Tree
```
App → AppLayout
  ├── TableOfContents (collapsible sidebar, chapter navigation)
  ├── ImageViewer (image synced to audio time)
  ├── CommentaryPanel → CommentaryEntry[] (filtered by active time window)
  └── AudioPlayer
      ├── PlayPauseButton
      ├── Timeline → TimelineMarker[] (color-coded with hover previews)
      └── Skip buttons + time display
```

### Layout
- Desktop: sidebar (TOC, 240px open / 48px collapsed) + main content area (image + commentary) + sticky audio player
- Mobile: TOC slides in as overlay from left, main content stacks vertically
- The app fills the viewport height (`100vh`) with no page-level scrolling

### Key Hooks
- `useAudioPlayer` — manages `<audio>` element, provides play/pause/seek/time state
- `useChapterContent` — fetches and parses chapter YAML+MD files

### Chapter Switching
- Clicking a chapter in the TOC calls `onSelectChapter(chapterId)`
- App updates `selectedChapterId` and resets `currentTime` to 0
- The AudioPlayer receives the new `audioSrc` and loads the new audio
- Image viewer and commentary panel update based on the new chapter's data

### Commentary Types
| Type | Color | CSS Variable |
|------|-------|-------------|
| clarification | Blue (#3b82f6) | --color-clarification |
| aside | Green (#22c55e) | --color-aside |
| addition | Orange (#f97316) | --color-addition |

### Content File Format
```yaml
---
title: Chapter Title
audio: /content/audio/chapter1.mp3
images:
  - src: /content/images/scene.jpg
    timestamp: 00:00
    alt: "Description"
commentary:
  - timestamp: 00:15
    type: clarification  # or: aside, addition
    text: "Commentary text"
---
Transcript text...
```

## Adding New Chapters
1. Create `public/content/chapters/chapter-N.md` with YAML+MD format
2. Add audio to `public/content/audio/`
3. Add images to `public/content/images/`
4. Add chapter entry to `CHAPTERS` array in `src/hooks/useChapterContent.ts`