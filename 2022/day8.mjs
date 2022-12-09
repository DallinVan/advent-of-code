import input from './day8_input.mjs'

const parseInput = (input) => {
  return input.split('\n').map(line => line.split(''))
}

const getTreeHeight = (grid, x, y) => +grid[y][x]

const treesToLeft = (grid, x, y) => grid[y].slice(0, x).reverse()
const treesToRight = (grid, x, y) => grid[y].slice(x + 1)
const treesAbove = (grid, x, y) => grid.map(row => row[x]).slice(0, y).reverse()
const treesBelow = (grid, x, y) => grid.map(row => row[x]).slice(y + 1)

const visibleFromLeft = (grid, x, y) => !treesToLeft(grid, x, y).find(height => +height >= getTreeHeight(grid, x, y))
const visibleFromRight = (grid, x, y) => !treesToRight(grid, x, y).find(height => +height >= getTreeHeight(grid, x, y))
const visibleFromTop = (grid, x, y) => !treesAbove(grid, x, y).find(height => +height >= getTreeHeight(grid, x, y))
const visibleFromBottom = (grid, x, y) => !treesBelow(grid, x, y).find(height => +height >= getTreeHeight(grid, x, y))

const treeIsVisible = (grid, x, y) => {
  const height = grid.length
  const width = grid[0].length
  if (x === 0 || y === 0 || x === width - 1 || y === height - 1) return true // Edges
  return visibleFromLeft(grid, x, y) || visibleFromRight(grid, x, y) || visibleFromTop(grid, x, y) || visibleFromBottom(grid, x, y)
}

const scoreDirection = (height, trees) => {
  let score = 0
  for (let i = 0; i  < trees.length; i++) {
    score++
    if (+trees[i] >= height) break
  }
  return score
}

const scenicScoreForTree = (grid, x, y) => {
  const height = getTreeHeight(grid, x, y)
  return scoreDirection(height, treesToLeft(grid, x, y))
       * scoreDirection(height, treesToRight(grid, x, y))
       * scoreDirection(height, treesAbove(grid, x, y))
       * scoreDirection(height, treesBelow(grid, x, y))
}

const part1 = () => {
  let numVisible = 0
  const grid = parseInput(input)
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (treeIsVisible(grid, x, y)) {
        numVisible++
      }
    }
  }
  return numVisible
}

const part2 = () => {
  let maxScenicScore = 0
  const grid = parseInput(input)
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const scenicScore = scenicScoreForTree(grid, x, y)
      if (scenicScore > maxScenicScore) {
        maxScenicScore = scenicScore
      }
    }
  }
  return maxScenicScore
}

console.log({ part1: part1() })
console.log({ part2: part2() })
