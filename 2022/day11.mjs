import input from './day11_input.mjs'

class Monkey {
  constructor(items, inspect, passTo) {
    this.items = items
    this.inspect = inspect
    this.passTo = passTo
    this.itemsInspected = 0
  }
}

const apply = (p1, op, p2) => {
  switch (op) {
    case '+':
      return p1 + p2
    case '*':
      return p1 * p2
    default:
      throw new Error('Invalid op')
  }
} 

const parseInput = (input) => {
  const monkeysInput = input.split('\n\n').map(monkeyInput => monkeyInput.split('\n'))
  return monkeysInput.map(monkeyInput => {
    let [_1, items] = monkeyInput[1].match(/:\s(.+$)/)
    items = items.split(', ').map(x => +x)
    const [_2, opString] = monkeyInput[2].match(/new = (.+$)/)
    const [p1, op, p2] = opString.split(' ')
    const inspect = (old) => {
      const a = isNaN(p1) ? old : +p1
      const b = isNaN(p2) ? old : +p2
      return apply(a, op, b)
    }
    const [_3, denominator] = monkeyInput[3].match(/(\d+$)/)
    const [_4, m1] = monkeyInput[4].match(/(\d+$)/)
    const [_5, m2] = monkeyInput[5].match(/(\d+$)/)
    const passTo = (worryLevel) => {
      return worryLevel % +denominator === 0 ? +m1 : +m2
    }
    // console.log({
    //   p1, op, p2, denominator, m1, m2, inspect: inspect(3), passTo: passTo(10)
    // })
    return new Monkey(items, inspect, passTo)
  })
}

const parseInputPart2 = (input) => {
  const monkeysInput = input.split('\n\n').map(monkeyInput => monkeyInput.split('\n'))
  return monkeysInput.map(monkeyInput => {
    let [_1, items] = monkeyInput[1].match(/:\s(.+$)/)
    items = items.split(', ').map(x => BigInt(+x))
    const [_2, opString] = monkeyInput[2].match(/new = (.+$)/)
    const [p1, op, p2] = opString.split(' ')
    const inspect = (old) => {
      const a = isNaN(p1) ? old : BigInt(+p1)
      const b = isNaN(p2) ? old : BigInt(+p2)
      return apply(a, op, b)
    }
    const [_3, denominator] = monkeyInput[3].match(/(\d+$)/)
    const [_4, m1] = monkeyInput[4].match(/(\d+$)/)
    const [_5, m2] = monkeyInput[5].match(/(\d+$)/)
    const passTo = (worryLevel) => {
      return worryLevel % BigInt(+denominator) === 0 ? +m1 : +m2
    }
    // console.log({
    //   p1, op, p2, denominator, m1, m2, inspect: inspect(3), passTo: passTo(10)
    // })
    return new Monkey(items, inspect, passTo)
  })
}

const part1 = (input) => {
  const monkeys = parseInput(input)
  // const monkey = monkeys[1]
  // const updatedItem = Math.floor(monkey.inspect(monkey.items[0]) / 3)
  // console.log({ updatedItem })
  // console.log({ passTo: monkey.passTo(updatedItem) })
  // return
  // console.log(monkeys)
  let m = 0
  for (let round = 1; round <= 20 * monkeys.length; round++) {
    const monkey = monkeys[m]
    if (monkey.items.length) {
      monkey.items.forEach(item => {
        const updatedItem = Math.floor(monkey.inspect(item) / 3)
        monkeys[monkey.passTo(updatedItem)].items.push(updatedItem)
        monkey.itemsInspected++
      })
      monkey.items = []
    }
    m = m === monkeys.length - 1 ? 0 : m + 1
  }
  monkeys.sort((m1, m2) => m2.itemsInspected - m1.itemsInspected)
  const [m1, m2, ..._rest] = monkeys
  return m1.itemsInspected * m2.itemsInspected
}

const part2 = (input) => {
  const monkeys = parseInputPart2(input)
  let m = 0
  for (let round = 1; round <= 10000 * monkeys.length; round++) {
    const monkey = monkeys[m]
    if (monkey.items.length) {
      monkey.items.forEach(item => {
        const updatedItem = monkey.inspect(item)
        monkeys[monkey.passTo(updatedItem)].items.push(updatedItem)
        monkey.itemsInspected++
      })
      monkey.items = []
    }
    m = m === monkeys.length - 1 ? 0 : m + 1
  }
  monkeys.sort((m1, m2) => m2.itemsInspected - m1.itemsInspected)
  // console.log(monkeys.map(m => m.itemsInspected))
  const [m1, m2, ..._rest] = monkeys
  return m1.itemsInspected * m2.itemsInspected
}

console.log({ part1: part1(input) })
console.log({ part2: part2(input) })
