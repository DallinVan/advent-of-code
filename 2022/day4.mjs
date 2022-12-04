// https://adventofcode.com/2022/day/4

import input from './day4_input.mjs'

const getMinMax = (assignment) => assignment.split('-').map(str => +str)

/**
 * Example:
 * pairs = [
 *   [
 *      { min: 1, max: 1 },
 *      { min: 3, max: 6 },
 *   ]
 * ]
 */
const pairs = input.split('\n')
  .map(pair => {
    return pair.split(',').map(assignment => {
      const [min, max] = getMinMax(assignment)
      return { min, max }
    })
  })


const fullyContained = (elf1, elf2) => {
  return (elf1.min <= elf2.min && elf1.max >= elf2.max) || (elf2.min <= elf1.min && elf2.max >= elf1.max)
}

const overlapping = (elf1, elf2) => {
  return elf1.max >= elf2.min && elf1.min <= elf2.max
}

const part1 = (pairs) => {
  return pairs.reduce((total, [elf1, elf2]) => {
    return fullyContained(elf1, elf2) ? total + 1 : total
  }, 0)
}

const part2 = (pairs) => {
  return pairs.reduce((total, [elf1, elf2]) => {
    return overlapping(elf1, elf2) ? total + 1 : total
  }, 0)
}

console.log({ part1: part1(pairs) })
console.log({ part2: part2(pairs) })
