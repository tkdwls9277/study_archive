# ALTER

DB/Table을 수정하는 쿼리문

## 학습

● DB

ALTER DATABASE DB명칭

ALTER FILEGROUP 파일그룹01;

●  Table

기존컬럼 변경

ALTER TABLE 테이블명칭

ALTER COLUMN  기존컬럼명칭 자료형 제약사항;

기존컬럼 삭제

ALTER TABLE 테이블명칭

DROP COLUMN  기존컬럼명칭;

신규컬럼 추가

ALTER TABLE 테이블명칭

ADD 신규컬럼명칭 자료형 제약사항;
