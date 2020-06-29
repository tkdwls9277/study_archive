using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstSample
{
    interface Greet{
        void greet();
    }
    interface Bye{
        void bye();
    }

    class Greeting:Bye{
        public void greet(){
            Console.WriteLine("hi");
        }
        public void bye(){
            Console.WriteLine("bye");
        }
    }
    class DateEdit
    {
        static void Main(string[] args)
        {
            Greeting greeting = new Greeting();
            greeting.greet();
            greeting.bye();
        }
    }
}

