import teams from '../data/nbaTeamData.json'

export const getTeamData = (teamName) => {
  const result = teams.find((team) => `${team.city} ${team.name}` === teamName)
  return result
}
