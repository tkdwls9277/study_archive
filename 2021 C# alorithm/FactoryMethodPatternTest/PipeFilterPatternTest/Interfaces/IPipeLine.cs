using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PipeFilterPatternTest.Interfaces
{
    public interface IPipeLine<T> : IFilter<T>
    {
        void Register(IFilter<T> command);
    }
}
