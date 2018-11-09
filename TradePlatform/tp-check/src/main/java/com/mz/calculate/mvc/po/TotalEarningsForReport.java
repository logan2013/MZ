/**
 * Copyright:  北京互融时代软件有限公司
 * @author:    Wu Shuiming
 * @version:   V1.0 
 * @Date:      2016年8月23日 下午5:53:00
 */
package com.mz.calculate.mvc.po;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 *   平台资金收益日结算报表
 * 
 * @author Wu shuiming
 * @date 2016年8月23日 下午5:53:00
 */
@SuppressWarnings("serial")
public class TotalEarningsForReport implements Serializable{

	private BigDecimal getFee; // 提现手续费
	private BigDecimal postFee;  // 充值手续费
	private BigDecimal transactionFee;  // 交易手续费
	private BigDecimal interestCount;  // 杠杠收费的数量
	private BigDecimal drawalMoney; // 派发的佣金
	private BigDecimal totalMoney;  // 总收入
	private BigDecimal finalNumber;    //期末总个数
	private BigDecimal HaveNumber; 		//平台自持总金额
	private BigDecimal Sharenumber;			//平台总个数
	
	
	
	
	public BigDecimal getHaveNumber() {
		return HaveNumber;
	}
	public void setHaveNumber(BigDecimal haveNumber) {
		HaveNumber = haveNumber;
	}
	public BigDecimal getSharenumber() {
		return Sharenumber;
	}
	public void setSharenumber(BigDecimal sharenumber) {
		Sharenumber = sharenumber;
	}
	public BigDecimal getFinalNumber() {
		return finalNumber;
	}
	public void setFinalNumber(BigDecimal finalNumber) {
		this.finalNumber = finalNumber;
	}
	public BigDecimal getTotalMoney() {
		return totalMoney;
	}
	public void setTotalMoney(BigDecimal totalMoney) {
		this.totalMoney = totalMoney;
	}
	public BigDecimal getGetFee() {
		return getFee;
	}
	public void setGetFee(BigDecimal getFee) {
		this.getFee = getFee;
	}
	public BigDecimal getPostFee() {
		return postFee;
	}
	public void setPostFee(BigDecimal postFee) {
		this.postFee = postFee;
	}
	public BigDecimal getTransactionFee() {
		return transactionFee;
	}
	public void setTransactionFee(BigDecimal transactionFee) {
		this.transactionFee = transactionFee;
	}
	public BigDecimal getInterestCount() {
		return interestCount;
	}
	public void setInterestCount(BigDecimal interestCount) {
		this.interestCount = interestCount;
	}
	public BigDecimal getDrawalMoney() {
		return drawalMoney;
	}
	public void setDrawalMoney(BigDecimal drawalMoney) {
		this.drawalMoney = drawalMoney;
	}                                          				
                                           					
                           			
}                










