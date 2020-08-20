판매입력 신규개발, 구매입력 신규개발, 
견적서입력 신규개발, 생산입력 신규개발

```C#
var menu = string.Empty;

if(menu=="판매입력" || menu=="구매입력" || menu=="생산입력"){
    SaveHistory();
}

==> 대체할 수 있는 방법

var menu = string.Empty;
SaveHistory("판매입력");
//구프레임워크
public static void SaveHistory(string menu){
    if(menu=="판매입력" || menu=="구매입력" || menu=="생산입력"){
    todo
    }
}
//2버전
public static void SaveHistory(bool isSaveHistory){
    if(isHistory == true){

    }
}

public static void SaveHistory(string ProgramId){
    context.
}

//어떤 메뉴에 대해 이력을 쌓아라고 하는 것보다, 이런 조건일경우 쌓는 것
```


{
Request:
   {
       CODE:"00",
       CODE_NAME:"NA",
       BUSINESS_NO:"1",
       QTY:"1212",
       USE_YN:"Y"
   }
}   

FETCH = 단건
EXECUTE = 수정, 삭제
--------------------------------------------------------------------
--수정 v3
--------------------------------------------------------------------
```json
{
    Request: {
        Data: [{
                CODE: "001",
                CODE_NAME: "0",
                BUSINESS_NO: "100",
                USE_YN: "Y",
                QTY: "0"
            },
            {
                CODE: "002",
                CODE_NAME: "0",
                BUSINESS_NO: "100",
                USE_YN: "Y",
                QTY: "0"
            },
            {
                CODE: "00000",
                CODE_NAME: "0",
                BUSINESS_NO: "100",
                USE_YN: "Y",
                QTY: "0"
            },
        ]
    }
}
```
--------------------------------------------------------------------
-- 다건조회 v3
--------------------------------------------------------------------
```json
{
    Request: {
        PARAM: "Y",
        PAGE_CURRENT: "1",
        PAGE_SIZE: "15",
        SORT_COLUMN: "CODE",
        SORT_TYPE: "ASC"
    }
}
```
--------------------------------------------------------------------
-- 추가 v3
--------------------------------------------------------------------
```json
{
    Request: {
        Data: [{
            CODE: "00",
            CODE_NAME: "qqq",
            BUSINESS_NO: "100",
            QTY: "12121111",
            USE_YN: "N"
        }]
    }
}
```
--------------------------------------------------------------------
-- update v2
--------------------------------------------------------------------
```json
{
    Request: [{
            CODE: "01",
            CODE_NAME: "1q2w3et",
            BUSINESS_NO: "000",
            QTY: "123",
            USE_YN: "Y"
        },
        {
            CODE: "100",
            CODE_NAME: "1q2w3e",
            BUSINESS_NO: "000",
            QTY: "123",
            USE_YN: "Y"
        },
        {
            CODE: "02",
            CODE_NAME: "1q2w3e",
            BUSINESS_NO: "000",
            QTY: "123",
            USE_YN: "Y"
        },
        {
            CODE: "03",
            CODE_NAME: "1q2w3e",
            BUSINESS_NO: "000",
            QTY: "123",
            USE_YN: "Y"
        },
    ]
}
```
todo 

    사용중단, 재사용, 수정 나누기
    validate


    Transaction 알아보기

    업데이트 시 USE_YN에 O가 들어감(뭘 넣든)


transaction suppress - 부모와 연관을 가지지 않음. 독자적인 자기 자신의 결과.
            requred - 부모가 실패한 경우 자기 자신도 실패처리. 부모의 결과에 영향을 받음.


3.0 action -> svc -> 
onInit
CanExcute - 진입점(아예 실행이 되면 안되는 조건일 때)
satisfy - 기획(업무)적인 체크(권한, 버젼 등 체크)
validate - 개발적인 체크(request 값에 대한 검증
Excute

