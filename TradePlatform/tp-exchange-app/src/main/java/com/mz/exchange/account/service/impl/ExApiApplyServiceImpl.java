/**
 * Copyright:   北京互融时代软件有限公司
 *
 * @author: Zhang Xiaofang
 * @version: V1.0
 * @Date: 2016年5月12日 上午10:15:40
 */
package com.mz.exchange.account.service.impl;

import com.mz.core.mvc.dao.base.BaseDao;
import com.mz.core.mvc.service.base.impl.BaseServiceImpl;
import com.mz.exchange.account.model.ExApiApply;
import com.mz.exchange.account.service.ExApiApplyService;
import com.mz.util.EncryptUtil;
import com.mz.util.QueryFilter;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * <p> TODO</p>
 * @author: Zhang Xiaofang
 * @Date :          2016年5月12日 上午10:15:40 
 */
@Service("exApiApplyService")
public class ExApiApplyServiceImpl extends BaseServiceImpl<ExApiApply, Long> implements
    ExApiApplyService {


  @Resource(name = "exApiApplyDao")
  @Override
  public void setDao(BaseDao<ExApiApply, Long> dao) {
    // TODO Auto-generated method stub
    super.dao = dao;
  }


  @Override
  public List<ExApiApply> findList(Long customerId) {
    QueryFilter filter = new QueryFilter(ExApiApply.class);
    filter.addFilter("customerId=", customerId);
    return super.find(filter);
  }

  @Override
  public Map<String, String> createKey(ExApiApply exApiApply) {
    Map<String, String> map = EncryptUtil.getKeys(exApiApply.getCustomerId().toString());

    exApiApply.setCustomerId(exApiApply.getCustomerId());
    exApiApply.setAccessKey(map.get("pubKey"));

    super.save(exApiApply);

    return map;
  }

}
