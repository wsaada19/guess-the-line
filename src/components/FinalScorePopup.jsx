'use client'
import { useStore } from '@/store/guessTheLine'

export default function FinalScorePopup({ matchesLength }) {
  const [score, remainingGuesses] = useStore((state) => [
    state.score,
    state.remainingGuesses
  ])
  return (
    <div
      className={`${
        remainingGuesses !== 0 ? 'hidden' : ''
      } fixed z-50 inset-0 bg-gray-900 bg-opacity-80 overflow-y-auto h-full w-full px-4`}
    >
      <div className='p-3 relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md'>
        <p className='text-center font-semibold text-lg mb-2'>Game Complete</p>
        <p className='text-center'>
          You scored {score} out of {matchesLength * 10} possible points!
        </p>
      </div>
    </div>
  )
}
