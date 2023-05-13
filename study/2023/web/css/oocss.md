# OOCSS

## OOCSS의 원칙

다른 객체 기반 코딩 방법론처럼, OOCSS의 목적도 코드 재사용성을 높이고, 궁극적으로는, 더 빠르고 효율적이며 뭔가 추가하기 쉽고 유지보수하기 용이한 스타일시트를 만드는 것이다.

OOCSS는 두 가지 원칙에 기초해 있다.

<br /><br />

## 겉모양(skin)에서 골격(structure)을 분리하기

스타일을 입힌 웹페이지의 거의 모든 요소들은 맥락에 따라 겉모양이 다르다. (즉 “겉모양”) 웹사이트의 컨셉을 생각해 보자. 색깔, 그라디언트의 섬세한 사용, 또는 보이는 선들. 반면, 다른 보이지 않는 요소들은 비슷하게 반복된다. (즉, “골격”)

이 다른 요소들을 클래스 기반 모듈로 추상화하면, 재사용이 가능해지고 어떤 요소에도 적용할 수 있으며, 기본적으로 일관된 모양을 기대할 수 있게 된다. 코드를 다듬기 전과 다듬은 후를 비교해 보자. 내가 무슨 이야기를 하는지 알 수 있을 것이다.

OOCSS 원칙을 적용하기 전엔 이런 CSS를 작성했 것이다.

```css
#button {
    width: 200px;
    height: 50px;
    padding: 10px;
    border: solid 1px #ccc;
    background: linear-gradient(#ccc, #222);
    box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 5px;
}

#box {
    width: 400px;
    overflow: hidden;
    border: solid 1px #ccc;
    background: linear-gradient(#ccc, #222);
    box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 5px;
}

#widget {
    width: 500px;
    min-height: 200px;
    overflow: auto;
    border: solid 1px #ccc;
    background: linear-gradient(#ccc, #222);
    box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 5px;
}
```

위의 세 요소엔 각각 독립적인 스타일이 있다. 그리고 스타일을 적용하기 위해 ID 선택자(selector)를 사용하고 있다. ID 선택자는 재사용할 수 없다. 공통 스타일(common styles)은 분위기를 내거나 디자인을 일관되게 유지하기 위해 존재한다.

조금만 계획을 세우고 생각을 먼저 하면, 공통 스타일(common styles)을 추상화할 수 있다. 그렇게 하면 CSS는 아래처럼 될 것이다.

```css
.skin {
    border: solid 1px #ccc;
    background: linear-gradient(#ccc, #222);
    box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 5px;
}

.button {
    width: 200px;
    height: 50px;
}

.box {
    width: 400px;
    overflow: hidden;
}

.widget {
    width: 500px;
    min-height: 200px;
    overflow: auto;
}
```

이렇게 하면, 모든 요소들은 클래스를 두 개 이상 사용하게 된다. 하지만 공통 스타일과 재사용 가능한 “겉모양”용 스타일을 결합해 사용하면서 불필요한 반복은 없어진다. 우리는 단지 모든 요소들에 “겉모양” 클래스를 적용하면 된다. 그러면 처음 예제에서 만들었던 것과 동일한 결과물을 볼 수 있다. 코드가 줄었다는 점과 재사용의 가능성이 늘었다는 점만 빼고 말이다.

<br /><br />

## 컨테이너와 콘텐츠를 분리하기

OOCSS의 두 번째 원칙은, 컨테이너를 콘텐츠에서 분리하는 것이다. 다음 CSS를 보면 이게 왜 중요한지 알 수 있다.

```css
#sidebar h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8em;
    line-height: 1;
    color: #777;
    text-shadow: rgba(0, 0, 0, 0.3) 3px 3px 6px;
}
```

이 스타일은 #sidebar 요소의 자식 요소인 3단계 제목(h3)에 적용할 것이다. 하지만 글자 크기와 그림자만 바꾸고 나머지는 완전히 같은 스타일로 푸터의 h3에 적용하고 싶다면?

그러면 이런 식으로 해야 할 거다.

```css
#sidebar h3,
#footer h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2em;
    line-height: 1;
    color: #777;
    text-shadow: rgba(0, 0, 0, 0.3) 3px 3px 6px;
}

#footer h3 {
    font-size: 1.5em;
    text-shadow: rgba(0, 0, 0, 0.3) 2px 2px 4px;
}
```

아니면, 이런 식으로 더 나쁘게 할 수도 있다.

```css
#sidebar h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2em;
    line-height: 1;
    color: #777;
    text-shadow: rgba(0, 0, 0, 0.3) 3px 3px 6px;
}

/* other styles here.... */
#footer h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5em;
    line-height: 1;
    color: #777;
    text-shadow: rgba(0, 0, 0, 0.3) 2px 2px 4px;
}
```

결국, 우리는 불필요한 중복 스타일을 만들고 있으며, 아마 그걸 알아차리지 못할 거다. (아니면 신경쓰지 않거나.) OOCSS에서는 서로 다른 요소들(elements)을 꼼꼼히 살펴 공통된 부분을 찾아내고, 그걸 어디서나 재사용할 수 있도록 모듈이나 객체로 만든다.

맨 위의 예제처럼 계층화한 선택자를 사용해 스타일을 선언하면, 재사용할 수 없게 된다. 특정 컨테이너에 종속돼기 때문이다. (이 경우엔 사이드바나 푸터에 종속됐다.)

OOCSS의 클래스 기반 모듈을 구축함으로써 스타일이 어떤 컨테이너에도 종속되지 않도록 할 수 있다. 이것은 구조적 맥락을 신경쓰지 않고, 클래스를 문서의 어디에서나 재사용할 수 있게 된다는 것을 뜻한다.
