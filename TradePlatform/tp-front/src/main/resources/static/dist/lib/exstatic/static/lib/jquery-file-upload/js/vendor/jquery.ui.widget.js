!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function($,t){var e=0,i=Array.prototype.slice,n=$.cleanData;$.cleanData=function(t){for(var e,i=0;null!=(e=t[i]);i++)try{$(e).triggerHandler("remove")}catch(t){}n(t)},$.widget=function(t,e,i){var n,s,o,a,r={},u=t.split(".")[0];t=t.split(".")[1],n=u+"-"+t,i||(i=e,e=$.Widget),$.expr[":"][n.toLowerCase()]=function(t){return!!$.data(t,n)},$[u]=$[u]||{},s=$[u][t],o=$[u][t]=function(t,e){if(!this._createWidget)return new o(t,e);arguments.length&&this._createWidget(t,e)},$.extend(o,s,{version:i.version,_proto:$.extend({},i),_childConstructors:[]}),a=new e,a.options=$.widget.extend({},a.options),$.each(i,function(t,i){if(!$.isFunction(i))return void(r[t]=i);r[t]=function(){var n=function(){return e.prototype[t].apply(this,arguments)},s=function(i){return e.prototype[t].apply(this,i)};return function(){var t,e=this._super,o=this._superApply;return this._super=n,this._superApply=s,t=i.apply(this,arguments),this._super=e,this._superApply=o,t}}()}),o.prototype=$.widget.extend(a,{widgetEventPrefix:s?a.widgetEventPrefix||t:t},r,{constructor:o,namespace:u,widgetName:t,widgetFullName:n}),s?($.each(s._childConstructors,function(t,e){var i=e.prototype;$.widget(i.namespace+"."+i.widgetName,o,e._proto)}),delete s._childConstructors):e._childConstructors.push(o),$.widget.bridge(t,o)},$.widget.extend=function(e){for(var n,s,o=i.call(arguments,1),a=0,r=o.length;a<r;a++)for(n in o[a])s=o[a][n],o[a].hasOwnProperty(n)&&s!==t&&($.isPlainObject(s)?e[n]=$.isPlainObject(e[n])?$.widget.extend({},e[n],s):$.widget.extend({},s):e[n]=s);return e},$.widget.bridge=function(e,n){var s=n.prototype.widgetFullName||e;$.fn[e]=function(o){var a="string"==typeof o,r=i.call(arguments,1),u=this;return o=!a&&r.length?$.widget.extend.apply(null,[o].concat(r)):o,a?this.each(function(){var i,n=$.data(this,s);return n?$.isFunction(n[o])&&"_"!==o.charAt(0)?(i=n[o].apply(n,r),i!==n&&i!==t?(u=i&&i.jquery?u.pushStack(i.get()):i,!1):void 0):$.error("no such method '"+o+"' for "+e+" widget instance"):$.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+o+"'")}):this.each(function(){var t=$.data(this,s);t?t.option(o||{})._init():$.data(this,s,new n(o,this))}),u}},$.Widget=function(){},$.Widget._childConstructors=[],$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=$(i||this.defaultElement||this)[0],this.element=$(i),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=$.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=$(),this.hoverable=$(),this.focusable=$(),i!==this&&($.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=$(i.style?i.ownerDocument:i.document||i),this.window=$(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:$.noop,_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:$.noop,widget:function(){return this.element},option:function(e,i){var n,s,o,a=e;if(0===arguments.length)return $.widget.extend({},this.options);if("string"==typeof e)if(a={},n=e.split("."),e=n.shift(),n.length){for(s=a[e]=$.widget.extend({},this.options[e]),o=0;o<n.length-1;o++)s[n[o]]=s[n[o]]||{},s=s[n[o]];if(e=n.pop(),1===arguments.length)return s[e]===t?null:s[e];s[e]=i}else{if(1===arguments.length)return this.options[e]===t?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,e,i){var n,s=this;"boolean"!=typeof t&&(i=e,e=t,t=!1),i?(e=n=$(e),this.bindings=this.bindings.add(e)):(i=e,e=this.element,n=this.widget()),$.each(i,function(i,o){function a(){if(t||!0!==s.options.disabled&&!$(this).hasClass("ui-state-disabled"))return("string"==typeof o?s[o]:o).apply(s,arguments)}"string"!=typeof o&&(a.guid=o.guid=o.guid||a.guid||$.guid++);var r=i.match(/^(\w+)\s*(.*)$/),u=r[1]+s.eventNamespace,d=r[2];d?n.delegate(d,u,a):e.bind(u,a)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?n[t]:t).apply(n,arguments)}var n=this;return setTimeout(i,e||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){$(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){$(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){$(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){$(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,e,i){var n,s,o=this.options[t];if(i=i||{},e=$.Event(e),e.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),e.target=this.element[0],s=e.originalEvent)for(n in s)n in e||(e[n]=s[n]);return this.element.trigger(e,i),!($.isFunction(o)&&!1===o.apply(this.element[0],[e].concat(i))||e.isDefaultPrevented())}},$.each({show:"fadeIn",hide:"fadeOut"},function(t,e){$.Widget.prototype["_"+t]=function(i,n,s){"string"==typeof n&&(n={effect:n});var o,a=n?!0===n||"number"==typeof n?e:n.effect||e:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!$.isEmptyObject(n),n.complete=s,n.delay&&i.delay(n.delay),o&&$.effects&&$.effects.effect[a]?i[t](n):a!==t&&i[a]?i[a](n.duration,n.easing,s):i.queue(function(e){$(this)[t](),s&&s.call(i[0]),e()})}})});