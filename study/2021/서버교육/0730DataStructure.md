자료구조 교육방향 및 방법안내
===

<br>
[프로젝트 생성 및 참조]
---

- 위치 : D:\Projects

1. DataStructure 프로젝트 생성(콘솔)

2. MyCollection 프로젝트 생성(클래스 라이브러리)

3. DataStructure에 MyCollection 참조

<br>
[교육방향]
---

- 자료구조의 필요성
- 요구사항과 부합하는 자료구조는 무엇인지 판단하는 능력 배양
- 필요시 하나 이상의 자료구조를 묶어서 사용하는 능력 배양
- 각 자료구조를 직접 구현해 보면서 자료구조에 대한 이해도 함양


<br>
[교육방법]
---

1. 설명과 실습
   - 설명 : 1일 2시간(개념 설명 및 과제에 대한 설명)
   - C#에서 제공하는 동일한 자료구조에 대해 먼저 설명하고 사용 예를 설명 
   - 논제네릭 버전과 제네릭 버전으로 예제 구현(제네릭의 장점에 대해 학습 및 이해하는 과정) 
   - 자료구조에 저장된 원소의 열거를 위한 IEnumerable<T> 인터페이스 이해와 구현 및 확장  
2. 과제
   - 각 자료구조 마다 과제진행(총 8개 과제: 동적배열은 논제네릭으로 먼저 만들고 제네릭 버전으로 수정하는 방식) 
   - 동적배열 구현시 알고리즘 과정에서 배운 정렬(Quick Sort)와 검색(Binary Search)를 활용하여 메소드 구현 예정 
3. 평가
   - 각 자료구조 구현: 소스코드 로직 및 가독성, 재사용성 등 

<br>
[교육목록 및 시간 - 총 6일 소요예정]
---

1. 자료구조 필요성/동적배열 구현(1일)
   - 동적배열, 형식 같음 이해
2. 제네릭 동적배열 구현(1일)
   - 제네릭 동적배열, 형식 같음 비교자 인터페이스 , 크고/작음 비교자 인터페이스
3. 연결리스트(1일)
   - 단방향 연결리스트, 양방향 연결리스트
4. 스택구현(0.5일 오전)
   - 스택, 계산기 구현
5. 큐, 우선순위 큐(0.5일 오후)
   - 큐, 우선순위 큐
6. 해시셋(1일)
   - 동적배열 심화(콜백함수 - 람다식), 해시셋
7. 딕셔너리(0.5일 오전)
   - 딕셔너리
8. 그룹 딕셔너리(0.5일 오후)
   - 그룹 딕셔너리

<br>

[자료구조란 무엇인가?]
---

- 자료의 집합을 의미하며 각 원소들 사이의 관계가 논리적으로 정의된 일정한 규칙에 의하여 나열되며 자료에 대한 처리를 효율적으로 수행할 수 있도록
  조직적, 체계적으로 구분하여 표현한 것

- 자료구조는 자료를 순차적으로 구성하는 선형구조인 리스트, 스택, 큐와 순차적이지 않게 구성하는 비선형구조인 트리,그래프로 분류될 수 있음 

<br>
[자료구조의 필요성]
---

1. 컴퓨터 프로그램 개발에 있어서 어떤 자료 구조를 이용할 것인지를 결정하는 것은 개발의 난이도 및 개발 기간에 대단히 큰 영향을 미침

   - 다양한 프로그램을 설계할 때, 어떠한 자료구조를 선택할지는 가장 우선적으로 고려되어야 한다. 

   - 데이터는 일종의 경계선이며 로직은 두 데이터를 잇는 파이프이다.

     

