using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PipeFilterPatternTest.Pizzas;

namespace PipeFilterPatternTest.Filters
{
    public class PrepareFilter : PizzaFilter
    {
        public override List<Dough> Execute(List<Dough> doughs)
        {
            foreach (var dough in doughs) {
                Console.WriteLine($"{ dough.Name } Preparing...");
            }

            return doughs;
        }
    }
}
