import { GuessTheLine } from '@/components/GuessTheLine'
import { getAllGames } from '@/services/oddsService'
import { getTeamData } from '@/services/teamData'
import testData from '../data/testData.json'

export default async function Home() {
  // Fetch games server-side
  const gamesByDate = await getAllGames()
  
  // Transform the data for each date
  const transformedGamesByDate = new Map()
  
  for (const [date, games] of gamesByDate.entries()) {
    const transformedGames = games.map(matchup => {
      // Convert server time to local timezone for display
      const serverTime = new Date(matchup.commence_time);
      const localTime = new Date(
        serverTime.getFullYear(),
        serverTime.getMonth(),
        serverTime.getDate(),
        serverTime.getHours(),
        serverTime.getMinutes(),
        serverTime.getSeconds()
      );
      
      return {
        home: getTeamData(matchup.home_team),
        away: getTeamData(matchup.away_team),
        points: -1 * matchup.bookmakers[0]?.markets[0]?.outcomes.find(
          outcome => outcome.name === matchup.home_team
        )?.point || 0,
        id: matchup.id,
        gameTime: localTime.toISOString()
      };
    });
    transformedGamesByDate.set(date, transformedGames)
  }

  // If no games were found, use test data
  if (transformedGamesByDate.size === 0) {
    const testGames = testData.map(matchup => {
      // Convert server time to local timezone for display
      const serverTime = new Date(matchup.commence_time);
      const localTime = new Date(
        serverTime.getFullYear(),
        serverTime.getMonth(),
        serverTime.getDate(),
        serverTime.getHours(),
        serverTime.getMinutes(),
        serverTime.getSeconds()
      );
      
      return {
        home: getTeamData(matchup.home_team),
        away: getTeamData(matchup.away_team),
        points: -1 * matchup.bookmakers[0]?.markets[0]?.outcomes.find(
          outcome => outcome.name === matchup.home_team
        )?.point || 0,
        id: matchup.id,
        gameTime: localTime.toISOString()
      };
    });
    // Use today's date for test data
    const today = new Date().toISOString().split('T')[0]
    transformedGamesByDate.set(today, testGames)
  }

  // Convert Map to array for serialization
  const serializedGames = Array.from(transformedGamesByDate.entries())
  return (
    <main className='min-h-screen items-center py-6 md:px-12'>
      <GuessTheLine initialGames={serializedGames} />
    </main>
  )
}
