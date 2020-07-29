using DecoratorPatternTest.music;
using System;

namespace DecoratorPatternTest
{
    class Program
    {
        static void Main(string[] args)
        {
            //Music music = new Music();
            string[] decos = new string[3] { "Shrimp", "Beef", "Shrimp" };
            foreach (var deco in decos) {
                switch (deco) {
                    case "Shrimp": {
                            //var cost = pizza.Cost() + 20;
                            break;
                        }
                    case "Beef": {
                            //var cost = pizza.Cost() + 15;
                            break;
                        }
                }
            }
        }
    }
}