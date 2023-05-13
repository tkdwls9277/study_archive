# 1. HTML의 기초

HTML은 HyperText Markup Language의 약자입니다.

-   HyperText는 단순 텍스트 이상의, 링크 등의 개념이 포함 된 텍스트
-   Markup은 꺽쇠(<, >)로 이루어진 태그를 사용하는 규격

으로, 태그들을 이용하여 텍스트 이상의 요소를 정의하는 약속된 언어라고 할 수 있습니다.

웹 페이지는 HTML 문서라고도 불리며, HTML 태그들로 구성됩니다.

HTML 태그는 각각 특별한 의미를 가지고 있으며, 그 의미에 맞게 사용하여 웹 페이지의 디자인이나 기능을 결정하는데 사용됩니다.

```html
<h1>제목 1</h1>
<h2>제목 2</h2>
<p>단락</p>
<div>레이아웃</div>
<span>텍스트</span>
```

HTML이 마크업 언어라고 설명했는데, HTML 이외에도 XML이라는 언어도 대표적인 마크업 언어 중 하나입니다.

**HTML 태그(tag)**

HTML 태그는 태그 이름을 꺾쇠 괄호(<>)로 감싸서 표현합니다.

`<Tag Name> …. </Tag Name>`

HTML 태그는 보통 시작 태그(start tag, opening tag)와 종료 태그(end tag, closing tag)의 한 쌍으로 구성됩니다.

종료 태그는 시작 태그와 전부 똑같지만, 태그 이름 앞에 슬래시(/)가 존재합니다.

태그에 따라 시작 태그만 있고 종료 태그가 없는 태그도 존재합니다.

`<img /> <br /> <hr />` 등이 종료 태그 없이 시작 태그만을 가지는 태그이며 시작태그 마지막 부분에 슬레시(/)를 넣어줍니다.

**HTML 작성**

HTML 문서는 윈도우의 메모장과 같은 기본 에디터로도 작성할 수 있습니다. 비쥬얼스튜디오, 드림위버, 나모웹에디터등 다양한 기능을 지원하는 에디터로도 작성이 가능합니다.

HTML 문서의 작성을 마친 후에 확장자를 .html로 저장하면 웹 브라우저에서 바로 확인할 수 있습니다.

**HTML 버전**

인터넷의 발전에 따라 HTML 버전 또한 다음과 같이 발전을 거듭하고 있습니다.

[제목 없음](https://www.notion.so/c79e9151d2f04957888c02816eae8641)

HTML의 최신 버전인 HTML5에 대한 더 자세한 정보를 원한다면, W3C 공식 사이트를 방문하여 확인할 수 있습니다.

W3C HTML5 : [https://www.w3.org/TR/html5/](https://www.w3.org/TR/html5/)

**W3C**

W3C는 World Wide Web Consortium의 약자입니다.

W3C는 월드 와이드 웹(WWW)을 위한 표준을 제정하고 관리하는 중립적인 기관입니다.

**HTML의 기본구조**

다음은 HTML 문서의 기본적인 구조를 보여주는 그림입니다.

```html
<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8" />

        <title>Untitled Document</title>
    </head>

    <body>
        웹브라우저에 보여질 내용
    </body>
</html>
```

`<!DOCTYPE html>` : 현재 문서가 HTML5 문서임을 명시합니다.

`<html>` : HTML 문서의 루트(root) 요소를 정의합니다.

`<head>` : HTML 문서의 메타데이터(metadata)를 정의합니다.

-   메타데이터(metadata)란 HTML 문서에 대한 정보(data)로 웹 브라우저에는 직접적으로 표현되지 않는 정보를 의미합니다.
-   이러한 메타데이터는 `<title>, <style>, <meta>, <link>, <script>, <base>`태그 등을 이용하여 표현할 수 있습니다.

`<meta charset="utf-8”>` : 웹 브라우저가 HTML 문서를 정확하게 나타내기 위해서는 해당 문서가 어떠한 문자셋으로 저장되었는지 선언합니다.

`<title>` : HTML 문서의 제목(title)을 정의하며, 다음과 같은 용도로 사용됩니다.

-   웹 브라우저의 툴바(toolbar)에 표시됩니다.
-   웹 브라우저의 즐겨찾기(favorites)에 추가할 때 즐겨찾기의 제목이 됩니다.
-   검색 엔진의 결과 페이지에 제목으로 표시됩니다.

`<body>` : 웹 브라우저를 통해 보이는 내용(content) 부분입니다.
