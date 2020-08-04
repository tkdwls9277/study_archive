딕셔너리(Dictionary)
===


딕셔너리(Dictionary, HashTable) 
---

- 키를 해시함수(Hash Function)을 통해 해싱 후 해열의 인덱스에 값을 저장하는 자료구조
- 해시셋(HashSet)과 동일한 구조
- 해시셋(HashSet)은 Key만 저장하지만, 딕셔너리(Dictionary)는 키(Key)로 해싱한 후 해당 위치에 값(Entry)를 저장


딕셔너리(Dictionary) 사용사례
---

- 키를 이용하여 해당 키에 대응하는 값을 찾을때 사용
- {"김연아":"피겨스케이팅", "류현진":"야구", "박지성":"축구", "귀도":"파이썬"} 



C# 딕셔너리(Dictionary)의 구현
---

- Dictionary는 keyValuePair라는 구조체를 통해 Key와 Value를 보관



과제 (2시간)
---

- C# 제네릭 클래스 형태의 Dictionary(TKey, TValue)와 동일한 MyDictionary<TKey, TValue>를 구현하시오

  - 자료구조의 이해와 구현을 통해 해당 자료구조이 필요성과 사용법을 학습
  - Resizing 구현을 통해 자료구조에 저장되는 데이터 갯수가 많아지더라도 효율적인 검색을 수행하는 방법에 대해 학습

  

```
public class MyDictionary<TKey, TValue> : IEnumerable<KeyValuePair<TKey, TValue>>
{
    private MyLinkedList<KeyValuePair<TKey, TValue>>[] _bucket;
    private IEqualityComparer<TKey> _equalityComparer;
    private int _count;


    public MyDictionary(IEqualityComparer<TKey> equalityComparer = null)
        : this(17, equalityComparer)
    {
    }

    public MyDictionary(int capacity, IEqualityComparer<TKey> equalityComparer = null)
    {
        int size = HashHelpers.GetPrime(capacity);
        this._bucket = new MyLinkedList<KeyValuePair<TKey, TValue>>[size];
        this._equalityComparer = equalityComparer ?? EqualityComparer<TKey>.Default;
    }


    // PROPERTIES
    //_________________________________________________________________________________________

    public int Count
    {
        get { return _count; }
    }

    public TValue this[TKey key]
    {
        get { return GetValue(key, true); }
        set { SetValue(key, value, false); }
    }


    // METHODS
    //_________________________________________________________________________________________
    
    private int GetBucketIndex(TKey key, int bucketSize)
    {        
        int hash = // TODO:EqualityComparer를 이용하여 item을 해싱한 해쉬코드와 버킷(배열)의 크기를 이용하여 해당 인덱스를 구한다.
        return hash % bucketSize;
    }

    private LinkedNode<KeyValuePair<TKey, TValue>> FindEntry(TKey key)
    {
        var list = FindBucketList(key);
        if (list != null) {
            return // TODO:EqualityComparer를 이용하여 list에 key와 같은 항목이 있는지 찾아서 리턴한다.
        }
        return null;
    }

    // 같은 어셈블리(DLL 또는 EXE) 안에 있는 다른 클래스에서만 공개 메소드로 사용 할 수 있도록 접근 제어자를 internal로 정의한다.
    // HashMap 구현시 해당 메소드를 호출하여 사용 할 예정
    internal MyLinkedList<KeyValuePair<TKey, TValue>> FindBucketList(TKey key)
    {
        int index = GetBucketIndex(key, _bucket.Length);
        return _bucket[index];
    }

    // 같은 어셈블리(DLL 또는 EXE) 안에 있는 다른 클래스에서만 공개 메소드로 사용 할 수 있도록 접근 제어자를 internal로 정의한다.
    // HashMap 구현시 해당 메소드를 호출하여 사용 할 예정
    internal TValue GetValue(TKey key, bool raiseError)
    {
        // TODO: 키를 이용하여 해당 LinkedNode를 찾는다.
        // 노드가 없는 경우 오류발생(raiseError) 시키도록 호출된 경우 아래 예외발생
                //   throw new ArgumentException("The key doesn't exist in the Dictionary.", key.ToString());
        // 그렇지 않다면 default(T) 리턴
        
        return node.Data.Value;    // 찾은 노드에 담겨있는 KeyValuePair의 값을(Value) 리턴
    }

    // 같은 어셈블리(DLL 또는 EXE) 안에 있는 다른 클래스에서만 공개 메소드로 사용 할 수 있도록 접근 제어자를 internal로 정의한다.
    // HashMap 구현시 해당 메소드를 호출하여 사용 할 예정
    internal bool SetValue(TKey key, TValue value, bool raiseError)
    {
        // 현재 데이터 개수가 해시 버킷 개수의 125% 가 넘으면 리사이징한다.
        if (_count >= _bucket.Length * HashHelpers.RESIZE_FACTOR) {
            Resize(_bucket.Length + HashHelpers.PRIME_FACTOR);
        }

        int index = GetBucketIndex(key, _bucket.Length);
        var list = _bucket[index];

        if (list == null) {
            // TODO: 해당 버킷에 이미 만들어진 연결리스트가 없다면 새로 만들고 버킷에 할당한다.
        }
        else {
            var node = // TODO: EqualityComparer를 이용하여 list에 key와 같은 중복된 항목이 있는지 찾는다.
            if (node != null) { // 중복된 값이 있는 경우
                if (raiseError) {
                    throw new ArgumentException("An element with the same key already exists in the Dictionary.", key.ToString());
                }

                // 기존에 저장되어 있던 값을 새로 설정되는 값으로 변경한다.
                node.Data = new KeyValuePair<TKey, TValue>(key, value);
                return false;
            }
        }

        // TODO: 연결리스트의 마지막에 해당 항목을 추가하고 카운트값을 하나 늘린다.

        return true;
    }

    public void Add(TKey key, TValue value)
    {
        // SetValue 호출하는 방식으로 재활용
    }

    public bool Remove(TKey key)
    {
        var list = FindBucketList(key);
        if (list != null) {
            // TODO: 연결리스트에서 해당 항목을 찾은 후 있다면
            // 해당 노드를 연결리스트에서 삭제하고 카운트값을 하나 줄인 후 true 리턴.
        }

        return false;
    }

    public bool TryGetValue(TKey key, out TValue value)
    {
        var node = // TODO: 찾고자 하는 키가 저장된 LinkedNode를 찾는다
        if (node != null) {
            value = node.Data.Value;
            return true;
        }

        value = default(TValue);
        return false;
    }


    // IEnumerable 인터페이스 구현
    IEnumerator IEnumerable.GetEnumerator()
    {
        return this.GetEnumerator();
    }

    public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
    {
        return new MyDictEnumerator(this);
    }

    // NESTED Helper Class
    //_________________________________________________________________________________________

    private class MyDictEnumerator : IEnumerator<KeyValuePair<TKey, TValue>>
    {
        protected MyDictionary<TKey, TValue> _dict;
        protected IEnumerator<KeyValuePair<TKey, TValue>> _iterator;
        protected int _index;

        public MyDictEnumerator(MyDictionary<TKey, TValue> dict)
        {
            this._dict = dict;
            this._index = 0;
            this._iterator = FindNextEnumerator();
        }

        protected IEnumerator<KeyValuePair<TKey, TValue>> FindNextEnumerator()
        {
            // TODO: 현재 인덱스가 딕셔너리의 버킷배열의 크기보다 작을때까지 반복한다.
            // 버킷배열에 할당된 연결리스트를 가져온 후 현재 인덱스를 하나 증가시킨다.
            // 연결리스트가 존재하고 리스트에 추가되어 있는 항목의 갯수가 0보다 크다면
            // 연결리스트의 GetEnumerator() 결과를 리턴한다.

            return null;
        }

        public bool MoveNext()
        {
            // _iterator가 null이 아니고 _iterator의 MoveNext() 결과값이 false 일때까지
            // FindNextEnumerator를 호출하여 다음 버킷에 있는 연결리스트를 찾는다.
            while (TODO:..) {

            }
            
            return _iterator != null;
        }
        
     // TODO:...
         
    }    
}
```



