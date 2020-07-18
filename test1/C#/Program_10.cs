using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program_10
    {
        static void Main(string[] args)
        {
            #region 10.1 배열의 사용 이유
            // 1. 배열의 정의에 대한 이해 ( 왜 배열을 사용할까?)
            //    ManageScore Class 확인
            ManageScore _manageScore = new ManageScore();
            _manageScore.ViewScoreList();  // 개별 변수로 출력
            _manageScore.ViewScoreList2(); // 배열을 사용하여 출력

            //p. 333 코딩해보기

            #endregion

            #region 10.2 배열의 초기화
            string[] _strArray = new string[3] { "안녕", "Hello", "Halo" };
            string[] _strArray2 = new string[] { "안녕", "Hello", "Halo" };
            string[] _strArray3 = { "안녕", "Hello", "Halo" };

            // 초기화에 대한 개인별 일관성은 지키자!
            // int형 배열, Person Class형 배열을 만들어 보자.
            #endregion

            #region 10.3 System.Array, Static Method, 인스턴스 Method
            // 배열은 System.Array 속성을 물려받는다.
            // p.337 소스 확인. > BaseType

            // Static Method와 인스턴스 Method의 차이 이해하기
            //Static Method로 호출
            // 이미 프로그램 실행 시, 메모리에 올라가므로 객체(인스턴스) 생성없이 바로 사용가능
            TempPint.staticPrintNameFunc();

            //인스턴스 Method 호출
            // 객체를 생성해야만 사용 가능
            TempPint _tempPrint = new TempPint();
            _tempPrint.printNameFunc();

            // p. 337 하단 표를 보고 "System.Array에 이런 Method들이 있구나" 까지만 확인.
            // 예시
            int[] _tempArray = new int[3] { 1, 3, 2 };

            Array.Sort(_tempArray);
            for (int i = 0; i < _tempArray.Length; i++) {
                Console.WriteLine(_tempArray[i]);
            }

            // 인스턴스 메소드 확인.
            Console.WriteLine(string.Format("GetLength : {0}", _tempArray.GetLength(0)));
            Console.WriteLine("-------------------");
            #endregion

            // 읽어보기.
            // 2차원배열, 다차원배열, 가변배열

            // p. 341 소스 확인 : 2차원 배열의 표시

            // 3차원이상의 배열도 있는데, 잘사용하지는 않아.
            // 그림으로 표시하기도 어렵고, 머릿 속에서 로직을 구현하기도 어려워

            // 생략
            #region 10.4 2차원 배열

            // 2차원 배열의 초기화1
            int[,] _temp2DArray = new int[2, 3];
            _temp2DArray[0, 0] = 1;
            _temp2DArray[0, 1] = 2;
            //...

            // p. 341 하단 2차원 배열 그림 확인

            // 2차원 배열의 초기화2
            int[,] _temp2DArray2 = new int[2, 3]{
                {1,2,3},
                {4,5,6}
            };


            // 2차원 배열의 출력
            Console.WriteLine("2차원 배열의 출력");
            for (int i = 0; i < _temp2DArray2.GetLength(0); i++) {
                for (int j = 0; j < _temp2DArray2.GetLength(1); j++) {
                    Console.WriteLine(string.Format("[{0}, {1}]:{2}", i, j, _temp2DArray2[i, j]));
                }
            }
            Console.WriteLine("-------------------");

            // p. 343은 시간이 되면 코딩 해보세요~ 
            // 위의 개념이 이해됐다면, 한번만 눈으로 읽어봐도 될 것 같아요.

            // 10.5장 다차원배열은 이런 개념이 있다 까지만 이해하면 됩니다.
            // p. 344 하단 확인.

            #endregion

            // 생략
            #region 10.6 가변배열

            // p.346, p.347 상단 가변배열 설명 확인
            // 가변배열의 요소는 배열이다!

            // 가변배열 초기화1
            int[][] _tempArray3 = new int[3][];
            _tempArray3[0] = new int[5] { 1, 2, 3, 4, 5 };
            _tempArray3[1] = new int[3] { 1, 2, 3 };
            _tempArray3[2] = new int[1] { 1 };

            // 가변배열 초기화2
            int[] firstArray = new int[2] { 1, 2 };
            int[] secondArray = new int[4] { 3, 4, 5, 6 };

            int[][] _temp2DArray4 = new int[2][] {
                firstArray,
                secondArray
            };


            // 가변배열 초기화3
            int[][] _temp2DArray5 = new int[2][] {
                new int[3]{ 1,2,3 },
                new int[3]{3,4,5}
            };
            #endregion



            #region 10.7 컬렉션 맛보기

            //p.349 컬렉션이란?
            // System.Array도 컬렉션이다

            // 4종류의 컬렉션의 정의와 사용방법을 익히자.

            #region 10.7.1 ArrayList

            // 사전 지식
            // object, Boxing / UnBoxing의 이해 (p.66 ~ p.69)
            #region Boxing/UnBoxing
            //object, string ... : 참조 Type
            // int, double, bool ... : 값 Type

            int num = 20;
            object obj = 20; // Boxing 발생, Upcasting 발생(부모로 자동 형변환)
            object obj2 = "20";  // Upcasting 발생(부모로 자동 형변환)

            // 위의 세개의 차이는?  (p. 68)  

            int num2 = (int)obj; // UnBoxing 발생

            //참조 Url : https://dybz.tistory.com/93
            #endregion
            
            ManageScore _tempManage = new ManageScore();
            ArrayList _arrList = new ArrayList();
            Console.WriteLine(_arrList.GetType().BaseType);
            _arrList.Add(10);
            _arrList.Add("10");
            _arrList.Add(true);

            _arrList.RemoveAt(0);
            _arrList.Insert(0, 20);


            Console.WriteLine("ArrayList 출력");
            foreach(object item in _arrList) {
                Console.WriteLine(item);
            }
            Console.WriteLine("-------------------");

            // 속도에 안좋아!!
            // _arrList.Add(10); 해당 과정에서 Boxing 발생

            // foreach에서 왜 var를 사용했을까?

            //_arrList.Add(_tempManage); 물론 class도 담을수 있습니다.
            // p.350, p.351 코딩해보기
            // p.351 상단 내용 확인.
            #endregion

            #region 10.7.2 Queue

            // Que에 대한 정의 확인 (p.352)
            // 언제 사용될지 생각해 보기.

            Queue _que = new Queue();
            _que.Enqueue(1);
            _que.Enqueue(2);
            _que.Enqueue(3);

            Console.WriteLine("큐 출력");

            //while(_que.Count > 0) {
            //    Console.WriteLine(_que.Dequeue());
            //}

            Console.WriteLine("-------------------");

            // 아래는 왜 에러가 날까?

            //foreach (var item in _que) {
            //    _que.Enqueue(1);
            //}


            string[] _list = new string[3] { "1", "2", "3" };
            Queue __que = new Queue();
            for (int i = 0; i < _list.Count(); i++) {
                __que.Enqueue(_list[i]);
            }

            // ** collection 루프시, collecion의 요소를 추가 삭제할 수 없다.

            //p.354 예제 코딩해보기
            #endregion

            #region 10.7.3 Stack
            // p.355 Stack의 정의 확인.

            Stack _stack = new Stack(50);  
            _stack.Push(1);
            _stack.Push(2);
            _stack.Push(3);


            Console.WriteLine("Stack 출력");
            while (_stack.Count > 0) {
                Console.WriteLine(_stack.Pop());
            }
            Console.WriteLine("-------------------");

            // p.355 코딩 해보보기

            #endregion

            #region 10.7.3 HashTable

            // HashTable의 정의 이해 (p. 356)
            // 내부 함수는 따로 확인. f12

            Hashtable ht1 = new Hashtable();
            ht1["하나"] = 1;
            ht1["둘"] = 2;
            ht1["셋"] = 3;

            ht1.Add("넷", 4);

            Hashtable ht2 = new Hashtable() {
                ["하나"] = 1,
                ["둘"] = 2,
                ["셋"] = 3,
            };

            Hashtable ht22 = new Hashtable() { };

            Hashtable ht3 = new Hashtable() {
                { "하나", 1 },
                { "둘", 2 },
                { "셋", 3 },
            };

            Console.WriteLine("HashDictionary 출력");
            Console.WriteLine(string.Format("단건출력 {0}", ht3["하나"]));


            Console.WriteLine("----------");

            // 10.8 컬렉션 초기화 방법 읽어보고, p.359 코딩해보면서 배운내용 정리
            // Stack은 Add() 가 없고, Push()를 사용 
            // Stack - Push(), ArrayList - Add()
            
            #endregion

            #region Collection의 크기
            string[] _strArr = new string[3];     // 크기가 3의로 고정
            Stack _stackList = new Stack(); //default : 4.  다 달라
            Stack _stackList2 = new Stack(10);  // 콜렉션의 사전 크기를 결정할 수 있음.


            //referencesource StackSource를 한번 보자
            // default Capacity

            Console.WriteLine(_stackList.Count);
            Console.WriteLine(_stackList2.Count);
            Console.WriteLine("----------");

            for (int i = 0; i < 20; i++) {
                _stackList.Push(1);   //8번째 추가할때 capacity 로 크기 자동 증가 (가상의 크기)
                _stackList2.Push(1);
            }
            // 추가되는 데이터의 크기를 알고 있다면 강제로 크기를 정해줄 수 있음.
            // 성능적으로 좋아.
            #endregion

            #endregion

            #region 10.9 인덱서

            // 인덱서에 대한 이해. p. 361

            IndexTestList _indexList = new IndexTestList();
            Console.WriteLine("인덱서 확인");
            Console.WriteLine(_indexList[0]);
            Console.WriteLine("----------");

            // p. 362 하단 코딩해 보기

            #endregion


            #region 10.10 foreach가 가능한 객체 만들기

            //ArrayList
            
            // p. 364 
            // ienumerator, ienumerable, foreach의 이해
            // yield return의 이해

            MyEnumerator _objEnumerator = new MyEnumerator();

            foreach (var item in _objEnumerator) {
                Console.WriteLine(item);
            }

            // ienumerable을 구현하지 않았는데 어떻게 되는거지?
            // work 답변 확인

            // 이렇게 사용하는 foreach문 (A)는 내부적으로 (B)와 같이 구현되어 있을 것입니다.
            // foreach Test
            Console.WriteLine("Foreach Test");
            string[] _strList = { "1", "2", "3", "4", "5" };

            //(A)
            foreach (var item in _strList) {  //_strList as IEnumerable 이거면 사용할 수 있어
                Console.WriteLine(item);
            }

            // (B) foreach 구문 동작원리 - 내부적으로 이렇게 구현 되고 있을거야
            // IEnumerator 객체를 통해 Collection 순회
            IEnumerator _enumrator = _strList.GetEnumerator();
            while (_enumrator.MoveNext()) {
                Console.WriteLine(_enumrator.Current); 
            }

            Console.WriteLine("-----------------");



            MyList list = new MyList();

            // 값 할당
            for (int i = 0; i < 5; i++) {
                list[i] = i;
            }

            // 출력
            foreach(int item in list) {
                Console.WriteLine(item);
            }

            // 책에서는 yield return을 Collection과 같이 설명하여서, 다소 헷갈릴 수 있습니다.
            // 두개를 분리해서 생각하면 이해가 조금더 수월 합니다.
            // 1. yield return은  IEnumerator를 구현하는 한가지 방법
            // 2. Collection에서 IEnumerator와 IEnumerable을 사용하여 Foreach 사용
            //    (C# Collection들도 내부적으로 yield return을 사용하고 있지 않음. 아래 에제에서 확인)


            // foreach는 아래와 같이 구현되어 있을 것입니다.
            string[] _strList2 = { "1", "2", "3", "4", "5" };
            IEnumerator _ienumerator = _strList2.GetEnumerator();
            while (_ienumerator.MoveNext()) {
                Console.WriteLine(_ienumerator.Current); // 데이터 반환
            }
            _ienumerator.Reset();



            Person2[] peopleArray = new Person2[3]
            {
            new Person2("John", "Smith"),
            new Person2("Jim", "Johnson"),
            new Person2("Sue", "Rabon"),
            };

            People peopleList = new People(peopleArray);
            foreach (Person2 p in peopleList) {
                Console.WriteLine(p.firstName + " " + p.lastName);
            }
            #endregion

            // 프로그램 실행 시, 바로 종료되지 않도록 하기 위해서 삽입
            // (한 Line을 입력해야 해당 함수를 넘어감 (ex. Enter)
            Console.ReadKey();

        }

        class ManageScore
        {
            int _score_1 = 90;
            int _score_2 = 100;
            int _score_3 = 95;


            int[] _scoreArray = new int[3];  // 크키가 3개인 배열을 생성

            public ManageScore()
            {
                _scoreArray[0] = 90;
                _scoreArray[1] = 100;
                _scoreArray[2] = 95;
            }

            public void ViewScoreList()
            {
                // 점수 출력
                Console.WriteLine(_score_1);
                Console.WriteLine(_score_2);
                Console.WriteLine(_score_3);
                Console.WriteLine("----------------");
            }

            public void ViewScoreList2()
            {
                for (int i = 0; i < _scoreArray.Length; i++) {
                    Console.WriteLine(_scoreArray[i]);
                }
                Console.WriteLine("----------------");

                foreach (int item in _scoreArray) {
                    Console.WriteLine(item);
                }
                Console.WriteLine("----------------");
            }
        }

        #region 정적 메소드 vs 인스턴스 메소드 (p.337 하단)
        class TempPint {

            static string name = " Static 출력 메세지입니다.";
            string name2 = "출력 메세지입니다.";

            public TempPint(){

            }

            public static void staticPrintNameFunc()
            {
                Console.WriteLine(name);
                // Static Method에서는 Static으로 선언되어 있지 않은 변수를 사용할 수 없다.
                //Console.WriteLine(name2);
                Console.WriteLine("----------------");
            }

            public void printNameFunc()
            {
                Console.WriteLine(name2);
                Console.WriteLine("----------------");
            }
        }
        #endregion

        #region 인덱서
        class IndexTestList
        {
            private string[] array;
            
            public IndexTestList()
            {
                array = new string[3] { "Index1", "Index2", "Index3" };
            }

            //인덱서
            public string this[int index]
            {
                get {
                    return array[index];
                }
                set {
                    // 배열크기에 대한 처리 로직은 p.361 하단 예저를 코딩해 보면서 확인해 보기.
                    array[index] = value;
                }
            }
        }
        #endregion

        #region foreach 예제 Class

        class MyEnumerator  
        {
            int[] numbers = { 1, 2, 3, 4 };

            //foreach로 요소를 순환하는 과정마다 GetEnumerator()를 호출함,.
            // yield를 사용하면 순차적으로 Retrun 해줌
            // yield break를 만나면 순환 종료 

            // *** yield return 은 IEnumerator를 구현하는 한 방법
            // 디버깅해 봅시다!
            public IEnumerator GetEnumerator()
            {
                yield return numbers[0];
                yield return numbers[1];
                yield return numbers[2];
                yield break;
                yield return numbers[3];
            }
        }

        //numbers[0]을  IEnumerator Type을 로 전달해준다!

        #region enumerable
        class MyList : IEnumerator, IEnumerable
        {
            private int[] array;
            int position = -1;

            public MyList()
            {
                array = new int[5];
            }

            public int this[int index]
            {
                get {
                    return array[index];
                }
                set {
                    array[index] = value;
                }
            }

            public object Current
            {
                get {
                    return array[position];
                }
            }


            // IEnumerator 멤버
            public bool MoveNext()
            {
                if (position == array.Length - 1) {
                    Reset();
                    return false;
                }

                position++;
                return (position < array.Length);
            }

            // IEnumerator 멤버
            public void Reset()
            {
                position = -1;
            }

            // IEnumerable 멤버
            public IEnumerator GetEnumerator()
            {
                return this;
                //for (int i = 0; i < array.Length; i++) {
                //    yield return array[i];
                //}
            }

        }
        #endregion

        #region yield Return 없이 foreach 구현 2
        //class MyList2 : IEnumerable, IEnumerator
        //{
        //    private int[] array;
        //    int position = -1;

        //    public MyList2()
        //    {
        //        array = new int[5];
        //    }

        //    public int this[int index]
        //    {
        //        get {
        //            return array[index];
        //        }
        //        set {
        //            array[index] = value;
        //        }
        //    }

        //    public object Current
        //    {
        //        get {
        //            return array[position];
        //        }
        //    }


        //    // IEnumerator 멤버
        //    public bool MoveNext()
        //    {
        //        if (position == array.Length - 1) {
        //            Reset();
        //            return false;
        //        }

        //        position++;
        //        return (position < array.Length);
        //    }

        //    // IEnumerator 멤버
        //    public void Reset()
        //    {
        //        position = -1;
        //    }

        //    // IEnumerable 멤버
        //    public IEnumerator GetEnumerator()
        //    {
        //        //for (int i = 0; i < array.Length; i++) {
        //        //    yield return array[i];
        //        //}
        //        return array.GetEnumerator();
        //    }

        //}
        #endregion


        #region IEnuerator를 상속받는 객체를 생성 (.Net과 유사)
        //  출처: https://teraphonia.tistory.com/723
        public class Person2
        {
            public Person2(string fName, string lName)
            {
                this.firstName = fName;
                this.lastName = lName;
            }

            public string firstName;
            public string lastName;
        }

        public class People : IEnumerable
        {
            private Person2[] _people;
            public People(Person2[] pArray)
            {
                _people = new Person2[pArray.Length];

                for (int i = 0; i < pArray.Length; i++) {
                    _people[i] = pArray[i];
                }
            }

            // 인터페이스 양식에 맞춰서 정의를 해줘야 돼.
            IEnumerator IEnumerable.GetEnumerator()
            {
                return (IEnumerator)GetEnumerator();
            }

            public PeopleEnum GetEnumerator()
            {
                return new PeopleEnum(_people);
            }
        }

        public class PeopleEnum : IEnumerator
        {
            public Person2[] _people;

            int position = -1;

            public PeopleEnum(Person2[] list)
            {
                _people = list;
            }

            public bool MoveNext()
            {
                position++;
                return (position < _people.Length);
            }

            public void Reset()
            {
                position = -1;
            }

            object IEnumerator.Current
            {
                get {
                    return Current;
                }
            }

            public Person2 Current
            {
                get {
                    try {
                        return _people[position];
                    }
                    catch (IndexOutOfRangeException) {
                        throw new InvalidOperationException();
                    }
                }
            }
        }



        #endregion


        #endregion




    }
}
