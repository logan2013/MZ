!function(){function n(e,p){var i=/\W/.test(e)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);},__data = obj;with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):t[e]=t[e]||n(document.getElementById(e).innerHTML);return p?i(p):i}var t={};"function"==typeof define?define(function(){return n}):"undefined"!=typeof exports?module.exports=n:window.TmpL=n}();