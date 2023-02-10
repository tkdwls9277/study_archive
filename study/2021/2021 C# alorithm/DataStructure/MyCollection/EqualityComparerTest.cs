using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
    public class EqualityComparerTest
    {
        public static void Test()
        {
            //var a = new Car(1998, "honda");
            //var b = new Car(1997, "hyundae");
            //var c = new Car(1998, "toyota");
            //var d = new Car(1991, "Toyota");


            //Console.WriteLine(a.Equals(b));    //=> false
            //Console.WriteLine(a.Equals(c));    //=> true


            //var x = new MyList<Car>();
            //x.Add(a);
            //x.Add(b);
            //x.Add(c);
            //Console.WriteLine(x.Contains(new Car(1997, "samsung")));    //=> 기본 비교자에 의해 년도만 비교하므로 true


            //var y = new MyList<Car>(new CarEqualityComparer());    // 기본 비교자가 아닌 사용자 정의 비교자를 사용하도록 지정한다.
            //y.Add(a);
            //y.Add(b);
            //y.Add(c);
            //Console.WriteLine(x.Contains(new Car(1997, "samsung")));   //=> 지정된 사용자 정의 비교자에 의해 년도와 제조사를 비교하므로 false

            //var uuu = new StringEqualityComparer();
            //Console.WriteLine(uuu.Equals(c.Make, d.Make));
            //Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록

            //----------------------------------------------------------

            // 형식 비교자를 사용하는 경우와 그렇지 않는 경우의 사용예제
            var list = new MyList<Car>();

            list.Add(new Car(1992, "Ford"));
            list.Add(new Car(1999, "Buick"));
            list.Add(new Car(1997, "Honda"));
            list.Add(new Car(1992, "Ford"));
            list.Add(new Car(1999, "Buick"));
            list.Add(new Car(1997, "Honda"));

            Console.WriteLine(list.FindIndex((name) => {
                return name.Make == "Ford";
            }));

            Console.WriteLine();
            var allItem = list.FindAll((name) => {
                return name.Make == "Ford";
            });

            foreach (var item in allItem) {
                Console.WriteLine(item);
            }

            Console.WriteLine();
            Console.WriteLine(list.FindLastIndex((name) => {
                return name.Make == "Ford";
            }));

            Console.WriteLine();
            Console.WriteLine(list.Contains((name) => {
                return name.Make == "Ford";
            }));

            Console.WriteLine();
            list.ForEach((name) => {
                Console.WriteLine(name);
            });


            //Console.WriteLine(list.BinarySearch(new Car(1992, "Ford")));

            //Console.WriteLine();

            //list.Sort();   //=> Sorted by Year (Ascending - IComparable 사용)
            //foreach (var item in list) {
            //    Console.WriteLine(item);  //=> Car 객체 내부의 값이 문자열로 출력될 수 있도록 Car객체의 ToString() 메소드를 재정의해야 함.
            //}

            //Console.WriteLine();

            //list.Sort(new YearDescendingComparer());  //=> Sorted by Year (Descending - IComparer 사용)
            //foreach (var item in list) {
            //    Console.WriteLine(item);
            //}

            //Console.WriteLine();

            //list.Sort(new MakeAscendingComparer());   //=> Sorted by Make (Ascending  - IComparer 사용)
            //foreach (var item in list) {
            //    Console.WriteLine(item);
            //}

            Console.Read(); // 키를 입력할때 까지 화면이 멈쳐있도록
        }
    }

    public class StringEqualityComparer : EqualityComparer<string>
    {
        public override bool Equals(string x, string y)
        {
            return x.Equals(y, StringComparison.OrdinalIgnoreCase);
        }

        public override int GetHashCode(string obj)
        {
            return 0;
        }
    }

    public class YearDescendingComparer : IComparer<Car>
    {
        public int Compare(Car x, Car y)
        {
            return y.Year.CompareTo(x.Year);
        }
    }

    public class MakeAscendingComparer : IComparer<Car>
    {
        public int Compare(Car x, Car y)
        {
            return x.Make.CompareTo(y.Make);
        }
    }


    public class Car: IComparable<Car>
    {
        public int Year;
        public string Make;

        public Car(int year, string make)
        {
            this.Year = year;
            this.Make = make;
        }
        public int CompareTo(Car other)
        {
            return this.Year - other.Year;    // Ascending by Year
        }
        // 기본으로 재 정의한 같음 비교(생산년도가 같으면 제조사가 달라도 같은 차로 인식한다)
        public override bool Equals(object obj)
        {
            Car other = obj as Car;
            return this.Year == other.Year;    // Compare by Year
        }

        // 기본으로 재 정의한 객체를 해싱하는 값(생산년도를 기준으로 해싱하므로 동일한 생산년도가 많은 경우 중복이 된다)
        public override int GetHashCode()
        {
            return Year.GetHashCode();
        }

        public override string ToString()
        {
            return string.Format("{0}: {1}", Year, Make);
        }
    }

    public class CarEqualityComparer : IEqualityComparer<Car>
    {
        // 생산년도와 제조사가 모두 같아야 같은 차로 인식한다
        public bool Equals(Car x, Car y)
        {
            if (x.Year != y.Year) return false;
            if (x.Make != y.Make) return false;
            return true;
        }

        // 생산년도와 제조사 값 모두를 이용하여 해싱코드를 생성한다
        public int GetHashCode(Car obj)
        {
            int hCode = obj.Year.GetHashCode() ^ obj.Make.GetHashCode();
            return hCode.GetHashCode();
        }
    }



}
