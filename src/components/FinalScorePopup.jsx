'use client'
import { getScoreFromGuess } from '@/services/gameLogic'
import { useStore } from '@/store/guessTheLine'
import { useState } from 'react'

export default function FinalScorePopup({ matchesLength }) {
  const [score, numberOfGuesses, finalGuesses] = useStore((state) => [
    state.score,
    state.numberOfGuesses,
    state.finalGuesses
  ])

  const [show, setShow] = useState(true)

  const hideModal = () => {
    setShow(false)
  }

  return (
    <div
      className={`${
        numberOfGuesses() !== matchesLength || !show ? 'hidden' : ''
      } fixed z-50 inset-0 bg-gray-900 bg-opacity-80 overflow-y-auto h-full w-full px-4`}
    >
      <div className='p-4 relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md'>
        <div className='flex items-center justify-between p-2 border-b border-gray-400 rounded-t'>
          <h3 className='font-semibold text-xl mb-1'>Game Complete</h3>
          <button
            type='button'
            className='text-gray-500 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
            onClick={hideModal}
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
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
          {finalGuesses.map((guess, index) => {
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
          You scored <span className='font-semibold'>{score}</span> out of{' '}
          <span className='font-semibold'>{matchesLength * 15}</span> possible
          points.
        </p>
      </div>
    </div>
  )
}
