# Module

-   [참고 자료(poiemaweb)](https://poiemaweb.com/es6-module)

모듈이란 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 말한다. 모듈은 세부 사항을 캡슐화하고 공개가 필요한 API만을 외부에 노출한다.

일반적으로 모듈은 파일 단위로 분리되어 있으며 애플리케이션은 필요에 따라 명시적으로 모듈을 로드하여 재사용한다. 즉, 모듈은 애플리케이션에 분리되어 개별적으로 존재하다가 애플리케이션의 로드에 의해 비로소 애플리케이션의 일원이 된다. 모듈은 기능별로 분리되어 작성되므로 코드의 단위를 명확히 분리하여 애플리케이션을 구성할 수 있으며 재사용성이 좋아서 개발 효율성과 유지보수성을 높일 수 있다.

자바스크립트는 웹페이지의 보조적인 기능을 수행하기 위해 한정적인 용도로 만들어진 태생적 한계로 다른 언어에 비해 부족한(나쁜) 부분이 있는 것이 사실이다. 그 대표적인 것이 모듈 기능이 없는 것이다.

자바스크립트를 클라이언트 사이드에 국한하지 않고 범용적으로 사용하고자 하는 움직임이 생기면서 모듈 기능은 반드시 해결해야 하는 핵심 과제가 되었다. 이런 상황에서 제안된 것이 CommonJS와 AMD(Asynchronous Module Definition)이다.

결국, 자바스크립트의 모듈화는 크게 CommonJS와 AMD 진영으로 나뉘게 되었고 브라우저에서 모듈을 사용하기 위해서는 CommonJS 또는 AMD를 구현한 모듈 로더 라이브러리를 사용해야 하는 상황이 되었다.

서버 사이드 자바스크립트 런타임 환경인 Node.js는 모듈 시스템의 사실상 표준(de facto standard)인 CommonJS를 채택하였고 독자적인 진화를 거쳐 현재는 CommonJS 사양과 100% 동일하지는 않지만 기본적으로 CommonJS 방식을 따르고 있다. 즉, Node.js에서는 표준은 아니지만 모듈이 지원된다. 따라서 Node.js 환경에서는 모듈 별로 독립적인 스코프, 즉 모듈 스코프를 갖는다.

```js
<script type="module" src="lib.mjs"></script>
<script type="module" src="app.mjs"></script>
```

<br/><br/>

---

<br/><br/>

## 모듈 스코프

ES6 모듈 기능을 사용하지 않으면 분리된 자바스크립트 파일에 독자적인 스코프를 갖지 않고 하나의 전역을 공유한다.

HTML에서 2개의 자바스크립트 파일을 로드하면 로드된 자바스크립트는 하나의 전역을 공유한다. 위 예제에서 로드된 2개의 자바스크립트 파일은 하나의 전역 객체를 공유하며 하나의 전역 스코프를 갖는다.

ES6 모듈은 파일 자체의 스코프를 제공한다. 즉, ES6 모듈은 독자적인 모듈 스코프를 갖는다. 따라서, 모듈 내에서 var 키워드로 선언한 변수는 더 이상 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.

<br/><br/>

---

<br/><br/>

## export 키워드

모듈은 독자적인 모듈 스코프를 갖기 때문에 모듈 안에 선언한 모든 식별자는 기본적으로 해당 모듈 내부에서만 참조할 수 있다. 만약 모듈 안에 선언한 식별자를 외부에 공개하여 다른 모듈들이 참조할 수 있게 하고 싶다면 export 키워드를 사용한다. 선언된 변수, 함수, 클래스 모두 export할 수 있다.

모듈을 공개하려면 선언문 앞에 export 키워드를 사용한다. 여러 개를 export할 수 있는데 이때 각각의 export는 이름으로 구별할 수 있다.

```js
// 변수의 공개
export const pi = Math.PI;

// 함수의 공개
export function square(x) {
    return x * x;
}

// 클래스의 공개
export class Person {
    constructor(name) {
        this.name = name;
    }
}

// 변수, 함수 클래스를 하나의 객체로 구성하여 공개
export { pi, square, Person };
```

<br/><br/>

---

<br/><br/>

## import 키워드

모듈에서 공개(export)한 대상을 로드하려면 import 키워드를 사용한다.

모듈이 export한 식별자로 import하며 ES6 모듈의 파일 확장자를 생략할 수 없다.

```js
// app.mjs
// 같은 폴더 내의 lib.mjs 모듈을 로드.
// lib.mjs 모듈이 export한 식별자로 import한다.
// ES6 모듈의 파일 확장자를 생략할 수 없다.
import { pi, square, Person } from "./lib.mjs";
```
