0727 사전 소개
===

원론적인 교육
실무적인 교육

양식, 마이그레이션, 테이블

리뷰 - 한명씩 회의실에서 30분씩 자기의 코드를 설명하는 시간

중요한 부분 - 로그인과 가입에 대한 프로세스

7/30,31일 자료구조 본부장님

원래교육과정은 더 많지만 일부과목 제외

-----------------------------------------------------

어트리뷰트 : 속성을 지정해서 표식을 남길수있는 코드

dynamic은 쓰지 말기. 빌드 시점이 아닌 실행 시점에 타입체크를 해줌.
var a = new Person(); - 빌드 시점에 var -> Person 타입으로 내부적으로 변환이 됨.

-----------------------------------------------------

p769
Garbage Collection

-----------------------------------------------------

성능에 대한 문제 - 하상수팀장님

dev share 960

반복문, 문자열처리가 50%이상을 차지하는 듯하다

```
var datas = new List<TestDto>();
var srcDatas = new List<TestDto>();

var i=0;
while(i<1000000){
    datas.Add(new TestDto(){
        Index = i,
        Value1 = "A" + i.ToString(),
    })

    srcDatas.Add(new TestDto(){
        Index = i,
        Value1 = "A" + i.ToString(),
    })

    i++;
}

var targets = datas.Where(x => x.Index % 2 == 0)
                   .Where(x => x.Index % 2 == 0)

targets.ToList(); // 이 구문을 지나는 시점에 위의 where가 작동을 함
foreach(var data in targets){} // foreach가 실행될때 targets가 한번 돌게 됨

if(targets.Any()==true){} //있는지 없는지 확인하는 코드. 다 도는게 아니라 발견시 종료 됨

if(targets)

var targets = datas.Where(x => x.Index % 2 == 0).ToList(); //이렇게 리스트 형태로 만들어주면 이 시점에 한번 실행이 됨.

//-----------------------
//같은 인덱스를 찾는 방법들(걸리는 시간)

var srcDic = srcDatas.ToDictionary(x => x.Index, x => x.Value2);

//반복문 (100)
foreach(var data in datas){
    data.Value2 = srcDatas.FirstOrDefault(x => x.Index == data.Index).Value2;
}

datas.Join(srcDatas) // linq join(20~30)

//(1)
foreach(var data in datas){
    data.Value2 = srcDic[data.Index];
}
//------------------------
//문자열 처리

foreach(var data in datas){
    data.Value2 = data.Value1 + "AAAAAAA";
}//문자열을 처리할때마다 메모리가 할당됨

//stringBuilder를 쓴다면 끝난 후 할당됨
var sb = new StringBuilder(400);
foreach(var data in datas){
    sb.Clear();
    sb.Append(data.Value1);
    sb.Append("AAAAA");
    sb.Append("BBBBB");

    data.Value2 = sb.ToString();
}
//문자열 처리는 무조건 stringBuilder를 사용한다.
//메모리사용량이 적다는건 garbage collector가 돌 확률이 줄어든다는 뜻
//garbage collector가 돌땐 cpu가 그만큼 멈춤

//프레임워크 내에 이미 구현이 되어있음
data.Value2 = ECUtil.BuildString(data.Value1, "AAAAA");

//--------------------------
//비교

i=0;
foreach(var data in datas){
    if(data.Value1.StartsWith("1") == true){ //1로 시작하는 걸 찾는 코드
    }
}

foreach(var data in datas)P{
    if(data.Value1.StartsWith("1", StringComparison.Ordinal-----))//대소문자 구분없이
}

StartsWith -> vStartsWith 라는 프레임워크가 구현되어있음.
//--------------------------
//replace or 찾을때

i=0;
foreach(var data in datas){
    data.Value2 = data.Value1.Peplace("1","0");
}

"" -> string
'' -> charactor
-> 한글자는 ''를 사용하자.

//---------------------------

List -> HashSet
hashset은 중복된 값이 없기에 찾으면 종료.

```