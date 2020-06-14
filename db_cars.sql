/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50626
 Source Host           : localhost:3306
 Source Schema         : db_cars

 Target Server Type    : MySQL
 Target Server Version : 50626
 File Encoding         : 65001

 Date: 21/05/2020 12:16:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_car
-- ----------------------------
DROP TABLE IF EXISTS `t_car`;
CREATE TABLE `t_car`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '名称',
  `carNum` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '车牌号',
  `carSignTime` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '登记日期',
  `carStatus` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0' COMMENT '0正常使用，1已报废',
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_car
-- ----------------------------
INSERT INTO `t_car` VALUES (1, '大奔001', '0', '2020-05-15', '0', '2020-05-15 01:06:37', '2020-05-18 23:50:07');
INSERT INTO `t_car` VALUES (2, '大众速腾', '沪C00002', '2020-05-16', '2', '2020-05-17 00:18:10', '2020-05-17 00:26:38');
INSERT INTO `t_car` VALUES (3, '宝马001', '京B00002', '2020-05-19', '0', '2020-05-19 00:02:08', '2020-05-19 00:05:05');
INSERT INTO `t_car` VALUES (4, '金杯GL', '津A00001', '2020-05-19', '2', '2020-05-19 00:20:08', '2020-05-21 12:13:17');

-- ----------------------------
-- Table structure for t_car_task
-- ----------------------------
DROP TABLE IF EXISTS `t_car_task`;
CREATE TABLE `t_car_task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` int(11) DEFAULT NULL,
  `carName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `carNum` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `startStationId` int(11) DEFAULT NULL,
  `startStationName` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `endStationId` int(11) DEFAULT NULL,
  `endStationName` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `taskDate` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `realName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `taskStatus` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '2' COMMENT '2执行任务中，0已完成',
  `totalDistance` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_car_task
-- ----------------------------
INSERT INTO `t_car_task` VALUES (4, 4, '金杯GL', '津A00001', 1, '淄博', 6, '济宁', '2020-05-22', 2, 'Test01', '2', '291', '2020-05-21 12:13:17', '2020-05-21 12:13:17');

-- ----------------------------
-- Table structure for t_road_line
-- ----------------------------
DROP TABLE IF EXISTS `t_road_line`;
CREATE TABLE `t_road_line`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lineName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `lineColor` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `stationId` int(11) DEFAULT NULL,
  `nextStationId` int(11) DEFAULT -1 COMMENT '-1终点站，没有下一站',
  `preStationId` int(11) DEFAULT -1 COMMENT '-1起点站，没有上一站',
  `stationIndex` bigint(20) DEFAULT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_road_line
