import teams from '../data/nbaTeamData.json'
import wnbaTeams from '../data/wnbaTeamData.json'

export const getTeamData = (teamName) => {
  const result = teams.find((team) => `${team.city} ${team.name}` === teamName)
  if (!result) {
    return wnbaTeams.find((team) => `${team.city} ${team.name}` === teamName)
  }
  return result
}
