using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
    public class MyList<T> : IEnumerable<T>
    {
        private T[] _array;   // 할당된 배열을 가리키는 참조변수
        private int _size;         // 현재 저장된 원소 개수
        private IEqualityComparer<T> _equalityComparer;

        public MyList(IEqualityComparer<T> equalityComparer = null)
                : this(4, equalityComparer)
        {
        }


        public MyList(int capacity)
        {
            this._size = 0;
            this._array = new T[capacity];
        }

        public MyList(int capacity, IEqualityComparer<T> equalityComparer = null)
        {
            this._size = 0;
            this._array = new T[capacity];
            this._equalityComparer = equalityComparer ?? EqualityComparer<T>.Default;
        }


        //MyList에 실제로 포함된 요소의 수를 가져옵니다.
        public int Count
        {
            get { return _size; }
        }

        //MyList에 포함될 수 있는 요소의 수를 가져오거나 설정합니다.
        public int Capacity
        {
            get { return _array.Length; }
            set {
                if (value > _array.Length) {
                    T[] newArray = new T[value];
                    CopyTo(newArray);
                    //Array.Copy(_array, newArray, _size);
                    _array = newArray;
                }
                else {
                    throw new ArgumentOutOfRangeException();
                }
            }
        }

        // 외부에서 배열 요소에 접근을 위한 인덱서 프로퍼티
        public T this[int index]
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

        //전체 길이를 넘을 경우 길이를 두배로 만들어준다.
        private void EnsureCapacity()
        {
            int capacity = _array.Length;
            if (_size >= capacity) {
                this.Capacity = capacity == 0 ? 4 : capacity * 2;
            }
        }

        // 배열의 마지막에 원소 추가
        public void Add(T element)
        {
            //// 배열 공간 체크, 부족할 시 resize
            //EnsureCapacity();

            //// 원소 추가
            //_array[_size] = element;
            Insert(_size, element);
        }

        // 해당 위치에 원소 추가
        public void Insert(int index, T element)
        {
            // 배열 공간 체크, 부족할 시 resize
            EnsureCapacity();

            // 추가되려고 하는 위치부터 한칸씩 뒤로 데이터 이동
            //for (int i = _size; i > index; i--) {
            //    _array[i] = _array[i - 1];
            //}


            Array.Copy(_array, index, _array, index + 1, _size - index);

            // 원소 추가
            _array[index] = element;
            _size++;
        }

        // 해당 위치의 원소 삭제
        public void RemoveAt(int index)
        {
            if (index < 0 || index >= _size) {
                throw new IndexOutOfRangeException();
            }

            _size -= 1;

            // 삭제하려는 위치부터 한칸씩 앞으로 데이터 이동
            //for (int i = index; i < _size; i++) {
            //    _array[i] = _array[i + 1];
            //}

            Array.Copy(_array, index + 1, _array, index, _size - index);
        }

        //MyList에서 요소의 범위를 제거합니다.
        public void RemoveRange(int index, int count)
        {
            _size -= count;

            // 삭제하려는 위치부터 한칸씩 앞으로 데이터 이동
            //for (int i = index; i < _size; i++) {
            //    _array[i] = _array[i + count];
            //}

            Array.Copy(_array, index + count, _array, index, _size - count);
        }

        //대상 배열의 맨 처음부터 시작하여 전체 MyList를 호환되는 1차원 Array에 복사합니다.
        public void CopyTo(Array array)
        {
            CopyTo(array, 0);
        }

        //대상 배열의 지정된 인덱스에서 시작하여 전체 MyList을 호환되는 1차원 Array에 복사합니다.
        public void CopyTo(Array array, int arrayIndex)
        {
            //for (int i = arrayIndex; i < _size;i++) {
            //    array.SetValue(_array[i],i);
            //}
            if (array.Length >= _size) {
                Array.Copy(_array, arrayIndex, array, 0, _size - arrayIndex);
            }
            else {
                throw new ArgumentOutOfRangeException();
            }

        }

        //MyList에서 모든 요소를 제거합니다.
        public void Clear()
        {
            if (0 > _size) {
                Array.Clear(_array, 0, _size);
                _size = 0;
            }
        }

        //MyList의 지정된 첫번째 인덱스와 두번째 인덱스에 있는 요소들을 바꿉니다.
        public void Swap(int i, int j)
        {
            var temp = _array[i];
            _array[i] = _array[j];
            _array[j] = temp;
        }

        //MyList의 요소를 새 T 배열에 복사합니다.
        public T[] ToArray()
        {
            T[] arrayClone = new T[_size];
            //arrayClone = (T[])_array.Clone();

            for (int i = 0; i < _size; i++) {
                arrayClone[i] = _array[i];
            }

            return arrayClone;
        }


        //-------------------------------------------------------------------
        //MyList에 요소가 있는지 여부를 확인합니다.
        //public bool Contains(T item)
        //{
        //    return IndexOf(item, 0, _size) < 0;
        //}

        // IEqualityComparer를 이용한 Contains 구현 예
        public bool Contains(T item)
        {
            for (int index = 0; index < _size; index++) {
                if (_equalityComparer.Equals(_array[index], item))
                    return true;
            }
            return false;
        }


        //지정한 T를 검색하고, 전체 MyList 내에서 처음 나오는 0부터 시작하는 인덱스를 반환합니다.
        public int IndexOf(T item)
        {
            return IndexOf(item, 0, _size);
        }

        //지정된 T를 검색하고, 지정된 인덱스부터 마지막 요소까지 포함되는 MyList의 요소 범위에서 
        //처음 나오는 0부터 시작하는 인덱스를 반환합니다.
        public int IndexOf(T item, int index)
        {
            return IndexOf(item, index, _size);
        }

        //지정된 T를 검색하고, 지정된 인덱스부터 시작하여 지정된 수의 요소를 포함하는 MyList의 요소 범위에서 
        //처음 나오는 0부터 시작하는 인덱스를 반환합니다.
        public int IndexOf(T item, int startIndex, int endIndex)
        {
            for (int index = startIndex; index < startIndex + endIndex; index++) {
                if (this._array[index].Equals(item))
                    return index;
            }
            return -1;
        }
        //------------------------------------

        //지정된 개체를 검색하고 전체 MyList에서 마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다.
        public int LastIndexOf(T item)
        {
            return LastIndexOf(item, 0, _size);
        }

        //지정된 개체를 검색하고, 첫 번째 요소에서 지정된 인덱스로 확장하는 MyList의 요소 범위에서 
        //마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다.
        public int LastIndexOf(T item, int startIndex)
        {
            return LastIndexOf(item, startIndex, _size);
        }

        //지정된 개체를 검색하며, 지정된 수의 요소를 포함하고 지정된 인덱스에서 끝나는 MyList의 요소 범위에서 
        //마지막으로 검색한 개체의 인덱스(0부터 시작)를 반환합니다.
        public int LastIndexOf(T item, int startIndex, int endIndex)
        {
            for (int index = startIndex + endIndex - 1; index >= startIndex; index--) {
                if (this._array[index].Equals(item))
                    return index;
            }
            return -1;
        }

        //MyList에서 맨 처음 발견되는 특정 개체를 제거합니다.
        public bool Remove(T item)
        {
            int index = IndexOf(item);
            if (index == -1) {
                return false;
            }

            RemoveAt(index);
            return true;
        }

        //----------------------------------------------------------------
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

            public T Current => this._current;

            object IEnumerator.Current => this._current;

            public void Dispose()
            {
            }

            public bool MoveNext()
            {
                if(_index< _list._size) {
                    _current = _list[_index++];
                    return true;
                }
                return false;
            }

            public void Reset()
            {
            }
        }

        //---------------------------------------------------------------------

        public int BinarySearch(T item)
        {
            return BinarySearch(item, Comparer<T>.Default);
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

        //------------------------------------------------------------------------




        //------------------------------------------------------------------------

        //test를 위한 예제 코드
        public static void Test()
        {

            MyList<string> myAL = new MyList<string>();

            myAL.Add("Hello");
            myAL.Add("C#");
            myAL.Add("World");
            myAL.Add("Hello");

            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(myAL[i]);
            //}

            //Console.WriteLine();

            //Console.WriteLine(myAL.IndexOf("WORLD"));
            //Console.WriteLine(myAL.IndexOf("World"));

            //Console.WriteLine();
            //myAL.Remove("C#");

            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(myAL[i]);
            //}

            //Console.WriteLine();

            //Console.WriteLine(myAL.LastIndexOf("WORLD"));
            //Console.WriteLine(myAL.LastIndexOf("World"));

            //foreach (var item in myAL) {
            //    Console.WriteLine(item);
            //}

            Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록

            //// Creates and initializes a new MyList.
            //MyList myAL = new MyList();

            //myAL.Add("0");
            //myAL.Add("1");
            //myAL.Add("2");
            //myAL.Add("3");

            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(myAL[i]);
            //}

            //Console.WriteLine("---------추가------------");
            //myAL.Add("4");
            //myAL.Add("5");

            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(myAL[i]);
            //}

            //Console.WriteLine("---------범위삭제[2]부터 2개------------");
            //myAL.RemoveRange(2, 2);
            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(myAL[i]);
            //}

            //Console.WriteLine("----------삭제[2]-----------");
            //myAL.RemoveAt(2);
            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(myAL[i]);
            //}

            //String[] obj = new String[10];
            //Console.WriteLine("----------복사-----------");
            //myAL.CopyTo(obj);
            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(obj[i]);
            //}

            //String[] obj2 = new String[10];
            //Console.WriteLine("----------복사[2]부터-----------");
            //myAL.CopyTo(obj2, 2);
            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(obj2[i]);
            //}

            //Console.WriteLine("----------swap(1,2)-----------");
            //myAL.Swap(1, 2);
            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(myAL[i]);
            //}

            //Console.WriteLine("----------Clone-----------");
            //var array = myAL.ToArray();
            //for (int i = 0; i < array.Length; i++) {
            //    Console.WriteLine(array[i]);
            //}

            ////Console.WriteLine("----------전체삭제-----------");
            ////myAL.Clear();
            ////for (int i = 0; i < myAL.Count; i++) {
            ////    Console.WriteLine(myAL[i]);
            ////}


            //Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록


            // Creates and initializes a new MyList.

        }
    }
}