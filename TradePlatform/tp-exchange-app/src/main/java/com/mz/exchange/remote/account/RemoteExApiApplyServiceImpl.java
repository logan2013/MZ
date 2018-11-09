/**
 * Copyright:   北京互融时代软件有限公司
 *
 * @author: Zhang Xiaofang
 * @version: V1.0
 * @Date: 2016年5月12日 上午11:53:57
 */
package com.mz.exchange.remote.account;

import com.alibaba.dubbo.rpc.RpcContext;
import com.mz.exchange.account.model.ExApiApply;
import com.mz.exchange.account.model.ExDigitalmoneyAccount;
import com.mz.util.QueryFilter;
import com.mz.util.properties.PropertiesUtils;
import com.mz.change.remote.account.RemoteExApiApplyService;
import com.mz.exchange.account.service.ExApiApplyService;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

/**
 * <p> TODO</p>
 * @author: Zhang Xiaofang
 * @Date :          2016年5月12日 上午11:53:57 
 */
public class RemoteExApiApplyServiceImpl implements RemoteExApiApplyService {


  @Resource(name = "exApiApplyService")
  public ExApiApplyService exApiApplyService;


  @Override
  public List<ExApiApply> findList(Long customerId) {
    String saasId = RpcContext.getContext().getAttachment("saasId");
    QueryFilter filter = new QueryFilter(ExApiApply.class);
    filter.addFilter("customerId=", customerId);
    filter.setSaasId(saasId);
    filter.setOrderby("id desc");
    return exApiApplyService.find(filter);
  }


  @Override
  public Map<String, String> createKey(ExApiApply exApiApply) {
    String saasId = RpcContext.getContext().getAttachment("saasId");
    exApiApply.setSaasId(saasId);
    return exApiApplyService.createKey(exApiApply);
  }


  @Override
  public boolean delete(Long valueOf) {
    String saasId = RpcContext.getContext().getAttachment("saasId");
    QueryFilter filter = new QueryFilter(ExApiApply.class);
    filter.addFilter("id=", valueOf);
    filter.setSaasId(saasId);
    return exApiApplyService.delete(filter);
  }

  @Override
  public ExApiApply getByPublicKey(String publicKey, String saasId) {
    saasId = RpcContext.getContext().getAttachment("saasId");
    if (null == saasId) {
      saasId = PropertiesUtils.APP.getProperty("app.saasId");
    }
    QueryFilter filter = new QueryFilter(ExDigitalmoneyAccount.class);
    filter.setSaasId(saasId);
    filter.addFilter("accessKey=", publicKey);
    ExApiApply eda = exApiApplyService.get(filter);
    return eda;
  }


  @Override
  public ExApiApply findByKey(String key) {
    //String saasId = RpcContext.getContext().getAttachment("saasId");
    QueryFilter filter = new QueryFilter(ExApiApply.class);
    filter.addFilter("accessKey=", key);
    //filter.setSaasId(saasId);
    return exApiApplyService.get(filter);
  }

}
