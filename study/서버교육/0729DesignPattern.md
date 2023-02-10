디자인 패턴 2일차
===


solution
* DevExample의 관련기술및 용어 확인

<br>
09.커맨드 패턴
===


커맨드 패턴이란
---

객체의 행동을 별도의 클래스에 캡슐화해서 행동 객체에 확장성을 부여한다.

- 요청 자체를 캡슐화 하는 것입니다.

- 이를 통해 서로 다른 사용자(client)를 매개변수로 만들고, 요청을 대기시키거나 로깅하며, 되돌릴 수 있는 연산을 지원합니다.

- Client

  Concrete Command 를 생성하고 Receiver를 설정한다.

- Invoker

  클라이언트가 필요한 작업을 요청할 때 사용한다.

  커맨드 객체를 구성요소로 갖고 있으며 세터를 지원해서 반드시 커맨드 객체를 설정해야한다.

  Command 들을 관리하고 있고 Command 의 execute() 를 호출해서 Command 객체에게 특정 작업을 

  수행해 달라고 요청을 한다.

- Receiver

  실제 호출될 메소드를 갖고 있는 객체, 인보커를 거쳐 커맨드 객체로부터 특정 행동을 요청받는다.

  요구 사항을 처리하기 행하는 객체를 분리하고자 할 때 사용할 수 있다.

  위해 어떤 일을 수행해야 하는지 알고 있다. 

- Command

  모든 Command 객체에서 구현되어야 하는 인터페이스.

  Receiver에 전달할 일련의 행동들로 구성된 클래스로 행동과 리시버에 대한 정보가 들어있다.

  커맨드 객체에서 제공하는 메소드는 execute()로 Invoker의 요청을 받아 리시버에 있는 특정 메소드를 

  호출한다. 

- ConcreteCommand

  실제로 실행되는 기능을 구현한다.

  execute() 에서 Receiver 에 있는 Action 들을 호출해 요청받은 작업을 수행하도록 한다.

> 같은 모양새를 갖는 부분을 공통화 시켜준다.
>
> 캡슐화를 더 강하게 해주고 Invoker라는 실행자체를 대신해서 실행해주는 역할이 존재한다.
>
> 따라서, Invoker, Execute 와 같은 공통적인 메서드의 명칭을 통일시켜야 사용이 가능하다.
>
> 식당으로 예를 들면, **손님(Client)**이 **점원(Invoker)**에게 **주문(Command)**을 하는 것이
>
> 내부적으로는 **주방장(Receiver)**에게 **음식을 요리(ConcreateCommand)**하는 과정을 담고 있는 것이다.

 
<br>
사용목적 및 용도, 장점
---

각각의 커맨드들은 특정 객체에 의존하지 않도록 만들어지므로 재활용성이 매우 높다.

- 로직을 독립적으로 관리하기가 용이하다.
- 요청을 하는 객체와 그 요청을 수행하는 객체가 분리되어 있다.

> Undo의 기능은 커맨드 패턴의 장점이지만 이카운트에서는 사용하지 않는다.<br>
> Transaction 단위로 묶기 때문에 오류 발생시 해당 묶여있는 Transaction에 대해 Rollback이 가능.


<br>
소스코드 예시
---

```c#
//커맨드패턴만 적용된 예제이고 다른 디자인패턴은 적용되지 않은 상태. 예제를 위한 실습.
//팩토리메서드 패턴이 적용되어 있지는 않음.
//굳이 서빙하는 사람이 만드는 절차를 알고 있어야할 필요는 없기 때문에 결국에는 주문받은 제품만 커맨드에게 넘겨줘야 한다. 서빙하는 사람이 준비, 굽기, 자르기, 포장 등의 절차들을 알 필요가 없다.

<Before>
Pizza pizza = new CheesePizza();
pizza.Prepare();
pizza.Bake();
pizza.Cut();
pizza.Box();

<After>
Pizza pizza1 = new CheesePizza();
CookingCommand cooking = new CookingCommand(pizza1); // 최종적으로 하고 싶은 절차
OrderManager manager = new OrderManager();
manager.SetCommand(cooking);
manager.Order();
manager.Cancel();

// CookingCommand이라는 구상클래스에서 기존에 준비, 굽기, 자르기, 포장 등의 절차들을 정의한다.
// 실행하는 입장에서는 해당 절차들을 전부 알 필요가 없다.

```
<br>

---------------------------
<br><br>
10. 파이프라인 패턴
===

