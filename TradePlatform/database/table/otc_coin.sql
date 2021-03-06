CREATE TABLE `otc_coin` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `coinCode` VARCHAR(20) COLLATE utf8_bin DEFAULT NULL COMMENT "币种",
  `isOpen` TINYINT(1) DEFAULT NULL,
  `buyPrice` DECIMAL(20,10) DEFAULT NULL,
  `sellPrice` DECIMAL(20,10) DEFAULT NULL,
   `minbuyPrice` DECIMAL(20,10) DEFAULT NULL COMMENT "最小买入价",
   `maxbuyPrice` DECIMAL(20,10) DEFAULT NULL COMMENT "最大买入价",
   `minsellPrice` DECIMAL(20,10) DEFAULT NULL COMMENT "最小卖出价",
   `maxsellPrice` DECIMAL(20,10) DEFAULT NULL COMMENT "最大卖出价",
  `minCount` DECIMAL(20,10) DEFAULT NULL,
  `maxCount` DECIMAL(20,10) DEFAULT NULL,
  `poundage_type` VARCHAR(20) COLLATE utf8_bin DEFAULT NULL COMMENT "手续费类型, Definite 固定的，Proportions  比例的",
  `poundage` DECIMAL(20,10) DEFAULT NULL COMMENT "手续费",
  `maxTradeTime` DECIMAL(20,10) DEFAULT 30 COMMENT "允许最大未付款时间  默认30 分钟",
  `saasId` VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL,
  `created` DATETIME DEFAULT NULL,
  `modified` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_bin