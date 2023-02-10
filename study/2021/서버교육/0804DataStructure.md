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
<br><br>

-----------------
딕셔너리(Dictionary) 심화
===

과제 (1시간)
---

- Keys, Values 속성 추가를 통해 추상화와 코드 재사용법에 대해 학습
- MyDicEnumerator 클래스를 추상 클래스로부터 상속받는 구조로 변경하여 코드 재사용에 대해 학습



```
public IEnumerable<TKey> Keys
{
        get { return new MyDictKeyCollection(this); }
}

public IEnumerable<TValue> Values
{
        get { return new MyDictValueCollection(this); }
}

public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
{
        return new MyDictEnumerator(this);
}

```

```
 // IEnumerator<T>를 구현한 추상 클래스
    private abstract class MyDictEnumeratorBase<TCurrent> : IEnumerator<TCurrent>
    {
        protected MyDictionary<TKey, TValue> _dict;
        protected IEnumerator<KeyValuePair<TKey, TValue>> _iterator;
        protected int _index;

        public MyDictEnumeratorBase(MyDictionary<TKey, TValue> dict)
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

        // IDispose
        //_________________________________________________________________________________________
        public void Dispose()
        {
        }

        // IEnumerator
        //_________________________________________________________________________________________
        object IEnumerator.Current
        {
            get { return this.Current; }
        }

        // IEnumerator<T>
        //_________________________________________________________________________________________
        
        public abstract TCurrent Current { get; }

        public bool MoveNext()
        {
            // _iterator가 null이 아니고 _iterator의 MoveNext() 결과값이 false 일때까지
            // FindNextEnumerator를 호출하여 다음 버킷에 있는 연결리스트를 찾는다.
            while (TODO:..) {
                   // 
            }
            
            return _iterator != null;
        }

        // TODO:...
    }

    // MyDictEnumerator 클래스를 MyDictEnumeratorBase 에서 상속하는 구조로 코드를 작성하시오
    private class MyDictKeyEnumerator : MyDictEnumeratorBase<TODO: 리턴되는 CURRENT TYPE>
    {
        // TODO:
    }

```

```
// IEnumerable<T>를 구현한 추상 클래스
    private abstract class MyDictCollectionBase<TCurrent> : IEnumerable<TCurrent>
    {        
         protected MyDictionary<TKey, TValue> _dict;

        protected MyDictCollectionBase(MyDictionary<TKey, TValue> dict)
        {
            this._dict = dict;
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }

        public abstract IEnumerator<TCurrent> GetEnumerator();

    }

    // 키 열거를 위한 객체를 MyDictCollectionBase 에서 상속하는 구조로 코드를 작성하시오
    private class MyDictKeyCollection : MyDictCollectionBase<TODO: 리턴되는 CURRENT TYPE..>
    {
        public MyDictKeyCollection(MyDictionary<TKey, TValue> dict)
            : base(dict)
        {
        }

        public override IEnumerator<TKey> GetEnumerator()
        {
             // TODO: 
        }

        private class MyDictKeyEnumerator : MyDictEnumeratorBase<TODO: 리턴되는 CURRENT TYPE..>
        {
            public MyDictKeyEnumerator(MyDictionary<TKey, TValue> dict)
                : base(dict)
            {
            }

            // TODO: Current
        }
    }

    // 값 열거를 위한 객체를 MyDictCollectionBase 에서 상속하는 구조로 코드를 작성하시오
    private class MyDictValueCollection : MyDictCollectionBase<TODO: 리턴되는 CURRENT TYPE..>
    {
        // TODO: MyDictKeyCollection 참고하여 구현
    }

```

```
class Program
{
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

        Console.WriteLine(x["80"]);    //=> 예외발생. 추가되지 않은 키로 검색했으로 오류가 발생한다.

        string result = null;
        if (x.TryGetValue("80", out result)) {    //=> 추가되지 않은 키로 검색해도 오류가 발생하지 않는다.
            Console.WriteLine(result);
        }

        foreach (var item in x.Keys) { // 키만 출력
            Console.WriteLine(item);
        }

        foreach (var item in x.Values) { // 값만 출력
            Console.WriteLine(item);
        }

        foreach (var item in x) { // 키와 값 쌍을 출력
            Console.WriteLine(string.Format("{0} = {1}", item.Key, item.Value));
        }

        Console.Read();
    }
}
```
<br><br>

--------------------

그룹핑 딕셔너리(HashMap)
===

그룹핑 딕셔너리(HashMap) 
---

