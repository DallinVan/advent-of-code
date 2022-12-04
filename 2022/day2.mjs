// https://adventofcode.com/2022/day/2

import input from './day2_input.mjs'

const predictions = input.split('\n').map(str => str.split(' '))

const selectionScore = (selection) => {
  if (selection === 'X') return 1
  else if (selection === 'Y') return 2
  return 3
}

const outcome = ([opponent, me]) => {
  if (
       opponent === 'A' && me === 'X'
    || opponent === 'B' && me === 'Y'
    || opponent === 'C' && me === 'Z'
  ) {
    return 3 + selectionScore(me)
  } else if (
       opponent === 'A' && me === 'Y'
    || opponent === 'B' && me === 'Z'
    || opponent === 'C' && me === 'X'
  ) {
   return 6 + selectionScore(me)
  }
  return 0 + selectionScore(me)
}

/** For part 2 only */
const getForcedSelection = (opponent, expectedOutcome) => {
  if (expectedOutcome === 'X') {
    if (opponent === 'A') return 'Z'
    else if (opponent === 'B') return 'X'
    return 'Y'
  } else if (expectedOutcome === 'Y') {
    if (opponent === 'A') return 'X'
    if (opponent === 'B') return 'Y'
    return 'Z'
  }
  if (opponent === 'A') return 'Y'
  else if (opponent === 'B') return 'Z'
  return 'X'
}

/** For part 2 only */
const forcedOutcome = ([opponent, expectedOutcome]) => {
  const roundScore = expectedOutcome === 'X' ? 0 : expectedOutcome === 'Y' ? 3 : 6
  const forcedSelection = getForcedSelection(opponent, expectedOutcome)
  const selectedScore = selectionScore(forcedSelection)
  return roundScore + selectedScore
}

const part1 = (predictions) => {
  return predictions.reduce((score, prediction) => score + outcome(prediction), 0)
}

const part2 = (predictions) => {
  return predictions.reduce((score, prediction) => score + forcedOutcome(prediction), 0)
}

console.log({ part1: part1(predictions) })
console.log({ part2: part2(predictions) })
