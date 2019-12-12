---
title: Nginx的安装
tags: 
 - Nginx
categories: frontEnd
---

### Nginx的安装
**安装步骤**  
1. 使用远程连接工具连接linux操作系统
2. 安装pcre依赖
   * 把安装压缩文件放到linux系统中
   * 解压压缩文件
   * 进入解压之后目录，执行./configure
   * 使用make && make install
   * 安装之后，使用命令，查看版本号 pcre-config -version
3. 安装其它的依赖
   * yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel
4. 安装nginx
   * 把linux的安装文件放到linux系统中
   * 解压压缩文件
   * 进入解压之后目录，执行./configure
   * 使用make && make install
   * 安装成功之后，会在usr多出一个文件夹local/ngnix，在ngnix有sbin启动脚本
          
