# BOM / DOM 조작

## Dom 구조

![](images/bomdom1.png)

![](images/bomdom2.png)

<br /><br />

---

<br /><br />

## Dom 생성(Client side 한정)

-   HTML 문서 로드로 인한 render

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Sample</title>
    </head>
    <body>
        <div id="bodyDiv" style="background-color:red;width:500px;height:500px"></div>
    </body>
</html>
```

<br /><br />

-   JavaScript의 DOM 조작으로 인한 생성

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Sample</title>
    </head>
    <body>
        <script>
            var $div = document.createElement("div");
            $div.style.backgroundColor = "red";
            $div.style.width = "500px";
            $div.style.height = "500px";
            document.body.append($div);
        </script>
    </body>
</html>
```

<br /><br />

---

<br /><br />

## DOM 조작

-   Property 와 Attribute
    -   Property : 객체로서 다뤄지는 DOM 자체에 속한 속성
    -   Attribute: 화면에 랜더된 HTML 태그에 쓰여진 속성
-   Element Selecting
    -   document.getElementById
    -   document.getElementsByClassName
    -   document.getElementsByTagName
    -   document.querySelectorAll()
        -   CSS 선택자 사용.
    -   document.all[]
        -   ES3 시절 스펙. 사용하지 않을것을 권장.

## EventHandler

-   Dom에 eventListener 붙이기
    -   dom["on"+eventName]
    -   attachEvent("on"+eventName, callback)
        -   IE9 이전에만 사용. 사용하지 않을 것을 권장.
    -   dom.addEventListener("eventType", callback, useCapture);
    -   dom.removeEventListener("eventType", callback, useCapture)

## 이벤트의 확산

-   EventBubbling
    -   이벤트가 일어난 객체에서부터 상위 객체로 확산됨
-   EventCapturing
    -   이벤트가 일어난 객체로부터 하위 객체로 확산됨.
