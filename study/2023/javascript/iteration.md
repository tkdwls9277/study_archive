# Iteration

ES6에서 도입된 이터레이션 프로토콜(iteration protocol)은 데이터 컬렉션을 순회하기 위한 프로토콜(미리 약속된 규칙)이다. 이터레이션 프로토콜을 준수한 객체는 for…of 문으로 순회할 수 있고 Spread 문법의 피연산자가 될 수 있다.

이터레이션 프로토콜에는 이터러블 프로토콜(iterable protocol)과 이터레이터 프로토콜(iterator protocol)이 있다.

<br/><br/>

---

<br/><br/>

## 이터러블

이터러블 프로토콜을 준수한 객체를 이터러블이라 한다. 이터러블은 Symbol.iterator 메소드를 구현하거나 프로토타입 체인에 의해 상속한 객체를 말한다. Symbol.iterator 메소드는 이터레이터를 반환한다. 이터러블은 for…of 문에서 순회할 수 있으며 Spread 문법의 대상으로 사용할 수 있다.

배열은 Symbol.iterator 메소드를 소유한다. 따라서 배열은 이터러블 프로토콜을 준수한 이터러블이다.

일반 객체는 Symbol.iterator 메소드를 소유하지 않는다. 따라서 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.

일반 객체는 이터레이션 프로토콜을 준수(Symbol.iterator 메소드를 소유)하지 않기 때문에 이터러블이 아니다. 따라서 일반 객체는 for…of 문에서 순회할 수 없으며 Spread 문법의 대상으로 사용할 수도 없다. 하지만 일반 객체도 이터러블 프로토콜을 준수하도록 구현하면 이터러블이 된다.

<br/><br/>

---

<br/><br/>

## 이터레이터

이터레이터 프로토콜은 next 메소드를 소유하며 next 메소드를 호출하면 이터러블을 순회하며 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 것이다. 이 규약을 준수한 객체가 이터레이터이다.

이터러블 프로토콜을 준수한 이터러블은 Symbol.iterator 메소드를 소유한다. 이 메소드를 호출하면 이터레이터를 반환한다. 이터레이터 프로토콜을 준수한 이터레이터는 next 메소드를 갖는다.

이터레이터의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트(iterator result) 객체를 반환한다.

```js
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메소드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// 이터레이터 프로토콜을 준수한 이터레이터는 next 메소드를 갖는다.
console.log("next" in iterator); // true

// 이터레이터의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.
let iteratorResult = iterator.next();
console.log(iteratorResult); // {value: 1, done: false}
```

이터레이터의 next 메소드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할한다. next 메소드를 호출하면 이터러블을 순차적으로 한 단계씩 순회하며 이터레이터 리절트 객체를 반환한다.

<br/><br/>

---

<br/><br/>

## 빌트인 이터러블

```js
//Array, String, Map, Set, TypedArray(Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), DOM data structure(NodeList, HTMLCollection), Arguments

// 배열은 이터러블이다.
const array = [1, 2, 3];

// 이터러블은 Symbol.iterator 메소드를 소유한다.
// Symbol.iterator 메소드는 이터레이터를 반환한다.
let iter = array[Symbol.iterator]();

// 이터레이터는 next 메소드를 소유한다.
// next 메소드는 이터레이터 리절트 객체를 반환한다.
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: undefined, done: true}

// 이터러블은 for...of 문으로 순회 가능하다.
for (const item of array) {
    console.log(item);
}

// 문자열은 이터러블이다.
const string = "hi";

// 이터러블은 Symbol.iterator 메소드를 소유한다.
// Symbol.iterator 메소드는 이터레이터를 반환한다.
iter = string[Symbol.iterator]();

// 이터레이터는 next 메소드를 소유한다.
// next 메소드는 이터레이터 리절트 객체를 반환한다.
console.log(iter.next()); // {value: "h", done: false}
console.log(iter.next()); // {value: "i", done: false}
console.log(iter.next()); // {value: undefined, done: true}

// 이터러블은 for...of 문으로 순회 가능하다.
for (const letter of string) {
    console.log(letter);
}

// arguments 객체는 이터러블이다.
(function () {
    // 이터러블은 Symbol.iterator 메소드를 소유한다.
    // Symbol.iterator 메소드는 이터레이터를 반환한다.
    iter = arguments[Symbol.iterator]();

    // 이터레이터는 next 메소드를 소유한다.
    // next 메소드는 이터레이터 리절트 객체를 반환한다.
    console.log(iter.next()); // {value: 1, done: false}
    console.log(iter.next()); // {value: 2, done: false}
    console.log(iter.next()); // {value: undefined, done: true}

    // 이터러블은 for...of 문으로 순회 가능하다.
    for (const arg of arguments) {
        console.log(arg);
    }
})(1, 2);
```
