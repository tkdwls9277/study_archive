using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommandPatternTest.Pizzas
{
    class Pizza
    {
        public string Name { get; protected set; }
        public string Dough { get; protected set; }
        public string Sauce { get; protected set; }

        public void Prepare()
        {
            Console.WriteLine($"name is {Name}");
            Console.WriteLine($"Dough is {Dough}");
            Console.WriteLine($"Sauce is {Sauce}");
        }

        public void Bake()
        {
            Console.WriteLine("Baking..");
        }

        public void Cut()
        {
            Console.WriteLine("Cut..");
        }

        public void Boxing()
        {
            Console.WriteLine("Boxing..");
        }

        public void ThrowAway()
        {
            Console.WriteLine("Throw away..");
        }
    }
}
