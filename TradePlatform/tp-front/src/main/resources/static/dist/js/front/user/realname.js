define(function(require,exports,module){this.validate=require("js/base/validate"),module.exports={init:function(){$("#realnameBtn").on("click",function(){var a=$("#trueName").val(),e=$("#country").val(),c=$("#cardType").val(),r=$("#cardId").val();return a?r?validate.check_card(r)?void $.ajax({type:"post",url:_ctx+"/user/realname",data:{trueName:a,country:e,cardType:c,cardId:r},cache:!1,dataType:"json",success:function(a){a?a.success?(layer.msg("认证成功",{icon:1}),loadUrl(_ctx+"/user/realinfo")):layer.msg(a.msg,{icon:2}):layer.msg("认证失败",{icon:2})},error:function(a){}}):void layer.msg("证件号格式不正确",{icon:2}):void layer.msg("证件号不能为空",{icon:2}):void layer.msg("姓名不能为空",{icon:2})})}}});