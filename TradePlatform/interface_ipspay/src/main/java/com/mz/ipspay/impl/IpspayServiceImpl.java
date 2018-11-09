/**
 * Copyright:   北京互融时代软件有限公司
 * @author:      zhang lei
 * @version:      V1.0 
 * @Date:        2016年11月28日 下午3:29:10
 */
package com.mz.ipspay.impl;

import com.mz.ThirdPayInterfaceService;
import com.mz.utils.CommonRequest;
import com.mz.ipspay.IpspayInterfaceUtil;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * <p> TODO</p>
 * @author:         Zhang Lei 
 * @Date :          2016年11月28日 下午3:29:10
 */

public class IpspayServiceImpl implements ThirdPayInterfaceService {

	
    //充值
	public CommonRequest recharge(HttpServletResponse response,CommonRequest  request) {
		CommonRequest ret=IpspayInterfaceUtil.recharge(response,request);
		return ret;
	}
    //充值异步通知处理方法
	@Override
	public CommonRequest rechargeCallBack(Map<String, Object> map) {
		CommonRequest request=IpspayInterfaceUtil.rechargeCallBack(map);
		return request;
	}

	// 提现(接口暂未对接，目前使用的是先下打款到用户的账户)
	@Override
	public CommonRequest withdraw(CommonRequest request) {
		return null;
	}

	// 查询订单信息(暂未对接)
	@Override
	public CommonRequest queryOrder(CommonRequest request) {
		return null;
	}

	//提现异步通知处理方法
	@Override
	public CommonRequest withdrawCallBack(Map<String, Object> map) {
		return null;
	}


	//查询身份证信息
	@Override
	public CommonRequest checkIdentity(CommonRequest request) {
		return null;
	}


}
