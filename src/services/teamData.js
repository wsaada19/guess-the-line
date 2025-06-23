import nbaTeams from '../data/nbaTeamData.json'
import wnbaTeams from '../data/wnbaTeamData.json'
import mlbTeams from '../data/mlbTeamData.json'

const allTeams = [...nbaTeams, ...mlbTeams, ...wnbaTeams]

export const getTeamData = (teamName) => {
  return allTeams.find((team) => `${team.city} ${team.name}` === teamName)
}
