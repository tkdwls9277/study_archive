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

            //var x = new MyHashSet<int>(3);    // 초기 크기를 3으로 시작해서 중간에 Resizing이 되도록 테스트 한다.
            //x.Add(10);
            //x.Add(2);
            //x.Add(30);
            //x.Add(4);
            //x.Add(50);
            //x.Add(30);    //=> false. 이미 중복된 값이므로 추가되지 않는다.

            //foreach (var item in x) {
            //    Console.WriteLine(item);
            //}

            //Console.Read();

            //var x = new MyDictionary<string, string>(3);    // 초기 크기를 3으로 시작해서 중간에 Resizing이 되도록 테스트 한다.
            //x.Add("10", "101010");
            //x.Add("2", "222222");
            //x.Add("30", "303030");
            //x.Add("4", "444444");
            //x.Add("50", "505050");
            ////x.Add("30", "808080");    //=> 예외발생. 이미 중복된 값이므로 오류가 발생한다.
            //x["30"] = "808080";       //=> 추가가 아닌 해당 키에 대한 값을 설정하는 것이므로 오류없이 값을 변경한다.

            ////Console.WriteLine(x["80"]);    //=> 예외발생. 추가되지 않은 키로 검색했으로 오류가 발생한다.

            //string result = null;
            //if (x.TryGetValue("80", out result)) {    //=> 추가되지 않은 키로 검색해도 오류가 발생하지 않는다.
            //    Console.WriteLine(result);
            //}

            //foreach (var item in x.Keys) { // 키만 출력
            //    Console.WriteLine(item);
            //}

            //foreach (var item in x.Values) { // 값만 출력
            //    Console.WriteLine(item);
            //}

            //foreach (var item in x) { // 키와 값 쌍을 출력
            //    Console.WriteLine(string.Format("{0} = {1}", item.Key, item.Value));
            //}

            //Console.Read();

            //var x = new MyHashMap<string>(3);    // 초기 크기를 3으로 시작해서 중간에 Resizing이 되도록 테스트 한다.
            //x.Add("10", "101010");
            //x.Add("2", "222222");
            //x.Add("30", "303030");
            //x.Add("4", "444444");
            //x.Add("50", "505050");
            //x.Add("30", "808080");         //=> 예외발생없음. 이미 중복된 키가 있더라도 그룹핑되어 추가된다.

            //Console.WriteLine(x[3]);       //=> 3번째 인덱스, 즉 "4"의 값인 "444444"가 출력된다.

            //Console.WriteLine(x["80"]);    //=> 해당 키가 추가되어 있지 않더라도 예외발생하지 않는다.
            //Console.WriteLine(x["30"]);
            //Console.WriteLine(string.Join(", ", x.GetValues("30")));

            //foreach (var item in x.Keys)
            //{
            //    Console.WriteLine(item);
            //}

            //foreach (var item in x.GetAllValues())
            //{
            //    Console.WriteLine(item);
            //}

            //Console.Read();

            var x = new PriorityQueue<int>();

            x.Enqueue(1);
            x.Enqueue(2);
            x.Enqueue(9);
            x.Enqueue(4);
            x.Enqueue(7);
            x.Enqueue(6);
            x.Enqueue(7); // 중복값
            x.Enqueue(3);


            while (x.Count > 0)
            {
                Console.WriteLine(x.Dequeue());
            }


            //var y = new PriorityQueue<Car>();
            //y.Enqueue(new Car(1992, "Ford"));
            //y.Enqueue(new Car(1999, "Buick"));
            //y.Enqueue(new Car(1997, "Honda"));
            //y.Enqueue(new Car(2016, "BMW"));
            //y.Enqueue(new Car(2016, "Toyota"));

            //while (x.Count > 0)
            //{
            //    Console.WriteLine(y.Peek());
            //    Console.WriteLine(y.Dequeue());
            //}

            var y = new PriorityQueue<string>();

            y.Enqueue("qas");
            y.Enqueue("apple");
            y.Enqueue("glory");
            y.Enqueue("gun");
            y.Enqueue("sunshine");
            y.Enqueue("sadending");
            y.Enqueue("banana"); // 중복값
            y.Enqueue("fish");


            while (y.Count > 0)
            {
                Console.WriteLine(y.Dequeue());
            }

            Console.Read();

        }
    }
}
