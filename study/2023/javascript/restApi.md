# REST API

<br/>

---

<br/>

## 중심 규칙

1. URI는 정보의 자원을 표현해야 한다.
2. 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE 등)으로 표현한다.

| Method | Action         | 역할                    | 페이로드 |
| ------ | -------------- | ----------------------- | -------- |
| GET    | index/retrieve | 모든/특정 리소스를 조회 | x        |
| POST   | create         | 리소스를 생성           | ○        |
| PUT    | replace        | 리소스의 전체를 교체    | ○        |
| PATCH  | modify         | 리소스의 일부를 수정    | ○        |
| DELETE | delete         | 모든/특정 리소스를 삭제 | x        |

<br/><br/>

---

<br/><br/>

## 구성

| 구성 요소       | 내용                    | 표현 방법             |
| --------------- | ----------------------- | --------------------- |
| Resource        | 자원                    | HTTP URI              |
| Verb            | 자원에 대한 행위        | HTTP Method           |
| Representations | 자원에 대한 행위의 내용 | HTTP Message Pay Load |
