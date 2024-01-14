'use client'
import { useState } from 'react'
import Image from 'next/image'
import { getScoreFromGuess } from '@/services/gameLogic'

export const Matchup = ({ home, away, points, id, submitGuess }) => {
  const [line, setLine] = useState(0.0)
  const [lineDescription, setLineDescription] = useState('Even')
  const [complete, setComplete] = useState(false)

  const increaseLine = () => {
    setLine(line + 0.5)
    updateLineDescription(line + 0.5)
  }

  const decreaseLine = () => {
    setLine(line - 0.5)
    updateLineDescription(line - 0.5)
  }

  const submitLine = () => {
    setComplete(true)
    updateLineDescription(points)
    submitGuess(line, points, id)
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
      getScoreFromGuess(line, points) > 0
        ? 'border-4 border-green-500'
        : 'border-4 border-red-500'
  }

  return (
    <div
      className={`grid grid-cols-8 w-96 ${border} shadow-lg my-4 bg-white rounded-lg`}
    >
      <div
        className={`my-1 py-2 pl-4 ${complete ? 'col-span-8' : 'col-span-7'}`}
      >
        <Team
          name={`${home.city} ${home.name}`}
          logo={home.logo}
          line={line}
          result={points}
          isComplete={complete}
          handleClick={increaseLine}
          isHome
        />
        <Team
          name={`${away.city} ${away.name}`}
          logo={away.logo}
          line={line}
          result={points}
          isComplete={complete}
          handleClick={decreaseLine}
        />
      </div>
      {!complete && (
        <div className='col-span-1 m-auto'>
          <button className='block mb-6' onClick={increaseLine}>
            <Image
              src='plus.svg'
              width={24}
              height={24}
              alt='Increase line'
              className='inline-block'
            />
          </button>
          <button className='block' onClick={decreaseLine}>
            <Image
              src='minus.svg'
              width={24}
              height={24}
              alt='Increase line'
              className='inline-block'
            />
          </button>
        </div>
      )}
      <p className='col-span-6 px-4 p-1 m-1 font-semibold'>{lineDescription}</p>
      {!complete && (
        <button
          onClick={submitLine}
          className='col-span-2 p-1 mr-3 mb-3 bg-orange-500 text-white rounded-sm'
        >
          Submit
        </button>
      )}
    </div>
  )
}

const Team = ({ name, logo, line, result, isComplete, isHome = false }) => {
  const difference = getScoreFromGuess(line, result)

  return (
    <>
      <p className='py-2 text-base'>
        <Image
          src={logo}
          width={32}
          height={32}
          alt={name + ' logo'}
          className='inline-block'
        />
        {name}
        {!isComplete ? (
          <span className='w-11 px-1 my-1 bg-orange-500 float-right text-right text-white rounded-sm'>
            {isHome ? line * -1 : line}
          </span>
        ) : (
          <span
            className={`w-11 px-1 my-1 mr-3 ${
              difference > 0 ? 'bg-green-500' : 'bg-red-500'
            } float-right text-right text-white rounded-sm`}
          >
            {isHome ? line * -1 : line}
          </span>
        )}
      </p>
    </>
  )
}
