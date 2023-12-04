import input, { testInput } from './input'

const ANY_SYMBOL_REGEX = /(?![\d\.])./
const GEAR_SYMBOL_REGEX = /\*/
const DIGIT_REGEX = /\d/

type Schematic = string[][]

type CoordinateId = string

class Coordinate {
  row: number
  col: number
  id: CoordinateId

  constructor(row: string | number, col: string | number) {
    this.row = +row
    this.col = +col
    this.id = `${row},${col}`
  }
}

type ParsedInput = Map<CoordinateId, number>

const isAnySymbol = (ch: string) => ANY_SYMBOL_REGEX.test(ch)

const isGearSymbol = (ch: string) => GEAR_SYMBOL_REGEX.test(ch)

const isDigit = (ch: string) => DIGIT_REGEX.test(ch)

/**
 * Retrieves a single number from the schematic where the passed in coordinate is one of the digits in the number
 * Example: 
 *   schematic: ..6234+..
 *   coordinate: (0,4) pointing at the '3'
 * Returns: 6234
 */
const getNumberAssociatedWithCoordinate = (coordinate: Coordinate, schematic: Schematic) => {
  let startingCoordinate: Coordinate = coordinate
  while (startingCoordinate.col > 0 && isDigit(schematic[startingCoordinate.row][startingCoordinate.col - 1])) {
    startingCoordinate = new Coordinate(startingCoordinate.row, startingCoordinate.col - 1) // Decrement column
  }

  let endingCoordinate: Coordinate = coordinate
  while (endingCoordinate.col > 0 && isDigit(schematic[endingCoordinate.row][endingCoordinate.col + 1])) {
    endingCoordinate = new Coordinate(endingCoordinate.row, endingCoordinate.col + 1) // Increment column
  }

  const value = +schematic[coordinate.row].slice(startingCoordinate.col, endingCoordinate.col + 1).join('')
  return {
    id: startingCoordinate.id,
    value,
  }
}

/** Ensures the coordinate is withing the bounds of the schematic's size */
const isValidCoordinate = (coordinate: Coordinate, schematic: Schematic) => {
  if (coordinate.row < 0 || coordinate.col < 0) return false
  const rows = schematic.length
  const cols = schematic[0].length
  return coordinate.row < rows && coordinate.col < cols
}

/**
 * Gets all numbers that are adjacent to the passed in coordinate. A number may extend
 * beyond the bounds of adjacency. Adjacent numbers are defined as a number in which one
 * or more of its digits are adjacent to the specified coordinate.
 */
const getAdjacentNumbers = (coordinate: Coordinate, schematic: Schematic) => {
  const numbersMap = new Map<CoordinateId, number>()
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if (r === 0 && c === 0) continue
      const coord = new Coordinate(coordinate.row + r, coordinate.col + c)
      if (!isValidCoordinate(coord, schematic)) continue
      if (isDigit(schematic[coord.row][coord.col])) {
        const {id, value} = getNumberAssociatedWithCoordinate(coord, schematic)
        numbersMap.set(id, value)
      }
    }
  }
  return numbersMap
}

/**
 * Builds a map of the numbers, along with their associated coordinate IDs, that are of interest.
 * A number is "of interest" if it is adjacent to a specified symbol, defined by the passed in
 * 'isSymbol' function. It may optionally require that a symbol has exactly a specified count of
 * adjacent numbers. If this optional parameter is not passed in, all numbers adjacent to the
 * specified symbol(s) are considered of interest and will be added to the map.
 * 
 * The Map construct is used to ensure duplicate numbers are not recorded, as a number of interest
 * may be adjacent to multiple valid symbols. The uniique coordinate for the first index of a number
 * is used as the key in the map.
 */
const parseInput = (input: string, isSymbol: (ch: string) => boolean, adjacentNumberCount: number = -1): ParsedInput => {
  let numbersMap = new Map<CoordinateId, number>() 
  const schematic = input.trim().split('\n').map(line => line.split(''))
  schematic.forEach((chars, row) => {
    chars.forEach((ch, col) => {
      if (isSymbol(ch)) {
        const coordinate = new Coordinate(row, col)
        const adjacentNumbersMap = getAdjacentNumbers(coordinate, schematic)
        if (adjacentNumberCount === -1) {
          adjacentNumbersMap.forEach((value: number, key: CoordinateId) => {
            numbersMap = new Map([...numbersMap, ...adjacentNumbersMap])
          })
        } else if (adjacentNumberCount === adjacentNumbersMap.size) {
          const values = Array.from(adjacentNumbersMap.values())
          const product = values.reduce((total, num) => total * num, 1)
          numbersMap.set(coordinate.id, product)
        }
      }
    })
  })
  return numbersMap
}

/** Part 1 */
const part1 = (parsedInput: ParsedInput) => {
  // console.log({ parsedInput })
  return Array.from(parsedInput.values()).reduce((sum, num) => sum + num, 0)
}

/** Part 2 */
const part2 = (parsedInput: ParsedInput) => {
  return Array.from(parsedInput.values()).reduce((sum, num) => sum + num, 0)
}

/** Test input */
const testOutput = 
console.log('\n----- Test input -----')
console.log({ part1: part1(parseInput(testInput, isAnySymbol)) })
console.log({ part2: part2(parseInput(testInput, isGearSymbol, 2)) })

/** Full input */
console.log('\n----- Full input -----')
console.log({ part1: part1(parseInput(input, isAnySymbol)) })
console.log({ part2: part2(parseInput(input, isGearSymbol, 2)) }, '\n')
