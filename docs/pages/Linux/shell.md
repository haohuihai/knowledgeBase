```bash
[root@iZuf66r5u8vbc2wq1gglc8Z ~]# ls -l /bin/ | grep bash
-rwxr-xr-x.   1 root root     964536 Apr  1  2020 bash
lrwxrwxrwx.   1 root root         10 Dec 28  2020 bashbug -> bashbug-64
-rwxr-xr-x.   1 root root       6964 Apr  1  2020 bashbug-64
lrwxrwxrwx.   1 root root          4 Dec 28  2020 sh -> bash
You have new mail in /var/spool/mail/root

[root@iZuf66r5u8vbc2wq1gglc8Z ~]# echo $SHELL
/bin/bash
```

sh 默认链接到bash

执行方法

```bash
sh hello.sh

bash hello.sh

# 在执行某个脚本时，打开了子shell， 

./hello.sh    #绝对路径或相对路径    不能直接使用hello.sh，这样会直接当做命令来执行

source hello.sh  #是在父shell直接执行，不会在子shell执行

. hello.sh   # 和使用./hello.sh是完全不同的， .是一个命令
[root@iZuf66r5u8vbc2wq1gglc8Z script]# type source
source is a shell builtin
```



给所有用户给予某个文件可执行的权限

```javascript
chmod +x 文件名
```

查看当前的bash

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ps -f
UID        PID  PPID  C STIME TTY          TIME CMD
root     24779 24261  0 21:47 pts/0    00:00:00 /usr/bin/bash --init-file /root/.vscode-server/bin/6261075646f055b99068d3688932416
root     27621 24779  0 22:09 pts/0    00:00:00 ps -f
You have new mail in /var/spool/mail/root
```

直接在终端输入bash

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ps -f
UID        PID  PPID  C STIME TTY          TIME CMD
root     24779 24261  0 21:47 pts/0    00:00:00 /usr/bin/bash --init-file /root/.vscode-server/bin/6261075646f055b99068d3688932416
root     27737 24779  0 22:10 pts/0    00:00:00 bash
root     27762 27737  0 22:10 pts/0    00:00:00 ps -f
```

可以看到会多一个bash

新输入的bash是之前bash的子进程

我们如果想退出当前子shell，直接在命令行执行  exit，就可以退出了

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# exit
exit
You have new mail in /var/spool/mail/root
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ps -f
UID        PID  PPID  C STIME TTY          TIME CMD
root     24779 24261  0 21:47 pts/0    00:00:00 /usr/bin/bash --init-file /root/.vscode-server/bin/6261075646f055b99068d3688932416
root     27966 24779  0 22:12 pts/0    00:00:00 ps -f
```

可以看到， 现在只有一个bash

这个原理就是我们每次执行一个shell脚本，我们进入了一层，当exit退出后，就出来了，到最外层的shell了；



上面我们使用.  或 source，是直接在-bash  执行，最外层的shell环境执行，不会出现一个子shell

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# . hello.sh 
 hello
You have new mail in /var/spool/mail/root
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ps -f
UID        PID  PPID  C STIME TTY          TIME CMD
root     24779 24261  0 21:47 pts/0    00:00:00 /usr/bin/bash --init-file /root/.vscode-server/bin/6261075646f055b99068d3688932416
root     28503 24779  0 22:16 pts/0    00:00:00 ps -f
```

使用之前的方法是打开了子shell来执行，执行完之后，子shell会立刻关闭

 

子shell和父shell最大的区别就是环境变量的区别，子shell的变量，在父shell是无法使用的

## 系统定义的环境变量

变量就是内存当中存储的数据

1. 系统变量

$HOME, $PWD, $SHELL, $USER

查看全局所有的系统变量

