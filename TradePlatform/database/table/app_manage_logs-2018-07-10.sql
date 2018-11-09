CREATE TABLE `app_manage_logs` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `argsContent` LONGTEXT COLLATE utf8_bin COMMENT "请求内容",
  `className` VARCHAR(255) COLLATE utf8_bin DEFAULT NULL COMMENT "类名",
   systemTime  DATETIME DEFAULT NULL COMMENT "系统时间",
  `created` DATETIME DEFAULT NULL COMMENT "创建时间",
  `ip` VARCHAR(255) COLLATE utf8_bin DEFAULT NULL  COMMENT "IP",
  `methodCnName` VARCHAR(255) COLLATE utf8_bin DEFAULT NULL,
  `methodFullName` VARCHAR(255) COLLATE utf8_bin DEFAULT NULL,
  `methodName` VARCHAR(255) COLLATE utf8_bin DEFAULT NULL COMMENT "方法名",
  `returnValue` LONGTEXT COLLATE utf8_bin COMMENT "返回内容",
  `userName` VARCHAR(255) COLLATE utf8_bin DEFAULT NULL COMMENT "用户名",
  `modified` DATETIME DEFAULT NULL,
  `saasId` VARCHAR(255) COLLATE utf8_bin DEFAULT NULL,
  `trueName` VARCHAR(50) COLLATE utf8_bin DEFAULT NULL,
   remark VARCHAR(255) COLLATE utf8_bin DEFAULT NULL COMMENT "备注",
   requestUrl VARCHAR(255) COLLATE utf8_bin DEFAULT NULL COMMENT "请求地址",
   appName    VARCHAR(255) COLLATE utf8_bin DEFAULT NULL COMMENT "应用", 
  PRIMARY KEY (`id`),
  INDEX (created)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_bin
