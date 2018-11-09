/**
 * Copyright:   北京互融时代软件有限公司
 * @author:      liushilei
 * @version:     V1.0 
 * @Date:        2017-12-07 14:06:38 
 */
package com.mz.manage.remote.model.otc;



import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


/**
 * <p> C2cTransaction </p>
 * @author:         zongwei
 * @Date :          20180524
 */

public class OtcOrderTransactionMange implements Serializable {

	private String saasId;

	private Date created;

	private Date modified;
	

	private Long id;  //id
	

	private Long businessmanId;  //商户id


	private String allName;//实名信息的姓名



	private String businessmanTrueName;//商户名称
	

	private Long businessmanBankId;  //商户银行卡id
	

	private String randomNum;  //交易随机码
	

	private String transactionNum;  //委托订单号

	private String transactionOrderNum;  //交易订单号
	

	private String userName;  //用户登录名
	

	private Long sellCustomId;  //卖方的id


	private Long buyCustomId;  //买方的id
	

	private Long customerBankId;  //用户银行卡id




	private Long buyAccountId;  //虚拟账户id


	private Long sellAaccountId;  //虚拟账户id
	

	private Integer transactionType;  //交易类型  1买，2卖
	

	private BigDecimal transactionMoney;  //交易金额
	

	private BigDecimal transactionCount;  //交易数量
	

	private BigDecimal transactionPrice;  //交易价格
	

	private Integer status;  //1未付款 2已付款 3已取消 4 已完成 5 已关闭
	

	private Integer status2;  //1未支付 2已支付 3交易失败 4交易关闭
	

	private String remark;  //备注
	

	private String coinCode;  //币的类型
	

	private BigDecimal fee;  //手续费
	

	private Long transactionId; //委托订单id


	private String businessman;  //交易商


	private String statusByDes;	//交易状态 2018.4.25新加 by gt


	private String transactionTypeByDes; //交易类型 2018.4.25新加 by gt


	private String cardBank; //卖家开户银行 2018.4.25新加 by gt

	private String cardNumber; //卖家银行卡号 2018.4.25新加 by gt

	private String subBank; //卖家开户支行 2018.4.25新加 by gt


	private String img1;  //付款完成照片


	private String img2;  //付款完成照片


	private String img3;  //付款完成照片


	private String img4;  //申诉照片


	private String img5;  //申诉照片



	private String img6;  //申诉照片


	private BigDecimal dealQuantity;  //成交量

	private String appealFlag;  //申诉标识

	private String appealReason;  //申诉说明

	private String paymentType;  //付款类型


	private Date paymentTime;  //付款时间


	private Long appealCustomId;  //申诉方的id

	private Long createBy;  //创建人;

	private Long cancelBy;  //取消人


	private String appealCustomName;  //申诉方的id

	private String appealHandle; //申诉处理

	public Long getCancelBy() {
		return cancelBy;
	}

	public void setCancelBy(Long cancelBy) {
		this.cancelBy = cancelBy;
	}

	public String getSaasId() {
		return saasId;
	}

	public void setSaasId(String saasId) {
		this.saasId = saasId;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getModified() {
		return modified;
	}

	public void setModified(Date modified) {
		this.modified = modified;
	}

	public String getAppealHandle() {
		return appealHandle;
	}

	public void setAppealHandle(String appealHandle) {
		this.appealHandle = appealHandle;
	}

	public Long getAppealCustomId() {
		return appealCustomId;
	}

	public void setAppealCustomId(Long appealCustomId) {
		this.appealCustomId = appealCustomId;
	}

	public String getAppealCustomName() {
		return appealCustomName;
	}

	public void setAppealCustomName(String appealCustomName) {
		this.appealCustomName = appealCustomName;
	}


	public Long getCreateBy() {
		return createBy;
	}

	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}

	public BigDecimal getDealQuantity() {
		return dealQuantity;
	}

	public void setDealQuantity(BigDecimal dealQuantity) {
		this.dealQuantity = dealQuantity;
	}

	public BigDecimal getSurplusQuantity() {
		return surplusQuantity;
	}

	public void setSurplusQuantity(BigDecimal surplusQuantity) {
		this.surplusQuantity = surplusQuantity;
	}



	private BigDecimal surplusQuantity;  //剩余量

	public String getTransactionOrderNum() {
		return transactionOrderNum;
	}

	public void setTransactionOrderNum(String transactionOrderNum) {
		this.transactionOrderNum = transactionOrderNum;
	}

