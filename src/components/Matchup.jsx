'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getScoreFromGuess } from '@/services/gameLogic'
import { useStore } from '@/store/guessTheLine'
import { getTime } from '@/services/timeService'
import { MinusIcon, PlusIcon } from './ButtonSvg'

export const Matchup = ({ home, away, points, id, submitGuess, gameTime }) => {
  const [line, setLine] = useState(0.0)
  const [lineDescription, setLineDescription] = useState('Even')
  const [complete, setComplete] = useState(false)
  const [pointsState, setPointsState] = useState(points)
  const finalGuesses = useStore((state) => state.finalGuesses)

  useEffect(() => {
    const guess = finalGuesses.find((guess) => guess.id === id)
    if (!complete && guess) {
      setComplete(true)
      setLine(guess.guess)
      setPointsState(guess.actual)
      updateLineDescription(guess.actual)
    }
  }, [finalGuesses])

  const increaseLine = () => {
    setLine(line + 0.5)
    updateLineDescription(line + 0.5)
  }

  const decreaseLine = () => {
    setLine(line - 0.5)
    updateLineDescription(line - 0.5)
  }

  const submitLine = () => {
    updateLineDescription(pointsState)
    submitGuess(line, pointsState, id, home, away)
  }

  const updateLineDescription = (newLine) => {
    if (newLine > 0) {
      setLineDescription(`${home.name} favored by ${newLine}`)
    } else if (newLine < 0) {
      setLineDescription(`${away.name} favored by ${newLine * -1}`)
    } else {
      setLineDescription('Even')
    }
  }

  let border = ''
  if (complete) {
    border =
      getScoreFromGuess(line, pointsState) > 0
        ? 'border-4 border-green-500'
        : 'border-4 border-red-500'
  }

  return (
    <div
      className={`grid self-center mx-auto grid-cols-8 w-full ${border} shadow-sm shadow-slate-500 my-4 bg-white rounded-lg`}
    >
      <div className={`py-2 pl-4 ${complete ? 'col-span-8' : 'col-span-7'}`}>
        <Team
          name={`${home.name}`}
          logo={home.logo}
          line={line}
          result={pointsState}
          isComplete={complete}
          handleClick={increaseLine}
          isHome
        />
        <Team
          name={`${away.name}`}
          logo={away.logo}
          line={line}
          result={pointsState}
          isComplete={complete}
          handleClick={decreaseLine}
        />
      </div>
      {!complete && (
        <div className='col-span-1 m-auto'>
          <button className='block mb-4' onClick={increaseLine}>
            <PlusIcon />
          </button>
          <button className='block' onClick={decreaseLine}>
            <MinusIcon />
          </button>
        </div>
      )}
      <p className='col-span-6 px-4 p-1 my-1 mt-1 font-medium'>
        {lineDescription}
      </p>
      {!complete && (
        <button
          onClick={submitLine}
          className='col-span-2 p-1 mr-3 mt-2 bg-orange-500 text-white rounded-sm shadow-sm shadow-slate-500'
        >
          Submit
        </button>
      )}
      <p className='col-span-6 mx-4 mb-2 text-xs text-slate-700'>
        {getTime(gameTime) + ' @ ' + home.city}
      </p>
    </div>
  )
}

const Team = ({ name, logo, line, result, isComplete, isHome = false }) => {
  const difference = getScoreFromGuess(line, result)

  return (
    <>
      <p className='py-2 text-lg'>
        <Image
          src={logo}
          width={32}
          height={32}
          alt={name + ' logo'}
          className='inline-block pr-2'
        />
        {name}
        {!isComplete ? (
          <div className=' inline-block w-11 px-1 bg-orange-500 shadow-sm shadow-slate-500 float-right text-right text-white rounded-sm'>
            {isHome ? line * -1 : line}
          </div>
        ) : (
          <span
            className={`w-11 px-1 my-1 mr-3 ${
              difference > 0 ? 'bg-green-500' : 'bg-red-500'
            } float-right shadow-sm shadow-slate-600 text-right text-white rounded-sm`}
          >
            {isHome ? line * -1 : line}
          </span>
        )}
      </p>
    </>
  )
}
