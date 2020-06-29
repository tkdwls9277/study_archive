using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dateTime
{
    class DateEdit
    {
        static void Main(string[] args)
        {
            DateTime StartDate = Convert.ToDateTime("2012-05-07 08:00:00");
            DateTime EndDate = Convert.ToDateTime("2012-05-10 10:20:30");

            TimeSpan dateDiff = EndDate - StartDate;

            int diffDay= dateDiff.Days;
            int diffHour = dateDiff.Hours;
            int diffMinute = dateDiff.Minutes;
            int diffSecond = dateDiff.Seconds;

            Response.Write("날짜차이 : " + diffDay.ToSting()+"일 <br/>");
            Response.Write("시간차이 : " + diffHour.ToString() + "시간 <br/>");
            Response.Write("분차이 : " + diffMinute.ToString() + "분 <br/>");
            Response.Write("초차이 : " + diffSecond.ToString() + "초 <br/>");

            Response.End();
        }
    }
}

