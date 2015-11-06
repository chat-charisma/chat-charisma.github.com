/*
var cnt=document.getElementsByTagName("script").lenght;
var script=document.createElement("script");
script.src="./js/unlimited.js";
var head=document.getElementsByTagName("head");
head[0].appendChild(script);
setTimeout(function sto(){
  (document.getElementsByTagName("script").length==cnt)?setTimeout(sto,100):alert(resText);
},100);
*/
var count = document.getElementsByTagName("script").length;
 
var script = document.createElement("script");
/*
script.src = "include.js";
*/
script.src="./js/unlimited.js";
var head = document.getElementsByTagName("head");
head[0].appendChild(script);
 
setTimeout(function() {
    // タグの数が増えていない場合は読み込みが完了していない
    if(document.getElementsByTagName("script").length == count) {
        // 自身を再起呼び出し
        setTimeout(arguments.callee, 100);
    }else{
        alert(resText);
    }
}, 100);
