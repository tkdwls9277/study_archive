using System;

namespace CommandPatternTest.Lights
{
    class Light
    {
        int volume = 0;

        public void lightOn()
        {
            Console.WriteLine("전구를 켰습니다.");
        }

        public void lightOff()
        {
            Console.WriteLine("전구를 껐습니다.");
        }

        public void cancel()
        {
            Console.WriteLine("취소합니다.");
        }

        public void VolumeUp()
        {
            Console.WriteLine($"현재 전구의 밝기는 {++volume}");
        }

        public void VolumeDown()
        {
            Console.WriteLine($"현재 전구의 밝기는 {--volume}");
        }
    }
}
