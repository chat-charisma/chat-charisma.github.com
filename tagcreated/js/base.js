var count = document.getElementsByTagName("script").length;
var script = document.createElement("script");
script.src="./js/unlimited.js";
var head = document.getElementsByTagName("head");
head[0].appendChild(script);
setTimeout(function() {
    document.getElementsByTagName("script").length == count?setTimeout(arguments.callee, 100):alert(resText);
}, 100);
