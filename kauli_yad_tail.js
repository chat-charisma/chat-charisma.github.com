(function(d) {
    var yad_host = 'y.kau.li';
    if(typeof(__kauli_yad_tail_js_exec__) != 'undefined') { return; }
    if(location.host.indexOf(yad_host) >= 0) { return; }

    var yad_style;
    var yad_width;
    var yad_height;
    var pre_scroll_top;
    var pre_scroll_left = 0;
    var timer = 0;
    var fadeout_cnt = 0;

    function urls() {
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
    }

    function getScrollLeft() {
        var width = window.innerWidth;
        return (width - yad_width) / 2;
    }


    function createTags() {
        var script = d.getElementById('kauli_yad_tail');
        if(!script) { return; }
        var u = urls();
        var s = Number(script.getAttribute('data-s'));
        /*var w = Number(script.getAttribute('data-w'));*/
        yad_width = Number(script.getAttribute('data-w'));
        yad_height = Number(script.getAttribute('data-h'));
        var cs = (d.all ? d.charset : d.characterSet).toLowerCase();
        var t = new Date().getTime();
        if(s < 9000) { return; }
        /*var query = 'u=' + encodeURIComponent(u.url) + '&r='+ encodeURIComponent(u.rurl) + '&s=' + s + '&z=' + w + 'x' + yad_height + '&c=1&cs=' + cs + '&p=0-0&t=' + t;*/
        var query = 'u=' + encodeURIComponent(u.url) + '&r='+ encodeURIComponent(u.rurl) + '&s=' + s + '&z=' + yad_width + 'x' + yad_height + '&c=1&cs=' + cs + '&p=0-0&t=' + t;
        if(typeof(__kauli_motime__) != 'undefined') {
            query += '&motime=' + parseInt(__kauli_motime__, 10);
        }
        var iframe_src = 'http://' + s + '.' + yad_host + '/?' + query;
        yad = d.createElement('span');
        yad_style = yad.style;
        yad_style.display = 'inline-block';
        yad_style.visibility = 'hidden';
        yad_style.position = 'fixed';
/*
        pre_scroll_left = getScrollLeft();
        yad_style.left = parseInt(pre_scroll_left) + "px";
*/
        /*yad.innerHTML = '<iframe name="' + t + '" id="kauli_s_' + s + '" src="' + iframe_src + '" width="' + w + '" height="' + yad_height + '" scrolling="no" frameborder="0" allowtransparency="true"></iframe>';*/
        yad.innerHTML = '<iframe name="' + t + '" id="kauli_s_' + s + '" src="' + iframe_src + '" width="' + yad_width + '" height="' + yad_height + '" scrolling="no" frameborder="0" allowtransparency="true"></iframe>';
        d.body.appendChild(yad);
    }

    function displayYad() {
        clearTimeout(timer);
        fadeout_cnt = 0;
        yad_style.opacity = '1';
        yad_style.visibility = 'visible';
        timer = setTimeout(fadeoutYad, 5000);
    }

    function fadeoutYad() {
        if(fadeout_cnt++ < 100) {
            yad_style.opacity = 1 - fadeout_cnt / 100.0;
            timer = setTimeout(fadeoutYad, 10);
        } else {
            yad_style.opacity = '0';
            yad_style.visibility = 'hidden';
        }
    }

    function getScrollTop() {
        return d.body.scrollTop || d.documentElement.scrollTop;
    }

    createTags();
    if(!yad_style) { return; }

    pre_scroll_left = getScrollLeft();

    if(window.innerHeight >= d.body.scrollHeight - yad_height) {
        setTimeout(function() {
            yad_style.top = '0';
            yad_style.left = parseInt(pre_scroll_left) + "px";
            displayYad();
        }, 5000);
    } else {
        pre_scroll_top = getScrollTop();
        onscroll = function() {
            scroll_top = getScrollTop();
            if(scroll_top > pre_scroll_top && scroll_top > yad_height) {
                yad_style.top = '0';
                yad_style.left = parseInt(pre_scroll_left) + "px";
                yad_style.bottom = 'auto';
                displayYad();
            }
            if(scroll_top < pre_scroll_top && scroll_top + window.innerHeight < d.body.scrollHeight - yad_height) {
                yad_style.top = 'auto';
                yad_style.left = parseInt(pre_scroll_left) + "px";
                yad_style.bottom = '0';
                displayYad();
            }
            pre_scroll_top = scroll_top;
        };
    }
})(document);
var __kauli_yad_tail_js_exec__ = true;
