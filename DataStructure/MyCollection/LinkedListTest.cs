using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
    class LinkedListTest
    {

    }
    public class SLinkedNode<T>
    {
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

    public class MySLinkedList<T> : IEnumerable<T>
    {
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
                if (prevNode.Next == _tail) {
                    return prevNode;
                }
            }
            return null;
        }


        // METHODS
        //_________________________________________________________________________________________

        public SLinkedNode<T> AddAfter(SLinkedNode<T> node, T data)
        {
            SLinkedNode<T> newNode = new SLinkedNode<T>(data, node.Next);

            if (newNode.Next == null) {
                _tail = newNode;
            }

            node.Next = newNode;
            _size++;

            return newNode;
        }

        public SLinkedNode<T> AddBefore(SLinkedNode<T> node, T data)
        {
            if (GetPrevNode(node) == null) {
                AddFirst(data);
                return _head;
            }

            return AddAfter(GetPrevNode(node), data);
        }

        public IEnumerator<T> GetEnumerator()
        {
            return new MySLinkedListEnumerator(this);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator(); ;
        }

        public void AddFirst(T data)
        {
            SLinkedNode<T> newNode = new SLinkedNode<T>(data, _head);

            if (_tail == null) {
                _tail = newNode;
            }

            _head = newNode;
            _size++;
        }

        public void AddLast(T data)
        {
            SLinkedNode<T> newNode = new SLinkedNode<T>(data);
            if (_tail != null) {
                _tail.Next = newNode;
            }
            else {
                _head = newNode;
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
                if (_equalityComparer.Equals(currNode.Data, data)) {
                    return currNode;
                }
            }
            return null;
        }

        public void Remove(SLinkedNode<T> node)
        {
            if (node == _head) {
                _head = _head.Next;
                if (_head == null) {
                    _tail = null;
                }
            }
            else {
                // 현재 노드의 이전 노드를 찾는다. 
                var prevNode = GetPrevNode(node);
                if (prevNode != null) {
                    prevNode.Next = node.Next;
                }

                if (node == _tail) {
                    _tail = prevNode;
                    prevNode.Next = null;
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
            T result = default(T);

            if (_tail != null) {
                result = _tail.Data;
                Remove(_tail);
            }

            return result;
        }

        public T[] ToArray()
        {
            T[] objArray = new T[_size];
            int i = 0;

            //TODO: 연결리스트를 순회하며 배열에 값을 복사
            for (var currNode = _head; currNode != null; currNode = currNode.Next) {
                objArray[i] = currNode.Data;
            }

            return objArray;
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

            public T Current => _current;
            object IEnumerator.Current => _current;

            public void Dispose()
            {
                
            }

            public bool MoveNext()
            {
                if (_node != null) {
                    _current = _node.Data;
                    _node = _node.Next;
                    return true;
                }
                return false;
            }

            public void Reset()
            {
                _current = default(T);
            }
        }
    }
}
