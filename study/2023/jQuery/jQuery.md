# JQuery

## Freamework

    - 타 개발자가 만들어 배포한 로직 꾸러미.

<br /><br />

## Framework 사용 이유

    - 손이 많이 가는 로직도 interface 호출만으로 구현가능하도록 만들어져 있으므로 생산성이 증가한다
    - 각 브라우저마다 스펙 적용 차이가 있어 각자 다른 커맨드로 구현하여주어야 하는 부분을 보완해준다.
        - IE, FireFox, Chorme은 모두 ECMA 스펙 적용정도에 차이가 있어 브라우저에 따라 명령어가 존재하지 않거나, 같은 커맨드를 작동해도 동작이 다른 경우가 있음.
        - DOM reflow시 업데이트 타이밍이 다른것이 대표적인 케이스.

<br /><br />

## Jquery를 사용한 DOM 생성

```html
- <!DOCTYPE html>
<html>
  <head>
    <title>Sample</title>
    <script
      src="https://code.jquery.com/jquery-3.4.0.min.js"
      integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
      crossorigin="anonymous"
    ></script>
    <script>
      var $div = $("<div />").css({ height: "500px", width: "500px", backgroundColor: "blue" });
      $(document.body).append($div);
    </script>
  </head>
  <body></body>
</html>
```

- 상대적으로 간단하고 짧은 코드로 DOM생성 가능
- Method Chaining을 이용해 로직을 간략화 할 수 있다.

<br /><br />

## Jquery를 사용한 DOM 조작

    - CSS 선택자 이용.
        - $("cssSelector")
    - Jquery 객체로 래핑된 DOM object가 반환된다.
    - DOM 은 jQueryObject.get(0) 으로 획득 가능.
    - 다수의 객체를 전제하고 있으므로 객체 존재여부는 반드시 length를 체크하여야한다.

<br /><br />

## Jquery를 사용한 EventHandler 추가

    - on("eventName", handler)
    - off("eventName")
    - bind("eventName", handler)
    - unbind("eventName")

<br /><br />

---

<br /><br />

- [참고 자료(poiemaweb)](https://poiemaweb.com/jquery-basics)

# jQuery

- 크로스 플랫폼을 지원하는 jQuery는 어떠한 브라우저에서도 동일하게 동작한다. 이것은 브라우저 호환성을 고려하여 대체 코드(Polyfill)를 작성할 필요가 없다는 것을 의미한다.

- 네이티브 DOM API(DOM Query, Traversing, Manipulation 등)보다 직관적이고 편리한 API를 제공한다. CSS 스타일의 selector를 사용할 수 있으며 조작 또한 강력하며 유연하다.

- 이벤트 처리, Ajax, Animation 효과를 쉽게 사용할 수 있다.

- 다양한 플러그인이 존재하며 다른 라이브러리들과 충돌을 일으키지 않는다.

<br /><br />

## jQuery 함수

jQuery를 사용하기 위해서는 먼저 jQuery 객체를 생성하여야 한다. 생성된 jQuery 객체는 다양한 메소드를 가지는데 jQuery를 학습한다고 하는 것은 대체로 이 메소드를 사용하는 방법을 익히는 것이다.

```js
jQuery();
$();
```

jQuery() 함수는 전달되는 인수의 종류에 따라 다른 움직임을 하지만 결국 jQuery 객체를 반환한다.

- CSS 스타일의 selector를 인수로 전달받을 때: jQuery는 CSS 스타일의 selector를 이용하여 요소를 선택할 수 있다.
- HTML을 인수로 전달받을 때: HTML 문자열을 인수로 받으면 새로운 HTML 요소를 생성한다.
- JavaScript 객체를 인수로 전달받을 때: JavaScript 객체(plain object, DOM element, array 등)를 인수로 받으면 그 객체를 jQuery 객체로 wrap한 객체를 반환한다.
- 콜백함수를 인수로 전달받을 때: 안전하게 DOM을 조작하기 위해서는 DOM이 완전히 로드된 후 자바스크립트가 실행되는 것이 바람직한데 이를 위해 이벤트 처리가 필요하다.DOM이 완전히 로드되기 전까지 대기하다가 로드가 완료되면 매개변수로 전달된 콜백함수가 실행된다.

<br /><br />

---

<br /><br />

## Selector

jQuery는 CSS 스타일의 Selector를 이용하여 요소를 선택할 수 있다. 이것은 자바스크립트 DOM API보다 쉽고 강력하며 유연하다.

- 태그 / ID / Class 선택자: jQuery는 반복문 없이 해당하는 모든 요소에 접근/조작할 수 있다. 이를 묵시적 반복(implicit iteration)
- 후손 선택자 (Descendant Selector): 자신의 1 level 상위에 속하는 요소를 부모 요소, 1 level 하위에 속하는 요소를 자식 요소라고 한다. 자신보다 n level 하위에 속하는 요소는 후손 요소(하위 요소)라 한다. 후손 요소는 자손 요소를 포함하는 개념이다.
- 자식 선택자 (Child Selector)
- 복합 선택자 (Multiple Selector)
- 가상 클래스 선택자 (Pseudo-Class Selector)

- [참고 자료](https://api.jquery.com/category/selectors/)

<br /><br />

---

<br /><br />

## Traversing

Selector를 사용하여 matched set을 생성한 이후, matched set의 요소들과 관련있는 다른 요소에 접근할 수 있다. 이를 DOM 탐색(DOM Traversing)이라 한다. Traversing은 선택자 방식보다 더 빠르다.

- [참고 자료](https://api.jquery.com/category/traversing/)

<br /><br />

---

<br /><br />

## Manipulation

DOM에 새로운 요소를 추가/삭제, 복사, 속성 변경 등을 실시할 수 있다. 이를 DOM 조작(DOM Manipulation)이라 한다.

- Appending: HTML에 의해 생성된 DOM에 새로운 요소를 추가한다.
- Removing: 요소의 제거

- [참고 자료](https://api.jquery.com/category/manipulation/)

<br /><br />

---

<br /><br />

## CSS / Attributes

<br /><br />

---

<br /><br />

## Event

매치드셋에 이벤트를 바인딩하고 해당 이벤트가 발생했을 때 실행될 콜백 함수를 지정한다.

| Parameter | Description                                                                        |
| --------- | ---------------------------------------------------------------------------------- |
| events    | 1개 또는 2개 이상의 공백으로 구분된 이벤트명                                       |
| selector  | 이벤트를 바인딩할 매치드셋의 후손 선택자                                           |
| data      | 이벤트핸들러에 전달할 데이터. 이벤트핸들러의 매개변수 event.data에 담겨 전달된다.  |
| handler   | 이벤트가 발생했을 때 실행될 함수. 첫번째 인자로 이벤트 객체가 암묵적으로 전달된다. |

- [참고 자료](https://api.jquery.com/category/events/)
