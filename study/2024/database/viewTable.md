# 뷰 테이블

가상 테이블. 실제 데이터가 저장되는 것이 아닌, 뷰를 통해 데이터를 관리하는 것. TABLE은 실질적인 데이터가 있지만 VIEW는 데이터가 없고 SQL만 저장한다.

```sql
CREATE 생략가능[OR REPLACE] 생략가능[FORCE | NOFORCE] VIEW 뷰명
AS (SELECT문)
생략가능[WITH CHECK OPTION 생략가능[CONSTRAINT 제약조건명]]
생략가능[WITH READ ONLY 생략가능[CONSTRAINT 제약조건명]]
```

- OR REPLACE option : 해당 구문 사용하면 뷰를 수정할 때 DROP 없이 수정 가능

- With Check option : 주어진 제약 조건에 맞는 데이터만 입력 및 수정 가능

- With read only : select 만 가능

```sql
--학교 테이블에서 학년이 3인 학생들의 성명과 학번을 학교뷰테이블이라는 뷰로 만드는 쿼리
CREATE OR REPLACE VIEW 학교뷰테이블(성명, 학번)
AS SELECT 성명, 학번
FROM 학교
WHERE 학년 ='3';
```

<br/>

## 사용하는 이유

- 한개의 뷰로 여러 테이블에 대한 데이터를 검색할 수 있다.

- 뷰를 통해서만 데이터에 접근하게 되면 뷰에 없는 데이터를 안전하게 보호할 수 있다.

- 조인 쿼리문을 매번 작성하기 보다는 조회 쿼리문을 뷰로 만들어놓고 뷰를 조회하는 것이 편하기 때문에 VIEW를 사용

기본 조회 쿼리

```sql
select
stu.name,
d.deptno
from student stu, department d, professor p
where student deptno = d.deptno
and d.pno = p.id
```

VIEW 생성해서 조회하는 쿼리

```sql
CREATE OR REPLACE VIEW v1
AS
select
stu.name,
d.deptno
from student stu, department d, professor p
where student deptno = d.deptno
and d.pno = p.id;
```
