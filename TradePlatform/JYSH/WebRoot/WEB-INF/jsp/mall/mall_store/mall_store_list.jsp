<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<%=basePath%>"><!-- jsp文件头和头部 -->
    <%@ include file="../../system/admin/top.jsp" %>
</head>
<body>

<div class="container-fluid" id="main-container">


    <div id="page-content" class="clearfix">

        <div class="row-fluid">

            <div class="row-fluid">

                <!-- 检索  -->
                <form action="mall_store/list.do" method="post" name="Form" id="Form">
                    <table>
                        <tr>
                            <td>
                                <span class="input-icon">
                                    <input autocomplete="off" id="nav-search-input" type="text" name="field1"
                                           value="${pd.field1 }" placeholder="请输入店铺名称"/>
                                </span>
                            </td>
                            <td style="vertical-align:top;">
                                <select class="chzn-select" name="field2" id="field2" data-placeholder="请选择店铺等级"
                                        style="vertical-align:top;width: 150px;">
                                    <option class="cel" value=""></option>
                                </select>
                            </td>
                            <td style="vertical-align:top;">
                                <select class="chzn-select" name="field3" id="field3" data-placeholder="请选择店铺状态"
                                        style="vertical-align:top;width: 120px;">
                                    <option class="cel" value=""></option>
                                    <option class="cel" value="">全部</option>
                                    <option value="0" ${var.STORE_STATUS=='0'?'selected':''}>关闭</option>
                                    <option value="1" ${var.STORE_STATUS=='1'?'selected':''}>正常</option>
                                </select>
                            </td>
                            <td style="vertical-align:top;">
                                <button class="btn btn-mini btn-light" onclick="search();" title="检索"><i
                                        id="nav-search-icon" class="icon-search"></i></button>
                            </td>
                        </tr>
                    </table>
                    <!-- 检索  -->


                    <table id="table_report" class="table table-striped table-bordered table-hover">

                        <thead>
                        <tr>
                            <th class="center">
                                <label><input type="checkbox" id="zcheckbox"/><span class="lbl"></span></label>
                            </th>
                            <th class="center">店铺名称</th>
                            <th class="center">店主用户名 | 店主姓名</th>
                            <th class="center">所在地</th>
                            <th class="center">店铺类别</th>
                            <th class="center">店铺等级</th>
                            <th class="center">有效期至</th>
                            <th class="center">店铺状态</th>
                            <th class="center">是否推荐</th>
                            <th class="center">操作</th>
                        </tr>
                        </thead>

                        <tbody>

                        <!-- 开始循环 -->
                        <c:choose>
                            <c:when test="${not empty varList}">
                                <c:if test="${QX.cha == 1 }">
                                    <c:forEach items="${varList}" var="var" varStatus="vs">
                                        <tr>
                                            <td class='center' style="width: 30px;">
                                                <label><input type='checkbox' name='ids' value="${var.ID}"/><span
                                                        class="lbl"></span></label>
                                            </td>
                                            <td class="center">${var.STORE_NAME}</td>
                                            <td class="center">${var.STORE_USERNAME} | ${var.STORE_OWER}</td>
                                            <td class="center">${var.STORE_ADDRESS}</td>
                                            <td class="center">${var.STORE_TYPE}</td>
                                            <td class="center">${var.STORE_LEVEL}</td>
                                            <td class="center">
                                                <fmt:formatDate pattern="yyyy-MM-dd HH:MM:SS"
                                                                value="${var.DELIVERY_END_TIME}"/></td>
                                            <td style="width: 60px;" class="center">
                                                <c:if test="${var.STORE_STATUS == '1'}"><span
                                                        class="label label-important arrowed-in">正常</span></c:if>
                                                <c:if test="${var.STORE_STATUS == '0'}"><span
                                                        class="label label-success arrowed">关闭</span></c:if>
                                            </td>
                                            <td class="center">
                                                <c:if test="${var.STORE_RECOMMEND == '0'}"><input
                                                        id="switch-field-1" name="switch-field-1"
                                                        class="ace-switch ace-switch-2" type="checkbox"
                                                        onchange="javascript:haha(this,${var.ID})"/><span
                                                        class="lbl"></span></c:if>
                                                <c:if test="${var.STORE_RECOMMEND == '1'}"><input id="switch-field-1"
                                                                                                  name="switch-field-1"
                                                                                                  class="ace-switch ace-switch-2"
                                                                                                  type="checkbox"
                                                                                                  checked="checked"
                                                                                                  onchange="javascript:haha(this,${var.ID})"/><span
                                                        class="lbl"></span></c:if>
                                            </td>
                                            <td style="width: 30px;" class="center">

                                                <div class='hidden-phone visible-desktop btn-group'>
                                                    <c:if test="${QX.edit != 1 && QX.del != 1 }">
                                                        <span class="label label-large label-grey arrowed-in-right arrowed-in"><i
                                                                class="icon-lock" title="无权限"></i></span>
                                                    </c:if>
                                                    <div class='hidden-phone visible-desktop btn-group'>
                                                        <c:if test="${QX.edit == 1 }"><a class='btn btn-mini btn-info'
                                                                                         title="修改"
                                                                                         onclick="edit('${var.ID}');"><i
                                                                class='icon-edit'></i></a></c:if>
                                                        <c:if test="${QX.del == 1 }"><a class='btn btn-mini btn-danger'
                                                                                        title="删除"
                                                                                        onclick="del('${var.ID}');"><i
                                                                class='icon-trash'></i></a></c:if>
                                                    </div>
                                                </div>

                                            </td>
                                        </tr>

                                    </c:forEach>
                                </c:if>
                                <c:if test="${QX.cha == 0 }">
                                    <tr>
                                        <td colspan="100" class="center">您无权查看</td>
                                    </tr>
                                </c:if>
                            </c:when>
                            <c:otherwise>
                                <tr class="main_info">
                                    <td colspan="100" class="center">没有相关数据</td>
                                </tr>
                            </c:otherwise>
                        </c:choose>


                        </tbody>
                    </table>

                    <div class="page-header position-relative">
                        <table style="width:100%;">
                            <tr>
                                <td style="vertical-align:top;">
                                    <c:if test="${QX.add == 1 }">
                                        <a class="btn btn-small btn-success" onclick="add();">新增</a>
                                    </c:if>
                                    <c:if test="${QX.del == 1 }">
                                        <a class="btn btn-small btn-danger" onclick="makeAll('确定要删除选中的数据吗?');"
                                           title="批量删除"><i class='icon-trash'></i></a>
                                    </c:if>
                                </td>
                                <td style="vertical-align:top;">
                                    <div class="pagination"
                                         style="float: right;padding-top: 0px;margin-top: 0px;">${page.pageStr}</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>


            <!-- PAGE CONTENT ENDS HERE -->
        </div><!--/row-->

    </div><!--/#page-content-->
