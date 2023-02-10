using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
    public class Stack<T>
    {
        MyLinkedList<T> list = new MyLinkedList<T>();

        public int Count { get { return list.Count; } }

        public void Push(T item)
        {
            list.AddLast(item);
        }

        public T Pop()
        {
            return list.RemoveLast();
        }

        public T Peek()
        {
            if (list.Last != null)
                return list.Last.Data;
            return default(T);
        }
    }
}
