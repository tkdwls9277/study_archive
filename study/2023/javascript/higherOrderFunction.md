# Higher order function

- [참고 자료(poiemaweb)](https://poiemaweb.com/js-array-higher-order-function)

고차 함수(Higher order function)는 함수를 인자로 전달받거나 함수를 결과로 반환하는 함수를 말한다. 다시 말해, 고차 함수는 인자로 받은 함수를 필요한 시점에 호출하거나 클로저를 생성하여 반환한다. 자바스크립트의 함수는 일급 객체이므로 값처럼 인자로 전달할 수 있으며 반환할 수도 있다.

- 예시

```js
// 함수를 인자로 전달받고 함수를 반환하는 고차 함수
function makeCounter(predicate) {
  // 자유 변수. num의 상태는 유지되어야 한다.
  let num = 0;
  // 클로저. num의 상태를 유지한다.
  return function () {
    // predicate는 자유 변수 num의 상태를 변화시킨다.
    num = predicate(num);
    return num;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// makeCounter는 함수를 인수로 전달받는다. 그리고 클로저를 반환한다.
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// makeCounter는 함수를 인수로 전달받는다. 그리고 클로저를 반환한다.
const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

- Array.prototype.sort(compareFn?: (a: T, b: T) => number): this (ES1)
- Array.prototype.forEach(callback: (value: T, index: number, array: T[]) => void, thisArg?: any): void (ES5)
- Array.prototype.map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] (ES5)
- Array.prototype.filter(callback: (value: T, index: number, array: Array) => any, thisArg?: any): T[] (ES5)
- Array.prototype.reduce<U>(callback: (state: U, element: T, index: number, array: T[]) => U, firstState?: U): U (ES5)
- Array.prototype.some(callback: (value: T, index: number, array: Array) => boolean, thisArg?: any): boolean (ES5)
- Array.prototype.every(callback: (value: T, index: number, array: Array) => boolean, thisArg?: any): boolean (ES5)
- Array.prototype.find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined (ES6)
- Array.prototype.findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number (ES6)
