/**
 * Copyright:  北京互融时代软件有限公司
 *
 * @author: Gao Mimi
 * @version: V1.0
 * @Date: 2015年10月27日  17:57:57
 */
package com.mz.web.dictionary.controller;

import com.alibaba.fastjson.JSON;
import com.mz.core.annotation.base.MethodName;
import com.mz.core.mvc.model.page.JsonResult;
import com.mz.core.mvc.model.page.PageResult;
import com.mz.core.mvc.service.base.BaseService;
import com.mz.redis.common.utils.RedisService;
import com.mz.util.BeanUtil;
import com.mz.util.QueryFilter;
import com.mz.util.pinying4j.Pinying4jUtil;
import com.mz.util.sys.ContextUtil;
import com.mz.web.app.model.AppDictionary;
import com.mz.web.dictionary.model.AppDicMultilevel;
import com.mz.web.dictionary.model.AppDicOnelevel;
import com.mz.core.constant.CodeConstant;
import com.mz.core.mvc.controller.base.BaseController;
import com.mz.web.dictionary.service.AppDicMultilevelService;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import tk.mybatis.mapper.util.StringUtil;

/**
 * <p>
 * TODO
 * </p>
 *
 * @author: Gao Mimi
 * @Date : 2015年10月27日 17:57:57
 */

@Controller
@RequestMapping("/dictionary/appdicmultilevel")
public class AppDicMultilevelController extends BaseController<AppDicMultilevel, Long> {

  @Resource(name = "appDicMultilevelService")
  @Override
  public void setService(BaseService<AppDicMultilevel, Long> service) {
    super.service = service;
  }

  @Resource(name = "appDicMultilevelService")
  private AppDicMultilevelService appDicMultilevelService;

  /**
   * AppDictionaryController自己的initBinder
   *
   * @param binder
   */
  @InitBinder
  public void initBinderDemoUser(ServletRequestDataBinder binder) {

  }

  @MethodName(name = "增加AppDictionary数据")
  @RequestMapping("/add")
  @ResponseBody
  public JsonResult add(AppDicMultilevel appDictionary) {
    JsonResult j = new JsonResult();
    QueryFilter filter = new QueryFilter(AppDicMultilevel.class);
    filter.addFilter("dicKey=", appDictionary.getDicKey());
    List<AppDicMultilevel> list = appDicMultilevelService.find(filter);
    Boolean isnullDicKey = StringUtil.isEmpty(appDictionary.getDicKey());
    if (isnullDicKey) {
      String dickey = Pinying4jUtil.getPinYin(appDictionary.getItemName());
      appDictionary.setDicKey(dickey);
    }
    if (null == appDictionary.getId()) {
      if (null != list && list.size() > 0) {
        j.setMsg("重复的key");
        j.setSuccess(false);
        return j;
      }
      String reslut = appDicMultilevelService.addDic(appDictionary);
      if (reslut.equals(CodeConstant.CODE_SUCCESS)) {

        j.setMsg("保存成功");
        j.setSuccess(true);
        j.setObj(appDictionary);
      }
    } else {

      if (null != list && list.size() > 1) {
        j.setMsg("重复的key");
        j.setSuccess(false);
        return j;
      }

      AppDicMultilevel oldappDictionary = appDicMultilevelService.get(appDictionary.getId());
      BeanUtil.copyNotNullProperties(appDictionary, oldappDictionary);
      appDicMultilevelService.update(oldappDictionary);
      appDicMultilevelService.dicToredis(appDictionary.getpDicKey());// 缓存到redis
      j.setMsg("修改成功");
      j.setSuccess(true);
      j.setObj(appDictionary);
    }

    return j;
  }

  @MethodName(name = "删除AppDictionary数据")
  @RequestMapping(value = "/remove", method = RequestMethod.POST)
  @ResponseBody
  public JsonResult remove(String[] ids, HttpServletRequest request) {
    JsonResult rult = new JsonResult();
    for (int i = 0; i < ids.length; i++) {
      rult = appDicMultilevelService.removeDic(ids[i]);
      if (rult.getSuccess() == false) {
        break;
      }
    }
    return rult;
  }