2. 알고리즘과 자료구조의 관계

   - 내가 원하는 자료를 빨리 찾기위해서 데이터를 잘 정리해 놓아야 한다.  

     - 자료(데이터)를 잘 정리하기 위해 필요한 것이 자료 구조다.

   - 자료 구조와 알고리즘은 밀접한 관계를 가지고 있다. 

     - 정리 잘해 놓아도 빠르게 찾는 방법을 모르면 정리를 한 보람이 없다. 
     - 이렇게 정리된 자료를 빠르게 찾을 수 있는 방법이 필요한데 이때 필요한게 알고리즘이다. 

   - ex) 윈도우 탐색기 개발

     - 트리가 아닌 다른 구조를 사용한다면 구현에 어려움이 따르고 로직이 복잡해질 것 

     - 우측의 파일 목록은 동적으로 새로운 파일들이 추가/삭제가 빈번하게 일어난다. 따라서 리스트(ArrayList, LinkedList) 형태의 자료구조가 적합 

     - 효율적인 자료구조를 선택하거나 설계하고 해당 자료를 찾는 알고리즘을 사용하게 되면 코드의 구조화와 가독성이 좋아진다.

       

3. “Programmer와 Coder의 차이는 자료구조와 알고리즘에서 나온다”.   

      - 보통 학습의 순서는 객체지향 > 자료구조 > 디자인패턴 > 프레임워크 순으로 많이 진행한다.

        하지만, 실제 프로젝트에서 요구되는 우선순위는 그 역순인 경우가 많다. 당장 업무화면 개발을 해야 하는데 MVC 패턴을 모르면 곤란하지만 퀵정렬를 모른다고 문제될 건 없다.

        단, 알고리즘과 자료구조의 구현은 아니더라고 필요한 요구사항에 적절한 자료구조를 쓸 수 있는 역량은 필수이고, 자료구조를 포함한 Core에 강할수록 개발 연차가 올라갈수록 그렇지 않은 개발자와 역량차이가 많이 나게 된다.

      - 그리고 각 개발언어(C#, Java, C++등)의 Collection 프레임웍을 공부하다 보면 결국 자료구조의 구현자체가 객체지향 및 디자인 패턴 그 자체이므로,

        고급개발자로 성장하기 위해선 자료구조 및 객체지향을 이해하는 것은 필수적인 항목이다. 다만 성능위주의 알고리즘에 대한 학습은 우선순위에서 밀린다고 본다.

        모던 개발의 패러다임 역시 성능보다는 개발생산성 및 유지보수를 위한 재활용성에 있기 때문이다.


--------------------------------
<br>
동적배열(ArrayList)
===


<br>
선형 자료 구조
---

- 연속된 자료를 저장하기 위한 것으로, 이에 해당하는 가장 기초적인 자료구조가 배열이다. 


1.배열
---

배열의 장점

  1. 항목 접근 속도가 빠르고 일정하다 

     - 배열의 원소들은 모두 연속된 메모리 위치에 저장되기 때문에 인덱스를 통해 가장 빠르게 원소를 참조하거나 변경할 수 있다.  (ex) 디스크 조각모음)

       
배열의 단점

1. 크기가 고정되어 있다. 사용하기 전에 배열 크기를 지정해야 한다. 
   - 먼저 배열의 크기를 정해야 하기 때문에 만약 정해진 크기를 넘겨서 자료를 저장하고 싶다면 더 큰 크기의 배열을 새로 할당받아 사용해야 한다. 

2. 삽입이 복잡하다
   - 배열의 중간에 원소를 삽입하거나 삭제할 경우, 나머지 원소들의 연속적인 순서를 맞추기 위해 삽입/삭제가 이루어진 위치의 원소 이후부터의 원소들을 (삭제의 경우)앞쪽으로 당기거나 (삽입의 경우)뒤쪽으로 밀어야한다. 배열의 원소의 개수를 n이라고 한다면 원소들을 옮기는데 걸리는 시간은 O(n)이다. 

3. 배열이 큰 경우 메모리 할당이 힘들다.
   - 메모리상에 남아있는 공간이 있더라도 연속적인 공간으로 남아있지 않으면 배열을 할당 할 수 없다.
   - **※ 위의 문제를 해결하기 위한 자료구조로 동적 배열(Dynamic array)과 연결리스트(Linked list)가 있다.** 

   

2.동적배열
---

