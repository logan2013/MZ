define(function(require,exports,module){module.exports={removeRow:function(e,t){var n=$.map(e.bootstrapTable("getSelections"),function(e){return e.id});if(!(void 0!=n&&n.length>0))return layer.msg("请选择数据",{icon:2}),!1;layer.confirm("你确定要删除吗？",{btn:["确定","取消"],ids:n},function(){$.ajax({type:"post",url:t,cache:!1,dataType:"json",data:{ids:n.join(",")},success:function(t){void 0!=t?t.success?(layer.msg("删除成功",{icon:1}),e.bootstrapTable("refresh")):layer.msg(t.msg,{icon:2}):layer.msg("请求无响应",{icon:2})},error:function(e){$("#page-wrapper").html("<div class='row'><h1>此路径不存在："+t.substring(t.indexOf("u=")+2)+"</h1></div>")}})})},seeRow:function(e,t){var n=$.map(e.bootstrapTable("getSelections"),function(e){return e.id});void 0!=n&&1==n.length?loadUrl(t+"/"+n[0]+".do"):layer.msg("请选择一条数据",{icon:2})},getIdSelects:function(e){return $.map(e.bootstrapTable("getSelections"),function(e){return e.id})},initTable:function(e,t){function n(){return $.map(o.bootstrapTable("getSelections"),function(e){return e.id})}function a(e){return $params=$("input[tablesearch]"),$params.each(function(t,n){0!=n.value.length?e[n.name]=n.value:e[n.name]=null}),e}var o=e,r=[];$("#remove");setTimeout(function(){o.bootstrapTable("resetView")},200),o.on("check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table",function(){r=n()}),void 0!=t.detail&&o.on("expand-row.bs.table",t.detail),$(window).resize(function(){o.bootstrapTable("resetView",{})}),window.operateEvents={"click .like":function(e,t,n,a){alert("You click like action, row: "+JSON.stringify(n))},"click .remove":function(e,t,n,a){o.bootstrapTable("remove",{field:"id",values:[n.id]})}},t.url?o.bootstrapTable({columns:t.columns,url:t.url,queryParams:t.queryParams}):o.bootstrapTable({columns:t.columns,data:t.data}),$params=$("input[tablesearch]"),$params.change(function(){o.bootstrapTable("refresh",{columns:t.columns,url:t.url,queryParams:a})})}}});