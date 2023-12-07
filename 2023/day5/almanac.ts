export enum Unit {
  Seed = 'seed',
  Soil = 'soil',
  Fertilizer = 'fertilizer',
  Water = 'water',
  Light = 'light',
  Temperature = 'temperature',
  Humidity = 'humidity',
  Location = 'location',
}

export type Range = {
  start: number
  length: number
}

type RangeMapping = {
  sourceRange: Range
  destinationRange: Range
}

export type ConversionChart = RangeMapping[]

type ConversionType = string

export class Almanac {
  /**
   * Allows for conversions to be chained. Returns a function into which the starting input value is passed in,
   * along with an Alamanc to perform the desired conversions
   */
  static pipe(...conversions: [Unit, Unit][]) {
    return (input: number, almanac: Almanac) => {
      return conversions.reduce((input, [from, to]) => {
        return almanac.convert(input, from, to)
      }, input)
    }
  }

  private conversionMap: Map<ConversionType, ConversionChart>

  constructor() {
    this.conversionMap = new Map()
  }

  addConversion(from: Unit, to: Unit, chart: ConversionChart) {
    const conversionType = this.getConversionType(from, to )
    this.conversionMap.set(conversionType, chart)
  }

  convert = (input: number, from: Unit, to: Unit) => {
    // Get conversion chart
    const conversionType = this.getConversionType(from, to )
    const conversionChart = this.conversionMap.get(conversionType)
    if (!conversionChart) throw new Error(`Conversion chart not found for conversion '${conversionType}'`)
  
    // Get output based on input
    return this.lookUpDestination(input, conversionChart)
  }

  private getConversionType(from: Unit, to: Unit) {
    return `${from}:${to}`
  }

  private lookUpDestination(input: number, chart: ConversionChart) {
    const range = chart.find((entry) => {
      const start = entry.sourceRange.start
      const end = entry.sourceRange.start + entry.sourceRange.length
      return input >= start && input <= end
    })

    // If range is found, determine the offset from source and use it to calculate the destination output
    if (!!range) {
      const offset = input - range.sourceRange.start
      return range.destinationRange.start + offset
    }

    // If entry is not found, return input
    return input
  }
}
