using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Console; // 입출력하는 코드를 간소화하기위함
//Console.WriteLine() => WriteLine()

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            MyClass cls = new MyClass();

            //인덱서 set 사용
            cls[0] = 0;
            cls[1] = 1;
            cls[2] = 2;
            cls[3] = 3;

            //인덱서 get 사용
            for(int i=0;i<=3;i++){
                WriteLine(cls[i]);
            }

            WriteLine(cls);
            ReadKey(true);
        }
    }
}
