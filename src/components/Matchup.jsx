'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { getScoreFromGuess } from '@/services/gameLogic'
import { useStore } from '@/store/guessTheLine'
import { getTime } from '@/services/timeService'
import { MinusIcon, PlusIcon } from './ButtonSvg'

export const Matchup = ({ home, away, points, id, submitGuess, gameTime }) => {
  const [line, setLine] = useState(0.0)
  const { selectedDate, getGuessesForDate } = useStore((state) => ({
    selectedDate: state.selectedDate,
    getGuessesForDate: state.getGuessesForDate
  }))

  const dateGuesses = getGuessesForDate(selectedDate)
  const existingGuess = useMemo(() => {
    return dateGuesses.find((guess) => guess.id === id)
  }, [dateGuesses, id])

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
  }, [line, home, away, actualPoints, isComplete])

  const handleLineInputChange = (e) => {
    const value = parseFloat(e.target.value) || 0
    setLine(value)
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
  if (!home || !away) return null
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
          handleLineInputChange={handleLineInputChange}
          isHome
        />
        <Team
          name={`${away.name}`}
          logo={away.logo}
          line={line}
          result={actualPoints}
          isComplete={isComplete}
          handleLineInputChange={handleLineInputChange}
        />
      </div>
      {!isComplete && (
        <div className='col-span-1 m-auto'>
          <button className='block mb-4' onClick={() => {setLine(line + 0.5)}}>
            <PlusIcon />
          </button>
          <button className='block' onClick={() => {setLine(line - 0.5)}}>
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
          className='text-sm md:text-base col-span-2 gap-x-2 py-1 mx-4 md:mx-2 lg:mx-4 mt-2 bg-orange-500 hover:bg-slate-700 text-white rounded-sm shadow-sm shadow-orange-200 transition-colors duration-200'
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

const Team = ({ name, logo, line, result, isComplete, isHome = false, handleLineInputChange }) => {
  return (
    <>
      <div className='py-2 text-lg'>
        <Image
          src={logo}
          width={32}
          height={32}
          alt={name + ' logo'}
          className='inline-block pr-2'
        />
        <span className='inline-block pr-2'>{name}</span>
        {!isComplete ? (
          <div className='inline-block w-11 px-1 bg-slate-200 shadow-sm shadow-slate-300 float-right text-slate-800 rounded-sm'>
            <input
              type="number"
              step="0.5"
              value={isHome ? line * -1 : line}
              onChange={handleLineInputChange}
              className="w-full bg-transparent text-slate-800 text-center border-none outline-none no-arrows"
            />
          </div>
        ) : (
          <span
            className={`w-11 px-1 my-1 mr-3 bg-slate-200 float-right shadow-sm shadow-slate-300 text-center text-slate-800 rounded-sm`}
          >
            {isHome ? line * -1 : line}
          </span>
        )}
      </div>
    </>
  )
}
