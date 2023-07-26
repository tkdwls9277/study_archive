# 플래그

- [참고 자료(poiemaweb)](https://poiemaweb.com/js-regexp)

| Flag | Meaning     | Description                               |
| ---- | ----------- | ----------------------------------------- |
| i    | Ignore Case | 대소문자를 구별하지 않고 검색한다.        |
| g    | Global      | 문자열 내의 모든 패턴을 검색한다.         |
| m    | Multi Line  | 문자열의 행이 바뀌더라도 검색을 계속한다. |

<br />

- 플래그는 옵션이므로 선택적으로 사용한다. 플래그를 사용하지 않은 경우 문자열 내 검색 매칭 대상이 1개 이상이더라도 첫번째 매칭한 대상만을 검색하고 종료한다.

<br />

```js
const targetStr = "Is this all there is?";

// 문자열 is를 대소문자를 구별하여 한번만 검색한다.
let regexr = /is/;

console.log(targetStr.match(regexr)); // [ 'is', index: 5, input: 'Is this all there is?' ]

// 문자열 is를 대소문자를 구별하지 않고 대상 문자열 끝까지 검색한다.
regexr = /is/gi;

console.log(targetStr.match(regexr)); // [ 'Is', 'is', 'is' ]
console.log(targetStr.match(regexr).length); // 3
```
