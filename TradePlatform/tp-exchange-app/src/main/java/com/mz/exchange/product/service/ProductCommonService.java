/**
 * Copyright:   北京互融时代软件有限公司
 *
 * @author: Gao Mimi
 * @version: V1.0
 * @Date: 2016年8月25日 下午5:18:49
 */
package com.mz.exchange.product.service;

import com.mz.exchange.product.model.ProductCommon;
import com.mz.manage.remote.model.Coin;

/**
 * <p> TODO</p>
 * @author: Gao Mimi
 * @Date :          2016年8月25日 下午5:18:49 
 */
public interface ProductCommonService {

  // public ProductCommon getProductCommon(String coinCode,String fixPriceCoinCode);
  public ProductCommon getProductCommon(String coinCode);

  public Coin getProductCommon(String coinCode, String fixPriceCoinCode);

  public Coin getCoinFromreds(String coinCode, String fixPriceCoinCode);
}
