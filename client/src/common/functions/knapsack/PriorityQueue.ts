const top = 0
const parent = (i: number): number => ((i + 1) >>> 1) - 1
const left = (i: number): number => (i << 1) + 1
const right = (i: number): number => (i + 1) << 1

interface Node {
  ub: number
  lb: number
  level: number
  flag: boolean
  tv: number
  tw: number
}

type comparatorT = (a: Node, b: Node) => boolean
export class PriorityQueue {
  _heap: Array<Node>
  _comparator: comparatorT
  constructor(comparator: comparatorT) {
    this._heap = []
    this._comparator = comparator
  }
  size(): number {
    return this._heap.length
  }
  isEmpty(): boolean {
    return this.size() == 0
  }
  peek(): Node {
    return this._heap[top]
  }
  push(...values: Array<Node>): number {
    values.forEach((value) => {
      this._heap.push(value)
      this._siftUp()
    })
    return this.size()
  }
  pop(): Node {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > top) {
      this._swap(top, bottom)
    }
    this._heap.pop()
    this._siftDown()
    return poppedValue
  }
  replace(value: Node): Node {
    const replacedValue = this.peek()
    this._heap[top] = value
    this._siftDown()
    return replacedValue
  }
  _greater(i: number, j: number): boolean {
    return this._comparator(this._heap[i], this._heap[j])
  }
  _swap(i: number, j: number): void {
    ;[this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]
  }
  _siftUp(): void {
    let node = this.size() - 1
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node))
      node = parent(node)
    }
  }
  _siftDown(): void {
    let node = top
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      const maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node)
      this._swap(node, maxChild)
      node = maxChild
    }
  }
}
