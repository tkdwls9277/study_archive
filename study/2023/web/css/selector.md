# selector

CSS에서는 스타일을 적용할 대상을 선택하기 위해서 선택자(selector)를 사용합니다.

대표적인 선택자는 다음과 같습니다.

-   전체 선택자
-   HTML 요소 선택자
-   아이디(id) 선택자
-   클래스(class) 선택자
-   그룹(group) 선택자

## 전체 선택자

CSS를 적용할 대상으로 HTML 문서 내부의 모든 요소를 선택합니다.

```css
<style>
* { color: red; }
</style>
```

<br /><br />

## HTML 요소 선택자

CSS를 적용할 대상으로 HTML 요소의 이름을 직접 사용하여 선택할 수 있습니다.

```css
<style>
p { color: teal; text-decoration: underline; }
</style>

<p>이 부분에 스타일을 적용합니다.</p>
```

<br /><br />

## 아이디(id) 선택자

아이디 선택자는 CSS를 적용할 대상으로 특정 요소를 선택할 때 사용합니다.

이 선택자는 웹 페이지에 포함된 여러 요소 중에서 특정 아이디 이름을 가지는 요소만을 선택해 줍니다.

```css
<style>
#heading { color: sandybrown; text-decoration: line-through; }
</style>

<h2 id="heading">이 부분에 스타일을 적용합니다.</h2>
```

HTML과 CSS에서는 하나의 웹 페이지에 속하는 여러 요소에 같은 아이디 이름을 사용해도 별 문제없이 동작합니다.

하지만 이렇게 중복된 아이디를 가지고 자바스크립트 작업을 하게 되면 오류가 발생합니다.

따라서 하나의 웹 페이지에 속하는 요소에는 다른 아이디 이름을 사용하거나 클래스를 사용하는 것이 좋습니다.

<br /><br />

## 클래스(class) 선택자

클래스 선택자는 특정 집단의 여러 요소를 한 번에 선택할 때 사용합니다.

이러한 특정 집단을 클래스(class)라고 하며, 같은 클래스 이름을 가지는 요소들을 모두 선택해 줍니다.

```css
<style>
.headings { color: blue; text-decoration: overline; }
.red { color : red }
</style>

<p class="headings">이 부분에 스타일을 적용합니다.</p>

<p>클래스 선택자를 이용하여 스타일을 적용할 HTML 요소들을 한 번에 선택할 수 있습니다.</p>

<p class=“headings red”>여러개의 클래스를 동시에 사용할 수 있습니다.</p>
```

<br /><br />

## 그룹 선택자

그룹 선택자는 위에서 언급한 여러 선택자를 같이 사용하고자 할 때 사용합니다.

그룹 선택자는 여러 선택자를 쉼표(,)로 구분하여 연결합니다.

이러한 그룹 선택자는 코드를 중복해서 작성하지 않도록 하여 코드를 간결하게 만들어 줍니다.

```css
<style>
h2 { color: navy; }
h2, h3 { text-align: center; }
h2, h3, p { background-color: lightgray; }
</style>
```

<br /><br />

## 하위 선택자와 자식 선택자

태그들이 포함 관계를 가질 때 포함하는 요소를 부모 요소, 포함되는 요소를 자식 요소라고 합니다. 하위 선택자는 부모 요소에 포함된 '모든' 하위 요소에 스타일을 적용합니다. 하지만, 자식 선택자는 부모의 바로 아래 자식 요소에만 적용합니다.

```css
/* 하위 선택자 */
section ul {
    border: 1px dotted black;
}

/* 자식 선택자 */
section > ul {
    border: 1px dotted black;
}
```
