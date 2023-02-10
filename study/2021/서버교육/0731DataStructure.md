형식 같음 비교자 인터페이스
===

 IEqualityComparer 인터페이스의 이해
 ---

- 이 인터페이스는 사용자정의 객체의 Equals ,GetHashCode 함수를 제공한다. 
- string 의 경우 기본적으로 immutable(불변) 객체이다. 따라서 Concat(), ToUpper() 등등 string을 반환하는 함수를 사용하게 되면 내부적으로 또다른 string 객체가 생성되게 된다.(메모리 낭비가 있을 수 있으므로 주의)
- 때문에 string 내부에서는 대소문자 비교등을 위해 StringComparison 을 매개변수로 받는 equals, compare 함수가 존재하며 내부적으로는 EqualityComparer 을 사용해서 비교연산을 해주고 있음을 확인 할 수 있다.

- Quiz. string을 더해야 하는 로직이 존재할경우 어떻게 해줘야할까?
    * stringBuilder를 사용하기.
    * 코어에 자체 함수가 구현되어있음.
```
 public bool Equals(string value, StringComparison comparisonType)
        {
            if ((comparisonType < StringComparison.CurrentCulture) || (comparisonType > StringComparison.OrdinalIgnoreCase)) {
                throw new ArgumentException(Environment.GetResourceString("NotSupported_StringComparison"), "comparisonType");
            }
            if (this == value) {
                return true;
            }
            if (value == null) {
                return false;
            }
            switch (comparisonType) {
                case StringComparison.CurrentCulture:
                    return (CultureInfo.CurrentCulture.CompareInfo.Compare(this, value, CompareOptions.None) == 0);

                case StringComparison.CurrentCultureIgnoreCase:
                    return (CultureInfo.CurrentCulture.CompareInfo.Compare(this, value, CompareOptions.IgnoreCase) == 0);

                case StringComparison.InvariantCulture:
                    return (CultureInfo.InvariantCulture.CompareInfo.Compare(this, value, CompareOptions.None) == 0);

                case StringComparison.InvariantCultureIgnoreCase:
                    return (CultureInfo.InvariantCulture.CompareInfo.Compare(this, value, CompareOptions.IgnoreCase) == 0);

                case StringComparison.Ordinal:
                    return ((this.Length == value.Length) && EqualsHelper(this, value));

                case StringComparison.OrdinalIgnoreCase:
                    if (this.Length == value.Length) {
                        if (this.IsAscii() && value.IsAscii()) {
                            return EqualsIgnoreCaseAsciiHelper(this, value);
                        }
                        return (TextInfo.CompareOrdinalIgnoreCase(this, value) == 0);
                    }
                    return false;
            }
            throw new ArgumentException(Environment.GetResourceString("NotSupported_StringComparison"), "comparisonType");
        }
```

- C#은 이 인터페이스를 위해 [EqualityComparer](https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.generic.equalitycomparer-1?view=netframework-4.7.2) 클래스를 기본적으로 추상화해 놓았으며, [StringComparer](https://docs.microsoft.com/ko-kr/dotnet/api/system.stringcomparer?view=netframework-4.7.2) 클래스는 문자열(String) 형식을 위해 미리 구현해놓은 Class 이다.

  IEqualityComparer<T>를 직접 구현하는 것 보다는 EqualityComparer<T> 클래스를 상속하는 것을 권장하며 EqualityComparer<T>.Default 속성은 T 객체에 대해 구현된 기본적인 같음 비교자를 가져온다.

  EqualityComparer<T>.Default 속성에 의해 얻어지는 기본 같음 비교자는 내부적으로 **해당 객체 클래스**의 GetHashCode와 Equals 메소드를 사용한다.

- C# 컬렉션(List, Queue, Stack, HashSet 또는 Dictionary 등)은 내부적으로 값을 비교하거나 해쉬코드를 가져올때 대상 객체의 Equals나 GetHashCode 메소드를 직접 사용하는 대신에  EqualityComparer<T> 클래스를 사용한다.

  C# 컬렉션의 Contains, Remove 또는 List<T>.Index Of메소드 등에서 두 객체가 같은지 비교할 때 해당 인터페이스가 사용되며 정렬 및 순서에 대한 비교를 위해서는 IComparer<T>를 사용해야 한다. 

- 사용자가 구현한 클래스의 GetHashCode와 Equals 메소드를 재정의 하는 것은 **기본동작**을 바꾸는 것이고 IEqualityComparer<T> 인터페이스를 구현한 비교자를 사용하는 것은 **기본동작 이외의 다른 방식**으로  비교 할 필요가 있는 경우에 사용된다.  

- 사용자가 구현한 클래스의 GetHashCode와 Equals 메소드를 재정의 하는 것은 기본동작을 바꾸는 것이고 IEqualityComparer<T> 인터페이스를 구현한 비교자를 사용하는 것은 기본동작 이외의 다른 방식으로  비교 할 필요가 있는 경우에 사용된다. 

  예를들면, string 형식의 기본 비교(Equals) 로직이 대소문자를 구분하는 것으로 구현되어 있는데 대소문자를 구분하지 않고 같은 것으로 비교하고 싶은 경우가 있다.

  이와 같이, 기본 비교 로직을 변경할 수 없을 때 기본 비교 동작을 사용하지 않고 자신이 만든 로직을 이용하여 두개의 객체를 비교하도록 할때 필요한 것이  IEqualityComparer 인터페이스이다.



