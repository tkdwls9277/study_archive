판매입력 신규개발, 구매입력 신규개발, 
견적서입력 신규개발, 생산입력 신규개발

```C#
var menu = string.Empty;

if(menu=="판매입력" || menu=="구매입력" || menu=="생산입력"){
    SaveHistory();
}

==> 대체할 수 있는 방법

var menu = string.Empty;
SaveHistory("판매입력");
//구프레임워크
public static void SaveHistory(string menu){
    if(menu=="판매입력" || menu=="구매입력" || menu=="생산입력"){
    todo
    }
}
//2버전
public static void SaveHistory(bool isSaveHistory){
    if(isHistory == true){

    }
}

public static void SaveHistory(string ProgramId){
    context.
}

//어떤 메뉴에 대해 이력을 쌓아라고 하는 것보다, 이런 조건일경우 쌓는 것
```


{
Request:
   {
       CODE:"00",
       CODE_NAME:"NA",
       BUSINESS_NO:"1",
       QTY:"1212",
       USE_YN:"Y"
   }
}   

FETCH = 단건
EXECUTE = 수정, 삭제