-- ----------------------------
INSERT INTO `t_road_line` VALUES (1, '淄博环线', '#999999', 1, 3, -1, 1, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (2, '淄博环线', '#999999', 3, 7, 1, 2, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (3, '淄博环线', '#999999', 7, 8, 3, 3, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (4, '淄博环线', '#999999', 8, 9, 7, 4, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (5, '淄博环线', '#999999', 9, 6, 8, 5, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (6, '淄博环线', '#999999', 6, 5, 9, 6, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (7, '淄博环线', '#999999', 5, 10, 6, 7, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (8, '淄博环线', '#999999', 10, 13, 5, 8, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (9, '淄博环线', '#999999', 13, 14, 10, 9, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (10, '淄博环线', '#999999', 14, 16, 13, 10, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (11, '淄博环线', '#999999', 16, 15, 14, 11, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (12, '淄博环线', '#999999', 15, 12, 16, 12, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (13, '淄博环线', '#999999', 12, 11, 15, 13, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (14, '淄博环线', '#999999', 11, 1, 12, 14, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (15, '淄博环线', '#999999', 1, -1, 11, 15, '2020-05-21 00:02:00', '2020-05-21 00:02:00');
INSERT INTO `t_road_line` VALUES (16, '淄博-济南-德州', '#999999', 1, 2, -1, 1, '2020-05-21 00:03:00', '2020-05-21 00:03:00');
INSERT INTO `t_road_line` VALUES (17, '淄博-济南-德州', '#999999', 2, 7, 1, 2, '2020-05-21 00:03:00', '2020-05-21 00:03:00');
INSERT INTO `t_road_line` VALUES (18, '淄博-济南-德州', '#999999', 7, -1, 2, 3, '2020-05-21 00:03:00', '2020-05-21 00:03:00');
INSERT INTO `t_road_line` VALUES (19, '济南-泰安-济宁', '#999999', 2, 4, -1, 1, '2020-05-21 00:03:55', '2020-05-21 00:03:55');
INSERT INTO `t_road_line` VALUES (20, '济南-泰安-济宁', '#999999', 4, 6, 2, 2, '2020-05-21 00:03:55', '2020-05-21 00:03:55');
INSERT INTO `t_road_line` VALUES (21, '济南-泰安-济宁', '#999999', 6, -1, 4, 3, '2020-05-21 00:03:55', '2020-05-21 00:03:55');
INSERT INTO `t_road_line` VALUES (22, '济南-临沂', '#999999', 2, 10, -1, 1, '2020-05-21 00:05:13', '2020-05-21 00:05:13');
INSERT INTO `t_road_line` VALUES (23, '济南-临沂', '#999999', 10, -1, 2, 2, '2020-05-21 00:05:13', '2020-05-21 00:05:13');
INSERT INTO `t_road_line` VALUES (24, '青岛-潍坊', '#999999', 14, 12, -1, 1, '2020-05-21 00:05:34', '2020-05-21 00:05:34');
INSERT INTO `t_road_line` VALUES (25, '青岛-潍坊', '#999999', 12, -1, 14, 2, '2020-05-21 00:05:34', '2020-05-21 00:05:34');

-- ----------------------------
-- Table structure for t_station
-- ----------------------------
DROP TABLE IF EXISTS `t_station`;
CREATE TABLE `t_station`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_station
-- ----------------------------
INSERT INTO `t_station` VALUES (1, '淄博', 270, 150, '2020-05-20 23:21:02', '2020-05-20 23:50:52');
INSERT INTO `t_station` VALUES (2, '济南', 200, 190, '2020-05-20 23:21:31', '2020-05-20 23:51:28');
INSERT INTO `t_station` VALUES (3, '滨州', 260, 100, '2020-05-20 23:22:14', '2020-05-20 23:50:56');
INSERT INTO `t_station` VALUES (4, '泰安', 190, 250, '2020-05-20 23:23:57', '2020-05-20 23:51:38');
INSERT INTO `t_station` VALUES (5, '枣庄', 220, 550, '2020-05-20 23:24:35', '2020-05-20 23:52:12');
INSERT INTO `t_station` VALUES (6, '济宁', 170, 400, '2020-05-20 23:25:36', '2020-05-20 23:52:33');
INSERT INTO `t_station` VALUES (7, '德州', 120, 80, '2020-05-20 23:26:16', '2020-05-20 23:37:08');
INSERT INTO `t_station` VALUES (8, '聊城', 70, 210, '2020-05-20 23:27:11', '2020-05-20 23:40:23');
INSERT INTO `t_station` VALUES (9, '菏泽', 30, 450, '2020-05-20 23:27:50', '2020-05-20 23:41:27');
INSERT INTO `t_station` VALUES (10, '临沂', 300, 500, '2020-05-20 23:28:46', '2020-05-20 23:49:26');
INSERT INTO `t_station` VALUES (11, '东营', 340, 80, '2020-05-20 23:29:45', '2020-05-20 23:46:58');
INSERT INTO `t_station` VALUES (12, '潍坊', 370, 170, '2020-05-20 23:30:33', '2020-05-20 23:46:20');
INSERT INTO `t_station` VALUES (13, '日照', 400, 400, '2020-05-20 23:31:36', '2020-05-20 23:46:01');
INSERT INTO `t_station` VALUES (14, '青岛', 500, 250, '2020-05-20 23:31:50', '2020-05-20 23:50:16');
INSERT INTO `t_station` VALUES (15, '烟台', 520, 50, '2020-05-20 23:32:17', '2020-05-20 23:34:27');
INSERT INTO `t_station` VALUES (16, '威海', 550, 40, '2020-05-20 23:32:52', '2020-05-20 23:34:41');

-- ----------------------------
-- Table structure for t_token
-- ----------------------------
DROP TABLE IF EXISTS `t_token`;
CREATE TABLE `t_token`  (
  `userId` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updateTime` bigint(20) DEFAULT 0,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_token
-- ----------------------------
INSERT INTO `t_token` VALUES ('1', 'null91f155247d1e4356a88f3f4d70ee5f5a', 1590034405523);
INSERT INTO `t_token` VALUES ('2', 'nulla5aafad5ca5e4c2b90f9e85a5347a1d7', 1590034312709);

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `realName` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pwd` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `idCard` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userIdentify` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `userNum` int(11) DEFAULT NULL,
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `address` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`userId`) USING BTREE,
  UNIQUE INDEX `t_user_userName_uindex`(`userName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES (1, 'admin', '超管', '13000000002', '123456', NULL, '0', NULL, '0', NULL, '2020-05-17 00:49:01', '2020-05-17 00:49:01');
INSERT INTO `t_user` VALUES (2, 'Test01', 'Test01', '15000000001', '123456', NULL, '2', NULL, '0', NULL, '2020-05-18 23:45:21', '2020-05-18 23:45:21');
INSERT INTO `t_user` VALUES (3, 'Test02', 'Test02', '15000000002', '123456', NULL, '1', NULL, '0', NULL, '2020-05-19 00:01:29', '2020-05-19 00:01:29');
INSERT INTO `t_user` VALUES (4, 'Test03', 'Test03', '15000000003', '123456', NULL, '1', NULL, '0', NULL, '2020-05-19 00:18:03', '2020-05-19 00:18:03');

SET FOREIGN_KEY_CHECKS = 1;
