import { create } from 'zustand';
import type { JournalState } from '../types/store.type';

export const useJournalStore = create<JournalState>(set => ({
  entry: null,

  setEntry: (text: string) => {
    const currentDate = new Date();
    set({
      entry: {
        text,
        createdAt: currentDate.toISOString(),
      },
    });
  },

  clearEntry: () => set({ entry: null }),
}));
