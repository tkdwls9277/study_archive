using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactoryMethodPatternStudy.fang
{
    class Choco: Bread
    {
        public Choco()
        {
            Name = "초코초코";
            dang = "달달";
            kcal = "높음";
        }
    }
}