	public String getCardBank() {
		return cardBank;
	}

	public void setCardBank(String cardBank) {
		this.cardBank = cardBank;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getSubBank() {
		return subBank;
	}

	public void setSubBank(String subBank) {
		this.subBank = subBank;
	}

	public String getStatusByDes() {
		return statusByDes;
	}

	public void setStatusByDes(String statusByDes) {
		this.statusByDes = statusByDes;
	}

	public String getTransactionTypeByDes() {
		return transactionTypeByDes;
	}

	public void setTransactionTypeByDes(String transactionTypeByDes) {
		this.transactionTypeByDes = transactionTypeByDes;
	}

	public String getAllName() {
		return allName;
	}

	public void setAllName(String allName) {
		this.allName = allName;
	}

	public String getBusinessman() {
		return businessman;
	}

	public void setBusinessman(String businessman) {
		this.businessman = businessman;
	}

	public Integer getStatus2() {
		return status2;
	}

	public void setStatus2(Integer status2) {
		this.status2 = status2;
	}

	public Long getBusinessmanId() {
		return businessmanId;
	}

	public void setBusinessmanId(Long businessmanId) {
		this.businessmanId = businessmanId;
	}

	public Long getBusinessmanBankId() {
		return businessmanBankId;
	}

	public void setBusinessmanBankId(Long businessmanBankId) {
		this.businessmanBankId = businessmanBankId;
	}

	public String getRandomNum() {
		return randomNum;
	}

	public void setRandomNum(String randomNum) {
		this.randomNum = randomNum;
	}

	/**
	 * <p>id</p>
	 * @author:  liushilei
	 * @return:  Long 
	 * @Date :   2017-12-07 14:06:38    
	 */
	public Long getId() {
		return id;
	}
	
	/**
	 * <p>id</p>
	 * @author:  liushilei
	 * @param:   @param id
	 * @return:  void 
	 * @Date :   2017-12-07 14:06:38   
	 */
	public void setId(Long id) {
		this.id = id;
	}
	
	
	/**
	 * <p>交易订单号</p>
	 * @author:  liushilei
	 * @return:  String 
	 * @Date :   2017-12-07 14:06:38    
	 */
	public String getTransactionNum() {
		return transactionNum;
	}
	
	/**
	 * <p>交易订单号</p>
	 * @author:  liushilei
	 * @param:   @param transactionNum
	 * @return:  void 
	 * @Date :   2017-12-07 14:06:38   
	 */
	public void setTransactionNum(String transactionNum) {
		this.transactionNum = transactionNum;
	}
	
	
	/**
	 * <p>用户登录名</p>
	 * @author:  liushilei
	 * @return:  String 
	 * @Date :   2017-12-07 14:06:38    
	 */
	public String getUserName() {
		return userName;
	}
	
	/**
	 * <p>用户登录名</p>
	 * @author:  liushilei
	 * @param:   @param userName
	 * @return:  void 
	 * @Date :   2017-12-07 14:06:38   
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	

	

	
	/**
	 * <p>交易类型(1线上充值,2线上提现 3线下充值 4线下取现...)</p>
	 * @author:  liushilei
	 * @return:  Integer 
	 * @Date :   2017-12-07 14:06:38    
	 */
	public Integer getTransactionType() {
		return transactionType;
	}
	
	/**
	 * <p>交易类型(1线上充值,2线上提现 3线下充值 4线下取现...)</p>
	 * @author:  liushilei
	 * @param:   @param transactionType
	 * @return:  void 
	 * @Date :   2017-12-07 14:06:38   
	 */
	public void setTransactionType(Integer transactionType) {
		this.transactionType = transactionType;
	}
	
	
	/**
	 * <p>交易金额</p>
	 * @author:  liushilei
	 * @return:  BigDecimal 
	 * @Date :   2017-12-07 14:06:38    
	 */
	public BigDecimal getTransactionMoney() {
		return transactionMoney;
	}
	
	/**
	 * <p>交易金额</p>
	 * @author:  liushilei
	 * @param:   @param transactionMoney
	 * @return:  void 
	 * @Date :   2017-12-07 14:06:38   
	 */
	public void setTransactionMoney(BigDecimal transactionMoney) {
		this.transactionMoney = transactionMoney;
	}
	
	
	/**
	 * <p>1待审核 2已完成 3以否决</p>
	 * @author:  liushilei
	 * @return:  Integer 
	 * @Date :   2017-12-07 14:06:38    
	 */
	public Integer getStatus() {
		return status;
	}
	
	/**
	 * <p>1待审核 2已完成 3以否决</p>
	 * @author:  liushilei
	 * @param:   @param status
	 * @return:  void 
	 * @Date :   2017-12-07 14:06:38   
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	
	/**
	 * <p>备注</p>
	 * @author:  liushilei
	 * @return:  String 
	 * @Date :   2017-12-07 14:06:38    
	 */
	public String getRemark() {
		return remark;
	}
	
	/**
	 * <p>备注</p>
	 * @author:  liushilei
	 * @param:   @param remark
	 * @return:  void 
	 * @Date :   2017-12-07 14:06:38   
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	
	/**
	 * <p>币的类型(RMB USD)</p>
	 * @author:  liushilei
	 * @return:  String 
	 * @Date :   2017-12-07 14:06:38    
	 */
	public String getCoinCode() {
		return coinCode;
	}
	
	/**
	 * <p>币的类型(RMB USD)</p>
	 * @author:  liushilei
	 * @param:   @param coinCode
	 * @return:  void 
	 * @Date :   2017-12-07 14:06:38   
	 */
	public void setCoinCode(String coinCode) {
		this.coinCode = coinCode;
	}
	
	
	/**
	 * <p>手续费</p>
	 * @author:  liushilei
	 * @return:  BigDecimal 
	 * @Date :   2017-12-07 14:06:38    
	 */
	public BigDecimal getFee() {
		return fee;
	}
	
	/**
	 * <p>手续费</p>
	 * @author:  liushilei
	 * @param:   @param fee
	 * @return:  void 
	 * @Date :   2017-12-07 14:06:38   
	 */
	public void setFee(BigDecimal fee) {
		this.fee = fee;
	}

	public BigDecimal getTransactionCount() {
		return transactionCount;
	}

	public void setTransactionCount(BigDecimal transactionCount) {
		this.transactionCount = transactionCount;
	}

	public BigDecimal getTransactionPrice() {
		return transactionPrice;
	}

	public void setTransactionPrice(BigDecimal transactionPrice) {
		this.transactionPrice = transactionPrice;
	}

	public String getBusinessmanTrueName() {
		return businessmanTrueName;
	}

	public void setBusinessmanTrueName(String businessmanTrueName) {
		this.businessmanTrueName = businessmanTrueName;
	}

	public Long getCustomerBankId() {
		return customerBankId;
	}

	public void setCustomerBankId(Long customerBankId) {
		this.customerBankId = customerBankId;
	}

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}


