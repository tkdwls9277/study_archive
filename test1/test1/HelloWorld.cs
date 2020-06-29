using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Console;

namespace test1
{
    class HelloWorld
    {
        static void Main(string[] args)
        {
            Cat cat = new Cat { Age = 10, Name = "Fluffy" };

            var pet = new { Age = 10, Name = "Fluffy" };

            List<Cat> cats = new List<Cat>
            {
                new Cat() {Name="Tester1", Age=9},
                new Cat() {Name="Tester2", Age=10}
            };

            WriteLine(cat.Name);

            foreach (Cat c in cats) {
                WriteLine(c.Name);
            }
        }
    }
}
