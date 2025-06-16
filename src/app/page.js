import { GuessTheLine } from '@/components/GuessTheLine'
import { getAllGames } from '@/services/oddsService'
import { getTeamData } from '@/services/teamData'
import testData from '../data/testData.json'

export default async function Home() {
  // Fetch games server-side but don't group by date
  const gamesByDate = await getAllGames()
  
  // Transform the data but keep all games in a flat array
  const allTransformedGames = []
  
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
    allTransformedGames.push(...transformedGames);
  }

  // If no games were found, use test data
  if (allTransformedGames.length === 0) {
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
    allTransformedGames.push(...testGames);
  }

  return (
    <main className='min-h-screen items-center py-6 md:px-12'>
      <GuessTheLine initialGames={allTransformedGames} />
    </main>
  )
}
