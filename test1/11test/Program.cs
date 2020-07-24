using System;

namespace _11test
{
    class MyList<T>
    {
        private T[] array;

        public MyList() {
            array = new T[3];
        }
        
        public T this[int index]{
            get{
                return array[index];
            }
            set{
                if(index >= array.Length)
                {
                    Array.Resize<T>(ref array, index + 1);
                    Console.WriteLine($"Array Resized : {array.Length}");
                }
                array[index]=value;
            }
        }

        public int Length{
            get{return array.Length;}
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!1");
            Console.WriteLine("Hello World!2");
            Console.WriteLine("Hello World!3");
        }
    }
}
