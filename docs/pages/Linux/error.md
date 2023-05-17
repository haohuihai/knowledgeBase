# /bin/sh^M: bad interpreter: No such file or directory

/bin/sh^M: bad interpreter: No such file or directory在Linux中执行.sh脚本，异常/bin/sh^M: bad interpreter: No such file or directory。 

分析：这是不同系统编码格式引起的：在windows系统中编辑的.sh文件可能有不可见字符，所以在Linux系统下执行会报以上异常信息。 
解决：
1）在windows下转换： 
    利用一些编辑器如UltraEdit或EditPlus等工具先将脚本编码转换，再放到Linux中执行。转换方式如下（UltraEdit）：File-->Conversions-->DOS->UNIX即可。 
2）也可在Linux中转换： 

首先要确保文件有可执行权限 
#sh>chmod a+x filename 

然后修改文件格式 
#sh>vi filename 

利用如下命令查看文件格式 
:set ff 或 :set fileformat 

可以看到如下信息 
fileformat=dos 或 fileformat=unix 

利用如下命令修改文件格式 
:set ff=unix 或 :set fileformat=unix 

:wq (存盘退出) 

最后再执行文件 
#sh>./filename 

![image-20230404163523962](./images/image-20230404163523962.png)

1、启动FirewallD服务命令：

systemctl start firewalld.service #开启服务
systemctl enable firewalld.service #设置开机启动
2、查看FirewallD防火墙状态：

systemctl status firewalld
3、现在防火墙 FirewallD 就已经正常运行了



![image-20230404163723850](./images/image-20230404163723850.png) 

想知道更多FirewallD知识请参考：https://www.fujieace.com/firewalld/

![image-20230404163752439](./images/image-20230404163752439.png)



![image-20230404163817342](./images/image-20230404163817342.png) 





# [Linux 指令篇](https://blog.csdn.net/hu1656/article/details/106086041)