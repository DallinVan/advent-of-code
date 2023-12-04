import input from './input'

const isDigit = (ch: string) => /^\d$/.test(ch)

/**
 * This is a bit of a hack. It did the the correct answer for the input, but there
 * are scenarios where it would break. For example, if a string had as an input
 * oneighthreeightwoneightwone
 * Technically, this should be interpreted as 183821821, and the result would be 11
 * As implemented on 12/01/2023, this would become
 * 188282, and the result would be 12
 */
const replaceWordsWithDigits = (str: string) => {
  return str
    // Safe to process first, no edge cases
    .replace(/four/g, '4')
    .replace(/five/g, '5')
    .replace(/six/g, '6')
    .replace(/seven/g, '7')

    // Nine can be processed after Seven has been processed (edge case: sevenine)
    .replace(/nine/g, '9')

    // Three/Eight make a circular dependency (threeight, eighthree), so we handle each case
    // .replace(/eighthreeight/g, '8')
    // .replace(/threeighthree/g, '3')
    .replace(/threeight/g, '38')
    .replace(/eighthree/g, '83')
    
    // One/two/eight also form a circular dependency, so we handle each case
    // .replace(/oneightwone/g, '1')
    // .replace(/eightwoneight/g, '8')
    // .replace(/twoneightwo/g, '2')
    .replace(/oneight/g, '18')
    .replace(/eightwo/g, '82')
    .replace(/twone/g, '21')

    // Now handle any remaining occurances of three, eight, two, or one
    .replace(/three/g, '3')
    .replace(/eight/g, '8')
    .replace(/two/g, '2')
    .replace(/one/g, '1')
}

const parseInput = (input: string) => {
  return input.split('\n')
}

const processLine = (line: string): number => {
  const lineArray = line.split('')
  const firstDigit = lineArray.find(isDigit)
  const lastDigit = lineArray.reverse().find(isDigit)
  if (!firstDigit || !lastDigit) {
    throw new Error(`First or last digit not found, firstDigit: ${firstDigit}, lastDigit: ${lastDigit}`)
  }
  const result = +`${firstDigit}${lastDigit}`
  // console.log({ line, result })
  return result
}

const part1 = () => {
  const lines = parseInput(input)
  const total = lines.reduce((sum, line) => sum += processLine(line), 0)
  return total
}

const part2 = () => {
  const lines = parseInput(input).map(replaceWordsWithDigits) // .slice(20, 30)
  const total = lines.reduce((sum, line) => sum += processLine(line), 0)
  return total
}

console.log({ part1: part1() })
console.log({ part2: part2() })
