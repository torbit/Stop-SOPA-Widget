(function() {
    function window_height() {
        if(typeof( window.innerWidth ) == 'number') {
            return window.innerHeight; // non-ie
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            return document.documentElement.clientHeight; //IE 6+ in 'standards compliant mode'
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            return document.body.clientHeight; //ie4
        }
        return 0;
    }
    
    window.TB_FIX_FLASH = function() {
        // loop through every embed tag on the site
        var embeds = document.getElementsByTagName('embed');
        for(i=0; i<embeds.length; i++)  {
            embed = embeds[i];
            var new_embed;
            // everything but Firefox & Konqueror
            if(embed.outerHTML) {
                var html = embed.outerHTML;
                // replace an existing wmode parameter
                if(html.match(/wmode\s*=\s*('|")[a-zA-Z]+('|")/i))
                    new_embed = html.replace(/wmode\s*=\s*('|")window('|")/i,"wmode='transparent'");
                // add a new wmode parameter
                else 
                    new_embed = html.replace(/<embed\s/i,"<embed wmode='transparent' ");
                // replace the old embed object with the fixed version
                embed.insertAdjacentHTML('beforeBegin',new_embed);
                embed.parentNode.removeChild(embed);
            } else {
                // cloneNode is buggy in some versions of Safari & Opera, but works fine in FF
                new_embed = embed.cloneNode(true);
                if(!new_embed.getAttribute('wmode') || new_embed.getAttribute('wmode').toLowerCase()=='window')
                    new_embed.setAttribute('wmode','transparent');
                embed.parentNode.replaceChild(new_embed,embed);
            }
        }
         // loop through every object tag on the site
        var objects = document.getElementsByTagName('object');
        for(i=0; i<objects.length; i++) {
            object = objects[i];
            var new_object;
            // object is an IE specific tag so we can use outerHTML here
            if(object.outerHTML) {
                var html = object.outerHTML;
                // replace an existing wmode parameter
                if(html.match(/<param\s+name\s*=\s*('|")wmode('|")\s+value\s*=\s*('|")[a-zA-Z]+('|")\s*\/?\>/i))
                    new_object = html.replace(/<param\s+name\s*=\s*('|")wmode('|")\s+value\s*=\s*('|")window('|")\s*\/?\>/i,"<param name='wmode' value='transparent' />");
                // add a new wmode parameter
                else 
                    new_object = html.replace(/<\/object\>/i,"<param name='wmode' value='transparent' />\n</object>");
                // loop through each of the param tags
                var children = object.childNodes;
                for(j=0; j<children.length; j++) {
                    if(children[j].getAttribute('name').match(/flashvars/i)) {
                        new_object = new_object.replace(/<param\s+name\s*=\s*('|")flashvars('|")\s+value\s*=\s*('|")[^'"]*('|")\s*\/?\>/i,"<param name='flashvars' value='"+children[j].getAttribute('value')+"' />");
                    }
                }
                // replace the old embed object with the fixed versiony
                object.insertAdjacentHTML('beforeBegin',new_object);
                object.parentNode.removeChild(object);
            }
        }
    }

    // Check if they already have a cookie (have seen this)
    var has_cookie = false;
    var cookies = document.cookie.split(' ');
    for ( var i = 0; i < cookies.length; i++ ) {
        if ( 0 === cookies[i].indexOf("TBSTOPSOPA=") ) {
            has_cookie = true;
            break;
        }
    }
    
    if ( !has_cookie || window.location.hash == '#stopsopa' ) {
        window.TB_CLOSE = function() {
            // Add the cookie so we don't see this message next time
            document.cookie = "TBSTOPSOPA=1; path=/";
            document.getElementById('torbit-stop-sopa').style.display = "none";
        }
	
	window.TB_INIT = function() {
	    // Make sure body exists and is ready
	    if ( !document.body ) {
		setTimeout( "window.TB_INIT()", 100 );
		return;
	    }
	    
	    // handle multiple installs on one page
	    if ( document.getElementById('torbit-stop-sopa') )
		return;
	    
	    //Add the CSS
	    var ss1 = document.createElement('style');
	    var def = "#torbit-stop-sopa{position:fixed;top:0;left:0;right:0;bottom:0;height:100%;width:100%;text-align:center;background-image:url('http://s1.torbit.com/img/ac63878eea31f19e90734d5784951ccbbcaaab9f-overlay.png');z-index:2147483647;display:none;display:expression((document.location.toString().split('#').slice(1) == this.id)?'block':'none')}* html #torbit-stop-sopa{background-image:url('http://s1.torbit.com/img/9cb5f6409f089f04a9fb91a5160c2a89ef84bd8c-x.gif');filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://s1.torbit.com/img/ac63878eea31f19e90734d5784951ccbbcaaab9f-overlay.png',sizingMethod='scale')}#torbit-stop-sopa:target{display:block}#tb_modal{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;padding:0;border:0;line-height:1;background:url('http://s1.torbit.com/img/ae1d47e12d165bcfa7fb88781fc372d2b6508012-overlay.png');height:674px;width:794px;border-radius:12px;-webkit-border-radius:12px;-khtml-border-radius:12px;-opera-border-radius:12px;-moz-border-radius:12px}* html #ev_modal{background-image:url('http://s1.torbit.com/img/9cb5f6409f089f04a9fb91a5160c2a89ef84bd8c-x.gif');filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://s1.torbit.com/img/ae1d47e12d165bcfa7fb88781fc372d2b6508012-overlay.png',sizingMethod='scale')}#tb_modal iframe{background:white;position:relative;top:12px;height:610px;width:770px}#tb_close,#tb_close:active,#tb_close:hover,#tb_close:link,#tb_close:visited{border:0;color:white;text-decoration:none;font-family:helvetica;margin:12px 12px 0 12px; 0;text-indent:0;padding:0;text-align:right;float:right;vertical-align:baseline;font-size:16px;line-height:24px}#tb_close:hover{text-decoration:underline}"
	    ss1.setAttribute("type", "text/css");
	    var hh1 = document.getElementsByTagName('head')[0];
	    hh1.appendChild(ss1);
	    if (ss1.styleSheet) {   // IE
		ss1.styleSheet.cssText = def;
	    } else {                // the world
		var tt1 = document.createTextNode(def);
		ss1.appendChild(tt1);
	    }
    
	    // add the overlay to the document
	    var overlay = document.createElement('div');
	    overlay.id = "torbit-stop-sopa";
	    overlay.style.height = window_height()+32+"px"; // stretch the overlay to cover the entire content (add 32px to handle FF quirk)
	    // just in case people see it loading in for a split second
	    overlay.style.display = "none";
	
	    // figure out how where to position the modal vertically
	    var top_offset = Math.round((window_height() - 674)/2);
	    // adjust for windows that aren't as tall as our modal window
	    top_offset = (top_offset < 0) ? 12 : top_offset;
    
	    overlay.innerHTML = '<div id="tb_modal" style="margin-top: ' + top_offset + 'px; text-align: center;"><a id="tb_close" href="javascript:window.TB_CLOSE()">Continue to site &raquo;</a><iframe scrolling="no" frameborder="0" id="tb_iframe" src="//secure.torbit.com/sopa/stop-sopa.html"></iframe></div>'
	    
	    // drop the overlay in as the first thing in the body tag -- makes it scroll up
	    var body = document.body;
	    body.insertBefore(overlay, body.firstChild);
	    
	    // make it visable again
	    document.getElementById("torbit-stop-sopa").style.display = "block";
	    
	    // put @ the bottom to stop it from breaking in safari 
	    // should investigate more at some point
	    window.TB_FIX_FLASH();
	    
	    
	    if (window.addEventListener) {
		window.addEventListener("load", window.TB_FIX_FLASH, false);
	      }
	      else if (window.attachEvent) {
		window.attachEvent("onload", window.TB_FIX_FLASH);
	      }
	}
	
	window.TB_INIT();
    }
}());
