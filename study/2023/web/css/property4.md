# Property4 - Position

- [참고 자료(poiemaweb)](https://poiemaweb.com/css3-position)

## position

요소의 위치를 정의한다. top, bottom, left, right 프로퍼티와 함께 사용하여 위치를 지정한다.

- static (기본위치) : static은 position 프로퍼티의 기본값으로 position 프로퍼티를 지정하지 않았을 때와 같다. 기본적인 요소의 배치 순서에 따라 위에서 아래로, 왼쪽에서 오른쪽으로 순서에 따라 배치되며 부모 요소 내에 자식 요소로서 존재할 때는 부모 요소의 위치를 기준으로 배치

- relative (상대위치) : 기본 위치(static으로 지정되었을 때의 위치)를 기준으로 좌표 프로퍼티(top, bottom, left, right)를 사용하여 위치를 이동시킨다. static을 선언한 요소와 relative를 선언한 요소의 차이점은 좌표 프로퍼티의 동작 여부뿐이며 그외는 동일하게 동작한다.

- absolute (절대위치) : 부모 요소 또는 가장 가까이 있는 조상 요소(static 제외)를 기준으로 좌표 프로퍼티(top, bottom, left, right)만큼 이동한다. 즉, relative, absolute, fixed 프로퍼티가 선언되어 있는 부모 또는 조상 요소를 기준으로 위치가 결정된다.

- fixed (고정위치) : 스크롤이 되더라도 화면에서 사라지지 않고 항상 같은 곳에 위치한다. fixed 프로퍼티 선언 시, block 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 적절한 width를 지정하여야 한다.

<br /><br />

---

<br /><br />

## z-index

z-index 프로퍼티에 큰 숫자값을 지정할수록 화면 전면에 출력된다. position 프로퍼티가 static 이외인 요소에만 적용된다.

<br /><br />

---

<br /><br />

## overflow

overflow 프로퍼티는 자식 요소가 부모 요소의 영역를 벗어났을 때 처리 방법을 정의한다.

| 프로퍼티값 | Description                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------- |
| visible    | 영역을 벗어난 부분을 표시한다. (기본값)                                                       |
| hidden     | 영역을 벗어난 부분을 잘라내어 보이지 않게 한다.                                               |
| scroll     | 영역을 벗어난 부분이 없어도 스크롤 표시한다.(현재 대부분 브라우저는 auto과 동일하게 작동한다) |
| auto       | 영역을 벗어난 부분이 있을때만 스크롤 표시한다.                                                |

```css
  <style>
    .visible { overflow: visible; }
    .hidden  { overflow: hidden; }
    .scroll  { overflow: scroll; }
    .auto    { overflow: auto; }
  </style>
```
