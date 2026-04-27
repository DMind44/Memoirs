import type { CommentaryType } from '@/types';
import { COMMENTARY_TYPES } from '@/constants';

/**
 * Get the CSS class name for a commentary type.
 */
export function getCommentaryClass(type: CommentaryType): string {
  return COMMENTARY_TYPES[type].cssClass;
}

/**
 * Get the display label for a commentary type.
 */
export function getCommentaryLabel(type: CommentaryType): string {
  return COMMENTARY_TYPES[type].label;
}