!function(){function e(e,o){function s(e,n,o){var s=o||200;setTimeout(function(){e.removeClass(n)},s)}var i=this,t=e||{},c=t.message?t.message:"",r=t.type||"succeed",a=t.long,l=$('<div id="notice" class="notice"><a href="" class="close">×</a><div class="message">'+c+"</div></div>"),u=$("body"),d=l.find(".message"),f=l.find(".close");return i.Init=function(e){var n;return u.find("#notice").length>0?(l=u.find("#notice"),d=l.find(".message"),f=l.find(".close"),"close"!=e&&l.addClass("reappear"),n=!1):(u.append(l),n=!0),"error"==r?l.addClass("error").removeClass("succeed"):l.removeClass("error").addClass("succeed"),setTimeout(function(){l.removeClass("reappear")},1e3),n},i.Open=function(){var e=i.Init();i.CloseNow=0,e&&(l.removeClass("notice_close").addClass("notice_open"),s(l,"notice_open"))},i.Close=function(){i.Init("close"),i.CloseNow=1,l.addClass("notice_close").removeClass("notice_open"),n[1]=setTimeout(function(){l.remove()},300)},i.Write=function(e){d.html(e||c)},function(){i.Open(),i.Write(),clearTimeout(n[0]),clearTimeout(n[1]),n[0]=a&&setTimeout(function(){i.Close()},a),f.click(function(){return i.Close(),!1}),l.hover(function(){clearTimeout(n[0])},function(){u.find("#notice").length<=0||(n[0]=a&&setTimeout(function(){i.Close()},a))})}(),i}var n=[];"function"==typeof define?define(function(){return e}):"undefined"!=typeof exports?module.exports=e:window.Notice=e}();