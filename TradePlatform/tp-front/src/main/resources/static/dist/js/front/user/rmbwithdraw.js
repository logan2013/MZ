define(function(require,exports,module){this._table=require("js/base/table"),this.md5=require("js/base/utils/hrymd5"),module.exports={init:function(){clearPageTimer(),$("#manageBank").on("click",function(){loadUrl(_ctx+"/user/bankcard/index")}),$("#transactionMoney").on("input",function(){var e,t,a=$("#okhotMoney").text(),r=$("#transactionMoney").val();if(t="0123456789",parseInt(r)>parseInt(a))return layer.msg("不可大于可提现金额",{icon:2}),!1;if(parseInt(r)>2e3)return layer.msg("单笔不得超过"+$("#maxWithdrawMoneyOneTime").val()+"RMB",{icon:2}),!1;if(r.length>0)for(e=0;e<r.length;e++){if(-1==t.indexOf(r.charAt(e)))return layer.msg("金额必须为数字",{icon:2}),!1;var s=parseInt(r)*$("#onlineWithdrawFeeRate").val()/100,i=parseInt(r)-s;$("#showWithdrawMoney").empty().html("手续费额"+s+"RMB,实际到账金额 "+i+"RMB<br>当天最多可提现"+$("#maxWithdrawMoney").val()+"RMB<br>单笔最多可提现"+$("#maxWithdrawMoneyOneTime").val()+"RMB")}}),$("#submitWithdraw").click(function(){var e=$("#transactionMoney").val(),t=$("#accountPassWord").val(),a=$("#custromerAccountNumber").val(),r=$("#withdrawCode").val();return a?e?t?r?($("#submitWithdraw").attr("disabled",!0),void $("#withdraw").ajaxSubmit({type:"post",url:_ctx+"/user/rmbWithdraw/rmbwithdraw",dataType:"JSON",data:{accountPassWord:md5.md5(t)},resetForm:!0,beforeSubmit:function(e,t,a){},success:function(e){void 0!=e&&(e.success?layer.msg("申请成功!",{icon:1}):layer.msg(e.msg,{icon:2})),$("#submitWithdraw").attr("disabled",!1),$("#table").bootstrapTable("refresh")}})):(layer.msg("短信验证码不能为空!",{icon:2}),!1):(layer.msg("交易密码不能为空!",{icon:2}),!1):(layer.msg("提现金额不能为空!",{icon:2}),!1):(layer.msg("请选择银行卡!",{icon:2}),!1)});var e={url:_ctx+"/user/rmbdeposit/list",columns:[{field:"state",checkbox:!0,align:"center",valign:"middle",value:"id",visible:!1,searchable:!1},{title:"id",field:"id",align:"center",visible:!1,sortable:!1,searchable:!1},{title:"类型",field:"transactionType",align:"center",visible:!0,sortable:!1,searchable:!0,formatter:function(e,t,a){return 1==e?"线上充值":2==e?"线上提现":3==e?"线下充值":4==e?"线下取现":void 0}},{title:"提现金额",field:"transactionMoney",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"手续费",field:"fee",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"订单号",field:"transactionNum",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"时间",field:"created",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"状态",field:"status",align:"center",visible:!0,sortable:!1,searchable:!0,formatter:function(e,t,a){return 1==e?"待审核":2==e?"已完成":3==e?"以否决":void 0}}],queryParams:function(e){return{limit:e.limit,offset:e.offset,sortOrder:e.order,status:$($("#status").find(".selected")[0]).attr("value"),transactionType:"tixian"}}};_table.initTable($("#table"),e),$("#status").on("click","a",function(){$(this).siblings().removeClass("selected"),$(this).addClass("selected"),$("#table").bootstrapTable("refresh",null)})},sendsms:function(){$("#sendsmsBtn").on("click",function(){var e=$("#transactionMoney").val(),t=$("#accountPassWord").val();return $("#custromerAccountNumber").val()?e?t?($(this).attr("disabled","disabled"),void $.ajax({type:"post",url:_ctx+"/sms/getRmbWithdrawCode",data:{accountPassWord:md5.md5(t),transactionMoney:e},cache:!1,dataType:"json",success:function(e){if(e)if(e.success){layer.msg("发送成功",{icon:1});var t=120;window.clearInterval(pageTimer.rmbwithdraw),pageTimer.rmbwithdraw=window.setInterval(function(){t-=1,0==t?($("#sendsmsBtn").html("发送验证码"),$("#sendsmsBtn").removeAttr("disabled"),window.clearInterval(registSmsCodeT1)):$("#sendsmsBtn").html(t+"秒后重新发送")},1e3)}else $("#sendsmsBtn").removeAttr("disabled"),layer.msg(e.msg,{icon:2});else $("#sendsmsBtn").removeAttr("disabled"),layer.msg("发送失败",{icon:2})},error:function(e){}})):(layer.msg("交易密码不能为空!",{icon:2}),!1):(layer.msg("提现金额不能为空!",{icon:2}),!1):(layer.msg("请选择银行卡!",{icon:2}),!1)})}}});