```
public interface IEqualityComparer<T>
{
    bool Equals(T x, T y);    //지정한 개체가 같은지를 비교한다.
    int GetHashCode (T obj);  //지정한 개체의 해시 코드를 반환한다.
}
```

- 형식 같음 비교자 인터페이스 사용 예제

```
public class Car
{
    public int Year;
    public string Make;

    public Car(int year, string make)
    {
        this.Year = year;
        this.Make = make;
    }
         
    // 기본으로 재 정의한 같음 비교(생산년도가 같으면 제조사가 달라도 같은 차로 인식한다)
    public override bool Equals(object obj)
    {
        Car other = obj as Car;
        return this.Year == other.Year;    // Compare by Year
    }

    // 기본으로 재 정의한 객체를 해싱하는 값(생산년도를 기준으로 해싱하므로 동일한 생산년도가 많은 경우 중복이 된다)
    public override int GetHashCode()
    {
        return Year.GetHashCode();
    }
}

public class CarEqualityComparer : IEqualityComparer<Car>
{        
    // 생산년도와 제조사가 모두 같아야 같은 차로 인식한다
    public bool Equals(Car x, Car y)
    {
        if (x.Year != y.Year) return false;
        if (x.Make != y.Make) return false;
        return true;
    }

    // 생산년도와 제조사 값 모두를 이용하여 해싱코드를 생성한다
    public int GetHashCode(Car obj)
    {
        int hCode = obj.Year.GetHashCode() ^ obj.Make.GetHashCode();
        return hCode.GetHashCode();
    }
}
```

- 형식 같음 비교자 인터페이스를 사용한 구현예제

```

// MyList 구현 로직을 IEqualityComparer를 사용하도록 생성자를 변경
public class MyList<T> : IEnumerable<T>
{
      public MyList(IEqualityComparer<T> equalityComparer = null)
        : this(4, equalityComparer)
    {
    }

    public MyList(int capacity, IEqualityComparer<T> equalityComparer = null)
    {
        this._size = 0;
        this._array = new T[capacity];
        this._equalityComparer = equalityComparer ?? EqualityComparer<T>.Default;
    }

    // IEqualityComparer를 이용한 Contains 구현 예
    public bool Contains(T item)
    {
       for (int index = 0; index < _size; index++) {
           if (_equalityComparer.Equals(_array[index], item))
               return true;
       }
       return false;
    }

    ...
}
```

과제(1시간)
---

- MyList<T> 구현체에 EqualityComparer 를 사용하도록 아래 메소드를 수정하고 사용예를 작성하시오.
  1. 형식 같음 비교자(IEqualityComparer<T> 인터페이스)에 대한 이해와 구현을 통해 용도와 사용법을 학습한다. 
  2. StringEqualityComparer을 만들어서 대소문자 비교할 수 있도록 구현하시오

```
class Program
{
    static void Main()
    {
        var a = new Car(1998, "honda");
        var b = new Car(1997, "hyundae");
        var c = new Car(1998, "toyota");


        Console.WriteLine(a.Equals(b));    //=> false
        Console.WriteLine(a.Equals(c));    //=> true


        var x = new MyList<Car>();
        x.Add(a);
        x.Add(b);
        x.Add(c);
        Console.WriteLine(x.Contains(new Car(1997, "samsung")));    //=> 기본 비교자에 의해 년도만 비교하므로 true


        var y = new MyList<Car>(new CarEqualityComparer());    // 기본 비교자가 아닌 사용자 정의 비교자를 사용하도록 지정한다.
        y.Add(a);
        y.Add(b);
        y.Add(c);
        Console.WriteLine(x.Contains(new Car(1997, "samsung"));    //=> 지정된 사용자 정의 비교자에 의해 년도와 제조사를 비교하므로 false

        Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록
    }
}

public class StringEqualityComparer : EqualityComparer<string>
    {
        public override bool Equals(string x, string y)
        {
            TODO....
        }

        public override int GetHashCode(string obj)
        {
            return 0;
        }
    }
```

아래에서 사용하는 Equals를 모두 수정하시오.

