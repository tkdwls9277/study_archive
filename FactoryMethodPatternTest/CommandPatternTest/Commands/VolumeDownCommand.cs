using CommandPatternTest.Interfaces;
using CommandPatternTest.Lights;

namespace CommandPatternTest.Commands
{
    class VolumeDownCommand : ILight
    {
        private readonly Light light;
        public VolumeDownCommand(Light light)
        {
            this.light = light;
        }
        public void excute()
        {
            light.VolumeDown();
        }

        public void undo()
        {
            light.cancel();
        }
    }
}
