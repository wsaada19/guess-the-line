const REVALIDATE = 60 * 60 // 60 minutes
export const getLatestGames = async (sportKey = 'basketball_nba') => {
  try {
    const apiKey = process.env.ODDS_API_KEY
    const regions = 'us' // uk | us | eu | au. Multiple can be specified if comma delimited
    const markets = 'spreads' // h2h | spreads | totals. Multiple can be specified if comma delimited
    const oddsFormat = 'decimal' // decimal | american
    const dateFormat = 'iso' // iso | unix
    // Get games from now until 7 days from now
    const startTime = getISO8601DateTimeInEST(0)
    const endTime = getISO8601DateTimeInEST(0, 5)
    const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds?apiKey=${apiKey}&regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}&dateFormat=${dateFormat}&commenceTimeFrom=${startTime}&commenceTimeTo=${endTime}`
    const result = await fetch(url, {
      next: { revalidate: REVALIDATE }
    })
    const json = await result.json()
    return json
  } catch (err) {
    console.log(err)
    return []
  }
}

export const getAllGames = async () => {
  const nba = await getLatestGames();
  const wnba = await getLatestGames('basketball_wnba');
  const allGames = [...nba, ...wnba];
  
  // Group games by date
  const gamesByDate = new Map();
  
  allGames.forEach(game => {
    // Convert server time to local timezone
    const serverTime = new Date(game.commence_time);
    const localGameDate = new Date(
      serverTime.getFullYear(),
      serverTime.getMonth(),
      serverTime.getDate(),
      serverTime.getHours(),
      serverTime.getMinutes(),
      serverTime.getSeconds()
    );
    
    // Set time to midnight for consistent date comparison
    localGameDate.setHours(0, 0, 0, 0);
    const dateKey = localGameDate.toISOString().split('T')[0];
    
    if (!gamesByDate.has(dateKey)) {
      gamesByDate.set(dateKey, []);
    }
    gamesByDate.get(dateKey).push(game);
  });
  
  return gamesByDate;
}

function getISO8601DateTimeInEST(hour, day = 0) {
  const currentDate = new Date()

  // Set the time to the specified hour
  currentDate.setHours(hour, 0, 0, 0)
  currentDate.setDate(currentDate.getDate() + day)
  currentDate.setSeconds(0, 0)
  currentDate.setMilliseconds(0)

  // Format the date to ISO 8601
  const iso8601DateTime = currentDate.toISOString().split('.')[0] + 'Z'
  return iso8601DateTime
}
