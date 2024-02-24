import { getTeamData } from '@/services/getNbaTeamInfo'
import testData from '../data/testData.json'
import { GuessTheLine } from '@/components/GuessTheLine'
import { getLatestGames } from '@/services/oddsService'

export default async function Home() {
  const data = await getLatestGames()
  const matches = getLatestGamesData(data)
  return (
    <main className='min-h-screen items-center py-6 md:px-12'>
      <div>
        <GuessTheLine matches={matches} />
      </div>
    </main>
  )
}

const getLatestGamesData = (matches) => {
  // split matches into arrays based on the commence time
  // const matchesByDate = matches.reduce((acc, match) => {
  //   const date = new Date(match.commence_time).toDateString()
  //   if (!acc[date]) {
  //     acc[date] = []
  //   }
  //   acc[date].push(match)
  //   return acc
  // }, {})
  // console.log(matchesByDate)
  return matches.map((matchup) => {
    return {
      home: getTeamData(matchup.home_team),
      away: getTeamData(matchup.away_team),
      points:
        -1 *
        matchup.bookmakers[0].markets[0].outcomes.find((outcome) => {
          return outcome.name === matchup.home_team
        }).point,
      id: matchup.id,
      gameTime: matchup.commence_time
    }
  })
}
