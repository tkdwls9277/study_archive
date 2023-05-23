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
