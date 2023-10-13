# 해쉬 테이블

브루트 포스(완전 탐색)으로는 시간초과에 빠지게 되는 문제에서는 해시를 적용시켜야 한다.

N(1~100000)의 값만큼 문자열이 입력된다.

처음 입력되는 문자열은 "OK", 들어온 적이 있던 문자열은 "문자열+index"로 출력하면 된다.

문제를 이해하는 건 쉽다. 똑같은 문자열이 들어왔는지 체크해보고, 들어온 문자열은 인덱스 번호를 부여해서 출력해주면 된다.

하지만, 현재 N값은 최대 10만이다. 브루트 포스로 접근하면 N^2이 되므로 100억번의 연산이 필요해서 시간초과에 빠질 것이다. 따라서 **'해시 테이블'**을 이용해 해결해야 한다.

입력된 문자열 값을 해시 키로 변환시켜 저장하면서 최대한 시간을 줄여나가도록 구현해야 한다.

<br/>

---

<br/>

## 구현

해시 테이블은 탐색을 최대한 줄여주기 위해, input에 대한 key 값을 얻어내서 관리하는 방식이다.

현재 최대 N 값은 10만이다. 이차원 배열로 1000/100으로 나누어 관리하면, 더 효율적일 것이다.

충돌 값이 들어오는 것을 감안해 최대한 고려해서, 나는 두번째 배열 값에 4를 곱해서 선언한다.

key 값을 얻어서 저장할 때, 서로다른 문자열이라도 같은 key 값으로 들어올 수 있다.
(이것이 해시에 대한 이론을 배울 때 나오는 충돌 현상이다.)

충돌이 일어나는 것을 최대한 피해야하지만, 무조건 피할 수 있다는 보장은 없다. 그래서 두번째 배열 값을 조금 넉넉히 선언해두는 것이다.

HASH_VAL 값은 우리가 input 값을 받았을 때 해당하는 key 값을 얻을 때 활용한다.

최대한 input 값들마다 key 값이 겹치지 않기 위해 하기 위해서는 소수로 선언해야한다. (그래서 보통 17, 19, 23으로 선언하는 것 같다.)

```java
package CodeForces;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Solution {

	static final int HASH_SIZE = 1000;
	static final int HASH_LEN = 400;
	static final int HASH_VAL = 17; // 소수로 할 것

	static int[][] data = new int[HASH_SIZE][HASH_LEN];
	static int[] length = new int[HASH_SIZE];
	static String[][] s_data = new String[HASH_SIZE][HASH_LEN];
	static String str;
	static int N;

	public static void main(String[] args) throws Exception {

		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();

		N = Integer.parseInt(br.readLine()); // 입력 수 (1~100000)

		for (int i = 0; i < N; i++) {

			str = br.readLine();

			int key = getHashKey(str);
			int cnt = checking(key);

			if(cnt != -1) { // 이미 들어왔던 문자열
				sb.append(str).append(cnt).append("\n");
			}
			else sb.append("OK").append("\n");
		}

		System.out.println(sb.toString());
	}

	public static int getHashKey(String str) {

		int key = 0;

		for (int i = 0; i < str.length(); i++) {
			key = (key * HASH_VAL) + str.charAt(i) + HASH_VAL;
		}

		if(key < 0) key = -key; // 만약 key 값이 음수면 양수로 바꿔주기

		return key % HASH_SIZE;

	}

	public static int checking(int key) {

		int len = length[key]; // 현재 key에 담긴 수 (같은 key 값으로 들어오는 문자열이 있을 수 있다)

		if(len != 0) { // 이미 들어온 적 있음

			for (int i = 0; i < len; i++) { // 이미 들어온 문자열이 해당 key 배열에 있는지 확인
				if(str.equals(s_data[key][i])) {
					data[key][i]++;
					return data[key][i];
				}
			}

		}

		// 들어온 적이 없었으면 해당 key배열에서 문자열을 저장하고 길이 1 늘리기
		s_data[key][length[key]++] = str;

		return -1; // 처음으로 들어가는 경우 -1 리턴
	}

}
```