	public Long getSellCustomId() {
		return sellCustomId;
	}

	public void setSellCustomId(Long sellCustomId) {
		this.sellCustomId = sellCustomId;
	}

	public Long getBuyCustomId() {
		return buyCustomId;
	}

	public void setBuyCustomId(Long buyCustomId) {
		this.buyCustomId = buyCustomId;
	}

	public Long getBuyAccountId() {
		return buyAccountId;
	}

	public void setBuyAccountId(Long buyAccountId) {
		this.buyAccountId = buyAccountId;
	}

	public Long getSellAaccountId() {
		return sellAaccountId;
	}

	public void setSellAaccountId(Long sellAaccountId) {
		this.sellAaccountId = sellAaccountId;
	}

	public String getImg1() {
		return img1;
	}

	public void setImg1(String img1) {
		this.img1 = img1;
	}

	public String getImg2() {
		return img2;
	}

	public void setImg2(String img2) {
		this.img2 = img2;
	}

	public String getImg3() {
		return img3;
	}

	public void setImg3(String img3) {
		this.img3 = img3;
	}

	public String getImg4() {
		return img4;
	}

	public void setImg4(String img4) {
		this.img4 = img4;
	}

	public String getImg5() {
		return img5;
	}

	public void setImg5(String img5) {
		this.img5 = img5;
	}

	public String getImg6() {
		return img6;
	}

	public void setImg6(String img6) {
		this.img6 = img6;
	}

	public String getAppealFlag() {
		return appealFlag;
	}

	public void setAppealFlag(String appealFlag) {
		this.appealFlag = appealFlag;
	}

	public String getAppealReason() {
		return appealReason;
	}

	public void setAppealReason(String appealReason) {
		this.appealReason = appealReason;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public Date getPaymentTime() {
		return paymentTime;
	}

	public void setPaymentTime(Date paymentTime) {
		this.paymentTime = paymentTime;
	}
}
