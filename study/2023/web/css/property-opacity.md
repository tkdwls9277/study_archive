# opacity

[참고 자료(poiemaweb)](https://poiemaweb.com/css3-display)

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
