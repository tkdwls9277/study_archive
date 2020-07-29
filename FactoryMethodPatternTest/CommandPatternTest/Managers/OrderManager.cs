using CommandPatternTest.Interfaces;

namespace CommandPatternTest.Managers
{
    class OrderManager
    {
        ICookingCommand cookingCommand;

        public void setCommand(ICookingCommand cookingCommand)
        {
            this.cookingCommand = cookingCommand;
        }

        public void Order()
        {
            this.cookingCommand.Execute();
        }

        public void Cancel()
        {
            this.cookingCommand.Undo();
        }
    }
}