| Method                                        | Explain                                                      |
| --------------------------------------------- | ------------------------------------------------------------ |
| bool Contains( T item)                        | MyList에 요소가 있는지 여부를 확인합니다.                    |
| int IndexOf( T item)                          | 지정한 Object를 검색하고, 전체 MyList 내에서 처음 나오는 0부터 시작하는 인덱스를 반환합니다. |
| int IndexOf( T item, int index)               | 지정된 Object를 검색하고, 지정된 인덱스부터 마지막 요소까지 포함되는MyList의 요소 범위에서 처음 나오는 0부터 시작하는 인덱스를 반환합니다. |
| int IndexOf(T item, int index, int count)     | 지정된 Object를 검색하고, 지정된 인덱스부터 시작하여 지정된 수의 요소를 포함하는MyList의 요소 범위에서 처음 나오는 0부터 시작하는 인덱스를 반환합니다. |
| int LastIndexOf(T item)                       | 지정된 개체를 검색하고 전체MyList에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| int LastIndexOf(T item,int index)             | 지정된 개체를 검색하고, 첫 번째 요소에서 지정된 인덱스로 확장하는MyList의 요소 범위에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| int LastIndexOf(T item, int index, int count) | 지정된 개체를 검색하며, 지정된 수의 요소를 포함하고 지정된 인덱스에서 끝나는MyList의 요소 범위에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다. |
| void Remove(T item)                           | MyList에서 맨 처음 발견되는 특정 개체를 제거합니다.          |
<br><br>

------------------------------------------------------
<br>
크고/작음 비교자 인터페이스의 이해
===

IComparable 인터페이스의 이해
 ---

- IComparable 인터페이스는 대상 객체의 기본적인 비교를 제공한다.    
  - CompareTo를  정의 해줘야 하며, 기본적으로 Sort 함수에서는 해당 IComparer 를 통해 정렬한다.
- C#에 정의되어 있는 기본 형식들은(int, decimal, string등..)  
- IComparable 인터페이스를 기본적으로 구현하고 있어서 대상 객체간의 기본적인 비교가 가능하다. 

```
public interface IComparable<T>
{
    int CompareTo(T other);    //현재 객체와 다른 객체를 비교하여 작거나, 같거나 또는 크다는 것을 나타내는 값을 반환
}
```

```

public class Car : IComparable<Car>
{
    public int Year;
    public string Make;

    public int CompareTo(Car other)
    {
        return this.Year - other.Year;    // Ascending by Year
    }
}
```

- 위의 Car와 같은 사용자 정의 객체를 정렬 또는 비교하는 기능을 제공 하려는 경우  IComparable 인터페이스에서 상속받은 후 기본으로 비교하려는 값으로 CompareTo 메소드를 정의하면 된다. 



IComparer 인터페이스의 이해
---

- IEqualityComparer 와 유사

- IComparer 인터페이스는 대상 객체의 사용자 정의 비교를 제공한다.    

- CompareTo를 재정의 해줘야 하며,  비교연산을 도와주는 조력자 역활을 한다.

- IComparer 인터페이스는 List<T>.Sort 또는 List<T>.BinarySearch 메소드 등에서 사용되며 컬렉션의 정렬 순서를 사용자가 지정하는 방법을 제공 

- IComparer 인터페이스는 List<T>.Sort 또는 List<T>.BinarySearch 메소드 등에서 사용되며 컬렉션의 정렬 순서를 사용자가 지정하는 방법을 제공한다.

  C#은 이 인터페이스를 위해 [Comparer](https://docs.microsoft.com/ko-kr/dotnet/api/system.collections.generic.comparer-1?view=netframework-4.7.2) 클래스를 기본적으로 추상화해 놓았으며, [StringComparer](https://docs.microsoft.com/ko-kr/dotnet/api/system.stringcomparer?view=netframework-4.7.2) 클래스는 문자열(String) 형식을 위해 해당 인터페이스를 구현한 것이다.

  IComparer<T>를 직접 구현하는 것 보다는 Comparer<T> 클래스를 상속하는 것을 권장하며 Comparer<T>.Default 속성은 T 객체에 대해 구현된 기본 비교자를 가져온다.

  Comparer<T>.Default 속성에 의해 구해진 기본 비교자는 T 객체가 IComparable 인터페이스를 구현했다면 CompareTo 메소드를 이용하여 기본 비교 동작을 수행한다. 

- int 형식을 저장하고 있는 배열이 있고 해당 배열의 Sort 메서드를 호출 할 경우 정렬하는 과정에서 각 숫자를 비교하는 기본 동작을 제공한다.

  그런데, int 형식의 기본 비교 로직은 IComparable 인터페이스를 상속하여 CompareTo 메소드를 내림차순으로 구현하고 있는데 오름차순으로 정렬하고 싶은 경우가 있다.

  이와 같이, 기본 비교 로직을 변경할 수 없을 때 기본 비교 로직을 사용하지 않고 자신이 만든 비교 로직을 이용하여 두개의 객체를 비교하기 위해 필요한 것이  IComparer 인터페이스이다.

```
public interface IComparer<T>
{
    int Compare(T x, T y);   //두 객체를 비교하여 한 개체가 다른 개체보다 작거나, 같거나 또는 크다는 것을 나타내는 값을 반환
}
```

