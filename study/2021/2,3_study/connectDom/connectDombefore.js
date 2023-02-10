
var mainPage = document.createElement("div");
    mainPage.id="mainPage";

    var divHeader = document.createElement("div");
    document.getElementById("mainPage").appendChild(divHeader);
    divHeader.className="header";
        var divToolbar = document.createElement("div");
        document.querySelector(".header").appendChild(divToolbar);
        divToolbar.className="toolbar";
            var divControl = document.createElement("div");
            document.querySelector(".toolbar").appendChild(divControl);
            divControl.className="control";
            document.querySelector(".control").appendChild(document.createTextNode("거래처등록"));
            var btnControl = document.createElement("button");
            document.querySelector(".toolbar").appendChild(btnControl);
            btnControl.className="control";
            btnControl.type="button";
            btnControl.value="option";
    
    var divContents = document.createElement("div");
    document.getElementById("mainPage").appendChild(divContents);
    divContents.className="contents";
        var tableForm = document.createElement("table");
        document.querySelector(".contents").appendChild(tableForm);
        tableForm.className="form";

            var tr1 = document.createElement("tr");
            document.querySelector(".form").appendChild(tr1);
            var a = document.querySelector(".form").appendChild(tr1);
                var td1 = document.createElement("td");
                a.appendChild(td1).appendChild(document.createTextNode("거래처코드"));
                var td2 = document.createElement("td");
                a.appendChild(td2);
                var td22=a.appendChild(td2);
                    var input1 = document.createElement("input");
                    td22.appendChild(input1);
                    input1.type="radio";
                    input1.name="G_GUBUN_CUST"
                    input1.value="01";
                    //input1.data-cid="G_GUBUN";
                    td22.appendChild(document.createTextNode("사업자등록번호"));

                    var input2 = document.createElement("input");
                    td22.appendChild(input2);
                    input2.type="radio";
                    input2.name="G_GUBUN_CUST"
                    input2.value="02";
                    //input1.data-cid="G_GUBUN";
                    td22.appendChild(document.createTextNode("비사업자(내국인)"));

                    var input3 = document.createElement("input");
                    td22.appendChild(input3);
                    input3.type="radio";
                    input3.name="G_GUBUN_CUST"
                    input3.value="03";
                    //input1.data-cid="G_GUBUN";
                    td22.appendChild(document.createTextNode("비사업자(외국인)"));

            var tr2 = document.createElement("tr");
            document.querySelector(".form").appendChild(tr2);
            var a = document.querySelector(".form").appendChild(tr2);
                var td3 = document.createElement("td");
                a.appendChild(td3).appendChild(document.createTextNode("외화거래처"));
                var td4 = document.createElement("td");
                a.appendChild(td4);
                a = a.appendChild(td4);
                var divCon = document.createElement("div");
                a.appendChild(divCon);
                var b=a.appendChild(divCon);
                divCon.className="control";
                    var Select = document.createElement("select");
                    //속성 두개 추가
                    b.appendChild(Select);
                    var c = b.appendChild(Select);
                        var option1=document.createElement("option");
                        c.appendChild(option1);
                        var d = c.appendChild(option1);
                        option1.value="0";
                        d.appendChild(document.createTextNode("사용안함"));

                        var option2=document.createElement("option");
                        c.appendChild(option2);
                        d = c.appendChild(option2);
                        option2.value="1";
                        d.appendChild(document.createTextNode("USD"));

                        var option3=document.createElement("option");
                        c.appendChild(option3);
                        d = c.appendChild(option3);
                        option3.value="2";
                        d.appendChild(document.createTextNode("중국원"));

                        var option4=document.createElement("option");
                        c.appendChild(option4);
                        d = c.appendChild(option4);
                        option4.value="add";
                        d.appendChild(document.createTextNode("추가"));

        var divFooter = document.createElement("div");
        document.getElementById("mainPage").appendChild(divFooter);
        a=document.getElementById("mainPage").appendChild(divFooter);
        divFooter.className="footer";
            var divTool=document.createElement("div");
            a.appendChild(divTool);
            b=a.appendChild(divTool);
            divTool.className="toolbar";
                var control1 = document.createElement("div");
                b.appendChild(control1);
                c=b.appendChild(control1);
                control1.className="control";
                    var btnNew=document.createElement("button");
                    c.appendChild(btnNew);
                    c.appendChild(document.createTextNode("New"));

                var control2 = document.createElement("div");
                b.appendChild(control2);
                c=b.appendChild(control2);
                control2.className="control";
                    var btnSave=document.createElement("button");
                    c.appendChild(btnSave);
                    c.appendChild(document.createTextNode("Save"));

                var control3 = document.createElement("div");
                b.appendChild(control3);
                c=b.appendChild(control3);
                control3.className="control";
                    var btnReset=document.createElement("button");
                    c.appendChild(btnReset);
                    c.appendChild(document.createTextNode("Reset"));
