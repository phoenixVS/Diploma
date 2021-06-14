import { Answer, Input } from './interfaces'

interface Node {
  ub: number
  lb: number
  level: number
  flag: boolean
  tv: number
  tw: number
}

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

  const minLB = 0,
    finalLB = Infinity
  answer.time = window.performance.now() - answer.time
  return answer

  // Function to calculate upper bound
  // (includes fractional part of the items)
  function upper_bound(tv, tw, idx, arr) {
    let value = tv
    let weight = tw
    for (let i = idx; i < n; i++) {
      if (weight + arr[i].weight <= resource) {
        weight += arr[i].weight
        value -= arr[i].value
      } else {
        value -= ((resource - weight) / arr[i].weight) * arr[i].value
        break
      }
    }
    return value
  }
  // Function to calculate lower bound (doesn't
  // include fractional part of the items)
  function lower_bound(tv, tw, idx, arr) {
    let value = tv
    let weight = tw
    for (let i = idx; i < n; i++) {
      if (weight + arr[i].weight <= resource) {
        weight += arr[i].weight
        value -= arr[i].value
      } else {
        break
      }
    }
    return value
  }
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
