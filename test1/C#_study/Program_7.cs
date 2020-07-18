using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//스웨거, 인섬니아
namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            /*
               세상을 추상화를 통해 객체로 표현하는 것.
                속성 + 기능

                ex) 사람

                1. 속성
                키, 몸무게, 이름 등.
             
                2. 기능
                걷기, 보기, 먹기, 듣기 등. 

                 속성 > 데이터(변수)
                 기능 > 메소드

                 Person Class 확인.



                 Class란 객체를 표현하기 위한 도구
                 ex) 
                 Class > 붕어빵 틀
                 객체, 인스턴스 > 붕어빵
            */


            // Class란?
            // New Data Type
            // 새로운(복합) 데이터 타입.
            // 사람 Type, 선풍기 Type...



            // 객체의 생성 
            var person1 = new Person();
            person1.Age = 25;
            person1.Name = "민수";
            
            var person2 = new Person();
            person2.Age = 33;
            person2.Name = "수진";

            person2.Run();



            #region [7.4 정적 필드와 메소드]

            // 메모리 측면으로 이해.

            Log log2 = new Log();
            log2.WriteLog2("");
            // Log Class 생성
            // static으로 선언할 경우, 객체 생성 없이 사용 가능하다.
            Log.WriteLog("로그 쓰자");
            Log.WriteLog("로그 쓰자 x 2");
            Log.WriteLog("로그 쓰자 x 3");

            Console.WriteLine(Log.LogBasicMsg);


            // 어느때 사용할까?
            // ZoneList 정보, 기본 에러 코드 정보 등.
            // 자주 사용되는 경우 (메모리 해제 없이 유지)
            // p.232 언제 사용해야 되는지.

            #endregion


            #region [7.5 객체복사하기: 얕은 복사와 깊은복사]

            // 사전학습
            // 값형식과 참조 형식 (p.43 ~ p.44)
            // + 타입 종류

            // 도입
            var _beforePerson = new Person();
            _beforePerson.Age = 20;

            //var _beforePerson2 = new Person(20);


            var _afterPerson = _beforePerson;
            _afterPerson.Age = 30;

            // _beforePerson, _afterPerson의 Age는?
            Console.WriteLine("_beforePerson > Age : {0}", _beforePerson.Age);

            // p. 232 ~ p. 234 소스 및 설명 확인.
            // 메모리 구조 그림으로 이해하기.

            // ** 개발 시, 얕은복사를 고려하지 못해서 오류가 발생되는 경우가 있음.

            #endregion

            #region 7.6.2 this() 생성자

            // Myclass 생성

            MyClass testClass = new MyClass();
            MyClass testClass2 = new MyClass(2);
            MyClass testClass3 = new MyClass(2,3);

            #endregion

            #region 7.8 상속으로 코드 재활용하기

            OrderSlip order = new OrderSlip();
            order.slipDate = "20200101";
            order.slipSeq = 1;
            order.etc1 = "주문전표";

            SaleSlip sale = new SaleSlip();
            sale.slipDate = "20200303";
            sale.slipSeq = 2;
            sale.etc2 = "판매전표";

            // 부모함수를 공통으로 사용할 수 있음.
            // 상속을 받지 않았다면, OrderSlip, SaleSlip Class에 모두 GetSlipInnfo함수가 필요함.
            Console.WriteLine("orderInfo : {0}", order.GetSlipInnfo());
            Console.WriteLine("saleInfo : {0}", sale.GetSlipInnfo());

            Console.WriteLine("orderInfo2 : {0}", order.GetSlipInnfo2());
            Console.WriteLine("saleInfo2 : {0}", sale.GetSlipInnfo2());


            // History Class를 통한 다형성 설명.
            History history = new History();

            history.SaveHistoryOrder(order);
            history.SaveHistorySale(sale);

            // 자식Type > 부모Type으로 자동 형변환
            history.SaveHistoryCommon(order);
            history.SaveHistoryCommon(sale);

            #endregion


            #region 7.15 확장 메소드
            // 확장 Method 기본.
            // p. 272

            // 확장 Method를 사용하지 않은 경우
            if (_beforePerson.Gender == null) {
                _beforePerson.Gender = "";
            }

            //확장 Method의 사용
            if (_beforePerson.Gender.vIsNull()) {

            }
            #endregion



            Console.ReadKey();

        }
    }


    class Person
    {
        public int Age;

        public string Gender;

        public string Name;

        public int Weight;

        public bool IsCleeanStateFlag;

        public Job Job;

        public Person(int age)
        {
            this.Age = age;
        }

        public Person()
        {

        }

        public void Shower()
        {
            // 샤워하다.
        }


        public void Eat()
        {
            // 먹다.
        }

        public void Run()
        {
            // 달리다.
        }

    }

    class Job 
    {
        public string Name;

        public Job()
        {

        }

        public Job(string name)
        {
            this.Name = name;
        }
    }

    public class Log
    {
        public static string LogBasicMsg = "오류가 발생했습니다.";

        public static void WriteLog(string msg)
        {
            // 로그를 쓰다.
            Console.WriteLine(msg);
        }

        public void WriteLog2(string msg)
        {
            // 로그를 쓰다.
            Console.WriteLine(msg);
        }
    }

    class MyClass
    {
        int a, b, c;

        public MyClass()
        {
            this.a = 1;
        }

        public MyClass(int b) : this()
        {
            this.b = b;
        }

        public MyClass(int b, int c) : this(b)
        {
            this.c = c;
        }

    }


    public class OrderSlip : ErpSlipKey
    {

        public string etc1;

        public OrderSlip()
        {

        }

        public OrderSlip(string etc1)
        {
            this.etc1 = etc1;
        }

        public override string GetSlipInnfo2()
        {
            return slipDate + "==" + slipSeq;
        }
    }

    public class SaleSlip : ErpSlipKey
    {
        public string etc2;
        

        public SaleSlip()
        {
            
        }

        public SaleSlip(string etc2)
        {
            this.etc2 = etc2;
        }
    }


    public class ErpSlipKey
    {
        // 전표 상태 ( ex. SaleSlip / ex. OrderSlip)
        public string slipState;

        // 전표 일자
        public string slipDate;

        // 전표 순번
        public int slipSeq;

        public ErpSlipKey()
        {
        }

        public string GetSlipInnfo()
        {
            return slipDate + "-" + slipSeq;
        }

        // 보모 Class에서 virtual로 선언해 놓으면, 자식 Class에서 재정의해서 사용할 수있다.
        public virtual string GetSlipInnfo2()
        {
            return slipDate + "=" + slipSeq;
        }
    }



    public class History
    {
        // 공통적으로 사용할 변수
        ErpSlipKey commonSlip;

        // 고통부분을 뽑아내지 않으면, 변수와 함수들이 메뉴마다 계속 추가가 된다 ㅠㅠ
        private SaleSlip saleSlipInfo;
        private OrderSlip orderSlipInfo;


        // 자동 형변환을 이용해서, 공통 히스토리 저장함수로 만들자
        public void SaveHistoryCommon(ErpSlipKey slip)
        {
            commonSlip = slip;

            // ErpSlipKey를 DB에 저장하는 로직
            Console.WriteLine("Slip을 DB에 저장하였습니다.");

            // 형변환에 대한 메모리 구조 설명
            // 변환이 안되는 경우에는 Error.
            // as/is의 사용
            // p.255 페이지 내용확인.

            //  SaleSlip 객체일 경우, 오류 발생
            var tempObj = (OrderSlip)slip;
            Console.WriteLine(tempObj.etc1);

            // bool 반환 (
            if (slip is OrderSlip) {
                var tempObj2 = (OrderSlip)slip;
                Console.WriteLine(tempObj2.etc1);
            }

            var tempObj3 = slip as OrderSlip;
            Console.WriteLine(tempObj3.etc1);


        }

        public void SaveHistoryOrder(OrderSlip slip)
        {
            orderSlipInfo = slip;

            // OrderSlip을 DB에 저장하는 로직
            Console.WriteLine("OrderSlip를 DB에 저장하였습니다.");
        }

        public void SaveHistorySale(SaleSlip slip)
        {
            saleSlipInfo = slip;

            // SaleSlip을 DB에 저장하는 로직
            Console.WriteLine("SaleSlip를 DB에 저장하였습니다.");
        }

    }


    public static class DataExtensions
    {
        // String Extentions
        public static bool vIsNull(this string source)
        {
            return (source == null);
        }

        public static bool vIsEmpty(this string source)
        {
            return source.vIsNull() || source == string.Empty;
        }


        public static string vSafe(this string source, string value)
        {
            if (value.vIsNull()) {
                value = string.Empty;
            }

            if (source.vIsEmpty()) {
                source = value;
            }

            return source;
        }

    }
}
