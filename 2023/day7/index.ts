import input, { testInput } from './input'

type CardType = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2'

type Card = {
  type: CardType
  value: number
}

const CardMap = new Map<string, Card>([
  ['A', { type: 'A', value: 14 }],
  ['K', { type: 'K', value: 13 }],
  ['Q', { type: 'Q', value: 12 }],
  ['J', { type: 'J', value: 11 }],
  ['T', { type: 'T', value: 10 }],
  ['9', { type: '9', value: 9 }],
  ['8', { type: '8', value: 8 }],
  ['7', { type: '7', value: 7 }],
  ['6', { type: '6', value: 6 }],
  ['5', { type: '5', value: 5 }],
  ['4', { type: '4', value: 4 }],
  ['3', { type: '3', value: 3 }],
  ['2', { type: '2', value: 2 }],
]) 

type Hand = {
  cardStr: string
  cards: Card[]
  bid: number
  classification?: HandClassification
}

/** Order of these enums matter as they denote a heirarchy of hands. DO NOT CHANGE */
enum HandClassification {
  HighCard = 1,
  OnePair = 2,
  TwoPair = 3,
  ThreeOfAKind = 4,
  FullHouse = 5,
  FourOfAKind = 6,
  FiveOfAKind = 7,
}

const parseInput = (input: string): Hand[] => {
  const handsInfo = input.trim().split('\n')
  const hands: Hand[] = []
  handsInfo.forEach((handInfo) => {
    const [cardInfo, bidInfo] = handInfo.split(' ')
    const cards: Card[] = cardInfo.split('').map(ch => CardMap.get(ch)!)
    hands.push({
      cardStr: cardInfo,
      cards,
      bid: +bidInfo,
    })
  })
  return hands
}

const classifyHandUsingWilds = (hand: Card[]) => {
  if (hand.length !== 5) throw new Error('A hand must have 4 cards')
  const classificationMap = new Map<CardType, number>()
  hand.forEach(card => {
    const currentCount = classificationMap.get(card.type) ?? 0
    classificationMap.set(card.type, currentCount + 1)
  })

  const jCount = classificationMap.get('J') ?? 0
  if (!!jCount) {
    classificationMap.set('J', 0) // Clear out Js
  } else {
    return classifyHand(hand)
  }

  // Build potential hands
  const cardsByMostOccurances = Array.from(classificationMap).sort((a, b) => {
    const diff = b[1] - a[1]
    if (diff === 0) {
      return CardMap.get(b[0])!.value - CardMap.get(a[0])!.value
    }
    return diff
  })
  const [mostOccurances, ...rest] = cardsByMostOccurances
  const bestCardToMimic = CardMap.get(mostOccurances[0])!
  const newCards: Card[] = []
  for (let i = 1; i <= mostOccurances[1] + jCount; i++) {
    newCards.push(bestCardToMimic)
  }
  rest.forEach(([type, occurances]) => {
    const card = CardMap.get(type)!
    for (let i = 1; i <= occurances; i++) {
      newCards.push(card)
    }
  })
  return classifyHand(newCards)
}

const classifyHand = (hand: Card[]): HandClassification => {
  console.log({ hand })
  if (hand.length !== 5) throw new Error('A hand must have 4 cards')
  const classificationMap = new Map<CardType, number>()
  hand.forEach(card => {
    const currentCount = classificationMap.get(card.type) ?? 0
    classificationMap.set(card.type, currentCount + 1)
  })

  const handCounts = Array.from(classificationMap.values()).filter(v => !!v).sort().join('')
  switch (handCounts) {
    case '11111':
      return HandClassification.HighCard
    case '1112':
      return HandClassification.OnePair
    case '122':
      return HandClassification.TwoPair
    case '113':
      return HandClassification.ThreeOfAKind
    case '23':
      return HandClassification.FullHouse
    case '14':
      return HandClassification.FourOfAKind
    case '5':
      return HandClassification.FiveOfAKind
    default:
      throw new Error(`Cannot determine classification for '${handCounts}'`)
  }
}

/** Ranks hands in ascending order */
const rankHands = (hands: Hand[]) => {
  return hands.sort((a, b) => {
    if (!a.classification || !b.classification) {
      console.log({ a, b })
      throw new Error('Classification required for ranking')
    }
    
    const handDifference = a.classification - b.classification // A - B
    if (handDifference !== 0) return handDifference

    let highCardDifference = 0
    let index = 0
    while (highCardDifference === 0 && index < 5) {
      const cardA = a.cards[index]
      const cardB = b.cards[index]
      highCardDifference = cardA.value - cardB.value // A - B
      index++
    }
    return highCardDifference
  })
}

/** Part 1 */
const part1 = (input: string) => {
  const hands = parseInput(input)
  hands.forEach(hand => {
    hand.classification = classifyHand(hand.cards)
  })
  rankHands(hands)
  return hands.reduce((total, hand, index) => {
    // console.log({ hand, value: hand.bid * (index + 1) })
    return total + (hand.bid * (index + 1))
  }, 0)
}

/** Part 2 */
const part2 = (input: string) => {
  const hands = parseInput(input).splice(0, 5)
  hands.forEach(hand => {
    hand.classification = classifyHandUsingWilds(hand.cards)
  })
  rankHands(hands)
  console.log({ hands })
  return hands.reduce((total, hand, index) => {
    // console.log({ hand, value: hand.bid * (index + 1) })
    return total + (hand.bid * (index + 1))
  }, 0)
}

/** Test input */
// console.log('\n----- Test input -----')
// console.log({ part1: part1(testInput) })
// console.log({ part2: part2(testInput) })

/** Full input */
console.log('\n----- Full input -----')
// console.log({ part1: part1(input) })
console.log({ part2: part2(input) }, '\n')
