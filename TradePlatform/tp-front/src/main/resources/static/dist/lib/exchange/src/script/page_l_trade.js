define(function (require) {
    function a(a) {
        _orderType = a.data("order-type") || "PlaceOrder", _panelType = a.data("panel-type") || "Limited"
    }

    function e(a) {
        if ("HBForm" === a.Type) return a;
        var e = $(a);
        return e.find("[name]").each(function (a, t) {
            var n = $(t), r = n.attr("name");
            e[r] = n, e[r].Value = n.val()
        }), e.Type = "HBForm", e
    }

    function t(a, e) {
        return /\.$/.test(a) ? d(a) : d(a, e)
    }

    function n() {
        var a = this;
        a.FormatVal = function (e) {
            var n = a.val();
            if (n < 0 && (n = 0, a.val(n)), "" != n && !("price" == e ? /^(([0-9]{1}\d*)|([0]{1}))(\.(\d){0,2})?$/ : /^(([0-9]{1}\d*)|([0]{1}))(\.(\d){0,4})?$/).test(n)) {
                $(".keepDecimalForCoin").val(), $(".keepDecimalForCurrency").val();
                n = t(1 * n, "price" == e ? Number(3) : Number(4)), a.val(n)
            }
            var r = $(".buyrate").val(), o = $(".sellrate").val(), _ = $("#buy_price").val(),
                i = $("#buy_amount").val(), c = $("#sell_price").val(), u = $("#sell_amount").val(),
                l = Number(r) / 100 * (Number(_) * Number(i)), m = Number(o) / 100 * (Number(c) * Number(u)),
                s = a.attr("id");
            return void 0 != s && ("buy" == s.substring(0, s.indexOf("_")) ? $(".buyCharge").html(t(l, 3)) : $(".sellCharge").html(t(m, 3))), 1 * n
        }
    }

    function r(a, e, t) {
        var n;
        return "PlaceOrder" === _orderType ? e && a ? (n = s.Mul(1 * e, 1 * a), t && t.html(d(n, 3)).attr("actual", n)) : (n = 0, t && t.html("0.00")) : "PlaceMarketOrder" === _orderType && (n = void 0 !== a ? a : e), n
    }

    function o(a) {
        var e = a || {}, t = e.trade_type, n = e.loan_type, r = e.price, o = e.available, _ = s.Add(e.loan_enable, o),
            i = [];
        i = function (a, e, r, o, _) {
            var i = [];
            return "buy" === t ? (i[0] = r ? s.Div(n ? e : a, r) : 0, i[0] = i[0] < o[0] ? i[0] : o[0], i[1] = n ? e : a, i[1] = i[1] < _[0] ? i[1] : _[0]) : (i[2] = n ? e : a, i[2] = i[2] < o[1] ? i[2] : o[1], i[3] = n ? e < _[1] ? e : _[1] : a < _[1] ? a : _[1]), i
        }(o, _, r, [_limits.trade["max_buy_" + _coinType], _limits.trade["max_sell_" + _coinType]], [_limits.trade["max_buy_" + _coinType + "_mp"], _limits.trade["max_sell_" + _coinType + "_mp"]]), void 0 !== i[0] && (_caches.trade.buy_max = i[0]), void 0 !== i[1] && (_caches.trade.buy_max_mp = i[1]), void 0 !== i[2] && (_caches.trade.sell_max = i[2]), void 0 !== i[3] && (_caches.trade.sell_max_mp = i[3])
    }

    function _(a, e) {
        "buy" === a ? "PlaceOrder" == _orderType ? e && e.attr("data-max", d(_caches.trade.buy_max, 4)).parent().find(".max_amount_num").html(d(_caches.trade.buy_max, 4)) : "PlaceMarketOrder" === _orderType && e && e.attr("data-max", d(_caches.trade.buy_max_mp, 4)).parent().find(".max_amount_num").html(d(_caches.trade.buy_max_mp, 4)) : "PlaceOrder" == _orderType ? e && e.attr("data-max", d(_caches.trade.sell_max, 4)).parent().find(".max_amount_num").html(d(_caches.trade.sell_max, 4)) : "PlaceMarketOrder" === _orderType && e && e.attr("data-max", d(_caches.trade.sell_max_mp, 4)).parent().find(".max_amount_num").html(d(_caches.trade.sell_max_mp, 4))
    }

    function i(a, e, t, n, r, o) {
        var _ = 0;
        return _ = "buy" === t ? 1 * s.Sub(a[0], e) > 0 ? 1 * s.Sub(a[0], e) : 0 : 1 * s.Sub(a[1], e) > 0 ? 1 * s.Sub(a[1], e) : 0, _ = _ > 0 && _ < _limits.loan["min_" + r] ? _limits.loan["min_" + r] : _, "buy" === t ? n && n.html(o ? d(c(_, "currency"), 4) : "0.00").attr("data-amount", c(d(_), "currency")) : n && n.html(o ? d(c(_, "coin"), 4) : "0.0000").attr("data-amount", c(d(_), "coin")), _
    }

    function c(a, e) {
        var t;
        return "currency" == e && (t = Math.floor(100 * a + .9) / 100), "coin" == e && (t = Math.floor(1e4 * a + .9) / 1e4), t
    }

    function u(a, e, t) {
        var n = t && e ? t / e * 100 : 0;
        a.Update(n)
    }

    function l(a, n, r) {
        var o = $(n), _ = o.find(".range_ratio"), i = e(o.parents("form")), c = i.data("trade-type"), u = a / 100;
        u ? _.show() : _.hide(), _.css({left: a + "%"}), "PlaceOrder" === _orderType ? "buy" === c ? i.amount.val(t(s.Mul(_caches.trade.buy_max, u), 4)).trigger("keyup", ["slide"]) : i.amount.val(t(s.Mul(_caches.trade.sell_max, u), 4)).trigger("keyup", ["slide"]) : "PlaceMarketOrder" === _orderType && ("buy" === c ? i.market_transaction_amount.val(t(s.Mul(_caches.trade.buy_max_mp, u), 4)).trigger("keyup", ["slide"]) : i.market_amount.val(t(s.Mul(_caches.trade.sell_max_mp, u), 4)).trigger("keyup", ["slide"]))
    }

    function m(a, e) {
        var t = a || {};
        f({
            url: "/trade/do_" + t.type + "?st=trade_trade&order_source=8",
            data: t.data,
            type: "POST",
            init: t.init
        }, function (a) {
            var t = a.code;
            if (console.log("trade ajax", t), "success" == t || "error" == t) {
                var n = a.data;
                e && e(n, t)
            }
        })
    }

    var s = require("./module_accurate"), d = require("./module_number"), p = require("./module_validator"),
        y = require("./module_range"), f = require("./module_ajax"), g = require("./module_switch"),
        b = require("./module_cookie"), h = require("./module_dialog"), v = require("./module_md5"),
        k = require("./module_this_jack"), x = require("./page_l_notice"), T = require("./page_l_order"),
        $ = require("jquery"), w = (require("./module_hb_extend"), $(document)), F = {};
    DOC = {}, HRYB.BALANCE = F, DOC.doc = $(document), _limits = {
        trade: {
            max_buy_cny_btc: 2e8,
            max_buy_cny_ltc: 2e8,
            max_sell_cny_btc: 2e8,
            max_sell_cny_ltc: 2e8,
            max_buy_usd_btc: 2e8,
            max_buy_usd_ltc: 2e8,
            max_sell_usd_btc: 2e8,
            max_sell_usd_ltc: 2e8,
            max_buy_cny_btc_mp: 2e8,
            max_buy_cny_ltc_mp: 2e8,
            max_sell_cny_btc_mp: 2e8,
            max_sell_cny_ltc_mp: 2e8,
            max_buy_usd_btc_mp: 2e8,
            max_buy_usd_ltc_mp: 2e8,
            max_sell_usd_btc_mp: 2e8,
            max_sell_usd_ltc_mp: 2e8
        }, loan: {min_cny_cny: 100, min_cny_btc: .1, min_cny_ltc: 1, min_usd_usd: 50, min_usd_btc: .1, min_usd_ltc: 1}
    }, _caches = {
        trade: {buy_max: 0, sell_max: 0, buy_max_mp: 0, sell_max_mp: 0},
        loan: {
            cny_cny: {enable: 0, total: 0},
            cny_btc: {enable: 0, total: 0},
            cny_ltc: {enable: 0, total: 0},
            usd_usd: {enable: 0, total: 0},
            usd_btc: {enable: 0, total: 0}
        }
    }, _orderType = "PlaceOrder", _panelType = "Limited", _coinType = document.getElementsByName("coin_type")[0].value, _dom = {".form_trade": $(".form_trade")}, buyRange = new y({
        range: "#range_buy",
        step: 1,
        point: 4,
        delay: 10,
        slide: function (a, e) {
            l(a, e)
        }
    }), sellRange = new y({
        range: "#range_sell", step: 1, point: 4, delay: 10, slide: function (a, e) {
            l(a, e)
        }
    }), buyRangeMp = new y({
        range: "#range_buy_mp", step: 1, point: 4, delay: 15, slide: function (a, e) {
            l(a, e)
        }
    }), sellRangeMp = new y({
        range: "#range_sell_mp", step: 1, point: 4, delay: 15, slide: function (a, e) {
            l(a, e)
        }
    }), _CSRF = document.getElementsByName("_csrf")[0] && document.getElementsByName("_csrf")[0].value, GetLoanInfo = function (a, e) {
        UID
    }, GetLoanNow = function (a, e) {
        var t = a || {}, n = t.amount || 0
    }, window.buyRange = buyRange;
    var C = GetLoanInfo("cny_cny,cny_btc", "cny_btc" == _coinType),
        M = GetLoanInfo("cny_cny,cny_ltc", "cny_ltc" == _coinType),
        O = GetLoanInfo("usd_usd,usd_btc", "usd_btc" == _coinType);
    !function () {
        function t() {
            var a = b.Cookie("trade_pwd_on"), e = b.Cookie("trade_pwd_time");
            return "0" != a && ("1" == a || (!e || "0" == e))
        }

        function c(a) {
            function e() {
                a && a(), B.Close()
            }

            P.val("");
            var t = P.data("msg-null");
            N.removeClass("v_error").text(""), L.is(":hidden") && (B.Show(), P.focus(), L.attr("data-init", "1"), P.off("keydown"), R.off("click"), P.keydown(function (a) {
                13 == a.keyCode && (F = P.val(), e())
            }), R.on("click", function () {
                F = P.val(), F && "" != F ? e() : N.addClass("v_error").text(t)
            }))
        }

        function l(a, e) {
            function t(a) {
                return a.addClass("focus"), setTimeout(function () {
                    a.removeClass("focus")
                }, 300), a
            }

            var n, r, o, _ = this, i = null, c = _, u = a, l = u.find(".info"),
                m = [$("#buy_price"), $("#buy_amount"), $("#sell_price"), $("#sell_amount")];
            c.on("mouseover", ".tr", function () {
                n = $(this), _.Show(n)
            }), c.on("mouseout", ".tr", function () {
                _.Hide()
            }), u.hover(function () {
                _.Clear()
            }, function () {
                _.Hide()
            }).on("click", "span", function () {
                var a = $(this), e = a.attr("data-info") && a.attr("data-info").split("|"), n = e && isNaN(1 * e[0]),
                    o = 1 * u.find(".col_2").attr("data-info"), _ = u.attr("data-type");
                e && UID && ("Lightning" == _panelType ? n && w.trigger("__LightTrade", [o, e[0], _]) : ("Limited" !== _panelType && (w.trigger("__OrderType", [1]), w.trigger("__TradeTab", [1])), "sell" == r ? (t(m[0]).val(e[0]).keyup(), e[1] && t(m[1]).val(e[1]).keyup()) : (t(m[2]).val(e[0]).keyup(), e[1] && t(m[3]).val(e[1]).keyup())))
            }), _.Show = function (a) {
                _.Clear();
                var e = a.offset();
                o = "Lightning" == _panelType && UID ? "light" : "", r = a.data("type"), u.css({
                    display: "block",
                    top: e.top,
                    left: e.left + 5
                }).attr("data-type", "buy" == r ? "buy" : "sell")[0].className = "buy" == r ? "font_buy " + o : "font_sell " + o, l.html(a.html())
            }, _.Hide = function () {
                i = setTimeout(function () {
                    u.hide()
                }, 50)
            }, _.Clear = function () {
                clearTimeout(i)
            }
        }

        function y(a, t) {
            var n = e(a), r = (n.find(".transaction_amount"), n.find(".loan_amount"), n.find(".trade_msg"));
            "all" === t && n.price.val(""), n.amount && n.amount.val("").keyup(), n.market_transaction_amount && n.market_transaction_amount.val("").keyup(), n.market_amount && n.market_amount.val("").keyup(), r && r.html(""), n.loan_switch && n.loan_switch.prop("checked", !1).attr("data-loan-state", 0).change()
        }

        function f() {
            V.total = d(s.Mul(V.amount, V.times), 4), E.html(V.total)
        }

        var F, L = $("#trade_pwd_dialog"), B = new h({dialog: L}, function (a, e, t) {
            "close" == e && t && L.attr("data-init", "")
        }), N = L.find(".tip"), R = $("#trade_pwd_submit"), P = $("#trade_pwd");
        p({
            forms: _dom[".form_trade"], tip: ".trade_msg", beforeValidation: function (a) {
                a.attr("action", HRY.host + "/user/trades/add"), w.trigger("__TradeFormValidation", [a])
            }, beforeSubmit: function (a) {
                var t = e(a), n = t.data("trade-type"), r = t.coin_type.val().split("_"),
                    o = "buy" == n ? r[0] + "_" + r[0] : r[0] + "_" + r[1], _ = t.loan_switch,
                    i = _ && 1 * _.attr("data-loan-state"), c = 1 * t.find(".loan_amount").attr("data-amount");
                if (t._coin = o, c > 0 && _.prop("checked")) switch (i) {
                    case 0:
                        return w.trigger("__GetLoanNow", [t, o, c]), !1;
                    case 1:
                        return !1;
                    case 2:
                        break;
                    case 3:
                    default:
                        return !1
                }
                w.trigger("__TradeFormBeforeSubmit", [t])
            }, callback: function (a, e) {
                L.attr("data-init", ""), w.trigger("__TradeFormCallback", [e, JSON.parse(a)])
            }, postData: function (a) {
                for (var e = [{
                    name: "coinCode",
                    value: CURRENT_SYMBOL
                }], t = 0; t < a.length; t++) "price" == a[t].name ? e.push({
                    name: "entrustPrice",
                    value: a[t].value
                }) : "amount" == a[t].name || "market_amount" == a[t].name ? e.push({
                    name: "entrustCount",
                    value: a[t].value
                }) : "order_type" == a[t].name || "coin_type" == a[t].name || ("market_transaction_price" == a[t].name ? e.push({
                    name: "entrustSum",
                    value: a[t].value
                }) : e.push(a[t]));
                return "" != $.trim(F) && v.hbmd5(F), e
            }, ajaxError: function (a) {
                L.attr("data-init", ""), w.trigger("__TradeFormError", [a])
            }
        }), _dom[".form_trade"].each(function () {
            var a = e($(this)), t = a.data("trade-type"), r = a.coin_type.val().split("_"),
                o = "buy" == t ? r[0] + "_" + r[0] : r[0] + "_" + r[1], _ = a.loan_switch,
                i = (a.find(".loan_available"), a.find(".range_wrap")), c = a.find(".max_amount"),
                u = a.find(":submit"), l = (c.parent(), c.find("b")), m = a.find(".trade_amount"), s = {
                    price: a.price && a.price.Value || 0,
                    amount: a.amount && a.amount.Value || 0,
                    market_t: a.market_transaction_amount && a.market_transaction_amount.Value || 0,
                    market_a: a.market_amount && a.market_amount.Value || 0
                };
            k(n, a.price), k(n, a.amount), k(n, a.market_transaction_amount), k(n, a.market_amount), a._DMax = c, a._DMaxB = l, a._type = t, a._coin = o, a.transaction_amount = a.find(".transaction_amount"), a.loan_amount = a.find(".loan_amount"), a.max_amount = a.find(".max_amount"), function (e) {
                for (var t = e.length, n = 0; n < t; n++) e[n] && e[n].on("focus", function () {
                    a.trigger("__FormMax"), $(this).parent().addClass("focus")
                }).on("blur", function () {
                    $(this).parent().removeClass("focus"), 1 * $(this).val() <= 0 && $(this).val("")
                }).on("__Focus", function () {
                    $(this).parent().addClass("focus")
                })
            }([a.price, a.amount, a.market_transaction_amount, a.market_amount]), a.price && a.price.on("keyup change", function (e, t) {
                s.price = a.price.FormatVal("price"), a.trigger("__FormMax"), w.trigger("__TradeFormChange", [a, s, t, "price change"]), u.prop("disabled", !1)
            }).on("keypress", function () {
                u.prop("disabled", !0)
            }).on("change", function () {
            }), a.amount && a.amount.on("keyup change", function (e, t) {
                s.amount = a.amount.FormatVal("amount"), w.trigger("__TradeFormChange", [a, s, t, "amount change"]), u.prop("disabled", !1)
            }).on("keypress", function () {
                u.prop("disabled", !0)
            }), a.market_transaction_amount && a.market_transaction_amount.on("keyup change", function (e, t) {
                s.market_t = a.market_transaction_amount.FormatVal("price"), w.trigger("__TradeFormChange", [a, s, t, "market_t change"])
            }), a.market_amount && a.market_amount.on("keyup change", function (e, t) {
                s.market_a = a.market_amount.FormatVal("amount"), w.trigger("__TradeFormChange", [a, s, t, "market_a change"])
            }), _.on("change", function () {
                var e = $(this);
                a.trigger("__FormMax"), w.trigger("__TradeFormChange", [a, s, "", "loan change"]), e.prop("checked") ? (w.trigger("__GetLoanInfo", [_coinType, "loan success"]), m.addClass("show_loan")) : m.removeClass("show_loan")
            }), i.on("focus", function () {
                a.trigger("__FormMax"), a.amount && a.amount.trigger("__Focus"), a.transaction_amount && a.transaction_amount.trigger("__Focus"), a.market_transaction_amount && a.market_transaction_amount.trigger("__Focus"), a.market_amount && a.market_amount.trigger("__Focus")
            }).on("blur", function () {
                $(this).parent().siblings().removeClass("focus")
            }), a.on("__FormMax", function () {
                HRYB.BALANCE && w.trigger("__TradeMax", [a, {
                    trade_type: t,
                    available: HRYB.BALANCE[o + "_available"] || 0,
                    price: s.price,
                    loan_type: _ && _.prop("checked"),
                    loan_enable: _caches.loan[o].enable,
                    coin: o
                }, "__FormMax"])
            })
        }), k(l, $("#market_depth"), $("#quick_bar"));
        var G = $("#light_switch"), H = $("#light_times"), A = $("#light_amount"), S = $("#light_price"),
            E = $("#light_total"), V = {}, D = A.data("min");
        k(n, A), V = {
            times: 1,
            amount: A.FormatVal("amount"),
            total: d(s.Mul(V.amount, V.times), 4),
            state: G.prop("checked")
        }, f(), A.on("keyup", function () {
            $(this);
            V.amount = A.FormatVal("amount"), f()
        }).on("change blur", function () {
            var a = $(this);
            1 * a.val() < D && (a.val(D), V.amount = D), f()
        }), H.on("click", "span", function () {
            var a = $(this), e = 1 * a.data("info");
            a.addClass("cur").siblings().removeClass("cur"), V.times = e, f()
        }), G.on("change", function () {
            V.state = G.prop("checked")
        }), w.on("__LightTrade", function (a, e, n, r) {
            function o() {
                x({message: window.Texts && Texts.ordering});
                var a = "";
                "" != $.trim(F) && (a = v.hbmd5(F)), m({
                    type: _,
                    init: !0,
                    data: {price: e, amount: V.total, coin_type: _coinType, order_type: _orderType, trade_pwd: a && a}
                }, function (a, e) {
                    console.log(e), "success" == e && w.trigger("__TradeFormCallback", ["", a]), "error" == e && w.trigger("__TradeFormError")
                })
            }

            if (!V.state) return x({message: window.Texts && Texts.please_open_loan, type: "error", long: 5e3}), !1;
            var _ = "buy" == r ? "eat" == n ? "sell" : "buy" : "eat" == n ? "buy" : "sell";
            if (S.html(e)[0].className = "buy" == _ ? "font_buy" : "font_sell", console.log("__LightTrade"), L.is(":hidden") && t()) return c(function () {
                o()
            }), !1;
            o()
        }), HRYB.NUM = d, g({Switch: ".switch"}), w.on("DoDocHidden", function () {
            HRYB.GLOBAL.docHidden ? T.GetOrder && T.GetOrder.Stop() : T.GetOrder && T.GetOrder.Play()
        }), w.on("__TradeFormChange", function (a, e, t, n, o) {
            if (HRYB.BALANCE) {
                i([r("PlaceOrder" == _orderType ? t.price : t.market_t, t.amount, e.transaction_amount), "PlaceOrder" == _orderType ? t.amount : t.market_a], HRYB.BALANCE[e._coin + "_available"] || 0, e._type, e.loan_amount, e._coin, e.loan_switch.prop("checked")), "slide" !== n && ("buy" === e._type ? ("" !== t.amount && "PlaceOrder" == _orderType && u(buyRange, _caches.trade.buy_max, t.amount), "" !== t.market_t && "PlaceMarketOrder" == _orderType && u(buyRangeMp, _caches.trade.buy_max_mp, t.market_t)) : ("" !== t.amount && "PlaceOrder" == _orderType && u(sellRange, _caches.trade.sell_max, t.amount), "" !== t.market_a && "PlaceMarketOrder" == _orderType && u(sellRangeMp, _caches.trade.sell_max_mp, t.market_a)))
            }
        }).on("__TradeMax", function (a, e, t, n) {
            HRYB.BALANCE && (o(t), _(e._type, "PlaceOrder" == _orderType ? e.amount : "buy" == e._type ? e.market_transaction_amount : e.market_amount))
        }).on("__TradeFormBeforeSubmit", function (a, e) {
            var t = e.find(":submit"), n = t.data("msg-submit").split(",");
            t.text(n[1] + n[3]), x({message: n[1] + n[3]})
        }).on("__TradeFormCallback", function (a, e, t) {
            var n = (e && e.attr("data-form-type"), e && e.find(":submit")), r = e && n.data("msg-submit").split(",");
            1 == t.success ? (T.GetOrder.Play(), "PlaceMarketOrder" === _orderType ? setTimeout(function () {
                T.GetHistory.Fire()
            }, 1e3) : setTimeout(function () {
                T.GetHistory.Fire()
            }, 500), x({message: t.msg, long: 1800}), n && n.text(r[0])) : (x({
                message: t.msg,
                type: "error",
                long: 5e3
            }), n && n.text(r[0])), y(e), L.attr("data-init", ""), HRYB.AJAX.GetBalance.Fire()
        }).on("__TradeFormError", function (a, e) {
            var t = (e && e.attr("data-form-type"), e && e.find(":submit")), n = e && t.data("msg-submit").split(",");
            L.attr("data-init", ""), x({
                message: window.Texts && Texts.tradeError,
                type: "error",
                long: 5e3
            }), t && t.text(n[0])
        }).on("__LoanWrite", function () {
            for (var a in _caches.loan) {
                var e = _caches.loan[a];
                $(".loan_" + a).html((/btc|ltc/.test(a), d(e.enable, 4))).attr("data-enable", e.enable), e.enable ? $(".loan_switch_" + a).prop("disabled", !1).trigger("__Update") : $(".loan_switch_" + a).prop("disabled", !0).trigger("__Update")
            }
        }).on("__GetLoanNow", function (a, e, t, n) {
            var r, o = e.find(":submit"), _ = o.data("msg-submit").split(",");
            GetLoanNow({loan_type: e._coin, amount: n}, function (a) {
                switch (a.code) {
                    case"loading":
                        e.loan_switch.attr("data-loan-state", 1), o.text(_[2] + _[3]), x({message: _[2] + _[3]});
                        break;
                    case"error":
                        e.loan_switch.attr("data-loan-state", 0);
                        break;
                    case"success":
                        if (r = a.data, 0 === r.code) {
                            e.loan_switch.attr("data-loan-state", 2), HRYB.AJAX.GetBalance.Fire(), w.trigger("__GetLoanInfo", [_coinType, "loan success"]), e.submit();
                            break
                        }
                        x({
                            message: r.msg,
                            type: "error",
                            long: 5e3
                        }), e.loan_switch.attr("data-loan-state", 0), o.text(_[0])
                }
            })
        }).on("__GetLoanInfo", function (a, e, t) {
            switch (e) {
                case"cny_btc":
                    C.Fire();
                    break;
                case"cny_ltc":
                    M.Fire();
                    break;
                case"usd_btc":
                    O.Fire()
            }
        }).on("__OrderType", function (e, t) {
            var n = $(".panel").eq(t);
            a(n), n.find("form").each(function () {
                y($(this))
            })
        })
    }()
});