1. 개념 및 특징

   - 동적 배열은 배열의 단점을 어느정도 보완한 자료형으로, 기본적으로 배열로 구현되기에 초기에 고정된 크기를 할당 받으며 배열과 거의 비슷한 속도를 나타내지만, 필요에 따라 동적으로 크기가 변화하는 특징을 갖는다.  
   - 동적 배열은 내부적으로 배열로 구현되어 있어 메모리에 원소들이 연속적으로 위치에 있으며, 원소를 참조/변경하는데 O(1)시간이 걸리는 배열의 특징을 그대로 가지고 있다. 

2. 동적배열의 동작원리 - 배열의 동적 확장 

   - Size, Capacity 속성을 가지고 있어야 한다.

   - 동적 배열은 다음과 같은 원리로 동작한다. 처음 동적 배열이 생성되었을 때, 내부에 일정한 크기를 갖는 배열을 할당하고 원소를 추가한다.

     추가된 원소의 총 개수가 내부 배열이 가진 크기를 넘어가면 기존의 **2배** 크기로 배열을 새로 할당한 후 기존의 원소를 새로운 배열에 복사한다.

     그런 다음 내부에 가지고 있는 배열을 **새로운 배열 객체로 바꿔치기**한다.

3. 배열의 중간 삽입/삭제

배열은 

4. 배열의 사이즈보다 데이터가 작을 경우, 낭비되는 공간이 생긴다. (2배씩 증가시키기 때문에)

과제(3시간)
---

```
public class MyArrayList
{
    private object[] _array;   // 할당된 배열을 가리키는 참조변수
    private int _size;         // 현재 저장된 원소 개수

    // 생성자
    public MyArrayList()
        : this(4) 
    {
    }

    public MyArrayList(int capacity)
    {
        this._size = 0;
        this._array = new object[capacity];
    }

    public int Count
    {
        get { return _size; }
    }

    public int Capacity
    {
        get { return _array.Length; }
        set {
            if (value <= Capacity)
                throw new ArgumentOutOfRangeException();

            // TODO: 설정되는 크기로 새로운 배열 할당
            // 기존 원소를 새로운 배열로 복사
            // 할당된 배열을 가리키는 내부 참조변수를 새로운 배열로 변경
        }
    }

    // 외부에서 배열 요소에 접근을 위한 인덱서 프로퍼티
    public object this[int index]
    {
        get {
            if (index >= _size)
                throw new IndexOutOfRangeException();
            return _array[index];
        }
        set {
            if (index >= _size)
                throw new IndexOutOfRangeException();
            _array[index] = value;
        }
    }

    private void EnsureCapacity()
    {
        int capacity = _array.Length;
        if (_size >= capacity) {
            this.Capacity = capacity == 0 ? 4 : capacity * 2;
        }
    }

    // 배열의 마지막에 원소 추가
    public void Add(object element)
    {
        // 배열 공간 체크, 부족할 시 resize
        EnsureCapacity();

        // 원소 추가
        _array[_size] = element;
        _size++;
    }

    // 해당 위치에 원소 추가
    public void Insert(int index, object element)
    {
        // 배열 공간 체크, 부족할 시 resize
        EnsureCapacity();

        // 추가되려고 하는 위치부터 한칸씩 뒤로 데이터 이동
        for (int i = _size; i > TODO...) {
            _array[i] = _array[i - 1];
        }

        // 원소 추가
        _array[index] = element;
        _size++;
    }

    // 해당 위치의 원소 삭제
    public void RemoveAt(int index)
    {
        // TODO...
    }

    public void RemoveRange(int index, int count)
    {
        _size -= count;

        // 삭제하려는 위치부터 한칸씩 앞으로 데이터 이동
        for (int i = index; i < TODO...) {
            _array[i] = _array[i + 1];
        }        
    }

    public void CopyTo(Array array)
    {
        CopyTo(array, 0);
    }

    public void CopyTo(Array array, int arrayIndex)
    {
        for (int i = arrayIndex; i < TODO...) {
            // TODO: ...
        }
    }
}
```



