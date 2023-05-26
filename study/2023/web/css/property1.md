# Property1

[참고 자료(poiemaweb)](https://poiemaweb.com/css3-display)

## display

| 프로퍼티값 키워드 | 설명                                                           |
| ----------------- | -------------------------------------------------------------- |
| block             | block 특성을 가지는 요소(block 레벨 요소)로 지정               |
| inline            | inline 특성을 가지는 요소(inline 레벨 요소)로 지정             |
| inline-block      | inline-block 특성을 가지는 요소(inline-block 레벨 요소)로 지정 |
| none              | 해당 요소를 화면에 표시하지 않는다 (공간조차 사라진다)         |

모든 HTML 요소는 아무런 CSS를 적용하지 않아도 기본적으로 브라우저에 표현되는 디폴트 표시값을 가진다. HTML 요소는 block 또는 inline 특성을 갖는다.

아래는 p 요소에 대한 크롬 브라우저의 디폴트 css이다.

```css
p {
  display: block;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
}
```

<br /><br />

---

<br /><br />

## visibility

visibility 프로퍼티는 요소를 보이게 할 것인지 보이지 않게 할 것인지를 정의한다. 즉, 요소의 렌더링 여부를 결정한다.

| 프로퍼티값 키워드 | 설명                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visible           | 해당 요소를 보이게 한다 (기본값)                                                                                                                          |
| hidden            | 해당 요소를 보이지 않게 한다. display: none;은 해당 요소의 공간까지 사라지게 하지만 visibility: hidden;은 해당 요소의 공간은 사라지지 않고 남아있게 된다. |
| collapse          | table 요소에 사용하며 행이나 열을 보이지 않게 한다.                                                                                                       |
| none              | table 요소의 row나 column을 보이지 않게 한다. IE, 파이어폭스에서만 동작하며 크롬에서는 hidden과 동일하게 동작한다.                                        |

<br />

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .visible {
        visibility: visible;
      }
      .hidden {
        visibility: hidden;
      }

      table,
      td {
        border: 1px solid black;
      }
      .collapse {
        visibility: collapse;
      }
      /* .collapse { visibility: hidden; } */
    </style>
  </head>
  <body>
    <h1 class="visible">visibility: visible</h1>
    <h1 class="hidden">visibility: hidden</h1>
    <h1 style="display:none">display:none</h1>

    <table>
      <tr>
        <td>A</td>
        <td>B</td>
      </tr>
      <tr class="collapse">
        <td>C</td>
        <td>D</td>
      </tr>
    </table>
  </body>
</html>
```

<br /><br />

---

<br /><br />

## opacity

opacity 프로퍼티는 요소의 투명도를 정의한다. 0.0 ~ 1.0의 값을 입력하며 0.0은 투명, 1.0은 불투명을 의미한다.

<br />

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div,
      img {
        float: left;
        width: 150px;
        height: 150px;
        margin: 30px;
        background-color: blue;
        color: white;
        opacity: 0.5;
        transition: opacity 1s;
      }
      div:hover,
      img:hover {
        opacity: 1;
      }
    </style>
  </head>
  <body>
    <div>opacity: 0.5</div>
    <img src="https://poiemaweb.com/img/doug.jpg" alt="doug" />
  </body>
</html>
```
