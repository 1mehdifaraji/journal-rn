import type { JournalEntry } from './components.type';

export interface JournalState {
  entry: JournalEntry | null;
  setEntry: (text: string) => void;
  clearEntry: () => void;
}
