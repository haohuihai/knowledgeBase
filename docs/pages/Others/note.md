# windows删除文件时提示 操作无法完成

打开任务管理器，依次点击打开：性能 - 打开资源监视器- CPU, 关联的句柄 里输入部分/全部 文件名，搜索完就可在下面的搜索结果。

![image-20230104154427084](./images/image-20230104154427084.png) 

![image-20230104154522373](./images/image-20230104154522373.png) 

将关联的句柄名称 右击结束进程    就可以删除文件了

# windows查看端口号

```
  # 查看端口的使用情况
  netstat -aon|findstr 8080
  #根据端口对应的pid删除端口的进场
  taskkill /T /F /PID 12484
```

VS code

VSCode 同时选中多个相同字符 编辑Ctrl+D,Ctrl+Shift+L

### Windows10 安装Ubuntu子系统，解决从应用商店下载慢的问题。

https://blog.csdn.net/pujiaolin/article/details/73557219

### WIN10 微软商店下载不了ubuntu
https://github.dev/haohuihai/knowledgebase

### Windows10 启动WSL2 并安装Ubuntu遇到的一系列问题

https://blog.csdn.net/Daizy_Fantasy/article/details/125209422

### 解决新手在安装WSL2的Ubuntu时报错：【WslRegisterDistribution failed with error: 0x800701bc】
https://blog.csdn.net/x777777x/article/details/135045919

### 安装windows自带WSL虚拟机以及宝塔安装（win10或者10以上的才可以）
https://blog.csdn.net/qq_44678350/article/details/126365705

### 启动Docker服务后显示Docker Engine stopped
https://blog.csdn.net/weixin_43576565/article/details/134044435

### 安装错误

https://wenku.csdn.net/answer/4xfmwddhc8


### docker下载出现异常Error response from daemon: dial tcp: lookup index.docker.io: no such host
https://blog.csdn.net/qq_43750656/article/details/109585263

https://blog.csdn.net/qq_42807952/article/details/132339617

https://blog.csdn.net/xiaoyaozizai1/article/details/130949261

## CentOS 7 系统同步时间的2种方法

https://www.wervps1.com/we/21808.html
https://blog.csdn.net/Da_zhenzai/article/details/130509457

设置时区和时间
https://cloud.tencent.com/developer/article/1795159?areaSource=102001.14&traceId=UdJpk_pVtnUsfRJrW1G9d


### 安装docker和卸载docker

https://blog.csdn.net/FOREVERHOPE_WBZ/article/details/128430127
笔记 Docker安装(一)


### webrtc

https://zego.csdn.net/6425587d2bcaa918ade99a58.html

window安装ubuntn
s