- 위 예제를 참고하여 논제네릭 클래스 형태의 [ArrayList]와 동일한 MyArrayList를 구현하시오.

  - 배열의 생성 및 요소 복사(이동)에 대해 학습한다.
  - Insert 메소드를 재 활용하도록 Add 메소드를 수정해보시오.
  - Capacity 속성에 값이 설정될때 현재 배열의 크기보다 더 큰 값이 지정되는 경우 배열을 2배 Resize 하도록 구현하시오.
  - 삽입/삭제시 배열의 원소 이동을 Array.Copy를 이용하여 수정해보시오.

- C#에서는 이러한 동적 배열을 표준 라이브러리에서 ArrayList로 제공한다.

  더 자세한 사항은 [공식문서](https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.arraylist)를 참조.

```
public static void Main()  
{
    // Creates and initializes a new MyArrayList.
    MyArrayList myAL = new MyArrayList();

    myAL.Add("Hello");
    myAL.Add("C#");
    myAL.Add("World");
    myAL.Add("!\r\n");

    for (int i = 0; i < myAL.Count; i++) {
        Console.WriteLine(myAL[i]);
    }

    myAL.RemoveAt(2);

    for (int i = 0; i < myAL.Count; i++) {
        Console.WriteLine(myAL[i]);
    }

    Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록
}
```



- 아래와 같은 생성자와, 속성을 정의하시오

생성자

| Creator                    | Explain                                                      |
| -------------------------- | ------------------------------------------------------------ |
| MyArrayList()              | 비어 있는 상태에서 기본 초기 용량(4)을 가지는 MyArrayList 클래스의 새 인스턴스를 초기화합니다. |
| MyArrayList( int capacity) | 비어 있는 상태에서 지정한 초기 용량을 가지는 MyArrayList 클래스의 새 인스턴스를 초기화합니다.속성 |

속성

| Property                | Explain                                                      |
| ----------------------- | ------------------------------------------------------------ |
| int Count               | MyArrayList에 실제로 포함된 요소의 수를 가져옵니다.          |
| object Item[ int index] | 지정한 인덱스에 있는 요소를 가져오거나 설정합니다.           |
| int Capacity            | MyArrayList에 포함될 수 있는 요소의 수를 가져오거나 설정합니다. |

  메서드

| Method                                   | Explain                                                      |
| ---------------------------------------- | ------------------------------------------------------------ |
| void Clear  ()                           | MyArrayList에서 모든 요소를 제거합니다.                      |
| void CopyTo(Array array)                 | 대상 배열의 맨 처음부터 시작하여 전체 MyArrayList를 호환되는 1차원 Array에 복사합니다. |
| void CopyTo(Array array, int arrayIndex) | 대상 배열의 지정된 인덱스에서 시작하여 전체 MyArrayList을 호환되는 1차원 Array에 복사합니다. |
| void Insert(int index, object item)      | MyArrayList의 지정된 인덱스에 요소를 삽입합니다.             |
| void RemoveAt(int index)                 | MyArrayList의 지정된 인덱스에 있는 요소를 제거합니다.        |
| void RemoveRange(int index, int count)   | MyArrayList에서 요소의 범위를 제거합니다.                    |
| void Swap(int i, int j)                  | MyArrayList의 지정된 첫번째 인덱스와 두번째 인덱스에 있는 요소들을 바꿉니다. |
| object[] ToArray()                       | MyArrayList의 요소를 새 Object 배열에 복사합니다.            |
| void Add( object item)                   | 개체를 MyArrayList의 끝 부분에 추가합니다.                   |
<br>

-----------------------
<br>
형식 같음(Equals)의 이해
===

C#에서 두 객체를 비교
---

- Value형 (int, decimal, char, 구조체 등등...) : 실제 값을 비교

- 문자형(string) : string 객체가 가지고 있는 문자를 비교(대소문자 구분)

- 참조형(object) - 객체의 타입이 같고 생성된 메모리 번지수가 같은지 비교(동일한 인스턴스인지)

  - Quiz 
    - cast 형변환 시 아래 두개의 차이점은 무엇인가요? (b,c)

  ```
  var a = new MyCollection();
  var b = a as MyCollection; //error가 나면 null로 들어감
  var c = (MyCollection)a;  //error가 나면 exception이 뜸
  ```

