interface Stack<T> {
  readonly size: number;
  push(value: T): void;
  pop(): T;
}

type StackNode<T> = {
  readonly value: T;
  readonly next?: StackNode<T>; // | undefined; => ?
}; // 사용자가 데이터를 넣어서 한단계 무언가 감싸는 데이터를 만든다면 불변성을 만드는것이 좋다?

class StackImpl<T> implements Stack<T> {
  private _size: number = 0;
  private head?: StackNode<T>;

  constructor(private capacity: number) {} // 보통은 자료구조를 만들때 얼마만큼의 사이즈를 허용할건지 이니셜밸류를 설정해두면 좋다고 한다.

  get size() {
    // 내부적으로 변경할 수 있게 만든다.
    return this._size;
  }

  push(value: T) {
    if (this.size === this.capacity) {
      throw new Error("Stack is full!");
    }
    const node = { value, next: this.head }; // const node: StackNode<T> = { value, next: this.head }; 정보가 명확하게 지정되어있을때는 생략 가능
    this.head = node;
    this._size++;
  }

  pop(): T {
    if (this.head == null) {
      // null == undefined, null !== undefined
      throw new Error("Stack is empty!");
    } // 헤드가 비어있을수도 있으니까 이걸 함, 원래대로라면 undefined가 맞지만 그러면 null값을 체크하지 못하니까 엄격하게 비교말고 == 으로 하면 undefined, null 둘다 걸러지게 됨
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.value;
  }
}

const stack1 = new StackImpl<string>(10);
stack1.push("1");
stack1.push("2");
stack1.push("3");
while (stack1.size !== 0) {
  console.log(stack1.pop());
}
const stack2 = new StackImpl<number>(10);
stack2.push(111);
stack2.push(222);
stack2.push(333);
while (stack2.size !== 0) {
  console.log(stack2.pop());
}
