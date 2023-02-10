using PipeFilterPatternTest.Pizzas;
using System;
using System.Collections.Generic;

namespace PipeFilterPatternTest
{
    public abstract class PizzaStore
    {
        public Pizza preCooking(string name)
        {
            List<Dough> pizzas = Createorder(name);
            pizzas.Add(new Dough() { Name = "Pizza 1" });
            pizzas.Add(new Dough() { Name = "Pizza 2" });
            pizzas.Add(new Dough() { Name = "Pizza 3" });
            return pizzas;
        }

        protected abstract Pizza Createorder(string type);
    }
}
