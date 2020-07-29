using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PipeFilterPatternTest.Interfaces;

namespace PipeFilterPatternTest.Pipe
{
    class PipeLine<T>: IPipeLine<T>
    {
        protected readonly List<IFilter<T>> command = new List<IFilter<T>>();

        public void Register(IFilter<T> command)
        {
            this.command.Add(command);
        }

        public T Execute(T data)
        {
            foreach(var command in this.command) {
                data = command.Execute(data);
                Console.WriteLine();
            }

            return data;
        }
    }
}
