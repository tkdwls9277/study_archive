
## 한번 알아보자
- 소아아키텍처
- MSA 마이크로서비스아키텍처
- 커맨드패턴 파이프라인패턴 
- 컴포지트패턴
<br>
<br>

---------------------

   ## 모듈화의 단점
 - 모듈화를 하면 성능이 떨어진다.
 - 전체프로세스를 이해하는것이 어려움
 - 결합도가 낮다고 생각한다면 순서를 제어할수 없다.
 <br><br>

 --------------------

 init, render는 디버깅 때문에라도 넣어주기

### Eccomposite 매뉴얼이 있는 ecount gitlab

>http://git.ecount.kr/ecount/ecount-doc/tree/master/Manual/Eccomposite


async<br>
리로드<br>
복원<br>
reloadpage",
<br>

내일부터 todolist 만들기

```
e.page.factory("e.page.common", "ESD007M", {
    //init
    init: function (option) {
        this._super.init.apply(this, arguments);
    },

    //render
    render: function (option) {
        this._super.render.apply(this, arguments);
    },

    initProperties: function () {
        //columnMap 정의
        this.pageOption.columnMap = {
            //요청정보
            grid: {
                IO_DATE: "IO_DATE", IO_NO: "IO_NO", IO_TYPE: "IO_TYPE", F_FLAG: "F_FLAG", VERSION: "VERSION_NO", GB_TYPE: "GB_TYPE", WRITER_ID: "WRITER_ID",
				WID: "WID", IN_PART_WRITER: "IN_PART_WRITER", IN_PART: "IN_PART"
            }
        };

        //현재 페이지의 정보
        this.pageInfo = {
            title: "안녕",//타이틀
            permitMenuName: ecount.resource.LBL02935,//권한체크시 전표명칭
            name: "ESD007M",//페이지명			


            pageHeader: [
				{ 
					group: "header", id: "header",
					
					child:[
						{ unit: "widget", type: "outputTitle" },
					]
			}
            ],

            pageContents: [

            ],

            pageFooter: [

            ],

            pageFunction: [

            ],
        };
    },
});
```
