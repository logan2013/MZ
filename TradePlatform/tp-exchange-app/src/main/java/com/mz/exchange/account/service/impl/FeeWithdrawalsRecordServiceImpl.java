/**
 * Copyright:   北京互融时代软件有限公司
 * @author:      Zhang Xiaofang
 * @version:      V1.0 
 * @Date:        2016年3月24日 上午11:48:36
 */
package com.mz.exchange.account.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mz.account.fund.model.FeeWithdrawalsRecord;
import com.mz.core.mvc.dao.base.BaseDao;
import com.mz.core.mvc.model.page.PageResult;
import com.mz.core.mvc.service.base.impl.BaseServiceImpl;
import com.mz.customer.user.model.AppCustomer;
import com.mz.exchange.account.dao.FeeWithdrawalsRecordDao;
import com.mz.exchange.account.service.FeeWithdrawalsRecordService;
import com.mz.util.QueryFilter;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;



@Service("feeWithdrawalsRecordService")
public class FeeWithdrawalsRecordServiceImpl extends BaseServiceImpl<FeeWithdrawalsRecord, Long>   implements
    FeeWithdrawalsRecordService {

	@Resource(name="feeWithdrawalsRecordDao")
	@Override
	public void setDao(BaseDao<FeeWithdrawalsRecord, Long> dao) {
		super.dao=dao;
	}

	@Override
	public PageResult findPageBySql(QueryFilter filter) {
		
		//----------------------分页查询头部外壳------------------------------
		//创建PageResult对象
		PageResult pageResult = new PageResult();
		Page<AppCustomer> page = null;
		if(filter.getPageSize().compareTo(Integer.valueOf(-1))==0){
			//pageSize = -1 时  
			//pageHelper传pageSize参数传0查询全部
			page= PageHelper.startPage(filter.getPage(), 0);
		}else{
			page = PageHelper.startPage(filter.getPage(), filter.getPageSize());
		}
		//----------------------分页查询头部外壳------------------------------
		
		//----------------------查询开始------------------------------
		
		String trueName = filter.getRequest().getParameter("trueName_like");
		String mobilePhone = filter.getRequest().getParameter("mobilePhone_like");
		
		Map<String,Object> map = new HashMap<String,Object>();
		if(!StringUtils.isEmpty(trueName)){
			map.put("trueName", "%"+trueName+"%");
		}
		
		if(!StringUtils.isEmpty(mobilePhone)){
			map.put("mobilePhone", "%"+mobilePhone+"%");
		}
		((FeeWithdrawalsRecordDao)dao).findPageBySql(map);
		//----------------------查询结束------------------------------
		
		//----------------------分页查询底部外壳------------------------------
		//设置分页数据
		pageResult.setRows(page.getResult());
		//设置总记录数
		pageResult.setRecordsTotal(page.getTotal());
		pageResult.setDraw(filter.getDraw());
		pageResult.setPage(filter.getPage());
		pageResult.setPageSize(filter.getPageSize());
		//----------------------分页查询底部外壳------------------------------
		
		return pageResult;
	}

}
