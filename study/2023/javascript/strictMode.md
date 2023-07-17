# Strict mode

-   [참고 자료(poiemaweb)](https://poiemaweb.com/js-strict-mode)

strict mode는 자바스크립트 언어의 문법을 보다 엄격히 적용하여 기존에는 무시되던 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

ESLint와 같은 린트 도구를 사용하여도 strict mode와 유사한 효과를 얻을 수 있다. 린트 도구는 정적 분석(static analysis) 기능을 통해 소스 코드를 실행하기 전에 소스 코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 이유를 리포팅해주는 유용한 도구이다.

**IE 9 이하는 지원하지 않음**

<br /><br />

---

<br /><br />

## strict mode의 적용

strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 'use strict';를 추가한다.

-   전역의 선두에 추가하면 스크립트 전체에 strict mode가 적용된다.

-   함수 몸체의 선두에 추가하면 해당 함수와 중첩된 내부 함수에 strict mode가 적용된다.

코드의 선두에 strict mode를 위치시키지 않으면 제대로 동작하지 않는다.

-   **전역에 strict mode를 적용하는 것은 피하자.**

하지만 strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다. 특히 외부 서드 파티 라이브러리를 사용하는 경우, 라이브러리가 non-strict mode일 경우도 있기 때문에 전역에 strict mode를 적용하는 것은 바람직하지 않다. 이러한 경우, 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.

<br />

-   **함수 단위로 strict mode를 적용하는 것도 피하자.**

어떤 함수는 strict mode를 적용하고 어떤 함수는 strict mode를 적용하지 않는 것은 바람직하지 않으며 모든 함수에 일일이 strict mode를 적용하는 것은 번거로운 일이다. 그리고 strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다.

<br /><br />

---

<br /><br />

## strict mode가 발생시키는 에러

-   암묵적 전역 변수
-   변수, 함수, 매개변수의 삭제
-   매개변수 이름의 중복
-   with 문의 사용
-   일반 함수의 this