```
ex ) ArrayList에서 제공하는 Sort Method

public virtual void Sort()
{
    this.Sort(0, this.Count, Comparer.Default);
}
 
public virtual void Sort(IComparer comparer)
{
    this.Sort(0, this.Count, comparer);
}

public virtual void Sort(int index, int count, IComparer comparer)
{
    if (index < 0)
    {
        throw new ArgumentOutOfRangeException("index", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
    }
    if (count < 0)
    {
        throw new ArgumentOutOfRangeException("count", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
    }
    if ((this._size - index) < count)
    {
        throw new ArgumentException(Environment.GetResourceString("Argument_InvalidOffLen"));
    }
    Array.Sort(this._items, index, count, comparer);
    this._version++;
}


ex) Array 에서 제공하는 Sort
[ReliabilityContract(Consistency.MayCorruptInstance, Cer.MayFail), __DynamicallyInvokable]
public static void Sort(Array array, int index, int length, IComparer comparer)
{
    Sort(array, null, index, length, comparer);
}

[SecuritySafeCritical, ReliabilityContract(Consistency.MayCorruptInstance, Cer.MayFail), __DynamicallyInvokable]
public static void Sort(Array keys, Array items, int index, int length, IComparer comparer)
{
    if (keys == null)
    {
        throw new ArgumentNullException("keys");
    }
    if ((keys.Rank != 1) || ((items != null) && (items.Rank != 1)))
    {
        throw new RankException(Environment.GetResourceString("Rank_MultiDimNotSupported"));
    }
    if ((items != null) && (keys.GetLowerBound(0) != items.GetLowerBound(0)))
    {
        throw new ArgumentException(Environment.GetResourceString("Arg_LowerBoundsMustMatch"));
    }
    if ((index < keys.GetLowerBound(0)) || (length < 0))
    {
        throw new ArgumentOutOfRangeException((length < 0) ? "length" : "index", Environment.GetResourceString("ArgumentOutOfRange_NeedNonNegNum"));
    }
    if (((keys.Length - (index - keys.GetLowerBound(0))) < length) || ((items != null) && ((index - items.GetLowerBound(0)) > (items.Length - length))))
    {
        throw new ArgumentException(Environment.GetResourceString("Argument_InvalidOffLen"));
    }
    if ((length > 1) && (((comparer != Comparer.Default) && (comparer != null)) || !TrySZSort(keys, items, index, (index + length) - 1)))
    {
        object[] objArray = keys as object[];
        object[] objArray2 = null;
        if (objArray != null)
        {
            objArray2 = items as object[];
        }
        if ((objArray != null) && ((items == null) || (objArray2 != null)))
        {
            new SorterObjectArray(objArray, objArray2, comparer).Sort(index, length);
        }
        else
        {
            new SorterGenericArray(keys, items, comparer).Sort(index, length);
        }
    }
}
```

과제(1시간)
---

1. MyList<T> 구현체에 BinarySearch, Sort 메소드를 구현하고 검색/정렬된 정보가 출력되도록 사용예를 작성하시오. 
   - 기본 형식 크고/작음 비교자(IComparable<T> 인터페이스)에 대한 이해와 구현을 통해 용도와 사용법을 학습한다. 
   - 사용자 지정 크고/작음 비교자(IComparer<T> 인터페이스)에 대한 이해와 구현을 통해 용도와 사용법을 학습한다. 
2. Car 객체 내부의 값이 문자열로 출력될 수 있도록 Car객체의 ToString() 메소드를 재정의하시오. **(예: return string.Format("{0}: {1}", Year, Make);)** 



- [형식 크고/작음 비교자(IComparer<T>) 이용한 검색/정렬 구현]  

```
public int BinarySearch(T item)
{
    BinarySearch(item, Comparer<T>.Default);
}

public int BinarySearch(T item, IComparer<T> comparer)
{
    return Array.BinarySearch<T>(_array, 0, _size, item, comparer);
}

public void Sort()
{
    Sort(Comparer<T>.Default);
}

public void Sort(IComparer<T> comparer)
{
    Array.Sort<T>(_array, 0, _size, comparer);
}
```

```
class Program
{
    static void Main()
    {
        // 형식 비교자를 사용하는 경우와 그렇지 않는 경우의 사용예제
        var list = new MyList<Car>();

        list.Add(new Car(1992, "Ford"));
        list.Add(new Car(1999, "Buick"));
        list.Add(new Car(1997, "Honda"));

        list.Sort();   //=> Sorted by Year (Ascending - IComparable 사용)
        foreach (var item in list) {
            Console.WriteLine(item);  //=> Car 객체 내부의 값이 문자열로 출력될 수 있도록 Car객체의 ToString() 메소드를 재정의해야 함.
        }

        list.Sort(new YearDescendingComparer());  //=> Sorted by Year (Descending - IComparer 사용)
        foreach (var item in list) {
            Console.WriteLine(item);
        }

        list.Sort(new MakeAscendingComparer());   //=> Sorted by Make (Ascending  - IComparer 사용)
        foreach (var item in list) {
            Console.WriteLine(item);
        }

        Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록
    }
}
```



