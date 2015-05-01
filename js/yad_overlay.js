/*jshint browser:true */
/*global __kauli_motime__*/
(function(d) {
  var YAD_HOST = 'y.kau.li';
  var TOP_BAR_HEIGHT = 24;
  var BOTTOM_BAR_HEIGHT = 44;
 
  // copied from underscore.js
  var now = Date.now || function() { return new Date().getTime(); };
  var slice =  Array.prototype.slice;
  var delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };
  
  var debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
  
    var later = function() {
      var last = now() - timestamp;
  
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) { context = args = null; }
        }
      }
    };
  
    return function() {
      context = this;
      args = arguments;
      timestamp = now();
      var callNow = immediate && !timeout;
      if (!timeout) { timeout = setTimeout(later, wait); }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
  
      return result;
    };
  };

  var loadedHeight = innerHeight;
  var isIOS = navigator.userAgent.match(/(iPhone|iPod|iPad)/);
  var isTouching = false;

  var LazyTimer = function() {
    var timerId;
    this.do = function(callback, time) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = delay(callback, time);
    };
  };
 
  var Overlay = function(spotId, width, height, marginBottom) {
    this.width = width || 320;
    this.height = height || 50;
    this.marginBottom = marginBottom || 0;
    this.enable = true;
    
    var ad = d.createElement('div');
    ad.setAttribute("id", "ad");
    ad.style.visibility = 'hidden';
    ad.style.position = 'fixed';
    ad.style.background = '#333333';
    ad.style.top = 0;
    ad.style.left = 0;
    ad.style.lineHeight = 0;
    ad.style.zIndex = 10000;

    var cs = (d.all ? d.charset : d.characterSet).toLowerCase();
    var t = new Date().getTime();
    var u = (function() {
      try {
        return {
          url: parent.d.URL,
          rurl: parent.d.referrer
        };
      } catch(e) {
        return {
          url: d.referrer,
          rurl: ''
        };
      }
    }());

    var query = 'u=' + encodeURIComponent(u.url) + '&r='+ encodeURIComponent(u.rurl) + '&s=' + spotId + '&z=' + width + 'x' + height + '&c=1&cs=' + cs + '&p=0-0&t=' + t;
    if(typeof __kauli_motime__ !== 'undefined') {
        query += '&motime=' + parseInt(__kauli_motime__, 10);
    }
    var iframe_src = 'http://' + spotId + '.' + YAD_HOST + '/?' + query;
    // var iframe_src = 'iframe320x50.html';
    ad.innerHTML = '<iframe name="' + t + '" id="kauli_overlay" src="' + iframe_src + '" width="' + width + '" height="' + height + '" scrolling="no" frameborder="0" allowtransparency="true" style="vertical-align: text-buttom;"></iframe>';
  
    d.body.appendChild(ad);

    var btn = document.createElement('button');
    btn.href = '#';
    btn.innerHTML = 'X';
    btn.style.zIndex = 20000;
    btn.style.position = 'absolute';
    btn.style.right = 0;
    btn.style.fontFamily = 'Arial, Helvetica, sans-serif';
    btn.style.fontSize = '20px';
    btn.style.color = '#363636';
    btn.style.padding = '6px 10px';
    btn.style.opacity = 0.8;
    btn.addEventListener('touchstart', function() {
      ad.remove(); 
      btn.remove();
    },false);
    
    ad.appendChild(btn);
    this.el = ad;

    // インスタンスが1度しか生成されない前提なので prototype で関数を定義していません
    var self = this;
    this.show = function() {
      if (self.el && self.enable && self.el.style.visibility === 'hidden' && !isTouching) {
        self.el.style.visibility = 'visible';
        self.el.style.opacity = 0;
        self.opacityTimer = setInterval(function() {
          var opacity = Number(self.el.style.opacity);
          if (!self.el || opacity >= 1) {
            clearInterval(self.opacityTimer);
            return;
          }
          self.el.style.opacity = opacity + 0.05;
        }, 50);
      }
    };
    this.hide = function() {
      if (self.el) {
        clearInterval(self.opacityTimer);
        self.el.style.visibility = 'hidden';
      }
    };
    this.moveCenter = function() {
      if (self.el) {
        var left = d.documentElement.clientWidth - self.width;
        self.el.style.left = left > 0 ? parseInt(left/2, 10) + 'px': 0;
      }
    };
    this.moveTop = function() {
      if (self.el) {
        if (isIOS && self.marginBottom > 0) {
          clearInterval(self.bottomTimer);
        }
        self.el.style.top = 0;
        self.el.style.bottom = 'auto';
        self.transformOrigin('top center');
        btn.style.top = 'auto';
        btn.style.bottom = '-35px';
      }
    };
    this.moveBottom = function() {
      if (self.el) {
        self.el.style.top = 'auto'
        if (isIOS && self.marginBottom > 0) {
          clearInterval(self.bottomTimer);
          self.bottomTimer = setInterval(function() {
            if (!self.el) {
              clearInterval(self.bottomTimer);
              return;
            }
            var bottom = (innerHeight - loadedHeight) * BOTTOM_BAR_HEIGHT / (TOP_BAR_HEIGHT + BOTTOM_BAR_HEIGHT) + self.marginBottom - BOTTOM_BAR_HEIGHT;
            self.el.style.bottom = (bottom > 0 ? bottom : 0) + 'px';
          });
        } else {
          self.el.style.bottom = self.marginBottom + 'px';
        }
        self.transformOrigin('bottom center');
        btn.style.top = '-35px';
        btn.style.bottom = 'auto';
      }
    };
    this.moveAuto = function() {
      if (self.el) {
        var scrollTop = d.body.scrollTop || d.documentElement.scrollTop;
        var clientHeight = d.documentElement.clientHeight;
        var scrollHeight = d.body.scrollHeight || d.documentElement.scrollHeight;
        if (scrollTop + clientHeight >= scrollHeight) {
          self.moveTop();
        }
        else {
          self.moveBottom();
        }
      }
    };
    this.transform = function(scale) {
      var style = self.el.style;
      scale = scale < 1.5 ? scale : 1.5; // 拡大率は最大1.5
      style.transform = style.webkitTransform = 'scale(' + scale + ')';
    };
    this.transformOrigin = function(origin) {
      var style = self.el.style;
      style.transformOrigin = style.webkitTransformOrigin = origin;
    };
    this.autoFit = function() {
      var scale = d.documentElement.clientWidth / self.width;
      self.transform(scale.toFixed(2));
    }
  };

  // main
  var script = d.getElementById('kauli_yad_overlay');
  var type = script.getAttribute('data-t');
  var spotId = Number(script.getAttribute('data-s'));
  var width = Number(script.getAttribute('data-w'));
  var height = Number(script.getAttribute('data-h'));

  var marginBottom = 0;
  if (isIOS) {
    marginBottom = type === "a" ? BOTTOM_BAR_HEIGHT : 0;
  }
  var overlay = new Overlay(spotId, width, height, marginBottom);
  overlay.moveCenter();
  overlay.moveAuto();
  if (type !== "d") {
    overlay.autoFit();
  }
  overlay.show();

  // 通常媒体、保守的媒体向け
  if (["c", "d"].indexOf(type) !== -1) {
    var lazyTimer = new LazyTimer();
    if(!isIOS) {
      d.addEventListener('scroll', debounce(function() {
        overlay.hide();
        lazyTimer.do(overlay.show, 1000);
      }, 100, true), false);
    }
    d.addEventListener('touchstart', function() { isTouching = true; overlay.hide(); }, false);
    d.addEventListener('touchend', function() { isTouching = false; lazyTimer.do(overlay.show, 500); }, false);
  }
  
  // スクロール位置(画面下部かどうか)によって表示位置を切り替える
  d.addEventListener('scroll', debounce(overlay.moveAuto, 100), false);

  // ウィンドウサイズの変化に対応する 
  var event = isIOS ? 'orientationchange' : 'resize';
  window.addEventListener(event, debounce(function() {
    if (type !== "d") {
      overlay.autoFit();
    }
    overlay.moveCenter();
    overlay.moveAuto();
  }, 100), false);
 
  // iOS 8.0 のバーニョキニョキ問題 
  if (isIOS) {
    // このイベントは多発しない
    window.addEventListener('resize', function() {
      overlay.moveAuto();
    });
  }
  // 向きの概念が存在しないならここで終了
  if (window.matchMedia("(orientation: portrait)").matches && window.matchMedia("(orientation: landscape)").matches) {
    return;
  }
  
  var handleOrientationChange = function (mql) {
    // portrait
    if (mql.matches) {
      overlay.enable = true;
      overlay.show();
    }
    // landscape
    else {
      overlay.enable = false;
      overlay.hide();
    }
  };

  var mql = window.matchMedia("(orientation: portrait)");
  mql.addListener(handleOrientationChange); // イベントに登録
  handleOrientationChange(mql);  // 初回読み込み
}(document));
