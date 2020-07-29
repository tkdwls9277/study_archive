using FactoryMethodPatternTest.coffees;

namespace FactoryMethodPatternTest
{
    class gurostars : starbucks
    {
        protected override coffee Createorder(string type)
        {
            coffee coffee = null;
            switch (type)
            {
                case "ame":
                    coffee = new ame();
                    break;
                case "cafu":
                    coffee = new cafu();
                    break;
                case "esp":
                    coffee = new esp();
                    break;
            }
            return coffee;
        }
    }
}
