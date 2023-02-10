using CommandPatternTest.Interfaces;
using CommandPatternTest.Lights;

namespace CommandPatternTest.Commands
{
    class LightOnCommand: ILight
    {
        private readonly Light light;
        
        public LightOnCommand(Light light)
        {
            this.light = light;
        }


        public void excute()
        {
           light.lightOn();
        }

        public void undo()
        {
            light.cancel();
        }
    }
}
