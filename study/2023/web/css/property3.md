# Property3 - font, text

## font-size

텍스트의 크기를 정의한다.

```css
.font-size-40 {
    font-size: 40px;
}
.font-size-2x {
    font-size: 2em;
}
.font-size-150ps {
    font-size: 150%;
}
.font-size-large {
    font-size: large;
}
```

<br /><br />

---

<br /><br />

## font-family

폰트를 지정한다. 컴퓨터에 해당 폰트가 설치되어 있지 않으면 적용되지 않는다.

폰트는 여러 개를 동시에 지정이 가능하다. 첫번째 지정한 폰트가 클라이언트 컴퓨터에 설치되어 있지 않은 경우, 다음에 지정된 폰트를 적용한다. 따라서 마지막에 지정하는 폰트는 대부분의 OS에 기본적으로 설치되어 있는 generic-family 폰트(Serif, Sans-serif, Mono space)를 지정하는 것이 일반적이다.

```css
.serif {
    font-family: "Times New Roman", Times, serif;
}

.sans-serif {
    font-family: Arial, Helvetica, sans-serif;
}

.monospace {
    font-family: "Courier New", Courier, monospace;
}
```

<br /><br />

---

<br /><br />

## font-style / font-weight

font-style 프로퍼티는 이탤릭체의 지정, font-weight 프로퍼티는 폰트 굵기 지정에 사용된다.

```css
p {
    font-size: 2em;
}

/*
      font-style
      normal / italic / oblique
    */
.italic {
    font-style: italic;
}

/*
      font-weight
      100 ~ 900 or normal / bold / lighter / bolder
    */
.light {
    font-weight: lighter;
}
.thick {
    font-weight: bold;
}
.thicker {
    font-weight: 900;
}
```

<br /><br />

---

<br /><br />

## font Shorthand

```css
/* size | family */
font: 2em "Open Sans", serif;

/* style | size | family */
font: italic 2em "Open Sans", sans-serif;

/* style | variant | weight | size/line-height | family */
font: italic small-caps bolder 16px/1.2 monospace;

/* style | variant | weight | size/line-height | family */
/* font-variant: small-caps; 소문자를 대문자로 만든다. 단 크기는 일반 대문자에 비해 더 작다.*/
font: italic small-caps bolder 16px/3 cursive;
```

<br /><br />

---

<br /><br />

## line-height

텍스트의 높이를 지정한다. 텍스트 수직 정렬에도 응용되어 사용된다.

```css
.small {
    line-height: 70%; /* 16px * 70% */
}
.big {
    line-height: 1.2; /* 16px * 1.2 */
}
.lh-3x {
    line-height: 3; /* 16px * 3 */
}
```

다음은 수직 중앙 정렬 예제이다. a 요소의 line-height 값과 a 요소를 감싸는 div 요소의 height 값을 일치시킨다.

```css
 <style>
    .button {
      width: 150px;
      height: 70px;
      background-color: #FF6A00;
      border-radius: 30px;
      box-shadow: 5px 5px 5px #A9A9A9;
    }
    .button > a {
      display: block;
      font: italic bold 2em/70px Arial, Helvetica, sans-serif;
      text-decoration: none;
      text-align: center;
    }
  </style>
```

<br /><br />

---

<br /><br />

## letter-spacing

글자 사이의 간격을 지정한다.

```css
<style>
    .loose {
      letter-spacing: 2px;
    }
    .tight {
      letter-spacing: -1px;
    }
  </style>
```

<br /><br />

---

<br /><br />

## text-align

텍스트의 수평 정렬을 정의한다.

```css
  <style>
    h1 { text-align: center; }
    h3 { text-align: right; }
    p.left  { text-align: left; }
    p.justify  { text-align: justify; }
    a  { text-align: center; }
  </style>
```

<br /><br />

---

<br /><br />

## text-decoration

