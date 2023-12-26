import { getTeamData } from '@/services/getNbaTeamInfo'
import testData from '../data/testData.json'
import { GuessTheLine } from '@/components/GuessTheLine'
import { getLatestGames } from '@/services/oddsService'

export default async function Home() {
  // const data = await getLatestGames()
  const matches = getLatestGamesData(testData)
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-10'>
      <div>
        <h1 className='text-4xl font-bold text-center mb-8'>Guess the Line?</h1>
        <GuessTheLine matches={matches} />
      </div>
    </main>
  )
}

const getLatestGamesData = (matches) => {
  const date = new Date()
  return matches
    .filter((matchup) => {
      const gameTime = new Date(matchup.commence_time)
      return (
        getTeamData(matchup.home_team) && gameTime.getDate() === date.getDate()
      )
    })
    .map((matchup) => {
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
