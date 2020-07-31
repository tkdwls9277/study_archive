using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCollection
{
    public static class ExtentionTest
    {
        public static T Find<T>(this MyList<T> list, Predicate<T> match)
        {
            int index = FindIndex(list, 0, list.Count, match);
            // TODO: 구해진 인덱스로 배열에 저장되어 있는 값을 리턴한다

            if (index == -1)
                return default(T);
            return list[index];
        }

        public static int FindIndex<T>(this MyList<T> list, Predicate<T> match)
        {
            return FindIndex(list, 0, list.Count, match);
        }

        public static int FindIndex<T>(this MyList<T> list, int startIndex, Predicate<T> match)
        {
            return FindIndex(list, startIndex, list.Count, match);
        }

        public static int FindIndex<T>(this MyList<T> list, int startIndex, int count, Predicate<T> match)
        {
            if (startIndex > list.Count)
                throw new ArgumentOutOfRangeException();
            if (count < 0 || startIndex > list.Count - count)
                throw new ArgumentOutOfRangeException();

            int num = startIndex + count;
            for (int index = startIndex; index < num; index++) {
                if (match(list[index]))
                    return index;
            }

            return -1;
        }

        public static MyList<T> FindAll<T>(this MyList<T> list, Predicate<T> match)
        {
            MyList<T> objList = new MyList<T>();

            for (int index = 0; index < list.Count; index++) {
                if (match(list[index]))
                    objList.Add(list[index]);
            }

            return objList;
        }

        public static T FindLast<T>(this MyList<T> list, Predicate<T> match)
        {
            int index = FindLastIndex(list, list.Count, 0, match);

            if (index == -1)
                return default(T);
            return list[index];
        }

        public static int FindLastIndex<T>(this MyList<T> list, Predicate<T> match)
        {
            return FindLastIndex(list, list.Count, 0, match);
        }

        public static int FindLastIndex<T>(this MyList<T> list, int startIndex, Predicate<T> match)
        {
            return FindLastIndex(list, list.Count, startIndex, match);
        }

        public static int FindLastIndex<T>(this MyList<T> list, int startIndex, int count, Predicate<T> match)
        {
            if (startIndex > list.Count)
                throw new ArgumentOutOfRangeException();
            if (count < 0 || startIndex > list.Count - count)
                throw new ArgumentOutOfRangeException();

            int num = startIndex + count;
            for (int index = num - 1; index >= count; index--) {
                if (match(list[index]))
                    return index;
            }

            return -1;
        }

        public static bool Contains<T>(this MyList<T> list, Predicate<T> match)
        {
            return FindIndex(list, match) >= 0;
        }

        public static void ForEach<T>(this MyList<T> list, Action<T> action)
        {
            for (int index = 0; index < list.Count; index++) {
                action(list[index]);
            }
        }
    }
}
