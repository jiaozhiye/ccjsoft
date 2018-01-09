DROP TABLE IF EXISTS `zh_article`;
CREATE TABLE IF NOT EXISTS `zh_article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(5) unsigned NOT NULL COMMENT '从属分类ID',
  `title` varchar(100) NOT NULL COMMENT '文章标题',
  `description` varchar(200) DEFAULT NULL COMMENT '文章简介',
  `content_id` int(5) unsigned DEFAULT NULL COMMENT '内容ID',
  `attach_file` varchar(200) DEFAULT NULL COMMENT '附件路径',
  `path` varchar(100) DEFAULT NULL COMMENT '图片路径',
  `thumb_path` varchar(100) DEFAULT NULL COMMENT '缩略图路径',
  `author` int(5) unsigned DEFAULT NULL COMMENT '作者ID，用户名',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  `order_list` int(2) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '数据是否有效',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `zh_classify`;
CREATE TABLE IF NOT EXISTS `zh_classify` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '父类ID',
  `depth` varchar(20) NOT NULL DEFAULT '0' COMMENT '分类的深度',
  `title` varchar(20) NOT NULL COMMENT '分类名称',
  `description` varchar(100) DEFAULT NULL COMMENT '分类描述',
  `arc_pic_size` varchar(20) DEFAULT NULL COMMENT '分类下文章图片的尺寸',
  `path` varchar(100) DEFAULT NULL COMMENT '分类图片路径',
  `thumb_path` varchar(100) DEFAULT NULL COMMENT '分类缩略图路径',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  `order_list` int(2) unsigned NOT NULL DEFAULT '0' COMMENT '分类排序',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '数据是否有效',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `zh_content`;
CREATE TABLE IF NOT EXISTS `zh_content` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL COMMENT '文章内容',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `zh_site_access`;
CREATE TABLE IF NOT EXISTS `zh_site_access` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_group_id` int(11) unsigned NOT NULL COMMENT '外键-用户组id',
  `site_nav_mark` varchar(20) NOT NULL COMMENT '外键-系统分类标识',
  `access` tinyint(1) unsigned NOT NULL COMMENT '权限',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '数据是否有效',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `zh_site_config`;
CREATE TABLE IF NOT EXISTS `zh_site_config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL COMMENT '网站标题',
  `keywords` varchar(100) DEFAULT NULL COMMENT '网站关键字',
  `description` text COMMENT '网站描述',
  `copy` varchar(50) DEFAULT NULL COMMENT '版权所有',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `phone` varchar(20) DEFAULT NULL COMMENT '电话',
  `email` varchar(50) DEFAULT NULL COMMENT '电子邮箱',
  `records` varchar(50) DEFAULT NULL COMMENT '备案信息',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '数据有效标识',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `zh_site_nav`;
CREATE TABLE IF NOT EXISTS `zh_site_nav` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(5) unsigned NOT NULL COMMENT '从属父类id',
  `depth` varchar(10) NOT NULL COMMENT '分类结构',
  `name` varchar(20) NOT NULL COMMENT '分类名称',
  `link` varchar(20) DEFAULT NULL COMMENT '页面路由地址',
  `mark` varchar(20) DEFAULT NULL COMMENT '分类标识符',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  `order_list` int(5) unsigned NOT NULL DEFAULT '0' COMMENT '分类排序',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '数据是否有效',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `zh_user`;
CREATE TABLE IF NOT EXISTS `zh_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` char(32) NOT NULL COMMENT '密码',
  `email` varchar(60) NOT NULL COMMENT '邮箱',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_sign_time` varchar(20) NOT NULL COMMENT '最后一次登录时间',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '数据有效标识符',
  `user_group_id` int(11) unsigned NOT NULL COMMENT '外键-用户组id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `zh_user_group`;
