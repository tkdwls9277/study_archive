using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
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

}
