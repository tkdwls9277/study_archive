# addEventListener 이벤트리스너 종류 모음

<br />

## 1. 브라우저 UI와 상호작용 이벤트

```md
-   load: 웹 페이지 로드 완료되었을때
-   unload: 웹 페이지가 언로드 될 때(새로운 페이지 요청한 경우)
-   error: 오류를 만났거나 요청한 자원이 없을 때
-   resize: 브라우저 창 크기를 조정했을 때
-   scroll: 사용자가 페이지를 위아래로 스크롤 할 때
```

<br />

## 2. 키보드 이벤트 - 사용자가 키보드를 작동했을 때

```md
-   keydown: 사용자가 키를 눌렀을 때
-   keyup: 사용자가 키를 뗄 때
-   keypress: 사용자가 눌렀던 키의 문자가 입력 되었을 때
```

<br />

## 3. 마우스 이벤트 - 사용자가 마우스로 화면을 작동시킬 때

```md
-   click: 사용자가 마우스를 클릭했을 때
-   dbclick: 두번 클릭 되었을 때
-   mousedown: 마우스 버튼을 누르고 있을 때
-   mouseup: 눌렀던 마우스 버튼을 뗄 때
-   mousemove: 마우스를 움직였을 때
-   mouseover: 요소위로 마우스를 움직였을 때
-   mouseout: 요소 밖으로 마우스를 움직였을 때
```

<br />

## 4. 폼 이벤트

```md
-   input: `<input>,<textarea>`요소 값이 변경되었을 때
-   change: 선택버튼, 체크박스, 라디오 버튼 등 상태가 변경 되었을 때
-   submit: 버튼키를 이용해서 폼을 제출할 때
-   reset: 리셋 버튼을 클릭할 때
-   copy: 폼 필드의 콘텐츠를 복사했을 때
-   cut: 폼 필드의 콘텐츠를 잘라내기 했을 때
-   paste: 폼 필드의 콘텐츠를 붙여넣기 할 때
-   select: 텍스트를 선택했을 때
```

<br />

## 5. addEventListner 자바스크립트로 사용방법

```js
XXX.addEventListener("click", () => {
    console.log("clicked");
    // xxx를 클릭하면 clicked라는 로그를 확인할 수 있다.
});
```
