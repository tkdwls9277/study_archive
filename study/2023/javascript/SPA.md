# Single Page Application

단일 페이지 애플리케이션(Single Page Application, SPA)는 모던 웹의 패러다임이다. SPA는 기본적으로 단일 페이지로 구성되며 기존의 서버 사이드 렌더링과 비교할 때, 배포가 간단하며 네이티브 앱과 유사한 사용자 경험을 제공할 수 있다는 장점이 있다.

link tag를 사용하는 전통적인 화면 전환 방식은 새로운 페이지 요청 시마다 정적 리소스가 다운로드되고 전체 페이지를 다시 렌더링하는 방식을 사용하므로 새로고침이 발생되어 사용성이 좋지 않다. 그리고 변경이 필요없는 부분까지 포함하여 전체 페이지를 갱신하므로 비효율적이다.

### 단점

    - 초기 구동 속도
    - SEO(검색엔진 최적화) 이슈

<br/><br/>

---

<br/><br/>

## Routing

- 브라우저의 주소창에 URL을 입력하면 해당 페이지로 이동한다.

- 웹페이지의 링크(a 태그)를 클릭하면 해당 페이지로 이동한다.

- 브라우저의 뒤로가기 또는 앞으로가기 버튼을 클릭하면 사용자 방문 기록(history)의 뒤 또는 앞으로 이동한다. history 관리를 위해서는 각 페이지는 브라우저의 주소창에서 구별할 수 있는 유일한 URL을 소유해야 한다.

<br/><br/>

---

<br/><br/>

## SPA와 Routing

- 전통적 링크 방식

```
link tag로 동작하는 기본적인 웹페이지의 동작 방식
```

<br/>

- ajax 방식

```
전통적 링크 방식의 단점을 보완하기 위해 등장한 것이 ajax(Asynchronous JavaScript and XML)이다. ajax는 자바스크립트를 이용해서 비동기적(asynchronous)으로 서버와 브라우저가 데이터를 교환할 수 있는 통신 방식
```

<br/>

- Hash 방식

```
ajax 방식은 불필요한 리소스 중복 요청을 방지할 수 있고 새로고침이 없는 사용자 경험을 구현할 수 있다는 장점이 있지만 history 관리가 되지 않는 단점이 있다. 이를 보완한 방법이 Hash 방식이다.

Hash 방식은 URI의 fragment identifier(#service)의 고유 기능인 앵커(anchor)를 사용한다. fragment identifier는 hash mark 또는 hash라고 부르기도 한다.
```

<br/>

- pjax 방식

```
hash 방식의 가장 큰 단점은 SEO 이슈이다. 이를 보완한 방법이 HTML5의 History API인 pushState와 popstate 이벤트를 사용한 pjax(pushState + ajax) 방식이다. pushState와 popstate은 IE 10 이상에서 동작한다.
```
