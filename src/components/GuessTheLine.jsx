'use client'
import { useEffect, useState } from 'react'
import Scorecard from './Scorecard'
import { Matchup } from './Matchup'
import PointsBanner from './PointsBanner'
import { getScoreFromGuess } from '@/services/gameLogic'
import { useStore } from '@/store/guessTheLine'
import FinalScorePopup from './FinalScorePopup'
import HelpModal from './HelpModal'

export const GuessTheLine = ({ matches }) => {
  const [
    score,
    increaseScore,
    numberOfGuesses,
    addGuess,
    date,
    setDate,
    reset
  ] = useStore((state) => [
    state.score,
    state.increaseScore,
    state.numberOfGuesses,
    state.addGuess,
    state.date,
    state.setDate,
    state.reset
  ])

  const [bannerOpacity, setBannerOpacity] = useState('0')
  const [bannerScore, setBannerScore] = useState(0)
  const [showHelpModal, setShowHelpModal] = useState(false)

  const submitGuess = (guess, actual, id, home, away) => {
    addGuess({ guess, actual, id, home, away })
    const points = getScoreFromGuess(guess, actual)
    increaseScore(points)
    setBannerScore(points)
    setBannerOpacity('100')
    setTimeout(() => {
      setBannerOpacity('0')
    }, 4000)
  }

  useEffect(() => {
    const currentDate = new Date()
    // check if date is the same day
    if (!date || currentDate.getDate() !== new Date(date).getDate()) {
      if (date) {
        reset()
      }
      setDate(currentDate)
    }
  }, [])

  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-left mb-1 pl-1'>
          Guess the Lines
        </h1>
        <button
          className='hover:underline'
          onClick={() => setShowHelpModal(!showHelpModal)}
        >
          Help
        </button>
      </div>
      <p className='font-semibold text-sm mb-4 pl-2'>
        {new Date().toDateString()}
      </p>
      <HelpModal showModal={showHelpModal} setShowModal={setShowHelpModal} />
      <FinalScorePopup matchesLength={matches.length} />
      <hr className='mb-4 border-gray-800' />
      {matches.length ? (
        <Scorecard
          remainingGuesses={matches.length - numberOfGuesses()}
          score={score}
        />
      ) : null}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6'>
        {matches.length ? (
          matches.map((match) => {
            return (
              <Matchup
                home={match.home}
                away={match.away}
                points={match.points}
                key={match.id}
                id={match.id}
                gameTime={match.gameTime}
                submitGuess={submitGuess}
              />
            )
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <PointsBanner opacity={bannerOpacity} points={bannerScore} />
      {/* <div className='float-right'>
        <Button
          className='bg-orange-500 text-white text-lg'
          variant='outline'
          onClick={nextDay}
        >
          Next
        </Button>
      </div> */}
    </>
  )
}
