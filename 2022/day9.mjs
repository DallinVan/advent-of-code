import input, { part1Example } from './day9_input.mjs'

const debug = false

const parseInput = (input) => {
  return input.split('\n')
    .map(move => {
      const [direction, count] = move.split(' ')
      return { direction, count: +count }
    })
}

const moveHead = (state, direction) => {
  switch (direction) {
    case 'U':
      state[0].y++
      break
    case 'D':
      state[0].y--
      break
    case 'R':
      state[0].x++
      break
    case 'L':
      state[0].x--
      break
    default:
      throw new Error(`Unexpected direction: ${direction}`)
  }
}

/** Reduce number to +1 or -1 based on current sign */
const normalize = (number) => {
  if (number === 0) return 0
  return number > 0 ? 1 : -1
}

const updateNext = ([ prev, next ]) => {
  const xDiff = prev.x - next.x
  const yDiff = prev.y - next.y
  
  // No need to move next
  if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return
  
  if (xDiff === 0 && Math.abs(yDiff) > 1) { // Move vertically
    next.y += normalize(yDiff)
  } else if (yDiff === 0 && Math.abs(xDiff) > 1) { // Move horizontally
    next.x += normalize(xDiff)
  } else { // Move diagonally
    next.x += normalize(xDiff)
    next.y += normalize(yDiff)
  }
}

const updateRest = (rope) => {
  for (let i = 0; i < rope.length - 1; i++) {
    updateNext([ rope[i], rope[i+1] ])
  }
}

const getTail = (rope) => rope[rope.length - 1]

const simulateRopeMovements = (rope, instructions) => {
  const uniqueTailPositions = new Set()
  instructions.forEach(instruction => {
    debug && console.log(instruction)
    for (let m = 0; m < instruction.count; m++) {
      moveHead(rope, instruction.direction)
      updateRest(rope)
      uniqueTailPositions.add(`${getTail(rope).x},${getTail(rope).y}`)
      debug && console.log(rope)
    }
  })

  return uniqueTailPositions.size
}

const part1 = (input) => {
  const rope = new Array(2).fill(0).map(() => ({ x: 0, y: 0 }))
  const instructions = parseInput(input)
  return simulateRopeMovements(rope, instructions)
}

const part2 = (input) => {
  const rope = new Array(10).fill(0).map(() => ({ x: 0, y: 0 }))
  const instructions = parseInput(input)
  return simulateRopeMovements(rope, instructions)
}

console.log({ part1: part1(input) })
console.log({ part2: part2(input) })
