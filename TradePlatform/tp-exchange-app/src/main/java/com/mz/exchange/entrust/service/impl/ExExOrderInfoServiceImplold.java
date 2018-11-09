/**
 * Copyright:   北京互融时代软件有限公司
 * @author:      Wu Shuiming
 * @version:      V1.0 
 * @Date:        2016年3月24日 下午2:04:29
 *//*
package com.mz.exchange.entrust.service.impl;

import com.mz.account.fund.model.AppAccount;
import RemoteAppAccountService;
import RemoteAppOurAccountService;
import com.mz.best.rabbitmq.dao.SendMq;
import RemoteExDigitalmoneyAccountService;
import com.mz.core.constant.CodeConstant;
import com.mz.core.mvc.dao.base.BaseDao;
import com.mz.core.mvc.service.base.impl.BaseServiceImpl;
import com.mz.util.QueryFilter;
import com.mz.util.date.DateUtil;
import com.mz.util.log.LogFactory;
import com.mz.util.sys.ContextUtil;
import com.mz.exchange.account.model.ExDigitalmoneyAccount;
import ExDigitalmoneyAccountService;
import ExExOrderInfoService;
import com.mz.trade.entrust.model.ExEntrust;
import com.mz.trade.entrust.model.ExOrder;
import com.mz.trade.entrust.model.ExOrderInfo;
import ExEntrustService;
import ExOrderInfoService;
import ExOrderService;
import com.mz.trade.exEntrustOneDay.model.ExentrustOneday;
import ExentrustOnedayService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.dubbo.rpc.RpcContext;
import com.alibaba.fastjson.JSON;

*//**
 * <p>
 * TODO
 * </p>
 * 
 * @author: Gao Mimi
 * @Date : 2016年4月12日 下午4:45:50
 *//*
public class ExExOrderInfoServiceImplold extends BaseServiceImpl<ExOrderInfo, Long> implements ExExOrderInfoService {

	@Resource(name = "exExOrderInfoDao")
	@Override
	public void setDao(BaseDao<ExOrderInfo, Long> dao) {
		super.dao = dao;
	}

	@Resource(name = "sendMq")
	private SendMq sendMq;
	@Resource
	private ExEntrustService exEntrustService;
	@Resource
	private ExOrderService exOrderService;
	@Resource
	private ExOrderInfoService exOrderInfoService;
	@Resource
	private ExDigitalmoneyAccountService exDigitalmoneyAccountService;
	@Resource
	private ExentrustOnedayService exentrustOnedayService;

	public void rollbackMoney(List<String> list, BigDecimal[] appAccountarr, Long customerId, String currencyType,
			String website) {
		RemoteAppAccountService remoteAppAccountService = (RemoteAppAccountService) ContextUtil
				.getBean("remoteAppAccountService");
		for (String l : list) {
			String[] ids = l.split(",");
			for (int i = 0; i < ids.length - 1; i++) {
				String id = ids[i];
				if (id.startsWith("hot")) {
					id = id.replace("hot", "");
					remoteAppAccountService.removeHotRecord(Long.valueOf(id.trim()));
				} else if (id.startsWith("cold")) {
					id = id.replace("cold", "");
					remoteAppAccountService.removeColdRecord(Long.valueOf(id.trim()));
				}
			}
		}
		AppAccount appAccount = remoteAppAccountService.getByCustomerIdAndType(customerId, currencyType, website);
		appAccount.setHotMoney(appAccountarr[0]);
		appAccount.setColdMoney(appAccountarr[1]);
		appAccount.setLendMoney(appAccountarr[2]);
		String[] relt = remoteAppAccountService.updateAccount(appAccount);
		LogFactory.info("资金回滚了" + customerId);
		if (relt.equals(relt[0].equals(CodeConstant.CODE_FAILED))) {
			// 如果失败的话，应该重新计算当前的余额；记录日志，
			LogFactory.info("资金回滚失败" + customerId);
		}
	}
	public void rollbackMoneyBydig(List<String> list, BigDecimal[] appAccountarr, Long customerId, String currencyType,
			String website) {
		RemoteAppAccountService remoteAppAccountService = (RemoteAppAccountService) ContextUtil
				.getBean("remoteAppAccountService");
		for (String l : list) {
			String[] ids = l.split(",");
			for (int i = 0; i < ids.length - 1; i++) {
				String id = ids[i];
				if (id.startsWith("hot")) {
					id = id.replace("hot", "");
					remoteAppAccountService.removeHotRecord(Long.valueOf(id.trim()));
				} else if (id.startsWith("cold")) {
					id = id.replace("cold", "");
					remoteAppAccountService.removeColdRecord(Long.valueOf(id.trim()));
				}
			}
		}
		AppAccount appAccount = remoteAppAccountService.getByCustomerIdAndType(customerId, currencyType, website);
		appAccount.setHotMoney(appAccountarr[0]);
		appAccount.setColdMoney(appAccountarr[1]);
		appAccount.setLendMoney(appAccountarr[2]);
		String[] relt = remoteAppAccountService.updateAccount(appAccount);
		LogFactory.info("资金回滚了" + customerId);
		if (relt.equals(relt[0].equals(CodeConstant.CODE_FAILED))) {
			// 如果失败的话，应该重新计算当前的余额；记录日志，
			LogFactory.info("资金回滚失败" + customerId);
		}
	}
	
	public String[] deductMoneyByaccount(ExOrderInfo exOrderInfo, ExEntrust buyexEntrust, ExEntrust sellentrust,
			ExOrderInfo exOrderInfosell, ExOrder exOrder){
		 // 资金
		long start = System.currentTimeMillis();
		String[] relt = new String[2];
		List<String> idarr = new ArrayList<String>();
		RemoteAppAccountService remoteAppAccountService = (RemoteAppAccountService) ContextUtil
				.getBean("remoteAppAccountService");
		RpcContext.getContext().setAttachment("saasId", buyexEntrust.getSaasId());
		// 获取买家的人民币账户
		AppAccount buyappAccount = remoteAppAccountService.getByCustomerIdAndType(buyexEntrust.getCustomerId(),
				buyexEntrust.getCurrencyType(), buyexEntrust.getWebsite());
		// 记录开始时的资金金额信息；
		BigDecimal[] buyappAccountarr = new BigDecimal[3];
		buyappAccountarr[0] = buyappAccount.getHotMoney();
		buyappAccountarr[1] = buyappAccount.getColdMoney();
		buyappAccountarr[2] = buyappAccount.getLendMoney();
		// 获取卖家的人民币账户
		AppAccount sellappAccount = remoteAppAccountService.getByCustomerIdAndType(sellentrust.getCustomerId(),
				sellentrust.getCurrencyType(), sellentrust.getWebsite());
		BigDecimal[] sellappAccountarr = new BigDecimal[3];
		sellappAccountarr[0] = sellappAccount.getHotMoney();
		sellappAccountarr[1] = sellappAccount.getColdMoney();
		sellappAccountarr[2] = sellappAccount.getLendMoney();

		BigDecimal buychangHotMoney = BigDecimal.ZERO;
		BigDecimal buychangColdMoney = BigDecimal.ZERO;
		BigDecimal sellchangHotMoney = BigDecimal.ZERO;
		// 买家人民币账户变动，添加一条冷钱包记录
		relt = remoteAppAccountService.unfreezeAccountThemBuyTranstion(buyappAccount.getId(),
				exOrderInfo.getTransactionSum(), exOrderInfo.getOrderNum(),
				"交易成功，买家解冻总金额转给卖家" + buyexEntrust.getEntrustNum(), 0);
		if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
			buychangColdMoney = buychangColdMoney.subtract(exOrderInfo.getTransactionSum());
			idarr.add(relt[1]);
		} else {
			LogFactory.info(buyappAccount.getUserName() + "---" + buyexEntrust.getEntrustNum() + "买家冻结资金=" + relt[1]
					+ "所以没成交");
			rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
					buyappAccount.getWebsite());
			rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
					sellentrust.getWebsite());
			return relt;
		}

		// 买家手续费
		if (exOrderInfo.getTransactionBuyFee().compareTo(BigDecimal.ZERO) > 0) {
			relt = remoteAppAccountService.payFromHotAccountNegative(buyappAccount.getId(),
					exOrderInfo.getTransactionBuyFee(), exOrderInfo.getOrderNum(),
					"交易成功，买家手续费" + buyexEntrust.getEntrustNum(), 0);
			if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
				// 买家人民币账户记录减去手续费 -fee
				buychangHotMoney = buychangHotMoney.subtract(exOrderInfo.getTransactionBuyFee());
				idarr.add(relt[1]);
			} else {
				LogFactory.info("买家手续费=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		}

		// 买家是市价
		if (buyexEntrust.getEntrustWay().equals(2) && buyexEntrust.getStatus().equals(2)) { // 买家是市价
			BigDecimal surpSum = buyexEntrust.getEntrustSum().subtract(buyexEntrust.getTransactionSum());
			// 剩余委托金额
			if (surpSum.compareTo(BigDecimal.ZERO) > 0) {
				relt = remoteAppAccountService.unfreezeAccountSelfCancelExEntrust(buyappAccount.getId(), surpSum,
						buyexEntrust.getEntrustNum(), "买家市价，完成还剩一点金额给解冻到自己账户" + buyexEntrust.getEntrustNum(), 0);
				if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
					buychangColdMoney = buychangColdMoney.subtract(surpSum);
					buychangHotMoney = buychangHotMoney.add(surpSum);
					idarr.add(relt[1]);
				} else {
					LogFactory.info("买家市价，完成还剩一点金额给解冻到自己账户=" + relt[1]);
					rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(),
							buyappAccount.getCurrencyType(), buyappAccount.getWebsite());
					rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
							sellentrust.getWebsite());
					return relt;
				}
			}
			// 买家是限价
		} else if ((buyexEntrust.getEntrustWay().equals(1) || buyexEntrust.getEntrustWay().equals(3))
				&& buyexEntrust.getStatus().equals(2)) {
			// 前提是余额足够的情况下才能买家才能向上浮动（一般这个浮动式给做市账户用，所以肯定越够，如果给普通账户用还得先确定是否有足够的余额向上浮动）
			if (buyexEntrust.getEntrustSum().compareTo(buyexEntrust.getTransactionSum()) == 1) {
				BigDecimal surpSum = buyexEntrust.getEntrustSum().subtract(buyexEntrust.getTransactionSum());
				relt = remoteAppAccountService.unfreezeAccountSelfCancelExEntrust(buyappAccount.getId(), surpSum,
						buyexEntrust.getEntrustNum(), "买的价格向下浮动，要退钱" + buyexEntrust.getEntrustNum(), 0);
				if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
					buychangColdMoney = buychangColdMoney.subtract(surpSum);
					buychangHotMoney = buychangHotMoney.add(surpSum);
					idarr.add(relt[1]);
				} else {
					LogFactory.info("买的价格向下浮动，要退钱=" + relt[1]);
					rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(),
							buyappAccount.getCurrencyType(), buyappAccount.getWebsite());
					rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
							sellentrust.getWebsite());
					return relt;
				}
			}
		}

		// 卖家资金变化
		RpcContext.getContext().setAttachment("saasId", sellentrust.getSaasId());
		BigDecimal incomeMoney = exOrderInfo.getTransactionSum();
		relt = remoteAppAccountService.inComeToHotAccount(sellappAccount.getId(), incomeMoney,
				exOrderInfo.getOrderNum(), "交易成功，卖家收入金额" + sellentrust.getEntrustNum(), null);
		if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
			sellappAccount.setHotMoney(sellappAccount.getHotMoney().add(incomeMoney));
			idarr.add(relt[1]);
		} else {
			LogFactory.info("交易成功，卖家收入金额=" + relt[1]);
			rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
					buyappAccount.getWebsite());
			rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
					sellentrust.getWebsite());
			return relt;
		}

		// 卖家手续费
		if (exOrderInfo.getTransactionSellFee().compareTo(BigDecimal.ZERO) > 0) {
			relt = remoteAppAccountService.payFromHotAccountNegative(sellappAccount.getId(),
					exOrderInfo.getTransactionSellFee(), exOrderInfo.getOrderNum(),
					"交易成功，卖家手续费" + sellentrust.getEntrustNum(), 0);
			if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
				sellchangHotMoney = sellchangHotMoney.subtract(exOrderInfo.getTransactionSellFee());

				idarr.add(relt[1]);
			} else {
				LogFactory.info("卖家手续费资金=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		}

		// 买和卖是同一个人
		if (buyexEntrust.getCustomerId().equals(sellentrust.getCustomerId())) {
			LogFactory.info("买家和卖家是同一个人");
			buyappAccount.setHotMoney(buyappAccount.getHotMoney().add(buychangHotMoney.add(sellchangHotMoney)));
			buyappAccount.setColdMoney(buyappAccount.getColdMoney().add(buychangColdMoney));
			relt = remoteAppAccountService.updateAccount(buyappAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("买家卖家是一家，保存资金=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		} else {
			buyappAccount.setHotMoney(buyappAccount.getHotMoney().add(buychangHotMoney));
			buyappAccount.setColdMoney(buyappAccount.getColdMoney().add(buychangColdMoney));
			relt = remoteAppAccountService.updateAccount(buyappAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("买家保存资金=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
			sellappAccount.setHotMoney(sellappAccount.getHotMoney().add(sellchangHotMoney));
			relt = remoteAppAccountService.updateAccount(sellappAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("卖家，保存资金=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		}

		BigDecimal buycoinchangHotMoney = BigDecimal.ZERO;
		BigDecimal sellcoinchangColdMoney = BigDecimal.ZERO;
		// 买家获得币
		ExDigitalmoneyAccount buyDigitalmoneyAccount = exDigitalmoneyAccountService.getByCustomerIdAndType(
				buyexEntrust.getCustomerId(), buyexEntrust.getCoinCode(), buyexEntrust.getCurrencyType(),
				buyexEntrust.getWebsite());
		BigDecimal incomecoin = exOrderInfo.getTransactionCount();
		relt = exDigitalmoneyAccountService.inComeToHotAccount(buyDigitalmoneyAccount.getId(), incomecoin,
				exOrderInfo.getOrderNum(), "交易成功，买家收入比特币" + buyexEntrust.getEntrustNum(), 0);
		buycoinchangHotMoney = buycoinchangHotMoney.add(incomecoin);

		// 卖家币支出
		ExDigitalmoneyAccount sellDigitalmoneyAccount = exDigitalmoneyAccountService.getByCustomerIdAndType(
				sellentrust.getCustomerId(), sellentrust.getCoinCode(), sellentrust.getCurrencyType(),
				sellentrust.getWebsite());
		relt = exDigitalmoneyAccountService.unfreezeAccountThem(sellDigitalmoneyAccount.getId(),
				exOrderInfo.getTransactionCount(), exOrderInfo.getOrderNum(),
				"交易成功，卖家虚拟币解冻转买家" + sellentrust.getEntrustNum(), 0);
		sellcoinchangColdMoney = sellcoinchangColdMoney.subtract(exOrderInfo.getTransactionCount());

		// 买和卖是同一个人
		if (buyexEntrust.getCustomerId().equals(sellentrust.getCustomerId())) {
			buyDigitalmoneyAccount.setHotMoney(buyDigitalmoneyAccount.getHotMoney().add(buycoinchangHotMoney));
			buyDigitalmoneyAccount.setColdMoney(sellDigitalmoneyAccount.getColdMoney().add(sellcoinchangColdMoney));
			relt = exDigitalmoneyAccountService.updateAccount(buyDigitalmoneyAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("币账户保存失败=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		} else {
			buyDigitalmoneyAccount.setHotMoney(buyDigitalmoneyAccount.getHotMoney().add(buycoinchangHotMoney));
			relt = exDigitalmoneyAccountService.updateAccount(buyDigitalmoneyAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("买币账户保存失败=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
			sellDigitalmoneyAccount.setColdMoney(sellDigitalmoneyAccount.getColdMoney().add(sellcoinchangColdMoney));
			exDigitalmoneyAccountService.updateAccount(sellDigitalmoneyAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("卖币账户保存失败=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		}

		// 资金都保存成功了才保存这些信息
		if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
			try {
				// 开始保存
				exOrderInfoService.save(exOrderInfo);
				exOrderInfoService.save(exOrderInfosell);
				exOrderService.save(exOrder);
				exEntrustService.update(buyexEntrust);
				exEntrustService.update(sellentrust);
				this.refreshEntrust(buyexEntrust, sellentrust);
				// 然后从mongodb中删除，现在改成从临时表及redis缓存中删除
				
			} catch (Exception e) {
				LogFactory.info("委托成功最后保存出错：" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				throw e; // 抛出异常回滚
			}
			// 平台收取手续费
			if (exOrderInfo.getTransactionBuyFee().compareTo(BigDecimal.ZERO) > 0
					|| exOrderInfo.getTransactionSellFee().compareTo(BigDecimal.ZERO) > 0) {
				try {
					// 我方账号收取手续费
					RemoteAppOurAccountService remoteAppOurAccountService = (RemoteAppOurAccountService) ContextUtil
							.getBean("remoteAppOurAccountService");
					remoteAppOurAccountService.addMoneyForOurAccount(exOrderInfo);
				} catch (Exception e) {
					LogFactory.info("订单号：" + exOrderInfo.getOrderNum() + "我方账户收取费用失败");
				}
			}
			// 委托成功之后、通过mq计算佣金
			try {
				sendMq.sendString("entrustMatchToOrderExchange", "com.mz.commissionByorder.orderNum",
						exOrderInfo.getOrderNum());
			} catch (Exception e) {
				System.out.println("根据订单处理佣金时 发送消息失败    订单号为 ：" + exOrderInfo.getOrderNum() + "  ------  "
						+ DateUtil.getNewDate());
			}
		}

		LogFactory.info("委托成交业务处理完成，单号：" + exOrderInfo.getOrderNum());
		long end = System.currentTimeMillis();
		LogFactory.info("总耗时：" + (end - start) + "毫秒");
		return relt;
	
	}

	public String[] deductMoneyByExDigita(ExOrderInfo exOrderInfo, ExEntrust buyexEntrust, ExEntrust sellentrust,
			ExOrderInfo exOrderInfosell, ExOrder exOrder){
		 // 资金
		long start = System.currentTimeMillis();
		String[] relt = new String[2];
		List<String> idarr = new ArrayList<String>();
		RemoteAppAccountService remoteAppAccountService = (RemoteAppAccountService) ContextUtil
				.getBean("remoteAppAccountService");
		RpcContext.getContext().setAttachment("saasId", buyexEntrust.getSaasId());
		// 获取买家的定价币账户
	
		ExDigitalmoneyAccount buyappAccount = exDigitalmoneyAccountService.getByCustomerIdAndType(
				buyexEntrust.getCustomerId(), sellentrust.getFixPriceCoinCode(),buyexEntrust.getCurrencyType(), buyexEntrust.getWebsite());
		// 记录开始时的资金金额信息；
		BigDecimal[] buyappAccountarr = new BigDecimal[3];
		buyappAccountarr[0] = buyappAccount.getHotMoney();
		buyappAccountarr[1] = buyappAccount.getColdMoney();
		buyappAccountarr[2] = buyappAccount.getLendMoney();
		// 获取卖家的定价币账户
	
		ExDigitalmoneyAccount sellappAccount = exDigitalmoneyAccountService.getByCustomerIdAndType(
				sellentrust.getCustomerId(), sellentrust.getFixPriceCoinCode(), sellentrust.getCurrencyType(),
				sellentrust.getWebsite());
		BigDecimal[] sellappAccountarr = new BigDecimal[3];
		sellappAccountarr[0] = sellappAccount.getHotMoney();
		sellappAccountarr[1] = sellappAccount.getColdMoney();
		sellappAccountarr[2] = sellappAccount.getLendMoney();

		BigDecimal buychangHotMoney = BigDecimal.ZERO;
		BigDecimal buychangColdMoney = BigDecimal.ZERO;
		BigDecimal sellchangHotMoney = BigDecimal.ZERO;
		// 买家定价币账户变动，添加一条冷钱包记录
		relt = exDigitalmoneyAccountService.unfreezeAccountThem(buyappAccount.getId(), exOrderInfo.getTransactionSum(),  exOrderInfo.getOrderNum(),"交易成功，买家解冻总金额转给卖家" + buyexEntrust.getEntrustNum(), 0);
				
		if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
			buychangColdMoney = buychangColdMoney.subtract(exOrderInfo.getTransactionSum());
			idarr.add(relt[1]);
		} else {
			LogFactory.info(buyappAccount.getUserName() + "---" + buyexEntrust.getEntrustNum() + "买家冻结资金=" + relt[1]
					+ "所以没成交");
			return relt;
		}

		// 买家手续费
		if (exOrderInfo.getTransactionBuyFee().compareTo(BigDecimal.ZERO) > 0) {
			exDigitalmoneyAccountService.payFromHotAccount(buyappAccount.getId(),
					exOrderInfo.getTransactionBuyFee(), exOrderInfo.getOrderNum(),
					"交易成功，买家手续费" + buyexEntrust.getEntrustNum());

			if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
				// 买家人民币账户记录减去手续费 -fee
				buychangHotMoney = buychangHotMoney.subtract(exOrderInfo.getTransactionBuyFee());
				idarr.add(relt[1]);
			} else {
				LogFactory.info("买家手续费=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		}

		// 买家是市价
		if (buyexEntrust.getEntrustWay().equals(2) && buyexEntrust.getStatus().equals(2)) { // 买家是市价
			BigDecimal surpSum = buyexEntrust.getEntrustSum().subtract(buyexEntrust.getTransactionSum());
			// 剩余委托金额
			if (surpSum.compareTo(BigDecimal.ZERO) > 0) {
				relt = exDigitalmoneyAccountService.unfreezeAccountSelfCancelExEntrust(buyappAccount.getId(), surpSum,
						buyexEntrust.getEntrustNum(), "买家市价，完成还剩一点金额给解冻到自己账户" + buyexEntrust.getEntrustNum(), 0);
				if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
					buychangColdMoney = buychangColdMoney.subtract(surpSum);
					buychangHotMoney = buychangHotMoney.add(surpSum);
					idarr.add(relt[1]);
				} else {
					LogFactory.info("买家市价，完成还剩一点金额给解冻到自己账户=" + relt[1]);
					rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(),
							buyappAccount.getCurrencyType(), buyappAccount.getWebsite());
					rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
							sellentrust.getWebsite());
					return relt;
				}
			}
			// 买家是限价
		} else if ((buyexEntrust.getEntrustWay().equals(1) || buyexEntrust.getEntrustWay().equals(3))
				&& buyexEntrust.getStatus().equals(2)) {
			// 前提是余额足够的情况下才能买家才能向上浮动（一般这个浮动式给做市账户用，所以肯定越够，如果给普通账户用还得先确定是否有足够的余额向上浮动）
			if (buyexEntrust.getEntrustSum().compareTo(buyexEntrust.getTransactionSum()) == 1) {
				BigDecimal surpSum = buyexEntrust.getEntrustSum().subtract(buyexEntrust.getTransactionSum());
				relt = remoteAppAccountService.unfreezeAccountSelfCancelExEntrust(buyappAccount.getId(), surpSum,
						buyexEntrust.getEntrustNum(), "买的价格向下浮动，要退钱" + buyexEntrust.getEntrustNum(), 0);
				if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
					buychangColdMoney = buychangColdMoney.subtract(surpSum);
					buychangHotMoney = buychangHotMoney.add(surpSum);
					idarr.add(relt[1]);
				} else {
					LogFactory.info("买的价格向下浮动，要退钱=" + relt[1]);
					rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(),
							buyappAccount.getCurrencyType(), buyappAccount.getWebsite());
					rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
							sellentrust.getWebsite());
					return relt;
				}
			}
		}

		// 卖家资金变化
		RpcContext.getContext().setAttachment("saasId", sellentrust.getSaasId());
		BigDecimal incomeMoney = exOrderInfo.getTransactionSum();
		relt = exDigitalmoneyAccountService.inComeToHotAccount(sellappAccount.getId(), incomeMoney,
				exOrderInfo.getOrderNum(), "交易成功，卖家收入定价币" + sellentrust.getEntrustNum(), null);
		if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
			sellappAccount.setHotMoney(sellappAccount.getHotMoney().add(incomeMoney));
			idarr.add(relt[1]);
		} else {
			LogFactory.info("交易成功，卖家收入金额=" + relt[1]);
			rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
					buyappAccount.getWebsite());
			rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
					sellentrust.getWebsite());
			return relt;
		}

		// 卖家手续费
		if (exOrderInfo.getTransactionSellFee().compareTo(BigDecimal.ZERO) > 0) {
			relt = exDigitalmoneyAccountService.payFromHotAccountNegative(sellappAccount.getId(),
					exOrderInfo.getTransactionSellFee(), exOrderInfo.getOrderNum(),
					"交易成功，卖家手续费" + sellentrust.getEntrustNum(),0);//不更新到数据库
			if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
				sellchangHotMoney = sellchangHotMoney.subtract(exOrderInfo.getTransactionSellFee());
				idarr.add(relt[1]);
			} else {
				LogFactory.info("卖家手续费资金=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		}

		// 买和卖是同一个人
		if (buyexEntrust.getCustomerId().equals(sellentrust.getCustomerId())) {
			LogFactory.info("买家和卖家是同一个人");
			buyappAccount.setHotMoney(buyappAccount.getHotMoney().add(buychangHotMoney.add(sellchangHotMoney)));
			buyappAccount.setColdMoney(buyappAccount.getColdMoney().add(buychangColdMoney));
			relt = exDigitalmoneyAccountService.updateAccount(buyappAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("买家卖家是一家，保存资金=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		} else {
			buyappAccount.setHotMoney(buyappAccount.getHotMoney().add(buychangHotMoney));
			buyappAccount.setColdMoney(buyappAccount.getColdMoney().add(buychangColdMoney));
			relt = exDigitalmoneyAccountService.updateAccount(buyappAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("买家保存资金=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
			sellappAccount.setHotMoney(sellappAccount.getHotMoney().add(sellchangHotMoney));
			relt = exDigitalmoneyAccountService.updateAccount(sellappAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("卖家，保存资金=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		}

		BigDecimal buycoinchangHotMoney = BigDecimal.ZERO;
		BigDecimal sellcoinchangColdMoney = BigDecimal.ZERO;
		// 买家获得币
		ExDigitalmoneyAccount buyDigitalmoneyAccount = exDigitalmoneyAccountService.getByCustomerIdAndType(
				buyexEntrust.getCustomerId(), buyexEntrust.getCoinCode(), buyexEntrust.getCurrencyType(),
				buyexEntrust.getWebsite());
		BigDecimal incomecoin = exOrderInfo.getTransactionCount();
		relt = exDigitalmoneyAccountService.inComeToHotAccount(buyDigitalmoneyAccount.getId(), incomecoin,
				exOrderInfo.getOrderNum(), "交易成功，买家收入比特币" + buyexEntrust.getEntrustNum(), 0);
		buycoinchangHotMoney = buycoinchangHotMoney.add(incomecoin);

		// 卖家币支出
		ExDigitalmoneyAccount sellDigitalmoneyAccount = exDigitalmoneyAccountService.getByCustomerIdAndType(
				sellentrust.getCustomerId(), sellentrust.getCoinCode(), sellentrust.getCurrencyType(),
				sellentrust.getWebsite());
		relt = exDigitalmoneyAccountService.unfreezeAccountThem(sellDigitalmoneyAccount.getId(),
				exOrderInfo.getTransactionCount(), exOrderInfo.getOrderNum(),
				"交易成功，卖家虚拟币解冻转买家" + sellentrust.getEntrustNum(), 0);
		sellcoinchangColdMoney = sellcoinchangColdMoney.subtract(exOrderInfo.getTransactionCount());

		// 买和卖是同一个人
		if (buyexEntrust.getCustomerId().equals(sellentrust.getCustomerId())) {
			buyDigitalmoneyAccount.setHotMoney(buyDigitalmoneyAccount.getHotMoney().add(buycoinchangHotMoney));
			buyDigitalmoneyAccount.setColdMoney(sellDigitalmoneyAccount.getColdMoney().add(sellcoinchangColdMoney));
			relt = exDigitalmoneyAccountService.updateAccount(buyDigitalmoneyAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("币账户保存失败=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		} else {
			buyDigitalmoneyAccount.setHotMoney(buyDigitalmoneyAccount.getHotMoney().add(buycoinchangHotMoney));
			relt = exDigitalmoneyAccountService.updateAccount(buyDigitalmoneyAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("买币账户保存失败=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
			sellDigitalmoneyAccount.setColdMoney(sellDigitalmoneyAccount.getColdMoney().add(sellcoinchangColdMoney));
			exDigitalmoneyAccountService.updateAccount(sellDigitalmoneyAccount);
			if (relt[0].equals(CodeConstant.CODE_FAILED)) {
				LogFactory.info("卖币账户保存失败=" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				return relt;
			}
		}

		// 资金都保存成功了才保存这些信息
		if (relt[0].equals(CodeConstant.CODE_SUCCESS)) {
			try {
				// 开始保存
				exOrderInfoService.save(exOrderInfo);
				exOrderInfoService.save(exOrderInfosell);
				exOrderService.save(exOrder);
				exEntrustService.update(buyexEntrust);
				exEntrustService.update(sellentrust);
				this.refreshEntrust(buyexEntrust, sellentrust);
				// 然后从mongodb中删除，现在改成从临时表及redis缓存中删除
				
			} catch (Exception e) {
				LogFactory.info("委托成功最后保存出错：" + relt[1]);
				rollbackMoney(idarr, buyappAccountarr, buyappAccount.getCustomerId(), buyappAccount.getCurrencyType(),
						buyappAccount.getWebsite());
				rollbackMoney(idarr, sellappAccountarr, sellentrust.getCustomerId(), sellentrust.getCurrencyType(),
						sellentrust.getWebsite());
				throw e; // 抛出异常回滚
			}
			// 平台收取手续费
			if (exOrderInfo.getTransactionBuyFee().compareTo(BigDecimal.ZERO) > 0
					|| exOrderInfo.getTransactionSellFee().compareTo(BigDecimal.ZERO) > 0) {
				try {
					// 我方账号收取手续费
					RemoteAppOurAccountService remoteAppOurAccountService = (RemoteAppOurAccountService) ContextUtil
							.getBean("remoteAppOurAccountService");
					remoteAppOurAccountService.addMoneyForOurAccount(exOrderInfo);
				} catch (Exception e) {
					LogFactory.info("订单号：" + exOrderInfo.getOrderNum() + "我方账户收取费用失败");
				}
			}
			// 委托成功之后、通过mq计算佣金
			try {
				sendMq.sendString("entrustMatchToOrderExchange", "com.mz.commissionByorder.orderNum",
						exOrderInfo.getOrderNum());
			} catch (Exception e) {
				System.out.println("根据订单处理佣金时 发送消息失败    订单号为 ：" + exOrderInfo.getOrderNum() + "  ------  "
						+ DateUtil.getNewDate());
			}
		}

		LogFactory.info("委托成交业务处理完成，单号：" + exOrderInfo.getOrderNum());
		long end = System.currentTimeMillis();
		LogFactory.info("总耗时：" + (end - start) + "毫秒");
		return relt;
	
	}
	*//**
	 * 买卖交易成交
	 *//*
	@Override
	public String[] deductMoney(ExOrderInfo exOrderInfo, ExEntrust buyexEntrust, ExEntrust sellentrust,
			ExOrderInfo exOrderInfosell, ExOrder exOrder) {
		
		if(buyexEntrust.getFixPriceType()==0){//如果是定价是真实货币
			return this.deductMoneyByaccount(exOrderInfo, buyexEntrust, sellentrust, exOrderInfosell, exOrder);
		}else{  //如果定价是虚拟货币
			return this.deductMoneyByExDigita(exOrderInfo, buyexEntrust, sellentrust, exOrderInfosell, exOrder);
		}
	}
	
	*//**
	 * 成交之后设置刷新更新数据库及缓存
	 * <p> TODO</p>
	 * @author:         Shangxl
	 * @param:    @param buyexEntrust
	 * @param:    @param sellentrust
	 * @return: void 
	 * @Date :          2017年7月5日 下午5:13:12   
	 * @throws:
	 *//*
	public void refreshEntrust(ExEntrust buyexEntrust,ExEntrust sellentrust){
		//买单部分成交（刷新数据库记录，及redis挂单记录）
		if(buyexEntrust.getStatus().equals(1)){
			//1.清除redis中的记录
			exEntrustService.delExEntrust(buyexEntrust);
			//2.添加部分委托单至redis挂单记录
			exEntrustService.addExEntrust(buyexEntrust);
			//3.查询数据库临时表
			QueryFilter filter=new QueryFilter(ExentrustOneday.class);
			filter.addFilter("entrustNum=", buyexEntrust.getEntrustNum());
			ExentrustOneday old=exentrustOnedayService.get(filter);
			//3.更新数据库
			ExentrustOneday exentrustOneday=JSON.parseObject(JSON.toJSONString(buyexEntrust), ExentrustOneday.class);
			exentrustOneday.setId(old.getId());
			exentrustOnedayService.update(exentrustOneday);
		}
		//买单全部成交（直接删除数据库临时表中的记录及redis中的挂单记录）
		if(buyexEntrust.getStatus().equals(2)){
			exentrustOnedayService.delByEntrustNumber(buyexEntrust.getEntrustNum());
			exEntrustService.delExEntrust(buyexEntrust);
		}
		//卖单部分成交
		if(sellentrust.getStatus().equals(1)){
			//1.清除redis中的记录
			exEntrustService.delExEntrust(sellentrust);
			//2.添加部分委托单至redis挂单记录
			exEntrustService.addExEntrust(sellentrust);
			//3.查询数据库临时表
			QueryFilter filter=new QueryFilter(ExentrustOneday.class);
			filter.addFilter("entrustNum=", sellentrust.getEntrustNum());
			ExentrustOneday old=exentrustOnedayService.get(filter);
			//3.更新数据库
			ExentrustOneday exentrustOneday=JSON.parseObject(JSON.toJSONString(sellentrust), ExentrustOneday.class);
			exentrustOneday.setId(old.getId());
			exentrustOnedayService.update(exentrustOneday);
			}
		//买单全部成交（直接删除数据库临时表中的记录及redis中的挂单记录）
		if(sellentrust.getStatus().equals(2)){
			exentrustOnedayService.delByEntrustNumber(sellentrust.getEntrustNum());
			exEntrustService.delExEntrust(sellentrust);
		}
		
	}

}
*/