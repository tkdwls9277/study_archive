우선순위 큐(Priority Queue)
===

우선순위 큐(Priority Queue)의 개념
---

- 들어간 순서에 상관없이 우선순위가 높은 데이터가 먼저 나오는 구조

우선순위 큐(Priority Queue)의 사용 사례
---

- 운영 체제에서의 작업 스케쥴링

- 네트워크 트래픽 제어

- 시뮬레이션 시스템

  

우선 순위 큐 - 자료구조 ‘힙(Heap)’이란? 
---

- 힙(Heap)의 종류
  - 최대 힙(max heap)
    - 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진 트리
    - key(부모노드) => key(자식노드)
  - 최소 힙(min heap)
    - 부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전 이진 트리
    - key(부모노드) <= key(자식노드)

- 힙[Heap]의 구현
  - 표준적인 자료구조는 배열
    - 구현을 쉽게 하기 위하여 루트 노드의 인덱스는 항상 0으로 고정한다.
    - 루트 노드의 왼쪽은 항상 1이고 오른쪽 노드의 번호는 항상 2이다.  (아래 관계 계산식 참고) 
  - 힙에서의 부모 노드와 자식 노드의 관계
    - 부모의 인덱스 = (자식의 인덱스 - 1) / 2
    - 왼쪽 자식의 인덱스 = (부모의 인덱스 * 2) + 1
    - 오른쪽 자식의 인덱스 = (부모의 인덱스 * 2) + 2

힙에 새로운 요소를 삽입하는 경우
---

1. 힙에 새로운 요소가 들어오면, 일단 새로운 노드를 힙의 마지막 위치에 삽입한다. 
2. 기준 인덱스를 힙의 마지막 인덱스로 설정하고 해당 인덱스가 0(루트노드)보다 클때까지 거슬러 올라가며 반복문을 수행한다.
3. 기준 인덱스로 부모 노드의 인덱스를 구한다. 
4. 기준 인덱스의 노드와 부모 노드의 값을 비교하여 값이 크면 부모 노드와 swap하고 기준 인덱스를 부모 노드의 인덱스로 설정한다. 
5.  그렇지 않다면 반복문을 빠져 나간다. 

```
void insert_max_heap(int x) {
    _heapArray[_heapSize++] = x; // 마지막 노드에 x를 넣고 힙 크기를 하나 증가한다.

    // 기준 인덱스를 힙의 마지막 인덱스로 설정하고 해당 인덱스가 0(루트노드)보다 클때까지 거슬러 올라가며 반복문을 수행한다.
    int i = _heapSize - 1;
    while (i > 0) {
        int parentIndex = i //(기준 인덱스)로 부모 노드의 인덱스를 구한다;

        // 기준 인덱스의 노드와 부모 노드의 값을 비교하여 값이 크면 부모 노드와 swap하고 기준 인덱스를 부모 노드의 인덱스로 설정한다.
        // 그렇지 않다면 반복문을 빠져 나간다.

    }
}
```



힙에 요소를 삭제하는 경우
---

힙(Heap)의 삭제 - 오른쪽 자식 노드가 없는 경우
---

- 최대 힙에서 최대값은 루트 노드이므로 루트 노드의 값을 리턴할 변수에 저장한다.
- 루트 노드에 힙의 마지막 노드의 값을 설정한다.
- 마지막 노드를 삭제한다.
- 현재 인덱스를 루트(0) 노드에서 시작하여 왼쪽 자식 노드의 인덱스가 힙의 크기보다  작을때 까지 반복문을 수행한다.
- 현재 노드의 값이 왼쪽 자식 노드와 오른쪽 자식 노드보다 크면 반복문을 빠져 나간다. 
- 왼쪽 자식 노드의 값이 오른쪽 보다 더 큰 경우, 왼쪽 자식 노드와 현재 노드의 값을 swap하고 현재 인덱스를 왼쪽 자식 노드의 인덱스로 설정한다.
- 오른쪽 자식 노드의 값이 왼쪽 노드보다 더 큰 경우, 오른쪽 자식 노드와 현재 노드의 값을 swap하고 현재 인덱스를 오른쪽 자식 노드의 인덱스로 설정한다.  

힙(Heap)의 구현
---

- 힙을 저장하는 표준적인 자료구조는 배열 이다.
- 구현을 쉽게 하기 위하여 루트 노드의 인덱스는 항상 0으로 고정한다. 
- 루트 노드의 왼쪽은 항상 1이고 오른쪽 노드의 번호는 항상 2이다.  (아래 관계 계산식 참고)



힙에서의 부모 노드와 자식 노드의 관계

- 부모의 인덱스 = (자식의 인덱스 - 1) / 2
- 왼쪽 자식의 인덱스 = (부모의 인덱스 * 2) + 1
- 오른쪽 자식의 인덱스 = (부모의 인덱스 * 2) + 2

