import { create } from 'zustand'

export const useStore = create((set) => ({
  score: 0,
  remainingGuesses: -1,
  finalGuesses: [],
  addGuess: (matchData) =>
    set((state) => ({ finalGuesses: [...state.finalGuesses, matchData] })),
  increaseScore: (points) => set((state) => ({ score: state.score + points })),
  clearScore: () => set({ score: 0 }),
  setRemainingGuesses: (remainingGuesses) => set({ remainingGuesses })
}))
