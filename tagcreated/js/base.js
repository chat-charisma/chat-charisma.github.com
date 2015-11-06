var count=document.getElementsByTagName("script").lenght;
var script=document.createElement("script");
script.src="./js/unlimited.js";
var head=document.getElementsByTagName("head");
head[0].appendChild(script);
setTimeout(function sto(){
  document.getElementsByTagName("script").length==count?setTimeout(sto,100):alert(resText);
},100);
