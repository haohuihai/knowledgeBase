# Docker安装Gitlab

https://blog.csdn.net/lianxiaohei/article/details/122665812   我是根据这个安装的

https://baijiahao.baidu.com/s?id=1735404739948635473&wfr=spider&for=pc

https://www.cnblogs.com/chenyuanbo/p/12443662.html  docker安装gitlab 和 idea安装gitlab的教材

**一些命令**

停掉gitlab服务再重启

```shell
停掉gitlab服务再重启
docker stop e37eeebc6c7a
docker start e37eeebc6c7a
curl 127.0.0.1:8090  # 测试能否连接gitlab
```



# Gitlab修改密码

官方文档： **https://docs.gitlab.com/ee/security/reset_user_password.html**

进入gitlab容器，

```
docker exec -it gitlab bash
```

使用以下命令启动Ruby on Rails控制台

 **gitlab-rails console -e production**

控制台加载完毕后，通过邮箱或者用户名去搜索用户

**user = User.where(id: 1).first**   根据id来查找，可以看到查找到当前用户的名称

或者

**user = User.find_by(email: 'admin@example.com')**  根据id来查找，可以看到查找到当前用户的名称

更改找到的这个用户密码

**user.password = '新密码'**

**user.password_confirmation = '新密码'**

更改完进行保存

**user.save**

我们再次进入到自己搭建的gitlab服务器，然后可以使用新密码进行重新登录

# 解决git拉取代码时的问题

当我们新增了远程地址，可以使用ssh -T git@host来测试连通性

最近在新 Linux 中安装 GitLab 后，发现一个诡异的事情。当配置完管理员账号、SSH 密钥之后、开启防火墙端口号、在 GitLab 新建仓库 test 等等之后，笔者尝试在远程客户端 Windows 上使用 git clone 来 clone 这个在 GitLab 上的仓库，使用的是 SSH 协议。但无论 clone 的 URL 是否正确，终端提示输入密码，且输入任何密码都不对。完整提示信息内容如下：

```shell
 git clone git@xxx.xxx.xxx.xxx:XXX/test.git
Cloning into 'test'...
/c/Users/xxx/.ssh/config line 2: Unsupported option "rsaauthentication"
git@xxx.xxx.xxx.xxx's password:
Permission denied, please try again.
git@xxx.xxx.xxx.xxx's password:
34xxxPermission denied, please try again.
git@xxx.xxx.xxx.xxx's password:
git@xxx.xxx.xxx.xxx: Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights and the repository exists.
```



但奇怪的是，如果使用 HTTP 协议进行 clone、push 却没有任何问题

试了各种方法才发现，这个密码其实是 GitLab 所在的 Linux 上的一个账户名为 git 的账户密码。这个账户是怎么来的呢？实际上，在第一次使用命令 `gitlab-ctl reconfigure` 初始化 GitLab 配置时，GitLab 会自动为 Linux 创建五个账户，分别是：

- git
- gitlab-redis
- gitlab-psql
- gitlab-prometheus
- gitlab-www

因为这些账户在被创建时，GitLab 并没有提示我们输入密码，所以我们并不知道密码，或者它们本来就没有密码。不过，我们在知道账户名的时候就可以强制改密码了。可以使用如下命令来更改账户 git 的密码：需要进入gitlab的容器

passwd git 

接下来会提示重新修改密码

**还有一种方法修改git密码的**

进入gitlab容器

su git 切换到git用户 

进入gitlab-rails console

根据邮箱查找用户ID

```shell
User.find_by(email:'123456@qq.com')
```

选定UID=14

```shell
user = User.where(id:4).first
```

修改密码

```shell
user.password='123456'
user.password_confirmation = '123456'
```

保存

```shell
user.save!
```

tips： 如果root密码错误登陆超过10次，会锁定该账号

![image-20230106101336200](images/image-20230106101336200.png) 

修改完我重新拉取的时候，获取重新ssh -T git@host的时候密码还是不正确

```shell
ssh -T git@192.168.1.1
依然显示报错   
ssh -T  是添加公钥之后进行验证的操作
```

![image-20230106100343997](./images/image-20230106100343997.png) 

但是我重新使用ssh拉取代码的时候。发现这个地址变了

 ssh://git@101.132.124.188:8022/haohuihai/ceshi.git

之前是

git@101.132.124.188:8022/haohuihai/ceshi.git

居然可以了。想不到

如果实在解决不了，可以重新卸载，然后重新安装，重新配置

[原文链接](https://blog.csdn.net/wangpaiblog/article/details/122295579)

<hr />

还又一些解决办法是本地生成公钥的这种方法，添加过多次，发现也行不通

怎么添加，官网又介绍

# 如何将项目同事提交到gitlab和github

https://cloud.tencent.com/developer/article/1781698

gitlab常用命令

http://t.zoukankan.com/inxworld-p-11460991.html