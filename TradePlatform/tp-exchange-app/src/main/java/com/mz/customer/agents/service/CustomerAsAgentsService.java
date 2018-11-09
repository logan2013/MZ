/**
 * Copyright:   北京互融时代软件有限公司
 *
 * @author: Wu Shuiming
 * @version: V1.0
 * @Date: 2016年7月6日 下午6:02:18
 */
package com.mz.customer.agents.service;

import com.mz.core.mvc.service.base.BaseService;
import com.mz.customer.agents.model.CustomerAsAgents;
import com.mz.customer.user.model.AppCustomer;

/**
 * <p> TODO</p>
 * @author: Wu Shuiming
 * @Date :          2016年7月6日 下午6:02:18 
 */
public interface CustomerAsAgentsService extends BaseService<CustomerAsAgents, Long> {

  public void saveObj(AppCustomer appCustomer);

}                                                                                             