- C# 에서 기본적으로 Class를 만들 경우 Object 라는 클래스를 상속받음

  - Object 클래스에는 GetHashCode, Equals 가 추상메서드로 되어 있어 Override 해서 사용할 수 있다.
  - 참조형인 경우 ReferenceEquals 메소드로 비교하고, 그렇지 않은 경우엔 Equals 메소드로 비교(명시적으로 Equals, ReferenceEquals 를 사용하지 않고 == 사용할 경우)

  ```
  var i = 10;
  var j = 10;
  
  if(i == j){
      soruce ....
  }
  
  --> 
  
  if(Object.Equals(a,b)){
      source ....
  }
  
  
  Car a = new Car();
  Car b = new Car();
  
  if(a == b){
      source ....
  }
  
  -->
  
  if(Object.ReferenceEquals(a,b)){
  	source ....   
  }
  ```

  

- C#의 기본적인 같음 비교 방법을 변경하려면 사용자가 만든 객체의 Equals 메소드를 재정의 하면된다.

```
public class Car
{
    private int _year;
    private string _make;

    public Car(int year, string make)
    {
        this._year = year;
        this._make = make;
    }
         
    public override bool Equals(object obj)
    {
        Car other = obj as Car;
        return this._year = other._year;    // Compare by Year
    }
}

class Program
{
    static void Main()
    {
        var a = new Car(1998, "honda");
        var b = new Car(1997, "hyundae");
        var c = new Car(1998, "toyota");

        Console.WriteLine(a.Equals(b));    //=> false
         Console.WriteLine(a.Equals(c));    //=> true
         Console.WriteLine(a == c);         //=> false!!!
    }
}
```

- 위 예제에서 Equals와 == 의 결과가 다르게 나오는 이유는 참조형의 == 연산자는 Equals 메소드가 아닌 ReferenceEquals 메소드를(객체의 타입이 같고 생성된 메모리 번지수가 같은지 비교하는) 호출하기 때문이다. 이런 문제점 때문에 C# 컬렉션(List, Queue, Stack, HashSet 또는 Dictionary 등)은 내부적으로 값이 같은지 비교할 때 == 연산자 대신 명시적으로 Equals 메소드를 사용한다. 
- c# 객체의 Equals 메소드를 사용한 Contains 구현

```
public bool Contains(object item)
{
   for (int index = 0; index < this._size; index++) {
       if (this._array[index].Equals(item))
           return true;
   }
   return false;
}
```



과제(1시간 30분)
---

1. MyArrayList 구현체에 아래 메소드를 구현하고 사용예를 작성하시오. 
   - 기본 같음에 대한 이해와 구현을 통해 용도와 사용법을 학습한다. 

```
public static void Main()  
{
    // Creates and initializes a new MyArrayList.
    MyArrayList myAL = new MyArrayList();

    myAL.Add("Hello");
    myAL.Add("C#");
    myAL.Add("World");
    myAL.Add("!\r\n");

    Console.WriteLine(myAL.IndexOf("WORLD"));
    Console.WriteLine(myAL.IndexOf("World"));

    myAL.Remove("C#");

    for (int i = 0; i < myAL.Count; i++) {
        Console.WriteLine(myAL[i]);
    }
    
    Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록
}
```

