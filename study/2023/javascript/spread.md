# Spread

Spread 문법(Spread Syntax, ...)는 대상을 개별 요소로 분리한다. Spread 문법의 대상은 이터러블이어야 한다.

```js
// ...[1, 2, 3]는 [1, 2, 3]을 개별 요소로 분리한다(→ 1, 2, 3)
console.log(...[1, 2, 3]); // 1, 2, 3

// 문자열은 이터러블이다.
console.log(..."Hello"); // H e l l o

// Map과 Set은 이터러블이다.
console.log(
    ...new Map([
        ["a", "1"],
        ["b", "2"],
    ])
); // [ 'a', '1' ] [ 'b', '2' ]
console.log(...new Set([1, 2, 3])); // 1 2 3

// 이터러블이 아닌 일반 객체는 Spread 문법의 대상이 될 수 없다.
console.log(...{ a: 1, b: 2 });
// TypeError: Found non-callable @@iterator
```

-   함수의 인수로 사용하는 경우

    배열을 분해하여 배열의 각 요소를 파라미터에 전달하고 싶은 경우, Function.prototype.apply를 사용하는 것이 일반적이다.

    ES6의 Spread 문법(…)을 사용한 배열을 인수로 함수에 전달하면 배열의 요소를 분해하여 순차적으로 파라미터에 할당한다.

<br />

-   배열에서 사용하는 경우
    -   concat
    -   push
    -   splice
    -   copy

<br /><br />

---

<br /><br />

## Rest/Spread 프로퍼티

Spread 문법의 대상은 이터러블이어야 한다. Rest/Spread 프로퍼티는 일반 객체에 Spread 문법의 사용을 허용한다.

Rest/Spread 프로퍼티를 사용하면 객체를 손쉽게 병합 또는 변경할 수 있다. 이는 Object.assign을 대체할 수 있는 간편한 문법이다.

Object.assign 메소드를 사용해도 동일한 작업을 할 수 있다.
