CREATE TABLE `c2c_config` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `minCount` DECIMAL(20,10) DEFAULT NULL,
  `maxCount` DECIMAL(20,10) DEFAULT NULL,
  attribute1  VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL,
  attribute2  VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL,
  attribute3  VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL,
  attribute4  VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL,
  attribute5  VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL,
  `saasId` VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL,
  `created` DATETIME DEFAULT NULL,
  `modified` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_bin