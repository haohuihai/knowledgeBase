# Linux安装docker

### cp -a

cp -a 保留原文件属性的前提下复制文件 

cp -r dirname（源文件） destdi（目标文件）

复制目录后其文件属性会发生变化
想要使得复制之后的目录和原目录完全一样包括文件权限，可以使用cp -a dirname destdir 

```shell
# 101.132.124.188:22 SSH-2.0-OpenSSH_7.4
101.132.124.188 ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDLit4lX9SEYNVhSFFBBo/3+rb2qxfDyGHpTkrbJz6sFDyWoB0fSfFiOVUnGe/h9LB5QffsLKdSGOdY82r41OOyWFyxxtUhuXCu1ZsgYiGLwKlPRrzICagyNC8HKU4auj5ALBeopmF6DBeMVp6e7mGDpPWFgiKLZtyO/oq5qwpyrbHw13UgfWbAAEpGW4OdgmaRUhjnWbeTXJLqHXybYnlPyWm1WsIXCDWzMyvefIL1DSAl3hVBgys1YgrIfU/KMoUEFet6wldysql9Kb0mvpU6WnmWi0l+j8iesEDdCWlKaxgIyxIxcx9cRPaoXADWUR6YdxYenqnFoHzQnDe2LzLD
# 101.132.124.188:22 SSH-2.0-OpenSSH_7.4
101.132.124.188 ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBIwUq1CsNFfLs3A34rDuQZO0YNTM3nLaUK4UZMnWRLOHRYmF0o1mjGii32AK3FbkuZcdfD7mXbJUhSE3W/H2J58=
# 101.132.124.188:22 SSH-2.0-OpenSSH_7.4
101.132.124.188 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKYxuxg/8WN2TEU4mD1NFQEjQiR3PjCMVminKp9tLtfe
```

安装软件：

\- run: sudo apt-get update && sudo apt-get install rsync && sudo apt-get install openssh-client

## linux服务器之间传输文件

https://blog.csdn.net/qq_43674360/article/details/126096275

https://blog.csdn.net/weixin_44256848/article/details/126466072

https://www.ydisp.cn/ement/75140.html

## Rsync远程同步

https://blog.csdn.net/weixin_71429839/article/details/127191015

## 给文件/文件夹增加权限

## rsync 错误 failed: Permission denied (13)

文件缺少权限，需要增加权限

```bash
chmod 755 /data/javaprefs
```

## 查看是否安装某个软件包

```shell
rpm -qa | grep "软件包名"
```

## rsync常见问题及解决办法

https://blog.csdn.net/qq_44786814/article/details/114849655

https://blog.csdn.net/qq_39577008/article/details/104826277





## ssh

查看是否安装ssh

```shell
ssh -V
```



检查ssh的状态

```shel
systemctl status sshd.service
```

检查ssh是否启动成功

```shell
ps -aux | grep ssh
```



ssh的位置

```shell
/etc/ssh
```

修改完配置重启ssh服务

```shell
service sshd restart
```



## 排查连接不上到linux的问题



circleci存的是密钥 

linux存的是公钥


## circleci在使用免密登录时的一些错误问题

### 使用私钥的情况下还输入密码问题

3个解决办法

1. 修改/etc/ssh/sshd_config文件

```shell
PasswordAuthentication no
```

2. 在登录时使用下面命令

```shell
ssh -o StrictHostKeyChecking=no user@ip
```

3. 有博客说修改的是：

在文件/etc/ssh/ssh_config(全局)或者~/.ssh/config(某用户)开头加入以下内容

StrictHostKeyChecking ask打开注释修改为StrictHostKeyChecking no即可



但是这样做好像没什么反应

4. 还有说是：

连接ssh的时候，带上GSSAPIAuthentication=no参数：

```javascript
ssh -o GSSAPIAuthentication=no root@ip
```

这样也可以避免需要二次确认连接。

只有通过1这种方法才可以

如果看登录的详细情况的话可以使用下面命令