```bash
# 系统定义出来的全局变量
[root@iZuf66r5u8vbc2wq1gglc8Z script]# env | less
XDG_SESSION_ID=5845
TERM_PROGRAM=vscode
HOSTNAME=iZuf66r5u8vbc2wq1gglc8Z
TERM=xterm-256color
SHELL=/bin/bash
HISTSIZE=1000
SSH_CLIENT=101.86.40.222 60961 22
TERM_PROGRAM_VERSION=1.73.1
USER=root
PATH=/root/.vscode-server/bin/6261075646f055b99068d3688932416f2346dd3b/bin/remote-cli:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
MAIL=/var/spool/mail/root
PWD=/root/script
LANG=en_US.UTF-8
VSCODE_GIT_ASKPASS_EXTRA_ARGS=
HISTCONTROL=ignoredups
HOME=/root
SHLVL=5
VSCODE_GIT_ASKPASS_MAIN=/root/.vscode-server/bin/6261075646f055b99068d3688932416f2346dd3b/extensions/git/dist/askpass-main.js
LOGNAME=root
VSCODE_GIT_IPC_HANDLE=/run/user/0/vscode-git-fe84edec28.sock
SSH_CONNECTION=101.86.40.222 60961 172.24.49.137 22
VSCODE_IPC_HOOK_CLI=/run/user/0/vscode-ipc-25b2caed-0078-471d-8df4-55769634d0d6.sock
LESSOPEN=||/usr/bin/lesspipe.sh %s
BROWSER=/root/.vscode-server/bin/6261075646f055b99068d3688932416f2346dd3b/bin/helpers/browser.sh
VSCODE_GIT_ASKPASS_NODE=/root/.vscode-server/bin/6261075646f055b99068d3688932416f2346dd3b/node
GIT_ASKPASS=/root/.vscode-server/bin/6261075646f055b99068d3688932416f2346dd3b/extensions/git/dist/askpass.sh
XDG_RUNTIME_DIR=/run/user/0
COLORTERM=truecolor
_=/usr/bin/env
OLDPWD=/root


[root@iZuf66r5u8vbc2wq1gglc8Z script]# printenv | less

#如果使用printenv查看某一个环境变量的值
[root@iZuf66r5u8vbc2wq1gglc8Z script]# printenv USER

# 如果查看当前定义的所有变量  系统的和局部的都可以通过查看
[root@iZuf66r5u8vbc2wq1gglc8Z script]# set | less
```

1. 用户自定义变量

定义变量: 变量名=变量值，注意，=号前后不能有空格

撤销变量:unset 变量名

声明静态变量: readonly 变量，注意:不能unsete

一般自定义的变量是小写，系统的是大写

变量定义规则

(1)变量名称可以由字母、数字和下 划线组成，但是不能以数字开头，环境变量名建议大写。

(2)等号两侧不能有空格

(3)在 bash 中，变量默认类型都是字符串类型，无法直接进行数值运算。

(4)变量的值如果有空格，需要使用双引号或单引号括起来。



默认定义的值都是为字符串

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# a=1+5
You have new mail in /var/spool/mail/root
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $a
1+5
[root@iZuf66r5u8vbc2wq1gglc8Z script]# a=$((1+5))
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $a
6
```

可与使用括号来进行运算

也可以使用[]来运算符计算

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# a=$[1+5]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $a
6
```

还可以区分为全局和局部变量

将一个变量设置为只读变量，设置为只读变量，在后面是不能进行修改的；

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# readonly b=5
[root@iZuf66r5u8vbc2wq1gglc8Z script]# b=10
bash: b: readonly variable
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $b
5
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```



**撤销定义的变量，**

我们定义的所有变量可与通过set查看

但是我们如果想撤销某个变量

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# unset my_var
You have new mail in /var/spool/mail/root
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $my_var

[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

对于只读的变量，无法进行撤销





区分一个变量是局部还是全局

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# env | grep my_var
[root@iZuf66r5u8vbc2wq1gglc8Z script]# set | grep my_var
my_var=hello
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 


# 我们通过上面的两种方法不能判断是全局还是局部，env是全局  set是局部和全局变量
# 我们可以进入子shell，在子shell里面打印出来

[root@iZuf66r5u8vbc2wq1gglc8Z script]# bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $my_var

# 子shell打印不出来，能够发现他是一个局部变量
```

将局部变量提升为一个全局变量

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# export my_var
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $my_var
hello
[root@iZuf66r5u8vbc2wq1gglc8Z script]# bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $my_var
hello

# 可以看到my_var命令被设置为全局变量
```

但是在子shell更改全局变量，是无效的，不会影响父shell

也可在脚本里面查看

```bash
#!/bin/bash
echo " hello"
echo $new_var
[root@iZuf66r5u8vbc2wq1gglc8Z script]# new_var="hello, linux"
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 
 hello