- 하나의 키로 중복되는 여러개의 값을 저장하는 자료구조
- 딕셔너리(Dictionary)와 동작 방식은 동일
- 딕셔너리(Dictionary)와 다르게 중복을 허용하여, 단일키에 여러개의 값을 저장
- 키 기준으로 그룹핑 할때 사용되는 자료구조로 입력된 순서대로 출력 및 인덱스 접근을 허용



사용예제
---

- .Net Request 객체의 헤더
- 쿼리문자열
- 폼데이터 및 쿠키를 관리

Dictionary VS HashMap
---

|                 | Dictionary | HashMap                      |
| --------------- | ---------- | ---------------------------- |
| 중복추가 허용   | X          | O                            |
| 없는키 검색     | X          | O                            |
| 순서대로 출력   | X          | O                            |
| 배열인덱스 접근 | X          | O                            |
| 성능(효율)      | 높음       | 낮음(키 목록 관리 비용 때문) |



과제 
---

- 그룹핑 딕셔너리(HashMap)의 구현

```
public class MyHashMap<TValue> : IEnumerable<KeyValuePair<string, MyList<TValue>>>
{
    private MyDictionary<string, MyList<TValue>> _dict;
    private MyList<string> _keyList;


    public MyHashMap(IEqualityComparer<string> equalityComparer = null)
        : this(17, equalityComparer)
    {
    }

    public MyHashMap(int capacity, IEqualityComparer<string> equalityComparer = null)
    {
        var comparer = equalityComparer ?? StringComparer.OrdinalIgnoreCase;    // 대소문자 구분없이 비교하는 비교자를 기본으로 사용한다.
        this._dict = new MyDictionary<string, MyList<TValue>>(capacity,  comparer);
        this._keyList = new MyList<string>(capacity, comparer);    // 추가되는 키를 순서대로 저장 할 용도의 리스트 객체
    }

    public int Count
    {
        get { return _keyList.Count; }
    }

    public TValue this[int index]
    {
        get { return 키목록 리스트에서 키를 찾아서 GetValue 호출; }
        set { 키목록 리스트에서 키를 찾아서 SetValue 호출; }
    }
    
    public TValue this[string key]
    {
        get { return GetValue(key); }
        set { SetValue(key, value); }
    }

    public IEnumerable<string> Keys
    {
        get { return new MyMapKeyCollection(this); }
    }    

    public TValue[] GetAllValues()
    {
        MyList<TValue> values = new MyList<TValue>();

        foreach (string key in this._keyList) {
            // TODO            
        }
        return values.ToArray();
    }

    public TValue[] GetValues(string key)
    {
        var list = // TODO
        if (list == null) {
            return Array.Empty<TValue>();
        }
        return list.ToArray();
    }

    protected TValue GetValue(string key)
    {
        var list = // TODO

        return list[0]; // 첫번째 요소를 리턴한다.
    }

    protected void SetValue(string key, TValue value)
    {
        var list = // TODO
        if (list == null) {
            // 리스트 새로 생성
            // 딕셔너리의 해당 key에 새로 생성한 리스트 설정
            // 키 목록 리스트에 key 추가
        }

        // 리스트에 값 추가
    }

    public bool Remove(string key)
    {
        // 딕셔너리에서 삭제가 성공하면 키 목록 리스트에서도 삭제 후 true 리턴

        return false;
    }

    public IEnumerator<KeyValuePair<string, MyList<TValue>>> GetEnumerator()
    {
        return new MyMapEnumerator(this);
    }


    private abstract class MyMapEnumeratorBase<TCurrent> : IEnumerator<TCurrent>
    {
        protected MyHashMap<TValue> _hmap;
        protected IEnumerator<KeyValuePair<string, MyList<TValue>>> _iterator;
        protected int _index;

        public MyMapEnumeratorBase(MyHashMap<TValue> hmap)
        {
            this._hmap = hmap;
            this._index = 0;
            this._iterator = FindNextEnumerator();
        }

        protected IEnumerator<KeyValuePair<string, MyList<TValue>>> FindNextEnumerator()
        {
            // 현재 인덱스가 해쉬맵의 크기보다 작을때까지 반복한다.
            // 해쉬맵의 키 목록에서 현재 인덱스에 설정된 키값을 얻는 후 현재 인덱스를 하나 증가시킨다.
            // 얻어진 키값으로 해쉬맵의 딕셔너리에 할당된 연결리스트를 가져온다.
            // 연결리스트가 존재하고 리스트에 추가되어 있는 항목의 갯수가 0보다 크다면
            // 연결리스트의 GetEnumerator() 결과를 리턴한다.
        }

        public abstract TCurrent Current { get; }
    
        // TODO...
    }

    private class MyMapEnumerator : MyMapEnumeratorBase<리턴되는 CURRENT TYPE>
    {
        public MyMapEnumerator(MyHashMap<TValue> hmap)
            : base(hmap)
        {
        }

        public override "리턴되는 CURRENT TYPE" Current
        {
            get { return _iterator.Current; }
        }
    }

    private class MyMapKeyCollection : IEnumerable<string>
    {
        protected IEnumerator<string> _iterator;

        public MyMapKeyCollection(MyHashMap<TValue> hmap)
        {
            this._iterator = new MyMapKeyEnumerator(hmap);
        }

        // TODO: GetEnumerator

        private class MyMapKeyEnumerator : //MyMapEnumeratorBase<TODO..>
        {
            public MyMapKeyEnumerator(MyHashMap<TValue> hmap)
                : base(hmap)
            {
            }
            
            // TODO: Current
        }
    }
}

```

