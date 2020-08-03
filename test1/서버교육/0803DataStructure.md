연결리스트(LinkedList)
===

양방향 연결 리스트(Doubly Linked List)
---

- 각 노드(Node)에 데이터를 담고 있는 공간과 이전 노드(Prev)와 다음 노드(Next)를 가리키는 두개의 포인터를 갖고 있는 자료구조다. 

- 각 노드(Node)에 데이터를 담고 있는 공간과 이전 노드(Prev)와 다음 노드(Next)를 가리키는 두개의 포인터를 갖고 있는 자료구조다.

  단일 연결 리스트에 비해 **구현은 복잡하지만 역방향 조회가 가능하다는 장점**이 있다.

과제
---

```
public class LinkedNode<T> {
    public T Data;
    public LinkedNode<T> Prev;
    public LinkedNode<T> Next;

    public LinkedNode(T data)
    {
        this.Data = data;
    }

    public LinkedNode(T data, LinkedNode<T> prev, LinkedNode<T> next)
    {
        this.Data = data;
        this.Prev = prev;
        this.Next = next;
    }
}

public class MyLinkedList<T> : IEnumerable<T>
{
    private LinkedNode<T> _head;
    private LinkedNode<T> _tail;
    private IEqualityComparer<T> _equalityComparer;
    private int _size; // 현재 저장된 원소 개수

    public MyLinkedList(IEqualityComparer<T> equalityComparer = null)
    {
        this._equalityComparer = equalityComparer ?? EqualityComparer<T>.Default;
    }

    public void AddFirst(T data)
    {
        LinkedNode<T> newNode = new LinkedNode<T>(data);
        if (_head != null) {
            // TODO... AddLast 로직 반대로
        }
        else {
            _tail = newNode;
        }

        _head = newNode;
        _size++;
    }

    public void AddLast(T data)
    {
        LinkedNode newNode = new LinkedNode(data);
        if (_tail != null) {
            _tail.Next = newNode;
            newNode.Prev = _tail;
        }
        else {
            // TODO... AddFirst 로직 반대로
        }

        // TODO... AddFirst 로직 반대로
    }

    public LinkedNode<T> AddBefore(LinkedNode<T> node, T data)
    {
        LinkedNode<T> newNode = new LinkedNode<T>(data, node.Prev, node);
        if (node.Prev != null) {
            node.Prev.Next = newNode;
        }
        else {
            // TODO... AddAfter 로직의 반대로
        }

        node.Prev = newNode;
        _size++;

        return newNode;
    }

    public LinkedNode<T> AddAfter(LinkedNode<T> node, T data)
    {
        LinkedNode newNode = new LinkedNode(data, node, node.Next);
        if (node.Next != null) {
            // TODO... AddBefore 로직의 반대로
        }
        else {
            _tail = newNode;
        }

        // TODO... AddBefore 로직의 반대로

        return newNode;
    }

    public void Remove(LinkedNode<T> node)
    {
        if (node == _head) {
            _head = node.Next;
        }
        else {
            // TODO... tail 로직의 반대로
        }

        if (node == _tail) {
            // TODO... head 로직의 반대로
        }
        else {
            node.Next.Prev = node.Prev;
        }
        
        this._size--;
    }

    public T RemoveFirst()
    {
        T result = default(T);

        if (//TODO:) {
            result = _head.Data;
            Remove(_head);
        }

        return result;
    }

    public T RemoveLast()
    {
        T result = default(T);

        if (_tail != null) {
            //TODO: tail이 가지고 있는 값을 result에 설정한 후 tail 노드를 삭제.

        }

        return result;
    }

        public LinkedNode<T> FindLast(T data)
    {
        for (var currNode = _tail; //TODO: ) {
            //TODO: comparer로 비교하여 같다면 현재 노드를 리턴
        }
        return null;
    }

        // TODO...
}
```