CREATE TABLE IF NOT EXISTS `zh_user_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL COMMENT '用户组名称',
  `description` varchar(200) DEFAULT NULL COMMENT '用户组描述',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '数据有效标识',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;



INSERT INTO `zh_classify` (`id`,`pid`,`depth`,`title`,`description`,`arc_pic_size`,`path`,`thumb_path`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (1,0,'0','新闻资讯',NULL,'400*400','','','20171109010158','20171109010158',0,1);
INSERT INTO `zh_classify` (`id`,`pid`,`depth`,`title`,`description`,`arc_pic_size`,`path`,`thumb_path`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (2,0,'0','孵化产品',NULL,'400*400','','','20171109010341','20171109010341',0,1);
INSERT INTO `zh_classify` (`id`,`pid`,`depth`,`title`,`description`,`arc_pic_size`,`path`,`thumb_path`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (3,0,'0','师资力量',NULL,'400*400','','','20171109010429','20171109010429',0,1);
INSERT INTO `zh_classify` (`id`,`pid`,`depth`,`title`,`description`,`arc_pic_size`,`path`,`thumb_path`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (4,0,'0','优秀校友',NULL,'400*400','','','20171109010512','20171109010512',0,1);
INSERT INTO `zh_classify` (`id`,`pid`,`depth`,`title`,`description`,`arc_pic_size`,`path`,`thumb_path`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (5,0,'0','活动展示',NULL,'780*520','','','20171109010629','20171109010629',0,1);



INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (1,1,'sysinfo',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (2,1,'globalconf',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (3,1,'dbcopy',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (4,1,'dbrestore',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (5,1,'addgroup',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (6,1,'editgroup',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (7,1,'adduser',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (8,1,'edituser',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (9,1,'addclassify',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (10,1,'editclassify',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (11,1,'addarticle',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (12,1,'editarticle',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (13,1,'addnav',1,'20161217101010','20161217101010',1);
INSERT INTO `zh_site_access` (`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) VALUES (14,1,'editnav',1,'20161217101010','20161217101010',1);

INSERT INTO `zh_site_config` (`id`,`title`,`keywords`,`description`,`copy`,`address`,`phone`,`email`,`records`,`add_time`,`last_time`,`disable`) VALUES (1,'吉软国际','吉软国际','吉软国际','吉软国际 Copyright (c) 2013 All Rights Reserved V 1.8.','吉林省长春市卫星路星城国际B座1700','400-618-0431','ccjsoft@163.com','吉软国际','20161212101010','20171109010004',1);

INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (1,0,'0','系统配置','','','20161212101010','20170703060509',1,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (2,1,'0-1','系统信息','#!/sysinfo','sysinfo','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (3,1,'0-1','全局配置','#!/globalconf','globalconf','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (4,0,'0','数据库管理','','','20161212101010','20161212101010',2,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (5,4,'0-4','数据库备份','#!/dbcopy','dbcopy','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (6,4,'0-4','数据库还原','#!/dbrestore','dbrestore','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (7,0,'0','用户组管理','','','20161212101010','20161212101010',3,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (8,7,'0-7','添加用户组','#!/addgroup','addgroup','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (9,7,'0-7','编辑用户组','#!/editgroup','editgroup','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (10,0,'0','用户管理','','','20161212101010','20161212101010',4,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (11,10,'0-10','添加用户','#!/adduser','adduser','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (12,10,'0-10','编辑用户','#!/edituser','edituser','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (13,0,'0','分类管理','','','20161212101010','20161212101010',5,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (14,13,'0-13','添加分类','#!/addclassify','addclassify','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (15,13,'0-13','编辑分类','#!/editclassify','editclassify','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (16,0,'0','文章管理','','','20161212101010','20161212101010',6,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (17,16,'0-16','添加文章','#!/addarticle','addarticle','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (18,16,'0-16','编辑文章','#!/editarticle','editarticle','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (19,0,'0','建站管理','','','20161212101010','20170703063428',99,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (20,19,'0-19','添加导航','#!/addnav','addnav','20161212101010','20161212101010',0,1);
INSERT INTO `zh_site_nav` (`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) VALUES (21,19,'0-19','编辑导航','#!/editnav','editnav','20161212101010','20161212101010',0,1);

INSERT INTO `zh_user` (`id`,`username`,`password`,`email`,`add_time`,`last_sign_time`,`disable`,`user_group_id`) VALUES (1,'qwe','76d80224611fc919a5d54f0ff9fba446','qwe@163.com','20161212101010','20171109125058',1,1);

INSERT INTO `zh_user_group` (`id`,`name`,`description`,`add_time`,`last_time`,`disable`) VALUES (1,'超级管理员','超级管理员','20161212101010','20170919010239',1);