| Method                                          | Explain                                                      |
| ----------------------------------------------- | ------------------------------------------------------------ |
| int BinarySearch(T item)                        | 기본 비교자를 사용하여 정렬된 전체 MyList<T>에서 요소를 검색하고 요소의 인덱스(0부터 시작)를 반환합니다. |
| int BinarySearch(T item, IComparer<T> comparer) | 지정된 비교자를 사용하여 정렬된 전체 MyList<T>에서 요소를 검색하고 요소의 인덱스(0부터 시작)를 반환합니다. |
| void Sort()                                     | 기본 비교자를 사용하여 전체 MyList<T>의 요소를 퀵정렬을 이용하여 정렬합니다. |
| void Sort(IComparer<T> comparer)                | 지정된 비교자를 사용하여 전체 MyList<T>에 있는 요소를 퀵정렬을 이용하여 정렬합니다. |

<br><br>

----------------------
<br>
동적배열 심화
===

Action<T> Delegate
---

- 리턴값이 없는 Void 함수에 사용되는 Delegate
- 파라미터 수에 따라 0~16개까지 미리 정의되어져 있다.

```
// C# 정의
public delegate void Action<T>(T obj);
public delegate void Action<T1, T2>(T1 arg1, T2 arg2);
public delegate void Action<T1, T2, T3>(T1 arg1, T2 arg2, T3 arg3);
...
```

```
private static void Print(string s)
{
    Console.WriteLine(s);
}

static void Main()
{
    List<String> naesm = new List<String>();
    names.Add("Bruce");
    names.Add("Alfred");
    names.Add("Tim");

    // Usage 1 - 명시적으로 정의된 콜백 함수를 지정한 경우
    names.ForEach(Print);

    // Usage 2 - Body가 없는 람다식을 사용하는 경우
    names.ForEach((name) => Console.WriteLine(name));

    // Usage 3 - Body가 있는 람다식을 사용하는 경우
    names.ForEach((name) => {
        Console.WriteLine(name);
    });
}
```

- Body가 없는 람다식의 경우 여러줄을 사용할 수 없다.
- 컴파일 시 2,3번은 1과 같은 로직으로 변경된다.
- Argument가 1개일 경우에는 매개변수에 ()로 감싸지 않아도 된다.
  - ex)  names.ForEach(name => Console.WriteLine(name));



Func<T,TResult> Delegate
---

- 반드시 리턴값이 존재하는 Delegate
- 파라미터중에 가장 마지막 Argument로 반환형을 넣어준다.
- 일반적으로 리턴값은 TResult라고 넣어준다. T매개변수와 구분하기 위함
  - ex) Func<T1,T2.....TResult>
- Action과 마찮가지로 파라미터 수에 따라 0~16개까지 미리 정의되어져 있다.

```
// C# 정의
public delegate TResult Func<TResult>();
public delegate TResult Func<T, TResult>(T arg);
public delegate TResult Func<T1, T2, TResult>(T1 arg1, T2 arg2);
...

```

```
private static string ToMakeUpper(string s)
{
    return s.ToUpper();
}

static void Main()
{
    List<String> names = new List<String>();
    names.Add("orange");
    names.Add("apple");
    names.Add("Article");

    // Usage 1 - 명시적으로 정의된 콜백 함수를 지정한 경우
    Enumerable<string> aWords = names.Select(ToMakeUpper);

    // Usage 2 - Body가 없는 람다식을 사용하는 경우
    aWords = names.Select((name) => name.ToUpper());

    // Usage 3 - Body가 있는 람다식을 사용하는 경우
    aWords = names.Select((name) => {
        return name.ToUpper();
    });
    
    // Output the results to the console.
    foreach (string word in aWords)
        Console.WriteLine(word);
}

/*
This code example produces the following output:
            
   ORANGE
   APPLE
   ARTICLE
*/
```

- Body가 없는 람다식의 경우 여러줄을 사용할 수 없다.
- 컴파일 시 2,3번은 1과 같은 로직으로 변경된다.
- Argument가 1개일 경우에는 매개변수에 ()로 감싸지 않아도 된다.
  - ex)  aWords = names.Select(name => name.ToUpper());



Predicate<T> Delegate
---

- 리턴형이 반드시 bool 이고 입력값이 T타입인 Delegate
- Action이나 Func와 달리 입력파라미터는 반드시 1개
- Predicate<T>는 실제로 Func<T, bool>과 같이 표현할 수 있다.  
- .net Array나 List 클래스 메서드에서 주로 사용된다

```
// C# 정의
public delegate bool Predicate<T>(T obj);
```

```
private static bool FindPoints(Point obj)
{
    return obj.X * obj.Y > 100000;
}

public static void Main()
{
    // Create an array of Point structures.
    Point[] points = { new Point(100, 200),
                       new Point(150, 250),
                       new Point(250, 375),
                       new Point(275, 395),
                       new Point(295, 450) };
                     
    // Array.Find 메소드에 대리자(콜백)를 지정하여 사용하는 방식 예제
    Point first = Array.Find(points, FindPoints);

    // Display the first structure found.
    Console.WriteLine("Found: X = {0}, Y = {1}", first.X, first.Y);           

    // Array.Find 메소드에 람다식을 사용하는 방식 예제
    first = Array.Find(points, (x) => x.X * x.Y > 100000);
    Console.WriteLine("Found: X = {0}, Y = {1}", first.X, first.Y);  

    // 또는 Body가 있는 람다식 사용하는 방식 예제
    first = Array.Find(points, (x) => {
        return x.X * x.Y > 100000;
    });
    Console.WriteLine("Found: X = {0}, Y = {1}", first.X, first.Y);  
}
```