| Method                                             | Explain                                                      |
| -------------------------------------------------- | ------------------------------------------------------------ |
| int IndexOf( object item)                          | 지정한 Object를 검색하고, 전체 MyArrayList 내에서 처음 나오는 0부터 시작하는 인덱스를 반환합니다. |
| int IndexOf( object, int index)                    | 지정된 Object를 검색하고, 지정된 인덱스부터 마지막 요소까지 포함되는 MyArrayList의 요소 범위에서 처음 나오는 0부터 시작하는 인덱스를 반환합니다. |
| int IndexOf( object item, int index, int count)    | 지정된 Object를 검색하고, 지정된 인덱스부터 시작하여 지정된 수의 요소를 포함하는 MyArrayList의 요소 범위에서 처음 나오는 0부터 시작하는 인덱스를 반환합니다. |
| int LastIndexOf(object item)                       | 지정된 개체를 검색하고 전체 MyArrayList에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| int LastIndexOf(object item,int index)             | 지정된 개체를 검색하고, 첫 번째 요소에서 지정된 인덱스로 확장하는 MyArrayList의 요소 범위에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| int LastIndexOf(object item, int index, int count) | 지정된 개체를 검색하며, 지정된 수의 요소를 포함하고 지정된 인덱스에서 끝나는 MyArrayList의 요소 범위에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| bool Remove(object item)                           | MyArrayList에서 맨 처음 발견되는 특정 개체를 제거합니다.     |
| bool Contains( object item)                        | MyArrayList에 요소가 있는지 여부를 확인합니다.               |
<br>

---------------------------------------
<br>
제네릭 동적배열(List<T>)
===

제네릭(Generic) 동적 배열
---

- C#은 Object가 모든 데이터를 다룰 수 있도록 하기 위해 모든 데이터 형식이 자동으로 Object 형식을 상속 받는다.

  즉, Object는 모든 데이터 형식의 base class가 된다.

- ArrayList의 경우 배열에 저장되는 원소가 Object 이므로 사용시엔 해당 원소의 실제 타입으로 캐스팅을 해야하는 번거로움이 발생한다.

  또한, 배열에 저장되는 원소가 참조형(Reference)이 아닌 밸류형(값 형식 - int, decimal, char 등...)인 경우 읽고 쓰는 과정에서 Boxing과 Unboxing이 일어난다.

- 일반적으로 <T> 라고 명시하는데, 기존에 C++에서는 Template라고 불려서 맨앞글자를 따서 T라고 명시하게 됨(다른문자가 들어가도 상관X)

  

타입 캐스팅과 Boxing, UnBoxing의 이해
---

- 박싱(Boxing)

  - Value형 객체가 Objet로 캐스팅되는 과정
  - 값 형식을 참조형식으로 변환
  - 박싱 과정 
    1. 값 타입을 힙에 생성하기 위해 메모리를 힙 영역에 생성
    2. 값을 힙 영역에 할당된 메모리로 복사 
    3. 참조할 변수에 할당된 메모리 주소를 할당 

- 언박싱(Unboxing)

  - Object 객체가 실제 Value형 객체로 캐스팅되는 과정 (명시적 캐스팅) 
  - 참조형식을 값형식으로 변환  
  - 언박싱 과정
    1. 박싱값인지 확인
    2. 박싱된 값이라면 값 타입 변수에 복사
    3. 박싱한 메모리와 언박싱한 메모리 2개 존재 ( 가비지 발생 )  

```
MyArrayList myAL = new MyArrayList();

myAL.Add(100);    // int -> object로 형변환되는 과정에서 자동으로 boxing이 일어남
int x = (int)myAL[0];    // unboxing됨
```

- 박싱/언박싱은 성능 저하의 원인이 된다.

  - 박싱에서는 단순 참조 할당보다 20배의 속도가 더 소요된다.
  - 언박싱에서는 단순 참조 할당보다 4배에 달하는 시간이 소요된다.
  - 배열에 밸류형 원소를 루프(for, while)를 돌면서 반복적으로 쓰거나 읽는 경우 자동으로 박싱과 언박싱이 일어나게되고 캐스팅되는 과정에서 임시로 만들어진 쓰레기 Object 객체들이 쌓이게 되고 이에 의해 의도치 않는 GC가 일어날 확률이 높아진다. 

- 로직을 구현하는 과정에서 자료구조에 동일한 형식의 요소가 저장되는 경우라면 타입 캐스팅이 필요없어 형식 안정성이 보장되고 성능이 높은 제넥릭 클래스를 사용해야 한다. 

  

제네릭 열거자(IEnumerable, IEnumerator) 
---

