const btn = document.querySelector("#exec");
const hor = document.querySelector("#hor");
const ver = document.querySelector("#ver");
const mine = document.querySelector("#mine");
const table = document.querySelector("#table");
const tbody = table.querySelector("tbody");

//js
//phaser3

//팀노바, 위코드

//지뢰깔기
function makeMine(shuffle, dataset){
    for(var i = 0;i<shuffle.length;i++){
        var horizon = Math.floor(shuffle[i]/10);
        var vertical = shuffle[i]%10;

        tbody.children[horizon].children[vertical].textContent="X";
        dataset[horizon][vertical]="X";
        
    }
    return dataset;
}

//지뢰위치
function searchMineLocation(count){
    var minelocation = Array(count)
    .fill()
    .map(function(item, index){
        return index;
    });
    var shuffle = [];
    
    while(minelocation.length>80){
        var location = minelocation.splice(Math.floor(Math.random()*minelocation.length),1)[0];
        shuffle.push(location);
    }

    return shuffle;
}

//지뢰찾기 테이블
function drewMineTable(){
    var hor = this.hor.value,
        ver = this.ver.value,
        mine = this.mine.value;

    var dataset=[];

    for(var i=0;i<ver;i++){
        const arr=[];
        const tr = document.createElement("tr");
        dataset.push(arr);
        for(var j=0;j<hor;j++){
            arr.push(1);
            var td=document.createElement("td");
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    var shuffle = searchMineLocation(hor*ver);
    var dataset = makeMine(shuffle, dataset);
    console.log(dataset);
}

function init(){
    drewMineTable();
    btn.addEventListener("click",drewMineTable);
}

init();