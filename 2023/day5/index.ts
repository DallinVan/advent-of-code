import { Almanac, ConversionChart, Unit } from './almanac'
import { RangeGenerator } from './generator'
import input, { testInput } from './input'
import { RangeIterator } from './iterator'

type Seed = number

type ParsedInput = {
  almanac: Almanac,
  seeds: Seed[]
}

/**
 * Parses the input and returns an array of seeds an an almanac
 */
const parseInput = (input: string): ParsedInput => {
  const almanac = new Almanac()
  const [seedsInfo, ...conversionChartInfo] = input.trim().split('\n\n')
  
  // Parse seeds info
  const [_, seedsStr] = seedsInfo.split(':')
  const seeds = seedsStr.trim().split(' ').map(s => +s)

  // Parse conversion chart info and build almanac
  conversionChartInfo.forEach(chartInfo => {
    // Parse conversion type
    const [conversionTypeInfo, ...rangeInfo] = chartInfo.split('\n')
    const [conversionTypeStr] = conversionTypeInfo.split(' ')
    const [from, to] = conversionTypeStr.split('-to-') as Unit[]

    // Parse range info
    const conversionChart: ConversionChart = []
    rangeInfo.forEach((info) => {
      const [destinationStart, sourceStart, length] = info.trim().split(' ')
      conversionChart.push({
        sourceRange: {
          start: +sourceStart,
          length: +length,
        },
        destinationRange: {
          start: +destinationStart,
          length: +length,
        }
      })
    })

    // Add to almanac
    almanac.addConversion(from, to, conversionChart)
  })

  return {
    almanac,
    seeds,
  }
}

/**
 * Given an array of seeds and an almanac, performs the chain of conversions and determines the lowest
 * location output of all the seeds
 */
const convertSeedToLocation = (seed: Seed, almanac: Almanac): number => {
  return Almanac.pipe(
    [Unit.Seed, Unit.Soil],
    [Unit.Soil, Unit.Fertilizer],
    [Unit.Fertilizer, Unit.Water],
    [Unit.Water, Unit.Light],
    [Unit.Light, Unit.Temperature],
    [Unit.Temperature, Unit.Humidity],
    [Unit.Humidity, Unit.Location],
  )(seed, almanac)
}

/** Part 1 */
const part1 = (parsedInput: ParsedInput) => {
  const { almanac, seeds } = parsedInput
  return seeds.reduce((min, seed) => {
    const output = convertSeedToLocation(seed, almanac)
    return Math.min(min, output)
  }, Number.MAX_SAFE_INTEGER)
}

/** Part 2 */
const part2 = (parsedInput: ParsedInput) => {
  const { almanac, seeds } = parsedInput

  // Get all seed ranges
  const seedRanges: { start: number, length: number }[] = []
  const allSeeds: Set<number> = new Set<number>()
  let seedInfo = [...seeds]
  while (seedInfo.length) {
    const [start, length, ...rest] = seedInfo
    seedInfo = rest
    seedRanges.push({ start, length })
  }

  const seedsGenerator = new RangeGenerator(seedRanges)
  let min: number | undefined = undefined
  for (let seed of seedsGenerator.getSeeds()) {
    const output = convertSeedToLocation(seed, almanac)
    min = min ? Math.min(output, min) : output
  }

  return min
}

/** Test input */
const testOutput = parseInput(testInput)
console.log('\n----- Test input -----')
console.log({ part1: part1(testOutput) })
console.log({ part2: part2(testOutput) })

/** Full input */
const output = parseInput(input)
console.log('\n----- Full input -----')
console.log({ part1: part1(output) })
console.log({ part2: part2(output) }, '\n') // Takes a long time to run, more than 10 minutes
