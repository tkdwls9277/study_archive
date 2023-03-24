# REST API

    REST - Representational State Transfer

<br />

## API?

URI를 통해 자원을 표시하고, HTTP Method를 이용하여 해당 자원의 행위를 규정하여 그 결과를 받는 것

- 자원(Resource): URI
- 행위(Verb): HTTP Method
- 표현(Representations)

<br />

## REST API?

    데이터와 기능의 집합을 제공하여 컴퓨터 프로그램간 상호작용을 촉진하며, 서로 정보를 교환가능 하도록 하는 것
    REST 기반으로 서비스 API를 구현한 것

<br />

## REST API의 특징

- REST 기반으로 시스템을 분산해 확장성과 재사용성을 높여 유지보수 및 운용을 편리하게 할 수 있다.
- REST는 HTTP 표준을 기반으로 구현하므로, HTTP를 지원하는 프로그램 언어로 클라이언트, 서버를 구현할 수 있다.
  - 자바, C#, 웹 등

<br />

## REST API의 구성

<br />

### 자원(Resource): URI

- 모든 자원에 고유한 ID가 존재하고, 이 자원은 Server에 존재한다.
- 자원을 구별하는 ID는 ‘/groups/:group_id’와 같은 HTTP URI 다.
- Client는 URI를 이용해서 자원을 지정하고 해당 자원의 상태(정보)에 대한 조작을 Server에 요청한다.

<br />

### 행위(Verb): HTTP Method

- HTTP 프로토콜의 Method를 사용한다.
- HTTP 프로토콜은 GET, POST, PUT, DELETE 와 같은 메서드를 제공한다.

| METHOD  | 역할                                                                                                                                               |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET     | 요청받은 URI의 정보를 검색하여 응답                                                                                                                |
| HEAD    | GET방식과 동일하지만, 응답에 BODY가 없고 응답코드와 HEAD만 응답. <br/> 웹서버 정보확인, 헬스체크, 버젼확인, 최종 수정일자 확인등의 용도로 사용     |
| POST    | 요청된 자원을 생성(CREATE) <br/> 새로 작성된 리소스인 경우 URI주소를 포함하여 응답                                                                 |
| PUT     | 요청된 자원을 수정(UPDATE) <br/> 내용 갱신. URI를 보내지 않아도 됨 <br/>클라이언트측은 요청된 URI를 그대로 사용하는 것으로 간주                    |
| PATCH   | PUT과 유사하게 요청된 자원을 수정(UPDATE)할 때 사용 <br/> PUT의 경우 자원 전체를 갱신하는 의미지만, PATCH는 해당자원의 일부를 교체하는 의미로 사용 |
| DELETE  | 요청된 자원을 삭제할 것을 요청함(안전성 문제로 대부분의 서버에서 비활성)                                                                           |
| CONNECT | 동적으로 터널 모드를 교환, 프락시 기능을 요청시 사용                                                                                               |
| TRACE   | 원격지 서버에 루프백 메시지 호출하기 위해 테스트용으로 사용                                                                                        |
| OPTIONS | 웹서버에서 지원되는 메소드의 종류를 확인할 경우 사용                                                                                               |

 <br/>

### 표현(Representations)

- Client가 자원의 상태(정보)에 대한 조작을 요청하면 Server는 이에 적절한 응답(Representation)을 보낸다.
- REST에서 하나의 자원은 JSON, XML, TEXT, RSS 등 여러 형태의 Representation으로 나타내어 질 수 있다.

<br />

---

<br />

![](images\2023-03-16-13-46-32.png)
