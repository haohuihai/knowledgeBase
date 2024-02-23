**clear** ：清除屏幕

**echo 'test content'**：往控制台输出信息 **echo 'test content' > test.txt**

**ll** ：将当前目录下的 子文件&子目录平铺在控制台

**find** **目录名**： 将对应目录下的子孙文件&子孙目录平铺在控制台

**find** **目录名** **-type f** ：将对应目录下的文件平铺在控制台

**rm** **文件名 ：** 删除文件

**mv** **源文件 重命名文件**: 重命名

**cat** **文件的** **url :** 查看对应文件的内容

删除目录

https://baijiahao.baidu.com/s?id=1726925779817385200&wfr=spider&for=pc

**vim** **文件的** url(在英文模式下)

 按 i 进插入模式 进行文件的编辑 

按 esc 键&按:键 进行命令的执行

 q! 强制退出（不保存）

 wq 保存退出

 set nu 设置行号

## 查找软件的安装：

方法一：使用which命令： `which Redis` 命令。

方法二：使用whereis命令:  输入 `whereis Redis` 命令。

方法三：使用find命令：输入 `find / -name redis `命令


**redis相关命令**

```shell
redis-server -v #查看redis版本
redis-server --version #查看redis版本
ps aux | grep redis #查看redi是否在运行
netstat -lntp #查看redi是否在运行
redis-server /etc/redis.conf #启动redis服务
/usr/bin/redis-cli shutdown #关闭redis服务
```

**查看当地时间**

```shell
timedatectl
```



## 防火墙

我们部署在服务器上的应用后，linux防火墙未向外界暴露端口，外界是无法访问的，只能在服务器内部访问

防火墙的基本操作

```shell

systemctl status firewalld  # 查看防火墙状态 

systemctl start firewalld   # 开启防火墙 

systemctl stop firewalld  # 关闭防火墙 

```

查询指定端口是否已经开启

```shell
firewall-cmd --query-port=8091/tcp
```

查看开放端口列表

```shell
firewall-cmd --list-ports
```

2、查看防火墙状态


若遇到无法开启
先用：systemctl unmask firewalld.service
然后：systemctl start firewalld.service

3、设置对外端口

添加指定需要开放的端口：

```shell
firewall-cmd --add-port=8091/tcp --permanent
```

重载入添加的端口：

```shell
firewall-cmd --reload
```

查询指定端口是否开启成功：

```shell
firewall-cmd --query-port=8091/tcp
```


 iptables -L -n  查看开放端口列表

```shell
firewall-cmd --permanent --zone=public --add-port=8080/tcp
firewall-cmd --permanent --zone=public --list-ports
firewall-cmd --permanent --zone=public --add-port=80/tcp
firewall-cmd --permanent --zone=public --list-ports

firewall-cmd --reload
```

## Linux备份数据库

**1.首先确定备份脚本放置位置**

个人放置在  /usr/local/backup文件下，取名文件   bkDatabase.sh

**2.编写shell脚本**

```
# 需要注意几点``# 
1. -password 如果密码出现括号或下划线请将password用双引号引用起来``# 
2. 该脚本是将数据库course1进行备份，并进行压缩处理``# 
3. 备份后的文件名称叫course，并附带时间戳

备份脚本

``mysqldump ``-uroot` `-ppassword` `course1 | gzip > /usr/local/backup/course_$(date +%Y``%``m``%``d_``%``H``%``M``%``S).sql.gz
```


在命令行使用上述命令进行备份，若产生下列错误：

[root@iZuf66r5u8vbc2wq1gglc8Z ~]# mysqldump -ublog -proot blog | gzip > /root/blog2024116.sql.gz
Warning: Using a password on the command line interface can be insecure.
mysqldump: Error: 'Access denied; you need (at least one of) the PROCESS privilege(s) for this operation' when trying to dump tablespaces


则需要修改权限：

**在centos中用root账号登录mysq**

[root@localhost backup]# mysql -uroot -p
输入密码

然后执行命令

mysql> GRANT PROCESS ON *.* TO 'demo'@'localhost';
这个demo要换成你自己的登录数据库账号

然后刷新数据库即可

