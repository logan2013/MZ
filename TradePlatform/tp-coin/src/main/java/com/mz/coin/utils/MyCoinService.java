package com.mz.coin.utils;

import com.mz.coin.Wallet;
import com.mz.util.log.LogFactory;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
/**
 * 
 * <p> TODO</p>
 * @author:         shangxl
 * @Date :          2017年3月13日 下午7:37:25
 */
public class MyCoinService{

	private volatile static Map<String, JsonrpcClient> mapClient = null;

	/**
	 * 获取钱包客户端
	 * <p>
	 * TODO
	 * </p>
	 * 
	 * @author: shangxl
	 * @param: @param
	 *             type
	 * @param: @return
	 * @return: BitcoinJSONRPCClient
	 * @Date : 2017年11月15日 上午11:43:55
	 * @throws:
	 */
	public static JsonrpcClient getClient(String type) {
		type=type.toLowerCase();
		LogFactory.info("获取"+type+"的rpc连接");
		if (mapClient != null && mapClient.get(type) != null) {
			return mapClient.get(type);
		} else {
			if (mapClient == null || mapClient.get(type) == null) {
				if (mapClient == null) {
					mapClient = new HashMap<String, JsonrpcClient>(16);
				}
				try {
					String protocol = com.mz.utils.Properties.appcoinMap().get(type + "_protocol");
					String ip = com.mz.utils.Properties.appcoinMap().get(type + "_ip");
					String port = com.mz.utils.Properties.appcoinMap().get(type + "_port");
					String rpcuser = com.mz.utils.Properties.appcoinMap().get(type + "_rpcuser");
					String rpcpassword = com.mz.utils.Properties.appcoinMap().get(type + "_rpcpassword");
					// 判断是否有空值
					String[] uri = { protocol, ip, port, rpcuser, rpcpassword };
					for (String l : uri) {
						if (StringUtils.isEmpty(l)) {
							mapClient.put(type, null);
							LogFactory.info("参数无效请检查");
							return null;
						}
					}
					String rpcURI = protocol + "://" + rpcuser + ":" + rpcpassword + "@" + ip + ":" + port + "/";
					mapClient.put(type, new JsonrpcClient(rpcURI));
				} catch (Exception e) {
					mapClient.put(type, null);
					LogFactory.info("建立连接异常");
				}
			}
		}
		return mapClient.get(type);
	}
	
	
	/**
	 * 
	 * <p> TODO</p>
	 * @author:         shangxl
	 * @param:    @param coinType
	 * @param:    @return
	 * @return: Wallet 
	 * @Date :          2018年3月30日 下午4:59:09   
	 * @throws:
	 */
	public static Wallet omniGetWalletInfo(String coinType){
		Wallet wallet=new Wallet();
		JsonrpcClient client=getClient(coinType);
		if(client!=null){
			wallet=client.getUsdtWalletInfo();
		}else{
			LogFactory.info(coinType+" client is null");
		}
		return wallet;
	}
	
}
