
/**
 * This didn't end up working, it wasn't able to access the properites next to the 'next' function.
 */
export class RangeIterator {
  public iterator: Iterable<number>

  constructor(ranges: {start: number, length: number}[]) {
    const remainingCount = ranges[0].start
    this.iterator = {
      [Symbol.iterator]: function () {
        return {
          rangeIndex: 0,
          remainingCount,
          ranges,
          next: function() {
            // Base case
            if (this.rangeIndex >= this.ranges.length - 1 && this.remainingCount === 0) {
              return {
                value: 0,
                done: true,
              }
            }

            // Get next value
            if (this.remainingCount === 0) {
              this.rangeIndex++
              this.remainingCount = this.ranges[this.rangeIndex]?.length ?? 0
            }
            const range = this.ranges[this.rangeIndex]
            const value = range.start + range.length - this.remainingCount
            this.remainingCount--
            return {
              value,
              done: false,
            }
          }
        }
      }
    }
  }
}
