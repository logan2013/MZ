define(function(require,exports,module){this._table=require("js/base/table"),module.exports={init:function(){require("base"),$("#select").on("change",function(){$("#currencyType").val($(this).find("option:selected").val())}),$("#savepublickey").on("click",function(){if(!$("#publicKey").val())return layer.msg("钱包公钥不能为空",{icon:2}),!1;$("#withdraw_address_form").ajaxSubmit({type:"post",url:_ctx+"/user/publickeylist/save",dataType:"JSON",success:function(e){e.success||layer.msg(e.msg,{icon:2}),loadUrl(_ctx+"/user/publickeylist/index")}})}),$("#tablepublic").on("click","#deletePub",function(){var e=$(this).siblings().val();layer.confirm("你确定要删除吗？",{btn:["确定","取消"]},function(){$.ajax({type:"POST",dataType:"JSON",url:_ctx+"/user/publickeylist/delete",cache:!1,data:{id:e},success:function(e){layer.closeAll("dialog"),loadUrl(_ctx+"/user/publickeylist/index")}})})})}}});