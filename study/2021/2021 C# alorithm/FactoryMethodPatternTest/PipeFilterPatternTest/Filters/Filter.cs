using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PipeFilterPatternTest.Interfaces;
using PipeFilterPatternTest.Pizzas;

namespace PipeFilterPatternTest.Filters
{
    public abstract class PizzaFilter : IFilter<List<Dough>>
    {
        public abstract List<Dough> Execute(List<Dough> doughs);
    }
}