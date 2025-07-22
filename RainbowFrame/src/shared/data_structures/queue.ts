class QueueNode {
  next: QueueNode | null;
  data: string;
  constructor(data: string) {
    this.next = null;
    this.data = data;
  }
}

export class LinkedListQueue {
  private head: QueueNode | null;
  private tail: QueueNode | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(data: string): void {
    const newNode = new QueueNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue(): string | null {
    if (this.isEmpty()) return null;
    const node = this.head!;
    this.head = this.head!.next;
    if (!this.head) this.tail = null;
    return node.data;
  }

  get list(): string[] {
    let current = this.head;
    const list: string[] = [];
    while (current) {
      list.push(current.data);
      current = current.next;
    }
    return list;
  }

  isEmpty(): boolean {
    return this.head === null;
  }
}
