'use client'

const getNextDay = (daysToAdd) => {
  const date = new Date()
  date.setDate(date.getDate() + daysToAdd)
  return date
}

export default function DaySelector({ currentDate }) {
  return (
    <div className='flex flex-row justify-center gap-8'>
      <button className='btn btn-primary'>
        <Day date={new Date()} />
      </button>
      <button className='btn btn-primary'>
        <Day date={getNextDay(1)} />
      </button>
      <button className='btn btn-primary'>
        <Day date={getNextDay(2)} />
      </button>
    </div>
  )
}

const getDayString = (day) => {
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return weekday[day]
}

const getMonthString = (month) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  return months[month]
}

function Day({ date }) {
  return (
    <div className='bg-slate-200 rounded-lg p-2'>
      <p className='text-lg block'>{getDayString(date.getDay())}</p>
      <p className='text-sm'>
        {getMonthString(date.getMonth())} {date.getDate()}
      </p>
    </div>
  )
}
