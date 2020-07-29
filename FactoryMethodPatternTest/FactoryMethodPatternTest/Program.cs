using FactoryMethodPatternTest.music;
using System;

namespace FactoryMethodPatternTest
{
    class Program
    {
        static void Main(string[] args)
        {
            /*패턴적용 전*/
            //string songName = "serenade";
            //switch (songName)
            //{
            //    case "serenade":
            //        Serenade serenade = new Serenade();
            //        Console.WriteLine($"playing a {serenade.Name} in NY");
            //        break;
            //    case "mozart":
            //        Mozart mozart = new Mozart();
            //        Console.WriteLine($"playing a {mozart.Name} in NY");
            //        break;
            //    case "river flows in you":
            //        RiverFlowsInYou riverFlowsInYou = new RiverFlowsInYou();
            //        Console.WriteLine($"playing a {riverFlowsInYou.Name} in NY");
            //        break;
            //}

            /*패턴적용 후*/
            var coffee = new gurostars();
            var pick = coffee.pick("ame");
            Console.WriteLine($"{pick.Name}");

            Console.WriteLine();

            var pick2 = coffee.pick("cafu");
            Console.WriteLine($"{pick2.Name}");

        }
    }
}
