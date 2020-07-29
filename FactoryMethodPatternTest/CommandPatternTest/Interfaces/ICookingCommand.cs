using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommandPatternTest.Interfaces
{
    interface ICookingCommand
    {
        void Execute();
        void Undo();
    }
}
