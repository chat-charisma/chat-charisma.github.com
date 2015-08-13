(function(){
  var ua = navigator.userAgent.toUpperCase();
  var url = document.location.pathname;
  var spDir = '../gallery/sp/';
  (ua.indexOf('IPHONE') != -1 || (ua.indexOf('ANDROID') != -1 && ua.indexOf('MOBILE') != -1))? isSP() : isPC();
  function isSP(){
    if(url.match(spDir)){
      return false;
    }else{
      location.href = spDir;
    }
  }
  function isPC(){
    if(!url.match(spDir)){
      return false;
    }else{
      location.href = '/';
    }
  }
}());