```shell
ssh root@192.168.111.22 -vvv 
```

出现什么问题，然后在配置文件或命令行修改对应的参数即可



连接成功后的ssh_config的配置，下面的修改是部分修改，打开注释或修改值

```shell
RSAAuthentication yes
PasswordAuthentication no
GSSAPIAuthentication no
StrictHostKeyChecking no
UserKnownHostsFile /dev/null
```



## Linux操作系统如何使用SSH命令连接另外一台Linux服务器

https://www.cnblogs.com/hls-code/p/16158324.html

### windows终端通过密钥远程连接Linux服务器

## SSH密钥连接

sshd服务提供两种安全验证的方法：

- 基于口令的安全验证:经过验证帐号与密码即可登陆到远程主机。
- 基于密钥的安全验证:需要在服务端生成"密钥对"后将私钥传送至本地端，进行密钥的比较。

**创建密钥**

在服务器端的终端中执行命令 `ssh-keygen`，
出现提示时一直按Enter即可 ，会在将在 `~/.ssh/` 路径下生成公钥(id_rsa.pub)和私钥(id_rsa)

保证公钥在服务器端，私钥在本地端，就可以在本地端使用私钥进行免密登录服务器



---这个好像没用到

在服务器端执行以下命令，在服务器上安装公钥
`cat id_rsa.pub >> authorized_keys`

`chmod 600 *` 修改文件权限，只允许文件拥有者读写

**配置密钥**

使用 sz 或 scp等命令将私钥(id_rsa)文件下载到本地，并记下文件路径

找到本地用户目录下的.ssh文件夹，选中config-右键-打开方式-使用记事本打开

安装注释修改下面的内容，并复制到config文件中，注意 `//` 和之后的注释都要删去，然后保存

```text
Host tx    // 远程机器别名
HostName 192.*.*.*   // 远程机器IP地址/域名
Port 22   // 端口号，默认为22
User root   // 登录账号
IdentityFile path/id_rsa // 下载的私钥文件在本机的地址
```

**连接远程主机**

```shell
ssh tx
```

也可以通过以下命令手动选中密钥连接远程主机
`ssh -i path/id_rsa user_name@IP_address`





## 远程连接的方法

(publickey,gssapi-keyex,gssapi-with-mic,password).

## Win10自带的ssh客户端key权限设置

https://zhuanlan.zhihu.com/p/108445764#:~:text=Win10%E8%87%AA%E5%B8%A6%E7%9A%84ssh%E5%AE%A2%E6%88%B7%E7%AB%AFkey%E6%9D%83%E9%99%90%E8%AE%BE%E7%BD%AE%201%20%E5%AE%89%E8%A3%85%20%E6%89%93%E5%BC%80PowerShell%EF%BC%8C%E8%BE%93%E5%85%A5ssh%E4%B8%89%E4%B8%AA%E5%AD%97%E6%AF%8D%EF%BC%8C%E6%8C%89Enter%E3%80%82%20...%202%20%E5%8A%9F%E8%83%BD%20%E4%B8%8D%E5%A6%A8%E7%9C%8B%E4%B8%80%E4%B8%8BWin10%E6%8A%8A%E8%BF%99%E4%B8%AAssh%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%94%BE%E5%93%AA%E9%87%8C%E4%BA%86%E3%80%82,%E4%BF%AE%E6%94%B9key%E6%9D%83%E9%99%90%20%E5%AF%B9id_rsa%E6%96%87%E4%BB%B6%EF%BC%9A%E5%8F%B3%E5%87%BB-%E5%B1%9E%E6%80%A7-%E5%AE%89%E5%85%A8-%E9%AB%98%E7%BA%A7%E3%80%82%20...%205%20%E5%85%B6%E4%BB%96%20%E4%B8%80%E4%B8%AA%E9%9D%9E%E5%B8%B8%E6%9C%89%E7%94%A8%E7%9A%84%E4%B8%9C%E8%A5%BF%EF%BC%8C%E5%9C%A8PowerShell%E9%87%8C%E6%8C%89Ctrl%2BR%EF%BC%8C%E8%BE%93%E5%85%A5ssh%E5%AD%97%E6%A0%B7%EF%BC%8C%E7%84%B6%E5%90%8E%E4%B8%8D%E6%96%AD%E6%8C%89Ctrl%2BR%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%BE%80%E4%B8%8A%E7%BF%BB%E4%BB%A5%E5%89%8D%E8%BE%93%E8%BF%87%E7%9A%84%E5%B8%A6%27ssh%27%E5%AD%97%E6%A0%B7%E7%9A%84%E5%91%BD%E4%BB%A4%EF%BC%8C%E5%92%8CLinux%20Shell%E5%87%A0%E4%B9%8E%E4%B8%80%E6%A0%B7%EF%BC%8C%E9%9D%9E%E5%B8%B8%E6%96%B9%E4%BE%BF%E3%80%82%20

