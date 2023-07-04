# Type coercion (타입 변환)

- [참고 자료(poiemaweb)](https://poiemaweb.com/js-type-coercion)

자바스크립트의 모든 값은 타입이 있다. 값의 타입은 다른 타입으로 개발자에 의해 의도적으로 변환할 수 있다. 또는 자바스크립트 엔진에 의해 암묵적으로 자동 변환될 수 있다. 개발자에 의해 의도적으로 값의 타입을 변환하는 것을 명시적 타입 변환(Explicit coercion) 또는 타입 캐스팅(Type casting)이라 한다.

```js
var x = 10;

// 명시적 타입 변환
var str = x.toString(); // 숫자를 문자열로 타입 캐스팅한다.
console.log(typeof str); // string
```

동적 타입 언어인 자바스크립트는 개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다. 이를 암묵적 타입 변환(Implicit coercion) 또는 타입 강제 변환(Type coercion)이라고 한다.

<br /><br />

---

<br /><br />

## 암묵적 타입 변환

자바스크립트 엔진은 표현식을 평가할 때 문맥, 즉 컨텍스트(Context)에 고려하여 암묵적 타입 변환을 실행한다.

```js
// 표현식이 모두 문자열 타입이여야 하는 컨텍스트
"10" +
  2 // '102'
  `1 * 10 = ${1 * 10}`; // "1 * 10 = 10"

// 표현식이 모두 숫자 타입이여야 하는 컨텍스트
5 * "10"; // 50

// 표현식이 불리언 타입이여야 하는 컨텍스트
!0; // true
if (1) {
}
```

<br />

- 문자열 타입으로 변환

```js
1 + "2"; // "12"
```

- 숫자 타입으로 변환

```js
1 - "1"; // 0
1 * "10"; // 10
1 / "one"; // NaN
```

- 불리언 타입으로 변환

```js
if ("") console.log(x);
```

<br /><br />

---

<br /><br />

## 명시적 타입 변환

개발자의 의도에 의해 명시적으로 타입을 변경하는 방법은 다양하다. 원래는 래퍼 객체를 생성하기 위해 사용하는 래퍼 객체 생성자 함수를 new 연산자 없이 호출하는 방법과 자바스크립트에서 제공하는 빌트인 메소드를 사용하는 방법, 그리고 앞에서 살펴본 암묵적 타입 변환을 이용하는 방법이 있다.

- 문자열 타입으로 변환

```js
console.log(String(1)); // "1"
console.log(String(NaN)); // "NaN"
console.log(String(Infinity)); // "Infinity"
```

- 숫자 타입으로 변환

```js
console.log(Number("0")); // 0
console.log(Number("-1")); // -1
console.log(Number("10.53")); // 10.53
```

- 불리언 타입으로 변환

```js
console.log(Boolean("x")); // true
console.log(Boolean("")); // false
console.log(Boolean("false")); // true
```