```
public static void Main()  
{
    MyLinkedList<int> list = new MyLinkedList<int>();

    list.Add(10);
    list.Add(20);
    list.Add(30);
    list.Add(40);
    list.Add(50);
    list.Remove(30);
    list.RemoveFirst();

    foreach (var item in list) {
        Console.WriteLine(item);
    }


    MyLinkedList<string> slist = new MyLinkedList<string>(StringComparer.OrdinalIgnoreCase);

    slist.Add("abc");
    slist.Add("def");
    slist.Add("ghi");
    
    slist.Remove("DEF");

    foreach (var item in slist) {
        Console.WriteLine(item);
    }
}
```

| Creator                                                      | Explain                                                    |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| MyLinkedList<T>(IEqualityComparer<T> equalityComparer = null) | 비어 있는 MyLinkedList클래스의 새 인스턴스를 초기화합니다. |

| Properties          | Expain                                             |
| ------------------- | -------------------------------------------------- |
| LinkedNode<T> First | LinkedList의 첫 번째 노드를 가져옵니다.            |
| LinkedNode<T> Last  | LinkedList의 마지막 노드를 가져옵니다.             |
| int Count           | LinkedList에 실제로 포함된 노드의 수를 가져옵니다. |

| Method                                              | Expain                                                       |
| --------------------------------------------------- | ------------------------------------------------------------ |
| LinkedNode<T> AddBefore(LinkedNode<T> node, T data) | LinkedList의 지정한 기존 노드 앞에 지정한 값이 포함된 새 노드를 추가합니다. |
| void AddFirst(T data)                               | LinkedList의 시작 위치에 지정한 값이 포함된 새 노드를 추가합니다. |
| void AddLast(T data)                                | LinkedList의 끝에 지정한 값이 포함된 새 노드를 추가합니다.   |
| void Clear()                                        | LinkedList에서 노드를 모두 제거합니다.                       |
| bool Contains(T data)                               | 값이 LinkedList에 있는지 여부를 확인합니다.                  |
| bool Contains(Predicate<T> match)                   | 지정된 조건자에 정의된 조건과 일치하는 요소가 LinkedList<T>에 포함되어 있는지 여부를 확인합니다. |
| LinkedNode<T> Find(T data)                          | 지정한 값이 포함된 첫 번째 노드를 찾습니다.                  |
| LinkedNode<T> Find(Predicate<T> match)              | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하고 노드를 반환합니다. |
| IEnumerator<T> GetEnumerator()                      | LinkedList를 반복하는 열거자를 반환합니다.                   |
| void Remove(LinkedNode<T> node)                     | LinkedList에서 지정된 노드를 제거합니다.                     |
| bool Remove(T data)                                 | LinkedList에서 맨 처음 발견되는 지정된 값을 제거합니다.      |
| T RemoveFirst()                                     | LinkedList의 시작 위치에서 노드를 제거합니다.                |
| T RemoveLast()                                      | LinkedList의 끝에서 노드를 제거합니다.                       |
| T[] ToArray()                                       | LinkedList를 새 배열에 복사합니다.                           |
| LinkedNode<T> AddAfter(LinkedNode<T> node, T data)  | LinkedList의 지정한 기존 노드 다음에 지정한 값이 포함된 새 노드를 추가합니다. |

| LinkedNode<T> FindLast(T data)             | 지정한 값이 포함된 첫 번째 노드를 찾습니다.                  |
| ------------------------------------------ | ------------------------------------------------------------ |
| LinkedNode<T> FindLast(Predicate<T> match) | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하고 노드를 반환합니다. |
<br><br>

큐(Queue)
===


큐(Queue)의 개념
---

- FIFO(First in First Out) 선입선출 구조의 자료구조
- 스택(Stack)과 반대개념의 자료구조
- ex) 먼저 온 손님이 늦게 온 손님보다 항상 먼저 서비스를 받을 수 있도록 하는 은행의 번호표 체계 

큐(Queue)의 사용 사례
---

- 캐시(Cache)구현
- 우선순위가 같은 작업 예약(인쇄 대기열)
- 선입선출이 필요한 대기열(티켓 카운터)
- 콜센터 고객 대기시간
- 프린터의 출력 처리
- 윈도 시스템의 메시지 처리기



큐(Queue)의 구현
---

