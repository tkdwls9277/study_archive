# Transition

트랜지션(transition)은 CSS 프로퍼티의 값이 변화할 때, 프로퍼티 값의 변화가 일정 시간(duration)에 걸쳐 일어나도록 하는 것이다. 예를 들어 아래의 예제를 살펴보자. div 요소는 기본 상태에서 hover 상태로 변화할 때, CSS 프로퍼티 border-radius와 background 프로퍼티의 값이 변화한다.

```css
  <style>
    div {
      width: 100px;
      height: 100px;
      background: red;
    }
    div:hover {
      border-radius: 50%;
      background: blue;
    }
  </style>
```

상태 변화에 따라 CSS 프로퍼티가 변경되면 프로퍼티 변경에 따른 표시의 변화(transition)는 지체없이 즉시 발생한다. 위 예제의 경우, div 요소에 마우스가 올라가서 hover 상태가 되면 div 요소의 border-radius, background 프로퍼티의 값이 즉시 변경된다.

트랜지션(transition)은 상태 변화에 동반하여 변경되는 CSS 프로퍼티 값에 의한 표시의 변화를 부드럽게 하기 위해 애니메이션 속도를 조절한다. 즉, 프로퍼티 값의 변경이 표시의 변화에 즉시 영향을 미치게 하는 대신 그 프로퍼티 값의 변화가 일정 시간(duration)에 걸쳐 일어나도록 하는 것이다.

위 예제에 트랜지션 효과를 부여해 보자.

```css
  <style>
    div {
      width: 100px;
      height: 100px;
      background: red;
      /* 트랜지션 효과: 모든 프로퍼티의 변화를 2초에 걸쳐 전환한다. */
      transition: all 2s;
    }
    div:hover {
      border-radius: 50%;
      background: blue;
    }
  </style>
```

위 예제에서는 div 요소에 마우스가 올라갈 때(hover on)와 마우스가 내려올 때(hover off) border-radius, background 프로퍼티 값의 변화가 발생한다. 그리고 이들 프로퍼티 값의 변화를 2초에 걸쳐 이루어지도록 설정한 것이다.

| 프로퍼티                   | 설명                                                                                                                   | 기본값 |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------ |
| transition-property        | 트랜지션의 대상이 되는 CSS 프로퍼티를 지정한다                                                                         | all    |
| transition-duration        | 트랜지션이 일어나는 지속시간(duration)을 초 단위(s) 또는 밀리 초 단위(ms)로 지정한다                                   | 0s     |
| transition-timing-function | 트랜지션 효과를 위한 수치 함수를 지정한다.                                                                             | ease   |
| transition-delay           | 프로퍼티가 변화한 시점과 트랜지션이 실제로 시작하는 사이에 대기하는 시간을 초 단위(s) 또는 밀리 초 단위(ms)로 지정한다 | 0s     |
| transition                 | 모든 트랜지션 프로퍼티를 한번에 지정한다 (shorthand syntax)                                                            |
