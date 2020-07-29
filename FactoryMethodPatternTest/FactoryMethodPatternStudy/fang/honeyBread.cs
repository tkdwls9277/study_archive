using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FactoryMethodPatternStudy.fang
{
    class HoneyBread: Bread
    {
        public HoneyBread()
        {
            Name = "허니브래드";
            dang = "달달함 그 자체";
            kcal = "매우높음";
        }
    }
}