- 동적배열, 연결리스트를 사용하는 두가지 방법
- 배열 
  - 장점 
    - 구현이 쉽고 원하는 데이터에 접근속도가 빠르다
  - 단점 
    - 데이터 최대 개수를 미리 설정, 데이터의 삽입/삭제 비효율성 문제
- 연결리스트
  - 장점 
    -  데이터의 최대 개수가 한정되어 있지 않음
             - 데이터의 삽입/삭제가 용이하다
           - 단점 
                      - 한번에 원하는 데이터 접근이 불가능(하나씩 확인하면서 데이터를 찾아야 한다

- 연결 리스트를 사용한 큐 예

  ```
  public class LinkedQueue {
      private class QueueNode {
          public object Data;
          public QueueNode Next;
  
          public QueueNode(object data) {
              this.Data = data;
          }
      }
  
      private QueueNode _front;
      private QueueNode _rear;
  
      public void Enqueue(object item) {
          QueueNode newNode = new QueueNode(item);
  
          if (_front == null) {
              _front = newNode;
          }
          else {
              _rear.Next = newNode;
          }
  
          _rear = newNode;
          _size++;
      }
  
      public objcet Dequeue() {
          object data = null;
  
          if (_front != null) {
              data = _front.Data;
              _front = _front.Next;
              _size--;
          }
          return data;
      }
  
      public object Peek() {
          if (_front == null) throw new NoSuchElementException();
          return _front.Data;
      }
  
      public bool IsEmpty() {
          return _front == null;
      }
  }
  ```



과제(20분)
---

- MyQueue<T>를  MyLinkedList(양방향 연결리스트 또는 순환 연결리스트)를 이용하여 구현하시오 
  - 큐 자료구조의 이해와 구현을 통해 해당 자료구조의 필요성과 사용법을 학습
  - MyLinkedList(양방향 연결리스트)를 사용함으로써 코드 재사용에 대해 이해

```
public class MyQueue<T> : IEnumerable<T> {
    private MyLinkedList<T> _list;

    public int Count
    {
        get { return _list.Count; }
    }

    public void Enqueue(object item) 
    {
        _list.AddLast(item);
    }

    // TODO:...

}
```

```
public static void Main()  
{
    MyQueue<int> queue = new MyQueue<int>();

    queue.Enqueue(10);
    queue.Enqueue(20);
    queue.Enqueue(30);
    
    Console.WriteLine(queue.Peek());
    Console.WriteLine(queue.Dequeue());


    foreach (var item in queue) {
        Console.WriteLine(item);
    }
}
```

| Creator      | Explain                                                      |
| ------------ | ------------------------------------------------------------ |
| MyQueue<T>() | 비어 있는 상태이고 기본 초기 용량을 가지며 기본 증가 비율을 사용하는 MyQueue 클래스의 새 인스턴스를 초기화합니다. |

| Properties | Explain                              |
| ---------- | ------------------------------------ |
| int Count  | Queue에 포함된 요소 수를 가져옵니다. |

| Method                         | Explain                                                |
| ------------------------------ | ------------------------------------------------------ |
| bool Contains(T)               | Queue에 요소가 있는지 여부를 확인합니다.               |
| T Dequeue()                    | Queue의 시작 부분에서 개체를 제거하고 반환합니다.      |
| void Enqueue(T)                | 개체를 Queue의 끝 부분에 추가합니다.                   |
| IEnumerator<T> GetEnumerator() | Queue를 반복하는 열거자를 반환합니다.                  |
| T Peek()                       | Queue의 시작 부분에서 개체를 제거하지 않고 반환합니다. |
| T[] ToArray()                  | Queue 요소를 새 배열에 복사합니다.                     |
| void Clear()                   | Queue에서 개체를 모두 제거합니다.                      |
<br><br>

------

스택(Stack)
===

스택(Stack)의 개념
---

- LIFO(Last In First Out) 형식의 자료 구조
- 쌓다와 같이 밑이 막힌 상자나 통을 생각해 보면된다.

스택(Stack)의 사용예
---

1. 재귀 알고리즘

   - 재귀적으로 함수를 호출해야 하는 경우에 임시 데이터를 스택에 넣어준다.
   - 재귀함수를 빠져 나와 퇴각 검색(backtrack)을 할 때는 스택에 넣어 두었던 임시 데이터를 빼 줘야 한다.
   - 스택은 이런 일련의 행위를 직관적으로 가능하게 해 준다.
   - 또한 스택은 재귀 알고리즘을 반복적 형태(iterative)를 통해서 구현할 수 있게 해준다.

2. 웹 브라우저 방문기록(뒤로가기)

3. 실행취소(undo)

4. 역순 문자열 만들기

5. 수식의 괄호 검사(연산주 우선순위 표현을 위한 괄호 검사)

   

   

스택(Stack)의 구현
---

- 배열
  - 장점 
    - 구현이 쉽다
    - 원하는 데이터에 접근속도가 빠르다
  - 단점
    - 데이터 최대 개수를 미리 정해야한다.
    - 데이터의 삽입/삭제시 비효율성이 있다.
- 연결리스트
  - 장점
    - 데이터의 최대갯수가 한정되어 있지 않다.
    - 데이터의 삽입/삭제가 용이하다
  - 단점
    - 한번에 원하는 데이터로 접근이 불가능하다(순차로 찾아가야한다.)


스택(Stack)의 추가/삭제 동작
---

- 배열의 사용한 스택(Stack)의 예

```
public class ArrStack {
   private int _top; //마지막 위치 (삽입,삭제가 이루어질 위치)
   private int _maxSize;
   private object[] _stackArray;

   //생성자 : 프로퍼티 초기
   public ArrStack(int size){
       this._top = 0;
       this._maxSize = size;
       this._stackArray = new object[size];
   }

   //스택이 비어있는지 확인
   public boolean isEmpty(){
       return (_top == 0);
   }

   //데이터 삽입
   public void Push(object item){
       //스택에 가득찼을 때 예외처리
       if(_top >= _maxSize) throw new ArrayIndexOutOfBoundsException();
       _stackArray[_top++] = item;
   }

   //데이터 읽기(자료구조에 변화는 없음)
   public object Peek(){
       //스택이 비어있을 때 예외처리
       if (_top == 0) throw new ArrayIndexOutOfBoundsException();
       return _stackArray[_top - 1];
   }

   //데이터 삭제 : 삭제된 데이터 반환
   public object Pop(){
       object item = Peek();
       _top--;
       return item;
   }
}
```

- 연결 리스트를 사용한 스택 예

```
public class LinkedStack {
   private class StackNode {
       public object Data;
       public StackNode Next;

       public StackNode(object data) {
           this.Data = data;
       }
   }

    private StackNode _top;

    public bool IsEmpty() {
        return _top == null;
    }

    public void Push(object item) {
       StackNode t = new StackNode(item);
       t.Next = _top;
        _top = t;
    }

    public object Peek() {
       if (_top == null) throw new NoSuchElementException();
       return _top.Data;
    }

    public object Pop() {
       object item = Peek();
       _top = top.Next;
       return item;
    }
}
```



과제(20분)
---

- 제네릭 클래스 형태의 Stack<T>와 동일한 MyStack(T)를 MyLinkedList(양방향 연결리스트 또는 순환 연결리스트)를 이용하여 구현하시오.

- MyLinkedList(양방향 연결리스트)를 사용함으로써 코드 재사용에 대해 이해한다. 

```
public class MyStack<T> : IEnumerable<T>
{
    private MyLinkedList<T> _list;

    public int Count
    {
        get { return _list.Count; }
    }

    public void Push(object item) 
    {
        _list.AddFirst(item);
    }

    public IEnumerator<T> GetEnumerator()
    {
        return _list.GetEnumerator();
    }

    // TODO:...

}
```

```
public static void Main()  
{
    MyStack<int> stack = new MyStack<int>();

    stack.Push(10);
    stack.Push(20);
    stack.Push(30);
    
    Console.WriteLine(stack.Peek());
    Console.WriteLine(stack.Pop());

    foreach (var item in stack) {
        Console.WriteLine(item);
    }
}
```

| Creator      | Expalin                                                      |
| ------------ | ------------------------------------------------------------ |
| MyStack<T>() | 비어 있는 상태에서 기본 초기 용량을 가지는 MyStack클래스의 새 인스턴스를 초기화합니다. |

| Properties | Expalin                              |
| ---------- | ------------------------------------ |
| int Count  | Stack에 포함된 요소 수를 가져옵니다. |

| Method                         | Explain                                            |
| ------------------------------ | -------------------------------------------------- |
| bool Contains(T)               | Stack에 요소가 있는지 여부를 확인합니다.           |
| IEnumerator<T> GetEnumerator() | IEnumerator의 Stack를 반환합니다.                  |
| T Peek()                       | Stack의 맨 위에서 개체를 제거하지 않고 반환합니다. |
| T Pop()                        | Stack의 맨 위에서 개체를 제거하고 반환합니다.      |
| void Push(T)                   | 개체를 Stack의 맨 위에 삽입합니다.                 |
| T[] ToArray()                  | Stack을 새 배열에 복사합니다.                      |
| void Clear()                   | Stack에서 개체를 모두 제거합니다.                  |
<br><br>

스택(Stack)을 이용한 폴더출력
===

과제(1시간)
---

- 재귀 함수를 사용하지 않고 스택 자료구조를 이용하여 폴더 내용을 출력하는 로직을 구현하시오.
  - 스택 자료구조의 실제 활용에 대해 학습한다.
  - 입력받은 폴더 안에 있는 파일과 서브 폴더의 내용을 모두 출력한다.



```
static void Main(string[] args)
{
    Console.Write("Enter a path: ");
    var targetDirectory = Console.ReadLine();
    
    // 경로가 존재하면
    if (Directory.Exists(targetDirectory)) {
         var stack = new Stack<string>();
         stack.Push(targetDirectory);

         while (stack.Count > 0) { 
            var currDirectory = //TODO: 스택사용
            
            Console.WriteLine(string.Format("\nFiles in {0}:", currDirectory)); // 폴더명 출력

            // Process the list of files found in the directory.
            string [] fileEntries = Directory.GetFiles(currDirectory);
            foreach(string filePath in fileEntries) {
                Console.WriteLine(Path.GetFileName(filePath));  // 파일명 출력
            }

            // Recurse into subdirectories of this directory.
            string [] subdirectoryEntries = Directory.GetDirectories(currDirectory);
            foreach(string subdirectory in subdirectoryEntries)
                      //TODO: 스택사용
             }
          }
    }
    
    Console.Read();
}

```
<br><br>

해시셋(Stack)
===

해시개념(hash)
---

- 임의의 데이터를 특별한 알고리즘을 통해 고유한 숫자로 매핑하는 함수
- 매핑 전 데이터의 값을 키(Key), 매핑 후 데이터의 값을 해시값(HashCode), 매핑하는 과정을 해싱(Hashing)이라고 한다. 
- 해시(Hash)는 데이터의 값을(Key) 고유한 숫자로(HashCode) 만든 후 이를 내부적 배열인(Bucket)에 사용하기 때문에 빠른 검색 속도를 갖는다.
  - 인덱스에 해시값을 사용하는 구조이기 때문에 별도의 정렬을 하지 않고도 데이터를 빠르게 찾거나 삽입할 수 있다
  - 해시값을 이용해 자료가 분산되므로, 자료 전체를 어떠한 기준에 의해 정렬하여 출력하고자 하는 작업에는 적합하지 않다. 

해시함수의 특징
---

- 함수의 결과물은 특정 길이의 숫자이므로, 원래의 해싱한 원보 정보는 알수없다. 
  - 예) 100의 해시값이 35 , "HI"의 해시값이 45, "이카운트"의 해시값이 35라고 할때 35또는 45라는 해시값만 가지고는 원본 키값을 추적하기란 매우 어렵다. 
