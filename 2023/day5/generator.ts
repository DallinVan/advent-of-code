import { Range } from './almanac'

export class RangeGenerator {
  ranges: Range[]
  rangeIndex = 0
  remainingCountInRange: number
  itemsProcessed = 0

  constructor(ranges: Range[]) {
    this.ranges = ranges
    this.remainingCountInRange = ranges[0].length
  }
  *getSeeds () {
    while (this.rangeIndex <= this.ranges.length - 1) {
      const range = this.ranges[this.rangeIndex]
      const value = range.start + range.length - this.remainingCountInRange
      this.remainingCountInRange--
      
      if (this.remainingCountInRange === 0) {
        this.rangeIndex++
        this.remainingCountInRange = this.ranges[this.rangeIndex]?.length ?? 0
      }

      this.itemsProcessed++
      yield value
    }
  }

  tap() {
    return {
      rangeIndex: this.rangeIndex,
      rangeCount: this.ranges.length,
      remainingCountInRange: this.remainingCountInRange,
      itemsProcessed: this.itemsProcessed,
    }
  }
}