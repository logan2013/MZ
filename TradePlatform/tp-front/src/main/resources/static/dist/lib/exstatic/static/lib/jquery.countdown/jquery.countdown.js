!function($){$.JQPlugin.createPlugin({name:"countdown",defaultOptions:{until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:!1,padZeroes:!1,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:!1,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{"":{labels:["Years","Months","Weeks","Days","Hours","Minutes","Seconds"],labels1:["Year","Month","Week","Day","Hour","Minute","Second"],compactLabels:["y","m","w","d"],whichLabels:null,digits:["0","1","2","3","4","5","6","7","8","9"],timeSeparator:":",isRTL:!1}},_getters:["getTimes"],_rtlClass:"countdown-rtl",_sectionClass:"countdown-section",_amountClass:"countdown-amount",_periodClass:"countdown-period",_rowClass:"countdown-row",_holdingClass:"countdown-holding",_showClass:"countdown-show",_descrClass:"countdown-descr",_timerElems:[],_init:function(){function e(a){var r=a<1e12?n?performance.now()+performance.timing.navigationStart:i():a||i();r-o>=1e3&&(t._updateElems(),o=r),s(e)}var t=this;this._super(),this._serverSyncs=[];var i="function"==typeof Date.now?Date.now:function(){return(new Date).getTime()},n=window.performance&&"function"==typeof window.performance.now,s=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null,o=0;!s||$.noRequestAnimationFrame?($.noRequestAnimationFrame=null,setInterval(function(){t._updateElems()},980)):(o=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||i(),s(e))},UTCDate:function(e,t,i,n,s,o,a,r){"object"==typeof t&&t.constructor==Date&&(r=t.getMilliseconds(),a=t.getSeconds(),o=t.getMinutes(),s=t.getHours(),n=t.getDate(),i=t.getMonth(),t=t.getFullYear());var l=new Date;return l.setUTCFullYear(t),l.setUTCDate(1),l.setUTCMonth(i||0),l.setUTCDate(n||1),l.setUTCHours(s||0),l.setUTCMinutes((o||0)-(Math.abs(e)<30?60*e:e)),l.setUTCSeconds(a||0),l.setUTCMilliseconds(r||0),l},periodsToSeconds:function(e){return 31557600*e[0]+2629800*e[1]+604800*e[2]+86400*e[3]+3600*e[4]+60*e[5]+e[6]},_instSettings:function(e,t){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(e){this._hasElem(e)||this._timerElems.push(e)},_hasElem:function(e){return $.inArray(e,this._timerElems)>-1},_removeElem:function(e){this._timerElems=$.map(this._timerElems,function(t){return t==e?null:t})},_updateElems:function(){for(var e=this._timerElems.length-1;e>=0;e--)this._updateCountdown(this._timerElems[e])},_optionsChanged:function(e,t,i){i.layout&&(i.layout=i.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">")),this._resetExtraLabels(t.options,i);var n=t.options.timezone!=i.timezone;$.extend(t.options,i),this._adjustSettings(e,t,null!=i.until||null!=i.since||n);var s=new Date;(t._since&&t._since<s||t._until&&t._until>s)&&this._addElem(e[0]),this._updateCountdown(e,t)},_updateCountdown:function(e,t){if(e=e.jquery?e:$(e),t=t||e.data(this.name)){if(e.html(this._generateHTML(t)).toggleClass(this._rtlClass,t.options.isRTL),$.isFunction(t.options.onTick)){var i="lap"!=t._hold?t._periods:this._calculatePeriods(t,t._show,t.options.significant,new Date);1!=t.options.tickInterval&&this.periodsToSeconds(i)%t.options.tickInterval!=0||t.options.onTick.apply(e[0],[i])}if("pause"!=t._hold&&(t._since?t._now.getTime()<t._since.getTime():t._now.getTime()>=t._until.getTime())&&!t._expiring){if(t._expiring=!0,this._hasElem(e[0])||t.options.alwaysExpire){if(this._removeElem(e[0]),$.isFunction(t.options.onExpiry)&&t.options.onExpiry.apply(e[0],[]),t.options.expiryText){var n=t.options.layout;t.options.layout=t.options.expiryText,this._updateCountdown(e[0],t),t.options.layout=n}t.options.expiryUrl&&(window.location=t.options.expiryUrl)}t._expiring=!1}else"pause"==t._hold&&this._removeElem(e[0])}},_resetExtraLabels:function(e,t){var i=!1;for(var n in t)if("whichLabels"!=n&&n.match(/[Ll]abels/)){i=!0;break}if(i)for(var n in e)n.match(/[Ll]abels[02-9]|compactLabels1/)&&(e[n]=null)},_adjustSettings:function(e,t,i){for(var n,s=0,o=null,a=0;a<this._serverSyncs.length;a++)if(this._serverSyncs[a][0]==t.options.serverSync){o=this._serverSyncs[a][1];break}if(null!=o)s=t.options.serverSync?o:0,n=new Date;else{var r=$.isFunction(t.options.serverSync)?t.options.serverSync.apply(e[0],[]):null;n=new Date,s=r?n.getTime()-r.getTime():0,this._serverSyncs.push([t.options.serverSync,s])}var l=t.options.timezone;l=null==l?-n.getTimezoneOffset():l,(i||!i&&null==t._until&&null==t._since)&&(t._since=t.options.since,null!=t._since&&(t._since=this.UTCDate(l,this._determineTime(t._since,null)),t._since&&s&&t._since.setMilliseconds(t._since.getMilliseconds()+s)),t._until=this.UTCDate(l,this._determineTime(t.options.until,n)),s&&t._until.setMilliseconds(t._until.getMilliseconds()+s)),t._show=this._determineShow(t)},_preDestroy:function(e,t){this._removeElem(e[0]),e.empty()},pause:function(e){this._hold(e,"pause")},lap:function(e){this._hold(e,"lap")},resume:function(e){this._hold(e,null)},toggle:function(e){this[($.data(e,this.name)||{})._hold?"resume":"pause"](e)},toggleLap:function(e){this[($.data(e,this.name)||{})._hold?"resume":"lap"](e)},_hold:function(e,t){var i=$.data(e,this.name);if(i){if("pause"==i._hold&&!t){i._periods=i._savePeriods;var n=i._since?"-":"+";i[i._since?"_since":"_until"]=this._determineTime(n+i._periods[0]+"y"+n+i._periods[1]+"o"+n+i._periods[2]+"w"+n+i._periods[3]+"d"+n+i._periods[4]+"h"+n+i._periods[5]+"m"+n+i._periods[6]+"s"),this._addElem(e)}i._hold=t,i._savePeriods="pause"==t?i._periods:null,$.data(e,this.name,i),this._updateCountdown(e,i)}},getTimes:function(e){var t=$.data(e,this.name);return t?"pause"==t._hold?t._savePeriods:t._hold?this._calculatePeriods(t,t._show,t.options.significant,new Date):t._periods:null},_determineTime:function(e,t){var i=this,n=null==e?t:"string"==typeof e?function(e){e=e.toLowerCase();for(var t=new Date,n=t.getFullYear(),s=t.getMonth(),o=t.getDate(),a=t.getHours(),r=t.getMinutes(),l=t.getSeconds(),_=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,p=_.exec(e);p;){switch(p[2]||"s"){case"s":l+=parseInt(p[1],10);break;case"m":r+=parseInt(p[1],10);break;case"h":a+=parseInt(p[1],10);break;case"d":o+=parseInt(p[1],10);break;case"w":o+=7*parseInt(p[1],10);break;case"o":s+=parseInt(p[1],10),o=Math.min(o,i._getDaysInMonth(n,s));break;case"y":n+=parseInt(p[1],10),o=Math.min(o,i._getDaysInMonth(n,s))}p=_.exec(e)}return new Date(n,s,o,a,r,l,0)}(e):"number"==typeof e?function(e){var t=new Date;return t.setTime(t.getTime()+1e3*e),t}(e):e;return n&&n.setMilliseconds(0),n},_getDaysInMonth:function(e,t){return 32-new Date(e,t,32).getDate()},_normalLabels:function(e){return e},_generateHTML:function(e){var t=this;e._periods=e._hold?e._periods:this._calculatePeriods(e,e._show,e.options.significant,new Date);for(var i=!1,n=0,s=e.options.significant,o=$.extend({},e._show),a=0;a<=6;a++)i|="?"==e._show[a]&&e._periods[a]>0,o[a]="?"!=e._show[a]||i?e._show[a]:null,n+=o[a]?1:0,s-=e._periods[a]>0?1:0;for(var r=[!1,!1,!1,!1,!1,!1,!1],a=6;a>=0;a--)e._show[a]&&(e._periods[a]?r[a]=!0:(r[a]=s>0,s--));var l=e.options.compact?e.options.compactLabels:e.options.labels,_=e.options.whichLabels||this._normalLabels,p=function(i){var n=e.options["compactLabels"+_(e._periods[i])];return o[i]?t._translateDigits(e,e._periods[i])+(n?n[i]:l[i])+" ":""},u=e.options.padZeroes?2:1,c=function(i){var n=e.options["labels"+_(e._periods[i])];return!e.options.significant&&o[i]||e.options.significant&&r[i]?'<span class="'+t._sectionClass+'"><span class="'+t._amountClass+'">'+t._minDigits(e,e._periods[i],u)+'</span><span class="'+t._periodClass+'">'+(n?n[i]:l[i])+"</span></span>":""};return e.options.layout?this._buildLayout(e,o,e.options.layout,e.options.compact,e.options.significant,r):(e.options.compact?'<span class="'+this._rowClass+" "+this._amountClass+(e._hold?" "+this._holdingClass:"")+'">'+p(0)+p(1)+p(2)+p(3)+(o[4]?this._minDigits(e,e._periods[4],2):"")+(o[5]?(o[4]?e.options.timeSeparator:"")+this._minDigits(e,e._periods[5],2):"")+(o[6]?(o[4]||o[5]?e.options.timeSeparator:"")+this._minDigits(e,e._periods[6],2):""):'<span class="'+this._rowClass+" "+this._showClass+(e.options.significant||n)+(e._hold?" "+this._holdingClass:"")+'">'+c(0)+c(1)+c(2)+c(3)+c(4)+c(5)+c(6))+"</span>"+(e.options.description?'<span class="'+this._rowClass+" "+this._descrClass+'">'+e.options.description+"</span>":"")},_buildLayout:function(e,t,i,n,s,o){for(var a=e.options[n?"compactLabels":"labels"],r=e.options.whichLabels||this._normalLabels,l=function(t){return(e.options[(n?"compactLabels":"labels")+r(e._periods[t])]||a)[t]},_=function(t,i){return e.options.digits[Math.floor(t/i)%10]},p={desc:e.options.description,sep:e.options.timeSeparator,yl:l(0),yn:this._minDigits(e,e._periods[0],1),ynn:this._minDigits(e,e._periods[0],2),ynnn:this._minDigits(e,e._periods[0],3),y1:_(e._periods[0],1),y10:_(e._periods[0],10),y100:_(e._periods[0],100),y1000:_(e._periods[0],1e3),ol:l(1),on:this._minDigits(e,e._periods[1],1),onn:this._minDigits(e,e._periods[1],2),onnn:this._minDigits(e,e._periods[1],3),o1:_(e._periods[1],1),o10:_(e._periods[1],10),o100:_(e._periods[1],100),o1000:_(e._periods[1],1e3),wl:l(2),wn:this._minDigits(e,e._periods[2],1),wnn:this._minDigits(e,e._periods[2],2),wnnn:this._minDigits(e,e._periods[2],3),w1:_(e._periods[2],1),w10:_(e._periods[2],10),w100:_(e._periods[2],100),w1000:_(e._periods[2],1e3),dl:l(3),dn:this._minDigits(e,e._periods[3],1),dnn:this._minDigits(e,e._periods[3],2),dnnn:this._minDigits(e,e._periods[3],3),d1:_(e._periods[3],1),d10:_(e._periods[3],10),d100:_(e._periods[3],100),d1000:_(e._periods[3],1e3),hl:l(4),hn:this._minDigits(e,e._periods[4],1),hnn:this._minDigits(e,e._periods[4],2),hnnn:this._minDigits(e,e._periods[4],3),h1:_(e._periods[4],1),h10:_(e._periods[4],10),h100:_(e._periods[4],100),h1000:_(e._periods[4],1e3),ml:l(5),mn:this._minDigits(e,e._periods[5],1),mnn:this._minDigits(e,e._periods[5],2),mnnn:this._minDigits(e,e._periods[5],3),m1:_(e._periods[5],1),m10:_(e._periods[5],10),m100:_(e._periods[5],100),m1000:_(e._periods[5],1e3),sl:l(6),sn:this._minDigits(e,e._periods[6],1),snn:this._minDigits(e,e._periods[6],2),snnn:this._minDigits(e,e._periods[6],3),s1:_(e._periods[6],1),s10:_(e._periods[6],10),s100:_(e._periods[6],100),s1000:_(e._periods[6],1e3)},u=i,c=0;c<=6;c++){var d="yowdhms".charAt(c),h=new RegExp("\\{"+d+"<\\}([\\s\\S]*)\\{"+d+">\\}","g");u=u.replace(h,!s&&t[c]||s&&o[c]?"$1":"")}return $.each(p,function(e,t){var i=new RegExp("\\{"+e+"\\}","g");u=u.replace(i,t)}),u},_minDigits:function(e,t,i){return t=""+t,t.length>=i?this._translateDigits(e,t):(t="0000000000"+t,this._translateDigits(e,t.substr(t.length-i)))},_translateDigits:function(e,t){return(""+t).replace(/[0-9]/g,function(t){return e.options.digits[t]})},_determineShow:function(e){var t=e.options.format,i=[];return i[0]=t.match("y")?"?":t.match("Y")?"!":null,i[1]=t.match("o")?"?":t.match("O")?"!":null,i[2]=t.match("w")?"?":t.match("W")?"!":null,i[3]=t.match("d")?"?":t.match("D")?"!":null,i[4]=t.match("h")?"?":t.match("H")?"!":null,i[5]=t.match("m")?"?":t.match("M")?"!":null,i[6]=t.match("s")?"?":t.match("S")?"!":null,i},_calculatePeriods:function(e,t,i,n){e._now=n,e._now.setMilliseconds(0);var s=new Date(e._now.getTime());e._since?n.getTime()<e._since.getTime()?e._now=n=s:n=e._since:(s.setTime(e._until.getTime()),n.getTime()>e._until.getTime()&&(e._now=n=s));var o=[0,0,0,0,0,0,0];if(t[0]||t[1]){var a=this._getDaysInMonth(n.getFullYear(),n.getMonth()),r=this._getDaysInMonth(s.getFullYear(),s.getMonth()),l=s.getDate()==n.getDate()||s.getDate()>=Math.min(a,r)&&n.getDate()>=Math.min(a,r),_=function(e){return 60*(60*e.getHours()+e.getMinutes())+e.getSeconds()},p=Math.max(0,12*(s.getFullYear()-n.getFullYear())+s.getMonth()-n.getMonth()+(s.getDate()<n.getDate()&&!l||l&&_(s)<_(n)?-1:0));o[0]=t[0]?Math.floor(p/12):0,o[1]=t[1]?p-12*o[0]:0,n=new Date(n.getTime());var u=n.getDate()==a,c=this._getDaysInMonth(n.getFullYear()+o[0],n.getMonth()+o[1]);n.getDate()>c&&n.setDate(c),n.setFullYear(n.getFullYear()+o[0]),n.setMonth(n.getMonth()+o[1]),u&&n.setDate(c)}var d=Math.floor((s.getTime()-n.getTime())/1e3),h=function(e,i){o[e]=t[e]?Math.floor(d/i):0,d-=o[e]*i};if(h(2,604800),h(3,86400),h(4,3600),h(5,60),h(6,1),d>0&&!e._since)for(var m=[1,12,4.3482,7,24,60,60],g=6,w=1,f=6;f>=0;f--)t[f]&&(o[g]>=w&&(o[g]=0,d=1),d>0&&(o[f]++,d=0,g=f,w=1)),w*=m[f];if(i)for(var f=0;f<=6;f++)i&&o[f]?i--:i||(o[f]=0);return o}})}(jQuery);