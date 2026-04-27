import type { CommentaryType } from '@/types';

export const COMMENTARY_TYPES: Record<CommentaryType, { label: string; cssClass: string }> = {
  clarification: { label: 'Clarification', cssClass: 'commentary--clarification' },
  aside: { label: 'Aside', cssClass: 'commentary--aside' },
  addition: { label: 'Addition', cssClass: 'commentary--addition' },
  info: { label: 'Information', cssClass: 'commentary--info' }
};

/** How long a commentary entry remains visible after its timestamp (in seconds) */
export const COMMENTARY_ACTIVE_DURATION = 15;

/** Skip forward/backward amount in seconds */
export const SKIP_INTERVAL = 10;
