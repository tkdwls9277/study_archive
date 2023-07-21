# Global Object (전역 객체)

- [참고 자료(poiemaweb)](https://poiemaweb.com/js-global-object)

전역 객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며 일반적으로 Browser-side에서는 window, Server-side(Node.js)에서는 global 객체를 의미한다.

- 전역 객체는 실행 컨텍스트에 컨트롤이 들어가기 이전에 생성이 되며 constructor가 없기 때문에 new 연산자를 이용하여 새롭게 생성할 수 없다. 즉, 개발자가 전역 객체를 생성하는 것은 불가능하다.

- 전역 객체는 전역 스코프(Global Scope)를 갖게 된다.

- 전역 객체의 자식 객체를 사용할 때 전역 객체의 기술은 생략할 수 있다. 예를 들어 document 객체는 전역 객체 window의 자식 객체로서 window.document…와 같이 기술할 수 있으나 일반적으로 전역 객체의 기술은 생략한다.

<br /> <br />

---

<br /><br />

## 전역 프로퍼티(Global property)

전역 프로퍼티는 전역 객체의 프로퍼티를 의미한다. 애플리케이션 전역에서 사용하는 값들을 나타내기 위해 사용한다. 전역 프로퍼티는 간단한 값이 대부분이며 다른 프로퍼티나 메소드를 가지고 있지 않다.

- Infinity
- NaN
- undefined

<br /> <br />

---

<br /><br />

## 전역 함수(Global function)

- eval()
- isFinite()
- isNaN()
- parseFloat()
- parseInt()
- encodeURI() / decodeURI()
- encodeURIComponent() / decodeURIComponent()
