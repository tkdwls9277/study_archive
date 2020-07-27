using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program_16
    {
        static void Main(string[] args)
        {
            #region 16.1 리플랙션
            // p. 517 설명 확인.
            // 리플랙션은 객체를 X-Ray 사진처럼 객체의 형식정보를 보는 기능

            // Type을 통해 객체를 생성.
            var _person = new PersonTest();

            // 객체를 통해 Type을 알아냄 : 리플랙션을 사용해서.
            // (객체의 Type, 프로퍼티, 메소드, 필드, 이벤트 등)

            // GetType() 함수를 이용해서 Type정보를 알아냄
            // Object Type의 함수 사용 가능 : public Type GetType();
            // C#의 모든데이터 형식이 Object Type을 가지고 있음.
            Type _type = _person.GetType();
            FieldInfo[] _fields = _type.GetFields(); //필드정보를 조회하는 함수

            foreach(var field in _fields) {
                Console.WriteLine("{0} - {1}", field.FieldType.Name, field.Name);
            }

            // 그외의 정보 조회 (p. 518 표 확인)
            MethodInfo[] _methods = _type.GetMethods(); // Method 정보를 조회하는 함수
            PropertyInfo[] _propertys = _type.GetProperties(); // Property 정보를 조회하는 함수
            MemberInfo[] _members = _type.GetMembers();  // Member 정보를 조회
            Type[] _interfaces = _type.GetInterfaces();  // Interface 정보를 조회

            MemberInfo[] _members2 = _type.GetMembers(BindingFlags.Public | BindingFlags.NonPublic); // Method 정보를 조회하는 함수

            // Property명을 지정해서 Property 정보를 가져오기
            PropertyInfo _property = _type.GetProperty("Name");

            // 이런게 있다 정도만 알고 넘어가면 될 것 같습니다.

            // Type을 얻는 다른방법 (이런게 있다 라고만 알아두면 됩니다.)
            Type _type2 = _person.GetType();
            Type _type3 = typeof(PersonTest);  
            Type _type4 = Type.GetType("ConsoleApp1.Program_16+PersonTest");

            #endregion

            #region 16.1.2 리플렉션을 이용해서 객체 생성하고 이용하기

            // p. 524 내용 확인.

            // 리플렉션을 이용해서, 특정 Type의 인스턴스를 만들고, 데이터를 할당하며, 메소드를 호출해보자
            // 런타임에 특정 형식의 인스턴스를 만들게 되면, 더 동적으로 동작하도록 구현가능

            //Type을 통해 PersonTest 객체를 생성
            object a = Activator.CreateInstance(typeof(PersonTest));
            var a1 = new PersonTest();
            //일반화가 적용된 Type을 통해 객체를 생성
            List<PersonTest> b = Activator.CreateInstance<List<PersonTest>>();


            // (p. 525)
            // Profile Class 정의
            Type _typeInfo = typeof(Profile); //타입형식 반환
            object profile = Activator.CreateInstance(_typeInfo);  //해당 형식을 통한 객체생성

            PropertyInfo name = _typeInfo.GetProperty("Name");
            PropertyInfo phone = _typeInfo.GetProperty("Phone");

            //profile객체의 Name Property에 박찬호의 값을 넣어.
            name.SetValue(profile, "박찬호", null);
            phone.SetValue(profile, "010-1234-1234", null);

            // profile 객체 디버깅으로 정보 확인해 보기.

            // 마지막 매개변수는 인덱서의 인덱스를 위해 사용됨.
            //https://docs.microsoft.com/ko-kr/dotnet/api/system.reflection.propertyinfo.setvalue?redirectedfrom=MSDN&view=netframework-4.8#overloads

            MethodInfo method = _typeInfo.GetMethod("Print");
            method.Invoke(profile, null); // Invoke 호출 시 파라미터 : 실행할 객체, 파라미터

            // (p. 527) 코딩해봅시다.

            //Auction > Class
            //Gmarket > Class
            //Tmon > Class

            //string market = "";  //Auction, Gmarket, Tmon

            //if(market == "Auction") {
            //    var marketInstance = new Auction();
            //}
            //if (market == "Gmarket") {
            //    var marketInstance = new Gmarket();
            //}
            //if (market == "Tmon") {
            //    var marketInstance = new Auction();
            //}

            //var marketInstance2 = Activator.CreateInstance("market", "");



            #endregion

            #region 16.2 애트리뷰트

            // p.534 하단 예시 확인.
            // 애트리뷰트 : 코드에 대한 부가정보를 기록하고 읽는 기능

            // 주석 > 사람이 쓰고, 사람이 읽는 정보
            // 애트리뷰트 > 사람이 쓰고, 컴퓨터가 읽는 정보

            // (p. 534) 하단 굵은 글씨 읽어보기 - 애트리뷰트란?
            // (p.535) 녹색박스 - 메타데이터
            #endregion


            #region 16.2.1 애트리뷰트 사용하기

            // (p. 535) 애트리뷰트 작성법 확인하기
            // ex) 애트리뷰트 사용하기
            Myclass _myclass = new Myclass();
            _myclass.oldMethod();  // 경고 발생, 빌드 시 오류 발생
            //_myclass.newMethod();

            #endregion


            #region 16.2.3 내가 만든 애트리뷰트
            // p. 539 쪽부터 한번 씩읽어보기
            // 직접 애트리 뷰트를 만들 수 있다.
            // ex) ERP - EAAController.cs / ESKController.cs
            #endregion

            #region 17.1 dynamic

            // dynamic 형식도 데이터 형식
            // 다만 형식 검사가 컴파일할때 이루어지는 다른 형식과는 다르게 프로그램 실행중에 이루어짐
            var _person33 = new Person();
            Person _person3 = new Person();
            object _person31 = new Person();
            //string abc = new Person();  //컴파일 시에 오류 발생
            dynamic abd = new Person();

            Myclass3 _testClass3 = new Myclass3();
            _testClass3.FuncA();
            //_testClass3.FuncB();  // 컴파일 시에 오류 발생

            dynamic _testClass4 = new Myclass3();
            _testClass4.FuncA();
            //_testClass4.FuncB();  // dynamic을 쓸때는 항상 주의해야돼.


            // var와의 차이점. var는 컴파일 시에  Myclass3 _testClass5 = new Myclass3(); 변경됨
            var _testClass5 = new Myclass3();
            _testClass5.FuncA();
            //_testClass5.FuncB();  

            object _testClass6 = new Myclass3();   // object, dynamic, var의 차이점 확인하기.
            //_testClass6.FuncA();



            // p. 550 내용확인
            // dynamic Type을 사용하면, 형식검사를 실행할 때 하도록 미룬다.
            // 왜 사용할까?
            // ex) 오리타이핑

            // 오류 발생, Robot은 Duck Type이 아니므로!!
            //Duck[] _arr = new Duck[] { new Duck(), new Mallard(), new Robot() };

            dynamic[] _arr2 = new dynamic[] { new Duck(), new Mallard(), new Robot() };
            

            // dynamic Type은 인텔리전스 지원이 안됨. Type을 모르니깐 (자동완성)
            foreach(var duck in _arr2) {
                Console.WriteLine(duck.GetType());
                duck.Walk();
                duck.Swim();
                duck.Quack();

                Console.WriteLine();
            }

            Console.WriteLine("-------------------------");

            IDuck[] _arr4 = new IDuck[] { new Duck2(), new Mallard2(), new RobotDuck() };

            foreach (var duck in _arr4) {
                Console.WriteLine(duck.GetType());

                duck.Walk();
                duck.Swim();
                duck.Quack();

                Console.WriteLine();
            }

            dynamic _str = "111111";
            string _str2 = "222222";

            var dataStr = _str2.vToString();
            var dataStr2 = _str.vToString(); //dyNamic은 확장 Method를 사용 못함.
            
            // Dev. Share. 744

            #endregion




            // 프로그램 실행 시, 바로 종료되지 않도록 하기 위해서 삽입
            // (한 Line을 입력해야 해당 함수를 넘어감 (ex. Enter)
            Console.ReadKey();
        }

        #region

        interface IPerson
        {
            string newName { get; set; }
            int newAge { get; set; }

            void setName(string name);
        }

        public class PersonTest : IPerson
        {
            

            public string Name { get; set; }
            public int AGE { get; set; }

            Person aaa = new Person();

            public Person aaa2 = new Person();

            public string _name = "123";
            public int _age;

            public string _name2;
            public int _age2;


            public PersonTest()
            {

            }

            public int GetAge()
            {
                
                return AGE;
            }

            private string getName()
            {
                return Name;
            }

            public string newName { get; set; }
            public int newAge { get; set; }
            public void setName(string name)
            {
                this.Name = name;
            }
        }

        #endregion

        #region Profile
        class Profile
        {
            public string Name { get; set; }
            public string Phone { get; set; }

            public Profile()
            {

            }

            public void Print()
            {
                Console.WriteLine("{0} - {1}", Name, Phone);
            }

        }
        #endregion

        #region 애트리뷰트 사용하기

        class Myclass
        {
            // 주석과 같은 용도의 애트리 뷰트
            [Obsolete("oldMethod는 앞으로 사용할 수 없습니다. >> newMethod를 사용하세요.")]
            public void oldMethod()
            {
                Console.WriteLine("oldMethod");
            }

            public void newMethod()
            {
                Console.WriteLine("newMethod");
            }
        }


        #endregion

        #region 호출자 정보 애트리뷰트

        public static void Create(string name, string phone = "010-12324-1234", string address = "")
        {
            Console.WriteLine("{0} : {1} : {2}", name, phone, address);
        }

        public static void Create(string name)
        {
            Console.WriteLine("{0}", name);
        }

        public static class Trace
        {
            //  각각 기본값이 있는 선택적 매개 변수에 적용되는 특성
            public static void WriteLine(string msg, [CallerFilePath] string file = "", [CallerLineNumber] int line = 0, [CallerMemberName]string member = "")
            {
                Console.WriteLine("{0} - (Line:{1}) - {2} : {3}", file, line, member ,msg);
            }
        }

        #endregion

        #region 내가 만든 애트리뷰트
        // 변경이력을 저장하는 애프리뷰트
        class History : System.Attribute
        {
            private string programmer;

            public double Version
            {
                get;
                set;
            }

            public string Changes
            {
                get;
                set;
            }

            //생성자
            public History(string programmer)
            {
                this.programmer = programmer;
                Version = 1.0;
                Changes = "First release";
            }

            public string Programmer
            {
                get { return programmer; }
            }
           
        }

        // 주석의 용도로 사용
        [History("Sean", Version = 0.1, Changes ="2019-08-28 Created Class stud")]
        //[History("Sean", Version = 0.1, Changes = "2019-08-28 Created Class stud")]  //중복은 안됨. Attribute 설정을 변경해 줘야 됩니다.
        class AttributeTest
        {
            public void Func()
            {
                Console.WriteLine("Func()");
            }
        }


        //Attribute 생성 시, Attribute의 속성을 Attribute로 정할 수 있다.
        [System.AttributeUsage(System.AttributeTargets.Class, AllowMultiple = true)]
        class History2 : System.Attribute
        {
            private string programmer;

            public double Version
            {
                get;
                set;
            }

            public string Changes
            {
                get;
                set;
            }

            //생성자
            public History2(string programmer)
            {
                this.programmer = programmer;
                Version = 1.0;
                Changes = "First release";
            }

            public string Programmer
            {
                get { return programmer; }
            }

        }

        [History2("Sean", Version = 0.1, Changes = "2019-08-28 Created Class stud")]
        [History2("Bob", Version = 0.2, Changes = "2019-08-29 Modifiy Func()")]  //Attribute 설정을 변경하여 중복 가능.
        class AttributeTest2
        {
            public void Func()
            {
                Console.WriteLine("Func222()");
            }
        }

        // => 이런게 있다, 이렇게 쓰는구나 까지만 알아둬 될 것 같습니다.
        //    코딩을 하다 Attribute가 보이면, f12로 확인하여 어떤용도인지 파악

        #endregion

        #region dynamic

        class Myclass3
        {
            public void FuncA()
            {

            }

        }
        #endregion

        #region 오리타이핑
        //"오리처럼 걷고 오리처럼 헤엄치며 오리처럼 꽉꽉 거리는 새를 봤을 때, 나느 그새를 오리라 부른다."

        //오리
        class Duck
        {
            public void Walk()
            {
                Console.WriteLine("Duck.Walk");
            }
            public void Swim()
            {
                Console.WriteLine("Duck.Swim");
            }
            public void Quack()
            {
                Console.WriteLine("Duck.Quack");
            }
        }

        //천둥오리
        // 천둥오리는 오리의 속성을 가지고 있으니 오리이다. (걷고, 헤엄치고, 곽곽거리고)
        class Mallard : Duck
        {

        }

        class Robot
        {
            public void Walk()
            {
                Console.WriteLine("Robot.Walk");
            }
            public void Swim()
            {
                Console.WriteLine("Robot.Swim");
            }
            public void Quack()
            {
                Console.WriteLine("Robot.Quack");
            }
        }

        interface IDuck
        {
            void Walk();
            void Swim();
            void Quack();
        }

        class RobotDuck : IDuck
        {
            public void Walk()
            {
                Console.WriteLine("RobotDuck.Walk");
            }
            public void Swim()
            {
                Console.WriteLine("RobotDuck.Swim");
            }
            public void Quack()
            {
                Console.WriteLine("RobotDuck.Quack");
            }
        }

        class Duck2 : IDuck
        {
            public void Walk()
            {
                Console.WriteLine("Duck.Walk");
            }
            public void Swim()
            {
                Console.WriteLine("Duck.Swim");
            }
            public void Quack()
            {
                Console.WriteLine("Duck.Quack");
            }
        }

        //천둥오리
        // 천둥오리는 오리의 속성을 가지고 있으니 오리이다. (걷고, 헤엄치고, 곽곽거리고)
        class Mallard2 : Duck2
        {

        }

        // 오리타이핑의 관점에서 보면, Duck, Mallard도 오리이고, Robot도 오리이다.
        // C# 컴파일러는 Robot은 오리로 인정하지 않습니다.

        //(p. 555) 상단 dynamic의 장/단점

        #endregion


    }

    static class stringExtention
    {
        public static string vToString(this string str)
        {
            if (str == null) {
                return string.Empty;
            }

            return str;
        }
    }
}
