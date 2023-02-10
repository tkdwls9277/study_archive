using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
    public class Queue<T>
    {
        MyLinkedList<T> list = new MyLinkedList<T>();

        public void Enqueue(T item)
        {
            list.AddLast(item);
        }

        public T Dequeue()
        {
            return list.RemoveFirst();
        }

        public T Peek()
        {
            if(list.First != null)
                return list.First.Data;
            return default(T);
        }
    }
}