확장함수
---

- 특수한 종류의 static 메서드로서 다른 클래스의 인스턴스 메서드인 것처럼 사용할 수 있다.

- static 클래스안에 static 메서드로 구현된다.

- static 메서드에서 첫번재 인수는 this T 를 받아야 한다.

- 확장함수의 장점

  - Interface나 추상 클래스를 확장함수로 만들어 놓으면 해당 Interface나 추상클래스를 상속받는 모든 클래스에 한번에 적용할 수 있다.
  - Throw 시 예외처리를 한곳에서 할 수 있다.

  ```
  MyList<string> x = null;
  x.ForEach(a => Console.WriteLine(a));
  --> 컴파일시 아래와 같이 소스가 변경되어 실행된다
  MyListExtensions.ForEach(x, a => Console.WriteLine(a));
  
  때문에 x값이 null이라고 하더라도 x.ForEach에서 에러가 발생하지 않으며,
  확장 클래스 MyListExtensions 안에 있는 확장메서드 ForEach에서 예외처리가 가능하다.
  ```

- MyList 확장함수 구현의 예

```
public static T Find<T>(this MyList<T> list, Predicate<T> match)
{
        int index = list.FindIndex(0, list.Count, match);
        // TODO: 구해진 인덱스로 배열에 저장되어 있는 값을 리턴한다

        return default(T);
}

public static int FindIndex<T>(this MyList<T> list, int startIndex, int count, Predicate<T> match)
{
        if (startIndex > list.Count)
            throw new ArgumentOutOfRangeException();
        if (count < 0 || startIndex > list.Count - count)
            throw new ArgumentOutOfRangeException();

        int num = startIndex + count;
        for (int index = startIndex; index < num; index++) {
            if (match(list[index]))
                return index;
        }

        return -1;
}

public static MyList<T> FindAll<T>(this MyList<T> list, Predicate<T> match)
{
        MyList<T> objList = new MyList<T>();

        for (int index = 0; index < list.Count; index++) {
            // TODO: 콜백함수를 호출하여 결과가 참이면 리턴할 목록에 추가한다.
        }

        return objList;
}

public static void ForEach<T>(this MyList<T> list, Action<T> action)
{
        for (int index = 0; index < list.Count; index++) {
            // TODO: 콜백함수를 호출한다
        }
}

```



과제
---

- MyList<T> 클래스에 콜백을 사용하는 메소드를 구현하시오. 

  - 콜백 메소드의 구현을 통해 문법적인 이해와 사용법을 학습한다. 

  - 람다식에 대한 이해와 사용법을 학습한다.

    

콜백 메소드(CallBack Methods)

| Method                                                       | Explain                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| T Find(Predicate<T> match)                                   | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하고 전체 MyList<T>에서 처음으로 검색한 요소를 반환합니다. |
| MyList<T> FindAll(Predicate<T> match)                        | 지정한 조건자에 정의된 조건과 일치하는 모든 요소를 검색합니다. |
| int FindIndex(int startIndex, int count, Predicate<T> match) | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하고 지정된 인덱스부터 시작하여 지정된 수의 요소를 포함하는 MyList<T>의 요소 범위에서 일치하는 요소 중 첫 번째 요소의 인덱스(0부터 시작)를 반환합니다. |
| int FindIndex(int startIndex, Predicate<T> match)            | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하여 지정된 인덱스에서 마지막 요소로 확장하는 MyList<T>의 요소 범위에서 일치하는 요소 중 첫 번째 요소의 인덱스(0부터 시작)를 반환합니다. |
| int FindIndex(Predicate<T> match)                            | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하여 전체 MyList<T>에서 일치하는 요소 중 첫 번째 요소의 인덱스(0부터 시작)를 반환합니다. |
| int FindLast(Predicate<T> match)                             | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하고 전체 MyList<T>에서 마지막으로 검색한 요소를 반환합니다. |
| int FindLastIndex(int startIndex, int count, Predicate<T> match) | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하여 지정된 수의 요소가 들어 있고 지정된 인덱스에서 끝나는 MyList<T>의 요소 범위에서 일치하는 요소 중 마지막 요소의 인덱스(0부터 시작)를 반환합니다. |
| int FindLastIndex(int startIndex, Predicate<T> match)        | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하여 첫 번째 요소에서 지정된 인덱스로 확장하는 MyList<T>의 요소 범위에서 일치하는 요소 중 마지막 요소의 인덱스(0부터 시작)를 반환합니다. |
| int FindLastIndex(Predicate<T> match)                        | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하여 전체 MyList<T>에서 일치하는 요소 중 마지막 요소의 인덱스(0부터 시작)를 반환합니다. |
| void ForEach(Action<T> action)                               | MyList<T>의 각 요소에 대해 지정된 작업을 수행합니다.         |
| bool Contains(Predicate<T> match)                            | 지정된 조건자에 정의된 조건과 일치하는 요소가 MyList<T>에 포함되어 있는지 여부를 확인합니다. |
<br>

