using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
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

        public void Enqueue(T item)
        {
            _heapArray.Add(item); // 힙의 마지막에 새로운 요소를 추가한다.

            // 현재 인덱스를 힙의 마지막 인덱스로 설정하고 
            //해당 인덱스가 0(루트노드)보다 클때까지  반복문을 수행한다.
            int i = _heapArray.Count - 1;
            while (i > 0)
            {

                int parentIndex = (i - 1) / 2; //(기준 인덱스)로 부모 노드의 인덱스를 구한다;

             // 1. 기준 인덱스의 노드와 부모 노드의 값을 비교하여 값이 크면
             //     1.1 부모 노드와 swap하고 
             //     1.2 기준 인덱스를 부모 노드의 인덱스로 설정한다.
             // 2. 그렇지 않다면 반복문을 빠져 나간다.

                if (_heapArray[i].CompareTo(_heapArray[parentIndex]) > 0)
                {
                    _heapArray.Swap(i, parentIndex);
                    i = parentIndex;
                }
                else
                {
                    break;
                }
            }
        }

        public T Dequeue()
        {
            if (_heapArray.Count == 0) throw new InvalidOperationException();

            T item = _heapArray[0]; // 현재 루트 노드의 값을 저장한다.
            int heapSize = _heapArray.Count - 1;

            _heapArray[0] = _heapArray[heapSize];
            _heapArray.RemoveAt(heapSize);

            // 현재 인덱스를 루트(0) 노드에서 시작하여 왼쪽 자식 노드의 인덱스가 힙의 크기보다  
            // 작을때 까지 반복문을 수행한다.
            for (int i = 0, leftIndex = 1; leftIndex < heapSize; leftIndex = (i * 2) + 1)
            {

                int rightIndex = (i*2)+2;

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

                if (rightIndex < heapSize)
                {
                    if (_heapArray[i].CompareTo(_heapArray[leftIndex]) > 0 
                        && _heapArray[i].CompareTo(_heapArray[rightIndex]) > 0) break;
                    else if (_heapArray[leftIndex].CompareTo(_heapArray[rightIndex])>0)
                    {
                        _heapArray.Swap(leftIndex, i);
                        i = leftIndex;
                    }
                    else
                    {
                        _heapArray.Swap(rightIndex, i);
                        i = rightIndex;
                    }
                }
                else
                {
                    if (_heapArray[i].CompareTo(_heapArray[leftIndex]) > 0) break;
                    else
                    {
                        _heapArray.Swap(leftIndex, i);
                        i = leftIndex;
                    }
                }

            }

            return item;
        }

        public T Peek()
        {
            return _heapArray[0];
        }

        public IEnumerator<T> GetEnumerator()
        {
            return this.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }
    }
}
