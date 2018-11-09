/**
 * Copyright:   北京互融时代软件有限公司
 * @author:      Zhang Xiaofang
 * @version:      V1.0 
 * @Date:        2016年3月24日 上午11:48:36
 */
package com.mz.exchange.account.service.impl;

import com.mz.core.mvc.dao.base.BaseDao;
import com.mz.core.mvc.service.base.impl.BaseServiceImpl;
import com.mz.exchange.account.model.AppFundAccount;
import com.mz.exchange.account.service.AppFundAccountService;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * <p> TODO</p>
 * @author:         Zhang Xiaofang 
 * @Date :          2016年3月24日 上午11:48:36 
 */

@Service("appFundAccountService")
public class AppFundAccountServiceImpl extends BaseServiceImpl<AppFundAccount, Long>   implements AppFundAccountService{

	@Resource(name="appFundAccountDao")
	@Override
	public void setDao(BaseDao<AppFundAccount, Long> dao) {
		// TODO Auto-generated method stub
		super.dao=dao;
	}

}
