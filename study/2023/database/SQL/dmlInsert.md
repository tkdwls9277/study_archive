# insert

새로운 ROW를 삽입하는 쿼리문

## 문법

INSERT INTO 삽입되는 테이블(컬럼 나열)

VALUES( 값 나열)

- 삽입되는 테이블 : ROW가 삽입되는 테이블을 명시합니다.

  필수로 명시해야 하는 부분입니다.

- 컬럼 나열 : 입력하고자 하는 컬럼들을 나열합니다.

  기본적으로 해당 구절에 컬럼들을 나열하지 않아도 구문적으로 오류는 발생하지 않습니다만,

  보통 아래의 경우에 컬럼을 나열 합니다.

  단, 입력을 생략하는 컬럼은 NULL을 허용해야 합니다.

- 값 나열 : 입력하고자 하는 값들을 나열합니다.

  필수로 명시해야 하는 부분입니다.