# String

- [참고 자료(poiemaweb)](https://poiemaweb.com/js-string)

String 객체는 원시 타입인 문자열을 다룰 때 유용한 프로퍼티와 메소드를 제공하는 레퍼(wrapper) 객체이다. 변수 또는 객체 프로퍼티가 문자열을 값으로 가지고 있다면 String 객체의 별도 생성없이 String 객체의 프로퍼티와 메소드를 사용할 수 있다.

원시 타입이 wrapper 객체의 메소드를 사용할 수 있는 이유는 원시 타입으로 프로퍼티나 메소드를 호출할 때 원시 타입과 연관된 wrapper 객체로 일시적으로 변환되어 프로토타입 객체를 공유하게 되기 때문이다.

<br /><br />

---

<br /><br />

## String Constructor

String 객체는 String 생성자 함수를 통해 생성할 수 있다. 이때 전달된 인자는 모두 문자열로 변환된다.

`new String(value);`

<br /><br />

---

<br /><br />

## String Property

- String.length

<br /><br />

---

<br /><br />

## String Method

- String.prototype.charAt(pos: number): string (ES1)
- String.prototype.concat(…strings: string[]): string (ES3)
- String.prototype.indexOf(searchString: string, fromIndex=0): number (ES1)
- String.prototype.lastIndexOf(searchString: string, fromIndex=this.length-1): number (ES1)
- String.prototype.replace(searchValue: string | RegExp, replaceValue: string | replacer: (substring: string, …args: any[]) => string): string): string (ES3)
- String.prototype.split(separator: string | RegExp, limit?: number): string[] (ES3)
- String.prototype.substring(start: number, end=this.length): string (ES3)
- String.prototype.slice(start?: number, end?: number): string (ES3)
- String.prototype.toLowerCase(): string (ES1)
- String.prototype.toUpperCase(): string (ES1)
- String.prototype.trim(): string (ES5)
- String.prototype.repeat(count: number): string (ES6)
- String​.prototype​.includes(searchString: string, position?: number): boolean (ES6)
