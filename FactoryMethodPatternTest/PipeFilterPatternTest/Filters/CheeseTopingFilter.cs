using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PipeFilterPatternTest.Pizzas;

namespace PipeFilterPatternTest.Filters
{
    public class CheeseToppingFilter : PizzaFilter
    {
        public override List<Dough> Execute(List<Dough> doughs)
        {
            foreach (var dough in doughs) {
                Console.WriteLine($"{ dough.Name } Topping.....");
                dough.Name = "Cheese " + dough.Name;
            }

            return doughs;
        }
    }
}
