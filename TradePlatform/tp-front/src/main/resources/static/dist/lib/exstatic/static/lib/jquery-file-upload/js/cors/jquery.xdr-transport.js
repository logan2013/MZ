!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(window.jQuery)}(function($){"use strict";window.XDomainRequest&&!$.support.cors&&$.ajaxTransport(function(t){if(t.crossDomain&&t.async){t.timeout&&(t.xdrTimeout=t.timeout,delete t.timeout);var o;return{send:function(e,n){function u(t,e,u,r){o.onload=o.onerror=o.ontimeout=$.noop,o=null,n(t,e,u,r)}var r=/\?/.test(t.url)?"&":"?";o=new XDomainRequest,"DELETE"===t.type?(t.url=t.url+r+"_method=DELETE",t.type="POST"):"PUT"===t.type?(t.url=t.url+r+"_method=PUT",t.type="POST"):"PATCH"===t.type&&(t.url=t.url+r+"_method=PATCH",t.type="POST"),o.open(t.type,t.url),o.onload=function(){u(200,"OK",{text:o.responseText},"Content-Type: "+o.contentType)},o.onerror=function(){u(404,"Not Found")},t.xdrTimeout&&(o.ontimeout=function(){u(0,"timeout")},o.timeout=t.xdrTimeout),o.send(t.hasContent&&t.data||null)},abort:function(){o&&(o.onerror=$.noop(),o.abort())}}}})});