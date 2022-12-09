import input from './day7_input.mjs'

class Node {
  constructor(name, type, parentNode, size = 0) {
    this.name = name
    this.type = type
    this.parentNode = parentNode
    this.children = new Map()
    this.size = size
  }

  isDirectory() {
    return this.type === 'directory'
  }

  isFile() {
    return this.type === 'file'
  }

  findChildByName(name) {
    const node = this.children.get(name)
    if (!node) throw new Error(`child node not found: ${name}`)
    return node
  }

  addChild(node) {
    if (this.children.get(node.name)) throw new Error(`duplicate child node: ${node.name}`)
    this.children.set(node.name, node)
  }
}

const parseInput = (input) => {
  const rootNode = new Node('root', 'directory', null)
  let currentNode = rootNode

  const lines = input.split('\n')
  let i = 0
  let line
  while (i < lines.length) {
    line = lines[i]
    const [_, command, directory] = line.match(/\$\s([a-z]+)\s?(.+)?/)
    if (command === 'cd') {
      if (directory === '/') {
        currentNode = rootNode
      } else if (directory === '..') {
        if (currentNode.parentNode) currentNode = currentNode.parentNode
      } else {
        currentNode = currentNode.findChildByName(directory)
      }
      i++
    } else if (command === 'ls') {
      i++
      line = lines[i]
      while (i < lines.length && !/^\$/.test(line)) {
        const [dirOrSize, name] = line.split(' ')
        const type = dirOrSize === 'dir' ? 'directory' : 'file'
        currentNode.addChild(new Node(name, type, currentNode, type === 'file' ? +dirOrSize : 0))
        line = lines[++i]
      }
    } else throw new Error(`Unknown command: ${command}`)
  }

  return rootNode
}

const calculateDirectorySizes = (node) => {
  if (node.isFile()) return node.size
  if (node.children.size === 0) return 0
  const directorySize = node.size = Array.from(node.children.values())
    .reduce(
      (total, childNode) => total += calculateDirectorySizes(childNode),
      0
    )
  node.size = directorySize
  return directorySize
}

const visitAllNodes = (node, visit) => {
  visit(node)
  Array.from(node.children.values()).forEach(childNode => visitAllNodes(childNode, visit))
}

const part1 = () => {
  const rootNode = parseInput(input)
  calculateDirectorySizes(rootNode)

  let sum = 0
  visitAllNodes(rootNode, (node) => {
    if (node.isDirectory() && node.size <= 100000) {
      sum += node.size
    }
  })

  return sum
}

const part2 = () => {
  const rootNode = parseInput(input)
  calculateDirectorySizes(rootNode)
  const totalSize = rootNode.size
  const amountToDelete = totalSize - 40000000 // Needed space is 30M, so size - 40M gives us the diff to get to 30M
  let minAmount = 70000001 // Max size of disk is 70M, so just need this to be more than that to start
  visitAllNodes(rootNode, (node) => {
    if (node.isDirectory() && node.size >= amountToDelete && node.size < minAmount) {
      minAmount = node.size
    }
  })
  return minAmount
}

console.log({ part1: part1() })
console.log({ part2: part2() })
