0807 Database
===

index
---

테이블 생성
---
```sql
CREATE TABLE TEST_TABLE(
     ID INT IDENTITY (1, 1) NOT NULL, 
     A CHAR(3),
     B VARCHAR(10),
     C INT,
     D DECIMAL(28,10),
     WRITE_DATE DATETIME
)

---------------------------------------------------------------

DECLARE @I INT
SET @I = 0
WHILE @I < 1000000
BEGIN
 INSERT INTO TEST_TABLE VALUES (
     'T' + SUBSTRING(CAST(RAND() AS VARCHAR(50)), 5,2),
     'T' + SUBSTRING(CAST(RAND() AS VARCHAR(50)), 4,10),
     SUBSTRING(CAST(RAND() AS VARCHAR(50)), 3,3),
     SUBSTRING(CAST(RAND() AS VARCHAR(50)), 3,3) *17,
     GETDATE()
 )

 SET @I = @I + 1
END
```

클러스터형으로 조회하기
---
```sql
---------------------------------------------------------------
--클러스터형으로 테이블을 생성하는 구문

CREATE CLUSTERED INDEX CL_IDX_TESTTABLE ON TEST_TABLE (ID)

---------------------------------------------------------------

SET STATISTICS IO ON

-- 전체 조회
SELECT * FROM TEST_TABLE

-- 클러스터형 인덱스 컬럼으로 조회 
SELECT * FROM TEST_TABLE WHERE ID = 5000

-- 일반 컬럼으로 조회
SELECT * FROM TEST_TABLE WHERE A = 'T36'

-- 클러스터형 인덱스 컬럼, 일반컬럼으로 조회(AND) 
SELECT * FROM TEST_TABLE WHERE ID = 5000 AND A = 'T36'

-- 클러스터형 인덱스 컬럼, 일반컬럼으로 조회(OR)
SELECT * FROM TEST_TABLE WHERE ID = 5000 OR A = 'T36'

SET STATISTICS IO OFF


---------------------------------------------------------------------------

-- 테이블을 삭제한다.
drop table TEST_TABLE
```


비클러스터형으로 조회하기
---
```sql
---------------------------------------------------------------------------
-- 비클러스터형으로 테이블을 생성하는 구문

CREATE NONCLUSTERED INDEX NCL_IDX_TESTTABLE ON TEST_TABLE (C)

---------------------------------------------------------------------------

SET STATISTICS IO ON

-- 전체 조회
SELECT * FROM TEST_TABLE      

-- 일반 컬럼으로 조회
SELECT * FROM TEST_TABLE WHERE A = 'T36'

-- 비클러스터형 인덱스 컬럼, 일반컬럼으로 조회(AND)
SELECT * FROM TEST_TABLE WHERE C = 627 AND A = 'T36'

-- 비클러스터형 인덱스 컬럼, 일반컬럼으로 조회(OR)
SELECT * FROM TEST_TABLE WHERE C = 627 OR A = 'T36'

SET STATISTICS IO OFF

---------------------------------------------------------------------

```

트랜잭션 격리수준
---
    1. Read Uncommitted
    2. Read Committed
    3. Repeatable Read
    4. Serializable
    5. Read Committed Snapshot
    6. Snapshot

     - Read Uncommitted
        베타적잠금이 진행중인 Data를 조회할 수 있으며, 이 Data는 Commit 될 수도, Rollback 될 수도 있는 Data입니다.
        단일 조회 쿼리에 대하여 Read Uncommitted 격리수준을 적용하기 위해서는
        WITH(NOLOCK) 힌트를 사용하여 적용할 수 있습니다.

        Ex) SELECT * FROM Customer WITH(NOLOCK);
             // 베타적잠금이 진행중인 Data도 조회합니다.

     - Read committed (기본설정)
        베타적잠금이 진행중인 Data는 조회할 수 없으며, 조회하는 대상에 해당 Data가 포함되어 있다면,
         Commit / Rollback될 때까지 대기상태를 유지합니다.

트랜잭션(transaction)
---

```sql
-- 회사의 관행. nolock과 readuncommitted를 함께 씀.
select * from password with(nolock, readuncommitted)

--이 구문을 쓴다면 현재 쿼리창 전체에서 readuncommitted 가 적용된 상태가 됨.
set transaction isolation level read uncommitted
```