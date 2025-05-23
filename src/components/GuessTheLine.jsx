'use client'
import { useEffect, useState } from 'react'
import Scorecard from './Scorecard'
import { Matchup } from './Matchup'
import PointsBanner from './PointsBanner'
import { getScoreFromGuess } from '@/services/gameLogic'
import { useStore } from '@/store/guessTheLine'
import FinalScorePopup from './FinalScorePopup'
import HelpModal from './HelpModal'

const LoadingSpinner = () => (
  <div className='w-full mt-12' role='status'>
    <svg
      aria-hidden='true'
      className='w-16 h-16 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-orange-500'
      viewBox='0 0 100 101'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
        fill='currentColor'
      />
      <path
        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
        fill='currentFill'
      />
    </svg>
    <span className='sr-only'>Loading...</span>
  </div>
)

export const GuessTheLine = ({ matches }) => {
  const {
    score,
    increaseScore,
    numberOfGuesses,
    addGuess,
    date,
    setDate,
    reset
  } = useStore((state) => ({
    score: state.score,
    increaseScore: state.increaseScore,
    numberOfGuesses: state.numberOfGuesses,
    addGuess: state.addGuess,
    date: state.date,
    setDate: state.setDate,
    reset: state.reset,
    finalGuesses: state.finalGuesses
  }))

  const [bannerOpacity, setBannerOpacity] = useState('0')
  const [bannerScore, setBannerScore] = useState(0)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const toggleHelpModal = () => setShowHelpModal(!showHelpModal)

  const handleReset = () => {
    reset()
    setDate(new Date())
  }
  
  const showBannerTemporarily = (points) => {
    setBannerScore(points)
    setBannerOpacity('100')
    setTimeout(() => setBannerOpacity('0'), 4000)
  }

  const submitGuess = (guess, actual, id, home, away) => {
    addGuess({ guess, actual, id, home, away })
    const points = getScoreFromGuess(guess, actual)
    increaseScore(points)
    showBannerTemporarily(points)
  }

  useEffect(() => {
    const currentDate = new Date()
    if (!date || currentDate.getDate() !== new Date(date).getDate()) {
      handleReset()
      setDate(currentDate)
    }
    setIsLoading(false)
  }, [date, reset, setDate])

  const hasMatches = matches && matches.length > 0

  return (
    <div className='max-w-6xl mx-auto px-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-left mb-1 text-white'>
          Guess the Line
        </h1>
        <span className='flex gap-4'>
        <button
          className='hover:underline font-semibold text-white'
          onClick={toggleHelpModal}
        >
          Help
        </button>
        <button
          className='hover:underline font-semibold text-white'
          onClick={handleReset}
        >
          Reset
        </button>
        </span>
      </div>
      <p className='font-semibold text-sm mb-4 text-white'>
        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <HelpModal showModal={showHelpModal} setShowModal={setShowHelpModal} />
      <FinalScorePopup matchesLength={matches.length} />
      <hr className='mb-4 border-white' />
      
      {hasMatches && (
        <Scorecard
          remainingGuesses={matches.length - numberOfGuesses()}
          score={score}
        />
      )}
      
      {hasMatches && !isLoading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-6'>
          {matches.map((match) => (
            <Matchup
              home={match.home}
              away={match.away}
              points={match.points}
              key={match.id}
              id={match.id}
              gameTime={match.gameTime}
              submitGuess={submitGuess}
            />
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
      
      <PointsBanner opacity={bannerOpacity} points={bannerScore} />
    </div>
  )
}