- 따라서, 해시는 비밀번호, 전자서명, 전자투표, 전자상거래와 같은 민감한 입력의 무결성을 검증해야 하는 보안 분야에서도 널리 사용된다.
  - (예 - 입력값으로 해시값을 구해 기존에 계산한 해시값과 비교하면 자료 변경 여부를 알 수 있다.)



- 간단한 해시 알고리즘(Hash Function) 구현

```
public override int GetHashCode()
{
    int hashCode = 17;
    
    hashCode = (hashCode * 23) + (name == null ? 0 : this.name.GetHashCode());
    hashCode = (hashCode * 23) + this.phoneNumber;
    return hashCode;
}
```

- 해시 자료구조에서 저장/조회시 버킷을 계산하는 방법

```
nt index = (X.GetHashCode() & 0x7fffffff) % bucket_size;
또는
int index = Math.Abs(X.GetHashCode() % bucket_size); 
```

- 배열의 인덱스로 활용해야 하므로, 배열의 크기로 나눈 나머지 값을 이용하면 크기를 벗어나지 않게 할 수 있다. 

- 0x7fffffff 로 AND 연산을 하는 이유는 GetHashCode의 결과값이 음수(-) 값이 나올 수 있기 때문이다. 

- Math.Abs 함수를 이용하여 음수(-) 값인 경우 절대값으로 바꿔주는 방법도 있다. 

