'use client'
import { getScoreFromGuess } from '@/services/gameLogic'
import { useStore } from '@/store/guessTheLine'

export default function FinalScorePopup({ matchesLength }) {
  const [score, remainingGuesses, finalGuesses] = useStore((state) => [
    state.score,
    state.remainingGuesses,
    state.finalGuesses
  ])

  return (
    <div
      className={`${
        remainingGuesses !== 0 ? 'hidden' : ''
      } fixed z-50 inset-0 bg-gray-900 bg-opacity-80 overflow-y-auto h-full w-full px-4`}
    >
      <div className='p-4 relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md'>
        <p className='text-center font-semibold text-xl mb-1'>Game Complete</p>
        <div className='mt-4'>
          <div className='grid grid-cols-8 mb-2'>
            <p className='col-span-5'></p>
            <p className='text-sm font-semibold'>Guess</p>
            <p className='text-sm font-semibold'>Actual</p>
            <p className='text-sm font-semibold'>Score</p>
          </div>
          {finalGuesses.map((guess, index) => {
            return (
              <div className='grid grid-cols-8' key={index}>
                <p className='col-span-5'>
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
        <p className='mt-2'>
          You scored <span className='font-semibold'>{score}</span> out of{' '}
          <span className='font-semibold'>{matchesLength * 10}</span> possible
          points.
        </p>
      </div>
    </div>
  )
}
