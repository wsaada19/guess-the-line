'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { getScoreFromGuess } from '@/services/gameLogic'
import { useStore } from '@/store/guessTheLine'
import { getTime } from '@/services/timeService'
import { MinusIcon, PlusIcon } from './ButtonSvg'

export const Matchup = ({ home, away, points, id, submitGuess, gameTime }) => {
  const [line, setLine] = useState(0.0)
  const { finalGuesses } = useStore((state) => state)

  const existingGuess = useMemo(() => {
    return finalGuesses.find((guess) => guess.id === id)
  }, [finalGuesses, id])


  const isComplete = Boolean(existingGuess)
  const actualPoints = existingGuess?.actual || points

  const lineDescription = useMemo(() => {
    let value = isComplete ? actualPoints : line
    if(value > 0) {
      return `${home.name} favored by ${value}`
    } else if (value < 0) {
      return `${away.name} favored by ${value * -1}`
    } else {
      return 'Even'
    }
  }, [line, home.name, away.name, actualPoints, isComplete])

  const increaseLine = () => {
    setLine(line + 0.5)
  }

  const decreaseLine = () => {
    setLine(line - 0.5)
  }

  const submitLine = () => {
    submitGuess(line, actualPoints, id, home, away)
  }


  let border = ''
  if (isComplete) {
    border =
      getScoreFromGuess(line, actualPoints) > 0
        ? 'border-4 border-green-500'
        : 'border-4 border-red-500'
  }

  return (
    <div
      className={`grid self-center mx-auto grid-cols-8 w-full ${border} shadow-sm shadow-slate-500 my-4 bg-white rounded-lg`}
    >
      <div className={`py-2 pl-4 ${isComplete ? 'col-span-8' : 'col-span-7'}`}>
        <Team
          name={`${home.name}`}
          logo={home.logo}
          line={line}
          result={actualPoints}
          isComplete={isComplete}
          handleClick={increaseLine}
          isHome
        />
        <Team
          name={`${away.name}`}
          logo={away.logo}
          line={line}
          result={actualPoints}
          isComplete={isComplete}
          handleClick={decreaseLine}
        />
      </div>
      {!isComplete && (
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
      {!isComplete && (
        <button
          onClick={submitLine}
          className='col-span-2 gap-x-2 py-1 mx-4 md:mx-2 lg:mx-4 mt-2 bg-orange-500 text-white rounded-sm shadow-sm shadow-slate-500'
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
