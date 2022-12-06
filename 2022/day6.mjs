import input from './day6_input.mjs'

const findNonRepeatingString = (input, length) => {
  for (let i = 0; i <= input.length - length; i++) {
    const set = new Set(input.slice(i, i + length))
    if (set.size === length) return i + length
  }
}

const part1 = (input) => findNonRepeatingString(input, 4)

const part2 = (input) => findNonRepeatingString(input, 14)

console.log({ part1: part1(input) })
console.log({ part2: part2(input) })
