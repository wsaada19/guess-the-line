/**
 * v0 by Vercel.
 * @see https://v0.dev/t/A1oqi2xvApF
 */
'use client'
import { Badge } from '@/components/ui/badge'

export default function Scorecard({ remainingGuesses, score }) {
  return (
    <div className={`mb-2 flex items-center justify-between gap-2 text-white`}>
      <Badge className='items-center text-base border-none' variant='outline'>
        <PuzzleIcon className='h-4.5 w-4.5 -translate-x-1' />
        {remainingGuesses} Remaining Guesses
      </Badge>
      <Badge className='items-center text-base border-none' variant='outline'>
        <GoalIcon className='h-4.5 w-4.5 -translate-x-1 text-xlg' />
        Score: {score}
      </Badge>
    </div>
  )
}

function GoalIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 13V2l8 4-8 4' />
      <path d='M20.55 10.23A9 9 0 1 1 8 4.94' />
      <path d='M8 10a5 5 0 1 0 8.9 2.02' />
    </svg>
  )
}

function PuzzleIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z' />
    </svg>
  )
}
