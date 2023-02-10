로그인, 카프카
===

zone - 고객에게 귀속된 어떤 영역
<br><br>

로그인 프로세스
---


1. 연결지속
    * 전화/메일의 차이
    * 연결이 지속되느냐, 메세지날리고 연결을 끊느냐

2. 비동기/동기
    * 메세지를 보낸쪽입장
    * 메일을 보내놓고 딴일을 하고 있으면 비동기
    * 메일을 보냈는데 계속 그걸 기다리고 있으면 동기

3. push/pull
    * push 메세지를 상대방이 바로 알수있게 하는것
    * pull 받는사람이 시간이 날 때 받아가는거

<br><br>

---------------

### message queue
중간에 가상의 큐가 있고 그것을 서로 알고있으며, 여럿이 처리한다.

    * kafka  
        - file로 관리 
        - pull 방식
    * rabbitMQ 
        - memory로 관리 
        - push 방식


ecWorker
    erp 

<br><br>

리뷰에 대한 리뷰
---

### orm, udp를 왜 도입했는가?
    sp를 했을 경우 배포할 때 배포되지 않은 서버에서 에러가 날 수 있다.
    배포의 용의성
    orm은 각 디비에 따라 자동 변환됨 <> udp는 자동으로 안됨
    udp는 동적쿼리 편하게 만들려고 도입함.
        틸트 `는 매번 문자열을 만들지 않아 효율이 더 좋음
        밑에 변수로 빼지 않기.

### dto
     result  dto에 컬럼에 대한 entity를 상속받아야 한다.
                상속받은 걸 찾을때와 entity를 바꿨을때 전부 적용되는거
    dynamic은 쓰지 않는게 좋다. 빌드 시점에 결정되서 오류를 찾을수도 없고, 점을 찍어도 아무것도 안나옴
    var - 선언시에 정의가 됨. define시점
    object
    dynamic - runtime시에 결정. DynamicDictionary로 대체

### 코딩규칙
    의미가 달라졌을때 줄바꿈이 필요함.
    if문 안에 메서드를 넣기보다 결과값을 받아서 넣어야한다.
    디버깅이 어려움
```c#
    var isSave = SaveHistory();
    if(isSave){

    }
```
### 주석

    주석은 위에 다는거, 한칸 띄워주기
    // 이렇게

### #region [AAA]
    메소드 안에서는 권장하진 않음.

### Validate
    방어적코딩을 위해 꼭 있어야할거
        null
        for문보다 forEach문을 쓰기(무한루프, indexRangeException)

### 트랜잭션
    requre
        부모트랜잭션에 참여하겠다. rollback을 하겠다.
    supress
        부모와는 상관이없다.

### o.Context.GetLocalTime();
    국가별 기준 시간

### pipeResult
    파이프라인이 비동기이기에 콜백으로 받아야해서 result

sp가 너무 많이 나오기 때문에 tsql과 jsql로 구분하는것