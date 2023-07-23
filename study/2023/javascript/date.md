# Date

Date 객체는 날짜와 시간(년, 월, 일, 시, 분, 초, 밀리초(천분의 1초(millisecond, ms)))을 위한 메소드를 제공하는 빌트인 객체이면서 생성자 함수이다.

Date 생성자 함수로 생성한 Date 객체는 내부적으로 숫자값을 갖는다. 이 값은 1970년 1월 1일 00:00(UTC)을 기점으로 현재 시간까지의 밀리초를 나타낸다.

UTC(협정 세계시: Coordinated Universal Time)는 GMT(그리니치 평균시: Greenwich Mean Time)로 불리기도 하는데 UTC와 GMT는 초의 소숫점 단위에서만 차이가 나기 때문에 일상에서는 혼용되어 사용된다. 기술적인 표기에서는 UTC가 사용된다.

KST(Korea Standard Time)는 UTC/GMT에 9시간을 더한 시간이다. 즉, KST는 UTC/GMT보다 9시간이 빠르다. 예를 들어, UTC 00:00 AM은 KST 09:00 AM이다.

현재의 날짜와 시간은 자바스크립트 코드가 동작한 시스템의 시계에 의해 결정된다. 시스템 시계의 설정(timezone, 시간)에 따라 서로 다른 값을 가질 수 있다.

<br/><br/>

---

<br/><br/>

## Date Constructor

-   new Date()
-   new Date(milliseconds)
-   new Date(dateString)
-   new Date(year, month[, day, hour, minute, second, millisecond])
-   Date 생성자 함수를 new 연산자없이 호출

<br/><br/>

---

<br/><br/>

## Date 메소드

-   Date.now
-   Date.parse
-   Date.UTC
-   Date.prototype.getFullYear
-   Date.prototype.setFullYear
-   Date.prototype.getMonth
-   Date.prototype.setMonth
-   Date.prototype.getDate
-   Date.prototype.setDate
-   Date.prototype.getDay
-   Date.prototype.getHours
-   Date.prototype.setHours
-   Date.prototype.getMinutes
-   Date.prototype.setMinutes
-   Date.prototype.getSeconds
-   Date.prototype.setSeconds
-   Date.prototype.getMilliseconds
-   Date.prototype.setMilliseconds
-   Date.prototype.getTime
-   Date.prototype.setTime
-   Date.prototype.getTimezoneOffset
-   Date.prototype.toDateString
-   Date.prototype.toTimeString
