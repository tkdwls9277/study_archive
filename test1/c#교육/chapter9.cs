using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program_9
    {
        static void Main2(string[] args)
        {
            // 객체지향에 대한 설명


            // 메세지를 어떤식으로 전달할까
            // 1. 기존의 캡슐화
            MyClass obj1 = new MyClass();
                
              //private 변수에는 접근 못함
              //obj1.myField 에는 접근 못함 private
              //obj1.myField = 3;
            obj1.SetMyField(3);
            Console.WriteLine(obj1.GetMyField());

            // 2. 메소드보다 프로퍼티
            MyClass2 obj2 = new MyClass2();
            
            obj2.Myfield = 6;
            Console.WriteLine(obj2.Myfield);


            // 3. 자동 구현 프로퍼티
            MyClass3 obj3 = new MyClass3();
            obj3.Myfield = 9;
            Console.WriteLine(obj3.Myfield);

            MyClass3 obj4 = new MyClass3() {
                Myfield = 12
            };
            Console.WriteLine(obj4.Myfield);


            #region Property의 이해
            Person _person = new Person();
            _person.BirthDay = new DateTime(1990, 1, 1);

            #endregion


            #region Casting
            Animal _dog = new Dog("dog1");
            Dog _dog2 = new Dog("dog2");

            
            Animal _dog3 = (Animal)_dog2;
            Animal _dog4 = _dog2 as Animal;

            //Upcasting 발생 (자식 Type을 부모 Type으로 형변환) : 자동으로!!
            Animal _dog5 = _dog2;

            AnimalClinic _clinic = new AnimalClinic();


            Dog _dog22 = new Dog("방울이");
            Dog _dog222 = new Dog("몽자");

            _clinic.AddDogAnimal(_dog2);
            _clinic.AddDogAnimal(_dog22);
            _clinic.AddDogAnimal(_dog222);


            _clinic.AddAnimal(_dog);
            _clinic.AddAnimal(_dog3);
            _clinic.AddAnimal(_dog4);

            _clinic.AddAnimal(_dog22);

            #endregion


            Console.ReadKey();

        }

        #region Castring Class

        public class Animal
        {
            public string NAME;

            public Animal(string name)
            {
                NAME = name;
            }

        }

        public class Dog : Animal
        {
            public string DogProperty;

            public Dog(string name) : base(name)
            {
                DogProperty = "Dog";
            }
        }

        public class Cat : Animal
        {
            public string CatProperty;

            public Cat(string name) : base(name)
            {
                CatProperty = "Cat";
            }
        }

        public class AnimalClinic
        {
            public AnimalClinic()
            {

            }

            // Upcasting 하나의 매개변수 형으로, 여러 형을 받아 줄 수 있음.
            public void AddAnimal(Animal ani)
            {
                //동물들의 이름을 저장해서 관리함.
            }


            public void AddDogAnimal(Dog dog)
            {
                //Dog들의 이름을 저장해서 관리함.
            }

            public void AddCatAnimal(Cat cat)
            {
                //Cat들의 이름을 저장해서 관리함.
            }
        }


        #endregion


        #region Property의 이해

        class Person
        {
            // 왜 Property를 사용할까?
            public int BirthDay2;

            // pivate - pubic 수준을 결정 (공개 수준 결정)
            private int _age;
            private DateTime _birthday;

            public DateTime BirthDay
            {
                get {
                    return _birthday;
                }
                set {
                    _birthday = value;
                    _age = DateTime.Now.Year - _birthday.Year;
                }
            }

        }


        class Party
        {
            public void setParty()
            {
                // _age 정보는 숨길 수 있어, 필요한 정보만 공개해.
                Person _custom = new Person();
                _custom.BirthDay = new DateTime(1990, 1, 1);
               
            }


        }

        #endregion



        // 기존의 캡슐화
        class MyClass
        {
            //public int myField;
            private int myField;

            public int GetMyField()
            {
                return myField;
            }

            public void SetMyField(int newValue)
            {
                myField = newValue;
            }
        }

        // 메소드보다 프로퍼티
        class MyClass2
        {
            private int myField;


            public int Myfield2;
            public int Myfield
            {
                get {
                    return myField;
                }
                set {
                    myField = value;
                }
                //읽기전용으로 만들고 싶으면 Set을 지워!
            }
        }

        // 자동구현 프로퍼티
        class MyClass3
        {
            // 이렇게만 선언하면, 내부적으로  자동으로 필드를 생성함. (9.3.1)
            public int Myfield { get; set; }

            public int Myfield2 { get;}

            // 생성자에서 Property 값 할당하기
            public MyClass3()
            {
                Myfield = 15;
            }
            // 생성시 Property 값 할당하기

            // 자동구현 프로퍼티의 초기화
           public int Myfield3 { get; set; } = 12;
        }

    }







}
