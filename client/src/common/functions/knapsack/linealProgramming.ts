import { Answer, Input } from './interfaces'

export const linealProgramming = ({ n, cost, value, resource }: Input): Answer => {
  const answer: Answer = {
    z: 0,
    items: new Array(n).fill(0),
  }

  return answer
}
