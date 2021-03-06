/**
 * Copyright:  北京互融时代软件有限公司
 *
 * @author: Wu Shuiming
 * @version: V1.0
 * @Date: 2015年11月06日  14:57:13
 */
package com.mz.exchange.entrust.dao;

import com.mz.core.mvc.dao.base.BaseDao;
import com.mz.exchange.account.model.ExDigitalmoneyAccount;
import com.mz.trade.entrust.model.ExOrderInfo;
import java.util.List;
import java.util.Map;

/**
 * <p> TODO</p>
 *
 * @author: Gao Mimi
 * @Date :          2016年4月12日 下午4:45:50
 */
public interface ExExOrderInfoDao extends BaseDao<ExOrderInfo, Long> {

  public List<ExDigitalmoneyAccount> getpositionAvePrice(Map<String, Object> map);
}
