# Number (Number 레퍼 객체)

Number 객체는 원시 타입 number를 다룰 때 유용한 프로퍼티와 메소드를 제공하는 레퍼(wrapper) 객체이다. 변수 또는 객체의 프로퍼티가 숫자를 값으로 가지고 있다면 Number 객체의 별도 생성없이 Number 객체의 프로퍼티와 메소드를 사용할 수 있다.

## Number Constructor

Number 객체는 Number() 생성자 함수를 통해 생성할 수 있다.

```js
var x = new Number(123);
var y = new Number("123");
var z = new Number("str");

console.log(x); // 123
console.log(y); // 123
console.log(z); // NaN (만일 인자가 숫자로 변환될 수 없다면 NaN을 반환한다.)
```

<br/><br/>

---

<br/><br/>

## Number Property

정적(static) 프로퍼티로 Number 객체를 생성할 필요없이 Number.propertyName의 형태로 사용한다.

- Number.EPSILON (ES6)
- Number.MAX_VALUE (ES1)
- Number.MIN_VALUE (ES1)
- Number.POSITIVE_INFINITY (ES1)
- Number.NEGATIVE_INFINITY (ES1)
- Number.NaN (ES1)

<br/><br/>

---

<br/><br/>

## Number Method

- Number.isFinite(testValue: number): boolean (ES6)
- Number.isInteger(testValue: number): boolean (ES6)
- Number.isNaN(testValue: number): boolean (ES6)
- Number.isSafeInteger(testValue: number): boolean (ES6)
- Number.prototype.toExponential(fractionDigits?: number): string (ES3)
- Number.prototype.toFixed(fractionDigits?: number): string (ES3)
- Number.prototype.toPrecision(precision?: number): string (ES3)
- Number.prototype.toString(radix?: number): string (ES1)
- Number.prototype.valueOf(): number (ES1)
