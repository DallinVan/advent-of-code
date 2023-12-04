import input, { testInput } from './input'

// Update this to be the correct type, or replace instances of ParsedInput with new type
type ParsedInput = unknown

const parseInput = (input: string): ParsedInput => {
  return 'TODO'
}

/** Part 1 */
const part1 = (parsedInput: ParsedInput) => {
  return 'TODO'
}

/** Part 2 */
const part2 = (parsedInput: ParsedInput) => {
  return 'TODO'
}

/** Test input */
const testOutput = parseInput(testInput)
console.log('\n----- Test input -----')
console.log({ part1: part1(testOutput) })
console.log({ part2: part2(testOutput) })

/** Full input */
console.log('\n----- Full input -----')
const output = parseInput(input)
console.log({ part1: part1(output) })
console.log({ part2: part2(output) }, '\n')
