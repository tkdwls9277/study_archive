using PipeFilterPatternTest.Pizzas;

namespace PipeFilterPatternTest
{
    public abstract class PizzaStore
    {
        public Pizza preCooking(string name)
        {
            Pizza pizza = Createorder(name);
            pizza.Register(new PrepareFilter());
            pizza.Register(new BakeFilter());
            return pizza;
        }

        protected abstract Pizza Createorder(string type);
    }
}
