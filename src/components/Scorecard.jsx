'use client'
import { Badge } from '@/components/ui/badge'
import PuzzleIcon from '@/components/ui/PuzzleIcon'
import GoalIcon from '@/components/ui/GoalIcon'

export default function Scorecard({ remainingGuesses, score }) {
  return (
    <div className='flex items-center justify-between gap-2 text-white'>
      <Badge
        className='items-center text-sm border-none text-white'
        variant='outline'
      >
      <GoalIcon className='h-4 w-4 mr-1 text-xlg' />
        {score} points
      </Badge>
      <Badge
        className='items-center text-base border-none text-white'
        variant='outline'
      >
        <PuzzleIcon className='h-4 w-4 ml-1 mr-1' />
                {remainingGuesses} guess{remainingGuesses === 1 ? '' : 'es'}

      </Badge>
    </div>
  )
}