```
class Program
{
    static void Main()
    {
        var x = new MyHashMap<string>(3);    // 초기 크기를 3으로 시작해서 중간에 Resizing이 되도록 테스트 한다.
        x.Add("10", "101010");
        x.Add("2", "222222");
        x.Add("30", "303030");
        x.Add("4", "444444");
        x.Add("50", "505050");
        x.Add("30", "808080");         //=> 예외발생없음. 이미 중복된 키가 있더라도 그룹핑되어 추가된다.
       
        Console.WriteLine(x[3]);       //=> 3번째 인덱스, 즉 "4"의 값인 "444444"가 출력된다.

        Console.WriteLine(x["80"]);    //=> 해당 키가 추가되어 있지 않더라도 예외발생하지 않는다.
        Console.WriteLine(x["30"]);  
        Console.WriteLine(string.Join(", ", x.GetValues("30")));

        foreach (var item in x.Keys) {
            Console.WriteLine(item);
        }

        foreach (var item in x.GetAllValues()) {
            Console.WriteLine(item);
        }

        Console.Read();
    }
}
```

| Creator                                      | Explain                                                      |
| -------------------------------------------- | ------------------------------------------------------------ |
| MyHashMap<TValue>()                          | 비어 있는 상태이고 기본 초기 용량을 가지며 대/소문자를 구분하지 않는 기본 해시 코드 공급자와 대/소문자를 구분하지 않는 기본 비교자를 사용하는 MyHashMap클래스의 새 인스턴스를 초기화합니다. |
| MyHashMap<TValue>(IEqualityComparer<string>) | 기본 초기 용량을 갖고 있고 지정된 지정된 IEqualityComparer 비교자를 사용하는 MyHashMap클래스의 새 인스턴스를 초기화합니다. |

| Properties               | Explain                                                      |
| ------------------------ | ------------------------------------------------------------ |
| TValue Item[int index]   | MyHashMap 에서 지정된 키를 가지는 엔트리를 가져오거나 설정합니다. |
| TValue Item[string key]  | MyHashMap 에서 지정된 키를 가지는 엔트리를 가져오거나 설정합니다. |
| IEnumerable<string> Keys | MyHashMap의 모든 키를 가져옵니다.                            |
| int Count                | MyHashMap 인스턴스에 포함된 키/값 쌍의 수를 가져옵니다.      |

| Method                                                    | Explain                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| void Clear()                                              | 캐시된 배열을 무효로 만들고MyHashMap에서 모든 엔트리를 제거합니다. |
| IEnumerator<KeyValuePair<string, TValue>> GetEnumerator() | MyHashMap에서 KeyValuePair<string, TValue>를 반복하는 열거자를 반환합니다. |
| TValue[] GetValues(string key)                            | MyHashMap에서 지정된 키와 관련된 값의 배열 TValue[] 를 가져옵니다. |
| TValue[] GetAllValues()                                   | MyHashMap에서 등록된 모든 값의 배열 TValue[] 를 가져옵니다   |
| bool Contains(string key)                                 | MyHashMap에  키값이 추가되어 있는지 여부를 가져옵니다.       |
| void Remove(string key)                                   | MyHashMap인스턴스에서 지정한 키를 가지는 엔트리를 제거합니다. |
| void Add(string key, TValue value)                        | 지정된 이름과 값을 가지는 엔트리를MyHashMap에 추가합니다.    |

