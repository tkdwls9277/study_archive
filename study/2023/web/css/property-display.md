# display

[참고 자료(poiemaweb)](https://poiemaweb.com/css3-display)

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