파이프라인 패턴이란
---

웹로그와 같은 텍스트 기반의 데이터 또는 프로그램 소스 코드 등과 같은 데이터 스트림을 처리하는데 적합하다.

- 각각의 프로세스는 필터 컴포넌트 내에서 처리되며, 데이터는 파이프를 통해 전달되어 처리되어진다.

  이러한 파이프는 버퍼링을 하거나 동기화 하는 목적으로 사용된다.


<br>
사용목적 및 용도, 장점
---

필터 추가가 쉬움

- 시스템 확장성이 좋음
- 필터 재사용 가능
- 주어진 필터들을 재구성하여 또 다른 파이프라인을 구축할 수 있음


<br>
소스코드 예시
---

```C#
<Before>
List<Dough> doughs = new List<Dough>();
foreach (var dough in doughs) {
    Console.WriteLine($"{ dough.Name } Preparing...");
    Console.WriteLine($"{ dough.Name } Bake for 25 minutes");
    Console.WriteLine($"{ dough.Name } Topping.....");
    dough.Name = "Cheese " + dough.Name;
    Console.WriteLine($"{ dough.Name } Cutting the pizza into diagnol slices");
    Console.WriteLine($"{ dough.Name } Placing pizza in official PizzaStore box......");
}

<After>
//----------------------------------------
// 피자만들기
//----------------------------------------
PizzaCookingPipeLine cooking = new PizzaCookingPipeLine();

cooking.Register(new PrepareFilter());
cooking.Register(new BakeFilter());
cooking.Register(new CheeseToppingFilter());
cooking.Register(new CutFilter());
cooking.Register(new BoxFilter());

List<Dough> pizzas = new List<Dough>();
pizzas.Add(new Dough() { Name = "Pizza 1" });
pizzas.Add(new Dough() { Name = "Pizza 2" });
pizzas.Add(new Dough() { Name = "Pizza 3" });
cooking.Execute(pizzas);
// 실행이 되는 시점에 도우를 3(개) 넣어 준다.

//----------------------------------------
// 공통 조리과정 만들기
// 조리과정을 하나의 파이프라인으로 등록해놓음. 전, 후 과정
// 중간에 피자종류가 다른 경우에만 변동성이 있기 때문에 그외의 공통적인 기능은 기능별로 통합시켜준다.
//----------------------------------------
PizzaCookingPipeLine preCooking = new PizzaCookingPipeLine();
preCooking.Register(new PrepareFilter());
preCooking.Register(new BakeFilter());

PizzaCookingPipeLine postCooking = new PizzaCookingPipeLine();
postCooking.Register(new CutFilter());
postCooking.Register(new BoxFilter());

//----------------------------------------
// 치즈피자만들기
//----------------------------------------
List<Dough> cheesePizzas = new List<Dough>();
cheesePizzas.Add(new Dough() { Name = "Pizza 1" });
cheesePizzas.Add(new Dough() { Name = "Pizza 2" });
cheesePizzas.Add(new Dough() { Name = "Pizza 3" });

// 공정을 공통적으로 만들어 놓고 재활용한다.
PizzaCookingPipeLine cheesePizzaCooking = new PizzaCookingPipeLine();
cheesePizzaCooking.Register(preCooking);
cheesePizzaCooking.Register(new CheeseToppingFilter());
cheesePizzaCooking.Register(postCooking);
cheesePizzaCooking.Execute(cheesePizzas);

//----------------------------------------
// 페페로니피자만들기
//----------------------------------------
List<Dough> pepperoniPizzas = new List<Dough>();
pepperoniPizzas.Add(new Dough() { Name = "Pizza 1" });
pepperoniPizzas.Add(new Dough() { Name = "Pizza 2" });
pepperoniPizzas.Add(new Dough() { Name = "Pizza 3" });

PizzaCookingPipeLine pepperoniPizzaCooking = new PizzaCookingPipeLine();
pepperoniPizzaCooking.Register(preCooking);
pepperoniPizzaCooking.Register(new PepperoniToppingFilter());
pepperoniPizzaCooking.Register(postCooking);
pepperoniPizzaCooking.Execute(pepperoniPizzas);    

// CheeseToppingFilter, PepperoniToppingFilter 라인만 다르고 나머지 기능은 동일하다.
// 재사용성이 높아짐. 파이프라인 자체도 필터이다. 데코레이터와 상속구조가 비슷할 수 있다. 계속해서 담아놓고 진행을 하는 구조.
```
