/**
 * Copyright:   北京互融时代软件有限公司
 * @author:      Liu Shilei
 * @version:      V1.0 
 * @Date:        2016年3月31日 下午6:40:58
 */
package com.mz.manage.remote.model;


import java.io.Serializable;
import java.math.BigDecimal;

import com.mz.core.mvc.model.BaseModel;
import io.swagger.annotations.ApiModelProperty;


public class AppTransactionManage extends BaseModel{
	
	private Long id;
	@ApiModelProperty(value = "站点类别默认cn", required = false)
	private String website;//站点类别默认cn
	@ApiModelProperty(value = "交易单号", required = false)
	private String transactionNum;  //交易单号
	@ApiModelProperty(value = "用户登录名", required = false)
	private String userName ;//用户登录名
	@ApiModelProperty(value = "审核人Id  后台用户", required = false)
	private Long userId ;// 审核人Id  后台用户
	@ApiModelProperty(value = "用户Id", required = false)
	private Long customerId; //用户Id
	@ApiModelProperty(value = "账户ID", required = false)
	private Long accountId;//账户ID
	
	private String cardHolder;
	@ApiModelProperty(value = "交易类型(1线上充值,2线上提现 3线下充值 4线下取现 5支付宝充值)", required = false)
	private Integer transactionType;   //交易类型(1线上充值,2线上提现 3线下充值 4线下取现 5支付宝充值)
	
	@ApiModelProperty(value = "交易金额", required = false)
	private BigDecimal transactionMoney; //交易金额
	@ApiModelProperty(value = "手续费", required = false)
	private BigDecimal fee; //手续费
	@ApiModelProperty(value = "1待审核 2已完成 3以否决  4表示等待成交", required = false)
	private Integer status; //1待审核 2已完成 3以否决  4表示等待成交
	
	// 我方银行卡号     
	@ApiModelProperty(value = "我方银行卡号", required = false)
	private String ourAccountNumber ;
	
	private String custromerAccountNumber ;
	
	// 交易的币类型
	@ApiModelProperty(value = "交易的币类型", required = false)
	private String currencyType ;
	
	private String surname;
	
	private String trueName;
	// 银行简码
	@ApiModelProperty(value = "银行简码", required = false)
	private String bankNum ;
	
	private String bankName;
	
	@ApiModelProperty(value = "开户省份", required = false)
	private String bankProvince; //开户省份
	
	@ApiModelProperty(value = "开户行所在地  开户市", required = false)
	private String bankAddress;//开户行所在地  开户市
	
	@ApiModelProperty(value = "开户支行", required = false)
	private String subBank;  //开户支行
	
	@ApiModelProperty(value = "开户支行的银行机构代码", required = false)
	private String subBankNum;  //开户支行的银行机构代码


	// 后台处理后的修改的状态 (表示后台申请了之后  需要第三方回调的方法。)
	@ApiModelProperty(value = "后台处理后的修改的状态 (表示后台申请了之后  需要第三方回调的方法。)", required = false)
	private Integer readyStates;
	
	@ApiModelProperty(value = "第三方支付的名字", required = false)
	private String thirdPayName; //第三方支付的名字
	
	// 备注
	@ApiModelProperty(value = "备注", required = false)
	private String remark ;
	
	

	
	//驳回理由
	@ApiModelProperty(value = "驳回理由", required = false)
	private String rejectionReason ;
	
	
	
	private String accountName;
	
	private String accountNumber;
	
	private Long created_long;
	
	
	
	public Long getCreated_long() {
		if(super.getCreated()!=null){
			return super.getCreated().getTime();
		}
		return 0L;
	}

	public void setCreated_long(Long created_long) {
		this.created_long = created_long;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getRejectionReason() {
		return rejectionReason;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setRejectionReason(String rejectionReason) {
		this.rejectionReason = rejectionReason;
	}

	

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getSubBankNum() {
		return subBankNum;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setSubBankNum(String subBankNum) {
		this.subBankNum = subBankNum;
	}

	public Integer getReadyStates() {
		return readyStates;
	}

	public void setReadyStates(Integer readyStates) {
		this.readyStates = readyStates;
	}


	public void setCurrencyType(String currencyType) {
		this.currencyType = currencyType;
	}
	

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getBankProvince() {
		return bankProvince;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setBankProvince(String bankProvince) {
		this.bankProvince = bankProvince;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getBankAddress() {
		return bankAddress;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setBankAddress(String bankAddress) {
		this.bankAddress = bankAddress;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getSubBank() {
		return subBank;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setSubBank(String subBank) {
		this.subBank = subBank;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	// 充值 类型(0表示 银行卡  --- 1 表示 支付宝 )
	private Integer style; 

	public String getCardHolder() {
		return cardHolder;
	}

	public void setCardHolder(String cardHolder) {
		this.cardHolder = cardHolder;
	}

	public String getOurAccountNumber() {
		return ourAccountNumber;
	}

	public void setOurAccountNumber(String ourAccountNumber) {
		this.ourAccountNumber = ourAccountNumber;
	}

	public String getCustromerAccountNumber() {
		return custromerAccountNumber;
	}

	public void setCustromerAccountNumber(String custromerAccountNumber) {
		this.custromerAccountNumber = custromerAccountNumber;
	}

	public Integer getStyle() {
		return style;
	}

	public void setStyle(Integer style) {
		this.style = style;
	}

	/**
	 * <p> TODO</p>
	 * @return:     Long
	 */
	public Long getId() {
		return id;
	}

	/** 
	 * <p> TODO</p>
	 * @return: Long
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getTransactionNum() {
		return transactionNum;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setTransactionNum(String transactionNum) {
		this.transactionNum = transactionNum;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getUserName() {
		return userName;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * <p> TODO</p>
	 * @return:     Long
	 */
	public Long getCustomerId() {
		return customerId;
	}

	/** 
	 * <p> TODO</p>
	 * @return: Long
	 */
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	/**
	 * <p> TODO</p>
	 * @return:     Long
	 */
	public Long getAccountId() {
		return accountId;
	}

	/** 
	 * <p> TODO</p>
	 * @return: Long
	 */
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	/**
	 * <p> TODO</p>
	 * @return:     Integer
	 */
	public Integer getTransactionType() {
		return transactionType;
	}

	/** 
	 * <p> TODO</p>
	 * @return: Integer
	 */
	public void setTransactionType(Integer transactionType) {
		this.transactionType = transactionType;
	}

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getTransactionMoney() {
		return transactionMoney;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setTransactionMoney(BigDecimal transactionMoney) {
		this.transactionMoney = transactionMoney;
	}

	/**
	 * <p> TODO</p>
	 * @return:     Integer
	 */
	public Integer getStatus() {
		return status;
	}

	/** 
	 * <p> TODO</p>
	 * @return: Integer
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	/**
	 * <p> TODO</p>
	 * @return:     Long
	 */
	public Long getUserId() {
		return userId;
	}

	/** 
	 * <p> TODO</p>
	 * @return: Long
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getCurrencyType() {
		return currencyType;
	}
	

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getFee() {
		return fee;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setFee(BigDecimal fee) {
		this.fee = fee;
	}


	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getBankNum() {
		return bankNum;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setBankNum(String bankNum) {
		this.bankNum = bankNum;
	}


	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getTrueName() {
		return trueName;
	}

	public void setTrueName(String trueName) {
		this.trueName = trueName;
	}

	public String getThirdPayName() {
		return thirdPayName;
	}

	public void setThirdPayName(String thirdPayName) {
		this.thirdPayName = thirdPayName;
	}
	
	
	
}