</div><!--/.fluid-container#main-container-->

<!-- 返回顶部  -->
<a href="#" id="btn-scroll-up" class="btn btn-small btn-inverse">
    <i class="icon-double-angle-up icon-only"></i>
</a>

<!-- 引入 -->
<script type="text/javascript">window.jQuery || document.write("<script src='static/js/jquery-1.9.1.min.js'>\x3C/script>");</script>
<script src="static/js/bootstrap.min.js"></script>
<script src="static/js/ace-elements.min.js"></script>
<script src="static/js/ace.min.js"></script>

<script type="text/javascript" src="static/js/chosen.jquery.min.js"></script><!-- 下拉框 -->
<script type="text/javascript" src="static/js/bootstrap-datepicker.min.js"></script><!-- 日期框 -->
<script type="text/javascript" src="static/js/bootbox.min.js"></script><!-- 确认窗口 -->
<!-- 引入 -->
<script type="text/javascript" src="static/js/jquery.tips.js"></script><!--提示框-->
<script type="text/javascript" src="static/js/layer/layer.js"></script>
<script type="text/javascript">

    $(top.hangge());

    //检索
    function search() {
        top.jzts();
        $("#Form").submit();
    }


    function haha(obj, uid) {
        var msg = "";
        var bl = "";
        if ($(obj).prop("checked")) {
            msg = "你确定要推荐此店铺吗？";
            bl = "0";
        } else {
            msg = "你确定要关闭此店铺的推荐吗？";
            bl = "1";
        }
        if (window.confirm(msg)) {
            if (bl == '1') {
                $.ajax({
                    url: 'mall_store/editRecommend.do?STORE_RECOMMEND=0&ID=' + uid,
                    type: "POST",
                    dataType: 'json',
                    success: function (ret) {
// 						    	console.log(ret);
                        if (ret.ok == 'false') {
                            layer.msg(ret.msg);
                            return false;
                        } else {
                            $(obj).attr('checked', false)
                        }
                    }
                });
            } else {
                $.ajax({
                    url: 'mall_store/editRecommend.do?STORE_RECOMMEND=1&ID=' + uid,
                    type: "POST",
                    dataType: 'json',
                    success: function (ret) {
//						    	console.log(ret);
                        if (ret.ok == 'false') {
                            layer.msg(ret.msg);
                            return false;
                        } else {
                            $(obj).attr('checked', true)
                        }
                    }
                });
            }
        } else {
            if (bl == '1') {
                $(obj).attr('checked', true)
            } else {
                $(obj).attr('checked', false)
            }
        }
    }

    //新增
    function add() {
        top.jzts();
        var diag = new top.Dialog();
        diag.Drag = true;
        diag.Title = "新增";
        diag.URL = '<%=basePath%>mall_store/goAdd.do';
        diag.Width = 450;
        diag.Height = 355;
        diag.CancelEvent = function () { //关闭事件
            if (diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none') {
                if ('${page.currentPage}' == '0') {
                    top.jzts();
                    setTimeout("self.location=self.location", 100);
                } else {
                    nextPage(${page.currentPage});
                }
            }
            diag.close();
        };
        diag.show();
    }

    //删除
    function del(Id) {
        bootbox.confirm("确定要删除吗?", function (result) {
            if (result) {
                top.jzts();
                var url = "<%=basePath%>mall_store/delete.do?ID=" + Id + "&tm=" + new Date().getTime();
                $.get(url, function (data) {
                    nextPage(${page.currentPage});
                });
            }
        });
    }

    //修改
    function edit(Id) {
        top.jzts();
        var diag = new top.Dialog();
        diag.Drag = true;
        diag.Title = "编辑";
        diag.URL = '<%=basePath%>mall_store/goEdit.do?ID=' + Id;
        diag.Width = 600;
        diag.Height = 700;
        diag.CancelEvent = function () { //关闭事件
            if (diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none') {
                nextPage(${page.currentPage});
            }
            diag.close();
        };
        diag.show();
    }
