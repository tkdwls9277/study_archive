# [text](https://aljjabaegi.tistory.com/599)

1. fillText `ex) fillText(text, x, y, [, maxWidth])`

2. strokeText `ex)strokeText(text, x, y, [, maxWidth])`

canvas 영역 내의 (x,y)위치에 text를 추가.
maxWidth는 optional하며, 최대 폭을 지정 가능.

| 스타일         | 옵션                                                                         |
| -------------- | ---------------------------------------------------------------------------- |
| `font`         | css font 동일 프로퍼티                                                       |
| `textAlign`    | start, end, left, right, center (default : start)                            |
| `textBaseline` | top, hanging, middle, alphabetic, ideographic, bottom (default : alphabetic) |
| `direction`    | ltr, rtl, inherit (default : inherit)                                        |

<br/>

---

<br/>

# text metrics

1. mearsureText `ex) ctx.mearsureText(text)`

| 속성                       | 설명                                                                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `actualBoundingBoxAscent`  | 속성이 나타내는 수평선에서 텍스트를 렌더링하는데 사용되는 경계 사각형의 상단까지의 거리를 CSS 필셀 단위로 제공                      |
| `actualBoundingBoxDescent` | 속성이 나나내는 수평선에서 텍스트를 렌더링하는데 사용되는 경계 사각형의 맨 아래까지의 거리를 CSS 픽셀 단위로 제공                   |
| `actualBoundingBoxLeft`    | 속성에 의해 지정된 정렬 지점에서 기준선과 평행한 거리를 CSS 픽셀 단위로 주어진 텍스트의 경계 사각형 왼쪽까지 제공                   |
| `actualBoundingBoxRight`   | 속성이 나타내는 수평선에서 텍스트를 렌더링 하는데 사용되는 모든 글꼴의 가장 높은 경계 사각형의 상단까지 거리를 CSS 픽셀 단위로 제공 |
| `fontBoundingBoxDescent`   | 속성이 나타내는 수평선에서 텍스트를 렌더링 하는데 사용되는 모든 글꼴의 경계 사각형 하단까지의 거리를 CSS 픽셀 단위로 제공           |
