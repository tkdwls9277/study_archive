# Object(객체)

- [참고 자료(poiemaweb)](https://poiemaweb.com/js-object)

자바스크립트의 객체는 키(key)과 값(value)으로 구성된 프로퍼티(Property)들의 집합이다. 프로퍼티의 값으로 자바스크립트에서 사용할 수 있는 모든 값을 사용할 수 있다. 자바스크립트의 함수는 일급 객체이므로 값으로 취급할 수 있다. 따라서 프로퍼티 값으로 함수를 사용할 수도 있으며 프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드라 부른다.

이와 같이 객체는 데이터를 의미하는 프로퍼티(property)와 데이터를 참조하고 조작할 수 있는 동작(behavior)을 의미하는 메소드(method)로 구성된 집합이다. 객체는 데이터(프로퍼티)와 그 데이터에 관련되는 동작(메소드)을 모두 포함할 수 있기 때문에 데이터와 동작을 하나의 단위로 구조화할 수 있어 유용하다.

<br /><br />

- 프로퍼티

프로퍼티는 프로퍼티 키(이름)와 프로퍼티 값으로 구성된다. 프로퍼티는 프로퍼티 키로 유일하게 식별할 수 있다. 즉, 프로퍼티 키는 프로퍼티를 식별하기 위한 식별자(identifier)다. 프로퍼티 키의 명명 규칙과 프로퍼티 값으로 사용할 수 있는 값은 아래와 같다.

프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 symbol 값
프로퍼티 값 : 모든 값
프로퍼티 키에 문자열이나 symbol 값 이외의 값을 지정하면 암묵적으로 타입이 변환되어 문자열이 된다. 이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다. 배열과는 달리 객체는 프로퍼티를 열거할 때 순서를 보장하지 않는다.

<br /><br />

- 메소드

프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드라 부른다. 즉, 메소드는 객체에 제한되어 있는 함수를 의미한다.

<br /><br />

---

<br /><br />

## 객체 생성 방법

<br /><br />

### 객체 리터럴

```js
var emptyObject = {};

var person = {
  name: "Lee",
  gender: "male",
  sayHello: function () {
    console.log("Hi! My name is " + this.name);
  },
};
```

<br /><br />

### Object 생성자 함수

생성자(constructor) 함수란 new 키워드와 함께 객체를 생성하고 초기화하는 함수를 말한다. 생성자 함수를 통해 생성된 객체를 인스턴스(instance)라 한다. 자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Array, Date, RegExp 등의 빌트인 생성자 함수를 제공한다. 일반 함수와 생성자 함수를 구분하기 위해 생성자 함수의 이름은 파스칼 케이스(PascalCase)를 사용하는 것이 일반적이다.

객체가 소유하고 있지 않은 프로퍼티 키에 값을 할당하면 해당 객체에 프로퍼티를 추가하고 값을 할당한다. 이미 존재하는 프로퍼티 키에 새로운 값을 할당하면 프로퍼티 값은 할당한 값으로 변경된다.

```js
// 빈 객체의 생성
var person = new Object();

// 프로퍼티 추가
person.name = "Lee";
person.gender = "male";
person.sayHello = function () {
  console.log("Hi! My name is " + this.name);
};
```

객체 리터럴 방식으로 생성된 객체는 결국 빌트인(Built-in) 함수인 Object 생성자 함수로 객체를 생성하는 것을 단순화시킨 축약 표현(short-hand)

<br /><br />

### 생성자 함수

```js
// 생성자 함수
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
  this.sayHello = function () {
    console.log("Hi! My name is " + this.name);
  };
}

// 인스턴스의 생성
var person1 = new Person("Lee", "male");
var person2 = new Person("Kim", "female");
```

- 생성자 함수 이름은 일반적으로 대문자로 시작한다. 이것은 생성자 함수임을 인식하도록 도움을 준다.
- 프로퍼티 또는 메소드명 앞에 기술한 this는 생성자 함수가 생성할 인스턴스(instance)를 가리킨다.
- this에 연결(바인딩)되어 있는 프로퍼티와 메소드는 public(외부에서 참조 가능)하다.
- 생성자 함수 내에서 선언된 일반 변수는 private(외부에서 참조 불가능)하다. 즉, 생성자 함수 내부에서는 자유롭게 접근이 가능하나 외부에서 접근할 수 없다.

<br /><br />

---

<br /><br />

## 객체 프로퍼티 접근

<br /><br />

### 프로퍼티 키

프로퍼티 키는 문자열이므로 따옴표(‘’ 또는 ““)를 사용한다. 하지만 자바스크립트에서 사용 가능한 유효한 이름인 경우, 따옴표를 생략할 수 있다. 반대로 말하면 자바스크립트에서 사용 가능한 유효한 이름이 아닌 경우, 반드시 따옴표를 사용하여야 한다.

<br /><br />

### 프로퍼티 값 읽기

```js
var person = {
  'first-name': 'Ung-mo',
  'last-name': 'Lee',
  gender: 'male',
  1: 10
};

console.log(person);

console.log(person.first-name);    // NaN: undefined-undefined
console.log(person[first-name]);   // ReferenceError: first is not defined
console.log(person['first-name']); // 'Ung-mo'

console.log(person.gender);    // 'male'
console.log(person[gender]);   // ReferenceError: gender is not defined
console.log(person['gender']); // 'male'

console.log(person['1']); // 10
console.log(person[1]);   // 10 : person[1] -> person['1']
console.log(person.1);    // SyntaxError
```

<br /><br />

### 프로퍼티 값 갱신

```js
var person = {
  "first-name": "Ung-mo",
  "last-name": "Lee",
  gender: "male",
};

person["first-name"] = "Kim";
```

<br /><br />

### 프로퍼티 동적 생성

객체가 소유하고 있지 않은 프로퍼티 키에 값을 할당하면 하면 주어진 키와 값으로 프로퍼티를 생성하여 객체에 추가한다.

```js
var person = {
  "first-name": "Ung-mo",
  "last-name": "Lee",
  gender: "male",
};

person.age = 20;
```

<br /><br />

### 프로퍼티 삭제

```js
var person = {
  "first-name": "Ung-mo",
  "last-name": "Lee",
  gender: "male",
};

delete person.gender;
```

<br /><br />

### for-in 문

```js
var person = {
  "first-name": "Ung-mo",
  "last-name": "Lee",
  gender: "male",
};

// prop에 객체의 프로퍼티 이름이 반환된다. 단, 순서는 보장되지 않는다.
for (var prop in person) {
  console.log(prop + ": " + person[prop]);
}
```

<br /><br />

---

<br /><br />

## Pass-by-reference

object type을 객체 타입 또는 참조 타입이라 한다. 참조 타입이란 객체의 모든 연산이 실제값이 아닌 참조값으로 처리됨을 의미한다. 원시 타입은 값이 한번 정해지면 변경할 수 없지만(immutable), 객체는 프로퍼티를 변경, 추가, 삭제가 가능하므로 변경 가능(mutable)한 값이라 할 수 있다.

```js
// Pass-by-reference
var foo = {
  val: 10,
};

var bar = foo;
console.log(foo.val, bar.val); // 10 10
console.log(foo === bar); // true

bar.val = 20;
console.log(foo.val, bar.val); // 20 20
console.log(foo === bar); // true
```

참조하고 있는 객체의 val 값이 변경되면 변수 foo, bar 모두 동일한 객체를 참조하고 있으므로 두 변수 모두 변경된 객체의 프로퍼티 값을 참조하게 된다. 객체는 참조(Reference) 방식으로 전달된다. 결코 복사되지 않는다.

<br /><br />

---

<br /><br />

## Pass-by-value

원시 타입은 값(value)으로 전달된다. 즉, 값이 복사되어 전달된다.

```js
// Pass-by-value
var a = 1;
var b = a;

console.log(a, b); // 1  1
console.log(a === b); // true

a = 10;
console.log(a, b); // 1  10
console.log(a === b); // false
```

<br /><br />

---

<br /><br />

## 객체의 분류

![](images/object1.png)
