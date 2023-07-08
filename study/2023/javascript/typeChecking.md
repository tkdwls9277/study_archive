# Type Checking(타입 체크)

자바스크립트는 변수나 반환값의 타입을 사전에 지정하지 않는 동적 타입(dynamic typed) 언어이므로 변수에 어떤 값이 할당될 지 예측하기 어렵다.

<br /><br />

---

<br /><br />

## typeof

```js
typeof ""; // string
typeof 1; // number
typeof NaN; // number
typeof true; // boolean
typeof []; // object
typeof {}; // object
typeof new String(); // object
typeof new Date(); // object
typeof /test/gi; // object
typeof function () {}; // function
typeof undefined; // undefined
typeof null; // object (설계적 결함)
typeof undeclared; // undefined (설계적 결함)
```

<br /><br />

---

<br /><br />

## Object.prototype.toString

Object.prototype.toString 메소드는 객체를 나타내는 문자열을 반환한다.

```js
Object.prototype.toString.call(""); // [object String]
Object.prototype.toString.call(new String()); // [object String]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(new Number()); // [object Number]
Object.prototype.toString.call(NaN); // [object Number]
Object.prototype.toString.call(Infinity); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call({}); // [object Object]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call(Math); // [object Math]
Object.prototype.toString.call(/test/i); // [object RegExp]
Object.prototype.toString.call(function () {}); // [object Function]
Object.prototype.toString.call(document); // [object HTMLDocument]
Object.prototype.toString.call(argument); // [object Arguments]
Object.prototype.toString.call(undeclared); // ReferenceError
```

```js
// 타입을 반환하는 함수
function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
}

// String.prototype.slice 메소드를 사용하여 Object.prototype.toString.call 메소드가 반환한 문자열에서 “[object”와 “]”를 제외하고 타입을 나타내는 문자열만을 추출하였다.

getType(""); // String
getType(1); // Number
getType(true); // Boolean
getType(undefined); // Undefined
getType(null); // Null
getType({}); // Object
getType([]); // Array
getType(/test/i); // RegExp
getType(Math); // Math
getType(new Date()); // Date
getType(function () {}); // Function
```

<br /><br />

---

<br /><br />

## instanceof

위 방법으로는 객체의 상속 관계까지 체크할 수는 없다.

타입 연산자(Type Operator)에는 앞서 살펴본 typeof 이외에 instanceof를 제공한다. instanceof 연산자는 피연산자인 객체가 우항에 명시한 타입의 인스턴스인지 여부를 알려준다. 이때 타입이란 constructor를 말하며 프로토타입 체인에 존재하는 모든 constructor를 검색하여 일치하는 constructor가 있다면 true를 반환한다.

```js
function Person() {}
const person = new Person();

console.log(person instanceof Person); // true
console.log(person instanceof Object); // true
```

## 유사 배열 객체

배열인지 체크하기 위해서는 Array.isArray 메소드를 사용한다.

```js
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false
console.log(Array.isArray("123")); // false
```

유사 배열 객체(array-like object)은 length 프로퍼티를 갖는 객체로 문자열, arguments, HTMLCollection, NodeList 등은 유사 배열이다. 유사 배열 객체는 length 프로퍼티가 있으므로 순회할 수 있으며 call, apply 함수를 사용하여 배열의 메소드를 사용할 수도 있다.

어떤 객체가 유사 배열인지 체크하려면 우선 length 프로퍼티를 갖는지 length 프로퍼티의 값이 정상적인 값인지 체크한다.

```js
console.log(undefined == null);
const isArrayLike = function (collection) {
    // 배열 인덱스: 32bit 정수(2의 32제곱 - 1)
    // 유사 배열 인덱스: 자바스크립트로 표현할 수 있는 양의 정수(2의 53제곱 - 1)
    const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    // 빈문자열은 유사배열이다. undefined == null => true
    const length = collection == null ? undefined : collection.length;
    return typeof length === "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// true
console.log(isArrayLike([]));
console.log(isArrayLike("abc"));
console.log(isArrayLike(""));
console.log(isArrayLike(document.querySelectorAll("li")));
console.log(isArrayLike(document.getElementsByName("li")));
console.log(isArrayLike({ length: 0 }));
(function () {
    console.log(isArrayLike(arguments));
})();

// false
console.log(isArrayLike(123));
console.log(isArrayLike(document.querySelector("li")));
console.log(isArrayLike({ foo: 1 }));
console.log(isArrayLike());
console.log(isArrayLike(null));
```
