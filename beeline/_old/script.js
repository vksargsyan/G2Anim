/* Adriver CatFish flash+HTML code. Last edited svetlana 22.09.2015 */

var ar_img_name = '',
ar_html = 'index.html',
ar_swf = '',
ar_width = '100%',
ar_height = '200',
ar_alt_link = '',
ar_zeropixel = '',
ar_flash_ver = 8,
ar_wmode = 'opaque';

/*------- no edit -------*/
var a = adriver(ar_ph);
new adriver.Plugin.require("html.adriver", "pixel.adriver","checkFlash.adriver", "makeFlash.adriver", "functions.adriver", "makeImage.adriver", "animate.adriver").onLoadComplete(function(){
	a.onDomReady(function(){
		a.sendPixel(ar_zeropixel);
		var params = {zIndex: 65000, position: (window.attachEvent?'absolute':'fixed'), width:a.normalize(ar_width), height:a.normalize(ar_height)}
		adriver.extend(a.p.style, params);
		a.reposition = function(){
					var s = a.p.style, g = a.getScreenGeometry();
					if(window.attachEvent){
						s.top = (g.ch+g.st - ar_height) + "px";
						s.left = ((ar_width.substring(ar_width.length-1)!='%')?((g.cw+g.sl)/2 - (ar_width/2)):0) + "px";
					}else{
						s.top = (g.ch - ar_height) + "px";
						s.left = ((ar_width.substring(ar_width.length-1)!='%')?((g.cw)/2 - (ar_width/2)):0) + "px";
					}
		}
		function getVH(o, al, va){
				var g = a.getScreenGeometry(), p = a.getPosition(o, 1);
				return {
					v: va!=3 ? parseInt(va) : (p.top+o.offsetHeight/2)<(g.st+g.ch/2) ? 1 : 0,
					h: al!=3 ? parseInt(al) : (p.left+o.offsetWidth/2)<(g.sl+g.cw/2) ? 1 : 0
				}
			}			
		a.hide=function() {a.p.parentNode.removeChild(a.p)};
		if (ar_html) {
			var d1 = a.addDiv(a.p, params, a.makeHTML(a.normalize(ar_width), a.normalize(ar_height), ar_html));
			var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
			var event = window[eventMethod];
			var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
			
			// Listen to message from child window
			event(messageEvent,function(e) {
				if (e.data == 'hideSG') a.hide();
				},false);
		}
		else if (a.hasFlash(ar_flash_ver)&&ar_swf) {
			var d1 = a.addDiv(a.p, params, a.makeFlash(ar_swf, {wmode:ar_wmode}));
			
		}
		else {
			a.p.innerHTML = a.makeCenteredImage(ar_img_name, ar_alt_link, ar_width, ar_height);		
		}
		a.addEvent(window, 'resize', a.reposition);
		if(window.attachEvent)a.addEvent(window, 'scroll', a.reposition);
		a.reposition();	
		
		a.loadComplete();
	})
});