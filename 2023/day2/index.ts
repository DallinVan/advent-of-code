import input from './input'

type Color = 'red' | 'green' | 'blue'

type Round = Map<Color, number>

type Game = {
  id: number
  rounds: Round[]
}

const isColor = (str: string) => str === 'red' || str === 'green' || str === 'blue'

const parseInput = (input: string) => {
  const lines = input.split('\n')
  const games: Game[] = lines.map(line => {
    const rounds: Round[] = []
    const [gameInfo, roundsInfo] = line.split(':').map(part => part.trim())
    const [_, gameId] = gameInfo.split(' ')
    roundsInfo.split(';').map(roundInfo => {
      const round: Round = new Map()
      roundInfo.split(',').map(colorInfo => {
        const [value, color] = colorInfo.trim().split(' ')
        if (!isColor(color)) throw new Error(`Expected a color, got '${color}'`)
        round.set(color as Color, +value)
      })
      rounds.push(round)
    })
    return {
      id: +gameId,
      rounds,
    }
  })
  return games
}

const isPossible = (round: Round) => {
  const red = round.get('red') ?? 0
  const green = round.get('green') ?? 0
  const blue = round.get('blue') ?? 0
  return red <= 12 && green <= 13 && blue <= 14
}

const part1 = () => {
  const games = parseInput(input)
  return games.reduce((total, game) => {
    return game.rounds.every(isPossible) ? total + game.id : total
  }, 0)
}

const powerOf = (game: Game) => {
  let red = 1
  let green = 1
  let blue = 1
  game.rounds.forEach(round => {
    red = Math.max(red, round.get('red') ?? 1)
    green = Math.max(green, round.get('green') ?? 1)
    blue = Math.max(blue, round.get('blue') ?? 1)
  })
  return red * green * blue
}

const part2 = () => {
  const games = parseInput(input)
  return games.reduce((total, game) => {
    return total + powerOf(game)
  }, 0)
}

console.log({ part1: part1() })
console.log({ part2: part2() })
