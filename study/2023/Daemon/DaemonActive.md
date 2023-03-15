# 1. 데몬 실행 방법

[참고](https://velog.io/@qlgks1/%EB%A6%AC%EB%88%85%EC%8A%A4-%EB%8D%B0%EB%AA%ACDaemon)

## 1.1. Standalone type daemon

독립적으로 실행되며, 요청에 의해 실행되기 때문에 메모리에 항상 대기하는 데몬 방식이다.

따라서 요청에 대한 응답속도가 빠르지만, 항상 백그라운드에서 대기해야하므로 메모리 효율이 좋지 않다.

스탠드얼론은 /etc/init.d/ 나 /etc/rc.d/init.d/ 에 있는 스크립트 파일로 실행된다. 대표적으로 SSH 서비스를 찾아볼 수 있으며 이는 '해당 서비스 절대경로' + start/stop/restart 나 'service 서비스 이름' + start/stop/restart로 데몬을 시작하거나 멈추는 등 관리할 수 있다.

init 말고, systemd 에 대한 설명은 아래에 더 자세하기 한다.

## 1.2. Super daemon - inetd type daemon (xinetd)

Super Daemon이라는 특별한 데몬에 의해 간접적으로 실행되는 데몬이다.

사용자에 의한 요청이 발생할 경우, xinetd 프로그램이 해당 요청을 분석하여 필요한 데몬을 메모리에서 실행하여 응답하는 방식이다. (xinetd 자체는 standalone 방식으로 작동한다.) 원래는 inetd 이었으나 보안상 이유로 xinetd를 사용한다.

standalone방식보다 응답속도가 느리지만, 메모리 효율은 그에 비해 훨씬 좋다. 따라서 매우 빠른 응답속도가 필요하지 않을 경우에 사용한다.

Ubuntu에서는 기본적으로 Super daemon이 설치되지 않기에 Package Manager를 통해 설치해줘야 한다. 

```bash 
sudo apt install netkit-inetd
```

## 1.3. 주의 사항

- /etc/xinetd.d/ 디렉토리의 각 서비스파일에 등록되어 있는 데몬들이 root 계정으로 실행되고 있는지 확인

- /etc/xinetd.d/ 디렉토리의 각 서비스파일에 대한 일반유저의 권한은 실행, 읽기, 쓰기 모두 배제. 읽기 권한이 있다면 서버에서 어떤 서비스를 하고 있는지 알고 실행파일의 위치까지도 파악이 가능하기 때문이다.

- 서버관리자의 실수든 해킹된 것이든 /etc/xinetd.d/ 내의 파일들에게 쓰기( write ) 권한이 설정되어 있다면 어떤 프로그램이든지 만들어서 이 파일에 등록해 두면 root 의 권한으로 실행이 가능하게 되는 최악의 상황이 발생할 수 있다.

<br />

---

<br />

# 2. Daemon 실행, 관리

<br/>

## 2.1. systemctl

우선 둘 다(systemctl, service) 기본적으로 daemon (service)를 실행하기 위한 command line 이다.

systemctl에 대해 더 자세히 알아보자면, systemd 를 알아야 한다. (ubuntu) cat /proc/1/status command를 쳐보자. PID가 1인 프로세스가 init이 아니라, systemd 인 것을 확인할 수 있다. (또는 top command 로 1번 PID를 보자!)

<br />

![](images\daemonActive1.png)

<br />

- 예전의 PID 1이었던 init은 현재로부터 수 십 년 전에 처음 소개된 프로그램인데 그 때의 구조를 거의 바꾸지 않고 계속 기능이 추가되며 날이 갈수록 복잡해지는 프로그램들로 인해 효율이 떨어졌다.

- init은 시작할 프로그램을 구동하는 쉘 스크립트를 특정 run-level의 rc 디렉토리에 추가하는 방식의 구조를 가졌다. init은 부팅 과정에서 단계적으로 run-level을 올려가며 해당 run-level에 포함된 스크립트들을 순차적으로 실행시키니 설정이 복잡하고, 속도가 순차의 depth가 깊을수록 느려졌다.

- 이런 문제들을 해결하기 위해 Red Hat의 Lennart Poettering과 Kay Sievers이 systemd를 만들기 시작했다 - (GNU 약소 GPL 라이선스). systemd는 당연하지만 init보다 좋은 성능과 직관적인 설정을 가졌다.

- 의존성을 해치지 않으며 가능한 한 "병렬"로 시작 프로그램들을 실행시키는 것으로 부팅 속도를 끌어올리고, 프로그램 실행을 위한 파일로는 쉘 스크립트가 아니라 .service라는 systemd만의 unit을 통해 체계적이면서 가독성이 좋게 설정이 가능해졌다. 병렬로 서비스를 수행하기 때문에 서비스간의 종속성 및 실행 순서 관리가 매우 중요하다. 그리고 프로세스간의 통신은 D-bus 에서 담당한다. (소켓, D-bus 지원)

- 게다가 systemd는 단지 init 뿐만 아니라 다른 프로그램들의 기능들마저 가져와 추가하기 시작했다.

    - 컴퓨터의 네임서버 주소를 설정하는 resolvconf의 자리를 systemd-resolved가 DHCP 서버에서 IP를 받아와서 네트위크 인터페이스에 설정하는 dhcpcd의 자리를 systemd-networkd가 대체할 수 있게 기능을 추가 했다. 이외에도 시스템 내부의 udev가 systemd에 포함되는 등 여러 방면에서 systemd의 존재가 강력해지고 있다.
  
- 이렇게 systemd가 여러 영역을 아우르는 것을 보고 혹자들은 하나만 잘하자 라는 UNIX의 철학에 어긋난다고 말하기도 한다.

<br/>


## 2.2. systemd 구성

- systemd : init 데몬

- systemd-journald : 다른 데몬(프로세스)들의 출력(syslog, 표준, 에러 출력), 로그 저장 데몬

- systemd-logind : 사용자 로그인, 세션 등 관리 데몬

- systemd-udevd : 장치 관리자 데몬

- systemd-networkd : 네트워크 관리 데몬. DHCP 뿐만 아니라 Virtual Lan 설정까지 가능

- systemd-resolved : DNS 해석 데몬

- systemd-timesyncd : NTP로 컴퓨터 시간 동기화 데몬

- systemd-boot : UEFI 부트로더

몇몇 구성부분이 더 있지만 사용자가 어느정도 자주 접할 수 있는 것들은 위와 같다.

위에서부터 4개는 필수적으로 필요한 것 이고, 나머지들은 대체할 다른 프로그램이 있다면 설정, 실행하지 않아도 괜찮은 것들이다. 이러한 데몬이나 systemd의 사용자 설정파일은 /etc/systemd/ 에 존재한다.

<br/>

![](images\daemonActive2.png)

<br/>

- man systemd-user.conf 와 같이 man 명령어를 통해 해당 디렉토리에 있는 것들에 대한 메뉴얼 확인이 가능하다.

<br />

### 2.2.1. system 제어하기

1. 서비스 목록 확인 
   - systemctl list-unit-files

2. 서비스 시작, 종료, 재시작, 상태 확인
   - systemctl start|stop|restart|status [서비스명]

3. 서비스 활성화, 비활성화 
   - systemctl enable|disable [서비스명]
    - enable 명령은 관련 서비스를 /etc/systemd/system/[target]/ 경로에 링크파일을 생성한다.
    - disable 명령은 실행하면 링크파일을 삭제한다.

4. 서비스 갱신 
   - systemctl reload [서비스명]

5. 시스템 중지, 재부팅 
   - systemctl halt|reboot
    - 위 명령어는 AUTHENTICATING 이 필수이며, 무지성으로 사용하다가 큰일이 날 수 있으므로, 충분하게 확인하고 사용을 해야한다.

<br />

---

<br />

# 3. 직접 데몬 만들기

1. [unit name].service 파일을 systemd에 만든다.
   
2. 해당 service 파일은 systemd 의 unit 문법에 따라야 한다. (사실 이 부분이 가장 핵심이다. 해당 파일에 대한 얘기는 하나의 색션이 필요해서 다음에 꼭 다루겠다.) 샘플은 아래와 같다.

```unit
[Unit]
Description=Sample Service
Requires=local-fs.target
After=local-fs.target

[Service]
Type=simple
PIDFile=/var/run/sample.pid
ExecStart=/usr/sbin/sampled -d
ExecStop=/usr/sbin/sampled -k

[Install]
WantedBy=multi-user.target
```

3. systemctl enable [unit name] 명령으로 설치한다.
   
4. 이제 systemctl 명령어로 컨트롤을 한다.

## 3.1. service

- 기존에 시스템에서 데몬을 조작하기 위한 service 명령어다. 위 init 대신 systemd 가 어떻게 탄생했는지 다시 생각해 보자.

- /etc/init.d 디렉토리에 있는 링크파일들 대상으로 start, stop, restart, reload, status 를 할 수 있다.

- 위와 같이 systemd 가 등장하면서 systemctl 명령어를 사용할 수 있게 된 것이다. 사실 OS 특정 버전 부터는 (리눅스 기반인 OS) service를 수행해도 redirecting to /bin/systemctl start ***.service 라고 리다이렉팅 되어 systemctl로 실행이 되는 것이다.

- 사실 이제 service와 init은 잊고, systemctl 을 기억하는게 옳은 접근 방법 인 것이다.

### 3.1.1. Centos

- centos6까지는 /etc/rc.d/init.d 디렉토리에 서비스 관련 파일들이 있었고 이를 service 명령어를 통해 제어한다.

- ex) service [데몬이름] start

- centos7부터는 서비스들이 대부분 Unit으로 분리되었고, 서비스.service 형식의 파일명을 가지며, systemctl 명령어로 제어한다.

- ex) systemctl start [데몬이름]

- centos에서 데몬을 다루는 방법에 대해 더 자세한 명령어는 [이 글을 꼭 확인하길 바란다](https://server-talk.tistory.com/273)

