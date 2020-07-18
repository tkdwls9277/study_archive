using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program_11
    {
        static void Main2(string[] args)
        {
            #region 명시적 인터페이스
            SampleClass obj = new SampleClass();
            obj.Paint();

            SampleClass2 obj2 = new SampleClass2();
            //obj2.Paint();  // error.

            IControl c = obj2;
            c.Paint();  // IControl.Paint

            ISurface s = obj2;
            s.Paint(); // ISurface.Paint
            #endregion

            // 지난 강의 복습
            // object형은 Type들의 부모
            // object에 모든 타입을 담을 수 있다.
            // 값 형식을 참조 형식에 담을 경우 박싱이라는 매커니즘이 이루어짐. 반대는 언박싱
            // 해당 과정은 성능적으로 않좋아서 비추!!!
            // 지난 시간에 배운 Collection들의 추가/삭제 등의 파라미터로 object Type을 받음. 성능상 안좋아!!

            #region 11.1 일반화 프로그래밍
            // 11.1장 읽어보기
            // 일반화 프로그램의 정의에 대해서 이해합니다.
            // 예제소스 확인.
            #endregion

            #region 11.2 일반화 메소드

            int[] _source = { 1, 2, 3, 4, 5 };
            int[] _target = new int[_source.Length];

            string[] _sourceStr = { "1", "2", "3", "4", "5" };
            string[] _targetStr = new string[_source.Length];

            ManageScore _manageSource = new ManageScore();

            // int형 배열을 복사하는 함수
            _manageSource.CopyArray(_source, _target);

            // string형 배열을 복사하는 함수
            _manageSource.CopyArray(_sourceStr, _targetStr);

            //... 계속 이런식으로 하면 불편해!!!
            //... Type의 종류마다 해당 Type을 인수로 가지는 함수들이 생성 됨.

            // 일반화 메소드
            // 메소드에 타입을 지정할수있게 설정
            // p.374  ~ p.375 선언 확인.

            // Generics를 호출할때, Type을 지정
            // CopyArray는 어떤 Type이든 사용가능하다.
            _manageSource.CopyArray<int>(_source, _target);
            _manageSource.CopyArray<string>(_sourceStr, _targetStr);
            #endregion

            #region 11.3 일반화 클래스
            // 함수의 매개변수에 대해서 일반화 했다면,


            // 클래스 내부에서 형식매개변수를 사용할 수 있다.
            // p.377 선언방법, p.378 예제소스 확인.



            // p.378 제일마지막 구문 / p.379 상단 그림


            // 기존 Generics를 사용하지 않은 경우
            // Type에 따라 새로운 Class가 계속 증가됨.
            IndexTestList _indexList = new IndexTestList();
            _indexList[0] = "0";
            _indexList[1] = "1";
            _indexList[2] = "2";

            // Generics를 사용한경우
            IndexTestList<string> _indexList2 = new IndexTestList<string>();
            _indexList2[0] = "0";
            _indexList2[1] = "1";
            _indexList2[2] = "2";

            #endregion

            #region 11.4 형식 매개 변수 제약시키기 - 일반화에 조건 설정하기 (강제성 부여)
            // 형식 매개변수에 조건을 줄수 있다. 규칙을 주는 효과
            // p. 382 개념이해

            // 일반화 함수도 동일하게 코딩 가능
            // p.382 일반화 메소드에 제약조건 추가한 부분 확인 (중간 그림)

            // p.383 상단 표 읽어보기 
            // 필요할 때 찾아서 쓰면 됩니다.

            MyGenerics<MyClass> _myGenerics = new MyGenerics<MyClass>();
            MyGenerics<MyClassBase> _myGenerics2 = new MyGenerics<MyClassBase>();
            //MyList<Array_String> _myList3 = new MyList<Array_String>(); // 제약조건을 통과하지 못해서 에러발생.

            // 언제사용될까?
            // MyGenerics<T> Class에서 T로 할당되는 Type은  
            // 항상 MyClassBase Class를 포함한다라는 전제조건 성립.
            // p. 384 코딩해보기!! Generics는 처음에 헷갈릴 수가 있어요. 계속 코딩하고 소스보면서 이해해야 됩니다.

            #endregion



            #region 11.5 일반화 컬렉션

            // p. 386, p. 387 내용이해.

            // 10장에서  알아보았던 컬렉션을 Generics 용으로 변환합니다.
            // 예제를 보지않고, 10장에서 예제를 구현했다면, Generics로 변경해 보면 좋을 것 같습니다.
            // ex) ArrayList _list = new ArrayList();
            //     >> List<string> _list = new List<string>();
            //ArrayList
            var strList = new List<string>();
            //strList.Add(10);
            strList.Add("10");


            Hashtable _hash = new Hashtable();
            _hash["하나"] = 1;
            _hash["둘"] = 2;
            _hash["셋"] = 3;
            _hash["넷"] = 4;

            Dictionary<string, int> _dict = new Dictionary<string, int>();
            _dict["하나"] = 1;
            _dict["둘"] = 2;
            _dict["셋"] = 3;
            _dict["넷"] = 4;

            Console.WriteLine(_dict["둘"]);

            // Ecount 개발면접 - 첫번째 문제
            // 1. Generic가 무엇인가? => 사용방법에 대한 이론적 접근
            // 2. 왜 Generics를 사용하는 가?  => Collection과의 차이를 Boxing / UnBoxing 관점, 업캐스팅 / 다운캐스팅 관점에서 설명하기
            #endregion


            #region [10.6 foreach 사용하기]

            var strArray = new ArrayList();
            var strList2 = new List<string>();


            // object 
            // 데이터를 가져올때 계속 형변환이 일어났겠구나..
            foreach (var item in strArray) {

            }

            foreach (var item in strList2) {

            }

            // 예제를 구현했던 foreach 소스에 일반화클래스를 적용해 보기

            #endregion


            #region 추가 공부 사항
            /*
            
            11.6   p.392 내용 파악 
                   왜 IEnumerable<T>를 사용해야 될까

            1. Collection은 모두 IEnumerable을 상속받고 있습니다.
               이를 이용하면 어떤 공통 구조를 가져갈 수 있을 까요?
               형변환의 원리로 접근해봅시다.
            

            2. 상속받는 공통 Class가 Generics로 구현되었고, 해당 Class에 interface 설정했을 걸었을 경우
               만들어질 수 있는 공통 구조를 한번 생각해 봅시다.

            */
            #endregion

            // 프로그램 실행 시, 바로 종료되지 않도록 하기 위해서 삽입
            // (한 Line을 입력해야 해당 함수를 넘어감 (ex. Enter)
            Console.ReadKey();

        }
        public class testClass{
            
        }

        #region 명시적 인터페이스
        interface IControl
        {
            void Paint();
        }

        interface ISurface
        {
            void Paint();
        }

        class SampleClass : IControl, ISurface
        {
            // public 으로 선언 - 해당 객체가 호출가능
            public void Paint()
            {
                Console.WriteLine("Paint method in SampleClass");
            }
        }

        public class SampleClass2 : IControl, ISurface
        {
            // pivate 로 선언 - 해당 객체가 호출불가
            // Interface가 호출가능
            void IControl.Paint()
            {
                System.Console.WriteLine("IControl.Paint");
            }
            void ISurface.Paint()
            {
                System.Console.WriteLine("ISurface.Paint");
            }
        }

        // [사용이유]
        // 1.  동일한 이름의 Interface를 다르게 구현하고 싶을 경우
        // 2.  클래스가 인터페이스를 구현하더라도 인터페이스의 모든 메서드들을 public으로 노출할 필요가 없는 경우


        #endregion

        #region 일반화 함수용 Class
        class ManageScore
        {
            public ManageScore()
            {

            }

            //int형 배열 source를, int형 배열 target으로 복사하는 함수
            public void CopyArray(int[] source, int[] target)
            {
                for (int i = 0; i < source.Length; i++) {
                    target[i] = source[i];
                }
            }

            // 오버로딩 - 이름은 같고 반환값, 파마미터가 다른 경우.
            public void CopyArray(string[] source, string[] target)
            {

            }


            // Type에 따라 계속 만들어 줘야 되는건가? ㅠㅠ
            // 같은 일을 하고 Data Type만 다른건데.
            // => Generics의 사용.

            // 여러개의 함수를 만들 필요없이 이함수 하나로 된다.
            // (자식 객체를 전달해주면, 부모 Class를 파라미터로 받는 함수와 유사)
            // ** 함수를 선언할때 < > 사이에 있는 별칭을, 실제 구현부에서 사용하면 됩니다.
            //    처음엔 사용법이 조금 헷갈릴 수 있습니다. 예제를 많이보시고, 코딩해보셔야 됩니다.
            public void TestFunc<T>(T data)
            {
                Console.WriteLine(data);
            }


            public void CopyArray<T>(T[] source, T[] target)
            {
                for (int i = 0; i < source.Length; i++) {
                    target[i] = source[i];
                }
            }

            //< >안에 들어오는건 Type을 지정한 이름일 뿐입니다.
            public void CopyArray2<성준>(성준[] source, 성준[] target)
            {
                
            }

            // 여러개도 사용가능합니다.
            // T를 형식 매개변수라고 합니다.
            public void CopyArray2<T1, T2>(T1 source, T2 target)
            {

            }

        }
        #endregion

        #region 일반화 Class

        class Array_Int
        {
            private int[] array;

            public int GetElement(int index)
            {
                return array[index];
            }
        }

        class Array_String
        {
            private string[] array;

            public string GetElement(int index)
            {
                return array[index];
            }
        }

        // 여러개의 Class를 만들 필요없이 이함수 하나로 된다.
        // ** Class를 선언할때 < > 사이에 있는 별칭을, 실제 구현부에서 사용하면 됩니다.
        // ex) DataType은 다르지만 비지니스 로직이 동일한 상황에서 이렇게 사용한다.
        class Array_Generic<T>
        {
            private T[] array;

            public T GetElement(int index)
            {
                return array[index];
            }
        }

        #endregion

        #region 인덱서 변경
        class IndexTestList
        {
            private string[] array;

            public IndexTestList()
            {
                array = new string[3];
            }

            //인덱서
            public string this[int index]
            {
                get {
                    return array[index];
                }
                set {
                    array[index] = value;
                }
            }
        }


        class IndexTestList<TReq>
        {
            private TReq[] array;

            public IndexTestList()
            {
                array = new TReq[3];
            }

            //인덱서
            public TReq this[int index]
            {
                get {
                    return array[index];
                }
                set {
                    array[index] = value;
                }
            }
        }
        #endregion


        # region 형식 매개 변수 제약
        class MyGenerics<T>
                where T : MyClassBase, new()  //new()는 맨마지막에 적용.
        {
            private T _data;

            public void ExcuteFunc()
            {
                // 형식 매개변수 T에 대해서, 전제조건이 성립하니, 그에따른 코딩을 구현할 수 있다.
                // 위의 형식 매개변수 제약조건이 없으면 아래의 코딩은 구현 불가.
                // 어떤 DataType이 넘어오는지 모르는상황에서 객체를 생성하고, Name Property에 접근할 수 없다.
                _data = new T();
                _data.Name = "MyGenerics";
                
            }
        }

        class MyClass : MyClassBase
        {
            public MyClass()
            {

            }

            // 생성자를 이것만 사용할 경우에는
            // 매개변수가 없는 생성자 생성이 안되므로, new() 제약조건을 성립 못함.
            public MyClass(int num) : base(num)
            {

            }
        }

        class MyClassBase
        {
            public string Name { get; set; }

            public MyClassBase()
            {

            }

            public MyClassBase(int num)
            {

            }

        }

        

        #endregion  

        #region foreach 예제 Class

        class MyEnumerator  
        {
            int[] numbers = { 1, 2, 3, 4 };
            public IEnumerator GetEnumerator()
            {
                yield return numbers[0];
                yield return numbers[1];
                yield return numbers[2];
                yield break;
                yield return numbers[3];
            }
        }

        #region enumerable
        //class MyList : IEnumerable, IEnumerator
        //{
        //    private int[] array;
        //    int position = -1;

        //    public MyList()
        //    {
        //        array = new int[3];
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
        //        if(position == array.Length - 1) {
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

        //}
        #endregion




        #endregion




    }
}
