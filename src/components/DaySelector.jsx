'use client'
import { useStore } from '@/store/guessTheLine'

const getNextDay = (daysToAdd) => {
  const date = new Date()
  // Create a new date object to avoid timezone issues
  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + daysToAdd,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  )
  return localDate
}

const getLocalDateString = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function DaySelector() {
  const { selectedDate, setSelectedDate } = useStore((state) => ({
    selectedDate: state.selectedDate,
    setSelectedDate: state.setSelectedDate
  }))

  const handleDateSelect = (date) => {
    const dateString = getLocalDateString(date)
    setSelectedDate(dateString)
  }

  return (
    <div className='flex flex-row justify-evenly gap-4'>
      {[...Array(5)].map((_, index) => {
        const date = getNextDay(index)
        const dateString = getLocalDateString(date)
        const isSelected = dateString === selectedDate
        
        return (
          <button
            key={dateString}
            onClick={() => handleDateSelect(date)}
            className={`flex-1 ${isSelected ? 'bg-slate-600' : 'bg-slate-700/50 hover:bg-slate-700'} rounded-lg transition-colors duration-200`}
          >
            <Day date={date} isSelected={isSelected} />
          </button>
        )
      })}
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

function Day({ date, isSelected }) {
  return (
    <div className='p-2 text-center'>
      <p className='text-sm text-slate-300'>{getDayString(date.getDay())}</p>
      <p className={`text-base font-medium ${isSelected ? 'text-white' : 'text-slate-200'}`}>
        {getMonthString(date.getMonth())} {date.getDate()}
      </p>
    </div>
  )
}
