# Prototype(프로토타입)

## 프로토타입 객체

Java, C++과 같은 클래스 기반 객체지향 프로그래밍 언어와 달리 자바스크립트는 프로토타입 기반 객체지향 프로그래밍 언어이다. 따라서 자바스크립트의 동작 원리를 이해하기 위해서는 프로토타입의 개념을 잘 이해하고 있어야 한다.

클래스 기반 객체지향 프로그래밍 언어는 객체 생성 이전에 클래스를 정의하고 이를 통해 객체(인스턴스)를 생성한다. 하지만 프로토타입 기반 객체지향 프로그래밍 언어는 클래스 없이(Class-less)도 (ECMAScript 6에서 클래스가 추가되었다) 객체를 생성할 수 있다.

자바스크립트의 모든 객체는 자신의 부모 역할을 담당하는 객체와 연결되어 있다. 그리고 이것은 마치 객체 지향의 상속 개념과 같이 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 한다. 이러한 부모 객체를 Prototype(프로토타입) 객체 또는 줄여서 Prototype(프로토타입)이라 한다.

Prototype 객체는 생성자 함수에 의해 생성된 각각의 객체에 공유 프로퍼티를 제공하기 위해 사용한다.

```js
var student = {
    name: "Lee",
    score: 90,
};

// student에는 hasOwnProperty 메소드가 없지만 아래 구문은 동작한다.
console.log(student.hasOwnProperty("name")); // true

console.dir(student);
```

ECMAScript spec에서는 자바스크립트의 모든 객체는 [[Prototype]]이라는 인터널 슬롯(internal slot)를 가진다. [[Prototype]]의 값은 null 또는 객체이며 상속을 구현하는데 사용된다. [[Prototype]] 객체의 데이터 프로퍼티는 get 액세스를 위해 상속되어 자식 객체의 프로퍼티처럼 사용할 수 있다. 하지만 set 액세스는 허용되지 않는다. 라고 되어있다.

[[Prototype]]의 값은 Prototype(프로토타입) 객체이며 **proto** accessor property로 접근할 수 있다. **proto** 프로퍼티에 접근하면 내부적으로 Object.getPrototypeOf가 호출되어 프로토타입 객체를 반환한다.

student 객체는 **proto** 프로퍼티로 자신의 부모 객체(프로토타입 객체)인 Object.prototype을 가리키고 있다.

객체를 생성할 때 프로토타입은 결정된다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다. 이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.

<br /><br />

---

<br /><br />

## [[Prototype]] vs prototype

모든 객체는 자신의 프로토타입 객체를 가리키는 [[Prototype]] 인터널 슬롯(internal slot) 을 갖으며 상속을 위해 사용된다.

함수도 객체이므로 [[Prototype]] 인터널 슬롯을 갖는다. 그런데 함수 객체는 일반 객체와는 달리 prototype 프로퍼티도 소유하게 된다.

```js
function Person(name) {
    this.name = name;
}

var foo = new Person("Lee");

console.dir(Person); // prototype 프로퍼티가 있다.
console.dir(foo); // prototype 프로퍼티가 없다.
```

-   [[Prototype]]

    함수를 포함한 모든 객체가 가지고 있는 인터널 슬롯이다.
    객체의 입장에서 자신의 부모 역할을 하는 프로토타입 객체를 가리키며 함수 객체의 경우 Function.prototype를 가리킨다.

-   prototype 프로퍼티

    함수 객체만 가지고 있는 프로퍼티이다.
    함수 객체가 생성자로 사용될 때 이 함수를 통해 생성될 객체의 부모 역할을 하는 객체(프로토타입 객체)를 가리킨다.

<br /><br />

---

<br /><br />

## constructor 프로퍼티

프로토타입 객체는 constructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 객체의 입장에서 자신을 생성한 객체를 가리킨다.

예를 들어 Person() 생성자 함수에 의해 생성된 객체를 foo라 하자. 이 foo 객체를 생성한 객체는 Person() 생성자 함수이다. 이때 foo 객체 입장에서 자신을 생성한 객체는 Person() 생성자 함수이며, foo 객체의 프로토타입 객체는 Person.prototype이다. 따라서 프로토타입 객체 Person.prototype의 constructor 프로퍼티는 Person() 생성자 함수를 가리킨다.

<br /><br />

---

<br /><br />

## Prototype chain

자바스크립트는 특정 객체의 프로퍼티나 메소드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면 [[Prototype]]이 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례대로 검색한다. 이것을 프로토타입 체인이라 한다.

-   객체 리터럴 방식으로 생성된 객체의 프로토타입 체인

-   생성자 함수로 생성된 객체의 프로토타입 체인

<br /><br />

---

<br /><br />

## 프로토타입 객체의 확장

프로토타입 객체도 객체이므로 일반 객체와 같이 프로퍼티를 추가/삭제할 수 있다. 그리고 이렇게 추가/삭제된 프로퍼티는 즉시 프로토타입 체인에 반영된다.

```js
function Person(name) {
    this.name = name;
}

var foo = new Person("Lee");

Person.prototype.sayHello = function () {
    console.log("Hi! my name is " + this.name);
};

foo.sayHello();
```

<br /><br />

---

<br /><br />

## 원시 타입(Primitive data type)의 확장

자바스크립트에서 원시 타입(숫자, 문자열, boolean, null, undefined)을 제외한 모든것은 객체이다. 그런데 아래 예제를 살펴보면 원시 타입인 문자열이 객체와 유사하게 동작한다.

```js
var str = "test";
console.log(typeof str); // string
console.log(str.constructor === String); // true
console.dir(str); // test

var strObj = new String("test");
console.log(typeof strObj); // object
console.log(strObj.constructor === String); // true
console.dir(strObj);
// {0: "t", 1: "e", 2: "s", 3: "t", length: 4, __proto__: String, [[PrimitiveValue]]: "test" }

console.log(str.toUpperCase()); // TEST
console.log(strObj.toUpperCase()); // TEST
```

원시 타입 문자열과 String() 생성자 함수로 생성한 문자열 객체의 타입은 분명이 다르다. 원시 타입은 객체가 아니므로 프로퍼티나 메소드를 가질수 없다. 하지만 원시 타입으로 프로퍼티나 메소드를 호출할 때 원시 타입과 연관된 객체로 일시적으로 변환되어 프로토타입 객체를 공유하게 된다.

원시 타입은 객체가 아니므로 프로퍼티나 메소드를 직접 추가할 수 없다.

<br /><br />

---

<br /><br />

## 프로토타입 객체의 변경

객체를 생성할 때 프로토타입은 결정된다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다. 이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.

이때 주의할 것은 프로토타입 객체를 변경하면

-   프로토타입 객체 변경 시점 이전에 생성된 객체
    기존 프로토타입 객체를 [[Prototype]]에 바인딩한다.
-   프로토타입 객체 변경 시점 이후에 생성된 객체
    변경된 프로토타입 객체를 [[Prototype]]에 바인딩한다.

<br /><br />

---

<br /><br />

## 프로토타입 체인 동작 조건

객체의 프로퍼티를 참조하는 경우, 해당 객체에 프로퍼티가 없는 경우, 프로토타입 체인이 동작한다.

객체의 프로퍼티에 값을 할당하는 경우, 프로토타입 체인이 동작하지 않는다. 이는 객체에 해당 프로퍼티가 있는 경우, 값을 재할당하고 해당 프로퍼티가 없는 경우는 해당 객체에 프로퍼티를 동적으로 추가하기 때문이다.
