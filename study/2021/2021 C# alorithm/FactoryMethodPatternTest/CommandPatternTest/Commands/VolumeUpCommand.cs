using CommandPatternTest.Interfaces;
using CommandPatternTest.Lights;

namespace CommandPatternTest.Commands
{
    class VolumeUpCommand: ILight
    {
        private readonly Light light;
        public VolumeUpCommand(Light light)
        {
            this.light = light;
        }
        public void excute()
        {
            light.VolumeUp();
        }

        public void undo()
        {
            light.cancel();
        }
    }
}
