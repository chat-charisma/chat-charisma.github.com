/*===========================================================
	Copyright: (c)visual and echo japan
	Created: 2015-1-19
===========================================================*/

$(function() {
	
var map;
function initialize() {
    var latlng = new google.maps.LatLng(35.66078300000001,139.7040451);　//①
    var mapOptions = {
        zoom: 17,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//③
            var markerImg = new google.maps.MarkerImage( 
                "../images/marker_icon.png",                 
                new google.maps.Size(29,42), 
                new google.maps.Point(0, 0)
            ); 
 
    　　var marker = new google.maps.Marker({ 
                position: latlng, 
                map: map, 
                icon: markerImg, 
            }); 
 //②   
	 var styleOptions = [
			{              
					 　　　featureType: 'all',
								elementType:'all',
								stylers: [
									{hue:"#6993a1"},
									{gamma: 0.72},
									{lightness:-2},
									{saturation: -15},
									{invert_lightness: true}
								]
			},
			{
				featureType: 'road.highway',//高速道路を指定
				elementType: 'geometry',//高速道路全体を指定
				stylers: [{ saturation: -30 },{lightness:0},{hue:"#6993a1"}]
			},		
			{
			featureType:'poi.school',
			elementType:'all',
			stylers:[{visibility: 'off' }]
			},
			{
			featureType:'poi.business',
			elementType:'all',
			stylers:[{visibility: 'off' }]
			}
			];
			map.setOptions({styles: styleOptions});
	}
google.maps.event.addDomListener(window,'load',initialize);
});