```
static void Main()
    {
        var x = new MyDictionary<string, string>(3);    // 초기 크기를 3으로 시작해서 중간에 Resizing이 되도록 테스트 한다.
        x.Add("10", "101010");
        x.Add("2", "222222");
        x.Add("30", "303030");
        x.Add("4", "444444");
        x.Add("50", "505050");
        x.Add("30", "808080");    //=> 예외발생. 이미 중복된 값이므로 오류가 발생한다.
        x["30"] = "808080";       //=> 추가가 아닌 해당 키에 대한 값을 설정하는 것이므로 오류없이 값을 변경한다.
        x.Remove("2");

        Console.WriteLine(x["80"]);    //=> 예외발생. 추가되지 않은 키로 검색했으로 오류가 발생한다.

        string result = null;
        if (x.TryGetValue("80", out result)) {    //=> 추가되지 않은 키로 검색해도 오류가 발생하지 않는다.
            Console.WriteLine(result);
        }

        foreach (var item in x) {
            Console.WriteLine(string.Format("{0} = {1}", item.Key, item.Value));
        }

        Console.Read();
    }
}
```

 

| Creator                                                      | Explain                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Dictionary<TKey,TValue>(int capacity, IEqualityComparer<TKey> equalityComparer = null) | 기본 초기 용량을 갖고 있고 지정된 Dictionary<TKey,TValue>을 사용하는 비어 있는 IEqualityComparer<T>클래스의 새 인스턴스를 초기화합니다. |
| Dictionary<TKey,TValue>(IEqualityComparer<TKey> equalityComparer = null) | 기본 초기 용량을 갖고 있고 키 형식에 대한 기본 같음 비교자를 사용하는 비어 있는 Dictionary<TKey,TValue> 클래스의 새 인스턴스를 초기화합니다. |

| Properties            | Explain                                                      |
| --------------------- | ------------------------------------------------------------ |
| TValue Item[TKey key] | 지정된 키에 연결된 값을 가져오거나 설정합니다.               |
| int Count             | Dictionary<TKey,TValue>에 포함된 키/값 쌍의 수를 가져옵니다. |

| Method                                                  | Explain                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| void Clear()                                            | Dictionary<TKey,TValue>에서 모든 키와 값을 제거합니다.       |
| bool Contains(TKey key)                                 | Dictionary<TKey,TValue>에 지정한 키가 포함되어 있는지 여부를 확인합니다. |
| IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator() | Dictionary<TKey,TValue>를 반복하는 열거자를 반환합니다.      |
| void Remove(TKey key)                                   | Dictionary<TKey,TValue>에서 지정한 키가 있는 값을 제거합니다. |
| bool TryGetValue(TKey key, out TValue value)            | 지정한 키와 연결된 값을 가져옵니다.                          |
| void Add(TKey key, TValue value)                        | 지정한 키와 값을 사전에 추가합니다.                          |
