!function(){var o=function(o,n){function a(){t(),k?e():clearTimeout(M)}function t(o){var n=void 0===o?E:o;A.r=Math.random().toString(36).substr(2),n||$.ajax({url:m,type:S,data:A,dataType:_,jsonp:y,jsonpCallback:v,beforeSend:c,success:i,error:r,complete:u})}function e(){M=setTimeout(a,k)}function c(){n&&n({code:"loading",msg:"loading"})}function i(o){10002==o.flag&&(window.location=C),10003==o.flag&&w.Stop(),g?P--:P=h,P<=0&&k<=b-1e3&&(k+=1e3),n&&n({code:"success",msg:"success",data:o})}function r(){n&&n({code:"error",msg:L("网络异常")})}function u(o,a){n&&n({code:"complete",xhr:o,ts:a,msg:"complete"})}function s(){E=1}function d(){E=0,P=h,k=T}function l(){t(0),P=h,k=T}function p(o){var n=o||{};m=n.url?n.url:m,A=n.data||A,T=n.refresh?1*n.refresh:T,_=n.datatype?n.datatype:_,y=n.jsonp?n.jsonp:y,v=n.jsonpcallback?n.jsonpcallback:v,k=T}var f=o||{},m=f.url?f.url:"/account/ajax.do",A=f.data||{},j=void 0==f.init||f.init,T=f.refresh?1*f.refresh:0,S=f.type||"GET",_=f.datatype?f.datatype:"",y=f.jsonp?f.jsonp:"",g=void 0!=f.damp?f.damp:CONST.AJAX_DAMP,h=CONST.AJAX_DAMP_TIME?CONST.AJAX_DAMP_TIME:6,b=CONST.AJAX_DAMP_REFRESH?CONST.AJAX_DAMP_REFRESH:5e3,v=f.jsonpcallback?f.jsonpcallback:"",M=null,E=0,w=this,x=window.location,C="/account/account.do?a=validate_all&jump_url="+x.pathname+x.search,P=h,k=T;clearTimeout(M),j&&A&&a(),w.Stop=s,w.Play=d,w.Fire=l,w.Update=p};"function"==typeof define?define(function(){return o}):"undefined"!=typeof exports?module.exports=o:window.HbAjax=o}();