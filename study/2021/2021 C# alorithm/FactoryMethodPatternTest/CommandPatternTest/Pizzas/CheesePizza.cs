using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommandPatternTest.Pizzas
{
    class CheesePizza: Pizza
    {
        public CheesePizza()
        {
            Name = "CheesePizza";
            Dough = "Cheese";
            Sauce = "Cheese";
        }
    }
}
