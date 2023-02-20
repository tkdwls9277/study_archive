# CSS, SASS, SCSS 차이점, 사용방법

[참고링크](https://cocoon1787.tistory.com/843)
[sass 참고링크](https://sass-lang.com/guide)

## 1. 각각의 특징

### 1.1 CSS(Cascading style sheets) - 종속형 시트

-   프로젝트의 크기가 커지고 고도화될수록 유지보수 어려움
-   불필요한 선택자(selector), 연산 기능 한계, 구문(Statement)의 부재
-   SASS, SCSS는 이러한 이슈를 해결해줌

<br/>

---

<br/>

### 1.2 SASS(Syntactically Awesome Style Sheets) - 문법적으로 어썸한 스타일 시트

-   중첩으로 들여쓰기 사용하고 속성 구분 줄 바꿈을 사용

<br/>

---

<br/>

### 1.3 SCSS(Sassy CSS) - 문법적으로 멋진(Sassy) CSS

-   sass 3 버전이 나올 때 생김. 통상적으로 SASS보다 많이 사용
-   좀 더 넓은 범용성과 css의 호환성의 장점을 가짐
-   중괄호로 중첩을 표현하고 세미콜론으로 속성을 구분
-   css 문법과 완벽하게 호환이 됨
-   코드의 가속성과 재사용성을 높여주며 심플한 표기법으로 CSS 구조를 평준화 할 수 있음

<br/>

---

<br/>

## 2. 변수(Variable) 할당

```css
/*CSS*/
body {
    font: 100% Helvetica, sans-serif;
    color: #333;
}
```

```css
/* SCSS */
/* 자주 사용하는 색이나 폰트 등등을 변수로 지정하여 재사용 가능 */
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
    font: 100% $font-stack;
    color: $primary-color;
}
```

<br/>

---

<br/>

## 중첩(Nesting) 구문

```css
/* CSS */
nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
nav li {
    display: inline-block;
}
nav a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
}
```

```css
/* SCSS */
/* 중첩 기능을 통해 쉬운 구성과 높은 가독성 */
nav {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        display: inline-block;
    }

    a {
        display: block;
        padding: 6px 12px;
        text-decoration: none;
    }
}
```

<br/>

---

<br/>

## 모듈화(Modularity)

```css
/* CSS */
body {
    font: 100% Helvetica, sans-serif;
    color: #333;
}

.inverse {
    background-color: #333;
    color: white;
}
```

```css
/* _base.scss */
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
    font: 100% $font-stack;
    color: $primary-color;
}
```

```css
/* styles.scss */
/* @use를 사용하여 파일을 분할하고 묘듈화 가능 */
@use 'base';

.inverse {
    background-color: base.$primary-color;
    color: white;
}
```

<br/>

---

<br/>

## 믹스인(Mixns)

```css
/* CSS */
.info {
    background: DarkGray;
    box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
    color: #fff;
}

.alert {
    background: DarkRed;
    box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
    color: #fff;
}

.success {
    background: DarkGreen;
    box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
    color: #fff;
}
```

```css
/* SCSS */
/* 함수처럼 default parameter를 지정할 수 있고 parameter를 받아서 속성을 부여할 수 있음. (재사용성) */
@mixin theme($theme: DarkGray) {
    background: $theme;
    box-shadow: 0 0 1px rgba($theme, 0.25);
    color: #fff;
}

.info {
    @include theme;
}
.alert {
    @include theme($theme: DarkRed);
}
.success {
    @include theme($theme: DarkGreen);
}
```

<br/>

---

<br/>

## 확장&상속(Extend/Inheritance)

```css
/* CSS */
/* This CSS will print because %message-shared is extended. */
.message,
.success,
.error,
.warning {
    border: 1px solid #ccc;
    padding: 10px;
    color: #333;
}

.success {
    border-color: green;
}

.error {
    border-color: red;
}

.warning {
    border-color: yellow;
}
```

```css
/* SCSS */
/* This CSS will print because %message-shared is extended. */
%message-shared {
    border: 1px solid #ccc;
    padding: 10px;
    color: #333;
}

/* This CSS won't print because %equal-heights is never extended. */
%equal-heights {
    display: flex;
    flex-wrap: wrap;
}

/* extend 사용 시 css 속성 집합 상속 가능*/
.message {
    @extend %message-shared;
}

.success {
    @extend %message-shared;
    border-color: green;
}

.error {
    @extend %message-shared;
    border-color: red;
}

.warning {
    @extend %message-shared;
    border-color: yellow;
}
```

<br/>

---

<br/>

## 연산자(Operators)

```css
/* CSS */
.container {
    display: flex;
}

article[role="main"] {
    width: 62.5%;
}

aside[role="complementary"] {
    width: 31.25%;
    margin-left: auto;
}
```

```css
/* SCSS */
/* math.div(나누기)외에도 sin, cos, tan, random, max, min 등등 사용가능 */
@use "sass:math";

.container {
    display: flex;
}

article[role="main"] {
    width: math.div(600px, 960px) * 100%;
}

aside[role="complementary"] {
    width: math.div(300px, 960px) * 100%;
    margin-left: auto;
}
```

<br/>

---

<br/>

##
