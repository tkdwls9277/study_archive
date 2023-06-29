# Control Flow(제어문)

- [참고 자료(poiemaweb)](https://poiemaweb.com/js-control-flow)

제어문(Control flow statement)은 주어진 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다.

일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행된다. 제어문은 코드의 실행 순서를 인위적으로 제어할 수 있다

<br /><br />

---

<br /><br />

## 블록문

```js
// 블록문
{
  var foo = 10;
  console.log(foo);
}

// 제어문
var x = 0;
while (x < 10) {
  x++;
}
console.log(x); // 10

// 함수 선언문
function sum(x, y) {
  return x + y;
}
console.log(sum(1, 2)); // 3
```

<br /><br />

---

<br /><br />

## 조건문

<br /><br />

### if..else 문

```js
if (조건식1) {
  // 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2) {
  // 조건식2이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}

if (num > 0) kind = "양수";
else if (num < 0) kind = "음수";
else kind = "영";

// 삼항연산자
// 0은 false로 취급된다.
var result = x % 2 ? "홀수" : "짝수";
console.log(result); // 짝수
```

<br /><br />

### switch 문

```js
switch (표현식) {
  case 표현식1:
    // switch 문의 표현식과 표현식1이 일치하면 실행될 문;
    break;
  case 표현식2:
    // switch 문의 표현식과 표현식2가 일치하면 실행될 문;
    break;
  default:
  // switch 문의 표현식과 일치하는 표현식을 갖는 case 문이 없을 때 실행될 문;
}
```

<br /><br />

---

<br /><br />

## 반복문

<br /><br />

### for 문

```js
// for (초기화식; 조건식; 증감식) {
//   조건식이 참인 경우 반복 실행될 문;
// }

for (var i = 0; i < 2; i++) {
  console.log(i);
}
```

- for문의 실행순서
  ![](images\controlFlow1.png)

<br /><br />

### while 문

```js
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
while (count < 3) {
  console.log(count);
  count++;
} // 0 1 2
```

<br /><br />

---

<br /><br />

## break 문

break 문은 코드 블록을 탈출한다. 레이블 문, 반복문(for, for…in, for…of, while, do…while) 또는 switch 문의 코드 블록을 탈출한다.

<br /><br />

---

<br /><br />

## continue 문

continue 문은 반복문(for, for…in, for…of, while, do…while)의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 이동한다. break 문처럼 반복문을 탈출하지는 않는다.