  @MethodName(name = "移动")
  @RequestMapping(value = "/move", method = RequestMethod.POST)
  @ResponseBody
  public JsonResult move(String id, String type) {
    return appDicMultilevelService.move(id, type);
  }

  @MethodName(name = "加载一条AppDictionary数据")
  @RequestMapping(value = "/load/{id}", method = RequestMethod.GET)
  @ResponseBody
  public AppDicMultilevel load(@PathVariable Long id) {
    AppDicMultilevel appDictionary = service.get(id);
    return appDictionary;
  }

  @MethodName(name = "加载AppDictionary列表数据")
  @RequestMapping("/list")
  @ResponseBody
  public PageResult list(HttpServletRequest request) {
    QueryFilter filter = new QueryFilter(AppDicMultilevel.class, request);
    return super.findPage(filter);
  }

  @MethodName(name = "自由查询返回list")
  @RequestMapping("/find")
  @ResponseBody
  public List find(HttpServletRequest request) {
    QueryFilter filter = new QueryFilter(AppDicMultilevel.class, request);
    String province = request.getParameter("province");
    if (!org.springframework.util.StringUtils.isEmpty(province)) {
      filter.addFilter("pDicKey=", province);
    }
    return super.find(filter);
  }

  @MethodName(name = "查找字典树,返回json")
  @RequestMapping("/findlist")
  @ResponseBody
  public List findlist(HttpServletRequest request) {
    QueryFilter filter = new QueryFilter(AppDicOnelevel.class);
    String rootKey = request.getParameter("rootKey");
    filter.addFilter("isOld=", "0");
    filter.addFilter("rootKey=", rootKey);
    filter.setOrderby("pDicKey asc,orderNo asc");
    return super.service.find(filter);
  }

  @MethodName(name = "查看字典项")
  @RequestMapping("/see")
  @ResponseBody
  public AppDicMultilevel see(Long id) {
    AppDicMultilevel appDictionary = service.get(id);
    return appDictionary;
  }

  @MethodName(name = "修改字典项")
  @RequestMapping("/modify")
  @ResponseBody
  public JsonResult modify(AppDicMultilevel appDictionary) {
    JsonResult j = new JsonResult();
    QueryFilter filter = new QueryFilter(AppDicMultilevel.class);
    filter.addFilter("dicKey=", appDictionary.getDicKey());
    List<AppDicMultilevel> list = appDicMultilevelService.find(filter);
    if (null != list && list.size() > 1) {
      j.setMsg("重复的key");
      j.setSuccess(false);
      return j;
    }
    appDicMultilevelService.update(appDictionary);
    appDicMultilevelService.dicToredis(appDictionary.getpDicKey());// 缓存到redis
    j.setMsg("保存成功");
    j.setSuccess(true);
    j.setObj(appDictionary);
    return j;
  }

  @MethodName(name = "根据key查找字典树,返回json")
  @RequestMapping("/findbykey")
  @ResponseBody
  public List findbykey(HttpServletRequest request) {
    String key = "DIC:" + request.getParameter("Q_pDickey_eq_String");
    RedisService redisService = (RedisService) ContextUtil.getBean("redisService");
    String value = redisService.get(key);
    if (!StringUtil.isEmpty(value)) {

      return (List<AppDicMultilevel>) JSON.parse(value);
    } else {
      QueryFilter filter = new QueryFilter(AppDictionary.class);
      filter.addFilter("isOld=", "0");
      filter.addFilter("saasId=", ContextUtil.getSaasId());
      filter.setOrderby("orderNo asc");
      filter.addFilter("pDickey=", request.getParameter("Q_pDickey_eq_String"));
      List<AppDicMultilevel> list = super.service.find(filter);
      String jsonString = JSON.toJSONString(list);
      redisService.save(key, jsonString);
      return list;

    }

  }
}
