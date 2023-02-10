0806 DataBase
===

select
---

### 문법

SELECT 조회할 컬럼<br>
FROM  조회할 테이블<br>
WHERE 조회할 조건


     -  조회할 컬럼     : 조회하고자 하는 테이블의 컬럼들을 나열하며,테이블의 전체 컬럼들을 조회할 시에는 *를 표기 합니다. 필수로 명시해야 하는 부분입니다.

     -  조회할 테이블 :  조회하고자 하는 대상 테이블을 명시합니다.
                                   필수로 명시해야 하는 부분입니다.

     -  조회할 조건     : 특정 조건에 해당되는 데이터만 조회할 시, 조건을 명시합니다. 조건을 명시하는 구문은 아래와 같습니다. 조건이 필요하지 않은 경우에는 생략 가능한 구절입니다.


① 비교연산자 : 값을 비교하고자 할 때, 사용하는 연산자 입니다.

>=         :  같음을 비교 합니다.<br>
!=, <>     :  같지 않음을 비교 합니다.<br>
'>'        :  대상컬럼 값이 조건값보다 큰지를 비교합니다.<br>
>=         :  대상컬럼 값이 조건값보다 크거나 같은지를 비교합니다.<br>
<          :  대상컬럼 값이 조건값보다 작은지를 비교합니다.<br>
<=         :  대상컬럼 값이 조건값보다 작거나 같은지를 비교합니다.<br>


② 논리연산자 : 여러개의 조건을 연결할 때 사용하는 연산자 입니다.<br>
    - AND      :  연결 된 조건이 모두 만족해야 성립합니다.<br>
    - OR          :  연결 된 조건 중 하나만 만족해도 성립합니다.



③ LIKE 연산자 : 문자열의 일부를 비교할 때 사용하는 연산자 입니다.


④ BETWEEN 연산자 : 특정 범위를 값들을 지정하기 위해 사용하는 연산자 입니다.


⑤ 범위 연산자 : 특정 값들을 명시적으로 나열하여 범위를 지정하기 위해 사용하는 연산자 입니다.
IN           :  명시한 특정 값들에 해당되는 값들을 포함합니다.
NOT IN  :  명시한 특정 값들에 해당되지 않는 값들을 포함합니다.


⑥ NULL 연산자 : NULL에 대한 값을 비교하기 위한 연산자 입니다.
※ NULL이란?
     빈 값이 아닙니다. 값이 없음도 아닙니다. 값을 알 수 없는 상태입니다.
     ex) 가나다 순으로 직원들의 핸드폰 번호를 조사중인 상황입니다,
           현재 순서상 '이' 씨의 성을 가진 직원들을 조사하고 있습니다.
           이 때, '홍길동'의 핸드폰 번호는 빈 값이 아닙니다. 값이 없음도 아닙니다.
           아직 조사하지 않았으니, 핸드폰 번호가 있는지 없는지, 어떤건지 알 수 없는 상태입니다.
           홍길동의 핸드폰 번호는 NULL인 상황입니다.



1. 이름에 '장'이 들어간 고객정보를 조회하세요. 난이도 ★
```sql
select name from customer where name like '%장%'
```

2. 한식, 중식의 메뉴들을 조회하세요(단, 비교연산자를 이용하세요) 난이도 ★
```sql
select menuname from ordersheet where menutype = '한식' or menuType = '중식';
```

3. 양식, 한식을 제외한 메뉴들을 조회하세요(단, 비교연산자를 이용하세요) 난이도 ★
```sql
select menuname from ordersheet where menutype != '한식' or menuType !='중식';
```

4. 이름이 '홍길동' 이거나 '장동건' 이면서 핸드폰번호가 01049501313 인 고객정보의 고객번호를 조회하세요. 난이도 ★ 
```sql
select empno from customer where (name = '홍길동' or name = '장동건') and tel = '01049501313';
```

 5. 메뉴종류가 '한식' 이면서  메뉴명이 '청국장' 이 아닌 메뉴정보를 조회하세요. 난이도 ★
 ```sql
select * from ordersheet where menutype = '한식' or MenuName != '청국장';
```

 6. 이름이 홍으로 시작하면서 3글자로 끝나는 고객정보를 조회하세요. 난이도 ★★★
(단 Like 연산자만 이용하세요)
```sql
select* from customer where name like '홍__'; 
```

update
---

1. 고객정보 테이블에서 이름이 J로 시작하는 고객들의 핸드폰번호를 NULL로 변경하는 쿼리를 작성하세요. 난이도 ★
```sql
update Customer set Tel = null where name like 'J%';
```

2. 고객정보 테이블에서 이름이 '아무개'인 고객의 이름을 '아무개입니다',핸드폰번호를 NULL로 변경하는 쿼리를 작성하세요. 난이도 ★★
```sql
update Customer set name = '아무개입니다.', tel=null where name='아무개';
```

delete
---

1. 3-1 준비자료가 저장되어 있는 상황에서 아래의 자료를 삭제는 쿼리를 작성하고,삭제가 안되는 자료는 이유를 설명하세요. 난이도 ★★ - 참조무결성
```sql
delete from OrderSheet where menuType in('한식', '중식');
```


select
---

과제
---

1. 양식을 주문한 고객 중, 이름에 '김'이 포함된 고객의 고객번호와 고객명과 주문시간을 조회하는 쿼리를 작성하세요. 난이도 ★★★

