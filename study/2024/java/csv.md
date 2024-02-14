# csv

    csv : comma separated values(콤마로 구분된 값)

## 읽기 예시

```java
br = Files.newBufferedReader(Paths.get("C:\\Users\\world\\Desktop\\employee1.csv"));            
//Charset.forName("UTF-8");            
String line = "";                        
while((line = br.readLine()) != null){                
    //CSV 1행을 저장하는 리스트                
    List<String> tmpList = new ArrayList<String>();                
    String array[] = line.split(",");                
    //배열에서 리스트 반환                
    tmpList = Arrays.asList(array);                
    System.out.println(tmpList);                
    ret.add(tmpList);            
}
```