![](http://git.ecount.kr/ecount/ecount-doc/raw/master/education/01%20low%20level/05.data%20structure/image/DataStructure%Heap.png)



[참고 자료](https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html)




과제 (4시간)
---

-  C# 제네릭 클래스 형태의 PriorityQueue<T>를 최대힙을 이용하여 구현하시오. 
  - 우선순위 큐 구현을 통해 힙 자료구조에 대한 이해와 이진트리에 대해 학습한다. 
  - 우선순위 결정을 위해  IComparable<T> 인터페이스를 활용하는 방법에 대해 학습한다. 
  - IComparable<T> 인터페이스의 자세한 사항은 [교육자료-초급 > 자료구조 > 3.2 크고/작음 비교자 인터페이스의 이해]를 참고한다. 

```
public class PriorityQueue<T> : IEnumerable<T>
    where T : IComparable<T>  // 제네릭 객체의 제한을 통해 T 객체는 반드시 IComparable 인터페이스를 구현해야 함을 명시한다.
{
    private MyList<T> _heapArray;

    public PriorityQueue() 
    {
        this._heapArray = new MyList<T>();
    }

    public int Count
    {
        get { return _heapArray.Count; }
    }

    public void Enqueue(T item) {
        _heapArray.Add(item); // 힙의 마지막에 새로운 요소를 추가한다.

        // 현재 인덱스를 힙의 마지막 인덱스로 설정하고 해당 인덱스가 0(루트노드)보다 클때까지  반복문을 수행한다.
        int i = _heapArray.Count - 1;
        while (i > 0) {
            
             int parentIndex = i //(기준 인덱스)로 부모 노드의 인덱스를 구한다;

             // 1. 기준 인덱스의 노드와 부모 노드의 값을 비교하여 값이 크면
             //     1.1 부모 노드와 swap하고 
             //     1.2 기준 인덱스를 부모 노드의 인덱스로 설정한다.
             // 2. 그렇지 않다면 반복문을 빠져 나간다.

            if (_heapArray[i].CompareTo(_heapArray[parentIndex]) > 0) 
            // TODO: ...
            
            
        }
    }

    public T Dequeue() {
        if (_heapArray.Count == 0) throw new InvalidOperationException();

        T item = _heapArray[0]; // 현재 루트 노드의 값을 저장한다.
        int heapSize = _heapArray.Count - 1;  

        // TODO: 힙배열의 마지막 노드의 값을 루트 노드(배열의 0번째)에 설정한다.
        // TODO: 힙배열의 마지막 노드를 삭제한다.

        // 현재 인덱스를 루트(0) 노드에서 시작하여 왼쪽 자식 노드의 인덱스가 힙의 크기보다  작을때 까지 반복문을 수행한다.
        for (int i = 0, leftIndex = 1; leftIndex < heapSize; leftIndex = (i *  2) + 1) {
            
             int rightIndex = i(현재 인덱스)로 오른쪽 노드의 인덱스를 구한다;

             // 1.오른쪽 자식 노드의 인덱스가 힙배열의 범위를 넘어서지 않은 안전한 경우. ( IF )
             //     1.1 현재 노드의 값이 왼쪽 노드와 오른쪽 노드보다 크거나 같으면 반복문을 빠져 나간다.
             //     1.2 왼쪽 노드의 값이 오른쪽 보다 더 크거나 같은 경우,
             //          1.2.1 왼쪽 노드와 현재 노드의 값을 swap하고
             //          1.2.2 현재 인덱스를 왼쪽 노드의 인덱스로 설정한다.
             //     1.3 위 조건들이 성립하지 않으면 (오른쪽 노드의 값이 크다면)
             //          1.3.1 오른쪽 노드와 현재 노드의 값을 swap하고
             //          1.3.2 현재 인덱스를 오른쪽 노드의 인덱스로 설정한다.
            // 2. 그렇지 않은 경우(왼쪽 자식 노드만 유효한 경우 - ELSE )
            //     2.1 현재 노드의 값이 왼쪽 자식 노드보다 크거나 같으면 반복문을 빠져 나간다.
            //     2.2 그렇지 않으면
            //          2.2.1 왼쪽 자식 노드와 현재 노드의 값을 swap하고
            //          2.2.2 현재 인덱스를 왼쪽 자식 노드의 인덱스로  설정한다.

        }

        return item;
    }    

    // TODO ...
}


class Program
{
    static void Main(string[] args)
    {
        var x = new PriorityQueue<int>();

        x.Enqueue(1);
        x.Enqueue(2);
        x.Enqueue(9);
        x.Enqueue(4);
        x.Enqueue(7);
        x.Enqueue(6);
        x.Enqueue(7); // 중복값
        x.Enqueue(3);

        while (x.Count > 0) {
            Console.WriteLine(x.Dequeue());
        }


        var y = new PriorityQueue<Car>();
        y.Enqueue(new Car(1992, "Ford"));
        y.Enqueue(new Car(1999, "Buick"));
        y.Enqueue(new Car(1997, "Honda"));
        y.Enqueue(new Car(2016, "BMW"));
        y.Enqueue(new Car(2016, "Toyota"));
        
        while (x.Count > 0) {
            Console.WriteLine(y.Dequeue());
        }

        Console.Read();
    }
}
```

| Creator            | Explain                                                      |
| ------------------ | ------------------------------------------------------------ |
| PriorityQueue<T>() | 비어 있는 상태이고 기본 초기 용량을 가지며 기본 증가 비율을 사용하는 Queue 클래스의 새 인스턴스를 초기화합니다. |

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

정리
===

1. 디자인패턴
2. 자료구조

디자인패턴
---

1. command
2. decorator
3. pipeLine Filter
4. factory

자료구조
---

list와 dictionary를 많이 쓰게 될것
list는 결국 배열이기에 연속된 메모리를 사용함.

키값이 유일하다는 전제하에 dictionary가 훨씬 빠름.

gof 갱오브프로그램 - 책