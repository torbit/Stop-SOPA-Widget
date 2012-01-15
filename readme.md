Stop SOPA Widget
================

* Author:    Torbit (torbit.com)
* Date:      Jan 15, 2012
* Last mod.: Jan 15, 2012
* Version:   1.0
* Website:   <http://torbit.com/blog/2012/01/15/stop-sopa-js/>
* GitHub:    <https://github.com/jabbalaci/Wallpaper-Downloader-and-Rotator-for-Gnome>
* License:   Apache 2.0  (http://www.apache.org/licenses/LICENSE-2.0)

Purpose
-------

This widget will show a modal window to increase awareness about SOPA/PIPA on Jan 18th.  

Usage
-----

Add this snipet to the <head> of your site or the top of your <body>:

<script type='text/javascript'>
(function(){
var t = (new Date).getTime();
if ( ( t >= 1326891600000 && t <= 1326934800000 ) || window.location.hash == '#stopsopa' ) {
var a = document.createElement('script');
a.type = 'text/javascript';
a.async = true;
a.src='stop-sopa.js';
var b = document.getElementsByTagName('script')[0];
b.parentNode.insertBefore( a, b );
}
}());
</script>

Features
--------

* Defaults to show the Stop SOPA message on January 18th from 8am–8pm EST (1300–0100 UTC)
* Uses cookies so the message is only shown once
* Loaded asynchronously (won't block the rendering of your page or cause another point of failure)
* You can manually trigger the modal before the 18th by adding the hash #stopsopa to the end of any URL on your site
* Works across browsers (tested on everything from IE6 to iphone)
* Our hosted version is served from a CDN for speed/global delivery
* Supports SSL
* Hackable!  Feel free to modify and update however you'd like.

 