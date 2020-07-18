using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program_15
    {
        static void Main(string[] args)
        {
            #region 15.1 LINQ

            // ex) 481 설명 확인.

            // 질의 : 원하는 데이터를 얻기위해, 질의한다.
            //        DataBase에서 Data를 얻는 용도 (수정, 삭제, 추가)


            // C#에서도 데이터 질의가 가능
            // DB Query를 만드는 방식과 유사하게 C# 내에서 Query를 만들 수 있습니다.

            //Form   > 어떤 데이터 집합에서 찾을 것인가? (대상)
            //Where  > 어떤 값의 데이터를 찾을 것인가? (조건)
            //Select > 어떤 항목을 추출할 것인가? (표시)



            Profiles[] _arrProfiles = {
                new Profiles(){Name = "정우성", Height = 186},
                new Profiles(){Name = "김태희", Height = 158},
                new Profiles(){Name = "고현정", Height = 172},
                new Profiles(){Name = "이문세", Height = 178},
                new Profiles(){Name = "하동훈", Height = 171}
            };

            // 키가 175미만인 데이터를 찾아서, 오름차순으로 정렬해 봅시다. (p. 482)

            List<Profiles> profiles = new List<Profiles>();

            // 배열을 순회하면서, 키가 175보다 작은 데이터를 추가한다.
            foreach(Profiles profile in _arrProfiles) {
                if(profile.Height < 175) {
                    profiles.Add(profile);
                }
            }

            // 키의 오름차순으로 정렬한다.
            profiles.Sort(
                (data1, data2) => {
                    return data1.Height - data2.Height;
                }
            );

            foreach(Profiles profile in profiles) {
                Console.WriteLine("{0}-{1}", profile.Name, profile.Height);
            }

            Console.WriteLine("--------------------------");

            // LINQ의 사용
            // LINQ를 사용해서, DB 질의 하듯이 사용할 수 있다.
            var _profiles = from profile in _arrProfiles
                            where profile.Height < 175
                            orderby profile.Height ascending   //descending
                            select profile;

            foreach(var profile in _profiles) {
                Console.WriteLine("{0}-{1}", profile.Name, profile.Height);
            }


            #endregion

            #region 15.2 LINQ의 기본 

            // [From]

            // (p. 483) 하단 내용 확인
            // Linq는 from 절로 시작. (어떤데이터에서)

            // (범위변수) in (데이터 원본)
            // 범위변수는 내가 이름을 정했다고 보면 됨.



            // ex)  Type으로 예시.
            //      Person Type in IEnumerable<Person> Type 
            //      T Type      in IEnumerable<T> Type


            // 범위변수는 LINQ내부에서만 사용 가능
            // 쿼리식 외부의 변수로 복사 X. LINQ 안에서만 통용.

            int[] _num = { 0, 2, 8, 3, 1, 5, 4, 7, 9, 6 };

            var result = from n in _num
                         where n % 2 == 0
                         orderby n // default : ascending
                         select n;

            foreach(var n in result) {
                Console.WriteLine("짝수 : {0}", n);
            }


            // [Where]
            // Where는 한마디로 필터역할 (조건)
            // Form절 이후 범위변수가 가져야되는 조건을 Where연산자의 매개변수로 입력

            int[] _num2 = { 0, 2, 8, 3, 1, 5, 4, 7, 9, 6 };

            var result2 = from n in _num2
                         where n > 5
                         select n;

            foreach (var n in result2) {
                Console.WriteLine("5보다 큰 수 : {0}", n);
            }


            // [OrderBy]
            // OrderBy는 정렬을 수행하는 연산자

            // orderby 연산자에 정렬의 기준이 되는 항목을 매개변수로 입력 (어떤걸로 정렬할지)
            // 기본값 : ascending
            // ascending 오름차순
            // descending 내림차순


            // [Select]
            // Select 절은 최종결과를 추출하는 쿼리식의 마침표

            // From 절에서 데이터원본으로 부터 범위변수를 뽑아내고
            // Where절에서 범위변수의 조건을 검사하고,
            // OrderBy절에서 정렬하고,
            // Selct절에서 최종결고 추출.


            // LINQ 반환값 (p. 487 하단부분)
            // DB에서도 결과는 빈 List
            // IEnumerable<T> 형식으로 반환 
            // 여기서 T는 Select에 따라 결정 됨.
            IEnumerable<Profiles> profiles2 = from profile in _arrProfiles
                                              where profile.Height < 175
                                              orderby profile.Height
                                              select profile;

            IEnumerable<string> profiles3 = from profile in _arrProfiles
                                            where profile.Height < 175
                                            orderby profile.Height
                                            select profile.Name;

            // IEnumerable<T> Type이라는것을 인지하고,
            // 편하게 var를 쓰면 됨.
            var profiles5 = from profile in _arrProfiles
                            where profile.Height < 175
                            orderby profile.Height
                            select profile.Name;


            // 무명형식 > new { }; 통해서 무명형식을 생성할 수 있다.
            var profiles6 = from profile in _arrProfiles
                            where profile.Height < 175
                            orderby profile.Height
                            select new { Name = profile.Name, InchHeight = profile.Height * 0.393};  //키 * 0.393을 통해서 인치로 표현

            // 내가 Class로 구현해둔 Person Type으로도 반환 가능.
            var profiles7 = from profile in _arrProfiles
                            where profile.Height < 175
                            orderby profile.Height
                            select new Person{ Name = profile.Name };

            // profiles들의 Type확인.
            // p. 488 코딩 해보기.

            #endregion

            #region 15.3 여러 개의 데이터 원본에 질의하기
            // ex) 여러 개의 데이터 원본에 질의하기

           
            ScoreClass[] arrScorePerson =
            {
                new ScoreClass() { Name = "연두반", Score = new int[]{ 99,80,74,24 } },
                new ScoreClass() { Name = "분홍반", Score = new int[]{ 50,45,87,72 } },
                new ScoreClass() { Name = "파랑반", Score = new int[]{ 92,30,85,94 } },
                new ScoreClass() { Name = "노랑반", Score = new int[]{ 90,88,70,77 } }
            };

            var classes = from data in arrScorePerson   // 첫번째 데이터 원본
                            from subData in data.Score    // 두번째 데이터 원본
                            where subData < 60
                            orderby subData
                            select new { Name = data.Name, Lowest = subData };

            Console.WriteLine("------------------------------------");

            foreach(var item in classes) {
                Console.WriteLine("낙제 : {0}({1})", item.Name, item.Lowest);
            }

            //(p.491) 코딩 해보기. 중첩 데이터도 LINQ가 가능함.

            #endregion

            #region 15.4 Group By로 데이터 분류하기

            // group A by B into C
            // A : from절에서 뽑아낸 범위변수 
            // B : 분류기준
            // C : 그룹변수

            Profiles[] _arrProfiles2 = {
                new Profiles(){Name = "정우성", Height = 186},   // profile
                new Profiles(){Name = "김태희", Height = 158},
                new Profiles(){Name = "고현정", Height = 172},
                new Profiles(){Name = "이문세", Height = 178},
                new Profiles(){Name = "하동훈", Height = 171}
            };

            var _groupData = from profile in _arrProfiles2
                             group profile by profile.Height > 175 into groupData
                             select new { GroupKey = groupData.Key, Profiles = groupData };

            Profiles[] _arrProfiles3 = {
                new Profiles(){Name = "정우성", Height = 186},
                new Profiles(){Name = "정우성", Height = 158},
                new Profiles(){Name = "고현정", Height = 172},
                new Profiles(){Name = "고현정", Height = 178},
                new Profiles(){Name = "하동훈", Height = 171}
            };

            var _groupData2 = from profile in _arrProfiles3
                             group profile by profile.Name into groupData
                             select new { GroupKey = groupData.Key, Profiles = groupData};

            // 디버깅으로 결과값 확인하기, 어떻게 그룹이 되었는지
            // Group By를 사용해서 얻은 객체는 Key정보를 가지고 있다.
            // ex) groupData.Key 조건 (1.참/거짓에 따라 Flag 반환 / 2. Name명)
            // (p. 494 코딩 해보기)

            #endregion

            // DB 교육에서 Join에 대한 개념을 확인하고,
            // 이후에 C# LINQ에서 JOIN을 이런식으로 사용한다고 확인해보기.
            #region 15.5 두 데이터의 원본을 연결하는 Join

            // 내부조인 개념 확인 (p. 496)

            // form _a in A
            // join _b in B on _a.XXX equals _b.YYY

            // 원본 데이터
            Profiles[] _arrProfiles4 = {
                new Profiles(){Name = "정우성", Height = 186},
                new Profiles(){Name = "김태희", Height = 158},
                new Profiles(){Name = "고현정", Height = 172},
                new Profiles(){Name = "이문세", Height = 178},
                new Profiles(){Name = "하동훈", Height = 171}
            };

            // 연결 데이터
            Product[] _arrProduct = {
                new Product(){Title = "비트", Star = "정우성"},
                new Product(){Title = "CF 다수", Star = "김태희"},
                new Product(){Title = "아이리스", Star = "김태희"},
                new Product(){Title = "모래시계", Star = "고현정"},
                new Product(){Title = "Solo 예찬", Star = "이문세"},
                new Product(){Title = "사제", Star = "강동원"},
            };

            
            var _InnerjoinList =
                from profile in _arrProfiles4
                join product in _arrProduct on profile.Name equals product.Star
                select new { Name = profile.Name, Work = product.Title, Height = profile.Height };



            // 외부조인 개념 확인 (p. 497)

            // 그룹조인 : into 식을 포함한 join 절을 그룹 조인
            // 그룹 조인은 왼쪽 소스 시퀀스의 요소를 오른쪽 소스 시퀀스에서 일치하는 하나 이상의 요소와 연결
            // 왼쪽 소스의 요소와 일치하는 오른쪽 소스 시퀀스의 요소가 없을 경우 join 절은 해당 항목에 대해 빈 배열을 생성

            // 타겟이 되는 데이터 목록을 join 구문에 작성을 해주고 그 **결과집합을 into 구문으로 선언
            // into 구문 이후부터는 join 구문의 원본()에는 접근을 할 수 없다.
            // into절에서 선언된 내용으로만 접근이 가능하다

            var _inJoinList =
                from profile in _arrProfiles4
                join product in _arrProduct on profile.Name equals product.Star
                select product;

            var _outJoinList =
                from profile in _arrProfiles4
                join product in _arrProduct on profile.Name equals product.Star into ps
                select ps;
            // 위의 두개를 비교


            // 빈배열에 Product 할당
            var _outJoinList2 =
                from profile in _arrProfiles4
                join product in _arrProduct on profile.Name equals product.Star into ps  
                from product2 in ps.DefaultIfEmpty(new Product() { Title = "데이터 없음"})
                select new { Name = profile.Name, Work = product2.Title, Height = profile.Height };


            // p.499 코딩해보기

            #endregion



            #region 15.6 LINQ 표준연산자

            // p.502 내용 확인.
            // 이런식으로 C# 쿼리식으로 작성하면, (11개 : 쿼리식)
            // db query와 유사하게 편리하게 쓰도록 만들어 줬구나. (11개만)
            var profiles8 = from profile in _arrProfiles
                            where profile.Height < 175
                            orderby profile.Height
                            select profile;

            
            // 컴파일러는 이렇게 해석해. (52개 : LINQ 표준연산자)
            // 내부적으로 이렇게 실행해. 코딩을 이렇게 할 수도 있어.
            var profiles9 = _arrProfiles
                                .Where(profile => profile.Height < 175)
                                .OrderBy(profile => profile.Height)   //.OrderBy(aaa => aaa.Height)
                                .Select(profile => new { Name = profile.Name, Height = profile.Height });

            // 섞어서도 사용 가능하다.
            // p.510 예제 소스 확인해보기.

            var _average = _arrProfiles.Average(data => data.Height);

            var profiles10 = (from profile in _arrProfiles
                            where profile.Height < 175
                            orderby profile.Height
                            select profile).Average(profile => profile.Height);

            Console.WriteLine("평균 : {0}", profiles10);



            // (+) LINQ 사용시에는 성능이슈를 잘 확인하고 사용해야됨.
            // 결국은 루프와 조건처리로 구성됨.
            // 사용하기는  편리해 졌지만, 소스에 대한 고민은 적어짐.
            // 대용량 데이터가 LINQ 될때 성능적으로 문제가 없을지에 대한 고민.
            // 성능 확인하는 방법 > Dev. Share. No. 977

            #endregion

            // 차후에 읽어보기
            #region 지연실행

            // 지연실행
            // 대부분의 질의 연산자들의 한 가지 중요한 특징은, 
            // 질의 연산자는 질의를 구축(생성)할 때가 아니라 열거할 때(다시 말해 해당 열거자에 대해 MoveNext가 호출될 때) 실행된다는 점입니다.
            // https://docs.microsoft.com/ko-kr/dotnet/csharp/programming-guide/concepts/linq/classification-of-standard-query-operators-by-manner-of-execution

            var numbers = new List<int>();
            numbers.Add(1);

            IEnumerable<int> query = numbers.Select(n => n * 10);  // 질의를 구축한다. 

            numbers.Add(2);  // 또 다른 요소를 추가한다.    

            foreach (int n in query) {
                Console.Write(n + "|");
            }
            // 10|20|


            numbers.Clear();

            foreach (int n in query) {
                Console.Write(n + "|");
            }
            // <출력없음>
            #endregion


            // 프로그램 실행 시, 바로 종료되지 않도록 하기 위해서 삽입
            // (한 Line을 입력해야 해당 함수를 넘어감 (ex. Enter)
            Console.ReadKey();
        }

        #region 15.1 LINQ

        class Profiles
        {
            public string Name { get; set; } // 이름
            public int Height { get; set; }  // 키
        }

        class Person
        {
            public string Name { get; set; } // 이름
        }

        class Product
        {
            public string Star { get; set; }
            public string Title { get; set; }
        }

        #endregion

        #region 여러 개의 데이터 원본에 질의하기
        class ScoreClass
        {
            public string Name { get; set; }
            public int[] Score { get; set; }
        }
        #endregion

    }
}
