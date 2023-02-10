using System;
namespace FactoryMethodPatternTest.coffees
{
    public abstract class coffee
    {
        public string Name { get; protected set; }
        public string makeTime { get; protected set; }
        public string customer { get; protected set; }

        public void Prepare()
        {
            Console.WriteLine($"Preparing: {Name}");
            Console.WriteLine($"Tossing: {makeTime}");
            Console.WriteLine($"Adding sauce: {customer}");
        }

        public void order()
        {
            Console.WriteLine("ordered");
        }

        public void make()
        {
            Console.WriteLine("make coffee...");
        }

        public void callCustomer()
        {
            Console.WriteLine($"hey customer {customer}");
        }
    }
}
