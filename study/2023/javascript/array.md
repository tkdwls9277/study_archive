# Array(배열)

- [참고 자료(poiemaweb)](https://poiemaweb.com/js-array)

배열(array)은 1개의 변수에 여러 개의 값을 순차적으로 저장할 때 사용한다. 자바스크립트의 배열은 객체이며 유용한 내장 메소드를 포함하고 있다.

배열은 Array 생성자로 생성된 Array 타입의 객체이며 프로토타입 객체는 Array.prototype이다.

0개 이상의 값을 쉼표로 구분하여 대괄호([])로 묶는다. 첫번째 값은 인덱스 ‘0’으로 읽을 수 있다. 존재하지 않는 요소에 접근하면 undefined를 반환한다.

배열 리터럴은 객체 리터럴과 달리 프로퍼티명이 없고 각 요소의 값만이 존재한다. 객체는 프로퍼티 값에 접근하기 위해 대괄호 표기법 또는 마침표 표기법을 사용하며 프로퍼티명을 키로 사용한다. 배열은 요소에 접근하기 위해 대괄호 표기법만을 사용하며 대괄호 내에 접근하고자 하는 요소의 인덱스를 넣어준다. 인덱스는 0부터 시작한다.

두 객체의 근본적 차이는 배열 리터럴 arr의 프로토타입 객체는 Array.prototype이지만 객체 리터럴 obj의 프로토타입 객체는 Object.prototype이라는 것이다.

## 배열 요소의 추가와 삭제

- 배열 요소의 추가

  객체가 동적으로 프로퍼티를 추가할 수 있는 것처럼 배열도 동적으로 요소를 추가할 수 있다. 이때 순서에 맞게 값을 할당할 필요는 없고 인덱스를 사용하여 필요한 위치에 값을 할당한다. 배열의 길이(length)는 마지막 인덱스를 기준으로 산정된다.

  값이 할당되지 않은 인덱스 위치의 요소는 생성되지 않는다는 것에 주의하자. 단, 존재하지 않는 요소를 참조하면 undefined가 반환된다.

```js
arr[1] = 1;
arr[3] = 3;
```

- 배열 요소의 삭제

  배열은 객체이기 때문에 배열의 요소를 삭제하기 위해 delete 연산자를 사용할 수 있다. 이때 length에는 변함이 없다. 해당 요소를 완전히 삭제하여 length에도 반영되게 하기 위해서는 Array.prototype.splice 메소드를 사용한다.

```js
// 요소의 값만 삭제된다
delete arr[2]; // (4) ["zero", "one", empty, "three"]

// 요소 값만이 아니라 요소를 완전히 삭제한다
// splice(시작 인덱스, 삭제할 요소수)
arr.splice(2, 1); // (3) ["zero", "one", "three"]
```

- 배열의 순회

      객체의 프로퍼티를 순회할 때 for…in 문을 사용한다. 배열 역시 객체이므로 for…in 문을 사용할 수 있다. 그러나 배열은 객체이기 때문에 프로퍼티를 가질 수 있다. for…in 문을 사용하면 배열 요소뿐만 아니라 불필요한 프로퍼티까지 출력될 수 있고 요소들의 순서를 보장하지 않으므로 배열을 순회하는데 적합하지 않다.

      따라서 배열의 순회에는 forEach 메소드, for 문, for…of 문을 사용하는 것이 좋다.

```js
for (const key in arr) {
  console.log("key: " + key, "value: " + arr[key]);
}

arr.forEach((item, index) => console.log(index, item));

for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
}

for (const item of arr) {
  console.log(item);
}
```

<br/><br/>

---

<br/><br/>

## Array Property

- Array.length

<br/><br/>

---

<br/><br/>

## Array Method

- Array.isArray(arg: any): boolean (ES5)
- Array.from (ES6)
- Array.of (ES6)
- Array.prototype.indexOf(searchElement: T, fromIndex?: number): number (ES5)
- Array.prototype.concat(`…items: Array<T[] | T>`): T[] (ES3)
- Array.prototype.join(`separator?: string`): string (ES1)
- Array.prototype.push(`…items: T[]`): number (ES3)
- Array.prototype.pop(): T | undefined (ES3)
- Array.prototype.reverse(): this (ES1)
- Array.prototype.shift(): T | undefined (ES3)
- Array.prototype.slice(start=0, end=this.length): T[] (ES3)
- Array.prototype.splice(start: number, deleteCount=this.length-start, …items: T[]): T[] (ES3)
