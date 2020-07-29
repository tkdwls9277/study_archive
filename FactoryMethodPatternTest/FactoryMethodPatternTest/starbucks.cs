using FactoryMethodPatternTest.coffees;

namespace FactoryMethodPatternTest
{
    public abstract class starbucks
    {
        public coffee pick(string name)
        {
            coffee coffee = Createorder(name);
            coffee.Prepare();
            coffee.order();
            coffee.make();
            coffee.callCustomer();
            return coffee;
        }

        protected abstract coffee Createorder(string type);
    }
}