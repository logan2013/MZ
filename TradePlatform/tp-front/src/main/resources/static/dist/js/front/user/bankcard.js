define(function(require,exports,module){this._table=require("js/base/table"),module.exports={init:function(){require("base"),$.ajax({type:"POST",dataType:"JSON",url:_ctx+"/user/bankcard/bank",cache:!1,success:function(data){for(var obj=eval(data.obj),html="",i=0;i<obj.length;i++)html+="<option value="+obj[i].itemName+">"+obj[i].itemName+"</option>";$("#bankselect").append(html)}}),$.ajax({type:"POST",dataType:"JSON",url:_ctx+"/user/bankcard/area",cache:!1,success:function(data){for(var obj=eval(data.obj),html="",i=0;i<obj.length;i++)html+="<option value="+obj[i].key+">"+obj[i].province+"</option>";$("#province").append(html)}}),$("#province").on("change",function(){var id=this.value,selectName=$(this).find("option:selected").val();$("#provinceValue").val(selectName),$("#bankProvince").val($(this).find("option:selected").text()),$("#city option").remove(),$.ajax({type:"POST",dataType:"JSON",url:_ctx+"/user/bankcard/city/"+$("#provinceValue").val(),cache:!1,success:function(data){for(var obj=eval("["+data.obj+"]"),html="",i=0;i<obj.length;i++)html+="<option value="+obj[i].city+">"+obj[i].city+"</option>";$("#city").append(html)}})}),$("#addBankcard").on("click",function(){var a=$("#bankselect").val(),e=$("#province").val(),t=$("#subBank").val(),i=($("#subBankNum").val(),$("#cardName").val(),$("#cardNumber").val());return a?e?t?i?void $("#cardForm").ajaxSubmit({type:"post",url:_ctx+"/user/bankcard/saveBankCard",dataType:"JSON",success:function(a){void 0!=a&&(a.success?layer.msg("添加成功",{icon:1,time:1500},function(){loadUrl(_ctx+"/user/bankcard/index")}):layer.msg(a.msg,{icon:2}))}}):(layer.msg("银行卡号不能为空",{icon:2}),!1):(layer.msg("开很支行不能为空",{icon:2}),!1):(layer.msg("请选择银行卡所在地",{icon:2}),!1):(layer.msg("请选择银行",{icon:2}),!1)}),$("#div_list").on("click","span",function(){var a=$(this).find("#bandId").val();layer.confirm("你确定要删除吗？",{btn:["确定","取消"]},function(){$.ajax({type:"POST",dataType:"JSON",url:_ctx+"/user/bankcard/removeBankCard",cache:!1,data:{id:a},success:function(a){layer.closeAll("dialog"),loadUrl(_ctx+"/user/bankcard/index")}})})})}}});