링크 underline을 제거할 수 있다. 또는 텍스트에 underline, overline, line-through를 추가할 수도 있다.

```css
  <style>
    a { text-decoration: none; }

    p:nth-of-type(1) { text-decoration: overline; }
    p:nth-of-type(2) { text-decoration: line-through; }
    p:nth-of-type(3) { text-decoration: underline; }
  </style>
```

<br /><br />

---

<br /><br />

## white-space

white space는 공백(space), 들여쓰기(tab), 줄바꿈(line break)을 의미한다. html은 기본적으로 연속된 공백(space), 들여쓰기(tab)는 1번만 실행되며 줄바꿈(line break)은 무시된다. 또한 텍스트는 부모의 가로 영역을 벗어나지 않고 자동 줄바꿈(wrap)된다. white-space 프로퍼티는 이러한 기본 동작을 제어하기 위한 프로퍼티이다.

| 프로퍼티값 | line break | space/tab   | wrapping(자동줄바꿈) |
| ---------- | ---------- | ----------- | -------------------- |
| normal     | 무시       | 1번만 반영  | O                    |
| nowrap     | 무시       | 1번만 반영  | X                    |
| pre        | 반영       | 그대로 반영 | X                    |
| pre-wrap   | 반영       | 그대로 반영 | O                    |
| pre-line   | 반영       | 1번만 반영  | O                    |

```css
  <style>
    div {
      width: 150px;
      height: 150px;
      padding: 10px;
      margin: 40px;
      border-radius: 6px;
      border-color: gray;
      border-style: dotted;
      /*overflow: hidden;*/
    }
    .normal { white-space: normal; }
    .nowrap { white-space: nowrap; }
    .pre    { white-space: pre; }
    .pre-wrap { white-space: pre-wrap; }
    .pre-line { white-space: pre-line; }
  </style>
```

<br /><br />

---

<br /><br />

## text-overflow

부모 영역을 벗어난 wrapping(자동줄바꿈)이 되지 않은 텍스트의 처리 방법을 정의한다. 이 프로퍼티를 사용하기 위해서는 아래의 조건이 필요하다.

-   width 프로퍼티가 지정되어 있어야 한다. 이를 위해 필요할 경우 block 레벨 요소로 변경하여야 한다.
-   자동 줄바꿈을 방지하려면 white-space 프로퍼티를 nowrap으로 설정한다.
-   overflow 프로퍼티에 반드시 “visible” 이외의 값이 지정되어 있어야 한다.

```css
/* 부모 영역을 벗어난 텍스트를 잘라내어 보이지 않게 하고 말줄임표(...)를 표시한다. */
.truncate {
    width: 150px; /* width가 지정되어 있어야 한다. */
    white-space: nowrap; /* 자동 줄바꿈을 방지 */
    overflow: hidden; /* 반드시 "visible" 이외의 값이 지정되어 있어야 한다. */
    text-overflow: ellipsis; /* ellipsis or clip */
}
```

<br /><br />

---

<br /><br />

## word-wrap

한 단어의 길이가 길어서 부모 영역을 벗어난 텍스트의 처리 방법을 정의한다. link 등을 표기할 때(e.g. https://poiemaweb.com/css3-font-text) 그 길이가 매우 길어지는데 이 프로퍼티를 사용하지 않으면 부모 영역을 넘어가게 된다.

```css
  <style>
    .word-wrap { word-wrap: break-word; }
  </style>
```

<br /><br />

---

<br /><br />

## word-break

한 단어의 길이가 길어서 부모 영역을 벗어난 텍스트의 처리 방법을 정의한다.

word-wrap 프로퍼티는 단어를 어느 정도는 고려하여 개행하지만(.,- 등을 고려한다) word-break: break-all;는 단어를 고려하지 않고 부모 영역에 맞추어 강제 개행한다.

```css
  <style>
    .word-wrap  { word-wrap: break-word; }
    .word-break { word-break: break-all; }
  </style>
```
