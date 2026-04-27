import { load as yamlLoad } from 'js-yaml';
import { parseTimestamp } from '@/utils/timeUtils';
import type { ChapterData, CommentaryEntry, ImageEntry, CommentaryType } from '@/types';

const VALID_COMMENTARY_TYPES = new Set<string>(['clarification', 'aside', 'addition', 'info']);

/**
 * Parse YAML frontmatter + markdown body from a raw string.
 * Expects the format:
 *   ---
 *   yaml: content
 *   ---
 *   Markdown body here
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith('---')) {
    throw new Error('Content does not start with frontmatter delimiter "---"');
  }

  // Find the closing delimiter
  const closeIndex = trimmed.indexOf('\n---', 3);
  if (closeIndex === -1) {
    throw new Error('Could not find closing frontmatter delimiter "---"');
  }

  const yamlStr = trimmed.slice(3, closeIndex);
  const content = trimmed.slice(closeIndex + 4).trimStart();

  const data = yamlLoad(yamlStr) as Record<string, unknown>;
  return { data, content };
}

const BASE_URL = import.meta.env.BASE_URL;

function prefixPath(path: string): string {
  if (path.startsWith('/')) return `${BASE_URL}${path.slice(1)}`;
  return path;
}

export function parseChapter(rawContent: string, id: string): ChapterData {
  const { data, content } = parseFrontmatter(rawContent);

  if (!data.title) throw new Error(`Chapter ${id}: missing "title"`);
  if (!data.audio) throw new Error(`Chapter ${id}: missing "audio"`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const images: ImageEntry[] = ((data.images || []) as any[]).map((img, i) => ({
    src: prefixPath(String(img.src)),
    timestamp: parseTimestamp(String(img.timestamp)),
    alt: img.alt ? String(img.alt) : `Image ${i + 1}`,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commentary: CommentaryEntry[] = ((data.commentary || []) as any[]).map((c) => {
    const type = String(c.type);
    if (!VALID_COMMENTARY_TYPES.has(type)) {
      throw new Error(`Chapter ${id}: unknown commentary type "${type}"`);
    }
    return {
      timestamp: parseTimestamp(String(c.timestamp)),
      type: type as CommentaryType,
      text: String(c.text),
    };
  });

  images.sort((a, b) => a.timestamp - b.timestamp);
  commentary.sort((a, b) => a.timestamp - b.timestamp);

  return {
    id,
    title: String(data.title),
    audioSrc: prefixPath(String(data.audio)),
    images,
    commentary,
    transcript: content.trim(),
  };
}