------------------------------------------
<br><br>
연결리스트(LinkedList)
===


 노드(Node)가 데이터와 포인터를 가지고 연결되어 있는 자료 구조 



연결 리스트의 장단점
---

 -	장점
    -	List와 다르게 메모리상에 연속된 위치에 데이터가 존재하지 않아도 된다. 데이터가 크더라도 메모리상 비연속적인 위치에 존재하기 때문에 메모리에 여유공간이 있으면 배열을 할당 할 수 있다.
    -	삽입/삭제가 간단하다. (리스트 내에서 자료**의** 이동이 필요하지 않다. )
    -	크기가 유동적이다

 - 단점

    -	접근속도가 느리다
    -	알고리즘이 복잡하다
    -	포인터 사용으로 공간낭비가 있다.

단일 연결 리스트(Singly Linked List)
---

각 노드(Node)에 데이터를 담고 있는 공간과 다음 노드(Next)를 가리키는 한개의 포인터를 갖고 있는 자료구조다. 

- LinkedList 는 반드시 head, tail을 가진다.
- 배열의 경우 메모리상 연속적인 위치에 데이터가 존재하지만, LinkedList의 경우 메모리상 비연속적인 위치에 데이터가 존재하기 때문에 시작점, 끝점을 알고 있어야 한다.


과제(2시간)
---

- 제네릭 클래스로 단방향 연결 리스트 MySLinkedList<T>를 구현하시오. 
  1. 제네릭 클래스 구현을 통해 제네릭 문법에 대한 이해와 사용법을 학습한다. 
  2. 단방향 연결리스트의 구현을 통해 값을 저장(보관)하는 노드의 개념과 포인터에 대해 학습한다. 
  3. 역방향 참조 발생시 어떤점이 불편하며 또한 성능에 문제가 있는지 학습을 통해 인지하고 양방향 연결 리스트의 필요성을 이해한다. 

```
public class SLinkedNode<T> {
    public T Data;
    public SLinkedNode<T> Next;

    public SLinkedNode(T data)
    {
        this.Data = data;
    }

    public SLinkedNode(T data, SLinkedNode<T> next)
    {
       this.Data = data;
       this.Next = next;
    }
}

public class MySLinkedList<T> : IEnumerable<T> {
    private SLinkedNode<T> _head;
    private SLinkedNode<T> _tail;
    private IEqualityComparer<T> _equalityComparer;
    private int _size; // 현재 저장된 원소 개수

    public MySLinkedList(IEqualityComparer<T> equalityComparer = null)
    {
        this._equalityComparer = equalityComparer ?? EqualityComparer<T>.Default;
    }


   // PROPERTIES
   //_________________________________________________________________________________________

   public int Count
   {
       get { return _size; }
   }

   public SLinkedNode<T> First
   {
       get { return _head; }
   }

   public SLinkedNode<T> Last
   {
       get { return _tail; }
   }


   // INTERNAL METHODS
   //_________________________________________________________________________________________

    // 현재 노드의 앞에 있는 노드를 리턴하는 함수
    private SLinkedNode<T> GetPrevNode(SLinkedNode<T> node)
    {        
        for (var prevNode = _head; prevNode != null; prevNode = prevNode.Next) {
            if (// Todo...
        }
        return null;
    }


   // METHODS
   //_________________________________________________________________________________________

   public SLinkedNode<T> AddAfter(SLinkedNode<T> node, T data)
   {
       SLinkedNode<T> newNode = new SLinkedNode<T>(data, node.Next);

       if (newNode.Next == null) { 
           // TODO: 마지막에 추가되는 경우라면 tail 값도 변경한다.
       }

       node.Next = newNode;
       _size++;
       
       return newNode;
   }

      public SLinkedNode<T> AddBefore(SLinkedNode<T> node, T data)
   {        
        if (//TODO: 처음에 추가되는 경우라면..) {
            AddFirst(data);
            return _head;
        }

        return //TODO: AddAfter(현재 노드의 이전 노드, data);
   }

      public void AddFirst(T data)
   {
        SLinkedNode<T> newNode = new SLinkedNode<T>(data, _head);

        if (_tail == null) {
            //TODO: TAIL이 null이면 자료구조에 첫 데이터가 추가되는 것이다. 그러므로 HEAD와 TAIL이 같도록 TAIL도 설정한다
        }

        //TODO: HEAD를 새로 만든 노드로 변경한다.  
   }

   public void AddLast(T data)
   {
       SLinkedNode<T> newNode = new SLinkedNode<T>(data);
       if (_tail != null) {
          //TODO: TAIL의 Next를 새로 만들어진 노드를 바라보게 한다
       }
       else {
          //TODO: TAIL이 null이면 자료구조에 첫 데이터가 추가되는 것이다. 그러므로 HEAD와 TAIL이 같도록 HEAD도 설정한다.
       }

       _tail = newNode;
       _size++;
   }

   public bool Contains(T data)
   {
       return Find(data) != null;
   }

   public SLinkedNode<T> Find(T data)
   {
       for (var currNode = _head; currNode != null; currNode = currNode.Next) {
           //TODO: comparer로 비교하여 같다면 현재 노드를 리턴
       }
       return null;
   }

   public void Remove(SLinkedNode<T> node)
   {
       if (node == _head) {
           _head = _head.Next;
           if (_head == null) {
               //TODO: HEAD가 null이면 TAIL도 null로 변경한다
           }
       }
       else {
           // 현재 노드의 이전 노드를 찾는다. 
           var prevNode = GetPrevNode(node);
           if (prevNode != null) {
                //TODO: 이전노드의 NEXT를 현재 삭제되는 노드의 NEXT로 연결한다.
           }
 
           if (node == _tail) {
               //TODO: 마지막(tail)이 삭제되는 경우라면 tail 값도 변경한다.
           } 
       }
       
       _size--;
   }

   public T RemoveFirst()
   {
       T result = default(T);

       if (_head != null) {
           result = _head.Data; 
           Remove(_head);
       }

       return result;
   }

   public T RemoveLast()
   {
       //TODO: ...
   }

   public T[] ToArray()
   {
        T[] objArray = new T[_size];
        int i = 0;

        //TODO: 연결리스트를 순회하며 배열에 값을 복사

        return objArray;
   }


    public IEnumerator<T> GetEnumerator()
    {
        return new MySLinkedListEnumerator(this);
    }

    private class MySLinkedListEnumerator : IEnumerator<T>
    {
        private MySLinkedList<T> _list;
        private SLinkedNode<T> _node;
        private T _current;

        public MySLinkedListEnumerator(MySLinkedList<T> list)
        {
            this._list = list;
            this._node = list.First;
            this._current = default(T);
        }

        public T Current
        {
            get { return _current; }
        }

        public bool MoveNext()
        {
            if (_node != null) {
                //TODO: current와 node를 설정 
                return true;
            }
            return false;
        }

                // TODO...
    }
}
```