```sql
select a.empno, a.name, b.orderTime
from Customer a inner join [order] b
on a.EMPNO = b.EMPNO
on a.menuno = b.menuno
where name like '%김%' 
```

2. 함박스테이크를 주문한 고객 중, 핸드폰 끝자리가 3333으로 끝나는 고객의 고객이름과, 핸드폰번호, 메뉴번호를 조회하는 쿼리를 작성하세요. (하나의 쿼리로 실행결과가 제출되어야 합니다) 난이도 ★★★
```sql
select a.name, a.tel, b.MENUNO
from Customer a inner join (
select *
from ordersheet 
where menuname='함박스테이크'
) b
on a.tel like '%3333'


--select a.name, a.tel, a.empno
--from customer a inner join [order] b inner join ordersheet c
--on c.menuname = '함박스테이크'
--where  a.tel like '%3333'
```

 3. 고객 '아무개' 가 주문한 메뉴와 동일한 메뉴를 주문한 고객의 고객명과 핸드폰번호를 조회하는 쿼리를 작성하세요. 난이도 ★★★★
 (아무개는 제외되어 출력되야 합니다.) 아무개는 한번만 호출
 ```sql
 select *
 from Customer a inner join [Order] b
 on a.EMPNO = b.EMPNO
 where b.MENUNO in
  (select b.MENUNO
 from Customer a inner join [Order] b
 on a.EMPNO = b.EMPNO 
 where a.Name = '아무개입니다.') and a.NAME != '아무개입니다.';
 ```


 4. 한번이상 주문한 메뉴종류들에 대한 메뉴명 리스트를 출력해야 합니다. 출력되는 데이터는 메뉴명과, 주문한 고객이름입니다. 주문한 내역이 없다면 고객이름은 NULL로 표현되어야 합니다. (하나의 쿼리로 실행결과가 제출되어야 합니다.) 난이도 ★★★★★
```sql
 select menuname, name
 from OrderSheet a left outer join (
 select a.MENUNO, b.NAME
 from [order] a inner join customer b
 on a.EMPNO=b.EMPNO
 ) b
 on a.MENUNO = b.MENUNO
 ```

5. 주문을 한번도 하지않은 고객들의 고객번호, 고객명, 핸드폰번호를 조회하는 쿼리를 작성하세요. 난이도 ★★★
```sql
select empno, name, tel
from Customer
where empno not in (SELECT EMPNO FROM [order])
```

7. 메뉴종류별로 주문된 내역을 조회하는 쿼리를 작성하세요. 난이도 ★★★★★★
주문한 내역이 없어도 메뉴종류는 조회되어야 합니다. 조회하는 값은 메뉴 종류, 메뉴명, 주문시간, 고객이름 입니다. (하나의 쿼리로 실행결과가 제출되어야 합니다.)
```sql
select b.menuType, menuname, ordertime, name
from Customer a right outer join (
select empno, ordertime, menuname, menutype
from [order] a right outer join ordersheet b
on a.MENUNO=b.MENUNO
) b
on a.EMPNO = b.EMPNO


select distinct menuType, menuname, ordertime, name
from ordersheet a left outer join (
select ordertime, name, MENUNO
from [order] a inner join customer b
on a.empno=b.EMPNO
) b
on a.MENUNO = b.MENUNO
```

insert
---

각각의 메뉴별 주문시간을 조회한 DATA를 새로운 테이블로 생성하세요. 난이도 ★★★
1) 테이블 명은 OrderTimeByMenu 입니다.
2) 컬럼은 메뉴번호(MENUNO), 메뉴명(MENUNAME), 주문시간(ORDERTIME) 입니다.
    메뉴번호는 OrderSheet테이블의 MEMUNO를 입력합니다.
    메뉴명은 OrderSheet테이블의 MENUNAME를 입력합니다.
    주문시간은 Order테이블의 ORDERDATE를 입력합니다.
3) 주문된 내역이 없는 메뉴라도 입력이 되어야 하며, 이 경우에는 주문시간이 NULL 값으로 저장됩니다.
4) SELECT INTO를 이용한 쿼리로 작성하세요
```sql
select C.menuno, C.menuname, ordertime into OrderTimeByMenu
from [Order] A right outer JOIN OrderSheet C
ON A.MENUNO = C.MENUNO;

select * from OrderTimeByMenu
```

update
---
```sql
ALTER TABLE Customer ADD ISMEMBERSHIP CHAR(1);
ALTER TABLE Customer ADD BUYCOUNT INT;

UPDATE A
SET A.ISMEMBERSHIP = 'Y'
FROM Customer A INNER JOIN (
   SELECT EMPNO
   FROM [ORDER]
   GROUP BY EMPNO
) B
ON A.EMPNO = B.EMPNO;

select * from customer
```

1. 본문에서 추가한 BUYCOUNT 요구사항을 처리하기 위한 쿼리를 작성하세요. 난이도 ★★★★
    1) 구매횟수 컬럼입니다.
    2) 주문내역을 참고하여 구매한 횟수를 저장하는 쿼리입니다.
    3) 쿼리결과는 아래와 같이 나와야 합니다.(데이터에 따라 상이할   있습니다.)
```sql
update A
set A.BUYCOUNT = count
from Customer a inner join(
select empno, count(*) count
from [order]
group by empno) B
on a.empno = b.empno;  
```