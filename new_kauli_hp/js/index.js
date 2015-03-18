/*===========================================================
	Copyright: (c)visual and echo japan
	Created: 2014-12-11
===========================================================*/

$(function() {
	
	$('.smooth').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed);
		return false;
	});
	
	$("#sec01ImgA").delay('300').animate({opacity:'1'},{duration:1200,easing:'easeInOutQuad'});
	$("#sec01ImgB").delay('500').animate({opacity:'1'},{duration:1200,easing:'easeInOutQuad'});
	$("#sec01ImgC").delay('700').animate({opacity:'1'},{duration:1200,easing:'easeInOutQuad'});
	$("#sec01 #secText01 h2").delay('1200').animate({opacity:'1'},{duration:1500,easing:'easeInOutQuad'});
	$("#sec01 #secText01 p").delay('1600').animate({opacity:'1'},{duration:1500,easing:'easeInOutQuad'});
	 
	var ua = navigator.userAgent;
	
	if (ua.indexOf('MSIE') != -1 || ua.indexOf('Trident') != -1 ) {
		scrLength = 200;
		scrSpeed = 500;
		scrEasing = 'easeOutCirc';
	
		var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
		$(document).on(mousewheelevent,function(e){
			e.preventDefault();
			var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
			if (delta < 0){
				scrSet =  $(document).scrollTop()+scrLength;
			} else {
				scrSet =  $(document).scrollTop()-scrLength;
			}
			$('html,body').stop().animate({scrollTop:scrSet},scrSpeed,scrEasing);
			return false;
		});
	}
	
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0) {}
	else{
	 $(window).scroll(function(){
		var y = $(this).scrollTop();
		$('#sec01ImgA').css('background-position', '0 ' + parseInt( y / 1.5 ) + 'px');
		$('#sec01ImgB').css('background-position', '0 ' + parseInt( y / 1.5 ) + 'px');
		$('#sec01ImgC').css('background-position', '0 ' + parseInt( y / 1.5 ) + 'px');
		
		$('#sec02 .secInner').css('background-position', '0 ' + parseInt( -y / 4 ) + 'px');
		
		$('#sec03 .secInner').css('background-position', '0 ' + parseInt( -y / 3 ) + 'px');
	});
 }
 
	
});