sql 실무
===

변수 정의, 값 설정
---
```sql
declare @empid char(5), @name varchar(8), @telno varchar(11), @age smallint;

declare @gender char(2) = '남';

set @empid = '20000';
set @telno = '테스트';

select @empid hi, @telno you;
```

-----------

if문 while문
---

### 1. 10까지 짝수만 나오도록

```sql
DECLARE @i INT;
SET @i = 0;

 while @i<=10
 begin
	if @i%2=0
	begin 
		print(@i);
	end
	set @i=@i+1;
end
```
### 2. 별찍기

>v1<br>

```sql
declare @star varchar(20);
set @star ='★';
DECLARE @i INT;
SET @i = 0;

while @i<10
begin
	print(@star);
	set @star = @star+'★';
	set @i = @i+1;
end
```

>v2
```sql
--이중루프
declare @star varchar(20) = '';
declare @i int = 0;

while @i<10
begin
    declare @j int = 0;
    set @star = '★';
    while @i > @j
    begin
        set @star = @star + '★';
		set @j = @j + 1;
    end
	print (@star);
    set @i = @i + 1;
end
```

---------------------------------
프로시져(procedure)
---

### 저장 프로시져의 장점
- 관리의 장점

        프로그램 로직과 쿼리를 분리함으로써, 쿼리를 수정하고자 할 때, 프로그램에 영향없이 수정할 수가 있습니다.
   
- 서버 성능의 장점

        조건 등을 매개변수화 함으로써, 작성된 쿼리 형태를 유지할 수 있고,
        이와 같은 특징으로 실행계획을 재활용 할 수 있는 확률을 높혀줍니다.

- 네트워크 성능의 장점

        거리를 전송하는 것이 아니라 프로시져 명을 전송하여 쿼리를 실행하기 때문에 전송되는 문자열이 줄고
        이로 인하여 네트워크 트래픽을 줄일 수 있습니다.

```sql
--프로시져 생성
create procedure return_customer1
	@empid varchar(10) = null
as
begin
	if @empid is null
	begin 
		select *
		from customer
	end
	else
	begin
		select *
		from Customer
		where name = @empid;
	end
end

--프로시져 삭제
drop procedure return_customer1

--프로시져 호출
exec return_customer1 '김철수' 
```

----

동적쿼리
---

- 문자열로 쿼리를 구성하고,  최종적으로 구성 된 문자열의 쿼리를 SP_EXECUTESQL 명령어로 실행시키는 문법

### 실습

- 아래 프로시져 구문을 완성하세요
    * @EmpNo : 조회할 고객번호 입니다.전달된 값이 없다면, 전체 고객정보를 조회합니다.

    * @IsShowOrder : 주문내역 함께보기 여부 입니다. 값이 'Y' 일 시에는 주문내역를 함께 조회합니다. 값이 'N' 일 시에는 고객정보만 조회됩니다.

    * 결과는 하나의 테이블로 출력됩니다.

    * 프로시져를 생성한 뒤, 호출하는 구문을 아래의 유형별로 작성하세요
        1) 전체 고객정보만 조회하는 경우
        2) 전체 고객정보와 주문내역을 함께 조회하는 경우
        3) 00003 고객번호에 대하여 고객정보만 조회하는 경우
        4) 00003 고객번호에 대하여 고객정보와 주문내역을 함께 조회하는 경우

```sql
CREATE PROCEDURE Customer_ListOrder
(
       @EmpNo Char(5) = '',
       @IsShowOrder Char(1) = 'N'
)
AS
BEGIN
	DECLARE @QUERY NVARCHAR(100) = '',
	@WHERE NVARCHAR(150) = '',
	@PARAMETER NVARCHAR(100);

	set @QUERY = 'SELECT * FROM Customer a';

	if @IsShowOrder = 'Y'
	begin 
		set @QUERY = @QUERY + ' inner join [order] b on a.EMPNO = b.EMPNO';
	end

	IF @EMPNO != ''
	BEGIN
		SET @WHERE = ' WHERE a.EMPNO = @EMPNO';
	end
	IF @WHERE != ''
	BEGIN
		SET @QUERY = @QUERY + @WHERE;
	END

	SET @PARAMETER = '@EMPNO char(5), @IsShowOrder Char(1)';

	EXEC SP_EXECUTESQL @QUERY, @PARAMETER, @EMPNO, @IsShowOrder;
END

drop PROCEDURE Customer_ListOrder

exec Customer_ListOrder

exec Customer_ListOrder '00003', 'N'

exec Customer_ListOrder '00003', 'Y'
```

```sql
declare
    @EmpNo Char(5) = '00001',
    @IsShowOrder Char(1) = 'Y'

DECLARE @QUERY NVARCHAR(100) = '',
@WHERE NVARCHAR(150) = '',
@PARAMETER NVARCHAR(100);

set @QUERY = 'SELECT * FROM Customer a';

if @IsShowOrder = 'Y'
begin 
    set @QUERY = @QUERY + ' inner join [order] b on a.EMPNO = b.EMPNO';
end

IF @EMPNO != ''
BEGIN
    SET @WHERE = ' WHERE a.EMPNO = @EMPNO';
end
IF @WHERE != ''
BEGIN
    SET @QUERY = @QUERY + @WHERE;
END

SET @PARAMETER = '@EMPNO char(5), @IsShowOrder Char(1)';
--동적으로 만들어진 쿼리문을 확인할 수 있다.
select @QUERY;
EXEC SP_EXECUTESQL @QUERY, @PARAMETER, @EMPNO, @IsShowOrder;
```