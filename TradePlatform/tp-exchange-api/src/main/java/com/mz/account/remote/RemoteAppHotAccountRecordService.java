/**
 * Copyright:   北京互融时代软件有限公司
 *
 * @author: Liu Shilei
 * @version: V1.0
 * @Date: 2016年4月1日 上午11:17:16
 */
package com.mz.account.remote;

import com.mz.account.fund.model.AppHotAccountRecord;

/**
 * <p> TODO</p>
 * @author: Liu Shilei
 * @Date :          2016年4月1日 上午11:17:16 
 */
public interface RemoteAppHotAccountRecordService {

  /**
   * <p>保存</p>
   * @author: Liu Shilei
   * @param:    @param appTransaction
   * @return: void
   * @Date :          2016年4月5日 下午4:06:10
   * @throws:
   */
  public void save(AppHotAccountRecord appHotAccountRecord);

}
