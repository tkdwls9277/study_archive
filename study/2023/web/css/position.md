# 위치속성(position)

## display 속성

display 속성은 웹 페이지의 레이아웃(layout)을 결정하는 CSS의 중요한 속성 중 하나입니다.

이 속성은 해당 HTML 요소가 웹 브라우저에 언제 어떻게 보이는가를 결정합니다.

대부분의 HTML 요소는 display 속성의 기본값으로 다음 두 가지 값 중 하나의 값을 가집니다.

1. 블록(block)

2. 인라인(inline)

<br /><br />

## 블록(block)

display 속성값이 블록(block)인 요소는 언제나 새로운 라인(line)에서 시작하며, 해당 라인의 모든 너비를 차지합니다.

`<div>, <h1>, <p>, <ul>, <ol>, <form>`요소는 대표적인 블록(block) 요소입니다.

<br /><br />

## 인라인(inline)

display 속성값이 인라인(inline)인 요소는 새로운 라인(line)에서 시작하지 않습니다.

또한, 요소의 너비도 해당 라인 전체가 아닌 해당 HTML 요소의 내용(content)만큼만 차지합니다.

`<span>, <a>, <img>`요소는 대표적인 인라인(inline) 요소입니다.

<br /><br />

## position 속성

position 속성은 HTML 요소가 위치를 결정하는 방식을 설정합니다.

CSS에서 요소의 위치를 결정하는 방식에는 다음과 같이 4가지 방식이 있습니다.

1. 정적 위치(static position) 지정 방식

2. 상대 위치(relative position) 지정 방식

3. 고정 위치(fixed position) 지정 방식

4. 절대 위치(absolute position) 지정 방식

정적 위치(static position) 지정 방식

HTML 요소의 위치를 결정하는 가장 기본적인 방식은 정적 위치(static position) 지정 방식입니다.

position 속성값이 static으로 설정된 요소는 top, right, bottom, left 속성값에 영향을 받지 않습니다.

정적 위치(static position) 지정 방식은 단순히 웹 페이지의 흐름에 따라 차례대로 요소들을 위치시키는 방식입니다.

```css
<style>
div { position: static; }
</style>
```

모든 HTML 요소의 position 속성의 기본 설정값은 static입니다.

<br /><br />

## 상대 위치(relative position)

상대 위치(relative position) 지정 방식은 해당 HTML 요소의 기본 위치를 기준으로 위치를 설정하는 방식입니다.

HTML 요소의 기본 위치란 해당 요소가 정적 위치(static position) 지정 방식일 때 결정되는 위치를 의미합니다.

```css
<style>
div.relative { position: relative; left: 30px; }
</style>
```

<br /><br />

## 고정 위치(fixed position)

고정 위치(fixed position) 지정 방식은 뷰포트(viewport)를 기준으로 위치를 설정하는 방식입니다.

즉, 웹 페이지가 스크롤 되어도 고정 위치로 지정된 요소는 항상 같은 곳에 위치하게 됩니다.

```css
<style>
div.fixed { position: fixed; top: 0; right: 0; }
</style>
```

<br /><br />

## 절대 위치(absolute position)

절대 위치(absolute position) 지정 방식은 고정 위치가 뷰포트를 기준으로 위치를 결정하는 것과 비슷하게 동작합니다.

단지 뷰포트(viewport)를 기준으로 하는 것이 아닌 위치가 설정된 조상(ancestor) 요소를 기준으로 위치를 설정하게 됩니다.

하지만 위치가 설정된 조상(ancestor) 요소를 가지지 않는다면, HTML 문서의 body 요소를 기준으로 위치를 설정하게 됩니다.

```css
<style>
div.absolute { position: absolute; top: 50px; right: 0; }
</style>
```

위치가 설정된 요소라는 것은 정적 위치(static position) 지정 방식을 제외한 다른 방식(relative, fixed, absolute)으로 위치가 설정된 요소를 의미합니다.

<br /><br />

## z-index 속성

HTML 요소의 위치를 설정하게 되면 어떤 요소들은 설정된 위치 및 방식에 따라 서로 겹칠 수도 있습니다.

z-index 속성은 이렇게 겹쳐지는 요소들이 쌓이는 스택(stack)의 순서를 설정합니다.

스택(stack)의 순서는 양수나 음수 모두 설정할 수 있으며, 크기가 클수록 앞쪽에 위치하고 작을수록 뒤쪽에 위치하게 됩니다.

```css
<style>
.last {
position: fixed;
top: 180px;
left: 120px;
z-index: -1;
}
</style>
```