[root@iZuf66r5u8vbc2wq1gglc8Z script]# source hello.sh
hello
hello, linux
```

可以看到子父的关系，在子shell里面是访问不到外面定义的局部变量，要使用，使用source或.来执行脚本，或者使用export将局部变量导出为全局变量，然后使用.hello.sh来执行脚本

上面提到，我们不能直接使用hello.sh来执行脚本，那是因为我们输入的hello.sh，被当作脚本来执行了，但是系统里面没有这个脚本，我们也可以将这个脚本放进我们的系统脚本里面：

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# cp hello.sh /bin/
[root@iZuf66r5u8vbc2wq1gglc8Z script]# hello.sh
 hello

[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

通过上面的命令可以看到，这样就可与执行了

但是bin目录下都是一些系统命令，所以不能这样使用；

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# rm -f /bin/hello.sh
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

我们可与通过$PATH查看系统的可执行文件的路径

```bash
/root/.vscode-server/bin/6261075646f055b99068d3688932416f2346dd3b/bin/remote-cli:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
```

我们可与将当前目录，添加到系统的环境变量里面，这样就可以直接去执行了

### 

## 特殊变量

$n：n 为数字，$0 代表该脚木名称，S1-S9 代表第一到第九个参数，十以上的参数，十以上的参数需要用大括号包含，如S{10})

```bash
#!/bin/bash
echo "hello $1"
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh xiaoming
hello xiaoming
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

上面我们看到使用双引号将$1包裹起来，这样里面的$1可以被识别为变量，但是如果不想被系统识别为变量，那么我们可以使用''单引号将其变量包裹起来



如果使用$0，则打印出来的是输入的脚本路径+名称，但是如果只想要名称，则在里面可以使用$basename

$#：  获取所有输入参数个数，常用于循环,判断参数的个数是否正确以及加强脚本的健壮性

```bash
#!/bin/bash
echo "hello $1"
echo parameter $#
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh xiaoming
hello xiaoming
parameter 1
```

$*:  这个变量代表命令行中所有的参数，$*把所有的参数看成一个整体

$@:  功能描述: 这个变量也代表命令行中所有的参数,不过$@把每个参数区分对待

```bash
#!/bin/bash
echo $*
echo $@
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh xiaoming xiaowang
xiaoming xiaowang
xiaoming xiaowang
```

$?：最后一次执行的命令的返回状态。如果这个变量的值为 0，证明上一个命令正确执行;如果这个变量的值为非 0(具体是哪个数，由命令自己来决定)，则证明上一个命令执行不正确了。

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh xiaoming xiaowang  $?
xiaoming xiaowang 0
xiaoming xiaowang 0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# hello.sh
bash: /usr/bin/hello.sh: No such file or directory
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
127 # 代表未找到某个命令
```

### 运算符

$((运算式)) 或 $[运算式]

下列是执行表达式的一些方式

```bash
# 通过表达式expr 来执行运行，但运算符两边得需要空格，否则会当做字符串输出
[root@iZuf66r5u8vbc2wq1gglc8Z script]# expr 1+2
1+2

# 运算符 两边有空格 正常运算
[root@iZuf66r5u8vbc2wq1gglc8Z script]# expr 1 + 2
3
# * 号被当做了特殊符号，如果要当做乘号，需要进行转义
[root@iZuf66r5u8vbc2wq1gglc8Z script]# expr 1 * 3
expr: syntax error
[root@iZuf66r5u8vbc2wq1gglc8Z script]# expr 1 \* 3
3

# 可以使用$[]来进行运算
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $[4+2]
6
# 可以使用$(())来进行运算
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $((5*2))
10
# 将变量结果赋值给a
[root@iZuf66r5u8vbc2wq1gglc8Z script]# a=$[1+3]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $a
4

# 通过expr 将运算后的结果赋值给b  但这样输出的是字符串
[root@iZuf66r5u8vbc2wq1gglc8Z script]# b="expr 5 \* 2"
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $b
expr 5 \* 2

# 通过$()进行赋值
[root@iZuf66r5u8vbc2wq1gglc8Z script]# b=$(expr 5 \* 2)
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $b
10

# 如果要使用expr进行赋值，可以加反引号 `
[root@iZuf66r5u8vbc2wq1gglc8Z script]# a=`expr 5 \* 2`
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $a
10

# 对于特殊的运算符
[root@iZuf66r5u8vbc2wq1gglc8Z script]# s=$[(2+3)*4]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $s
20
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

**在脚本里面进行运算**

