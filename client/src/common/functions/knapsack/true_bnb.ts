import { Answer, Input } from './interfaces'
import { PriorityQueue } from './PriorityQueue'

interface Node {
  ub: number
  lb: number
  level: number
  flag: boolean
  tv: number
  tw: number
}
interface Item {
  weight: number
  value: number
  idx: number
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
  const arr: Array<Item> = []
  for (let i = 0; i < n; i++) {
    arr[i] = {
      value: value[sortedLambda.sortIndices[i]],
      weight: cost[sortedLambda.sortIndices[i]],
      idx: sortedLambda.sortIndices[i],
    }
  }
  console.log(`arr`, arr)
  let min_lb = 0,
    final_lb = Infinity
  const curr_path: Array<boolean> = new Array(n).fill(false, 0),
    final_path: Array<boolean> = new Array(n).fill(false, 0, n)

  const pq = new PriorityQueue(compare)

  let current: Node = {
    lb: 0,
    ub: 0,
    tw: 0,
    tv: 0,
    level: 0,
    flag: false,
  }

  const left: Node = { ...current }
  const right: Node = { ...current }
  console.log(`left`, left)
  console.log(`right`, right)

  // Insert a dummy node
  pq.push(current)

  while (!pq.isEmpty()) {
    current = pq.peek()
    pq.pop()

    if (current.ub > min_lb || current.ub >= final_lb) {
      continue
    }
    const min = (a: number, b: number): number => (a > b ? b : a)

    // update the path
    if (current.level != 0) curr_path[current.level - 1] = current.flag

    if (current.level === n - 1) {
      // Reached last level
      if (current.lb < final_lb) {
        for (let i = 0; i < n; i++) {
          final_path[arr[i].idx] = curr_path[i]
        }
      }
      final_lb = min(current.lb, final_lb)
      continue
    }

    const level = current.level

    assign(
      right,
      upper_bound(current.tv, current.tw, level + 1, arr),
      lower_bound(current.tv, current.tw, level + 1, arr),
      level + 1,
      false,
      current.tv,
      current.tw
    )

    console.log(`current.level`, current.level)
    console.log(`arr`, arr)
    if (current.tw + arr[current.level].weight <= resource) {
      left.ub = upper_bound(
        current.tv - arr[level].value,
        current.tw + arr[level].weight,
        level + 1,
        arr
      )

      left.lb = lower_bound(
        current.tv - arr[level].value,
        current.tw + arr[level].weight,
        level + 1,
        arr
      )

      assign(
        left,
        left.ub,
        left.lb,
        level + 1,
        true,
        current.tv - arr[level].value,
        current.tw + arr[level].weight
      )
    } else {
      left.ub = left.lb = 1
    }

    // Update the lower bound
    min_lb = min(min_lb, left.lb)
    min_lb = min(min_lb, right.lb)

    // Exploring nodes whose
    // upper bound is greater than
    // min_lb will never give
    // the optimal result
    if (min_lb >= left.ub) {
      pq.push(left)
    }
    if (min_lb >= right.ub) {
      pq.push(right)
    }
  }

  console.log('Items taken into the\n', ' knapsack are : \n')
  if (final_lb == Infinity) {
    final_lb = 0
  }
  for (let i = 0; i < n; i++) {
    console.log(final_path[i] + ' ')
    if (final_path[i]) {
      answer.items[i] = 1
    }
  }
  console.log(`\n`)
  console.log('Maximum profit is : ', -final_lb, '\n')

  answer.time = window.performance.now() - answer.time
  return answer

  function compare(a: Node, b: Node) {
    return a.lb > b.lb
  }

  function assign(
    a: Node,
    ub: number,
    lb: number,
    level: number,
    flag: boolean,
    tv: number,
    tw: number
  ) {
    a.ub = ub
    a.lb = lb
    a.level = level
    a.flag = flag
    a.tv = tv
    a.tw = tw
  }
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
