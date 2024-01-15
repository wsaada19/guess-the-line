import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {
  score: 0,
  remainingGuesses: -1,
  finalGuesses: [],
  date: undefined
}

export const useStore = create(
  persist(
    (set) => ({
      ...initialState,
      addGuess: (matchData) =>
        set((state) => ({ finalGuesses: [...state.finalGuesses, matchData] })),
      increaseScore: (points) =>
        set((state) => ({ score: state.score + points })),
      clearScore: () => set({ score: 0 }),
      setRemainingGuesses: (remainingGuesses) => set({ remainingGuesses }),
      setDate: (date) => set({ date }),
      reset: () => set(initialState)
    }),
    {
      name: 'guess-the-line',
      getStorage: () => createJSONStorage(() => localStorage)
    }
  )
)