mysql> flush privileges;
全部执行过程：
```shell


[root@localhost backup]# mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 61
Server version: 8.0.24 Source distribution
 
Copyright (c) 2000, 2021, Oracle and/or its affiliates.
 
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
 
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
 
mysql> GRANT PROCESS ON *.* TO 'demo'@'localhost';
Query OK, 0 rows affected (0.01 sec)
 
mysql> flush privileges;
Query OK, 0 rows affected (0.01 sec)
 
mysql> exit
Bye
[root@localhost backup]# sh ./mysql_backup.sh
开始导出数据库...
导出成功，文件名为: /data/backup/mysql/2021-10-06_003815.sql.gz
[root@localhost backup]# 
这种方式是用户本机访问的
```

**另一个方法是用户全局访问的 命令把localhost改为%**

mysql> GRANT PROCESS ON *.* TO 'demo'@'%';
同样demo改为你自己的mysql登录账号 执行完毕 再执行上面刷新数据库的命令即可



**3.给bash增加权限**

bkDatabase.sh 备份数据库的脚本文件
```
chmod u+x bkDatabase.sh
```

**4.测试看看脚本是否是正确可执行的**

```
./bkDatabase.sh
```

**5.打开定时任务**

```
# 第一次设置定时任务可能回让你输入编辑定时任务的vim，选择basic就可以``crontab ``-e
```


**6.编辑内容**

我这儿有三个定时任务 如图：

![image-20230627172332421](./images/image-20230627172332421.png) 

其中第二个

```
# 表示每分钟执行一次，执行的脚本为/usr/local/backup/bkDatabase.sh``
*/1 * * * * /usr/local/backup/bkDatabase.sh
```

编辑完之后，如果有提示是否确认修改，表明编辑的定时任务有问题，需要修改；

**7.查看定时任务 crontab -l**

可以看到是否添加成功（如图）

![image-20230627172234358](./images/image-20230627172234358.png) 

在备份目录中查看是否成功

**8.踩坑**

有些定时任务是关闭的，使用命令查看`crond`是否正常`service` `crond status`

![image-20230627172217441](./images/image-20230627172217441.png) 

若正常不用管，若未启动，则重启一次。


定时任务操作命令

针对不同的linux版本，发行版有这个service， 

```
# 重启服务命令： [root@centos6 /] service crond restart
# 启动服务命令：[root@centos6 /] service crond start  
# 停止服务命令：[root@centos6 /] service crond stop
```

发行版没有这个service

```
停止服务：[root@centos6 /]``# /etc/init.d/cron stop``启动服务：[root@centos6 /]``# /etc/init.d/cron start
```

**服务器数据实现还原**

这儿踩坑太多，注意解压gz文件方式！！！

**1. 首先对定时任务备份的数据进行解压**

注意，是对上面产生的course_20190511_214326.sql.gz进行解压

```
# 将gz文件进行解压，产生course_20190511_214326.sql文件


`gunzip course_20190511_214326.sql.gz`

```

**2.接着将数据导入到database中**

如果目标服务器没有你要的database，你需要create database 目标数据库；

```
# 将备份文件sql通过 < 符号送入到course表中 mysql -u root -p表示实用mysql数据库

``mysql ``-u` `root ``-p` `course < course_20190511_214326.sql

```

接着会提示Enter Password，输入mysql密码即可实现导入

| 以上就是备份数据库和导入数据库的命令，下面看详细的sh脚本




```shell
#!/bin/bash
 
#备份目录
BACKUP=/home/mysqlBackup/db_name
#获取当前时间
DATATIME=$(date +'%Y-%m-%d_%H%M%S')
#打印时间
echo $DATATIME
#数据库地址
HOST=localhost
#数据库用户名
DB_USER=root
#数据库密码
DB_PW=123456
#备份数据库名
DATABASE=db_name

#创建备份目录，如果不存在就创建
[ ! -d "${BACKUP}/${DATATIME}/${DATATIME}" ] && mkdir -p "${BACKUP}/${DATATIME}"

#备份数据库
mysqldump -u${DB_USER} -p${DB_PW}  --host=${HOST} -q -R --databases ${DATABASE} | gzip > ${BACKUP}/${DATETIME}/$DATABASE.sql.gz
# 备份表结构
mysqldump -u${DB_USER} -p${DB_PW}  --host=${HOST} -q -d -R --databases ${DATABASE} | gzip > ${BACKUP}/${DATETIME}/$DATABASE.sql.gz
#将文件处理成tar.gz
cd ${BACKUP}
tar -zcvf $DATABASE.tar.gz ${DATATIME}
#备份完成后，删除对应的备份目录
rm -rf ${BACKUP}/${DATATIME}

#删除10天前的备份文件
find ${BACKUP} -atime +30 -name "+.tar.gz" -exec rm -rf {} \;
echo "备份数据库${DATABASE} 成功~"

```