## 解决在windows，circleci连接服务器的办法

1. 进入控制台；找到服务器，创建一个密钥，之后会返回一个.pem的文件，而这个pem的文件就是服务器返回的私钥，我这里下载的名为test_login.pem

![image-20230204225752717](images/image-20230204225752717.png) 

2. 尝试windows登录服务，进入window的终端

```shell
ssh root@ip -i ./test_login.pem
```

![image-20230204230011703](images/image-20230204230011703.png) 

以上表示登录成功

3. 尝试使用circleci远程登录

```shell
- run: ssh root@ip -vvv
```

登录成功会有提示

![image-20230204232240055](images/image-20230204232240055.png) 

![image-20230204232327022](images/image-20230204232327022.png) 

使用ssh任然需要密码的问题

https://blog.csdn.net/qq_32239417/article/details/52774199

上面3步 -vvv表示我们在登录过程中可以显示登录信息；这在登录失败排查问题很有用

会返回一些debug开头的信息

主要展示的是使用的登录方式；成功会有成功的提示；失败也有失败的信息，

关于错误信息的详细信息：查看下面的链接

http://www.nndssk.com/xtwt/201718NT4CGZ.html

https://blog.csdn.net/weixin_29980355/article/details/116859080

网上给出使用window终端连接linux的方法

https://blog.csdn.net/tyustli/article/details/122222605

## 如果我们只想传输文件，但也要输入密码，可以在命令行加StrictHostKeyChecking=no

**这样就可以解决跳过第一次登录时确认的问题**

     ```shell
command: scp -vr  -o StrictHostKeyChecking=no /home/circleci/cloudspace/dist/* $SSH_USER@$SSH_IP:/www/wwwroot/testbuild/
     ```



## 阿里云远程连接linux服务器的方法

https://help.aliyun.com/document_detail/59083.html

## 通过密钥连接之后，在通过密码连会提示说服务器禁止了使用密码进行连接，要使用密钥进行连接，现在登录linux服务器就需要使用密钥进行登录了，密钥文件放在网上

## 出现Permission denied (publickey)的解决方法

https://blog.csdn.net/a1489540461/article/details/126751164

------------------------------

# [CircleCI 自动化部署](https://segmentfault.com/a/1190000021579837)

## 关于备份工具rsync，你不知道的事

https://developer.kingdee.com/article/387551352031207424?productLineId=29&isKnowledge=2

## [GitHub + circleCI 自动构建/自动部署 应用](https://www.cnblogs.com/liugx/p/10339010.html)

## CentOS 7 免密登录异常 -- we did not send a packet, disable method

https://blog.csdn.net/u010766726/article/details/108236397

## circleci 使用手册

https://haofly.net/circleci/



## window自带ssh软件，可以使用ssh登录远程服务器

where.is   软件名

## SCP的使用

![image-20230205074549790](images/image-20230205074549790.png) 

使用circleci自动部署前端是在circleci服务上构建好，然后通过将文件上传到服务器上的一种方法

