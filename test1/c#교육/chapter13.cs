using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program_13
    {
        static void Main(string[] args)
        {
            #region 13.1 대리자 란?

            // 대리자 > 대리하다, 대신하다, 위임하다
            // 누군가에게 위임하다.

            // 함수를 파라미터로 전달하고 싶을 때.
            // 매소드를 매개변수로 전달할 수 있음.

            // 함수를 파라미터로 받아서, 실행을 위임하다.
            // 나는 너가 뭔지는 모르겠고, 실행만 해줄꺼야.
            // 단순하게 생각해서 CallBack 이야.  메소드에 대한 참조
            
            // p. 427 delegate 선언법 확인
            // p. 428. 상단 사용법 확인. / 예제 확인


            Calculator _calc = new Calculator();
            MyDelegate _callBack;  // 대리자 Type의 선언
            // 대리자를 생성할 때, 실제사용할 함수를 파라미터로 전달합니다.
            _callBack = new MyDelegate(_calc.Plus);  // Plus 함수 용도의 대리자 생성
            Console.WriteLine(_callBack(3, 4));

            _callBack = new MyDelegate(_calc.Minus); // Minus 함수 용도의 대리자 생성
            Console.WriteLine(_callBack(7, 2));

            #endregion

            #region 13.2 대리자는 언제 사용할까?

            // p. 430 기본 설명 확인.

            // 계산기
            // > 계산해야되는 로직을 함수로 전달받았음 (Plus, Minus)

            // (정리)
            // 다양하게 코딩가능
            // 대리자사용 - 로직의 직관성이 좋음 : 함수를 하나의 실행단위로 핸들링 할 수 있음.

            #region [참고 로직]
            // 비교 메서드를 넘기고, (정렬함수를 파라미터로 전달해서 오름차순 정렬, 내림차순 정렬을 해봅시다.)
            // ex) 비교 메서드
            // BubbleSort

            int[] array = { 3, 7, 12, 8, 4, 5 };
            BubbleSort(array, new Compare(AssendCompare));

            //Console.WriteLine("버블정렬 시작");
            foreach (int item in array) {
                Console.WriteLine(item);
            }
            //Console.WriteLine("버블정렬 종료");

            // P. 432 하단부터 코딩해봅시다.
            #endregion

            #endregion

            #region 13.3 일반화 대리자
            // Generics를 대리자에도 적용시켜보자.
            // p. 435 확인 ex. 일반화 비교 매소드 확인

            // p.436 코딩 해보기

            #endregion

            #region 13.4 대리자 체인

            // 체인이란?
            // 결과 > (작업) > 결과 > (작업) > 결과
            string _num = "msg";
            string _numResult = _num.ToUpper();
            string _numResult2 = _num.ToUpper().ToLower();
            string _numResult3 = _num.ToUpper().ToLower().ToUpper().ToLower().ToUpper().ToLower();

            // 체인을 사용할때는 void 형을 반환해주세요.
            // 호출을 목적으로 하는것이고, Return을 목적으로 하는 것 이 아닙니다. (위의 상황과 헷갈리시면 안됩니다.)

            // 대리자 체인을 사용할떄는 연산자 +=, -=를 사용
            // ex) 대리자 체인

            Console.WriteLine("대리자 체인 시작 --");
            // 체인 추가
            // 아래와 같이 대리자 연결이 가능하다.
            ThereIsAFire _fire = new ThereIsAFire(Call119);
            _fire += new ThereIsAFire(ShotOut);
            _fire += new ThereIsAFire(Escape);
            _fire("슈퍼");

            Console.WriteLine("---------");

            // 체인 제거
            _fire -= new ThereIsAFire(Call119);
            _fire("슈퍼");

            Console.WriteLine("---------");


            Console.WriteLine("대리자 체인 종료 --");

            // 체인을 추가/제거 하는 다른방법 확인(p.439)
            // new ThereIsAFire(Call119) + new ThereIsAFire(ShotOut);
            // Delegate.Combine(new ThereIsAFire(Call119), new ThereIsAFire(ShotOut));

            // p.440 코딩해봅시다.

            #endregion

            #region 13.5 익명 메소드
            // 이름이 없는 Method
            // ex) 이름이 없는 객체

            // p.443 상단표 확인
            Calculate _calc2;

            //참조할 대리자의 형식과 동일한 형식!
            //delegate int Calculate(int a, int b);

            _calc2 = delegate (int a, int b) { //익명 메소드 생성 방법
                return a + b;
            };

            // (기존) 
            _calc2 = new Calculate(Calculator.Plus2);

            //?? 언제사용할까? 
            // 대리자를 사용해야 될 일이 생겼는데, 해당 메소드가 두번다시 사용할 일이 없다고 판단될 경우!!

            // 이렇게 사용하는 방법도 있다 정도만 알면 됩니다.
            // 차후, 자주사용되는 익명메소드의 사용법에 대해서 배울 예정입니다.

            // p. 444 코딩해보기 (p.433 ~ p.444와 사용방법 비교)

            #endregion

            #region 이벤트

            // 대리자를 이용해서 이벤트를 구현할 수 있다.
            // 잘 사용은 안함.
            // 이런게 있다 정도로 한번읽어 보기.
            // p. 451 하단 정리 확인.


            #region 이벤트 예제
            // ex. 버튼클릭 이벤트
            // 버튼클릭 시, 실행해야되 함수를 이벤트로 등록
            // EventHandler : 이벤트와 실행함수를 연결해줌.

            // ex. 버튼을 클릭할 때마다, Save 함수 실행
            // Save 함수를 이벤트로 등록

            // 함수를 대리자로 처리!!

            MyNotifier _nofifier = new MyNotifier();

            //  이벤트에 MyHanlder 메소드를 이벤트 핸들러로 등록합니다.
            //_nofifier.SomethingHappend SomethingHappend+= new EventHandler(MyHandler); //대리자를 통한 이벤트 등록

            EventHandler _test = new EventHandler(MyHandler);
            _test("?");

            for (int i = 0; i < 30; i++) {
                _nofifier.DoSomething(i);
            }


            // 외부에서 호출시 에러
            //_nofifier.SomethingHappend("Event");
            // 대리자는 가능 - MyDelegate예시로 확인

            //대리자와 이벤트 (p. 451)
            // 이벤트는 외부에서 호출 못함.
            // 대리자 > 콜백 용도로 사용 
            // 이벤트는 > 객체의 상태의 변화나 사건의 발생을 알리는 용도 
            #endregion


            #endregion


            // 프로그램 실행 시, 바로 종료되지 않도록 하기 위해서 삽입
            // (한 Line을 입력해야 해당 함수를 넘어감 (ex. Enter)
            Console.ReadKey();

        }

        #region 대리자 예시(p.429)

        // 사용하고 싶은 함수와 동일한 반환값, 파라미터를 가지는 delegate 선언
        //키워드  반환값  대리자Type명     파라미터
        delegate int MyDelegate(int a, int b);
        class Calculator
        {
            delegate int MyDelegate2(int a, int b);

            // 파라미터로 전달하고 싶은 함수 1
            public int Plus(int a, int b)
            {
                return a + b;
            }

            public static int Plus2(int a, int b)
            {
                return a + b;
            }
            
            MyDelegate2 _callBack2 = new MyDelegate2(Calculator.Plus2);

            // 파라미터로 전달하고 싶은 함수 2
            public int Minus(int a, int b)
            {
                return a - b;
            }
        }


        #endregion

        #region 저장 함수 대리자 

        delegate void SaveCallback(object SaveData);

        class DataManage {

            public void Save(object SaveData, string saveFlag)
            {
                if (CheckValidate(SaveData)) {

                    if (saveFlag == "BasicSave") {
                        // 기본 저장 로직
                    }
                    else if (saveFlag == "NewAfterSave") {
                        // 저장 후 신규 로직
                    }
                    else { // saveFlag == "UpdateAfterSave"
                        // 저장 후 수정 로직
                    }
                }
                else {
                    // 유효성 검사 실패 로직
                }
            }

            public bool CheckValidate(object SaveData)
            {
                // 데이터를 가지고, 유효성 검사 
                // 유효성 검사 통과하면 true
                // 실패하면 false

                return true;
            }

            public void Save2(object SaveData, SaveCallback SaveFunc)
            {
                if (CheckValidate(SaveData)) {

                    // 나는 SaveFunc의 내부 구현이 뭔지는 모르겠지만,
                    // 이때 실행만 시켜 줄꺼야
                    SaveFunc(SaveData);

                }
                else {
                    // 유효성 검사 실패 로직
                }

            }



        }



        #endregion

        #region 비교 매소드 (p. 431)

        delegate int Compare(int a, int b); // 대리자 선언

        // 오른차순 정렬
        static int AssendCompare(int a, int b)
        {
            if (a > b) {
                return 1;
            }
            else if (a == b) {
                return 0;
            }
            else {
                return -1;
            }
        }


        static void BubbleSort(int[] DataSet, Compare Compare)
        {
            // BubbleSort
            // https://gmlwjd9405.github.io/2018/05/06/algorithm-bubble-sort.html

            int i = 0;
            int j = 0;
            int temp = 0;

            for (i = 0; i < DataSet.Length - 1; i++) {
                for (j = 0; j < DataSet.Length - (i + 1); j++) {

                    // 오름차순으로 할지, 내림차순으로 할지 함수를 파라미터로 전달받는다.
                    // 무슨 정렬을 할지는 BubbleSort 호추할때 결정해줘.
                    // 어떤 로직 실행할지 전달해줘.
                    if (Compare(DataSet[j], DataSet[j + 1]) > 0) {
                        temp = DataSet[j + 1];
                        DataSet[j + 1] = DataSet[j];
                        DataSet[j] = temp;
                    }

                }
            }
        }


        #endregion

        #region 일반화 비교 매소드

        delegate int Compare<T>(T a, T b); // 대리자 선언

        // 오른차순 정렬
        static int AssendCompare<T>(T a, T b) where T : IComparable<T>
        {
            // check
            int aa = 10;
            aa.CompareTo(a);
            // int Type은 IComparable를 상속받아서 Comparable를 구현해 놨다. 편리하게 사용할 수 있도록


            // 오름차순 로직을 내부 함수를 통해서 사용
            return a.CompareTo(b);
        }

        // 내림차순 정렬
        static int DessendCompare<T>(T a, T b) where T : IComparable<T>
        {
            return a.CompareTo(b) * -1;  //값을 반대로 해주면, 내림차순 정렬이 된다.
        }

        static void BubbleSort<T>(T[] DataSet, Compare<T> Compare)
        {
            int i = 0;
            int j = 0;
            T temp;

            for (i = 0; i < DataSet.Length - 1; i++) {
                for (j = 0; j < DataSet.Length - (i + 1); j++) {

                    // 오름차순으로 할지, 내림차순으로 할지 함수를 파라미터로 전달받는다.
                    // 무슨 정렬을 할지는 BubbleSort 호추할때 결정해줘.
                    // 어떤 로직 실행할지 전달해줘.
                    if (Compare(DataSet[j], DataSet[j + 1]) > 0) {
                        temp = DataSet[j + 1];
                        DataSet[j + 1] = DataSet[j];
                        DataSet[j] = temp;
                    }
                }
            }
        }
        #endregion

        #region 대리자 체인

        delegate void ThereIsAFire(string location);

        //체인 대상 메소드1
        static void Call119(string location)
        {
            Console.WriteLine("소방서죠? 불났어요? 주소는 {0}", location);
        }

        //체인 대상 메소드2
        static void ShotOut(string location)
        {
            Console.WriteLine("피하세요! {0}에 불났어요.", location);
        }

        //체인 대상 메소드3
        static void Escape(string location)
        {
            Console.WriteLine("{0}에서 나갑시다.", location);
        }

        #endregion

        #region 익명 메소드

        delegate int Calculate(int a, int b);
        #endregion

        #region 이벤트

        // p. 446 순서를 보고 따라가기

        //delegate  반환  대리자 Type  파라미터
         delegate  void  EventHandler(string Message);  // 대리자 선언

        class MyNotifier
        {
            //    event  대리자 Type   Event 명
            public event EventHandler SomethingHappend; // 대리자를 통한 Event 선언
            
            public void DoSomething(int number)
            {
                int temp = number % 10;

                if(temp != 0 && temp % 3 == 0) {
                    SomethingHappend(String.Format("{0} : 짝", number)); // Event 가 발생. (Event를 실행)

                }
            }

            //public void PlusData(in int num)
            //{

            //}
        }

        

        static public void MyHandler(string message)
        {
            Console.WriteLine(message);
        }
       
        #endregion
    }
}
