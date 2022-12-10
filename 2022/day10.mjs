import input, { part1Example } from './day10_input.mjs'

const getCyclesForOp = (op) => op === 'noop' ? 1 : 2

const parseInput = (input) => {
  return input.split('\n').map(command => {
    const parts = command.split(' ')
    return {
      op: parts[0],
      arg: parts.length > 1 ? +parts[1] : 0
    }
  })
}

const tick = (state, cyclesToSimulate) => {
  for (let i = 0; i < cyclesToSimulate; i++) {
    const shouldUpdateSignalStrength = (state.cycle - 20) % 40 === 0
    if (shouldUpdateSignalStrength) {
      state.signalStrength += state.cycle * state.register
    }
    state.cycle++
  }
}

const part1 = (input) => {
  const commands = parseInput(input)
  const state = {
    cycle: 1,
    register: 1,
    signalStrength: 0,
  }
  for (let i = 0; i < commands.length; i++) {
    const { op, arg } = commands[i]
    tick(state, getCyclesForOp(op))
    state.register += arg
  }
  return state.signalStrength
}

const drawImage = (image) => {
  image.forEach(row => console.log(row.join('')))
}

const getImageRowIndexForCycle = (cycle) => {
  let rowIndex = -1
  while (cycle > 0) {
    rowIndex++
    cycle -= 40
  }
  return rowIndex
}

const getImageColIndexForCycle = (cycle) => {
  while (cycle > 40) cycle -= 40
  return cycle - 1
}

const tickPart2 = (state, cyclesToSimulate) => {
  for (let i = 0; i < cyclesToSimulate; i++) {
    const rowIndex = getImageRowIndexForCycle(state.cycle)
    const colIndex = getImageColIndexForCycle(state.cycle)
    if (Math.abs(state.register - colIndex) < 2) {
      state.image[rowIndex][colIndex] = '#'
    }
    state.cycle++
  }
}

const part2 = (input) => {
  const commands = parseInput(input)
  const image = new Array(6).fill(0).map(() => new Array(40).fill('.'))
  const state = {
    cycle: 1,
    register: 1,
    image
  }
  for (let i = 0; i < commands.length; i++) {
    const { op, arg } = commands[i]
    tickPart2(state, getCyclesForOp(op))
    state.register += arg
  }
  return image
}

console.log({ part1: part1(input) })
console.log('part2')
const image = part2(input)
drawImage(image)
