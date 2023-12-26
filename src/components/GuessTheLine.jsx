'use client'
import { useState } from 'react'
import Scorecard from './Scorecard'
import { Matchup } from './Matchup'
import PointsBanner from './PointsBanner'
import { getScoreFromGuess } from '@/services/gameLogic'

export const GuessTheLine = ({ matches }) => {
  const [remainingGuesses, setRemainingGuesses] = useState(matches.length)
  const [score, setScore] = useState(0)
  const [bannerOpacity, setBannerOpacity] = useState('0')
  const [bannerScore, setBannerScore] = useState(0)

  const submitGuess = (guess, actual) => {
    setRemainingGuesses(remainingGuesses - 1)
    const points = getScoreFromGuess(guess, actual)
    setScore(score + points)
    setBannerScore(points)
    setBannerOpacity('100')
    setTimeout(() => {
      setBannerOpacity('0')
    }, 4000)
  }

  return (
    <>
      <PointsBanner opacity={bannerOpacity} points={bannerScore} />
      <Scorecard remainingGuesses={remainingGuesses} score={score} />
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6'>
        {matches.length ? (
          matches.map((match) => {
            return (
              <Matchup
                home={match.home}
                away={match.away}
                points={match.points}
                key={match.id}
                submitGuess={submitGuess}
              />
            )
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  )
}
