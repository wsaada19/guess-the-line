export const getTime = (dateString) => {
  const date = new Date(dateString)

  let day = date.getDate()
  let month = date.getMonth() + 1
  let hours = date.getHours()
  let minutes = date.getMinutes()

  let meridiem = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // Handle midnight (0 hours)

  minutes = minutes < 10 ? '0' + minutes : minutes

  return month + '/' + day + ' ' + hours + ':' + minutes + ' ' + meridiem
}
