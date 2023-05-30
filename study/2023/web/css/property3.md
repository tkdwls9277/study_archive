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
