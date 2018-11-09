/**
 * Copyright:   北京互融时代软件有限公司
 *
 * @author: shangxl
 * @version: V1.0
 * @Date: 2017-07-31 10:05:11
 */
package com.mz.web.system.service.impl;

import com.mz.core.mvc.dao.base.BaseDao;
import com.mz.core.mvc.service.base.impl.BaseServiceImpl;
import com.mz.web.system.service.SysCodeValueService;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * @Description: java类作用描述
 * @Author: zongwei
 * @CreateDate: 2018/6/6 17:26
 * @UpdateUser: zongwei
 * @UpdateDate: 2018/6/6 17:26
 * @UpdateRemark: 创建
 * @Version: 1.0
 */
@Service("sysCodeValueService")
public class SysCodeValueServiceImpl extends BaseServiceImpl<com.mz.spotchange.model.SysCodeValue, Long> implements
    SysCodeValueService {

  @Resource(name = "sysCodeValueDao")
  @Override
  public void setDao(BaseDao<com.mz.spotchange.model.SysCodeValue, Long> dao) {
    super.dao = dao;
  }


}
