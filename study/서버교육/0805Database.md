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
```sql
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

SQL문에 대한 이해
===

DDL
---
- create - database, table 생성 가능

- 제약사항
    * primary key
    * foreign key
    * unique key
    * not null
    * check


실습
---

```sql
CREATE TABLE Customer(
EMPNO char(5) primary key,
NAME  nvarchar(4) not null,
Tel varchar(11) 
)

CREATE TABLE OrderSheet(
MENUNO char(8) primary key,
MenuName nvarchar(20) not null,
MenuType nchar(2) not null,
Check (MenuType in ('한식','일식','양식','중식','분식'))
)

create table [Order](
EMPNO char(5) ,
MENUNO char(8) ,
OrderTime datetime null,
Foreign key(EMPNO) references Customer (EMPNO),
Foreign key(MENUNO) references OrderSheet (MENUNO)
)

drop table [order]
drop table [ordersheet]
drop table [customer]

alter database sangjin set single_user with rollback immediate;
alter database sangjin collate Korean_Wansung_CI_AS 
alter database sangjin set multi_user;

insert into OrderSheet values(12345632, '우와', '일식')

select * from ordersheet

---------------------
alter table ordersheet
drop column menutype;
--구문은 실행되지 않는게 맞음. 참조 무결성.
```

SELECT
---

① 비교연산자 : 값을 비교하고자 할 때, 사용하는 연산자 입니다.

	=          :  같음을 비교 합니다.
	!=, <>     :  같지 않음을 비교 합니다.
	>          :  대상컬럼 값이 조건값보다 큰지를 비교합니다.
	>=         :  대상컬럼 값이 조건값보다 크거나 같은지를 비교합니다.
	<          :  대상컬럼 값이 조건값보다 작은지를 비교합니다.
	<=         :  대상컬럼 값이 조건값보다 작거나 같은지를 비교합니다.


② 논리연산자 : 여러개의 조건을 연결할 때 사용하는 연산자 입니다.

	AND      :  연결 된 조건이 모두 만족해야 성립합니다.
	OR       :  연결 된 조건 중 하나만 만족해도 성립합니다.



③ LIKE 연산자 : 문자열의 일부를 비교할 때 사용하는 연산자 입니다.


④ BETWEEN 연산자 : 특정 범위를 값들을 지정하기 위해 사용하는 연산자 입니다.


⑤ 범위 연산자 : 특정 값들을 명시적으로 나열하여 범위를 지정하기 위해 사용하는 연산자 입니다.

	IN      :  명시한 특정 값들에 해당되는 값들을 포함합니다.
	NOT IN  :  명시한 특정 값들에 해당되지 않는 값들을 포함합니다.
	
	
⑥ NULL 연산자 : NULL에 대한 값을 비교하기 위한 연산자 입니다.

	※ NULL이란?
	     빈 값이 아닙니다. 값이 없음도 아닙니다. 값을 알 수 없는 상태입니다.
	     ex) 가나다 순으로 직원들의 핸드폰 번호를 조사중인 상황입니다,
	           현재 순서상 '이' 씨의 성을 가진 직원들을 조사하고 있습니다.
	           이 때, '홍길동'의 핸드폰 번호는 빈 값이 아닙니다. 값이 없음도 아닙니다.
	           아직 조사하지 않았으니, 핸드폰 번호가 있는지 없는지, 어떤건지 알 수 없는 상태입니다.
	           홍길동의 핸드폰 번호는 NULL인 상황입니다.