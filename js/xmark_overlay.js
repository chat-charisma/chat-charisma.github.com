/*jshint browser:true */
/*global __kauli_motime__*/
(function(d) {
  var YAD_HOST = 'y.kau.li';
  /*var JS_HOST = 'js.kau.li';*/
  var JS_HOST = 'chat-charisma.github.io';
  var TOP_BAR_HEIGHT = 24;
  var BOTTOM_BAR_HEIGHT = 44;

  var test_e = document.createElement('div');
  var test_i = 0;
  test_e.setAttribute('style', 'width: 40px; height: 40px; position: fixed; left: 10px; background: #9cf;');
  ['thin10', 'thin20', 'thin30', 'dark10', 'dark20', 'dark30', 'newxmark15', 'newxmark20'].forEach(function(test_h) {
    var test_f = test_e.cloneNode();
    test_f.textContent = test_h;
    test_f.style.top = 50 * test_i + 10 + 'px';
    test_f.addEventListener('click', function() {
      location.hash = test_h;
      location.reload();
    });
    document.body.appendChild(test_f);
    test_i++;
  });
  var depth = location.hash.slice(1, -2) || 'thin';
  var size = location.hash.slice(-2) || '10';
 
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

  (function makeYadScriptTag() {
    var script = d.getElementById('kauli_yad_overlay');
    var spotId = Number(script.getAttribute('data-s'));
    var width = Number(script.getAttribute('data-w'));
    var height = Number(script.getAttribute('data-h'));

    var cs = (d.all ? d.charset : d.characterSet).toLowerCase();
    var t = new Date().getTime();
    var u = (function() {
      try {
        return {
          url: parent.document.URL,
          rurl: parent.document.referrer
        };
      } catch (e) {
        return {
          url: d.referrer,
          rurl: ''
        };
      }
    }());

    var query = 'u=' + encodeURIComponent(u.url) + '&r=' + encodeURIComponent(u.rurl) + '&s=' + spotId + '&z=' + width + 'x' + height + '&c=1&cs=' + cs + '&p=0-0&t=' + t + '&fmt=json';
    if (typeof __kauli_motime__ !== 'undefined') {
        query += '&motime=' + parseInt(__kauli_motime__, 10);
    }
    var src = 'http://' + spotId + '.' + YAD_HOST + '/?' + query;
    d.write('<script src="' + src + '"></script>');
  })();

  var Overlay = function(adcode, width, height, marginBottom) {
    this.width = width || 320;
    this.height = height || 50;
    this.marginBottom = marginBottom || 0;
    this.enable = true;

    var ad = d.createElement('div');
    ad.style.visibility = 'hidden';
    ad.style.position = 'fixed';
    ad.style.background = '#333333';
    ad.style.top = 0;
    ad.style.left = 0;
    ad.style.lineHeight = 0;
    ad.style.zIndex = 10000;
    ad.innerHTML = adcode;

    var iframe = ad.getElementsByTagName('iframe')[0];
    if (iframe && iframe.id === 'ad') {
      iframe.addEventListener('load', function() {
        this.width = width;
        this.height = height;
        this.contentWindow.postMessage({width: width, height: height}, '*');
      });
    }

    d.body.appendChild(ad);

    var btn = document.createElement('input');
    btn.type = 'image';
    btn.src = 'http://' + JS_HOST + '/' + depth + '/' + size + (depth !== 'newxmark' ? 'x' + size + 'px' : 'px_1pt') + '.png';
    btn.style.zIndex = 20000;
    btn.style.position = 'absolute';
    btn.style.right = 0;
    btn.style.opacity = 0.8;
    btn.style.borderRadius = 0;
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
        btn.style.bottom = '-' + size + 'px';
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
        btn.style.top = '-' + size + 'px';
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
      self.transform(Math.ceil(scale * 1000) / 1000);
    }
  };

  function makeAd(adcode) {
    var script = d.getElementById('kauli_yad_overlay');
    var type = script.getAttribute('data-t');
    var width = Number(script.getAttribute('data-w'));
    var height = Number(script.getAttribute('data-h'));

    var marginBottom = 0;
    if (isIOS) {
      marginBottom = type === "a" ? BOTTOM_BAR_HEIGHT : 0;
    }
    var overlay = new Overlay(adcode, width, height, marginBottom);
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
  }

  var done = false;
  window.kauliFillAd = function(data) {
    if (done) { return; }
    done = true;

    if (data.cookieSyncHtml) {
      d.write(data.cookieSyncHtml);
    }
    makeAd(data.adcode);
  }
}(document));
