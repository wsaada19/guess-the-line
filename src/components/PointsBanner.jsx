export default function PointsBanner({ points, opacity }) {
  const earnedPoints = points > 0
  return (
    <div
      className={`absolute inset-x-0 bottom-0 m-10 flex items-center justify-center ${
        earnedPoints ? 'bg-orange-500' : 'bg-red-500'
      } text-white text-sm font-bold px-4 py-3 transition-opacity duration-500 ease-in-out rounded-md`}
      style={{ opacity: opacity }}
      role='alert'
    >
      {earnedPoints && <TrophyIcon className='w-4 h-4 mr-2' />}
      <p className='text-lg font-semibold'>
        {earnedPoints
          ? `Great guess! You earned ${points} points from your guess.`
          : `Sorry, you didn't earn any points from your guess.`}
      </p>
    </div>
  )
}

function TrophyIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6' />
      <path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18' />
      <path d='M4 22h16' />
      <path d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' />
      <path d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' />
      <path d='M18 2H6v7a6 6 0 0 0 12 0V2Z' />
    </svg>
  )
}
