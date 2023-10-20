# 동적 계획법

흔히 말하는 DP가 바로 '동적 계획법'

한 가지 문제에 대해서, 단 한 번만 풀도록 만들어주는 알고리즘이다.

즉, 똑같은 연산을 반복하지 않도록 만들어준다. 실행 시간을 줄이기 위해 많이 이용되는 수학적 접근 방식의 알고리즘이라고 할 수 있다.

커다란 문제를 쉽게 해결하기 위해 작게 쪼개서 해결하는 방법인 분할 정복과 매우 유사하다. 하지만 간단한 문제로 만드는 과정에서 중복 여부에 대한 차이점이 존재한다.

즉, 동적 계획법은 간단한 작은 문제들 속에서 '계속 반복되는 연산'을 활용하여 빠르게 풀 수 있는 것이 핵심이다.

<br/>

### 조건

-   작은 문제에서 반복이 일어남
-   같은 문제는 항상 정답이 같음

같은 문제가 항상 정답이 같고, 반복적으로 일어난다는 점을 활용해 메모이제이션(Memoization)으로 큰 문제를 해결해나가는 것이다.

메모이제이션(Memoization) : 한 번 계산한 문제는 다시 계산하지 않도록 저장해두고 활용하는 방식

<br/>

### 구현 방식

-   Bottom-up : 작은 문제부터 차근차근 구하는 방법. 해결이 용이하지만, 가독성이 떨어짐
-   Top-down : 큰 문제를 풀다가 풀리지 않은 작은 문제가 있다면 그때 해결하는 방법 (재귀 방식). 가독성이 좋지만, 코드 작성이 힘듬

동적 계획법으로 문제를 풀 때는, 우선 작은 문제부터 해결해나가보는 것이 좋다.

작은 문제들을 풀어나가다보면 이전에 구해둔 더 작은 문제들이 활용되는 것을 확인하게 된다. 이에 대한 규칙을 찾았을 때 점화식을 도출해내어 동적 계획법을 적용시키자