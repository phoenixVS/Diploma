import { Answer, Input } from './interfaces'

export const euristic = ({ n, cost, value, resource }: Input): Answer => {
  const answer: Answer = {
    z: 0,
    items: [],
    time: window.performance.now(),
  }
  const lambda = []
  for (let i = 0; i < n; i++) {
    lambda[i] = value[i] / cost[i]
  }
  const sortedLambda = sortWithIndeces(lambda)

  let W = 0
  for (let i = 0; i < n; i++) {
    const idx = sortedLambda.sortIndices[i]
    if (resource - W >= cost[idx]) {
      W += cost[idx]
      answer.z += value[idx]
      answer.items.push(idx)
    }
  }
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
