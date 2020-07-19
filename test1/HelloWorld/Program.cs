using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Console; // 입출력하는 코드를 간소화하기위함
//Console.WriteLine() => WriteLine()

namespace HelloWorld
{
    class Product
    {
        private int price = 100;

        public ref int GetPrice()
        {
            return ref price;
        }

        public void PrintPrice()
        {
            WriteLine($"Price :{price}");
        }
    }

    class MyClass
    {
        int a, b, c;

        public MyClass()
        {
            this.a = 5425;
            WriteLine("MyClass()");
        }

        public MyClass(int b):this()
        {
            this.b = b;
            WriteLine($"MyClass({b})");
        }

        public MyClass(int b, int c) : this(b)
        {
            this.c = c;
            WriteLine($"MyClass({b},{c})");
        }

        public void PrintFields()
        {
            WriteLine($"a:{a}, b:{b}, c:{c}");
        }
    }

    
    class Program
    {
        public static void Swap(ref int a, ref int b)
        {
            int temp = b;
            b = a;
            a = temp;
        }

        static void Divide(int a, int b, out int quotient, out int remainder)
        {
            quotient = a / b;
            remainder = a % b;
        }

        public static void Mean(double a, double b, double c, double d,double e,out double mean)
        {
            mean = (a + b + c + d + e) / 5;
        }

        static void Main(string[] args)
        {
            //------------------------------------------------
            //메소드의 결과를 참조로 반환하기
            //------------------------------------------------
            //product product = new product();

            //ref int ref_local_price = ref product.getprice();
            //int normal_local_price = product.getprice();

            //product.printprice();
            //writeline($"ref local price :{ref_local_price}");
            //writeline($"nomal local price :{normal_local_price}");

            //ref_local_price = 200;

            //product.printprice();
            //writeline($"ref local price :{ref_local_price}");
            //writeline($"nomal local price :{normal_local_price}");

            //------------------------------------------------


            //------------------------------------------------
            //참조에 의한 매개 변수 전달
            //------------------------------------------------
            //int x = 3;
            //int y = 4;

            //WriteLine($"x:{x}, y:{y}");

            //Swap(ref x, ref y);

            //WriteLine($"x:{x}, y:{y}");
            //------------------------------------------------


            //------------------------------------------------
            //참조에 의한 매개 변수 전달
            //------------------------------------------------
            //int a = 20, b = 3;
            //Divide(a, b, out int c, out int d);
            //WriteLine($"a:{a}, b:{b}, a/b:{c}, a%b:{d}");
            //------------------------------------------------

            //double mean = 0;
            //Mean(1, 2, 3, 4, 5, out mean);

            //WriteLine("평균:{0}",mean);

            //-------------------------------------------------

            // MyClass a = new MyClass();
            // a.PrintFields();
            // WriteLine();

            // MyClass b = new MyClass(1);
            // b.PrintFields();
            // WriteLine();

            // MyClass c = new MyClass(10, 20);
            // c.PrintFields();
            // WriteLine();

            //-------------------------------------------------

            
        }
    }


}
//test용
    // void Divided(int a, int b, out int quotient, out int remainder){
    //     quotient = a/b;
    //     remainder = a%b;
    // }
