/**
 * Copyright:   北京互融时代软件有限公司
 * @author:      Zhang Xiaofang
 * @version:      V1.0 
 * @Date:        2016年7月5日 上午9:44:03
 */
package com.mz.gopay;

/**
 * <p> TODO</p>
 * @author:         Zhang Xiaofang 
 * @Date :          2016年7月5日 上午9:44:03 
 */


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.SignatureException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.cookie.CookiePolicy;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpConnectionParams;
import org.apache.commons.httpclient.params.HttpMethodParams;




public class GopayUtils {
	
	/**
	 * 获取国付宝服务器时间 用于时间戳
	 * @return 格式YYYYMMDDHHMMSS
	 */
	public static String getGopayServerTime() {
		HttpClient httpClient = new HttpClient();
		httpClient.getParams().setCookiePolicy(CookiePolicy.RFC_2109);
		httpClient.getParams().setIntParameter(HttpConnectionParams.SO_TIMEOUT, 10000); 
		GetMethod getMethod = new GetMethod(Gopay.GOPAY_SERVER_TIME_URL);
		getMethod.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET,"GBK");  
		// 执行getMethod
		int statusCode = 0;
		try {
			statusCode = httpClient.executeMethod(getMethod);			
			if (statusCode == HttpStatus.SC_OK){
				String respString = (new String(getMethod.getResponseBody(),"GBK"));
				return respString;
			}			
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			getMethod.releaseConnection();
		}
		return null;
	}
	
	/**
     * Convenience method to get the IP Address from client.
     * 
     * @param request the current request
     * @return IP to application
     */
    public static String getIpAddr(HttpServletRequest request) { 
    	if (request == null) return "";
    	
        String ip = request.getHeader("X-Forwarded-For"); 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("WL-Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_CLIENT_IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getRemoteAddr(); 
        } 
        return ip; 
    } 
    
    /**
     * 对字符串进行MD5签名
     * 
     * @param text
     *            明文
     * 
     * @return 密文
     */
    public static String md5(String text) {
        return DigestUtils.md5Hex(getContentBytes(text, "GBK"));
    }
    
    /**
     * 对字符串进行SHA签名
     * 
     * @param text
     *            明文
     * 
     * @return 密文
     */
    public static String sha(String text) {
        return DigestUtils.shaHex(getContentBytes(text, Gopay.CHARSET_GBK));
    }

    /**
     * @param content
     * @param charset
     * @return
     * @throws SignatureException
     * @throws UnsupportedEncodingException 
     */
    private static byte[] getContentBytes(String content, String charset) {
        if (charset == null || "".equals(charset)) {
            return content.getBytes();
        }

        try {
            return content.getBytes(charset);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("MD5签名过程中出现错误,指定的编码集不对,您目前指定的编码集是:" + charset);
        }
    }
}
