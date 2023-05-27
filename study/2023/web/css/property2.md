# Property2 - background

-   [참고 자료(poiemaweb)](https://poiemaweb.com/css3-background)

-   [CSS Background and Borders](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_borders)

## background-image

요소에 배경 이미지를 지정한다.

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                background-image: url("http://poiemaweb.com/img/bg/dot.png");
            }
        </style>
    </head>
    <body>
        <h3>Background Image</h3>
    </body>
</html>
```

<br /><br />

---

<br /><br />

## background-repeat

배경 이미지의 반복을 지정한다. 수직, 수평 또는 수직과 수평 모두의 반복을 지정할 수 있다.

설정된 이미지의 크기가 화면보다 작으면 자동으로 이미지가 반복 출력되어 화면을 채우게 된다. 이것은 background-repeat 프로퍼티의 기본값이 repeat이기 때문이다.

x축으로만 배경 이미지를 반복할 경우, background-repeat 프로퍼티값에 repeat-x, y축으로만 배경 이미지를 반복할 경우, repeat-y를 설정한다.

```css
body {
    background-image: url("http://poiemaweb.com/img/bg/dot.png");
    background-repeat: repeat-x;
}
```

```css
/* 반복 출력을 멈추고 싶은 경우 */
body {
    background-image: url("http://poiemaweb.com/img/bg/dot.png");
    background-repeat: no-repeat;
}
```

<br /><br />

---

<br /><br />

## background-size

배경 이미지의 사이즈를 지정한다. 배경 이미지의 고유 비율을 유지하기 때문에 설정에 따라 이미지의 일부가 보이지 않을 수 있다.

프로퍼티값은 px, %, cover, contain 등을 사용한다.

배경이미지의 width, height를 모두 설정할 수 있다. 이때 첫번째 값은 width, 두번째 값은 height를 의미한다. 하나의 값만을 지정한 경우, 지정한 값은 width를 의미하게 되며 height는 auto로 지정된다.

```css
/* px값 지정
배경이미지 크기가 지정된 px값 그대로 설정된다. 첫번째 값은 width, 두번째 값은 height를 의미한다. */
.bg {
    background-size: 700px 500px;
}
```

```css
/* %값 지정
배경이미지 크기가 지정된 %값에 비례하여 설정된다. 첫번째 값은 width, 두번째 값은 height를 의미한다.
화면을 줄이거나 늘리면 배경이미지의 크기도 따라서 변경되어 찌그러지는 현상이 나타난다. */
.bg {
    background-size: 100% 100%;
}
```

```css
/* cover 지정
배경이미지의 크기 비율을 유지한 상태에서 부모 요소의 width, height 중 큰값에 배경이미지를 맞춘다. 따라서 이미지의 일부가 보이지 않을 수 있다. */
.bg {
    background-size: cover;
}
```

```css
/* contain 지정
배경이미지의 크기 비율을 유지한 상태에서 부모 요소의 영역에 배경이미지가 보이지 않는 부분없이 전체가 들어갈 수 있도록 이미지 스케일을 조정한다. */
.bg {
    background-size: contain;
}
```

<br /><br />

---

<br /><br />

## background-attachment

일반적으로 화면을 스크롤하면 배경 이미지도 함께 스크롤된다. 화면이 스크롤되더라도 배경이미지는 스크롤되지 않고 고정되어 있게 하려면 background-attachment 프로퍼티에 fixed 키워드를 지정한다.

<br /><br />

---

<br /><br />

## background-position

일반적으로 background-image는 좌상단부터 이미지를 출력한다. 이때 background-position 프로퍼티를 사용하면 이미지의 좌표(xpos, ypos)를 지정 할 수 있다.

기본값은 background-position: 0% 0%;로 배경이미지는 우측 상단에 위치하게 된다.

<br /><br />

---

<br /><br />

## background-color

background-color 프로퍼티는 요소의 배경 색상을 지정한다. 색상값 또는 transparent 키워드를 지정할 수 있다.

```css
.bg-col-white {
    background-color: rgb(255, 255, 255);
}

.bg-col-red {
    background-color: red;
}
```

<br /><br />

---

<br /><br />

## background Shorthand

background-color, background-image, background-repeat, background-position를 한번에 정의하기 위한 Shorthand Syntax이다.

`background: color || image || repeat || attachment || position`

```css
div {
    /* background: color || image || repeat || attachment || position */
    background: #ffee99 url("http://poiemaweb.com/img/bg/dot.png") no-repeat center;
    width: 50vw;
    height: 300px;
}
```
