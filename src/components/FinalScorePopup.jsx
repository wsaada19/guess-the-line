'use client'
import { getScoreFromGuess } from '@/services/gameLogic'
import { useStore } from '@/store/guessTheLine'
import Close from './ui/Close'

export default function FinalScorePopup({ matchesLength }) {
  const { 
    getCurrentScore, 
    numberOfGuesses, 
    selectedDate, 
    getGuessesForDate,
    showFinalScorePopup,
    hideFinalScorePopup
  } = useStore((state) => ({
    getCurrentScore: state.getCurrentScore,
    numberOfGuesses: state.numberOfGuesses,
    selectedDate: state.selectedDate,
    getGuessesForDate: state.getGuessesForDate,
    showFinalScorePopup: state.showFinalScorePopup,
    hideFinalScorePopup: state.hideFinalScorePopup
  }))

  const dateGuesses = getGuessesForDate(selectedDate)
  const currentScore = getCurrentScore()

  if (numberOfGuesses() < 1) {
    return null
  }

  return (
    <div
      className={`${
        !showFinalScorePopup ? 'hidden' : ''
      } fixed z-50 inset-0 bg-gray-900 bg-opacity-80 overflow-y-auto h-full w-full px-4`}
    >
      <div className='p-4 relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md'>
        <div className='flex items-center justify-between p-2 border-b border-gray-400 rounded-t'>
          <h3 className='font-semibold text-xl mb-1'>Scorecard</h3>
          <button
            type='button'
            className='text-gray-500 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
            onClick={hideFinalScorePopup}
          >
            <Close/>
            <span className='sr-only'>Close modal</span>
          </button>
        </div>
        <div className='mt-4'>
          <div className='grid grid-cols-7 mb-2'>
            <p className='col-span-4'></p>
            <p className='text-sm font-semibold'>Guess</p>
            <p className='text-sm font-semibold'>Actual</p>
            <p className='text-sm font-semibold'>Score</p>
          </div>
          {dateGuesses.map((guess, index) => {
            return (
              <div className='grid grid-cols-7 mb-1' key={index}>
                <p className='col-span-4'>
                  {guess.home.name} vs. {guess.away.name}
                </p>
                <p className='text-sm mx-auto'>{guess.guess}</p>
                <p className='text-sm float-right mx-auto'>{guess.actual}</p>
                <p className='text-sm float-right mx-auto'>
                  {getScoreFromGuess(guess.guess, guess.actual)}
                </p>
              </div>
            )
          })}
        </div>
        <p className='mt-3'>
          <span className='font-semibold'>{currentScore}</span> out of{' '}
          <span className='font-semibold'>{matchesLength * 10}</span> possible
          points.
        </p>
      </div>
    </div>
  )
}
