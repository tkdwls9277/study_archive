using System;
using static System.Console;

class MyClass
{
    private const int MAX = 10;
    public int b;
    public int ssss;
    //private string name;

    private int[] data = new int[MAX];

    public int this[int index]
    {
        get
        {
            //정수 배열로부터 값 리턴
            return data[index];
        }
        set
        {
            if(!(index<0||index>=MAX))
            {
                data[index]=value;
            }
        }
    }
}