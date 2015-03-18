/*===========================================================
	Copyright: (c)visual and echo japan
	Created: 2014-12-11
===========================================================*/

$(function(){
	
	$('.smooth').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed);
		return false;
	});
	
	$("#sec01 .btnP").on("click", function() {
		$("#blueList").slideToggle();
		$(this).toggleClass("active");
		return false;
	});
	
	$("#sec02 .btnP").on("click", function() {
		$("#orangeList").slideToggle();
		$(this).toggleClass("active");
		return false;
	});
	
});