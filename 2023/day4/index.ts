import input, { testInput } from './input'

type Card = {
  id: string
  instances: number // For part 2
  winningNumbers: number[]
  actualNumbers: number[]
}

const winningNumberCount = (card: Card) => {
  const winners = card.actualNumbers.filter(num => {
    return !!card.winningNumbers.find(winner => winner === num)
  })
  return winners.length
}

const parseInput = (input: string): Card[] => {
  const cards: Card[] = []
  const lines = input.trim().split('\n').map(line => {
    const [cardInfo, numberInfo] = line.split(':')
    const [_, cardId] = cardInfo.split(/\s/)
    const [winningNumbers, actualNumbers] = numberInfo.split('|')
    cards.push({
      id: cardId,
      instances: 1,
      winningNumbers: winningNumbers.trim().split(/\s/).map(n => +n),
      actualNumbers: actualNumbers.trim().split(/\s/).map(n => +n),
    })
  })
  return cards
}

/** Part 1 */
const part1 = (cards: Card[]) => {
  return cards.reduce((total, card) => {
    const winners = winningNumberCount(card)
    const cardValue = winners ? Math.pow(2, winners - 1) : 0
    return total + cardValue
  }, 0)
}

/** Part 2 */
const part2 = (cards: Card[]) => {
  cards.forEach((currentCard, index) => {
    const winnerCount = winningNumberCount(currentCard)
    cards.slice(index + 1, index + 1 + winnerCount).forEach(card => {
      card.instances = card.instances += currentCard.instances
    })
  })
  return cards.reduce((total, card) => total + card.instances, 0)
}

/** Test input */
const testOutput = parseInput(testInput)
console.log('\n----- Test input -----')
console.log({ part1: part1(testOutput) })
console.log({ part2: part2(testOutput) })

/** Full input */
console.log('\n----- Full input -----')
const output = parseInput(input)
console.log({ part1: part1(output) })
console.log({ part2: part2(output) }, '\n')
