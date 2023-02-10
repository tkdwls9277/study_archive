using System;
using System.Collections.Generic;
using PipeFilterPatternTest.Pizzas;

namespace PipeFilterPatternTest.Filters
{
    public class BakeFilter : PizzaFilter
    {
        public override List<Dough> Execute(List<Dough> doughs)
        {
            foreach (var dough in doughs) {
                Console.WriteLine($"{ dough.Name } Bake for 25 minutes");
            }

            return doughs;
        }
    }
}
