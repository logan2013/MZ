var swfobject=function(){function e(){if(!V){try{var e=k.getElementsByTagName("body")[0].appendChild(k.createElement("span"));e.parentNode.removeChild(e)}catch(e){return}V=!0;for(var e=O.length,t=0;t<e;t++)O[t]()}}function t(e){V?e():O[O.length]=e}function n(e){if(typeof L.addEventListener!=A)L.addEventListener("load",e,!1);else if(typeof k.addEventListener!=A)k.addEventListener("load",e,!1);else if(typeof L.attachEvent!=A)u(L,"onload",e);else if("function"==typeof L.onload){var t=L.onload;L.onload=function(){t(),e()}}else L.onload=e}function a(){var e=k.getElementsByTagName("body")[0],t=k.createElement(N);t.setAttribute("type",T);var n=e.appendChild(t);if(n){var a=0;!function(){if(typeof n.GetVariable!=A){var r=n.GetVariable("$version");r&&(r=r.split(" ")[1].split(","),D.pv=[parseInt(r[0],10),parseInt(r[1],10),parseInt(r[2],10)])}else if(10>a)return a++,void setTimeout(arguments.callee,10);e.removeChild(t),n=null,i()}()}else i()}function i(){var e=F.length;if(0<e)for(var t=0;t<e;t++){var n=F[t].id,a=F[t].callbackFn,i={success:!1,id:n};if(0<D.pv[0]){var c=p(n);if(c)if(!v(F[t].swfVersion)||D.wk&&312>D.wk)if(F[t].expressInstall&&o()){i={},i.data=F[t].expressInstall,i.width=c.getAttribute("width")||"0",i.height=c.getAttribute("height")||"0",c.getAttribute("class")&&(i.styleclass=c.getAttribute("class")),c.getAttribute("align")&&(i.align=c.getAttribute("align"));for(var d={},c=c.getElementsByTagName("param"),f=c.length,u=0;u<f;u++)"movie"!=c[u].getAttribute("name").toLowerCase()&&(d[c[u].getAttribute("name")]=c[u].getAttribute("value"));l(i,d,n,a)}else s(c),a&&a(i);else h(n,!0),a&&(i.success=!0,i.ref=r(n),a(i))}else h(n,!0),a&&((n=r(n))&&typeof n.SetVariable!=A&&(i.success=!0,i.ref=n),a(i))}}function r(e){var t=null;return(e=p(e))&&"OBJECT"==e.nodeName&&(typeof e.SetVariable!=A?t=e:(e=e.getElementsByTagName(N)[0])&&(t=e)),t}function o(){return!P&&v("6.0.65")&&(D.win||D.mac)&&!(D.wk&&312>D.wk)}function l(e,t,n,a){P=!0,b=a||null,E={success:!1,id:n};var i=p(n);i&&("OBJECT"==i.nodeName?(w=c(i),g=null):(w=i,g=n),e.id=I,(typeof e.width==A||!/%$/.test(e.width)&&310>parseInt(e.width,10))&&(e.width="310"),(typeof e.height==A||!/%$/.test(e.height)&&137>parseInt(e.height,10))&&(e.height="137"),k.title=k.title.slice(0,47)+" - Flash Player Installation",a=D.ie&&D.win?"ActiveX":"PlugIn",a="MMredirectURL="+L.location.toString().replace(/&/g,"%26")+"&MMplayerType="+a+"&MMdoctitle="+k.title,t.flashvars=typeof t.flashvars!=A?t.flashvars+"&"+a:a,D.ie&&D.win&&4!=i.readyState&&(a=k.createElement("div"),n+="SWFObjectNew",a.setAttribute("id",n),i.parentNode.insertBefore(a,i),i.style.display="none",function(){4==i.readyState?i.parentNode.removeChild(i):setTimeout(arguments.callee,10)}()),d(e,t,n))}function s(e){if(D.ie&&D.win&&4!=e.readyState){var t=k.createElement("div");e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(c(e),t),e.style.display="none",function(){4==e.readyState?e.parentNode.removeChild(e):setTimeout(arguments.callee,10)}()}else e.parentNode.replaceChild(c(e),e)}function c(e){var t=k.createElement("div");if(D.win&&D.ie)t.innerHTML=e.innerHTML;else if((e=e.getElementsByTagName(N)[0])&&(e=e.childNodes))for(var n=e.length,a=0;a<n;a++)!(1==e[a].nodeType&&"PARAM"==e[a].nodeName)&&8!=e[a].nodeType&&t.appendChild(e[a].cloneNode(!0));return t}function d(e,t,n){var a,i=p(n);if(D.wk&&312>D.wk)return a;if(i)if(typeof e.id==A&&(e.id=n),D.ie&&D.win){var r,o="";for(r in e)e[r]!=Object.prototype[r]&&("data"==r.toLowerCase()?t.movie=e[r]:"styleclass"==r.toLowerCase()?o+=' class="'+e[r]+'"':"classid"!=r.toLowerCase()&&(o+=" "+r+'="'+e[r]+'"'));r="";for(var l in t)t[l]!=Object.prototype[l]&&(r+='<param name="'+l+'" value="'+t[l]+'" />');i.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+o+">"+r+"</object>",x[x.length]=e.id,a=p(e.id)}else{l=k.createElement(N),l.setAttribute("type",T);for(var s in e)e[s]!=Object.prototype[s]&&("styleclass"==s.toLowerCase()?l.setAttribute("class",e[s]):"classid"!=s.toLowerCase()&&l.setAttribute(s,e[s]));for(o in t)t[o]!=Object.prototype[o]&&"movie"!=o.toLowerCase()&&(e=l,r=o,s=t[o],n=k.createElement("param"),n.setAttribute("name",r),n.setAttribute("value",s),e.appendChild(n));i.parentNode.replaceChild(l,i),a=l}return a}function f(e){var t=p(e);t&&"OBJECT"==t.nodeName&&(D.ie&&D.win?(t.style.display="none",function(){if(4==t.readyState){var n=p(e);if(n){for(var a in n)"function"==typeof n[a]&&(n[a]=null);n.parentNode.removeChild(n)}}else setTimeout(arguments.callee,10)}()):t.parentNode.removeChild(t))}function p(e){var t=null;try{t=k.getElementById(e)}catch(e){}return t}function u(e,t,n){e.attachEvent(t,n),M[M.length]=[e,t,n]}function v(e){var t=D.pv,e=e.split(".");return e[0]=parseInt(e[0],10),e[1]=parseInt(e[1],10)||0,e[2]=parseInt(e[2],10)||0,t[0]>e[0]||t[0]==e[0]&&t[1]>e[1]||t[0]==e[0]&&t[1]==e[1]&&t[2]>=e[2]}function y(e,t,n,a){if(!D.ie||!D.mac){var i=k.getElementsByTagName("head")[0];i&&(n=n&&"string"==typeof n?n:"screen",a&&(S=C=null),C&&S==n||(a=k.createElement("style"),a.setAttribute("type","text/css"),a.setAttribute("media",n),C=i.appendChild(a),D.ie&&D.win&&typeof k.styleSheets!=A&&0<k.styleSheets.length&&(C=k.styleSheets[k.styleSheets.length-1]),S=n),D.ie&&D.win?C&&typeof C.addRule==N&&C.addRule(e,t):C&&typeof k.createTextNode!=A&&C.appendChild(k.createTextNode(e+" {"+t+"}")))}}function h(e,t){if(R){var n=t?"visible":"hidden";V&&p(e)?p(e).style.visibility=n:y("#"+e,"visibility:"+n)}}function m(e){return null!=/[\\\"<>\.;]/.exec(e)&&typeof encodeURIComponent!=A?encodeURIComponent(e):e}var w,g,b,E,C,S,A="undefined",N="object",T="application/x-shockwave-flash",I="SWFObjectExprInst",L=window,k=document,j=navigator,B=!1,O=[function(){B?a():i()}],F=[],x=[],M=[],V=!1,P=!1,R=!0,D=function(){var e=typeof k.getElementById!=A&&typeof k.getElementsByTagName!=A&&typeof k.createElement!=A,t=j.userAgent.toLowerCase(),n=j.platform.toLowerCase(),a=/win/.test(n?n:t),n=/mac/.test(n?n:t),t=!!/webkit/.test(t)&&parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")),i=!1,r=[0,0,0],o=null;if(typeof j.plugins!=A&&typeof j.plugins["Shockwave Flash"]==N)!(o=j.plugins["Shockwave Flash"].description)||typeof j.mimeTypes!=A&&j.mimeTypes[T]&&!j.mimeTypes[T].enabledPlugin||(B=!0,i=!1,o=o.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),r[0]=parseInt(o.replace(/^(.*)\..*$/,"$1"),10),r[1]=parseInt(o.replace(/^.*\.(.*)\s.*$/,"$1"),10),r[2]=/[a-zA-Z]/.test(o)?parseInt(o.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof L.ActiveXObject!=A)try{var l=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");l&&(o=l.GetVariable("$version"))&&(i=!0,o=o.split(" ")[1].split(","),r=[parseInt(o[0],10),parseInt(o[1],10),parseInt(o[2],10)])}catch(e){}return{w3:e,pv:r,wk:t,ie:i,win:a,mac:n}}();return function(){D.w3&&((typeof k.readyState!=A&&"complete"==k.readyState||typeof k.readyState==A&&(k.getElementsByTagName("body")[0]||k.body))&&e(),V||(typeof k.addEventListener!=A&&k.addEventListener("DOMContentLoaded",e,!1),D.ie&&D.win&&(k.attachEvent("onreadystatechange",function(){"complete"==k.readyState&&(k.detachEvent("onreadystatechange",arguments.callee),e())}),L==top&&function(){if(!V){try{k.documentElement.doScroll("left")}catch(e){return void setTimeout(arguments.callee,0)}e()}}()),D.wk&&function(){V||(/loaded|complete/.test(k.readyState)?e():setTimeout(arguments.callee,0))}(),n(e)))}(),function(){D.ie&&D.win&&window.attachEvent("onunload",function(){for(var e=M.length,t=0;t<e;t++)M[t][0].detachEvent(M[t][1],M[t][2]);for(e=x.length,t=0;t<e;t++)f(x[t]);for(var n in D)D[n]=null;D=null;for(var a in swfobject)swfobject[a]=null;swfobject=null})}(),{registerObject:function(e,t,n,a){if(D.w3&&e&&t){var i={};i.id=e,i.swfVersion=t,i.expressInstall=n,i.callbackFn=a,F[F.length]=i,h(e,!1)}else a&&a({success:!1,id:e})},getObjectById:function(e){if(D.w3)return r(e)},embedSWF:function(e,n,a,i,r,s,c,f,p,u){var y={success:!1,id:n};D.w3&&!(D.wk&&312>D.wk)&&e&&n&&a&&i&&r?(h(n,!1),t(function(){a+="",i+="";var t={};if(p&&typeof p===N)for(var m in p)t[m]=p[m];if(t.data=e,t.width=a,t.height=i,m={},f&&typeof f===N)for(var w in f)m[w]=f[w];if(c&&typeof c===N)for(var g in c)m.flashvars=typeof m.flashvars!=A?m.flashvars+"&"+g+"="+c[g]:g+"="+c[g];if(v(r))w=d(t,m,n),t.id==n&&h(n,!0),y.success=!0,y.ref=w;else{if(s&&o())return t.data=s,void l(t,m,n,u);h(n,!0)}u&&u(y)})):u&&u(y)},switchOffAutoHideShow:function(){R=!1},ua:D,getFlashPlayerVersion:function(){return{major:D.pv[0],minor:D.pv[1],release:D.pv[2]}},hasFlashPlayerVersion:v,createSWF:function(e,t,n){if(D.w3)return d(e,t,n)},showExpressInstall:function(e,t,n,a){D.w3&&o()&&l(e,t,n,a)},removeSWF:function(e){D.w3&&f(e)},createCSS:function(e,t,n,a){D.w3&&y(e,t,n,a)},addDomLoadEvent:t,addLoadEvent:n,getQueryParamValue:function(e){var t=k.location.search||k.location.hash;if(t){if(/\?/.test(t)&&(t=t.split("?")[1]),null==e)return m(t);for(var t=t.split("&"),n=0;n<t.length;n++)if(t[n].substring(0,t[n].indexOf("="))==e)return m(t[n].substring(t[n].indexOf("=")+1))}return""},expressInstallCallback:function(){if(P){var e=p(I);e&&w&&(e.parentNode.replaceChild(w,e),g&&(h(g,!0),D.ie&&D.win&&(w.style.display="block")),b&&b(E)),P=!1}}}}();