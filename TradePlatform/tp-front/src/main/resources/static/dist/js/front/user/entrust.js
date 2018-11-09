define(function(require,exports,module){this._table=require("js/base/table"),module.exports={init:function(){var e={detail:function(e,t,l,i){var r=[];$.each(l,function(e,t){r.push("<p><b>"+e+":</b> "+t+"</p>")}),i.html(r.join(""))},url:_ctx+"/user/entrust/list?type=current",columns:[{field:"state",checkbox:!0,align:"center",valign:"middle",value:"id",visible:!1,searchable:!1},{title:"id",field:"id",align:"center",visible:!1,sortable:!1,searchable:!1},{title:"委托时间",field:"entrustTime",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"交易类型",field:"type",align:"center",visible:!0,sortable:!1,searchable:!0,formatter:function(e,t,l){return 1==e?"买":"卖"}},{title:"来源",field:"source",align:"center",visible:!0,sortable:!1,searchable:!0,formatter:function(e,t,l){return 1==e?"PC端":2==e?"机器人":3==e?"移动端":4==e?"强制平仓":5==e?"计划委托":6==e?"止盈平仓":7==e?"止损平仓":""}},{title:"委托价格(¥)",field:"entrustPrice",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"委托数(个)",field:"entrustCount",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"剩余数量(个)",field:"surplusEntrustCount",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"状态",field:"status",align:"center",visible:!0,sortable:!1,searchable:!0,formatter:function(e,t,l){return 0==e?"未成交":1==e?"部分成交":2==e?"已完成":3==e?"部分成交已撤销":4==e?"已撤销":""}},{title:"操作",field:"entrustNum",align:"center",visible:!0,sortable:!1,searchable:!1,formatter:function(e,t,l){return"撤销"}}],queryParams:function(e){return{limit:e.limit,offset:e.offset,sortOrder:e.order,typeone:$($("#type").find(".selected")[0]).attr("value"),querypath:"center"}}};_table.initTable($("#table_current"),e),$("#type").on("click","a",function(){$(this).siblings().removeClass("selected"),$(this).addClass("selected"),$("#table_current").bootstrapTable("refresh",null)}),$("#historyBtn").on("click",function(){var e={detail:function(e,t,l,i){var r=[];$.each(l,function(e,t){r.push("<p><b>"+e+":</b> "+t+"</p>")}),i.html(r.join(""))},url:_ctx+"/user/entrust/list?type=history",columns:[{field:"state",checkbox:!0,align:"center",valign:"middle",value:"id",visible:!1,searchable:!1},{title:"id",field:"id",align:"center",visible:!1,sortable:!1,searchable:!1},{title:"委托时间",field:"entrustTime",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"交易类型",field:"type",align:"center",visible:!0,sortable:!1,searchable:!0,formatter:function(e,t,l){return 1==e?"买":"卖"}},{title:"来源",field:"source",align:"center",visible:!0,sortable:!1,searchable:!0,formatter:function(e,t,l){return 1==e?"PC端":2==e?"机器人":3==e?"移动端":4==e?"强制平仓":5==e?"计划委托":6==e?"止盈平仓":7==e?"止损平仓":""}},{title:"委托价格(¥)",field:"entrustPrice",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"委托数(个)",field:"entrustCount",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"剩余数量(个)",field:"surplusEntrustCount",align:"center",visible:!0,sortable:!1,searchable:!0},{title:"状态",field:"status",align:"center",visible:!0,sortable:!1,searchable:!0,formatter:function(e,t,l){return 0==e?"未成交":1==e?"部分成交":2==e?"已完成":3==e?"部分成交已撤销":4==e?"已撤销":""}}],queryParams:function(e){return{limit:e.limit,offset:e.offset,sortOrder:e.order,typeone:$($("#type2").find(".selected")[0]).attr("value"),querypath:"center"}}};_table.initTable($("#table_history"),e),$("#type2").on("click","a",function(){$(this).siblings().removeClass("selected"),$(this).addClass("selected"),$("#table_history").bootstrapTable("refresh",null)})})}}});