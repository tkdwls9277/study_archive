node의 객체
===

### console 객체
- 콘솔 화면에 문자열을 출력하는 메소드 
- 서버의 상태를 서버관리자에게 알려주기 위해 콘솔에 로그를 출력하거나 비슷한 용도로 사용
```
// consoleLogExample.js
console.log('숫자: %d + %d = %d', 10, 29, 10+29);
console.log('문자열: %s', 'Hello World!');
console.log('JSON: %j', { name: 'node.js' });
console.log('문자열을', '연결시킬수도 있습니다.');
```

### proscess 객체
-  프로그램과 관련된 정보를 나타내는 객체로 속성과 메소드가 많은 편
```
// processExample.js
console.log(process.env);           // 컴퓨터 환경과 관련된 정보를 가진 객체
console.log(process.version);       // node.js의 버전
console.log(process.versions);      // node.js와 연관된 프로그램들의 버전을 가진 객체
console.log(process.arch);          // 프로세서의 아키텍처(arm/ia32/x64)
console.log(process.platform);      // 플랫폼(win32/linux/sunos/freebsd/darwin)
console.log(process.memoryUsage()); // 메모리 사용 정보를 가진 객체
console.log(process.uptime());      // 현재 프로그램이 실행된 시간
```


### OS 모듈
- 애플리케이션에서 많이 사용되는 모듈은 아니지만 운영체제와 시스템의 정보를 가져올 수 있는 모듈. 
- 실행 환경에 따라서 결과 값이 다르게 나올 수 있음

```
// osExample.js
 
var os = require('os');
 
console.log(os.tmpdir());       // 임시 저장 폴더의 위치
console.log(os.endianness());   // CPU의 endianness(BE 또는 LE)
console.log(os.hostname());     // 호스트 이름(컴퓨터 이름)
console.log(os.type());         // 운영체제 이름
console.log(os.platform());     // 운영체제 플랫폼
console.log(os.arch());         // 운영체제 아키텍처
console.log(os.release());      // 운영체제 버전
console.log(os.uptime());       // 운영체제가 실행된 시간
console.log(os.loadavg());      // 로드 에버리지 정보를 담은 배열
console.log(os.totalmem());     // 시스템의 총 메모리
console.log(os.freemem());      // 시스템의 가용 메모리
console.log(os.cpus());         // CPU의 정보를 담은 객체
console.log(os.networkInterfaces()); // 네트워크 인터페이스 정보를 담은 배열
console.log(os.EOL);            // 운영체제의 개행 문자(\n 이나 \r\n 같은 문자)
```

### url 모듈
- url 정보를 객체로 가져와 분석하거나(parse) url 객체를 문자열로 바꿔주는 기능(format, resolve)을 수행
#### url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
- url 문자열(urlStr)을 url 객체로 변환하여 리턴. 
- parseQueryString과 slashesDenoteHost는 기본값으로 false

```
// urlExmaple.js
 
var url = require('url');
var parsedObject = url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
 
console.log(parsedObject); // url 객체 정보 출력
console.log(url.format(parsedObject)); // url 객체를 문자열로 출력
```

#### querystring 모듈
- querystring 모듈은 url 객체의 query와 관련된 모듈. 
- 분명 유용한 모듈이긴 하지만 url 모듈의 두 번째 인자 값을 조정함으로써 해결할 수도 있음.
```
// querystringExample.js
 
var querystring = require('querystring');
 
var qStr = 'where=nexearch&query=querystring&sm=top_hty&fbm=1&ie=utf8';
var qObj = querystring.parse(qStr); // 일반적인 사용
var qObj2 = querystring.parse(qStr, '&', '=', { maxKeys: 3 });
// 구분 문자열이 다를 경우 &와 = 자리에 해당 문자를 넣어 사용합니다.
// maxKeys로 3을 넘겨주면 값을 3개만 가져옵니다.
 
console.log(qObj); // 쿼리의 값들을 모두 가져옴
console.log(querystring.stringify(qObj));
console.log(querystring.stringify(qObj, '; ', '->'));
 
console.log(qObj2); // 쿼리의 값을 3개만 가져옴
console.log(querystring.stringify(qObj2));
console.log(querystring.stringify(qObj2, '; ', '->'));
```