gitlab私有库是在linux环境上进行构建的，可以通过镜像来操作，很耗内存，

说明以下项目的构建

cloudspace是大项目，构建的时候很大，将他放在circleci上面进行构建，他的后端代码也是放到circleci上面的



knowledge是通过github来访问的，也是通过circleci来构建，然后上传的github上面，这样做是因为很早测试了，然后没有改动



interview这个是静态的项目，还没确定放到什么地方上



光明公益小程序+后台+后端：放的地方不一致

chapt

```js
const http = require('http');

/**
 * @name:
 * @description: 封装了一下ChatGPT
 * @param {*} msg 发送的消息
 * @param {*} sessionToken 浏览器cookie拿到的令牌
 * @return {Promise}
 */
 const sendChatGPTMsg = async ({ msg, sessionToken }) => {
  const { promise, resolve, reject } = defer();
  const api = new ChatGPTAPI({
    sessionToken,
    markdown: false,
  });
  await api.ensureAuth().catch(reject); // 校验令牌
  api.sendMessage(msg).catch(reject).then(resolve);
  return promise;
};


/**
 * @name:
 * @description: promise扁平处理
 * @return {*}
 */
 const defer = () => {
  let resolve, reject;
  return {
    promise: new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    }),
    resolve,
    reject,
  };
};



http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //设置响应头解决跨域
    if (req.url !== "/sendMsg") return sendRes(res, "not find", 404);
    let _data = "";
    req.on("data", (d) => {
      _data += d;
    });
    req.on("end", () => {
      const data = JSON.parse(_data);
      sendChatGPTMsg(data)
        .then((r) => {
          res.writeHead(200, {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
          });
          console.log(r)
          res.write(r);
          res.end();
        })
    });
  })
  .listen(1024, () => {
    console.log("服务开启！");
  });
```

## 常用命令

查看端口：

```shell
netstat -ntulp | grep 3306
lsof -i:3306
```

杀死端口

```shell
kill -9 pid
```

进入容器

```shell
docker exec -it containerId /bin/bash
```

进入mysql

```mysql
mysql -h localhost -u root -p
```

推出mysql

```shell
mysql > quit
```

退出容器：

```shell
exit
```

删除镜像

```shell
docker rm containerId
```

查看是否运行的容器

```shell
docker ps
```

查看所有容器

```shell
docker ps -a
```

查看容器日志

```shell
docker logs imagename
```

```shell

```

# pm2常用指令

```js
$ pm2 start app.js # 启动app.js应用程序

$ pm2 start app.js -i 4        # cluster mode 模式启动4个app.js的应用实例

# 4个应用程序会自动进行负载均衡

$ pm2 start app.js --name="api" # 启动应用程序并命名为 "api"

$ pm2 start app.js --watch      # 当文件变化时自动重启应用

$ pm2 start script.sh          # 启动 bash 脚本

$ pm2 list                      # 列表 PM2 启动的所有的应用程序

$ pm2 monit                    # 显示每个应用程序的CPU和内存占用情况

$ pm2 show [app-name]          # 显示应用程序的所有信息

$ pm2 logs                      # 显示所有应用程序的日志

$ pm2 logs [app-name]          # 显示指定应用程序的日志

$ pm2 flush                       # 清空所有日志文件

$ pm2 stop all                  # 停止所有的应用程序

$ pm2 stop 0                    # 停止 id为 0的指定应用程序

$ pm2 restart all              # 重启所有应用

$ pm2 reload all                # 重启 cluster mode下的所有应用

$ pm2 gracefulReload all        # Graceful reload all apps in cluster mode

$ pm2 delete all                # 关闭并删除所有应用

$ pm2 delete 0                  # 删除指定应用 id 0

$ pm2 scale api 10              # 把名字叫api的应用扩展到10个实例

$ pm2 reset [app-name]          # 重置重启数量

$ pm2 startup                  # 创建开机自启动命令

$ pm2 save                      # 保存当前应用列表

$ pm2 resurrect                # 重新加载保存的应用列表

$ pm2 update                    # Save processes, kill PM2 and restore processes

$ pm2 generate                  # Generate a sample json configuration file
```



