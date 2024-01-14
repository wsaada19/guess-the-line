'use client'
import { useEffect, useState } from 'react'
import Scorecard from './Scorecard'
import { Matchup } from './Matchup'
import PointsBanner from './PointsBanner'
import { getScoreFromGuess } from '@/services/gameLogic'
import { useStore } from '@/store/guessTheLine'
import FinalScorePopup from './FinalScorePopup'

export const GuessTheLine = ({ matches }) => {
  const [
    score,
    increaseScore,
    remainingGuesses,
    setRemainingGuesses,
    addGuess
  ] = useStore((state) => [
    state.score,
    state.increaseScore,
    state.remainingGuesses,
    state.setRemainingGuesses,
    state.addGuess
  ])
  const [bannerOpacity, setBannerOpacity] = useState('0')
  const [bannerScore, setBannerScore] = useState(0)

  const submitGuess = (guess, actual, id) => {
    setRemainingGuesses(remainingGuesses - 1)
    addGuess({ guess, actual, id })
    const points = getScoreFromGuess(guess, actual)
    increaseScore(points)
    setBannerScore(points)
    setBannerOpacity('100')
    setTimeout(() => {
      setBannerOpacity('0')
    }, 4000)
  }

  useEffect(() => {
    setRemainingGuesses(matches.length)
  }, [])

  return (
    <>
      <p className='font-semibold text-sm mb-6 pl-2'>
        {new Date().toDateString()}
      </p>
      <FinalScorePopup matchesLength={matches.length} />
      {matches.length && remainingGuesses >= 0 ? (
        <Scorecard remainingGuesses={remainingGuesses} score={score} />
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
