// https://adventofcode.com/2022/day/1

import input from './day1_input.mjs'

const elves = input.split('\n\n').map(elf => elf.split('\n'))

const part1 = (elves) => {
  let maxValue = 0
  elves.forEach((elf) => {
    const sum = elf.reduce((total, next) => total + +next, 0)
    if (sum > maxValue) {
      maxValue = sum
    }
  })
  return maxValue
}

const part2 = (elves) => {
  const sorted = elves.map((elf) => {
    return elf.reduce((total, next) => total + +next, 0)
  })
  .sort((a, b) => b - a)
  
  return sorted.slice(0, 3).reduce((total, current) => total + current, 0)
}

console.log({ part1: part1(elves) })
console.log({ part2: part2(elves) })
