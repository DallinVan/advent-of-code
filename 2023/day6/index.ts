import input, { testInput } from './input'

type Race = {
  time: number
  recordDistance: number
}

const parseInput = (input: string, ignoreSpaces = false): Race[] => {
  const [timeInfo, distanceInfo] = input.trim().split('\n')

  // Parse time info
  const [_timeLabel, timesStr] = timeInfo.split(':')
  const times = timesStr.trim().split(/\s+/).map(v => +v)

  // Parse distance info
  const [_distanceLabel, distancesStr] = distanceInfo.split(':')
  const distances = distancesStr.trim().split(/\s+/).map(v => +v)

  if (ignoreSpaces) {
    const totalTime = +times.map(v => String(v)).join('')
    const totalDistance = +distances.map(v => String(v)).join('')
    return [{
      time: totalTime,
      recordDistance: totalDistance,
    }]
  }

  // Sanity check
  if (times.length !== distances.length) throw new Error('Number of times is not the same as number of distances')

  // Merge time and distance info into an array of Race info
  const races: Race[] = []
  for (let i = 0; i < times.length; i++) {
    races.push({
      time: times[i],
      recordDistance: distances[i],
    })
  }

  return races
}

const willWin = (race: Race, letGoAt: number): boolean => {
  const speed = letGoAt
  const runTime = race.time - letGoAt
  const distance = speed * runTime
  return distance > race.recordDistance
}

const getNumberOfWaysToWin = (race: Race): number => {
  const letGoAtOptions = new Array(race.time).fill(0).map((x, i) => x + i)
  return letGoAtOptions.reduce((numberOfWins, letGoAt) => {
    const willWinRace = willWin(race, letGoAt)
    // console.log({ willWinRace })
    return willWinRace ? numberOfWins + 1 : numberOfWins
  }, 0)
}

/** Part 1 */
const part1 = (input: string) => {
  const races = parseInput(input)
  return races.reduce((product, race) => {
    const numberOfWaysToWin = getNumberOfWaysToWin(race)
    return product * numberOfWaysToWin
  }, 1)
}

/** Part 2 */
const part2 = (input: string) => {
  const races = parseInput(input, true) // Ignore spaces for part 2
  return races.reduce((product, race) => {
    const numberOfWaysToWin = getNumberOfWaysToWin(race)
    return product * numberOfWaysToWin
  }, 1)
}

/** Test input */
console.log('\n----- Test input -----')
console.log({ part1: part1(testInput) })
console.log({ part2: part2(testInput) })

/** Full input */
console.log('\n----- Full input -----')
console.log({ part1: part1(input) })
console.log({ part2: part2(input) }, '\n')
