using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program_8
    {
        static void Main2(string[] args)
        {
            // 0. p.287 내용 설명
            // 다양한 종류로 로그를 쌓을 수는 있지만 사용은 동일하게 하자.
            // > ILog라는 Infterface를 무조건 상속받게 하자 
            // > 구현은 Class에 따라 달라질 수 있음. 
            //   파일에 쓰기, DB에 쓰기, 메신저로 알려주기 등.

            // ILogger Interface 확인.

            ErpSlipKey key = new OrderSlip();

            // 1. 인터페이스는 인스턴스를 못 만들지만, 참조를 만들수 있다.
            ILogger _logger = new consoleLogger();

            //ILogger _logger2 = new ILogger();

            // 2. 실제 사용할때, 어떤방식으로 로그를 남길지 선택해서 사용하면 돼
            ILogger _logger2 = new deployProgramLogger();

            #region 다중 상속 실행
            // 3. 다중 상속 테스트
            ILogger2 _logger3 = new testMultiLogger();
            IDateTimeLogger2 _logger4 = new testMultiLogger();

            _logger3.WriteLog("ILogger2 로그");
            _logger3.WriteLog("IDateTimeLogger2 로그");
            #endregion



            Console.ReadKey();


            // XX 서비스 로직
            ILogger _logger5= new consoleLogger();

            // 공통로그 함수 사용
            LogClass.CommonLog(_logger5, "에러내용1");


            // XX 스케줄 로직
            ILogger _logger6 = new deployProgramLogger();

            // 공통로그 함수 사용
            LogClass.CommonLog(_logger6, "에러내용2");


            // XX 서버 로직
            // txt 파일로 로그를 저장하는 textLogger();
            //ILogger2 _logger7 = new textLogger();

            // 공통로그 함수 사용
            //LogClass.CommonLog(_logger7, "에러내용3");

            // xx 서비스 로직에서 deploy 로그를 쌓고 싶다면?
            // logger를 설정해주는 부분만 변경하면 됨.
            // ILogger _logger5 = new consoleLogger();
            // >> ILogger _logger5 = new deployProgramLogger();


            // 공통 Base부분은 모두 동일.
            // 처음 설정해주는 로그정보에 따라 로그가 쌓이게 됨.
            try {

                //.... 코딩 내용

            }
            catch (Exception ex) {
                // 오류 발생시, 로그를 쌓는다.
                LogClass.CommonLog(_logger, ex.Message);
            }


            // 8.5 추상 클래스 
            // 읽어보기~
            // https://hongjinhyeon.tistory.com/93

        }
    }



    // 인터페이스 설정
    public interface ILogger
    {
        void WriteLog(string log);

    }

    #region 인터페이스의 상속
    interface IDateTimeLogger : ILogger
    {
        void WriteDatetimeLog(string message, DateTime date);
    }

    class consoleWriteLogger : IDateTimeLogger
    {
        public void WriteLog(string message)
        {
            Console.WriteLine("consoleLogger");

            // Console 창에 로그를 출력하는 로직
            Console.WriteLine(message);
        }

        public void WriteDatetimeLog(string message, DateTime date)
        {
            Console.WriteLine("consoleWriteLogger");

            // Console 창에 시간과 로그를 출력하는 로직
            Console.WriteLine(string.Format("시간 : {0} - {1}", date, message));
        }

    }

    #endregion

    #region 인터페이스의 다중 상속
    interface ILogger2
    {
        void WriteLog(string log);
    }

    interface IDateTimeLogger2
    {
        void WriteLog(string log);
    }
    class testMultiLogger : ILogger2, IDateTimeLogger2
    {
        //함수명과 파라미터가 같아도 상관없음.
        public void WriteLog(string message)
        {
            Console.WriteLine("testMultiLogger");

            // Console 창에 로그를 출력하는 로직
            Console.WriteLine(message);
        }


    }
    #endregion

    #region 하나의 Interface를 약속한, 여러 Class들
    // 종류에 따른 로그
    class consoleLogger : ILogger
    {
        public void WriteLog(string message)
        {
            Console.WriteLine("consoleLogger");

            // Console 창에 로그를 출력하는 로직
            Console.WriteLine(message);
        }

        // ILogger를 상속받지 않았으면, 개별함수를 모두 구현해줘야 됨.
        // 구현을 해준다는 것은 변함이 없지만, 일관성이 떨어짐.
        // WiteLog함수에 대한 포멧을 지정해줌 - 약속!
        public void ConsoleWriteLog(string message)
        {
            Console.WriteLine("consoleLogger");

            // Console 창에 로그를 출력하는 로직
            Console.WriteLine(message);
        }

    }

    class deployProgramLogger : ILogger
    {
        public void WriteLog(string message)
        {
            Console.WriteLine("deployProgramLogger");

            // DB에 로그를 저장하는 로직 (배포프로그램에서 확인 할 수 있도록)
        }

        public void deployProgramWriteLog(string message)
        {
            Console.WriteLine("deployProgramLogger");

            // DB에 로그를 저장하는 로직 (배포프로그램에서 확인 할 수 있도록)
        }
    }

    class serviceLogger : ILogger
    {

        public void WriteLog(string message)
        {
            Console.WriteLine("serviceLogger");

            // txt 파일에 로그를 저장하는 로직

        }

        public void ServiceWriteLog(string message)
        {
            Console.WriteLine("serviceLogger");

            // txt 파일에 로그를 저장하는 로직

        }
    }

    /// <summary>
    ///  Log관련 공통함수
    /// </summary>
    public class LogClass
    {
        public static void CommonLog(ILogger log, string msg)
        {
            log.WriteLog(msg);
        }
    }

    #endregion


    #region 추상클래스
    abstract class BaseLoggerClass
    {
        public abstract void WriteBaseLoggerLog();
    }
    
    class LoggerClass : BaseLoggerClass
    {
        public override void WriteBaseLoggerLog()
        {
            Console.WriteLine("추상클래스 구현");
        }
    }
    #endregion

    #region 가상클래스
    public class Animal
    {
        public virtual void Speak()
        {
            Console.WriteLine("Nothing!");
        }
    }

    public class Dog : Animal
    {
        public override void Speak()
        {
            Console.WriteLine("멍멍!");
        }
    }

    public class DogDoll : Animal
    {

    }

    #endregion




    /*
     * Vritual은 하나의 기능을 하는 완전한 클래스
     * 필요할땐, 자식이 상속받아서 override를 하여 사용.
     * 
     * 
     * 보통 abstract는 개념적으로 계층적인 구조
     * (동물이나 어떤 사물의 계층적인 구조가있을때) 
     * 
     * 
     * Interface는 서로다른 계층이나 
     * 타입이라도 같은기능을 추가하고 싶을때 사용합니다.
     * (사람이나 기계가 말을하게(speak) 하는 인터페이스를 추가할때)
     */








}
