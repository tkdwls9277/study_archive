using CommandPatternTest.Interfaces;
using CommandPatternTest.Lights;

namespace CommandPatternTest.Commands
{
    class LightOffCommand : ILight
    {
        private readonly Light light;

        public LightOffCommand(Light light)
        {
            this.light = light;
        }

        public void excute()
        {
            light.lightOff();
        }

        public void undo()
        {
            light.cancel();
        }

        public void up()
        {
            light.VolumeUp();
        }

        public void down()
        {
            light.VolumeDown();
        }

    }
}
