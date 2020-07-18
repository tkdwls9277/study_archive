using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program_14
    {
        static void Main2(string[] args)
        {
            #region 14.2 처음만나는 람다식

            // 람다식은 익명메소드를 만들기 위해서 사용 (익명메소드를 만드는 또하나의 방법)
            // ex. 람다식

            //delegate int MyDelegate(int a, int b);

            // (1) 대리자의 사용 : 기본. 함수를 파라미터로 전달하기 위해서 사용.
            Calculator _calc = new Calculator();
            MyDelegate _callBack = new MyDelegate(_calc.Plus);

            // (2) 익명 매소드의 사용 [C# 2.0]
            MyDelegate _callBack2 = delegate (int a, int b) {
                return a + b;
            };

            // 14.2 처음만나는 람다식
            // 람다식은 익명 메소드를 만들기 위해 사용
            // p. 458 ~ p.459 예시내용 확인.

            // (3) 람다의 사용 [C# 3.0]
            MyDelegate _callBack3 = (int a, int b) => a + b;

            // (4) 람다의 사용 : 형식유추
            // 컴파일러가 MyDelegate Type을 보고, a / b의 Type을 유추
            MyDelegate _callBack4 = (a, b) => a + b;

            // p. 459 내용 정리.

            Console.WriteLine("람다식 사용 : 시작 ---------------");
            Console.WriteLine(_callBack4(3, 5));
            Console.WriteLine("람다식 사용 : 종료 ---------------");


            #endregion

            #region 14.3 문형식 람다식

            // ex)
            // 식 : 식형식 (식의 모양)
            // a + b;

            // 문 : 문형식 (문의 모양) 
            //      '{' 와 '}' 로 둘러싸인 코드블록
            // {
            //    int c = a;
            //    return c + b;
            // }

            // (5) 람다의 사용 : 
            MyDelegate _callBack5 = (a, b) => { return a + b; };

            // 식형식은 반환형식이 없는 무명함수를 만들 수 없지만,
            // 식 자체의 결과가 반환값  ex) (a,b) => a + b;
            // 문형식은 가능함.

            // delegate void VoidReturnDelegate(int a, int b);

            VoidReturnDelegate _callBack6 = (a, b) => {
                Console.WriteLine(a);
                Console.WriteLine(b);
                //return 값이 없음.
            };


            // delegate void VoidReturnDelegate2();

            VoidReturnDelegate2 _callBack7 = () => {  // 파라미터가 없음.
                Console.WriteLine("반환값 없음");
                Console.WriteLine("파라미터 없음");
                //return 값이 없음.
            };

            // p.461 코딩해보기
            // 외부에서 데이터를 받는 방식을 사용하고 있습니다. (p.29)
            /// (참고) http://www.csharpstudy.com/Tip/Tip-cmdargs.aspx
            // 우선은 string[] 변수를 생성해서, 데이터를 전달하는 방식으로 구현해 봅시다.
            #endregion

            #region 14.4 더 간편한 무명함수 (Func, Action)

            // 단하나의 익명 메소드를 만들때도, 매번 대리자 Type을 선언해야 됨.

            // 대리자 Type을 꼭 선언해야 되나?
            // delegate int MyDelegate(int a, int b);

            // Func와 Action을 사용하면 대리자 Type 선언도 필요없다!!
            // .Net에서 Func와 Action 대리자를 미리 선언 해뒀습니다.
            // 주로 사용하게 되는 익명메소드 사용법 


            #region Func

            // ex) Func / Action
            // p. 462 내용 확인.

            // 결과를 반환하는 매소드를 참조
            // 매개변수 중 가장 마지막에 있는 것이 반환 형식
            // p. 463 확인

            // .Net 프레임워크가 미리 선언해 놓은 대리자
            // Reference Source - func 검색  : 미리선언되어 있는 delegate
            // public delegate  TResult Func<int T, out TRsult>(T arg);
            // public delegate  TResult Func<int T, int T, out TRsult>(T arg1, T arg2);

            // 1.
            MyDelegate _callBackTest = new MyDelegate(_calc.Plus);
            MyDelegate3<int, int, int> _callBackTest2 = new MyDelegate3<int, int, int>(_calc.Plus);

            // 2.
            Func<int, int, int> _callBackTest3 = (a, b) => a + b;

            // 1번과 2번 모두 동일효과. 간단하건 2번

            // delegate 선언 / plus 함수 선언 등의 작업
            Console.WriteLine(_callBackTest(3, 5));

            // Func 생성후 사용.
            Console.WriteLine(_callBackTest2(3, 5));


            // 이제 그냥 Func를 사용하기만 하면됨. 이미 선언되어 있음.
            //  17개의 파라미터를 받는 Func : 17번째는 반환값 Tpye
            //  같은 Type의 함수들이 가져다 쓰기만 하면 돼.
            Func<int> _func1 = () => 10;
            Console.WriteLine(_func1());

            //// 마지막 string Type은 반환값
            Func<int, int, string> _func2 = (num1, num2) => {
                return (num1 + num2).ToString();
            };

            Console.WriteLine(_func2(10, 11));

            // p. 464 코딩해 봅시다.
            // 복잡한 Func문이 나오게 됩니다. 이론을 확실하게 잡고가야 됩니다.

            #endregion

            #region Action
            // ex) Func / Action
            // 이름을 Action으로 하자

            // 반환값이 없는 delegate

            Action _action0 = () => {
                Console.WriteLine("파라미터, 반환값 없는 Delegate");
                //return 10;
            };
            _action0();

            Action<int, string, int> _action1 = (num1, str1, num2) => {
                int _result = num1 + Convert.ToInt32(str1) + num2;
                Console.WriteLine(_result);
            };
            _action1(10, "11", 12);

            // p. 466 코딩해 봅시다.
            // 복잡한 Func문이 나오게 됩니다. 이론을 확실하게 잡고가야 됩니다.

            #endregion

            #endregion

            // 식트리 관련은 읽어보기

            #region 14.5 식트리

            // 식트리는 한 부모 노드가 단 두개의 자식노드를 가질 수 있는 이진트리
            // p. 468 그림 확인 >> 1*2+(7-8)

            // 이렇게도 쓸수 있구나. 까지만 이해하면 될 것 같습니다.

            //컴파일러
            // 소스 -> (분석) -> 식트리 
            // 이(식트리)를 바탕으로 실행파일을 만듬.

            // C#은 코드안에서 직접 식트리를 조립하고 컴파일해서 사용할 수 있는 기능을 제공
            // => 프로그램 실행중에 함수를 만들어 사용할 수 있게 해준것 입니다.            
            // p. 468 내용 확인


            // 팩토리 매소드 예시
            // P. 470 상단 박스 참고
            BasePerson _person = new Person("성준");   //형변환
            BasePerson _person2 = FactoryPerson("성준");


            // 1*2+(x-y)  //Expression 참조 추가하기
            Expression _const1 = Expression.Constant(1);  //반환값 ConstantExpression > Expression
            Expression _const2 = Expression.Constant(2);

            Expression _leftExp = Expression.Multiply(_const1, _const2); // 1* 2

            Expression _param1 = Expression.Parameter(typeof(int));  // x를 위한 변수 : Type형 변수
            Expression _param2 = Expression.Parameter(typeof(int));  // y를 위한 변수 : Type형 변수

            Expression _rightExp = Expression.Subtract(_param1, _param2); // x - y

            Expression _exp = Expression.Add(_leftExp, _rightExp); // 최종 식트리!


            // 람다식을 나타내는 식트리
            // 람다식을 나나태는 식트리
            Expression<Func<int, int, int>> expression =
                Expression<Func<int, int, int>>.Lambda<Func<int, int, int>>(
                    _exp, new ParameterExpression[] {
                            (ParameterExpression)_param1,
                            (ParameterExpression)_param2,
                          }
                    );

            // 식트리를 실행하기 위해, Complie Method 호출. 실행가능한 대리자를 만듬.
            Func<int, int, int> _func3 = expression.Compile();

            // 대리자 호출
            Console.WriteLine("계산결과:{0}", _func3(7, 8));


            // 람다 식을 나타내는 식 트리는 LambdaExpression 또는 Expression<TDelegate> 형식입니다.
            // 이러한 식 트리를 실행하려면 Compile 메서드를 호출하여 실행 가능한 대리자를 만든 후 대리자를 호출
            // 식트리 > 람다 식트리 > Complie 메서드를 통해 대리자생성 > 대리자 호출


            // 람다식을 이용해서 식트리 만들기
            Expression<Func<int, int, int>> expression2 = (a, b) => 1 * 2 + (a - b);
            Func<int, int, int> _func4 = expression2.Compile();
            Console.WriteLine("계산결과:{0}", _func4(7, 8));

            //람다식 > 람다식을 나타내는 식트리 > Complie 메서드를 통해 대리자생성 > 대리자 호출

            #endregion

            #region 14.6 식으로 이루어지는 멤버

            // 기존에는 속성, 인덱서, 생성자는 중괄호 { } 로 만들었습니다. (문 형식)
            // 멤버들을 식으로 구현해보자
            // 코드를 더 간결하고 더 읽기 쉽도록 만들어 주는 기능
            // 6.0, 7.0에서 도입된 기능이라서 현재 소스에서는 잘 활용되고 있지않음
            // 이런게 있다 정도로만 인식하면 좋을것 같습니다.

            // ex) 식으로 이루어지는 멤버

            #endregion

            // 프로그램 실행 시, 바로 종료되지 않도록 하기 위해서 삽입
            // (한 Line을 입력해야 해당 함수를 넘어감 (ex. Enter)
            Console.ReadKey();
        }

        #region 람다식

        delegate int MyDelegate(int a, int b);
        delegate void MyDelegate2(int a, int b);

        delegate TReuslt MyDelegate3<T1, T2, TReuslt>(T1 a, T2 b);
        //delegate TReuslt Func<T1, T2, TReuslt>(T1 a, T2 b);

        delegate void VoidReturnDelegate(int a, int b);
        delegate void VoidReturnDelegate2();
        class Calculator
        {
            public int Plus(int a, int b)
            {
                return a + b;
            }
        }

        #endregion

        #region Func / Action
        public delegate T3 FuncMyDelegate2<T1, T2, T3>(T1 a, T2 b);
        public delegate TResult FuncMyDelegate3<T1, T2, TResult>(T1 a, T2 b);
        public delegate TResult FuncMyDelegate4<in T1, in T2, out TResult>(T1 a, T2 b);

        public delegate void ActionMyDelegate5<T1, T2>(T1 a, T2 b);
        public delegate void ActionMyDelegate6<in T1, in T2, in T3>(T1 a, T2 b, T3 c);

        // in, out, ref
        // https://docs.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/in-parameter-modifier 
        // https://docs.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/out-parameter-modifier

        #endregion

        #region 식트리
        class BasePerson
        {

        }

        class Person : BasePerson
        {

            public string Name { get; set; }

            public Person()
            {

            }

            public Person(string Name)
            {
                this.Name = Name;
            }
        }

        // 팩토리 매소드 예시
        static Person FactoryPerson(string Name)
        {
            return new Person(Name);
        }

        #endregion

        #region 식으로 이루어지는 멤버

        class FriendList
        {
            private List<string> list = new List<string>();


            public void Add(string name) => list.Add(name);
            public void Remove(string name) => list.Remove(name);

            public FriendList() => Console.WriteLine("FriendList2 생성자 호출");

            public int Capacity => list.Capacity;
            public string this[int index]{
                get => list[index];
                set => list[index] = value;
            }
        }

        class FriendList2
        {
            private List<string> list = new List<string>();

            public void Add(string name)
            {
                list.Add(name);
            }

            public void Remove(string name)
            {
                list.Remove(name);
            }

            public FriendList2()
            {
                Console.WriteLine("FriendList2 생성자 호출");
            }


            public int Capacity
            {
                get {
                    return list.Capacity;
                }
            }

            public string this[int index] {
                get {
                    return list[index];
                }
                set {
                    list[index] = value;
                }
            }

        }


        #endregion
    }
}
