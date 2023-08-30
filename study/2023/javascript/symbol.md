# symbol

- [참고 자료(poiemaweb)](https://poiemaweb.com/es6-symbol)

심볼(symbol)은 ES6에서 새롭게 추가된 7번째 타입으로 변경 불가능한 원시 타입의 값이다. 심볼은 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용한다.

## Symbol의 생성

Symbol은 Symbol() 함수로 생성한다. Symbol() 함수는 호출될 때마다 Symbol 값을 생성한다. 이때 생성된 Symbol은 객체가 아니라 변경 불가능한 원시 타입의 값이다.

```js
// 심볼 mySymbol은 이름의 충돌 위험이 없는 유일한 프로퍼티 키
let mySymbol = Symbol();

console.log(mySymbol); // Symbol()
console.log(typeof mySymbol); // symbol
```

<br/><br/>

---

<br/><br/>

## Symbol의 사용

객체의 프로퍼티 키는 빈 문자열을 포함하는 모든 문자열로 만들 수 있다.

```js
const obj = {};

obj.prop = "myProp";
obj[123] = 123; // 123은 문자열로 변환된다.
// obj.123 = 123;  // SyntaxError: Unexpected number
obj["prop" + 123] = false;

console.log(obj); // { '123': 123, prop: 'myProp', prop123: false }
```

Symbol 값도 객체의 프로퍼티 키로 사용할 수 있다. Symbol 값은 유일한 값이므로 Symbol 값을 키로 갖는 프로퍼티는 다른 어떠한 프로퍼티와도 충돌하지 않는다.

```js
const obj = {};

const mySymbol = Symbol("mySymbol");
obj[mySymbol] = 123;

console.log(obj); // { [Symbol(mySymbol)]: 123 }
console.log(obj[mySymbol]); // 123
```

<br/><br/>

---

<br/><br/>

## Symbol 객체

Symbol() 함수로 Symbol 값을 생성할 수 있었다. 이것은 Symbol이 함수 객체라는 의미이다

위 참조 결과에서 알 수 있듯이 Symbol 객체는 프로퍼티와 메소드를 가지고 있다. Symbol 객체의 프로퍼티 중에 length와 prototype을 제외한 프로퍼티를 Well-Known Symbol이라 부른다.

- Symbol.iterator
- Symbol.for