- 참고 : 배열의 인덱스는 0부터 시작한다 (음수를 사용하지 않는다.)

  ​          C#의 각종 연산자 - & 연산 등 ( <https://dnmaxi.tistory.com/10>)



충돌방지와 회피
---

- 많은 키값을 고유한 값으로 맵핑하기 때문에 결과값으로 이용 가능한 값에 비해 입력가능한 값이 현저히 많다. (담을 공간은 정해져 있는데, 입력가능한 값은 무한)
- 잘만들어진 해시 함수라 할지라도 두 개의 키에 동일한 해시값이 만들어지는 충돌이 발생하게 된다.
- 따라서 동일한 해시값에 이미 데이터가 있다면 해당 데이터를 저장할 다른 위치가 필요하다.
- 해당 버킷에 데이터가 이미 있다면 체인처럼 노드를 추가하여 다음 노드를 가리키는 방식(연결리스트)의 구현이 많이 사용
- 참고 : 해시테이블의 충돌 방지 (<https://ggomdyu.blog.me/220237218392>)  

해시셋(HashSet)
---

- 사전적 의미로 집합을 의미

- 데이터의 중복을 허용하지 않는 자료구조로 중복된 데이터를 제거하거나, 추가되어 있는지 검사할때 주료 이용한다.

- 저장되는 데이터가 해싱되어 해당 배열(버킷)의 인덱스에 할당되므로 저장된 데이터의 순서를 파악할 수 없는 특징 

  

1. C#/JAVA 해시셋(딕셔너리)의 데이터 검색과정  
   - 1단계 - 저장하는 요소의 GetHashCode 메소드의 반환 값을 해시값으로 사용하여 배열(bucket)의 크기로 나눈 나머지를 배열의 인덱스로 사용한다. 
   - 2단계 - 저장하는 요소의 Equals 메소드의 비교 결과를 이용하여 실제 데이터가 같은지 다른지 판단한다. 
   - 위와 같이 1단계에서 해시값을 이용하여 검색하는 범위를 최소로 줄인 후 2단계에서 중복(동일값) 여부를 체크한다.
   - 그렇기 때문에 직접 작성한 클래스를 해시셋에 사용하는 경우 기본 동작방식과 다르게 해싱하고 값을 비교하게 하려면 해당 클래스의 GetHashCode와 Equals 메소드를 재정의해서 사용하거나 IEqualityComparer<T> 인터페이스를 구현한 형식 같음 비교자를 사용해야 한다.
   - 클래스의 GetHashCode와 Equals 메소드를 재정의 하는 것은 기본동작을 바꾸는 것이고 IEqualityComparer<T> 인터페이스를 구현한 형식 같음 비교자를 사용하는 것은 기본동작 이외의 다른 방식으로  비교 할 필요가 있는 경우에 사용된다. 자세한 사항은 [교육자료-초급 > 자료구조 > 3.1 형식 같음 비교자 인터페이스의 이해]를 참고한다. 
2. 해시 버킷 동적 확장(Resize)
   - 해시배열(Bucket)의 개수가 적다면 메모리 사요을 아낄 수 있지만 충돌로 인한 성능상 손실이 발생
   - 데이터의 개수가 일정 이상이 되면 두배로 늘린다. (일반적으로 125%)
   - 기존에 있던 데이터를 다시 해싱하는 과정이 필요하다. (버킷의 크기가 변경되었기 때문에)



해시셋(HashSet)의 구현
---

- 해시 구현시 충돌 최소화를 위해 배열의 크기는 소수중 하나로 설정한다

```
internal static class HashHelpers
{
    // 1000보다 작은 소수들 (실제로는 더 큰 수까지 사용되지만 예제이므로 1000 이하의 숫자만 사용한다)
    private static readonly int[] _primes = new int[] {
        3, 7, 11, 17, 23, 29, 37, 47, 59, 71, 89, 107, 131, 163, 197, 239, 293, 353, 431, 521, 631, 761, 919
    };

    public static int PRIME_FACTOR = 4;
    public static decimal RESIZE_FACTOR = 1.25M;

    public static int GetPrime(int min)
    {
        for (int index = 0; index < _primes.Length; ++index) {
            int prime = _primes[index];
            if (prime >= min)
              return prime;
        }
        return min;
    }
}
```



```
public class MyHashSet<T> : IEnumerable<T>) {
    private MyLinkedList<T>[] _bucket;
    private IEqualityComparer<T> _equalityComparer;
    private int _count;


    public MyHashSet(IEqualityComparer<T> equalityComparer = null)
        : this(17, equalityComparer)
    {
    }

    public MyHashSet(int capacity, IEqualityComparer<T> equalityComparer = null)
    {
        int size = HashHelpers.GetPrime(capacity);
        this._bucket = new MyLinkedList<T>[size];
        this._equalityComparer = equalityComparer ?? EqualityComparer<T>.Default;
    }

    private MyLinkedList<T> FindBucketList(T item)
    {        
        int index = // TODO: EqualityComparer를 이용하여 item을 해싱한 해쉬코드와 버킷(배열)의 크기를 이용하여 해당 인덱스를 구한다.
        return this._bucket[index]; // 저 위에 있는 부분. 
    }

    private void Resize(int capacity)
    {
        // 새로운 크기로 배열 새로 할당
        var newSize = HashHelpers.GetPrime(capacity);
        var newBucket = new MyLinkedList<T>[newSize];

        // 기존 버킷배열에 저장되어 있는 연결리스트 항목을 순회한다.(루프)
        for (int i = 0; i < // TODO...) {
            var list = // TODO...
            if (list != null) {
                foreach (var item in list) {
                    // TODO: 현재 항목을 바뀐 배열 크기로 재해싱하여 버킷의 인덱스를 구한다.
                    // 해당 버킷에 이미 만들어진 연결리스트가 없다면 새로 만들고 버킷에 할당한다.
                    // 연결리스트에 현재 항목을 추가한다.
                }
            }
        }

        // 새로운 배열로 버킷(배열) 변수 정보 변경
        // TODO: _ 버켓은 new 버켓
    }

    public bool Contains(T item) 
    {
        var list = FindBucketList(item);  
        if (list == null) 
            return false;

        return list.Contains((n) => _equalityComparer.Equals(n.Data, item));
    }

    public bool Add(T item) 
    {
        // 현재 데이터 개수가 해시 버킷 개수의 125% 가 넘으면 리사이징한다.
        if (_count >= _bucket.Length * HashHelpers.RESIZE_FACTOR) {
            Resize(_bucket.Length + HashHelpers.PRIME_FACTOR);
        }

        int index = // TODO: EqualityComparer를 이용하여 item을 해싱한 해쉬코드와 버킷(배열)의 크기를 이용하여 해당 인덱스를 구한다.
        var list = _bucket[index];

        // TODO: 해당 버킷에 이미 만들어진 연결리스트가 없다면 새로 만들고 버킷에 할당한다.
        // 그렇지 않으면 연결리스트에 해당 항목이 이미 포함되어 있는지 검사 후 이미 추가된 값이면 false를 리턴한다.
        // 연결리스트의 마지막에 해당 항목을 추가하고 카운트값을 하나 늘린다.

        return true;
    }

    public void Remove(T item)
    {
        MyLinkedList<T> list = FindBucketList(item);
        
        if (list != null) {
            // TODO: 연결리스트에서 해당 항목을 찾은 후 있다면
            // 해당 노드를 연결리스트에서 삭제하고 카운트값을 하나 줄인 후 true 리턴.
        }
    }

    public IEnumerator<T> GetEnumerator()
    {
        return new MyHashSetEnumerator(this);
    }

    private class MyHashSetEnumerator : IEnumerator<T>
    {
        private MyHashSet<T> _hset;
        private IEnumerator<T> _iterator;
        private int _index;

        public MyHashSetEnumerator(MyHashSet<T> hset)
        {
            this._hset = hset;
            this._index = 0;
            this._iterator = FindNextEnumerator();
        }
    
        private IEnumerator<T> FindNextEnumerator()
        {
            // TODO: 현재 인덱스가 해시셋의 버킷배열의 크기보다 작을때까지 반복한다.
            // 버킷배열에 할당된 연결리스트를 가져온 후 현재 인덱스를 하나 증가시킨다.
            // 연결리스트가 존재하고 리스트에 추가되어 있는 항목의 갯수가 0보다 크다면
            // 연결리스트의 GetEnumerator() 결과를 리턴한다.
        }

        public bool MoveNext()
        {
            // _iterator가 null이 아니고 _iterator의 MoveNext() 결과값이 false 일때까지
            // FindNextEnumerator를 호출하여 다음 버킷에 있는 연결리스트를 찾는다.
            while (TODO:..) {

            }

            // IEnumerator가 null이 아니면 MoveNext()가 성공한 것 이므로 Current를 호출할 수 있다.
            return _iterator != null;
        }
    }
}
```



과제 (4시간)
---

- HashSet<T>와 동일한 MyHashSet<T>를 연결리스트를 이용해 구현하시오
  - Hashing 개념과 Equals, GetHashCode 용도와 사용법을 학습
  - IEqualityComparer<T> 인터페이스에 대한 이해와 사용법 학습



```
class Program
{
    static void Main()
    {
        var x = new MyHashSet<int>(3);    // 초기 크기를 3으로 시작해서 중간에 Resizing이 되도록 테스트 한다.
        x.Add(10);
        x.Add(2);
        x.Add(30);
        x.Add(4);
        x.Add(50);
        x.Add(30);    //=> false. 이미 중복된 값이므로 추가되지 않는다.

        foreach (var item in x) {
            Console.WriteLine(item);
        }

        Console.Read();
    }
}
```

| Creator                                                      | Explain                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| MyHashSet<T>(int capacity, IEqualityComparer<T> equalityComparer = null) | 비어 있으며 집합 형식에 대한 지정된 같음 비교자를 사용하는 MyHashSet<T> 클래스의 새 인스턴스를 초기화합니다. |
| MyHashSet<T>(IEqualityComparer<T> equalityComparer = null)   | 비어 있으며 집합 형식에 대한 기본 같음 비교자를 사용하는 MyHashSet<T> 클래스의 새 인스턴스를 초기화합니다. |

| Properties | Expalin                             |
| ---------- | ----------------------------------- |
| int Count  | 집합에 포함된 요소 수를 가져옵니다. |

| Method                         | Expalin                                                     |
| ------------------------------ | ----------------------------------------------------------- |
| void Clear()                   | HashSet<T> 개체에서 요소를 모두 제거합니다.                 |
| bool Contains(T)               | HashSet<T> 개체에 지정된 요소가 포함되어 있는지 확인합니다. |
| IEnumerator<T> GetEnumerator() | HashSet<T> 개체에서 반복되는 열거자를 반환합니다.           |
| void Remove(T)                 | HashSet<T> 개체에서 지정된 요소를 제거합니다.               |
| bool Add(T)                    | 지정된 요소를 집합에 추가합니다.                            |
