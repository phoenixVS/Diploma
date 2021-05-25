import { Answer, Input } from './interfaces'

export const branchesAndBoundes = ({ n, cost, value, resource }: Input): Answer => {
  const answer: Answer = {
    z: 0,
    items: new Array(n).fill(0),
    time: window.performance.now(),
  }

  const lambda = []
  for (let i = 0; i < n; i++) {
    lambda[i] = value[i] / cost[i]
  }
  const sortedLambda = sortWithIndeces(lambda)

  let minLB = 0,
    finalLB = Infinity
  for (let i = 0; i < Math.pow(2, n / 3); i++) {
    minLB += 7
  }
  console.log(`minLb`, minLB)
  answer.time = window.performance.now() - answer.time
  return answer
}

function sortWithIndeces(toSort) {
  for (let i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i]
  }
  toSort.sort(function (left, right) {
    return left[0] > right[0] ? -1 : 1
  })
  toSort.sortIndices = []
  for (let j = 0; j < toSort.length; j++) {
    toSort.sortIndices.push(toSort[j][1])
    toSort[j] = toSort[j][0]
  }
  return toSort
}
