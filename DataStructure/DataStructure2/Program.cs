using System;
using MyCollection;

namespace DataStructure2
{
    class Program
    {
        static void Main(string[] args)
        {
            //MyArrayList.Test();
            //MyList<string>.Test();
            //EqualityComparerTest.Test();

            MySLinkedList<int> list = new MySLinkedList<int>();

            list.AddLast(10);
            list.AddLast(20);
            list.AddLast(30);
            list.AddAfter(list.Find(10), 40);
            list.AddBefore(list.Find(10), 50);
            //list.Remove(list.Find(10));
            //list.RemoveFirst();


            foreach (var item in list) {
                Console.WriteLine(item);
            }

            Console.Read();

        }
    }
}
