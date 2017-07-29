/* eslint-disable */
!function(vWidth) {
	function Adp() {
		var w = Math.min(window.innerWidth, document.documentElement.clientWidth);
		document.documentElement.style.fontSize = w / vWidth * 100 + "px"
	}
	var timer = null;
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
		clearTimeout(timer);
		timer = setTimeout(Adp, 0)
	}, false);
	window.addEventListener("pageshow", function(window) {
		window.persisted && (clearTimeout(timer), timer = setTimeout(Adp, 0))
	}, false);
	document.addEventListener("DOMContentLoaded", Adp, false)
}(750);