### util 모듈
- node.js의 보조적인 유용한 기능들을 모아놓은 모듈
#### util.format(format, [...])
- console.log() 메소드와 비슷한 기능을 합니다. 
- 차이점 : console.log()는 화면에 출력하는 역할을 하지만 util.format은 문자열로 반환
```
// utilFormat.js
 
var util = require('util');
var data = util.format('%d, %s, %j', 10, 'abc', { name: 'node.js'});
 
console.log(data);
 
// 출력 결과
// 10, abc, {"name":"node.js"}
```

### crypto 모듈
- 해시 생성 및 암호화와 관련된 모듈.
```
// createHash.js
 
var crypto = require('crypto');
 
// 해시 생성
var shasum = crypto.createHash('sha1'); // shasum은 Hash 클래스의 인스턴스입니다.
shasum.update('이 문자열이 해싱됩니다.');
var output = shasum.digest('hex');
 
console.log(output);
 
// 실행 결과
// 3283b8e5763985f459afaba372d466666181839d
```
- 해시는 다른 data라도 같은 값이 나올 수가 있음.
- 단 방향성이므로 해싱된 값을 다시 원래의 data로 복구하는 것은 불가능
```
// createCipher.js
 
var crypto = require('crypto');
 
var key = 'myKey';      // 암호화, 복호화를 위한 키
var input = 'node.js';  // 암호화할 대상
 
// 암호화
var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
cipher.update(input, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값
 
// 복호화
var decipher = crypto.createDecipher('aes192', key); // Decipher 객체 생성
decipher.update(cipheredOutput, 'base64', 'utf8');   // 인코딩 방식에 따라 복호화
var decipheredOutput = decipher.final('utf8');       // 복호화된 결과 값
 
// 출력
console.log('기존 문자열: ' + input);
console.log('암호화된 문자열: ' + cipheredOutput);
console.log('복호화된 문자열: ' + decipheredOutput);


// 출력결과
// 기존 문자열: node.js
// 암호화된 문자열: iUuiYCnC6Gg0IWsqycqQ8w==
// 복호화된 문자열: node.js
```

## fs 모듈
-  FileSystem의 약자로 파일 처리와 관련된 모듈
### fs.readFile(filename, [options], callback)
- filename의 파일을 [options]의 방식으로 읽은 후 callback으로 전달된 함수를 호출(비동기적)
### fs.readFileSync(filename, [options])
- filename의 파일을 [options]의 방식으로 읽은 후 문자열을 반환(동기적)
```
// test.txt 파일
//fs 모듈
//파일 입출력 연습

//----------------------------

// readFile.js
 
var fs = require('fs');
 
// 동기적 읽기
var text = fs.readFileSync('text.txt', 'utf8');
console.log(text);
 
// 비동기적 읽기
fs.readFile('text.txt', 'utf8', function(err, data) {
    console.log(data);
});

//------------------------------

// 출력결과
// fs 모듈
// 파일 입출력 연습
// fs 모듈
// 파일 입출력 연습
```

### fs.writeFile(filename, data, [options], callback)
- filename의 파일에 [options]의 방식으로 data 내용을 쓴 후 callback 함수를 호출(비동기적)
### fs.writeFileSync(filename, data, [options])
- filename의 파일에 [options]의 방식으로 data 내용을 씀(동기적)
```
// writeFile.js
 
var fs = require('fs');
 
var data = 'Hello FileSystem';
 
fs.writeFile('text.txt', data, 'utf8', function(err) {
    console.log('비동기적 파일 쓰기 완료');
});
 
 
fs.writeFileSync('text2.txt', data, 'utf8');
console.log('동기적 파일 쓰기 완료');

//----------------------------

// 실행결과
// 동기적 파일 쓰기 완료
// 비동기적 파일 쓰기 완료
 
// $cat text.txt
// Hello FileSystem
 
// $cat text2.txt
// Hello FileSystem
```

#### 예외처리
- 동기적 방식에서는 자바스크립트의 일반적인 예외처리 방식인 try ~ catch 구문으로 처리