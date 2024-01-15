import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      score: 0,
      remainingGuesses: -1,
      finalGuesses: [],
      addGuess: (matchData) =>
        set((state) => ({ finalGuesses: [...state.finalGuesses, matchData] })),
      increaseScore: (points) =>
        set((state) => ({ score: state.score + points })),
      clearScore: () => set({ score: 0 }),
      setRemainingGuesses: (remainingGuesses) => set({ remainingGuesses })
    }),
    {
      name: 'guess-the-line',
      getStorage: () => createJSONStorage(() => localStorage)
    }
  )
)
