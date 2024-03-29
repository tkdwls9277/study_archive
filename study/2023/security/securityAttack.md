# 보안공격(Security Attack)

보안 공격은 RFC 2828에 따라 분류하면 소극적 공격과 적극적 공격으로 나눌 수 있다

<br />

---

<br />

## 소극적 공격

<br />소극적 공격은 시스템으로부터 정보를 획득하거나 사용하려는 시도로, 시스템 자원에는 영향을 끼치지 않는다<br /><br />

![](images\securityAttack1.png)

<br />

- 전송 정보에 대한 도청이나 감시를 의미한다

- 공격자의 목표는 전송 중인 정보를 취득하는 것이다.

<br />

- 공격 유형

  1. 메시지 내용 갈취
  2. 트래픽 분석 - 암호화를 해도 트래픽 분석 가능
  3. 메시지 유형 관찰
  4. 통신자의 접속 위치와 신원 파악
  5. 교환 메시지 빈도 측정
  6. 메시지 크기 확인

<br />

- 소극적 공격에서는 공격자가 실제로 데이터를 변경하지 않는다

  - 공격을 당했는지 탐지하기가 어렵다
  - 송신자나 수신자는 제 3자가 메시지를 읽거나 트래픽 패턴을 관찰하는지를 알 수 없다

<br />

---

<br />

## 적극적 공격

<br />적극적 공경은 시스템 자원을 변경하거나 시스템 작동에 영향을 끼치는 공격 형태를 말한다.<br /><br />

![](images\securityAttack2.png)

<br />데이터 스트림을 수정하거나 가짜 데이터 스트림을 만드는 행위를 포함해서 4가지로 분류 가능하다

1. 신분 위장

   한 개체가 다른 개체의 행세를 하는 것이다.
   다른 형태의 적극적 공격과 병행된다

2. 재전송

   획득한 데이터 단위를 보관하고 있다가 시간이 경과한 후에 재전송한다
   인가되지 않은 사항에 접근하는 효과를 노리는 행위를 말한다

3. 메시지 수정

   메시지 수정,메시지 전송 지연, 순서 뒤바꾸어 인가 되지 않은 효과를 노리는 행위

4. 서비스 거부

   통신 설비가 정상적으로 운용되거나 관리 되지 못하도록 방해하는 행위를 말한다
   특정 목표물을 대상으로 할 수 있다.