- IEnumerable, IEnumerator 와 동일한 기능을 수행하는 제네릭 버전의 인터페이스이다. 

```
public interface IEnumerable<T> : IEnumerable
{
   IEnumerator<T> GetEnumerator();
}

public interface IEnumerator<T> : IEnumerator, IDisposable
{
   T Current { get; }     //현재 위치의 요소를 가져오기
}
```

- C#의 foreach 구문을 이용할 경우 컴파일러는 아래와 같이 변경한다.

```
var list = new List<string>();

foreach (string item in list) {
    Console.WriteLine(item);
}

// 컴파일시 아래와 같이 코드가 변경된다.
IEnumerable<string> x = list as IEnumerable<string>;
IEnumerator<string> iterator = x.GetEnumerator();

while (iterator.MoveNext()) {
    string item = iterator.Current;
    Console.WriteLine(item);
}
```

- 그러므로. foreach 구문에 사용되는 원본 컬렉션 객체는 반드시 IEnumerable 인터페이스를 상속하고 있거나 GetEnumerator() 메소드가 구현되어 있어야 한다. 

```
public class MyList<T> : IEnumerable<T>
{
    public IEnumerator<T> GetEnumerator()
    {
        return new MyListEnumerator(this);
    }

    // IEnumerable<T> 인터페이스는 IEnumerable에서 상속되었으므로 IEnumerable 인터페이스에 대한 구현도 해줘야 한다.
    // 파라메터가 동일한 중복된 이름의 GetEnumerator() 메소드가 2개 있을 수 없으므로 IEnumerable 인터페이스의 메소드임을 명시해준다.
    IEnumerator IEnumerable.GetEnumerator()
    {
        return this.GetEnumerator();
    }

    // 내부에서만 사용가능하게 private 중첩 객체로 구현함.
    // 호출하는 쪽은 IEnumerator<T> 인터페이스를 사용하기 때문에 MyListEnumerator<T>를 밖으로 노출 할 이유가 없다.
    private class MyListEnumerator : IEnumerator<T>
    {
        private MyList<T> _list;
        private T _current;
        private int _index;

        public MyListEnumerator(MyList<T> list)
        {
            this._list = list;
            this._index = 0;   
            this._current = default(T);
        }

        // TODO... IEnumerator, IDisposable 에서 상속되므로 해당 인터페이스에 정의된 내용을 모두 구현 해줘야 한다.

    }
}
```

- Quiz
  - IDisposable 을 상속받아 Dispose()를 구현하는 이유는 무엇인가요?

  using을 사용하려면 반드시 disposable이 구현되어있어야한다.
  파일을 가져오고 닫아줘야하는데 그러지 못한 경우,
  using을 사용하면 error가 나도 자원을 해제시켜주기 위한 함수.

  결국 dispose는 자원을 해제하기 위한 함수이다.

과제(1시간 30분)
---

- C# 제네릭 클래스 형태의 [List](https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.generic.list-1?view=netframework-4.7.2)와 동일한 MyList<T>를 구현하시오. 
  - 제네릭 클래스 구현을 통해 제네릭 문법에 대한 이해와 사용법을 학습한다. 
  - 타입 캐스팅의 불편함과 성능문제, 제네릭 클래스의 필요성에 대해 이해한다. 
  - 열거자(IEnumerable, IEnumerator 인터페이스)에 대한 이해와 구현을 통해 용도와 사용법을 학습한다.  

- C#에서는 Object가 아닌 실제 요소의(제네릭 - Generic) 형식을 지정 할 수 있는 동적 배열을 표준 라이브러리에서 List<T>로 제공한다.

  더 자세한 사항은 [공식문서](https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.generic.list-1?view=netframework-4.7.2)를 참조.

```
public static void Main()  
{
    // Creates and initializes a new MyArrayList.
    MyList<string> myAL = new MyList<string>();


    myAL.Add("Hello");
    myAL.Add("C#");
    myAL.Add("World");
    myAL.Add("!\r\n");

    Console.WriteLine(myAL.IndexOf("WORLD"));
    Console.WriteLine(myAL.IndexOf("World"));

    myAL.Remove("C#");

    foreach (var item in myAL) {
        Console.WriteLine(item);
    }

    Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록
}
```