导出内容（表结构等）

内容	        含义

databases	    在备份的时候先是会创建表的,也就是说备份了整个db_name的 如果不加–databses的话,表明只是备份db_name中的数据表,而在还原的时候不会在创建db_name这个数据库,只是还原hellodb中的数据表而已

-q	不缓冲查询，直接导出至标准输出
-d	只导出表结构，不含数据
–add-locks	导出过程中锁定表，完成后回解锁。-q：不缓冲查询，直接导出至标准输出

## 定时任务

每个用户有不同的备份文件的目录，默认是操作当前用户的定时任务

```shell
输入命令 crontab -e / 路径地址


1.用数值表示 时间信息
00 02 *  *  *  脚本文件

2.利用特殊符号表示时间信息
*     *    *   *    *       备份文件
/分钟 /小时 /天  /月  /周

=========================================

PS:定时任务最短执行的周期为 每分钟 
*/5         */ 6        */3         */1         */2
每隔5分钟  每隔6小时  每隔3日       每隔1月     每隔2周

=========================================

其它 写法：
01-05  02  * * *        每2日的01、02、03、04、05 执行一遍


指定不连续的时间范围：
00  14,20  *  *  *  *    每天14点，20点执行一次
```

## 查看linux登录日志：


linux 查看登录日志
在Linux中，可以使用以下方法来查看登录日志：

**方法一：使用last命令**

```shell
last
```
用户                    ip                  时间                
root     pts/0        223.166.94.145   Tue Jan 16 09:24   still logged in   
root     pts/1        223.166.94.145   Mon Jan 15 11:37 - 18:04  (06:27)    
root     pts/0        223.166.94.145   Mon Jan 15 11:35 - 18:04  (06:28)    
root     pts/0        101.86.41.177    Sat Jan 13 11:36 - 15:42  (04:05)    
root     pts/1        101.86.41.177    Fri Jan 12 21:15 - 10:02  (12:47)

该命令可以显示所有用户的登录历史记录，包括登录时间、登出时间、登录类型等信息。

pts是所谓的伪终端或虚拟终端，具体表现就是你打开一个终端，这个终端就叫pts/0，如果你再打开一个终端，这个新的终端就叫pts /1。
比如用who命令查询当前登录的用户，可以看到每个用户的TTY设备（简单来说就是用户输入命令还有显示信息的设备，比如终端），下面是我机器上的显示：
calabash tty7         2009-12-09 20:04 (:0)
calabash pts/0        2009-12-09 20:20 (:0.0)
calabash pts/1        2009-12-09 20:27 (:0.0) 
有一个tty7是表示图形界面，我当前登录的是GNOME，当然就是图形界面了。还有tty1-tty6表示文字界面，可以用Ctrl+Alt+F1-F6切换，+F7就是切换回图形界面。下面两行说明我当前打开了两个终端窗口，所以就有pts/0和pts/1

```shell
[root@iZuf66r5u8vbc2wq1gglc8Z backup]# who
root     pts/0        2024-01-16 09:24 (223.166.94.145)

```

**方法二：查看/var/log/wtmp文件**

`last -f /var/log/wtmp`

/var/log/wtmp文件记录了所有用户的登录和注销信息。使用该命令可以查看/var/log/wtmp文件的内容，获取登录日志信息。

**方法三：查看/var/log/auth.log文件**

`less /var/log/auth.log`
/var/log/auth.log文件记录了系统认证相关的日志，包括用户登录、sudo等操作。通过使用less命令，可以逐页查看该文件的内容，找到登录日志相关的信息。

**方法四：使用journalctl命令**

`journalctl _COMM=sudo --since "2022-01-01" --until "2022-01-10"`

