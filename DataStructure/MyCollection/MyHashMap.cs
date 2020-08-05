using MyCollection;
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
            var comparer = equalityComparer ?? StringComparer.OrdinalIgnoreCase;
            this._dict = new MyDictionary<string, MyList<TValue>>(capacity, comparer);
            this._keyList = new MyList<string>(capacity, comparer);
        }



        // PROPERTIES
        //_________________________________________________________________________________________

        public int Count
        {
            get { return _keyList.Count; }
        }

        public TValue this[int index]
        {
            get { return GetValue(_keyList[index]); }
            set { SetValue(_keyList[index], value); }
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


        // METHODS
        //_________________________________________________________________________________________

        public virtual TValue[] GetAllValues()
        {
            MyList<TValue> values = new MyList<TValue>();

            foreach (string key in this._keyList)
            {
                MyList<TValue> arrList = this._dict[key];
                if (arrList != null)
                {
                    values.AddRange(arrList.ToArray());
                }
            }
            return values.ToArray();
        }

        public TValue[] GetValues(string key)
        {
            var arrList = _dict.GetValue(key, false);
            if (arrList == null)
            {
                return Array.Empty<TValue>();
            }
            return arrList.ToArray();
        }

        protected TValue GetValue(string key)
        {
            var arrList = _dict.GetValue(key, false);
            if (arrList == null)
            {
                return default(TValue);
            }
            return arrList[0]; // 첫번째 요소를 리턴한다.
        }

        protected void SetValue(string key, TValue value)
        {
            var arrList = _dict.GetValue(key, false);
            if (arrList == null)
            {
                arrList = new MyList<TValue>();
                _dict.SetValue(key, arrList, false);
                _keyList.Add(key);
            }

            arrList.Add(value);
        }

        public void Add(string key, TValue value)
        {
            SetValue(key, value);
        }

        public void Clear()
        {
            _dict.Clear();
            _keyList.Clear();
        }

        public bool Contains(string key)
        {
            return _dict.Contains(key);
        }

        public bool Remove(string key)
        {
            if (_dict.Remove(key))
            {
                _keyList.Remove(key);
                return true;
            }

            return false;
        }


        // IEnumerable 인터페이스 구현
        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }

        public IEnumerator<KeyValuePair<string, MyList<TValue>>> GetEnumerator()
        {
            return new MyMapEnumerator(this);
        }

        // NESTED Helper Class
        //_________________________________________________________________________________________

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
                while (_index < _hmap.Count)
                {
                    var list = _hmap._dict.FindBucketList(_hmap._keyList[_index++]);
                    if (list != null && list.Count > 0)
                    {
                        return list.GetEnumerator();
                    }
                }
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
                while (_iterator != null && !_iterator.MoveNext())
                {
                    _iterator = FindNextEnumerator();
                }

                return _iterator != null;
            }

            public void Reset()
            {
                _index = 0;
                _iterator = FindNextEnumerator();
            }
        }

        private class MyMapEnumerator : MyMapEnumeratorBase<KeyValuePair<string, MyList<TValue>>>
        {
            public MyMapEnumerator(MyHashMap<TValue> hmap)
                : base(hmap)
            {
            }

            public override KeyValuePair<string, MyList<TValue>> Current
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

            IEnumerator IEnumerable.GetEnumerator()
            {
                return this.GetEnumerator();
            }

            public IEnumerator<string> GetEnumerator()
            {
                return _iterator;
            }

            private class MyMapKeyEnumerator : MyMapEnumeratorBase<string>
            {
                public MyMapKeyEnumerator(MyHashMap<TValue> hmap)
                    : base(hmap)
                {
                }

                public override string Current
                {
                    get { return _iterator.Current.Key; }
                }
            }
        }
    }
}
