// https://adventofcode.com/2022/day/3

import input from './day3_input.mjs'

const splitStringInHalf = (str) => [str.slice(0, str.length / 2), str.slice(str.length / 2)]

const getPriority = (letter) => {
  const unicodeVal = letter.charCodeAt(0)
  if (unicodeVal >= 97 && unicodeVal <= 122) return unicodeVal - 96
  return unicodeVal - 38
}

const rucksacks = input.split('\n')

const part1 = (rucksacks) => {
  const ruckSacksWithCompartments = rucksacks.map(sack => splitStringInHalf(sack))
  return ruckSacksWithCompartments.reduce((sum, [c1, c2]) => {
    const c1Set = new Set(c1.split(''))
    const c2Set = new Set(c2.split(''))
    const duplicate = Array.from(c1Set).find(el => c2Set.has(el))
    return sum += getPriority(duplicate)
  }, 0)
}

const part2 = (rucksacks) => {
  let sum = 0
  for (let i = 0; i < rucksacks.length - 2; i += 3) {
    const r1Set = new Set(rucksacks[i].split(''))
    const r2Set = new Set(rucksacks[i+1].split(''))
    const r3Set = new Set(rucksacks[i+2].split(''))

    const commonElement = Array.from(r1Set).find(el => r2Set.has(el) && r3Set.has(el))
    sum += getPriority(commonElement)
  }
  return sum
}

console.log({ part1: part1(rucksacks) })
console.log({ part2: part2(rucksacks) })
