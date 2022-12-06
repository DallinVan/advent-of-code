// https://adventofcode.com/2022/day/5

import input from './day5_input.mjs'

const [stacksInput, movesInput] = input.split('\n\n').map(inputSegment => inputSegment.split('\n'))

const parseStacksInput = (stacksInput) => {
  const numStacks = +stacksInput.pop().trim().split(/\s*/).pop()
  const stacks = []
  for (let i = 0; i < numStacks; i++) {
    stacks.push([])
  }
  
  const parseStackRow = (rowInput) => {
    for (let i = 1; i < rowInput.length; i += 4) {
      const stackIndex = (i - 1) / 4
      const letter = rowInput[i].trim()
      if (letter) {
        stacks[stackIndex].unshift(letter)
      }
    }
  }
  
  stacksInput.forEach(stackInputRow => parseStackRow(stackInputRow))
  return stacks
}

const parseMovesInput = (movesInput) => {
  return movesInput.map(moveInput => {
    const [_, quantity, from, to] = moveInput.match(/move (\d+) from (\d+) to (\d+)/)
    return {
      quantity: +quantity,
      from: +from - 1,
      to: +to - 1
    }
  })
}

const part1 = (stacks, moves) => {
  moves.forEach(move => {
    for (let i = 0; i < move.quantity; i++) {
      stacks[move.to].push(stacks[move.from].pop())
    }
  })
  return stacks.map(s => s.pop()).join('')
}

const part2 = (stacks, moves) => {
  moves.forEach(move => {
    const crates = []
    for (let i = 0; i < move.quantity; i++) {
      crates.unshift(stacks[move.from].pop())
    }
    stacks[move.to].push(...crates)
  })
  return stacks.map(s => s.pop()).join('')
}

const stacks = parseStacksInput(stacksInput)
const moves = parseMovesInput(movesInput)

const copyStacks = (stacks) => [ ...stacks ].map(stack => [ ...stack ])

console.log({ part1: part1(copyStacks(stacks), moves) })
console.log({ part2: part2(copyStacks(stacks), moves) })