```bash
#!/bin/bash
sum=$[$1 + $2]
echo $sum
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 200 200
400
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

## 条件判断

=号两边需要空格，[]中括号内两边需要空格

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# a=hello
[root@iZuf66r5u8vbc2wq1gglc8Z script]# test $a = hello
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# test $a = Hello
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
1
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ $a = hello ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ $a = Hello ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
1
[root@iZuf66r5u8vbc2wq1gglc8Z script]# []
bash: []: command not found
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [  ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
1
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ 12 ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 

[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ $a != hello ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
1
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ $a != Hello ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

(1)两个整数之间比较

-eq 等于 (equal)

-It 小于 (less than)

-ne 不等于 (not equal)

-le 小于等于(less equal)

-gt 大于 (greater than)

-ge 大于等于(greater equal)

注:如果是字符串之间的比较 ，用等号“=”判断相等:用“!=”判断不等

(2)按照文件权限进行判断

-r 有读的权限(read)

-w 有写的权限(write)

-x有执行的权限(execute)

(3)按照文件类型进行判断

-e 文件存在(existence)

-f 文件存在并且是一个常规的文件(file) 

-d 文件存在并且是一个目录(directory)

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ 2 = 8 ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
1
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ 2 -lt 8 ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ 2 -gt 8 ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
1
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```



```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ -r hello.sh ]
You have new mail in /var/spool/mail/root
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ -w hello.sh ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ -x hello.sh ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```



```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# touch aaa.txt
[root@iZuf66r5u8vbc2wq1gglc8Z script]# mkdir bbb
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ -e aaa.txt ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ -d aaa.txt ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
1
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ -f aaa.txt ]
[root@iZuf66r5u8vbc2wq1gglc8Z script]# echo $?
0
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

多条件判断：

&& 表示前一条命令执行成功时，才执行后一条命令

||  表示上一条命令执行失败后，才执行下一条命令

```bash
&& || 的使用

[root@iZuf66r5u8vbc2wq1gglc8Z script]# [ aaa ] && echo OK || echo fail
OK
[root@iZuf66r5u8vbc2wq1gglc8Z script]# [  ] && echo OK || echo fail
fail
```

### if判断

**单分支**

```bash
# ; 表示一行里面表示的两个命令  
# cd /home/ddd; ls -l  表示看到的是/home/ddd下的内容
if [ 条件表达式 ];then
	程序
fi

if [ 条件表达式 ]
then
  程序
fi
#!/bin/bash
a=25
if [ $a -gt 18 ];then 
  echo 'ok'
fi
[root@iZuf66r5u8vbc2wq1gglc8Z script]# if [ $a -gt 18 ] && [ $a -lt 35 ];then echo OK;fi
OK
[root@iZuf66r5u8vbc2wq1gglc8Z script]# if [ $a -gt 18 -a $a -lt 35 ];then echo OK;fi 
OK
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

**多分支**

```bash
if [ 条件表达式 ];then
	程序
elif [ 条件表达式 ];then
	程序
elif [ 条件表达式 ];then
	程序
else
	程序
fi
#!/bin/bash
if [ $1 -lt 18 ];then
  echo "未成年人"
elif [ $1 -lt 35 ];then
  echo "青年人"
elif [ $1 -lt 60 ];then
  echo "中年人"
else
  echo "老年人"
fi
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 34
青年人
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 90
老年人
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 12
未成年人
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

### case 语句

```bash
case $变量名 in
"值1")
	如果变量的值未1  执行这里
;;
"值2")
	如果变量的值为值2   执行这里
;;
*)
	如果以上都不满足，执行这里
;;
esca
```

1. case 行尾必须为单词 "in" ， 每一行 模式匹配必须以右括号结束 ")"
2. 双分号";;"表示命令序列结束
3. 最后的 "*)" 表示默认模式。上面的条件都不满足，走这里

```bash
#!/bin/bash
case $1 in
1) 
  echo "one"
;;
2)
  echo  "two"
;;
3)
  echo "three"
;;
*)
  echo "number else"
;;
esac
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 1
one
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 2
two
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 5
number else
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

## for循环

**使用方法一：**

```bash
for ((初始值;循环控制条件;变量变化))
do # do 和done包裹循环的程序
	程序
done
for (( i=0; i <= $1; i++ ))  #双小括号里面直接跟运算式  可与使用<=
do
  sum=$[$sum+$i]
done
echo $sum
```

**使用方法二：**

```bash
for 变量 in 值1  值2   值3
do
	程序
done
for os in Linux windows macos;
do
	echo $os;
done
for i in {1..100}
do
  sum=$[$sum+$i]
done
echo $sum
```

$* 和 $@

```bash
#!/bin/bash
for para in $*
do
  echo $para
done

for  para1 in $@
do
  echo $para1
done
```

上面的代码，如果$*和$@如果没有被引号引起来，那么他们两者是没有任何区别的

```bash
#!/bin/bash
for para in "$*"
do
  echo $para
done

for  para1 in "$@"
do
  echo $para1
done
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh a b c d
a b c d
a
b
c
d
```

