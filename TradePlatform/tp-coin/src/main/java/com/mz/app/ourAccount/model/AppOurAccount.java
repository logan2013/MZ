package com.mz.app.ourAccount.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.mz.core.mvc.model.BaseModel;

/**
 * 
 * <p> TODO</p>
 * @author:         shangxl
 * @Date :          2017年11月7日 下午6:14:48
 */
@Table(name="app_our_account")
public class AppOurAccount extends BaseModel {
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;
	
	
	/**
	 * 账户类型   0银行卡  1币账户   2支付宝
	 */
	@Column(name="accountType")
	private String accountType ;
	
	/**
	 * 开户类型    0企业 1个人  /0 充币 1 提币   2.ico充币  3.ico提币
	 */
	@Column(name="openAccountType")
	private  String openAccountType;
	
	
	/**
	 * 银行名称
	 */
	@Column(name="bankName")
	private String bankName;
	
	
	/**
	 * 银行数据字典value
	 */
	@Transient
	private String dicBankName;
	
	/**
	 * 账户持有人
	 */
	@Column(name="accountName")
	private String accountName;
	
	
	/**
	 * 账户号
	 */
	@Column(name="accountNumber")
	private String accountNumber;
	
	/**
	 * 开通时间
	 */
	@Column(name="openTime")
	private Date openTime;
	
	/**
	 * 账户总额
	 */
	@Column(name="accountMoney")
	private BigDecimal accountMoney;
	
	/**
	 * 新账户总额（只在闭市市加上当日的充值加提现） 金科新加
	 */
	@Column(name="accountMoneyNew")
	private BigDecimal accountMoneyNew;
	
	/**
	 * 今日新增额 金边新加
	 */
	@Column(name="todayAddedMoney")
	private BigDecimal todayAddedMoney;
	
	/**
	 * 手续费剩余总额（闭市时加上当日的交易手续费收入） 金科新加
	 */
	@Column(name="accountFee")
	private BigDecimal accountFee;
	
	/**
	 * 已提现手续费总额 金科新加
	 */
	@Column(name="hasOutFee")
	private BigDecimal hasOutFee;
	
	/**
	 * 今日新增手续费额 金科新加
	 */
	@Column(name="todayAddedFee")
	private BigDecimal todayAddedFee;
	
	
	/**
	 * 货币类型   0人民币  1
	 */
	@Column(name="currencyType")
	private String currencyType;
	
	/**
	 * 银行logo
	 */
	@Column(name="bankLogo")
	private String bankLogo;
	
	/**
	 * 是否展示
	 */
	@Column(name="isShow")
	private Integer isShow;
	
	/**
	 * 银行地址
	 */
	@Column(name="bankAddress")
	private String bankAddress;
	
	/**
	 * 银行地址
	 */
	@Column(name="remark")
	private String remark;
	
	/**
	 * 站点类别默认cn
	 */
	@Column(name="website")
	private String website;
	
	
	/**
	 * 账户保留个数/金额
	 */
	@Column(name="retainsMoney")
	private BigDecimal retainsMoney;
	
	/**
	 * 钱包服务器币种总额
	 */
	@Transient
	private BigDecimal coinTotalMoney;
	
	/**
	 * 提币钱包账户余额
	 */
	@Transient
	private BigDecimal withdrawMoney;
	
	

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getTodayAddedMoney() {
		return todayAddedMoney;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setTodayAddedMoney(BigDecimal todayAddedMoney) {
		this.todayAddedMoney = todayAddedMoney;
	}

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getTodayAddedFee() {
		return todayAddedFee;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setTodayAddedFee(BigDecimal todayAddedFee) {
		this.todayAddedFee = todayAddedFee;
	}

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getAccountMoneyNew() {
		return accountMoneyNew;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setAccountMoneyNew(BigDecimal accountMoneyNew) {
		this.accountMoneyNew = accountMoneyNew;
	}

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getAccountFee() {
		return accountFee;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setAccountFee(BigDecimal accountFee) {
		this.accountFee = accountFee;
	}

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getHasOutFee() {
		return hasOutFee;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setHasOutFee(BigDecimal hasOutFee) {
		this.hasOutFee = hasOutFee;
	}

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getWithdrawMoney() {
		return withdrawMoney;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setWithdrawMoney(BigDecimal withdrawMoney) {
		this.withdrawMoney = withdrawMoney;
	}

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getCoinTotalMoney() {
		return coinTotalMoney;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setCoinTotalMoney(BigDecimal coinTotalMoney) {
		this.coinTotalMoney = coinTotalMoney;
	}

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getRetainsMoney() {
		return retainsMoney;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setRetainsMoney(BigDecimal retainsMoney) {
		this.retainsMoney = retainsMoney;
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
	public String getAccountType() {
		return accountType;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getOpenAccountType() {
		return openAccountType;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setOpenAccountType(String openAccountType) {
		this.openAccountType = openAccountType;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getBankName() {
		return bankName;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getAccountName() {
		return accountName;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getAccountNumber() {
		return accountNumber;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	/**
	 * <p> TODO</p>
	 * @return:     Date
	 */
	public Date getOpenTime() {
		return openTime;
	}

	/** 
	 * <p> TODO</p>
	 * @return: Date
	 */
	public void setOpenTime(Date openTime) {
		this.openTime = openTime;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getCurrencyType() {
		return currencyType;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setCurrencyType(String currencyType) {
		this.currencyType = currencyType;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public String getBankLogo() {
		return bankLogo;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setBankLogo(String bankLogo) {
		this.bankLogo = bankLogo;
	}

	/**
	 * <p> TODO</p>
	 * @return:     String
	 */
	public Integer getIsShow() {
		return isShow;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setIsShow(Integer isShow) {
		this.isShow = isShow;
	}

	/**
	 * <p> TODO</p>
	 * @return:     BigDecimal
	 */
	public BigDecimal getAccountMoney() {
		return accountMoney;
	}

	/** 
	 * <p> TODO</p>
	 * @return: BigDecimal
	 */
	public void setAccountMoney(BigDecimal accountMoney) {
		this.accountMoney = accountMoney;
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
	public String getRemark() {
		return remark;
	}

	/** 
	 * <p> TODO</p>
	 * @return: String
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getDicBankName() {
		return dicBankName;
	}

	public void setDicBankName(String dicBankName) {
		this.dicBankName = dicBankName;
	}
	
	
	

}
