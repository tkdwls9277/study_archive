using System;
using CommandPatternTest.Pizzas;
using CommandPatternTest.Commands;
using CommandPatternTest.Managers;
using CommandPatternTest.Lights;

namespace CommandPatternTest
{
    class Program
    {
        static void Main(string[] args)
        {
            //Pizza pizza = new CheesePizza();
            //pizza.Bake();
            //pizza.Boxing();
            //pizza.Cut();
            //pizza.ThrowAway();

            //Console.WriteLine($"{pizza.Name}, {pizza.Dough}, {pizza.Sauce}");


            //---------------------------------------------------------------
            //pizza command pattern 적용 후

            //Pizza pizza1 = new CheesePizza();
            //CookingCommand cooking = new CookingCommand(pizza1);
            //OrderManager manager = new OrderManager();
            //manager.setCommand(cooking);
            //manager.Order();
            //manager.Cancel();
            ////cooking.Undo();

            //Console.ReadKey();

            //Light light1 = new Light();
            //LightOnCommand lightOn = new LightOnCommand(light1);
            //RemoteManager manager = new RemoteManager();
            //manager.setLight(lightOn);
            //manager.turn();
            //manager.cancel();
            //manager.turn();

            //Console.WriteLine();

            //LightOffCommand lightOff = new LightOffCommand(light1);
            //manager.setLight(lightOff);
            //manager.turn();
            //manager.cancel();

            //Console.WriteLine();

            //VolumeUpCommand volumeUp = new VolumeUpCommand(light1);
            //manager.setLight(volumeUp);
            //manager.Up();
            //manager.Up();
            //manager.Up();

            //Console.WriteLine();

            //VolumeDownCommand volumeDown = new VolumeDownCommand(light1);
            //manager.setLight(volumeDown);
            //manager.Down();

            //Console.WriteLine();

            var remote = new RemoteManager();
            var light = new Light();
            var lightOn = new LightOnCommand(light);
            var lightOff = new LightOffCommand(light);
            var VolumeUp = new VolumeUpCommand(light);
            var VolumeDown = new VolumeDownCommand(light);

            //var macroCommand = new 

            remote.Slot = lightOn;
            remote.ButtonWasPressed();
        }
    }
}
