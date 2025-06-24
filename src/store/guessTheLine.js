import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getScoreFromGuess } from '@/services/gameLogic'
import { matchesSelectedSport } from '@/lib/utils'

const getTodayString = () => {
  const today = new Date()
  // Create a new date object to avoid timezone issues
  const localToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  )
  return localToday.toISOString().split('T')[0]
}

// Only keep today's data
const cleanupOldData = (guessesByDate, gamesByDate) => {
  const today = getTodayString()
  const cleanedGuesses = new Map()
  const cleanedGames = new Map()
  
  if (guessesByDate.has(today)) {
    cleanedGuesses.set(today, guessesByDate.get(today))
  }
  if (gamesByDate.has(today)) {
    cleanedGames.set(today, gamesByDate.get(today))
  }
  
  return { cleanedGuesses, cleanedGames }
}

const initialState = {
  guessesByDate: new Map(), // Map of date strings to guesses
  date: undefined,
  selectedSport: 'wnba',
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
        const filteredGuesses = dateGuesses.filter((guess) => 
          matchesSelectedSport(guess, state.selectedSport)
        );
        const newGuesses = [...filteredGuesses, matchData];
        
        set((state) => ({
          guessesByDate: new Map(state.guessesByDate).set(
            state.selectedDate,
            newGuesses
          )
        }));

        // Check if game is complete after adding guess
        const updatedState = get();
        const currentGames = updatedState.gamesByDate.get(updatedState.selectedDate) || [];
        const filteredGames = currentGames.filter((match) => 
          matchesSelectedSport(match, updatedState.selectedSport)
        );
        
        if (newGuesses.length === filteredGames.length && newGuesses.length > 0) {
          set({ showFinalScorePopup: true });
        }
      },
      getScoreForDate: (dateString) => {
        const state = get();
        const dateGuesses = state.guessesByDate.get(dateString) || [];
        return dateGuesses.filter((guess) => 
          matchesSelectedSport(guess, state.selectedSport)
        ).reduce((total, guess) => {
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
        return state.guessesByDate.get(dateString)?.filter((guess) => 
          matchesSelectedSport(guess, state.selectedSport)
        ) || [];
      },
      getGuessesForMatches: (matchIds) => {
        const state = get();
        const dateGuesses = state.guessesByDate.get(state.selectedDate) || [];
        return dateGuesses.filter((guess) => 
          matchesSelectedSport(guess, state.selectedSport)
        ).filter(guess => matchIds.includes(guess.id));
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
      setShowFinalScorePopup: () => set({ showFinalScorePopup: true }),
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
          
          // Clean up old data and reset to today
          const { cleanedGuesses, cleanedGames } = cleanupOldData(
            state.guessesByDate, 
            state.gamesByDate
          )
          
          state.guessesByDate = cleanedGuesses
          state.gamesByDate = cleanedGames
          state.selectedDate = getTodayString()
          state.showFinalScorePopup = false
        }
      }
    }
  )
)
