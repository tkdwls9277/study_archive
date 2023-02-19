# CSS, SASS, SCSS 차이점, 사용방법

[참고링크](https://cocoon1787.tistory.com/843)

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
