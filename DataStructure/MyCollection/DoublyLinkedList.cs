using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
    class DoublyLinkedList
    {

    }
    public class LinkedNode<T>
    {
        public T Data;
        public LinkedNode<T> Prev;
        public LinkedNode<T> Next;

        public LinkedNode(T data)
        {
            this.Data = data;
        }

        public LinkedNode(T data, LinkedNode<T> prev, LinkedNode<T> next)
        {
            this.Data = data;
            this.Prev = prev;
            this.Next = next;
        }
    }

    public class MyLinkedList<T> : IEnumerable<T>
    {
        private LinkedNode<T> _head;
        private LinkedNode<T> _tail;
        private IEqualityComparer<T> _equalityComparer;
        private int _size; // 현재 저장된 원소 개수

        public MyLinkedList(IEqualityComparer<T> equalityComparer = null)
        {
            this._equalityComparer = equalityComparer ?? EqualityComparer<T>.Default;
        }


        // PROPERTIES
        //_________________________________________________________________________________________

        public int Count
        {
            get { return _size; }
        }

        public LinkedNode<T> First
        {
            get { return _head; }
        }

        public LinkedNode<T> Last
        {
            get { return _tail; }
        }

        // METHODS
        //_________________________________________________________________________________________

        public LinkedNode<T> AddAfter(LinkedNode<T> node, T data)
        {
            LinkedNode<T> newNode = new LinkedNode<T>(data, node, node.Next);

            if (node.Next != null) {
                node.Next.Prev = newNode;
            }
            else {
                _tail = newNode;
            }


            node.Next = newNode;
            _size++;

            return newNode;
        }

        public LinkedNode<T> AddBefore(LinkedNode<T> node, T data)
        {
            LinkedNode<T> newNode = new LinkedNode<T>(data, node.Prev, node);
            if (node.Prev != null) {
                node.Prev.Next = newNode;
            }
            else {
                _head = newNode;
            }

            node.Prev = newNode;
            _size++;

            return newNode;

        }

        public IEnumerator<T> GetEnumerator()
        {
            return new MyLinkedListEnumerator(this);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator(); ;
        }

        public void AddFirst(T data)
        {
            LinkedNode<T> newNode = new LinkedNode<T>(data);
            if (_head != null) {
                _head.Prev = newNode;
                newNode.Next = _head;
            }
            else {
                _tail = newNode;
            }

            _head = newNode;
            _size++;

        }

        public void AddLast(T data)
        {
            LinkedNode<T> newNode = new LinkedNode<T>(data);
            if (_tail != null) {
                _tail.Next = newNode;
                newNode.Prev = _tail;
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

        public bool Contains(Predicate<LinkedNode<T>> match)
        {
            return Find(match) != null;
        }

        public LinkedNode<T> Find(T data)
        {
            for (var currNode = _head; currNode != null; currNode = currNode.Next) {
                if (_equalityComparer.Equals(currNode.Data, data)) {
                    return currNode;
                }
            }
            return null;
        }

        public LinkedNode<T> Find(Predicate<LinkedNode<T>> match)
        {
            for (LinkedNode<T> currNode = _head; currNode != null; currNode = currNode.Next) {
                if (match(currNode))
                    return currNode;
            }
            return null;
        }

        public void Remove(LinkedNode<T> node)
        {
            if (node == _head) {
                _head = node.Next;
            }
            else {
                node.Prev.Next = node.Next;
            }

            if (node == _tail) {
                _tail = node.Prev;
            }
            else {
                node.Next.Prev = node.Prev;
            }

            this._size--;

        }

        public bool Remove(T data)
        {
            LinkedNode<T> node = Find(data);
            if (node != null) {
                Remove(node);
                return true;
            }

            return false;
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

            for (var currNode = _head; currNode != null; currNode = currNode.Next) {
                objArray[i] = currNode.Data;
            }

            return objArray;
        }

        private class MyLinkedListEnumerator : IEnumerator<T>
        {
            private MyLinkedList<T> _list;
            private LinkedNode<T> _node;
            private T _current;

            public MyLinkedListEnumerator(MyLinkedList<T> list)
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
