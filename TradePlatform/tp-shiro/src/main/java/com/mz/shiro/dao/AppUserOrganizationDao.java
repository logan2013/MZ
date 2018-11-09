/**
 * Copyright:   北京互融时代软件有限公司
 * @author:      Liu Shilei
 * @version:      V1.0 
 * @Date:        2015年12月9日 下午7:19:24
 */
package com.mz.shiro.dao;

import com.mz.core.mvc.dao.base.BaseDao;
import com.mz.oauth.user.model.AppUserOrganization;
import java.util.List;

/**
 * <p> TODO</p>
 * @author:         Liu Shilei 
 * @Date :          2015年12月9日 下午7:19:24 
 */
public interface AppUserOrganizationDao extends BaseDao<AppUserOrganization, Long> {

	/**
	 * <p> TODO</p> 通过appUserId 删除 关系信息
	 * @author:         Liu Shilei
	 * @param:    @param id
	 * @param:    @return
	 * @return: boolean 
	 * @Date :          2015年12月21日 上午11:53:07   
	 * @throws:
	 */
	boolean removeByAppUserId(Long id);

	/**
	 * <p> TODO</p>   通过appUser 查出对应的组织机构关系
	 * @author:         Liu Shilei
	 * @param:    @param appUser
	 * @param:    @param string   组织机构type
	 * @return: void 
	 * @Date :          2015年12月21日 下午1:50:18   
	 * @throws:
	 */
	List<AppUserOrganization> findByAppUser(Long userId, String type);

	Long deleteOrganId(Long UserId);


}