```
static void Main()
{
    MySLinkedList<int> list = new MySLinkedList<int>();

    list.AddLast(10);
    list.AddLast(20);
    list.AddLast(30);
    list.AddAfter(list.Find(10), 40);
    list.AddBefore(list.Find(10), 50);
    list.Remove(list.Find(10));
    list.RemoveFirst();


    foreach (var item in list) {
    	Console.WriteLine(item);
    }

    Console.Read();
}
```



| Creator                                                      | Explain                                                     |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| MySLinkedList<T>(IEqualityComparer<T> equalityComparer = null) | 비어 있는 MySLinkedList클래스의 새 인스턴스를 초기화합니다. |

| Properties           | Explain                                            |
| -------------------- | -------------------------------------------------- |
| SLinkedNode<T> First | LinkedList의 첫 번째 노드를 가져옵니다.            |
| SLinkedNode<T> Last  | LinkedList의 마지막 노드를 가져옵니다.             |
| int Count            | LinkedList에 실제로 포함된 노드의 수를 가져옵니다. |

| Method                                                | Explain                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| SLinkedNode<T> AddBefore(SLinkedNode<T> node, T data) | LinkedList의 지정한 기존 노드 앞에 지정한 값이 포함된 새 노드를 추가합니다. |
| void AddFirst(T data)                                 | LinkedList의 시작 위치에 지정한 값이 포함된 새 노드를 추가합니다. |
| void AddLast(T data)                                  | LinkedList의 끝에 지정한 값이 포함된 새 노드를 추가합니다.   |
| void Clear()                                          | LinkedList에서 노드를 모두 제거합니다.                       |
| bool Contains(T data)                                 | 값이 LinkedList에 있는지 여부를 확인합니다.                  |
| bool Contains(Predicate<T> match)                     | 지정된 조건자에 정의된 조건과 일치하는 요소가 LinkedList<T>에 포함되어 있는지 여부를 확인합니다. |
| SLinkedNode<T> Find(T data)                           | 지정한 값이 포함된 노드를 찾습니다.                          |
| SLinkedNode<T> Find(Predicate<T> match)               | 지정된 조건자에 정의된 조건과 일치하는 요소를 검색하고 노드를 반환합니다. |
| IEnumerator<T> GetEnumerator()                        | LinkedList를 반복하는 열거자를 반환합니다.                   |
| void Remove(SLinkedNode<T> node)                      | LinkedList에서 지정된 노드를 제거합니다.                     |
| bool Remove(T data)                                   | LinkedList에서 맨 처음 발견되는 지정된 값을 제거합니다.      |
| T RemoveFirst()                                       | LinkedList의 시작 위치에서 노드를 제거합니다.                |
| T RemoveLast()                                        | LinkedList의 끝에서 노드를 제거합니다.                       |
| T[] ToArray()                                         | LinkedList를 새 배열에 복사합니다.                           |
| SLinkedNode<T> AddAfter(SLinkedNode<T> node, T data)  | LinkedList의 지정한 기존 노드 다음에 지정한 값이 포함된 새 노드를 추가합니다. |
