# Materialized View

    일반 View는 논리적인 테이블이고, MView는 물리적으로 존재하는 테이블 입니다. 물리적으로 존재한다는 것은 Data가 일정 공간을 차지하고 있다는 거죠..

    MView는 어떤 결과를 뽑아 내는 쿼리가 너무나도 빈번히 사용 될 경우, Query 실행 시간의 수행속도 향상을위하여 , 여러 가지의 Aggregate View를 두어, 미리 비용이 많이 드는 조인이나, Aggregate Operation 을 처리하여야 하는 SQL을 위해, 데이터베이스의 한 테이블로 저장 하며, 그 테이블을 조회 하도록 하는 것 입니다.

    간단하게 설명하면 대용량의 데이터를 SUM, MIN, MAX, AVG, COUNT(*)이런 명령어를 사용해 너무나도 자주 조회하는 Query를 수행속도를 향상을 위해서, Query의 결과 만큼의 새로운 테이블을 생성해 놓는 벙법 입니다.

    자주사용되는 View의 결과를 디스크에 저장해서 Query 속도를 향상시키는 개념 입니다.


<br/>

## 특징

- MView를 만들어두면 QUERY의 수행속도를 증가 시킬 수 있습니다.

- SQL 응용프로그램에서 MView 사용시 DBA는 프로그램에 영향을 끼치지 않고 언제든지 생성 및 제거가 가능 합니다.

- MView는 실행의 결과 행과 뷰 정의 모두 저장이 되고, 실행 결과 행으로 만들어진 테이블은 일정 공간을 차지 합니다.

- MView관련 기초 테이블을 변경하면, MView로 생성된 Summary 테이블도 변경 됩니다.

### 인덱스와 유사한 특징

1. 실제 데이터를 갖고 공간 차지

 2. master table의 데이터가 변할 때 refresh 될 수 있음.

 3. query rewrite operation이 사용될 때 SQL 실행 성능 향상

 4. SQL 응용 프로그램과 사용자에게 명확하다.

### 뷰와 유사한 특징

1. table과 view에 있는 데이터를 나타냄

2. index와 달리 사용자들이 select문을 통해 직접적으로 materialized view를 조회 가능.

3. refresh type에 따라 DML로 update 가능

<br/>

## 일반 View와 차이점

- 가장 큰 차이점은 MView의 결과값은 물리적으로 존재하는 것이고, 일반 View의 결과값은 물리적으로 존재하지 않습니다. 즉 SELECT * FROM USER_SEGMENTS 하면 MView는 나오지만 일반 View는 나오지 않습니다.

- MView는 MView를 생성할때의 Query로 물리적으로 이미 데이타가 생성되어 있기 때문에 조회 속도가 빠릅니다. 하지만 View는 단지 쿼리정보가 딕셔너리에 저장되어 있고 사용될때 그 SQL이 다시 실행되는 것이기 때문에 MView보다 느립니다. MView로 생성된 결과값이 일반 View로 조회하는 Data의 결과값 보다 훨씬 적은 Row를 조회하게 되죠.

<br/>

## MView 관련 파라미터

- OPTIMIZER_MODE : MView를 사용하기 위해서는 Cost-Based 옵티마이져 여야 하므로 ALL_ROWS, CHOOSE, 혹은 FIRST_ROWS 중의 어느 하나를 사용 합니다.

- QUERY_REWRITE_ENABLED : Query Rewrite 사용을 위해서는 TRUE로 설정하면 됩니다.

- QUERY_REWRITE_INTEGRITY : 오라클이 Query Rewrite의 정확성을 제어하는 파라미터로, "STALE_TOLERATED", "TRUSTED", "ENFORCED" 로 지정할 수 있습니다.

    STALE_TOLERATED : 사용되어진 기초테이블과 Consistent 하지 않은 View를 이용한Query Rewrite를 허용 합니다

    TRUSTED : Optimizer에서 MView의 데이터가 정확하다고 간주하고 질의 수행. Integrity 확인을 하지 않습니다.

    ENFORCED : QUERY_REWRITE_INTEGRITY 의 기본값으로, 사용자가 Integrity Constraint를 확인하여야 합니다.

- COMPATIBLE : 사용할 수 있는 오라클 함수들의 Compatibility를 결정하는 값으로 8.1.0 또는 그 이상으로 설정 해야 합니다.

<br/>

## refresh 방법

1. fast refresh

- 정기적인 시간 간격 또는 원할 때 refresh 가능

- master table의 변화는 transaction이 commit 될 때마다 refresh될 수 있음.

- A materialized view log is a schema object that records changes to master table data so that a materialized view defined on the master table can be refreshed incrementally.

- 요약하면 fast refresh를 위한 materialized view log가 있고 이 materialized view log때문에 점진적으로 refresh 가능(매번 처음부터가 아니라)

​

2. complete refresh

- 느리다(특히, 많은 양의 데이터를 처리하고 읽어야 한다면..)

- materialized view가 사전 빌드 된 테이블을 참조하지 않는 한 materialized view는 

    처음 BUILD IMMEDIATE로 정의될 때 complete refresh가 발생합니다. 

    refresh에는 materialized view를 정의하는 쿼리 실행이 포함됨.