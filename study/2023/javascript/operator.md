# Operator

- [참고 자료(poiemaweb)](https://poiemaweb.com/js-operator)

연산자(Operator)는 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입 연산 등을 수행해 하나의 값을 만든다. 이때 연산의 대상을 피연산자(Operand)라 한다. 피연산자도 평가되어 하나의 값이 되므로 표현식이고 피연산자를 연산자와 결합한 연산자 표현식도 물론 표현식이다.

```js
// 이항 산술 연산자
5 + 2; // 7
5 - 2; // 3
5 * 2; // 10
5 / 2; // 2.5
5 % 2; // 1

// -------------------------------

// 단항 산술 연산자
var x = 5,
  result;

// 선대입 후증가 (Postfix increment operator)
result = x++;
console.log(result, x); // 5 6

// 선증가 후대입 (Prefix increment operator)
result = ++x;
console.log(result, x); // 7 7

// 선대입 후감소 (Postfix decrement operator)
result = x--;
console.log(result, x); // 7 6

// 선감소 후대입 (Prefix decrement operator)
result = --x;
console.log(result, x); // 5 5

// -------------------------------

// 문자열 연결 연산자
"My name is " + "Lee"; // "My name is Lee"

// -------------------------------

// 할당 연산자
var x;

x = 10; // 10
x += 5; // 15
x -= 5; // 10
x *= 5; // 50
x /= 5; // 10
x %= 5; // 0

var str = "My name is ";
str += "Lee"; // My name is Lee

// -------------------------------

// 비교 연산자
// 동등 비교
5 == 5; // true
// 타입은 다르지만 암묵적 타입 변환을 통해 타입을 일치시키면 같은 값을 같는다.
5 == "5"; //true
5 == 8; // false

// -------------------------------

// 대소 관계 비교
5 > 0; // true
5 > 5; // false
5 > 8; // false

5 < 0; // false
5 < 5; // false
5 < 8; // true

5 >= 0; // true
5 >= 5; // true
5 >= 8; // false

5 <= 0; // false
5 <= 5; // true
5 <= 8; // true

// -------------------------------

// 삼항 조건 연산자
// x가 짝수이면 '짝수'를 홀수이면 '홀수'를 반환한다.
// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
var result = x % 2 ? "홀수" : "짝수";

// -------------------------------

// 논리 연산자
// 논리합(||) 연산자
true || true; // true
true || false; // true
false || true; // true
false || false; // false

// 논리곱(&&) 연산자
true && true; // true
true && false; // false
false && true; // false
false && false; // false

// 논리 부정(!) 연산자
!true; // false
!false; // true

// -------------------------------

//쉼표 연산자
var x, y, z;
(x = 1), (y = 2), (z = 3); // 3

// -------------------------------

// 그룹 연산자
10 * 2 + 3; // 23
10 * (2 + 3); // 50

// -------------------------------

// 타입 연산자
typeof ""; // "string"
typeof 1; // "number"
typeof NaN; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof null; // "object"
typeof []; // "object"
typeof {}; // "object"
typeof new Date(); // "object"
typeof /test/gi; // "object"
typeof function () {}; // "function"
```
