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
        enum Animal { mouse, cat, bird, dog=100, koala, pig=200, lion};
        static void Main(string[] args)
        {
            MyClass cls = new MyClass();
            Enumsample enumsample = new Enumsample();

            Animal animal;
            animal = Animal.dog;

            WriteLine(Animal.cat);
            WriteLine((int)Animal.dog);
            WriteLine((int)Animal.lion);
            WriteLine(animal);

            ReadKey(true);
        }
    }


}
    void Divided(int a, int b, out int quotient, out int remainder){
        quotient = a/b;
        remainder = a%b;
    }
