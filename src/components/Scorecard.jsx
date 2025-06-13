'use client'
import { Badge } from '@/components/ui/Badge'
import PuzzleIcon from '@/components/ui/PuzzleIcon'
import GoalIcon from '@/components/ui/GoalIcon'

export default function Scorecard({ remainingGuesses, score }) {
  return (
    <div className='mb-4 md:mb-0 flex items-center justify-between gap-2 text-white bg-blue-200/30 rounded-lg px-4 py-2'>
      <Badge
        className='items-center text-base border-none text-white'
        variant='outline'
      >
        <PuzzleIcon className='h-4.5 w-4.5 -translate-x-1 mr-1' />
        {remainingGuesses} Guess{remainingGuesses === 1 ? '' : 'es'} Remaining
      </Badge>
      <Badge
        className='items-center text-base border-none text-white'
        variant='outline'
      >
        {score} points
        <GoalIcon className='h-4.5 w-4.5 translate-x-1 text-xlg' />
      </Badge>
    </div>
  )
}

