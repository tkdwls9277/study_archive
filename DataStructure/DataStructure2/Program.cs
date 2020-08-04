using System;
using System.IO;
using MyCollection;

namespace DataStructure2
{
    class Program
    {
        static void Main(string[] args)
        {
            ////MyArrayList.Test();
            ////MyList<string>.Test();
            ////EqualityComparerTest.Test();

            //MyLinkedList<int> list = new MyLinkedList<int>();

            //list.AddLast(10);
            //list.AddLast(20);
            //list.AddLast(30);
            //list.AddLast(40);
            //list.AddLast(50);
            ////list.AddAfter(list.Find(10), 40);
            ////list.AddBefore(list.Find(10), 50);
            //list.Remove(list.Find(30));
            //list.RemoveFirst();


            //foreach (var item in list) {
            //    Console.WriteLine(item);
            //}

            //Console.WriteLine();

            //MyLinkedList<string> slist = new MyLinkedList<string>(StringComparer.OrdinalIgnoreCase);

            //slist.AddLast("abc");
            //slist.AddLast("def");
            //slist.AddLast("ghi");

            //slist.Remove(slist.Find("DEF"));

            //foreach (var item in slist) {
            //    Console.WriteLine(item);
            //}


            //Console.Read();

            //Queue<int> queue = new Queue<int>();

            //Console.WriteLine(queue.Peek());

            //queue.Enqueue(1);
            //queue.Enqueue(2);
            //queue.Enqueue(3);
            //queue.Enqueue(4);

            //Console.WriteLine(queue.Dequeue());
            //Console.WriteLine(queue.Peek());
            //Console.WriteLine(queue.Dequeue());

            //Stack<int> st = new Stack<int>();

            //st.Push(5);
            //st.Push(6);
            //st.Push(7);
            //st.Push(8);
            //st.Push(9);

            //Console.WriteLine(st.Pop());
            //Console.WriteLine(st.Peek());
            //Console.WriteLine(st.Pop());

            //Console.Read();

            //Console.Write("Enter a path: ");
            //var targetDirectory = Console.ReadLine();

            //// 경로가 존재하면
            //if (Directory.Exists(targetDirectory)) {
            //    var stack = new Stack<string>();
            //    stack.Push(targetDirectory);

            //    while (stack.Count > 0) {
            //        var currDirectory = stack.Pop();

            //        Console.WriteLine(string.Format("\nFiles in {0}:", currDirectory)); // 폴더명 출력

            //        // Process the list of files found in the directory.
            //        string[] fileEntries = Directory.GetFiles(currDirectory);
            //        foreach (string filePath in fileEntries) {
            //            Console.WriteLine(Path.GetFileName(filePath));  // 파일명 출력
            //        }

            //        // Recurse into subdirectories of this directory.
            //        string[] subdirectoryEntries = Directory.GetDirectories(currDirectory);
            //        foreach (string subdirectory in subdirectoryEntries)
            //            //TODO: 스택사용
            //            stack.Push(subdirectory);
            //    }

            var x = new MyHashSet<int>(3);    // 초기 크기를 3으로 시작해서 중간에 Resizing이 되도록 테스트 한다.
            x.Add(10);
            x.Add(2);
            x.Add(30);
            x.Add(4);
            x.Add(50);
            x.Add(30);    //=> false. 이미 중복된 값이므로 추가되지 않는다.

            foreach (var item in x) {
                Console.WriteLine(item);
            }

            Console.Read();


        }
    }
}
