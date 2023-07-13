# Scope

-   [참고 자료(poiemaweb)](https://poiemaweb.com/js-scope)

실행중인 함수가 코드의 어디까지를 참조할수 있는가하는 범위

![](images/scope1.png)

-   한 페이지내에서 다수의 JS파일을 로드하여 사용하는 특성상, 모두가 공유하는 global Scope를 이용하는 것은 위험소지가 큼.
-   javaScript는 runtime 도중에 namespace 오버라이딩이 가능하므로, global Scope는 오염시키지 않도록 한다.

![](images/scope2.png)

-   전역 스코프 (Global scope)

    코드 어디에서든지 참조할 수 있다.

-   지역 스코프 (Local scope or Function-level scope)

    함수 코드 블록이 만든 스코프로 함수 자신과 하위 함수에서만 참조할 수 있다.

<br /><br />

---

<br /><br />

### 전역 스코프(Global scope)

전역에 변수를 선언하면 이 변수는 어디서든지 참조할 수 있는 전역 스코프를 갖는 전역 변수가 된다. var 키워드로 선언한 전역 변수는 전역 객체(Global Object) window의 프로퍼티이다.

변수 global는 함수 영역 밖의 전역에서 선언되었다. 자바스크립트는 타 언어와는 달리 특별한 시작점(Entry point)이 없어서 위 코드와 같이 전역에 변수나 함수를 선언하기 쉽다.

C언어의 경우 main 함수가 시작점이 되기 때문에 대부분은 코드는 main 함수 내에 포함된다. C언어의 경우 전역 변수를 선언하기 위해서는 의도적으로 main 함수 밖에 변수를 선언하여야 한다.

<br /><br />

### 비 블록 레벨 스코프(Non block-level scope)

변수 x는 코드 블록 내에서 선언되었다. 하지만 자바스크립트는 블록 레벨 스코프를 사용하지 않으므로 함수 밖에서 선언된 변수는 코드 블록 내에서 선언되었다할지라도 모두 전역 스코프를 갖게된다.

<br /><br />

### 함수 레벨 스코프(Function-level scope)

자바스크립트는 함수 레벨 스코프를 사용한다. 즉, 함수 내에서 선언된 매개변수와 변수는 함수 외부에서는 유효하지 않다.

<br /><br />

### 렉시컬 스코프

렉시컬 스코프는 함수를 어디서 호출하는지가 아니라 어디에 선언하였는지에 따라 결정된다. 자바스크립트는 렉시컬 스코프를 따르므로 함수를 선언한 시점에 상위 스코프가 결정된다. 함수를 어디에서 호출하였는지는 스코프 결정에 아무런 의미를 주지 않는다.

<br /><br />

### 암묵적 전역

```js
var x = 10; // 전역 변수

function foo() {
    // 선언하지 않은 식별자
    y = 20;
    console.log(x + y);
}

foo(); // 30
```

foo 함수가 호출되면 자바스크립트 엔진은 변수 y에 값을 할당하기 위해 먼저 스코프 체인을 통해 선언된 변수인지 확인한다. 이때 foo 함수의 스코프와 전역 스코프 어디에서도 변수 y의 선언을 찾을 수 없으므로 참조 에러가 발생해야 하지만 자바스크립트 엔진은 y = 20을 window.y = 20으로 해석하여 프로퍼티를 동적 생성한다. 결국 y는 전역 객체의 프로퍼티가 되어 마치 전역 변수처럼 동작한다. 이러한 현상을 암묵적 전역(implicit global)이라 한다.

<br /><br />

### 최소한의 전역변수 사용

전역변수 사용을 최소화하는 방법 중 하나는 애플리케이션에서 전역변수 사용을 위해 다음과 같이 전역변수 객체 하나를 만들어 사용하는 것이다. (더글라스 크락포드의 제안)

<br /><br />

### 즉시실행함수를 이용한 전역변수 사용 억제

전역변수 사용을 억제하기 위해, 즉시 실행 함수(IIFE, Immediately-Invoked Function Expression)를 사용할 수 있다. 이 방법을 사용하면 전역변수를 만들지 않으므로 라이브러리 등에 자주 사용된다. 즉시 실행 함수는 즉시 실행되고 그 후 전역에서 바로 사라진다.

<br /><br />

---

<br /><br />

## Function Scope

변수값을 찾는 순서: Function 내부 > arguments > 펑션 외부

![](images/scope3.png)

-   scope의 최소단위가 function이기 때문에, {} 블록 밖에 있는 변수도 참조 가능.

![](images/scope4.png)

<br /><br />

---

<br /><br />

## Hoisting

-   Function의 실행순서

1. 해당 function의 scope내에서 선언된 변수를 모두 읽어들여 초기화 한다
2. 선언된 function 들을 읽어들인다
3. function paremeter에 변수값을 배당한다
4. function 내부를 차례대로 실행한다

-   같은 이름의 변수가 function scope내에서 새로 선언될 경우, 인터프리터 도달전에 초기화 되어버리므로 동일한 명칭의 변수를 참조할 수 없게된다.

![](images/scope5.png)

-   변수 선언 > 코드 실행 사이에 function parameter로 들어온 변수에 값을 할당하기 때문에, parameter와 동일한 이름의 변수를 선언해도 코드를 읽으면서 값 할당이 이루어지기 전 까지는 parameter값이 유지된다.

![](images/scope6.png)

-   함수 선언(Function Declaration) vs 함수 표현(Function Expression)
-   함수선언은 변수를 읽어온 다음에 값도 배정되기 때문에 같은 스코프 내에서 선언된것은 인터프리터가 읽기전에 호출할 수 있다.

![](images/scope7.png)

함수표현은 변수와 같이 취급되므로 선언부가 인터프리터에 의해 해석되고 난 후에 호출가능.

![](images/scope8.png)

<br /><br />

---

<br /><br />

## Closure

-   JavaScript는 실행 될 때가 아니라 선언 될 때의 Scope를 유지하는 특성이 있음.
-   이미 선언한 Function을 외부에서 호출해도, function은 선언 당시 참조했던 Scope의 변수를 읽어오게 된다.

![](images/scope9.png)

-   위와 같은 경우 외부에서는 접근할 수 없으나 이미 선언된 펑션에서는 접근할 수 있는 스코프가 생성.
-   Closure 내부 함수는 GC대상이 되지 않으므로 memory leak 가능성이 있음.