该命令可以查询journalctl日志中sudo命令相关的信息，可以根据需要指定起始时间和结束时间来获取登录日志信息。

## 压缩和解压

Linux tar（英文全拼：tape archive ）命令用于备份文件。

tar 是用来建立，还原备份文件的工具程序，它可以加入，解开备份文件内的文件。

-c或--create 建立新的备份文件
-x或--extract或--get 从备份文件中还原文件。
-f <备份文件>或--file=<备份文件> 指定备份文件

压缩文件 非打包

```shell
# touch a.c       
# tar -czvf test.tar.gz a.c   //压缩 a.c文件为test.tar.gz
```
a.c

列出压缩文件内容

 `tar -tzvf test.tar.gz `
-rw-r--r-- root/root     0 2010-05-24 16:51:59 a.c
解压文件

`tar -xzvf test.tar.gz` 
a.c

排除目录中的某些文件，然后进行压缩。

命令格式如下：

tar --exclude=目录名/* 或者 文件名 -zcvf 备份文件名.tgz 目录名
具体举例：

**创建一个名为 abc 的目录**
mkdir abc

**进入 abc 这个目录**
cd abc

**创建两个文件,文件名为1.txt 2.txt**
touch 1.txt 2.txt

**切换到 abc 的父目录**
cd ..

**将文件 abc 进行压缩时，排除1.txt，压缩后的文件名为 abc.tar**
tar --exclude=abc/1.txt -zcvf abc.tgz abc

# 解压文件
tar -zxvf abc.tgz

**删除压缩文件**
rm abc.tgz

**删除解压后的文件，并删除文件夹**
rm -rf abc

#### gunzip

gunzip 是个使用广泛的解压缩程序，它用于解开被 gzip 压缩过的文件，这些压缩文件预设最后的扩展名为 .gz。事实上 gunzip 就是 gzip 的硬连接，因此不论是压缩或解压缩，都可通过 gzip 指令单独完成

gunzip 默认解压后会删除解压的文件

可以使用参数-k来解压缩文件并保留原始文件：

选项	说明
-a	使用ASCII文字模式
-c	把解压后的文件输出到标准输出设备
-f	强行解开压缩文件，不理会文件名称或硬连接是否存在以及该文件是否为符号连接
-h	在线帮助
-l	列出压缩文件的相关信息
-L	显示版本与版权信息
-n	解压缩时，若压缩文件内含有远来的文件名称及时间戳记，则将其忽略不予处理
-N	解压缩时，若压缩文件内含有原来的文件名称及时间戳记，则将其回存到解开的文件上
-q	不显示警告信息
-r	递归处理，将指定目录下的所有文件及子目录一并处理
-S <压缩字尾字符串>	更改压缩字尾字符串
-t	测试压缩文件是否正确无误
-v	显示指令执行过程
-V	显示版本信息

**使用tar 先进行压缩文件**

```shell
tar -czvf content.txt.gz content.txt
```


解压指定压缩包
**可以直接解压指定压缩包文件，不需要跟任何选项：**

```shell
# 语法
gunzip 压缩包名
# 示例
gunzip content.txt.gz

```

**同样使用 -v 选项可以查看命令的执行过程：**

```shell
# 语法
gunzip -v 压缩包名
# 示例
gunzip -v content.txt.gz

```

**查看压缩包内容**
使用 -l 选项就可以查看压缩包内容了：

```shell
# 语法
gunzip -l 压缩包名
# 示例
gunzip -l content.txt.gz

```
解压缩文件并将内容输出到标准输出：

```shell

gunzip -c content.txt.gz

```
这将解压缩 content.txt.gz 文件，并将解压缩后的内容输出到标准输出，而不是生成解压缩文件。


解压目录及其子目录所有的压缩包
如果要解压某个目录及其子目录下的所有文件的压缩包，则可以使用 -r 选项：

```shell
# 语法
gunzip -r 目录

# 示例

```

这将递归地解压缩指定目录 directory 下的所有以 gzip 格式压缩的文件。


需要注意的是，gunzip 命令只能解压缩 gzip 格式的文件，不能用于解压其他压缩格式，如 ZIP、RAR 等。如需解压其他格式的压缩文件，可以使用相应的工具，例如 unzip 命令用于解压缩 ZIP 文件。


## linux操作mysql


