export type Section = 'intro' | 'memory-space' | 'qualities' | 'family-tree' | 'living-card' | 'photo-story' | 'secret-game' | 'final-moment' | 'grand-finale';

export interface BirthdayState {
  section: Section;
  isMusicPlaying: boolean;
  friendName: string;
}
