# DB 테이블 설계

## 상향식 방법

1. 기획안을 보며 모든 키워드를 뽑아낸다.
2. 뽑아낸 키워드를 행위와 데이터로 나눈다.
    1. 행위와 데이터는 각각 행위 엔터티, 실체 엔터티로 매핑된다.
    2. 다만 모든 행위나 데이터가 DB에 담겨야하는 것은 아니다. 서버에서     ENUM으로 관리하는 데이터도 있을 수 있다.
3. 2-1에서 설계한 엔터티에 관계를 매핑한다. 명심할 것은 관계는 속성이라는 점이다. 속성이 필요한 이유는 엔터티 간의 조인(join)을 하기 위해서이다.