# nginx location

http://t.zoukankan.com/shijianchuzhenzhi-p-6873737.html

# 修改容器中的配置文件



docker 运行容器；

```
docker run --name nginx -p 80:80 -d nginx
```

```shell
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```



修改容器里面的文件，由于容器里面的文件无法修改该，通过拷贝的方式来替换掉原来的文件

进入容器：

```
docker exec -it nginx /bin/bash
```

将容器中 的文件拷贝到宿主机里面

```
docker cp nginx:/etc/nginx/conf.d/default.conf /home/
```

修改完将修改的文件拷贝到容器里面

```shell
docker cp /home/default.conf nginx:/etc/nginx/conf.d
```

重启容器：

```shell
docker restart nginx
```

# docker启动mysql时，有端口被占用，使用kill -9 pid杀不死的解决办法

彻底停止mysql：

```shell
sudo /etc/init.d/mysql stop
```

# docker容器之间访问端口需要使用ip代替localhost

# docker不能运行mysql的时候查看一下端口是否占用‘

# mysql容器无法外部访问解决方案

进入容器内  docker exec -it mysql /bin/bash

登陆mysql   mysql -u root -p 

修改访问权限，允许所有人访问 

GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';

更新权限 

flush privileges;

# 修改nginx容器中的文件

通过拷贝主机上的文件到nginx容器，可修改容器中的文件

```shell

```

# 查看nginx的安装目录

```shell
ps -ef | grep nginx
```

# Dockerfile 中 run 和 cmd 区别

- `run` 是在 `docker build` 构建镜像时, 会执行的命令
- `cmd` 是在 `docker run` 启动容器时, 会执行的命令

# 在node启动的时候，sequlize报错

有可能时mysql没有连上，mysql是一个容器，node后端项目的容器在连接mysql的时候，有可能连接不上mysql；

下面错误：

Client does not support authentication protocol requested by server； conside

**查看mysql的版本**发现是8以后的，所以加密规则会变

```mysql
select version();
2 修改加密方式
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
```

这里的password是你正在使用的密码

然后

> `FLUSH PRIVILEGES;`
> 刷新权限，让修改生效。

还有： 

alter USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRENEVER; alter USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '修改自己的密码';

错误：

Operation ALTER USER failed for 'root'@'localhost'


mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'xxxxx';

ERROR 1396 (HY000): Operation ALTER USER failed for 'root'@'localhost'



发现 host 列的值是 ‘%’，因此将修改密码语句改为： 

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'xxxxxx';

flush privileges;

# 开始部署一个项目

安装git

```
yum install git -y
```

新建文件夹

```
mkdir /usr/projects
```

生成一个github公钥

```
ssh-keygen -t rsa -b 4096 -C "157855644@qq.com"
```

默认在`/root/.ssh/id_rsa`下面

密码： 无

读取公钥：

```
cat /root/.ssh/id_rsa.pub
```

将得到的公钥添加进github

在指定文件夹下使用ssh拉取项目

安装node，npm

```shell
安装node和npm,nvm , pm2


wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source /root/.bashrc
nvm install v16.14.0 #下载指定版本
npm i nrm -g
nrm use taobao
npm i pm2 -g
```

**像nginx，mysql，redis，这些可以安装到宿主机上，然后容器去访问就可以了，没必要放到容器里面**

# 安装 mysql

https://blog.csdn.net/qq_55752792/article/details/122149990

https://blog.csdn.net/weixin_42123191/article/details/113230075

https://blog.csdn.net/Y00010010/article/details/124562115

# 安装docker

https://github.com/sillyhong/whongjiagou-learn/blob/master/turndownMarkdown/markdown/72.deploy.md

安装完启动；

```shell
sudo systemctl start docker
```

# linux查看进程

https://blog.csdn.net/weixin_39785970/article/details/116867920