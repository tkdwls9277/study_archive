using System;

namespace DecoratorPatternTest.music
{
    public abstract class Music
    {
        public string Name { get; protected set; }
        public string People { get; protected set; }
        public string Year { get; protected set; }

        public void Prepare()
        {
            Console.WriteLine($"Preparing: {Name}");
            Console.WriteLine($"made by: {People}");
            Console.WriteLine($"Since: {Year}");
        }

        public void play()
        {
            Console.WriteLine("playing song...");
        }

        public void stop()
        {
            Console.WriteLine("stop");
        }
    }
}