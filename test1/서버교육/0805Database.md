데이터베이스
===

1. 데이터베이스란
2. 데이터베이스의 종류
    * 계층형
    * 관계형 - 최근 대부분의 db
    * 객체지향

3. 테이블
4. 칼럼
5. 로우
6. PK/FK
* pk를 잡으면 index 유형이 두가지로 나뉨
    * 클러스터 - 원본데이터자체
    * 넌 클러스터 - 다른테이블
    >>https://mongyang.tistory.com/75 - 인덱스개념
7. Index

8. 과제
    1. 테이블에 천만건 데이터생성
    2. 컬럼은 다섯개 이상
    3. 페이징
    4. pk없이 조회한 시간
    5. pk로 조회한 시간
    6. 넌클러스터를 생성하고 조회한 시간
    * 조회결과는 100개가 되게.
    
<br>

9. * RDB - 오라클, MSSQL, MySQL, mariaDB 
    * NoSQL - mongoDB, redis

4.0 - maria, c# core, 
<br><br>

--------------
입사 시 보면 좋을 문서
--

1. 클래스 다이어그램
2. 플로우차트
3. 시퀀스차트
4. ERD

-------------

로컬 db
```
(localdb)\MSSQLLocalDB
```

1000000개의 데이터를 넣는 sql문
```
DECLARE @SEQ INT = 577

WHILE(@SEQ < 1000000)
BEGIN
,INSERT INTO TEST VALUES (@SEQ, 'A', 'B', 'C');
,SET @SEQ = @SEQ + 1;
END
```

실제 실행계획 포함 탭을 통해 어떤 테이블에서 조인이 되는지, 성능이 어떤지 확인할 수 있음.

mssql 테이블 복사하는 방법
>>https://dongpal.tistory.com/10