# RegExp?

정규표현식(Regular Expression)은 문자열에서 특정 내용을 찾거나 대체 또는 발췌하는데 사용한다.

반복문과 조건문을 사용한 복잡한 코드도 정규표현식을 이용하면 매우 간단하게 표현할 수 있다. 하지만 정규표현식은 주석이나 공백을 허용하지 않고 여러가지 기호를 혼합하여 사용하기 때문에 가독성이 좋지 않다는 문제가 있다.

![](images/regExp1.png)

<br /><br />

---

<br /><br />

## js속의 정규식

### RegExp Constructor

자바스크립트은 정규표현식을 위해 RegExp 객체를 지원한다. RegExp 객체를 생성하기 위해서는 리터럴 방식과 RegExp 생성자 함수를 사용할 수 있다. 일반적인 방법은 리터럴 방식이다.

```js
// 정규식 리터럴
/ab+c/i;

new RegExp("ab+c", "i");

new RegExp(/ab+c/, "i");

new RegExp(/ab+c/i); // ES6
```

## 정규식을 사용한 js 메소드

| 메소드                   | 설명                                                                    |
| ------------------------ | ----------------------------------------------------------------------- |
| RegExp.prototype.exec    | 일치하는 문자열을 배열형태로 반환한다.                                  |
| RegExp.prototype.test    | 일치하는 문자열 존재여부를 boolean 으로 반환한다.                       |
| String.prototype.match   | 문자열에 match 되는 문자열을 반환한다.                                  |
| String.prototype.replace | 문자열에 match 되는 값을 주어진 값으로 변경한 새로운 문자열을 반환한다. |
| String.prototype.search  | 문자열에 match 되는 첫번째 index 를 반환한다.                           |
| String.prototype.split   | 문자열을 정규식을 통해서 분할한다.                                      |
