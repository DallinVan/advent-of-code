let iterableObject = {
  [Symbol.iterator]: function () {
    return {
      rangeIndex: 0,
      remainingCount: 3,
      ranges: [
        { start: 1, length: 3 },
        { start: 17, length: 2 },
      ],
      next: function() {
        if (this.rangeIndex >= this.ranges.length - 1 && this.remainingCount === 0) {
          return {
            value: undefined,
            done: true,
          }
        }
        if (this.remainingCount === 0) {
          this.rangeIndex++
          this.remainingCount = this.ranges[this.rangeIndex]?.length ?? 0
        }
        const range = this.ranges[this.rangeIndex]
        const value = range.start + range.length - this.remainingCount
        this.remainingCount--
        // console.log({
        //   rangeIndex: this.rangeIndex,
        //   remainingCount: this.remainingCount,
        //   value,
        // })
        return {
          value,
          done: false, // this.rangeIndex >= this.ranges.length - 1 && this.remainingCount === 0,
        }
      }
    }
  }
};

for (let value of iterableObject) {
  console.log(value);
}