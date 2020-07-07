using System;
using System.Drawing;

class CustomButton
{
    //필드 : 내부 데이타
    private int id;
    private string name;
    private int width;
    private int height;
    private string text;

    //속성
    public string Name {
        get { return this.name; }
    }

    public int Width {
        get { return this.width; }
        set { this.width = value; }
    }

    public String Height {
        get { return this.text; }
        set { this.text = value; }
    }

    public void Draw()
    {
        //버튼을 그리는 코드: 실제로 동작은 안함
        //Graphics g = this.CreateGraphics();
        //Pen p = new Pen(Color.Black);
        //Rectangle r = new Rectangle(0, 0, width, height);
        //g.DrawRectangle(p, r);
    }

    //private Graphics CreateGraphics()
    //{
    //    //Fake
    //    return Graphics.FromHdc((IntPtr)0);
    //}
}