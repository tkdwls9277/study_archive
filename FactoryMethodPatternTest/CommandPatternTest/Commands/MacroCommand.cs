using CommandPatternTest.Interfaces;

namespace CommandPatternTest.Commands
{
    class MacroCommand : ILight
    {
        private readonly ILight[] light;

        public MacroCommand(ILight[] light)
        {
            this.light = light;
        }


        public void excute()
        {
            for (int i = 0; i < light.Length; i++) {
                light[i].excute();
            }
        }

        public void undo()
        {
            for (int i = 0; i < light.Length; i++) {
                light[i].undo();
            }
        }
    }
}