可以看到，一个$*当做整体来使用，而$@被当做 分开来使用

### while循环

```bash
#!/bin/bash
while [ 条件表达式 ]
do
  程序
done
a=1
while [ $a -le $1  ]
do
  sum2=$[ $sum2 + $a ]
  a=$[$a + 1]
done
echo $sum2
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 100
5050
```

linux的另一种写法

```bash
#!/bin/bash
a=1
while [ $a -le $1  ]
do
  let sum2+=a
  let a++
done
echo $sum2
```

## read读取控制台输入

基本语法

read (选项) （参数）

①选项：

-p: 指定读取值时的提示符

-t: 指定读取值时等待的时间（s）；如果不加-t  表示一直等待

②参数

变量：指定读取值的变量名

```bash
#!/bin/bash
read -t 10 -p "请输入你的芳名：" name
echo "welcome, $name"
[root@iZuf66r5u8vbc2wq1gglc8Z script]# ./hello.sh 100
请输入你的芳名：aaa
welcome, aaa
[root@iZuf66r5u8vbc2wq1gglc8Z script]# 
```

### 函数

系统函数

basename

**基本语法：**

```bash
basename [string / pathname ] [suffix]
```

basename 命令会删掉所有的前缀，包括最后一个("/")字符，然后将字符串显示出来

suffix  为后缀，如果被指定了，basename会将pathname或string中的suffix去掉

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# basename /home/hhh/script/hello.sh .sh
hello
[root@iZuf66r5u8vbc2wq1gglc8Z script]# basename /home/hhh/script/hello.sh
hello.sh
```

basename  只是截取字符串，不会校验路径是否正确；

dirname

dirname文件绝对路径

从开始路径到除去文件名/之前的所有路径

读取文件路径的绝对路径名称

```bash
[root@iZuf66r5u8vbc2wq1gglc8Z script]# dirname ../..//./home/script/hello.sh
../..//./home/script
```

dirname 也只是作为截取文件路径的函数，不会校验路径是否正确

**自定义函数**

语法：

```bash
[function] funname[()]
{
	程序
  [return int;]
}
```

调用函数前需要先定义函数，shell脚本是逐行运行进行编译

函数返回值，只能 通过$? 系统变量获取，return可写可不写，不加，以最后一条命令运行结果，作为返回值，return后跟n(0-255)，返回的结果为数字

```bash
#!/bin/bash
function add() {
  s=$[$1 + $2]
  echo "和：" $s
}
read -p "请输入第一个整数：" a
read -p  "请输入第二个整数：" b

add $a $b
```

上面的代码如果返回的是一个数字的结果；如何做；

```bash
#!/bin/bash
function add() {
  s=$[$1 + $2]
  return $s
}
read -p "请输入第一个整数：" a
read -p  "请输入第二个整数：" b

add $a $b
echo "和：" $?
```

现在还有一个问题，return返回的值的范围为0-255  如果计算结果超出了255，应该如何表示；

```bash
function add() {
  s=$[$1 + $2]
  echo $s
}
read -p "请输入第一个整数：" a
read -p  "请输入第二个整数：" b

sum=$(add $a $b)
echo $sum
```

`$(add $a $b)`获取了函数的返回值，并赋值给sum，括号里面是函数执行后的结果



## 案例

实际生产应用中，往往需要对重要数据进行归档备份。

需求:实现一个每天对指定目录归档备份的脚本，输入一个目录名称(末尾不带/)，将目录下所有文件按天归档保存，并将归档日期附加在归档文件名上，放在root/archive下。
这里用到了归档命令:tar-
后面可以加上-c选项表示归档，加上-z选项表示同时进行压缩，得到的文件后缀名为.tar.gz

```bash
#!/bin/bash
if [ $# -ne 1 ]
then
    echo "参数个数错误，应该输入一个参数，作为归档目录"
    exit
fi

if [ -d $1 ]
then
    echo
else 
      echo 
      echo "目录不存在"
      echo
fi

DIR_NAME=$(basename $1)
DIR_PATH=$(cd $(dirname $1); pwd)

DATE=$(date + %y%m%d)

FILE=archive_${DIR_NAME}_$DATE.tar.gz
DEST=/root/archive/$FILE

echo "开始归档"

echo 
tar -czf $DEST $DIR_PATH/$DIR_NAME

if [ $? -eq 0 ]
then
    echo "归档成功"
fi
crontab -e

0 2 * * * /root/scripts/hello.sh /root/scripts
```