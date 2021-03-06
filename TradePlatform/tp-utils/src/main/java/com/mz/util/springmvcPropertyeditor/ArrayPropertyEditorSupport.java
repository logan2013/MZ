/**
 * Copyright:   北京互融时代软件有限公司
 * @author:      Yuan Zhicheng
 * @version:      V1.0 
 * @Date:        2015年9月16日 上午11:04:39
 */
package com.mz.util.springmvcPropertyeditor;


import com.mz.util.date.DateUtil;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

/**
 * 与spring mvc的@InitBinder结合
 * 
 * 转换前台的字符串格式的日期时间值给后台使用
 * 
 * @author Gao Mimi
 * 
 *  2015年9月16日 下午5:17:28 
 * 
 */
public class ArrayPropertyEditorSupport extends PropertyEditorSupport {

	private static final DateFormat DATEFORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public ArrayPropertyEditorSupport() {
	}

	@Override
	public String getAsText() {
		String[] value = (String[]) getValue();
		return (value != null ? DATEFORMAT.format(value) : "");
	}

	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (text == null || StringUtils.isBlank(text)) {
			setValue(null);
		} else {
			String[] arr=text.split(",");
			setValue(arr);
		}
	}

}
