package com.mz.web.file.controller;

import com.mz.core.mvc.model.page.JsonResult;
import com.mz.oauth.user.model.AppUser;
import com.mz.util.QueryFilter;
import com.mz.util.file.FileUtil;
import com.mz.util.sys.ContextUtil;
import com.mz.web.file.model.AppFile;
import com.mz.web.file.service.AppFileService;
import com.mz.web.util.FileInfo;
import com.mz.web.util.FileUpload;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


/**
 * 上传文件
 * <p> TODO</p>
 *
 * @au: Liu Shilei
 * @Date :          2015年12月8日 下午5:08:18
 */
@RestController
@RequestMapping("/file")
public class FileController {

//	System.out.println(file.getContentType());// 获取文件MIME类型
//	System.out.println(file.getName());// 获取表单中文件组件的名字
//	System.out.println(file.getOriginalFilename());// 获取上传文件的原名
//	System.out.println(file.getSize());// 获取文件的字节大小，单位byte

  @Resource
  private AppFileService appFileService;

  /**
   * 上传临时文件
   */
  @RequestMapping("/upload")
  public JsonResult upload(HttpServletRequest request) {
    JsonResult json = new JsonResult();
    json.setSuccess(true);
    List<AppFile> list = new ArrayList<>();
    List<FileInfo> listInfo = new ArrayList<>();
    final AppUser currentUser = ContextUtil.getCurrentUser();
    try {
      List<MultipartFile> files = ((MultipartHttpServletRequest) request)
          .getFiles("myfile");
      if (CollectionUtils.isNotEmpty(files)) {
        for (MultipartFile file : files) {
          String names = file.getOriginalFilename();
          if (names != null && (names.endsWith("jpg") || names.endsWith("png") || names
              .endsWith("gif") || names.endsWith("bmp"))) {
          } else {
            JsonResult jsonResult = new JsonResult();
            jsonResult.setMsg("图片格式不正确");
            jsonResult.setSuccess(false);
            return jsonResult;
          }
          FileInfo fileInfo = FileUpload.saveFile(file);
          listInfo.add(fileInfo);
        }
      } else {
        json.setSuccess(false);
        json.setMsg("文件不能为空");
      }
      for (FileInfo fileInfo : listInfo) {
        //维护关系
        list.add(appFileService.setFileRelation(currentUser, fileInfo));
      }
    } catch (Exception e) {
      json.setSuccess(false);
      json.setMsg(e.getLocalizedMessage());
      e.printStackTrace();
    }
    json.setObj(list);
    json.setSuccess(true);
    return json;
  }


  /**
   * 下载文件
   */
  @RequestMapping("/download")
  public void download(HttpServletRequest request, HttpServletResponse response) {

    String fileWebPath = request.getParameter("fileWebPath");
    if (!StringUtils.isEmpty(fileWebPath)) {
      QueryFilter filter = new QueryFilter(AppFile.class);
      filter.addFilter("fileWebPath=", fileWebPath);
      AppFile appFile = appFileService.get(filter);
      FileUpload.download(response, appFile);
    }
  }


  /**
   * 校验文件是否存在
   */
  @RequestMapping("/checkfile")
  public JsonResult checkfile(HttpServletRequest request) {
    JsonResult jsonResult = new JsonResult();
    String fileWebPath = request.getParameter("fileWebPath");
    if (!StringUtils.isEmpty(fileWebPath)) {
      QueryFilter filter = new QueryFilter(AppFile.class);
      filter.addFilter("fileWebPath=", fileWebPath);
      AppFile appFile = appFileService.get(filter);
      if (appFile != null) {
        jsonResult.setSuccess(true);
      }
    } else {
      jsonResult.setMsg("文件不存在");
    }

    return jsonResult;
  }


  /**
   * 校验文件是否存在
   */
  @RequestMapping("/delete")
  public JsonResult delete(HttpServletRequest request) {
    JsonResult jsonResult = new JsonResult();
    String fileWebPath = request.getParameter("fileWebPath");
    if (!StringUtils.isEmpty(fileWebPath)) {
      QueryFilter filter = new QueryFilter(AppFile.class);
      filter.addFilter("fileWebPath=", fileWebPath);
      AppFile appFile = appFileService.get(filter);
      if (appFile != null) {
        FileUtil.deleteFile(appFile.getFileLocalpath());
        appFileService.delete(appFile.getFileid());
        jsonResult.setSuccess(true);
        jsonResult.setMsg("删除成功");
      }
    } else {
      jsonResult.setMsg("文件路径不能为空");
    }
    return jsonResult;
  }

}
