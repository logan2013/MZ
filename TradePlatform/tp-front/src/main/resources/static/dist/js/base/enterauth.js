define(function(require,exports,module){require("lib/jdt/css/style.css"),require("lib/jdt/js/lib.js"),module.exports={enterauth3:function(){bsStep(3),$("#useBtn").on("click",function(){$.ajax({type:"post",url:_domain+"/admin/enterauth/use.do",cache:!1,dataType:"json",success:function(t){void 0!=t&&t.success&&window.location.reload()},error:function(t){}})})},enterauth2:function(){bsStep(2)},enterauth1:function(){bsStep(1),$("#form").bootstrapValidator({submitButtons:"button[id=addSubmit]",message:"不能为空",feedbackIcons:{valid:"glyphicon glyphicon-ok",invalid:"glyphicon glyphicon-remove",validating:"glyphicon glyphicon-refresh"},fields:{company:{validators:{notEmpty:{message:"公司名称不能为空"}}},address:{validators:{notEmpty:{message:"公司地址不能为空"}}},contacts:{validators:{notEmpty:{message:"联系人不能为空"}}},contactsmobile:{validators:{notEmpty:{message:"联系人手机号不能为空"}}},contactsemail:{validators:{notEmpty:{message:"联系人邮箱不能为空"}}},remark:{validators:{notEmpty:{message:"公司经营范围不能为空"}}}},submitHandler:function(t,a,o){}}),$("#addSubmit").on("click",function(){var t={url:_domain+"/admin/enterauth/apply.do",type:"post",resetForm:!0,dataType:"json",beforeSubmit:function(t,a,o){var s=a.data("bootstrapValidator");if(s.validate(),!s.isValid())return!1},success:function(t,a){void 0!=t&&(t.success?(layer.msg("申请成功!",{icon:1}),loadUrl(_domain+"/admin/center.do")):(layer.msg(t.msg,{icon:2}),$("#form").data("bootstrapValidator").resetForm()))}};$("#form").ajaxSubmit(t)})}}});