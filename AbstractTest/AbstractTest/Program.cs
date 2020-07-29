using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbstractTest
{
    class Program
    {
        public abstract class Car : ICarDrive
        {
            public virtual void Backward()

            {
                //특별한 경우가 아니면 후진은 천천히...
            }

            public virtual void Stop()
            {

            }
        }

        public class Bus : Car
        {
            public void Forward()
            {
                //천천히 앞으로...
            }

            public override void Stop()
            {
                //base.Stop();
            }
        }

        public class Taxi : Car
        {
            public Taxi()
            {

            }

            public void Forward()
            {

            }

            public override void Backward()
            {
                //base.Backward();
            }
        }
        static void Main(string[] args)
        {
        }
    }
}
