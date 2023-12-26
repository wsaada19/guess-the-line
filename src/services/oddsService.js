export const getLatestGames = async () => {
  try {
    const apiKey = process.env.ODDS_API_KEY
    const sportKey = 'basketball_nba' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports
    const regions = 'us' // uk | us | eu | au. Multiple can be specified if comma delimited
    const markets = 'spreads' // h2h | spreads | totals. Multiple can be specified if comma delimited
    const oddsFormat = 'decimal' // decimal | american
    const dateFormat = 'iso' // iso | unix
    const startTime = getISO8601DateTimeInEST(0)
    console.log(startTime)
    const endTime = getISO8601DateTimeInEST(23)
    const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds?apiKey=${apiKey}&regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}&dateFormat=${dateFormat}&commenceTimeFrom=${startTime}&commenceTimeTo=${endTime}`
    console.log(url)
    const result = await fetch(url)
    const json = await result.json()
    console.log(json.length)
    // console.log('Remaining requests', json.headers['x-requests-remaining'])
    return json
  } catch (err) {
    console.log(err)
  }
}

function getISO8601DateTimeInEST(hour) {
  const currentDate = new Date()

  // Set the time to the specified hour
  currentDate.setHours(hour, 0, 0, 0)
  currentDate.setDate(currentDate.getDate())
  currentDate.setSeconds(0, 0)
  currentDate.setMilliseconds(0)

  // Format the date to ISO 8601
  const iso8601DateTime = currentDate.toISOString().split('.')[0] + 'Z'
  return iso8601DateTime
}
