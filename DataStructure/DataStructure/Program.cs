using System;
using MyCollection;

namespace DataStructure
{
    class Program
    {
        static void Main(string[] args)
        {
            // Creates and initializes a new MyArrayList.
            MyArrayList myAL = new MyArrayList();

            myAL.Add("Hello");
            myAL.Add("C#");
            myAL.Add("World");
            myAL.Add("!\r\n");

            for (int i = 0; i < myAL.Count; i++) {
                Console.WriteLine(myAL[i]);
            }

            //지우기
            myAL.RemoveAt(2);
            for (int i = 0; i < myAL.Count; i++) {
                Console.WriteLine(myAL[i]);
            }

            //myAL.Add("2배");
            //myAL.Add("추가");

            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(myAL[i]);
            //}
            //Console.WriteLine(myAL.Count);

            //myAL.RemoveRange(2, 2);

            //for (int i = 0; i < myAL.Count; i++) {
            //    Console.WriteLine(myAL[i]);
            //}

            Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록
        }
    }
}
