import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {
  score: 0,
  finalGuesses: [],
  date: undefined,
  selectedSport: 'both' // 'both', 'nba', or 'wnba'
}

export const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      addGuess: (matchData) =>
        set((state) => ({ finalGuesses: [...state.finalGuesses, matchData] })),
      updateScore: (points) =>
        set((state) => ({ score: state.score + points })),
      clearScore: () => set({ score: 0 }),
      numberOfGuesses: () => get().finalGuesses.length,
      setDate: (date) => set({ date }),
      setSelectedSport: (sport) => set({ selectedSport: sport }),
      reset: () => set(initialState)
    }),
    {
      name: 'guess-the-line',
      getStorage: () => createJSONStorage(() => localStorage)
    }
  )
)
