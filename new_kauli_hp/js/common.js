/*===========================================================
	Copyright: (c)visual and echo japan
	Created: 2014-12-11
===========================================================*/
 
$(function() {
	var pagetop = $('#pageTop');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			pagetop.fadeIn();
		} else {
			pagetop.fadeOut();
		}
	});
	pagetop.click(function () {
		$('body, html').animate({ scrollTop: 0 }, 500);
		return false;
	});
	
	$('.btnHover img').hover(function(){
		$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
			}, function(){
			   $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
	});
	
	$("#productBtn,#productMenu li a").on("click", function() {
		$("#productMenu").slideToggle();
		$(this).toggleClass("active");
		//return false;
	});
	
});