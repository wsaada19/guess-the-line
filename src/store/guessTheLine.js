import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getScoreFromGuess } from '@/services/gameLogic'

const getTodayString = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

const initialState = {
  guessesByDate: new Map(), // Map of date strings to guesses
  date: undefined,
  selectedSport: 'both', // 'both', 'nba', or 'wnba'
  gamesByDate: new Map(), // Map of date strings to games
  selectedDate: getTodayString(), // Default to today
  showFinalScorePopup: false
}

export const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      addGuess: (matchData) => {
        const state = get();
        const dateGuesses = state.guessesByDate.get(state.selectedDate) || [];
        const newGuesses = [...dateGuesses, matchData];
        
        set((state) => ({
          guessesByDate: new Map(state.guessesByDate).set(
            state.selectedDate,
            newGuesses
          )
        }));

        // Check if game is complete after adding guess
        const updatedState = get();
        const currentGames = updatedState.gamesByDate.get(updatedState.selectedDate) || [];
        const filteredGames = currentGames.filter((match) => {
          if (!match) return false;
          if (updatedState.selectedSport === "both") return true;
          const isWNBA = match?.home?.isWNBA || match?.away?.isWNBA;
          return updatedState.selectedSport === "wnba" ? isWNBA : !isWNBA;
        });
        
        if (newGuesses.length === filteredGames.length && newGuesses.length > 0) {
          set({ showFinalScorePopup: true });
        }
      },
      getScoreForDate: (dateString) => {
        const state = get();
        const dateGuesses = state.guessesByDate.get(dateString) || [];
        return dateGuesses.reduce((total, guess) => {
          return total + getScoreFromGuess(guess.guess, guess.actual);
        }, 0);
      },
      getCurrentScore: () => {
        const state = get();
        return state.getScoreForDate(state.selectedDate);
      },
      numberOfGuesses: () => {
        const state = get();
        const dateGuesses = state.guessesByDate.get(state.selectedDate) || [];
        return dateGuesses.length;
      },
      getGuessesForDate: (dateString) => {
        const state = get();
        return state.guessesByDate.get(dateString) || [];
      },
      getGuessesForMatches: (matchIds) => {
        const state = get();
        const dateGuesses = state.guessesByDate.get(state.selectedDate) || [];
        return dateGuesses.filter(guess => matchIds.includes(guess.id));
      },
      numberOfGuessesForMatches: (matchIds) => {
        const state = get();
        const dateGuesses = state.guessesByDate.get(state.selectedDate) || [];
        return dateGuesses.filter(guess => matchIds.includes(guess.id)).length;
      },
      setDate: (date) => set({ date }),
      setSelectedSport: (sport) => set({ selectedSport: sport }),
      setSelectedDate: (dateString) => {
        // console.log('Setting selectedDate to:', dateString);
        set({ selectedDate: dateString });
      },
      setGamesByDate: (games) => set({ gamesByDate: games }),
      getGamesForSelectedDate: () => {
        const state = get();
        // console.log('Getting games for date:', state.selectedDate);
        // console.log('Available dates:', Array.from(state.gamesByDate.keys()));
        return state.gamesByDate.get(state.selectedDate) || [];
      },
      resetGuessesForCurrentDate: () => {
        const state = get();
        const newGuessesByDate = new Map(state.guessesByDate);
        newGuessesByDate.delete(state.selectedDate);
        set({ 
          guessesByDate: newGuessesByDate,
          showFinalScorePopup: false
        });
      },
      reset: () => set(initialState),
      showFinalScorePopup: () => set({ showFinalScorePopup: true }),
      hideFinalScorePopup: () => set({ showFinalScorePopup: false })
    }),
    {
      name: 'guess-the-line',
      getStorage: () => createJSONStorage(() => localStorage),
      partialize: (state) => ({
        ...state,
        gamesByDate: Array.from(state.gamesByDate.entries()),
        guessesByDate: Array.from(state.guessesByDate.entries())
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.gamesByDate = new Map(state.gamesByDate);
          state.guessesByDate = new Map(state.guessesByDate);
          // Ensure selectedDate is set if it's undefined after rehydration
          if (!state.selectedDate) {
            state.selectedDate = getTodayString();
          }
        }
      }
    }
  )
)
