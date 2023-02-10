using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommandPatternTest.Pizzas
{
    class papperoniPizza: Pizza
    {
        public papperoniPizza()
        {
            Name = "papperoniPizza";
            Dough = "papperoni";
            Sauce = "chili";
        }
    }
}
