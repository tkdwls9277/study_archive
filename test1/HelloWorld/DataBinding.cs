using System;
using System.Collections.Generic;
using System.IO;
using System.Windows;


namespace HelloWorld
{
    /*public partial class Form1 : Form1
    {
        public Form1()
        {
            InitializeComponent();
        }
    }*/

    //donation 클래스
    //각 컬럼이 하나의 속성에 대응된다.
    class Donation
    {
        public string Id { get; set; } // Id 라는 속성
        public string Name { get; set; } // Name 이라는 속성
        public string Grade { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
    }
}
