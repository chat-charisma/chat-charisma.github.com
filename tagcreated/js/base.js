var cnt=document.getElementsByTagName("script").lenght;
var script=document.createElement("script");
script.src="./unlimited.js";
var head=document.getElementsByTagName("head");
head[0].appendChild(script);
setTimeout(function(){
  (document.getElementsByTagName("script").length==cnt)?setTimeout(arguments.callee,100):alert(resText);
},100);
