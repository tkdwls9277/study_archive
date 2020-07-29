using System;
using CommandPatternTest.Interfaces;

namespace CommandPatternTest.Managers
{
    class RemoteManager
    {
        ILight light;
        public ILight Slot { get; set; }

        public void setLight(ILight light)
        {
            this.light = light;
        }

        public void turn()
        {
            light.excute();
        }

        public void cancel()
        {
            light.undo();
        }

        public void Up()
        {
            light.excute();
        }

        public void Down()
        {
            light.excute();
        }

        public void ButtonWasPressed()
        {
            Slot.excute();
        }
    }
}
