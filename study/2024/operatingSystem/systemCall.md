# system call

> fork( ), exec( ), wait( )와 같은 것들은 Process 생성과 제어를 위한 System call
>
> fork, exec는 새로운 Process 생성과 관련. wait는 Process (Parent)가 만든 다른 Process(child) 가 끝날 때까지 기다리는 명령어


## fork 

> 새로운 Process를 생성할 때 사용.

parent와 child의 순서는 non-deterministic함. 즉, 확신할 수 없음. scheduler가 결정하는 일

## wait

> child 프로세스가 종료될 때까지 기다리는 작업

wait를 통해서, child의 실행이 끝날 때까지 기다려줌. parent가 먼저 실행되더라도, wait ()는 child가 끝나기 전에는 return하지 않으므로, 반드시 child가 먼저 실행됨.

## exec

> 단순 fork는 동일한 프로세스의 내용을 여러 번 동작할 때 사용함.
>
> child에서는 parent와 다른 동작을 하고 싶을 때는 exec를 사용할 수 있음.

exec가 실행되면,

execvp( 실행 파일, 전달 인자 ) 함수는, code segment 영역에 실행 파일의 코드를 읽어와서 덮어 씌운다.

씌운 이후에는, heap, stack, 다른 메모리 영역이 초기화되고, OS는 그냥 실행한다. 즉, 새로운 Process를 생성하지 않고, 현재 프로그램에 wc라는 파일을 실행한다. 그로인해서, execvp() 이후의 부분은 실행되지 않는다.