</script>

<script type="text/javascript">

    $(function () {

        //下拉框
        $(".chzn-select").chosen();
        $(".chzn-select-deselect").chosen({allow_single_deselect: true});

        //日期框
        $('.date-picker').datepicker();

        //复选框
        $('table th input:checkbox').on('click', function () {
            var that = this;
            $(this).closest('table').find('tr > td:first-child input:checkbox')
                .each(function () {
                    this.checked = that.checked;
                    $(this).closest('tr').toggleClass('selected');
                });

        });

    });


    //批量操作
    function makeAll(msg) {
        bootbox.confirm(msg, function (result) {
            if (result) {
                var str = '';
                for (var i = 0; i < document.getElementsByName('ids').length; i++) {
                    if (document.getElementsByName('ids')[i].checked) {
                        if (str == '') str += document.getElementsByName('ids')[i].value;
                        else str += ',' + document.getElementsByName('ids')[i].value;
                    }
                }
                if (str == '') {
                    bootbox.dialog("您没有选择任何内容!",
                        [
                            {
                                "label": "关闭",
                                "class": "btn-small btn-success",
                                "callback": function () {
                                    //Example.show("great success");
                                }
                            }
                        ]
                    );

                    $("#zcheckbox").tips({
                        side: 3,
                        msg: '点这里全选',
                        bg: '#AE81FF',
                        time: 8
                    });

                    return;
                } else {
                    if (msg == '确定要删除选中的数据吗?') {
                        top.jzts();
                        $.ajax({
                            type: "POST",
                            url: '<%=basePath%>mall_store/deleteAll.do?tm=' + new Date().getTime(),
                            data: {DATA_IDS: str},
                            dataType: 'json',
                            //beforeSend: validateData,
                            cache: false,
                            success: function (data) {
                                $.each(data.list, function (i, list) {
                                    nextPage(${page.currentPage});
                                });
                            }
                        });
                    }
                }
            }
        });
    }

    //导出excel
    function toExcel() {
        window.location.href = '<%=basePath%>mall_store/excel.do';
    }
</script>

</body>
</html>