생성자

| Creator                 | Explain                                                      |
| ----------------------- | ------------------------------------------------------------ |
| MyList<T>()             | 비어 있는 상태에서 기본 초기 용량(4)을 가지는 MyList<T> 클래스의 새 인스턴스를 초기화합니다. |
| MyList<T>(int Capacity) | 비어 있는 상태에서 지정한 초기 용량을 가지는 [MyList](https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.generic.list-1?view=netframework-4.7.2) 클래스의 새 인스턴스를 초기화합니다. |

속성

| Properties         | Explain                                                      |
| ------------------ | ------------------------------------------------------------ |
| int Count          | MyList<T>에 포함된 요소 수를 가져옵니다.                     |
| T Item[ int index] | 지정한 인덱스에 있는 요소 T를 가져오거나 설정합니다.         |
| int Capacity       | 크기를 조정하지 않고 내부 데이터 구조가 보유할 수 있는 전체 요소 수를 가져오거나 설정합니다. |

메서드

| Method                                                  | Explain                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| void AddRange(IEnumerable<T> collection)                | 지정된 컬렉션의 요소를 MyList<T>의 끝에 추가합니다.          |
| void Clear()                                            | MyList<T>에서 모든 요소를 제거합니다.                        |
| bool Contains(T item)                                   | MyList<T>에 요소가 있는지 여부를 확인합니다.                 |
| void CopyTo(T[] array)                                  | 대상 배열의 처음부터 시작하여 전체 MyList<T>을 호환되는 1차원 배열에 복사합니다. |
| void CopyTo(T[] array, int arrayIndex)                  | 대상 배열의 지정된 인덱스에서 시작하여 전체 MyList<T>을 호환되는 1차원 배열에 복사합니다. |
| int IndexOf(T item)                                     | 지정된 개체를 검색하고, 전체 MyList<T>에서 처음으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| int IndexOf(T item, int index)                          | 지정된 개체를 검색하고, 지정된 인덱스에서 마지막 요소로 확장하는 MyList<T>의 요소 범위에서 처음으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| int IndexOf(T item, int index, int count)               | 지정된 개체를 검색하고, 지정된 인덱스에서 시작하여 지정된 수의 요소를 포함하는 MyList<T>의 요소 범위에서 처음으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| void Insert( int index, T item)                         | MyList<T>의 지정된 인덱스에 요소를 삽입합니다.               |
| void InsertRange( int index, IEnumerable<T> collection) | MyList<T>의 지정된 인덱스에 컬렉션의 요소를 삽입합니다.      |
| int LastIndexOf(T item)                                 | 지정된 개체를 검색하고 전체 MyList<T>에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| int LastIndexOf(T item,int index)                       | 지정된 개체를 검색하고, 첫 번째 요소에서 지정된 인덱스로 확장하는 MyList<T>의 요소 범위에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| int LastIndexOf(T item, int index, int count)           | 지정된 개체를 검색하며, 지정된 수의 요소를 포함하고 지정된 인덱스에서 끝나는 [MyList](https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.generic.list-1?view=netframework-4.7.2)의 요소 범위에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| bool Remove(T item)                                     | MyList<T>에서 맨 처음 발견되는 특정 개체를 제거합니다.       |
| void RemoveAt(int index)                                | MyList<T>의 지정된 인덱스에 있는 요소를 제거합니다.          |
| void RemoveRange( int index, int count                  | MyList<T>에서 요소의 범위를 제거합니다.                      |
| T[] ToArray()                                           | MyList<T>의 요소를 새 배열에 복사합니다.                     |
| IEnumerator<T> GetEnumerator()                          | MyList<T>를 반복하는 열거자를 반환합니다.                    |
| void Add(T item)                                        | 개체를 MyList<T>의 끝 부분에 추가합니다.                     |


<br><br>
주석들은 푸시하기전에 지워주기.