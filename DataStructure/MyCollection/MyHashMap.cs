using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
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
            this._dict = new MyDictionary<string, MyList<TValue>>(capacity, comparer);
            this._keyList = new MyList<string>(capacity, comparer);    // 추가되는 키를 순서대로 저장 할 용도의 리스트 객체
        }

        public int Count
        {
            get { return _keyList.Count; }
        }

        public TValue this[int index]
        {
            get { return GetValue(_keyList[index]); }
            set { SetValue(_keyList[index], GetValue(_keyList[index])); }
        }

        public TValue this[string key]
        {
            get { return GetValue(key); }
            set { SetValue(key, value); }
        }

        public IEnumerable<string> Keys
        {
            get { return new MyMapKeyCollection(); }
        }

        public TValue[] GetAllValues()
        {
            MyList<TValue> values = new MyList<TValue>();

            foreach (string key in this._keyList) {
                // TODO          
                values.Add();
            }
            return values.ToArray();
        }

        public TValue[] GetValues(string key)
        {
            var list = _dict.FindBucketList(key);// TODO
            if (list == null) {
                return Array.Empty<TValue>();
            }
            return list.ToArray();
        }

        protected TValue GetValue(string key)
        {
            var list = GetValues(key);

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

        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
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

            public void Dispose()
            {
            }

            public bool MoveNext()
            {
                return false;
            }

            public void Reset()
            {
            }

            public abstract TCurrent Current { get; }

            object IEnumerator.Current => throw new NotImplementedException();

            // TODO...
        }

        private class MyMapEnumerator : MyMapEnumeratorBase<TValue>
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

        public class MyMapKeyCollection : IEnumerable<string>
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
}
