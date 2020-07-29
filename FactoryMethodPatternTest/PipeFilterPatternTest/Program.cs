using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PipeFilterPatternTest.Pizzas;
using PipeFilterPatternTest.Pipe;
using PipeFilterPatternTest.Filters;

namespace PipeFilterPatternTest
{
    class Program
    {
        static void Main(string[] args)
        {
            //List<Dough> doughs = new List<Dough>();
            //foreach (var dough in doughs) {
            //    Console.WriteLine($"{ dough.Name } Preparing...");
            //    Console.WriteLine($"{ dough.Name } Bake for 25 minutes");
            //    Console.WriteLine($"{ dough.Name } Topping.....");
            //    dough.Name = "Cheese " + dough.Name;
            //    Console.WriteLine($"{ dough.Name } Cutting the pizza into diagnol slices");
            //    Console.WriteLine($"{ dough.Name } Placing pizza in official PizzaStore box......");


            PizzaCookingPipeLine cooking = new PizzaCookingPipeLine();

            cooking.Register(new PrepareFilter());
            cooking.Register(new BakeFilter());
            cooking.Register(new CheeseToppingFilter());
            cooking.Register(new CutFilter());
            cooking.Register(new BoxFilter());

            List<Dough> pizzas = new List<Dough>();
            pizzas.Add(new Dough() { Name = "Pizza 1" });
            pizzas.Add(new Dough() { Name = "Pizza 2" });
            pizzas.Add(new Dough() { Name = "Pizza 3" });
            cooking.Execute(pizzas);
        }
    }
}
