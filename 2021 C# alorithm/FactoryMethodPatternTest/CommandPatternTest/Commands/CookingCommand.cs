using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CommandPatternTest.Pizzas;
using CommandPatternTest.Interfaces;

namespace CommandPatternTest.Commands
{
    class CookingCommand : ICookingCommand
    {
        private readonly Pizza pizza;

        public CookingCommand(Pizza pizza)
        {
            this.pizza = pizza;
        }

        public void Execute()
        {
            this.pizza.Prepare();
            this.pizza.Bake();
            this.pizza.Cut();
            this.pizza.Boxing();
        }

        public void Undo()
        {
            this.pizza.ThrowAway();
        }
    }
}
