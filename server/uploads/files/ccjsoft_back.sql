/*
SQLyog Ultimate v12.08 (32 bit)
MySQL - 5.1.73-community : Database - ccsoft
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ccsoft` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `ccsoft`;

/*Table structure for table `zh_article` */

DROP TABLE IF EXISTS `zh_article`;

CREATE TABLE `zh_article` (
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

/*Data for the table `zh_article` */

/*Table structure for table `zh_classify` */

DROP TABLE IF EXISTS `zh_classify`;

CREATE TABLE `zh_classify` (
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `zh_classify` */

/*Table structure for table `zh_content` */

DROP TABLE IF EXISTS `zh_content`;

CREATE TABLE `zh_content` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL COMMENT '文章内容',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `zh_content` */

/*Table structure for table `zh_site_access` */

DROP TABLE IF EXISTS `zh_site_access`;

CREATE TABLE `zh_site_access` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_group_id` int(11) unsigned NOT NULL COMMENT '外键-用户组id',
  `site_nav_mark` varchar(20) NOT NULL COMMENT '外键-系统分类标识',
  `access` tinyint(1) unsigned NOT NULL COMMENT '权限',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '数据是否有效',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `zh_site_access` */

insert  into `zh_site_access`(`id`,`user_group_id`,`site_nav_mark`,`access`,`add_time`,`last_time`,`disable`) values (1,1,'sysinfo',1,'20161217101010','20161217101010',1),(2,1,'globalconf',1,'20161217101010','20161217101010',1),(3,1,'dbcopy',1,'20161217101010','20161217101010',1),(4,1,'dbrestore',1,'20161217101010','20161217101010',1),(5,1,'addgroup',1,'20161217101010','20161217101010',1),(6,1,'editgroup',1,'20161217101010','20161217101010',1),(7,1,'adduser',1,'20161217101010','20161217101010',1),(8,1,'edituser',1,'20161217101010','20161217101010',1),(9,1,'addclassify',1,'20161217101010','20161217101010',1),(10,1,'editclassify',1,'20161217101010','20161217101010',1),(11,1,'addarticle',1,'20161217101010','20161217101010',1),(12,1,'editarticle',1,'20161217101010','20161217101010',1),(13,1,'addnav',1,'20161217101010','20161217101010',1),(14,1,'editnav',1,'20161217101010','20161217101010',1);

/*Table structure for table `zh_site_config` */

DROP TABLE IF EXISTS `zh_site_config`;

CREATE TABLE `zh_site_config` (
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

/*Data for the table `zh_site_config` */

insert  into `zh_site_config`(`id`,`title`,`keywords`,`description`,`copy`,`address`,`phone`,`email`,`records`,`add_time`,`last_time`,`disable`) values (1,'qwe1','qwe','qwe','qwe','qwe','110',NULL,'qwe','20161212101010','20170830045740',1);

/*Table structure for table `zh_site_nav` */

DROP TABLE IF EXISTS `zh_site_nav`;

CREATE TABLE `zh_site_nav` (
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

/*Data for the table `zh_site_nav` */

insert  into `zh_site_nav`(`id`,`pid`,`depth`,`name`,`link`,`mark`,`add_time`,`last_time`,`order_list`,`disable`) values (1,0,'0','系统配置','','','20161212101010','20170703060509',1,1),(2,1,'0-1','系统信息','#!/sysinfo','sysinfo','20161212101010','20161212101010',0,1),(3,1,'0-1','全局配置','#!/globalconf','globalconf','20161212101010','20161212101010',0,1),(4,0,'0','数据库管理','','','20161212101010','20161212101010',2,1),(5,4,'0-4','数据库备份','#!/dbcopy','dbcopy','20161212101010','20161212101010',0,1),(6,4,'0-4','数据库还原','#!/dbrestore','dbrestore','20161212101010','20161212101010',0,1),(7,0,'0','用户组管理','','','20161212101010','20161212101010',3,1),(8,7,'0-7','添加用户组','#!/addgroup','addgroup','20161212101010','20161212101010',0,1),(9,7,'0-7','编辑用户组','#!/editgroup','editgroup','20161212101010','20161212101010',0,1),(10,0,'0','用户管理','','','20161212101010','20161212101010',4,1),(11,10,'0-10','添加用户','#!/adduser','adduser','20161212101010','20161212101010',0,1),(12,10,'0-10','编辑用户','#!/edituser','edituser','20161212101010','20161212101010',0,1),(13,0,'0','分类管理','','','20161212101010','20161212101010',5,1),(14,13,'0-13','添加分类','#!/addclassify','addclassify','20161212101010','20161212101010',0,1),(15,13,'0-13','编辑分类','#!/editclassify','editclassify','20161212101010','20161212101010',0,1),(16,0,'0','文章管理','','','20161212101010','20161212101010',6,1),(17,16,'0-16','添加文章','#!/addarticle','addarticle','20161212101010','20161212101010',0,1),(18,16,'0-16','编辑文章','#!/editarticle','editarticle','20161212101010','20161212101010',0,1),(19,0,'0','建站管理','','','20161212101010','20170703063428',99,1),(20,19,'0-19','添加导航','#!/addnav','addnav','20161212101010','20161212101010',0,1),(21,19,'0-19','编辑导航','#!/editnav','editnav','20161212101010','20161212101010',0,1);

/*Table structure for table `zh_user` */

DROP TABLE IF EXISTS `zh_user`;

CREATE TABLE `zh_user` (
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

/*Data for the table `zh_user` */

insert  into `zh_user`(`id`,`username`,`password`,`email`,`add_time`,`last_sign_time`,`disable`,`user_group_id`) values (1,'qwe','76d80224611fc919a5d54f0ff9fba446','qwe@163.com','20161212101010','20171109125058',1,1);

/*Table structure for table `zh_user_group` */

DROP TABLE IF EXISTS `zh_user_group`;

CREATE TABLE `zh_user_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL COMMENT '用户组名称',
  `description` varchar(200) DEFAULT NULL COMMENT '用户组描述',
  `add_time` varchar(20) NOT NULL COMMENT '创建时间',
  `last_time` varchar(20) NOT NULL COMMENT '最后修改时间',
  `disable` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '数据有效标识',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

/*Data for the table `zh_user_group` */

insert  into `zh_user_group`(`id`,`name`,`description`,`add_time`,`last_time`,`disable`) values (1,'超级管理员','超级管理员','20161212101010','20170919010239',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
