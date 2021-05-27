import { max } from '../max'
import { Answer, Input } from './interfaces'

export const dynamicProgramming = ({ n, cost, value, resource }: Input): Answer => {
  const answer: Answer = {
    z: 0,
    items: new Array(n).fill(0),
    time: window.performance.now(),
  }
  let i, w
  const K = new Array(n + 1)

  for (i = 0; i <= n; i++) {
    K[i] = new Array(resource + 1)
    for (w = 0; w <= resource; w++) {
      if (i == 0 || w == 0) K[i][w] = 0
      else if (cost[i - 1] <= w)
        K[i][w] = max(value[i - 1] + K[i - 1][w - cost[i - 1]], K[i - 1][w])
      else K[i][w] = K[i - 1][w]
    }
  }

  answer.time = window.performance.now() - answer.time
  answer.z = K[n][resource]
  return answer
}
