import input from './day6_input.mjs'

const part1 = (input) => {
  for (let i = 0; i < input.length - 3; i++) {
    const set = new Set(input.slice(i, i + 4))
    if (set.size === 4) return i + 4
  }
}

const part2 = (input) => {
  for (let i = 0; i < input.length - 13; i++) {
    const set = new Set(input.slice(i, i + 14))
    if (set.size === 14) return i + 14
  }
}

console.log({ part1: part1(input) })
console.log({ part2: part2(input) })
