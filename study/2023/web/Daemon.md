# daemon(데몬)
    사용자가 직접적으로 제어하지 않고, 백그라운드에서 돌면서 여러 작업을 하는 프로그램
    시스템 로그를 남기는 `syslogd`처럼 보통 데몬을 뜻하는 'd'를 이름 끝에 달고 있으며, 일반적으로 프로세스로 실행된다.

[참고자료1](https://wildeveloperetrain.tistory.com/168)

[참고자료2](https://dahye-jeong.gitbook.io/til/os/linux/2020-07-19-linux-daemon)


<br />

기술적으로 엄밀히 말하자면, 유닉스에서 부모 프로세스가 PID 1(init)이고 제어하는 터미널이 없을 때 그 프로세스를 데몬이라 할 수 있다. 부모 프로세스가 종료되면 init 프로세스가 그 프로세스를 받아 들인다. 데몬을 만들려면 보통 다음과 같은 과정이 필요하다.

- 프로세스를 제어하고 있는 터미널로부터 분리한다. (fork호출, 부모 프로세스는 exit호출)
- 프로세스를 세션 리더로 만든다.
- 프로세스를 프로세스 그룹의 리더로 만든다. (setsid() 호출)
- (한 번이나 두 번) 포크한 뒤 프로세스를 종료하여 자식 프로세스가 백그라운드에 남게 한다. 이 방법은 세션 리더를 만드는 데도 쓰이며, 부모 프로세스를 종료하지 않고 일반적인 작업을 수행할 수도 있다. 이 방법을 요약하여 ‘fork off and die’라고 한다.
- 루트 디렉터리("/")를 현재 작업 디렉터리로 만든다. (chdir("/") 호출)
- umask를 0으로 변경해서 호출한 쪽의 umask와 상관 없이 open(), creat() 등의 호출을 수행할 수 있도록 한다. (umask(0)호출)
- 상속받았으며, 부모 프로세스가 열고 있는 파일들을 자식 프로세스에서 모두 닫는다. 여기에는 0, 1, 2번 파일 서술자(각각 stdin, stdout, stderr)도 포함된다.
- 로그 파일이나 콘솔, 또는 /dev/null을 stdin, stdout, stderr로 설정한다.

<br />

---

<br />

## 데몬이 실행되는 방식

**1. Stand alone**

데몬이 독자적으로 구동되는 방식으로 혼자서 요청을 받아 처리한다. 메모리에 상주하며 항상 구동되고 있기 때문에 요청에 대한 응답 속도가 빨라서 요청이 빈번하게 일어나는 프로세스에 많이 사용된다.

속도는 빠르지만 메모리에 계속 상주하며 구동되고 있기 때문에 부하를 줄 수 있다.

ex) sendmail, apache, mysqld

 

**2. Xinetd**

다른 데몬들의 상위에 존재하며, 슈퍼 데몬(Super Daemon)이라고도 한다.

요청이 왔을 때 자신(xinetd)에게 종속된 하위 데몬을 실행시키는 방식이지만, xinetd 자체는 stand alone 방식으로 동작한다.

하위 데몬의 기준으로 본다면 응답 처리 속도는 위 stand alone 방식에 비해서 느리지만, 요청이 들어오지 않을 때는 휴먼 상태가 되어 메모리를 사용하지 않는다는 장점이 있으며, 요청이 빈번하지 않은 서비스에서 사용된다.

ex) telnet, finger, ftp, shell

 

윈도우 운영체제에서는 서비스(Service)가 데몬과 같은 역할을 하는 백그라운드 프로세스


<br />

---

<br />

## 관련 유틸리티

- ntsysv : 현재 구동된 실행 레벨에 대한 설정을 할 수 있다. /usr/bin/ntsysv 실행시 실행되며, setup 유틸리티를 실행해 'System Service' 를 선택해도 된다.

```bash
$ ntsysv --level 5 #실행 레벨 5 서비스 데몬 설정
$ ntsysv #현재 구동중인 레벨의 서비스 데몬 설정
```

- chkconfig : 텍스트 기반의 명령형 프로그램으로 실행 레벨에 따른 서비스의 on/off 설정 리스트를 출력하거나 설정

```bash
$ chkconfig --list #각 실행 레벨에서 서비스 설정 상태 보여줌
$ chkconfig --level 35 naemd on #실행 레벨 3,5에 대해서 named 서비스를 on
$ chkconfig --level 5 --del adsl #실행 레벨 5에서 adsl 서비스 삭제
$ chkconfig sendmail off # sendmail 서비스를 부팅시에 시작하지 않음. 특별히 레벨을 명시하지 않으면 2~5레벨이 on/off된다.
$ chkconfig telent on #텔넷 서비스를 on한다. xinetd 기반을 동작
$ chkconfig --list telnet #xinetd 기반으로 동작하는 서비스는 레벨을 보여주지 않고 사용가능 여부만 확인 가능하다. 
$ chkconfig --list xinetd #실행 레벨별 실행 여부는 해당 명령어로 확인
```