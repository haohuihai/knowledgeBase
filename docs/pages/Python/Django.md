# 本地Python包的安装路径

D:\sort\anaconda\Lib\site-packages

# 建立一个简单的项目的基本流程

```python
python -m venv ll_env
ll_env/Scripts/activate
pip install django
django-admin startproject learning_log .
python manage.py migrate
python manage.py runserver
python manage.py createsuperuser
```

## 使用virtualenv创建虚拟环境

```python
pip install virtualenv  #安装虚拟环境 

pip install virtualenvwrapper #安装虚拟环境扩展包

virtualenv vitrualpro  # 创建虚拟环境

cd vitrualpro/  #进入虚拟环境

# 进入Scripts  直接执行activate文件   启动虚拟环境
cd Scripts/
activate

pip install django  #在虚拟环境中安装django

django-admin startproject djangopro  #虚拟环境中创建项目

python manage.py startapp 应用名 # 进入项目，创建应用

此时的目录结构如下

```

启动项目；启动项目前需要启动虚拟环境

```python
 python manage.py runserver
```

每次修改完models后，都要在创建的项目manage.py所在的目录下执行下面的代码

执行下面的代码前需要启动项目

```python
python manage.py makemigrations
python manage.py migrate
```

models可以理解为数据库的模型类的集合；下面的BookInfo类，HeroInfo类会创建两个数据表；

这个两个表的关系是一对多的关系；可以通过`models.ForeignKey`来建立关联

```python
# 一类
# 图书类
class BookInfo(models.Model):
    '''图书模型类'''
    # 图书名称，CharField说明是一个字符串，max_length指定字符串的最大长度
    btitle = models.CharField(max_length=20)
    # 出版日期，DateField说明是一个日期类型
    bpub_date = models.DateField()

    def __str__(self):
        return self.btitle

# 多类
# 英雄人物类
# 关系属性　hbook，建立图书类和英雄人物类之间的一对多关系

class HeroInfo(models.Model):
    '''英雄人物模型类'''
    hname = models.CharField(max_length=20) # 英雄名称
    # 性别，BooleanField说明是bool类型，default指定默认值，False代表男
    hgender = models.BooleanField(default=False)
    # 备注
    hcomment = models.CharField(max_length=128)
    # 关系属性　hbook，建立图书类和英雄人物类之间的一对多关系
    # 关系属性对应的表的字段名格式: 关系属性名_id
    hbook = models.ForeignKey('BookInfo', on_delete=models.CASCADE)

    def __str__(self):
        return self.hname
```

关联查询：多个表之间的关联查询，相当于表中的LEFT JOIN 或者RIGHT JOIN

```python
from datetime import date # 引入date类

from booktest.models import BookInfo,HeroInfo 

b = BookInfo() # 获取BookInfo的实例

b.btitle = '天是'   # 修改btitle

b.bpub_date = date(1990,12,11)   # 修改bpub_date

b.save()  # 修改完保存数据到数据库

h = HeroInfo()

h.hname = 'hero'

h.hgender = False

h.hcomment = 'dasfsafdsa'

h.hbook = b

h.save()

h2 = HeroInfo()

h2.hname = 'ls'

h2.hcomment = 'dsaas'

h2.hbook = b

h2.save()

h3 = HeroInfo.objects.get(id=2)  # 查询id为2 的英雄，并返回QuerySet
h3.hname
'ls'
h3.hbook.btitle
'天是'
b.heroinfo_set.all() # 查询图书这个对象下对应的所有英雄  对象名.类名小写_set.all()
O<QuerySet [<HeroInfo: hero>, <HeroInfo: ls>]>
```

修改完 执行迁移的时候，需要注意是否开启了数据库

# 创建应用程序

一个终端一个虚拟环境

ll_admin

root123456

添加新模型后，需要再次迁移数据库。你将慢慢地对这个过程了如指掌：修改models.py，执行命令python manage.py makemigrations app_name，再执行命令python manage.py migrate

# 报错信息

Watching for file changes with StatReloader
Exception in thread django-main-thread:

TypeError: __init__() missing 1 required positional argument: 'on_delete'

答：

定义外键的时候需要加上 on_delete=;
即：`contract = models.ForeignKey(Contract, on_delete=models.CASCADE)`

django 升级到2.0之后,表与表之间关联的时候,必须要写on_delete参数,否则会报异常:
TypeError: init() missing 1 required positional argument: ‘on_delete’

on_delete各个参数的含义如下：

```
on_delete=None,               # 删除关联表中的数据时,当前表与其关联的field的行为
on_delete=models.CASCADE,     # 删除关联数据,与之关联也删除
on_delete=models.DO_NOTHING,  # 删除关联数据,什么也不做
on_delete=models.PROTECT,     # 删除关联数据,引发错误ProtectedError
# models.ForeignKey('关联表', on_delete=models.SET_NULL, blank=True, null=True)
on_delete=models.SET_NULL,    # 删除关联数据,与之关联的值设置为null（前提FK字段需要设置为可空,一对一同理）
# models.ForeignKey('关联表', on_delete=models.SET_DEFAULT, default='默认值')
on_delete=models.SET_DEFAULT, # 删除关联数据,与之关联的值设置为默认值（前提FK字段需要设置默认值,一对一同理）
on_delete=models.SET,         # 删除关联数据,
a. 与之关联的值设置为指定值,设置：models.SET(值)
b. 与之关联的值设置为可执行对象的返回值,设置：models.SET(可执行对象)

```

由于多对多(ManyToManyField)没有 on_delete 参数,所以以上只针对外键(ForeignKey)和一对一(OneToOneField)

# Django

## 软件框架

 ![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps1.png)

一个公司是由公司中的各部部门来组成的，每一个部门拥有特定的职能，部门与部门之间通过相互的配合来完成让公司运转起来。

一个软件框架是由其中各个软件模块组成的，每一个模块都有特定的功能，模块与模块之间通过相互配合来完成软件的开发。

软件框架是针对某一类软件设计问题而产生的。

## MVC框架

施乐公司 帕罗奥多研究中心 smalltalk语言 simula 67

​	软件设计模式

​	MVC的产生理念： **分工**。让专门的人去做专门的事。

​	![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps2.png) ![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps3.png)![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps4.png)

输入，处理，输出

MVC的核心思想： **解耦**。

通过浏览器注册用户信息。

M： Model,模型， 

V： View,视图， 

C： Controller,控制器, 

## MVT

Django 劳伦斯出版集团 新闻内容网站。Python MVC

快速开发和DRY原则。Do not repeat yourself.不要自己去重复一些工作。

M：Model,模型， 

V： View,视图， 

T： Template,模板， 

## 虚拟环境

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps5.png) 

之前安装python包的命令： pip3 install 包名

包的安装路径：/usr/local/lib/python3.5/dist-packages

安装同一个包的不同版本，后安装的包会把原来安装的包覆盖掉。这样，如同一台机器上两个项目依赖于相同包的不同版本，则会导致一些项目运行失败。

解决的方案就是：虚拟环境。

虚拟环境是真实python环境的复制版本。

**安装虚拟环境的命令：**

1）sudo pip install virtualenv #安装虚拟环境 （window不需要sudo，下同）

2）sudo pip install virtualenvwrapper #安装虚拟环境扩展包

3）编辑家目录下面的.bashrc文件，添加下面两行。

**export WORKON_HOME=$HOME/.virtualenvs**

**source /usr/local/bin/virtualenvwrapper.sh**

4）使用source .bashrc使其生效一下。

创建虚拟环境命令：

​	mkvirtualenv 虚拟环境名

创建python3虚拟环境：

mkvirtualenv -p python3 bj11_py3

进入虚拟环境工作：

​	workon 虚拟环境名

查看机器上有多少个虚拟环境：

​	workon 空格 + 两个tab键

退出虚拟环境：

​	deactivate

删除虚拟环境：

​	rmvirtualenv 虚拟环境名

虚拟环境下安装包的命令：

```shell
pip install 包名
```

注意：不能使用sudo pip install 包名，这个命令会把包安装到真实的主机环境上而不是安装到虚拟环境中。

apt-get install 软件  安装某个软件，比如安装mysql

pip install python包名  安装python下的某个包

安装django环境：

```shell
pip install django==1.8.2
```

查看虚拟环境中安装了哪些python包：

```shell
pip list
pip freeze
```

Window创建虚拟环境

virtualenv vitrualpro  创建虚拟环境

 cd vitrualpro/  进入虚拟环境

 source Scripts/activate  启动虚拟环境  （这种方式不行）

进入Scripts  直接执行activate文件

```shell
pip install django  # 在虚拟环境中安装django

django-admin startproject djangopro   # 虚拟环境中创建项目
```

## 项目创建

命令：django-admin startproject 项目名

注意：创建应用必须先进入虚拟环境。

项目目录如下：

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps6.jpg) 

__init__.py: 说明test1是一个python包。

settings.py: 项目配置文件

urls.py:	进行url路由的配置 

wsgi.py: 

manage.py: 

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps7.png) 

一个项目由很多个应用组成的，每一个应用完成一个特定的功能。

创建应用的命令如下：

python manage.py startapp 应用名

注意：创建应用时需要先进入项目目录。

应用目录如下：

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps8.jpg) 

```diff
__init__.py: 

models.py: 

views.py: 

tests.py: 

admin.py: 
```

建立应用和项目之间的联系，需要对应用进行注册。

修改settings.py中的INSTALLED_APPS配置项。

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps9.jpg) 

 

运行开发web服务器命令：

​	python manage.py runserver

## ORM

django中内嵌了ORM框架，ORM框架可以将类和数据表进行对应起来，只需要通过类和对象就可以对数据表进行操作。

设计类：模型类。

ORM另外一个作用：根据设计的类生成数据库中的表。

## 模型类

### 模型类设计

在应用models.py中设计模型类。

必须继承与models.Model类。

1） 设计BookInfo类。

2） 设计HeroInfo类。

Models.ForeignKey可以建立两个模型类之间一对多的关系，django在生成表的时候，就会在多的表中创建一列作为外键，建立两个表之间一对多的关系。

### 模型类生成表

1） 生成迁移文件

命令：python manage.py makemigrations

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps10.jpg) 

迁移文件是根据模型类生成的。

2） 执行迁移生成表

命令：python mange.py migrate 

```shell
python manage.py migrate
```

根据迁移文件生成表。

生成表名的默认格式：

​	应用名_模型类名小写

### 通过模型类操作数据表

进入项目shell的命令:

```shell
python manage.py shell
```

以下为在相互shell终端中演示的例子：

首先导入模型类：

模型类里面定义了date，这里也要导入date

```python
from datetime import date

from booktest.models import BookInfo,HeroInfo
```

**1）向booktest_bookinfo表中插入一条数据。**

```python
b = BookInfo() #定义一个BookInfo类的对象
b.btitle ='天龙八部' #定义b对象的属性并赋值
b.bpub_date = date(1990,10,11) 
b.save() #才会将数据保存进数据库
```

**2）查询出booktest_bookinfo表中id为1的数据。**

```python
b = BookInfo.objects.get(id=1) 
```

**3）在上一步的基础上改变b对应图书的出版日期。**

```python
b.bpub_date = date(1989,10,21)

b.save() #才会更新表格中的数据
```

**4）紧接上一步，删除b对应的图书的数据。**

```python
b.delete() #才会删除
```

**5）向booktest_heroInfo表中插入一条数据。**

```python
h = HeroInfo()

h.hname = '郭靖'
h.hgender = False

h.hcomment = ‘降龙十八掌’

b2 = BookInfo.objects.get(id=2)

h.hbook = b2  #给关系属性赋值，英雄对象所属的图书对象

h.save()
```



**6）查询图书表里面的所有内容。**

```python
BookInfo.objects.all()

HeroInfo.objects.all()
```

**关系操作**

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps11.png)

1）查询出id为2的图书中所有英雄人物的信息。

```python
b = BookInfo.objects.get(id=2)

b.heroinfo_set.all() #查询出b图书中所有英雄人物的信息
```

## 后台管理

1） 本地化

语言和时区的本地化。

修改settings.py文件。

\# LANGUAGE_CODE = 'en-us'

LANGUAGE_CODE = 'zh-hans' #使用中文

 

\# TIME_ZONE = 'UTC'

TIME_ZONE = 'Asia/Shanghai' # 中国时间

2） 创建管理员

命令：python manage.py createsuperuser

输入用户名，密码，启动项目

进入默认页面： http://127.0.0.1:8000/

进入登录页面 http://127.0.0.1:8000/admin

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps12.jpg) 

 

3） 注册模型类

在应用下的admin.py中注册模型类。

\# Register your models here.

from booktest.models import BookInfo,HeroInfo

admin.site.register(BookInfo)

admin.site.register(HeroInfo)

 

告诉djang框架根据注册的模型类来生成对应表管理页面。

b = BookInfo() 

str(b) __str__  用来修改页面显示标题；默认返回的是str(b)  BookInfo object 

4） 自定义管理页面

自定义模型管理类。模型管理类就是告诉django在生成的管理页面上显示哪些内容。

在admin.py里面自定义显示内容

\# 自定义模型管理类

class BookInfoAdmin(admin.ModelAdmin):

  '''图书模型管理类'''

  list_display = ['id', 'btitle', 'bpub_date']

 

class HeroInfoAdmin(admin.ModelAdmin):

  '''英雄人物模型管理类'''

  list_display = ['id', 'hname', 'hcomment']

 

\# 注册模型类

\# admin.site.register(BookInfo)

admin.site.register(BookInfo, BookInfoAdmin)

admin.site.register(HeroInfo, HeroInfoAdmin)

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps13.jpg) 

## ***\*视图\****

在Django中，通过浏览器去请求一个页面时，使用视图函数来处理这个请求的，视图函数处理之后，要给浏览器返回页面内容。

### ***\*视图函数的使用\****

1）定义视图函数

视图函数定义在views.py中。

例：

​		def index(request):

​			#进行处理。。。

​			return HttpResponse('hello python')

视图函数必须有一个参数request，进行处理之后，需要返回一个HttpResponse的类对象，hello python就是返回给浏览器显示的内容。

2）进行url配置

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps14.png) 

​	url配置的目的是让建立url和视图函数的对应关系。url配置项定义在urlpatterns的列表中，每一个配置项都调用url函数。

url函数有两个参数，第一个参数是一个正则表达式，第二个是对应的处理动作。

配置url时，有两种语法格式：

a) url(正则表达式，视图函数名)

b) url(正则表达式，include(("app名称：urls"，"app名称")))

工作中在配置url时，首先在项目的urls.py文件中添加配置项时，并不写具体的url和视图函数之间的对应关系，而是包含具体应用的urls.py文件，在应用的urls.py文件中写url和视图函数的对应关系。

### ***\*url匹配的过程\****

在项目的urls.py文件中包含具体应用的urls.py文件，应用的urls.py文件中写url和视图函数的对应关系。

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps15.jpg) 

当用户输入如http://127.0.0.1:8000/aindex时，去除域名和最前面的/，剩下aindex，拿aindex字符串到项目的urls文件中进行匹配，配置成功之后，去除匹配的a字符，那剩下的index字符串继续到项目的urls文件中进行正则匹配，匹配成功之后执行视图函数index，index视图函数返回内容hello python给浏览器来显示。

## ***\*模板\****

模板不仅仅是一个html文件。

### ***\*模板文件的使用\****

1） 创建模板文件夹

2） 配置模板目录

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps16.jpg)3)	使用模板文件

a) 加载模板文件

去模板目录下面获取html文件的内容，得到一个模板对象。

b) 定义模板上下文

向模板文件传递数据。

c) 模板渲染

得到一个标准的html内容。

### ***\*给模板文件传递数据\****

模板变量使用：{{ 模板变量名 }}

模板代码段：{%代码段%}

for循环：

{% for i in list %}

{% endfor %}

## ***\*案例完成\****

编码之前的准备工作：

1） 设计出访问页面的url和对应的视图函数的名字，确定视图函数的功能。

2） 设计模板文件的名字。

**以下为案例中的简单设计过程：**

1）完成图书信息的展示：

a) 设计url，通过浏览器访问 [http://127.0.0.1:8000/books/ 时显示图书信息页面](http://127.0.0.1:8000/books/ 时显示图书信息页面)。

b) 设计url对应的视图函数show_books。

查询出所有图书的信息，将这些信息传递给模板文件。

c) 编写模板文件show_books.html。

遍历显示出每一本图书的信息。

2) 完成点击某本图书时，显示出图书里所有英雄信息的页面。

a) 设计url,通过访问http://127.0.0.1:8000/数字/时显示对应的英雄信息页面。

这里数字指点击的图书的id。

​		b）设计对应的视图函数detail。

​			接收图书的id,根据id查询出相应的图书信息，然后查询出图书中的所有英雄信息。

b) 编写模板文件detail.html。

# ***\*模型\****

## ***\*Django ORM\****

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps17.png) 

O：(objects)->类和对象。

R：(Relation)->关系，关系数据库中的表格。

M：（Mapping）->映射。

**ORM框架的功能：**

a) 能够允许我们通过面向对象的方式来操作数据库。

b) 可以根据我们设计的模型类帮我们自动生成数据库中的表格。

c) 通过方便的配置就可以进行数据库的切换。

## ***\*数据库配置\****

**mysql命令回顾：**

登录mysql数据库：mysql –uroot –p 

查看有哪些数据库：show databases;

创建数据库：create database test2 **charset=utf8****;** #切记：指定编码

使用数据库：use test2;

查看数据库中的表：show tables;

Django配置使用mysql数据库：

修改settings.py中的DATABASES。

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps18.jpg) 

注意：django框架不会自动帮我们生成mysql数据库，所以我们需要自己去创建。

切换mysql数据库之后不能启动服务器：

安装mysqlPython包: 

**python2：**

 pip install mysql-python

**python3:**

安装pymysql:

 pip install pymysql

在test1/__init__.py中加如下内容：

import pymysql

pymysql.install_as_MySQLdb()

## ***\*复习案例\****

1) 设计模型类并生成表

a) 设计BookInfo,增加属性bread和bcomment，另外设置软删除标记属性isDelete。

b) 设计HeroInfo类，增加软删除标记属性isDelete。

软删除标记：删除数据时不做真正的删除，而是把标记位置1表示删除，防止重要的数据丢失。

2) 编写视图函数并配置URL。

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps19.png) 

页面重定向：服务器不返回页面，而是告诉浏览器再去请求其他的url。

3）创建模板文件。

**拆解功能：**

1) 图书信息展示页。

a) 设计url，通过浏览器访问 [http://127.0.0.1:8000/index/ 时显示图书信息页面](http://127.0.0.1/index/ 时显示图书信息页面)。

b) 设计url对应的视图函数index。

查询出所有图书的信息，将这些信息传递给模板文件。

c) 编写模板文件index.html。

遍历显示出每一本图书的信息并增加新建和删除超链接。

2）图书信息新增。

a）设计url，通过浏览器访问 http://127.0.0.1:8000/create/时向数据库中新增一条图书信息。

b) 设计url对应得视图函数create。

3）图书信息删除。

a）设计url，通过浏览器访问 http://127.0.0.1:8000/delete数字/删除数据库中对应的一条图书数据。

​	数字是点击的图书的id。

c) 设计url对应得视图函数delete。

在写地址的时候，规范必须安装下面的方式写

正确：<a href=”/create”></a>

错误：<a href=”create”></a>

如果按错误的来，在重定向的时候

比如现在访问的是/idnex/

点击a标签时会返回/index/create

而正确的是 /index/  替换为  /create

## ***\*字段属性和选项\****

**属性命名限制：**

1）不能是python的保留关键字。

2）不允许使用连续的下划线，这是由django的查询方式决定的。

3）定义属性时需要指定字段类型，通过字段类型的参数指定选项，语法如下：

属性名=models.字段类型(选项)

 

**字段类型**

使用时需要引入django.db.models包，字段类型如下：

**AutoField：**自动增长的IntegerField，通常不用指定，不指定时Django会自动创建属性名为id的自动增长属性。

**BooleanField：**布尔字段，值为True或False。

**NullBooleanField：**支持Null、True、False三种值。

CharField(max_length=字符长度)：字符串。

参数max_length表示最大字符个数。

**TextField：**大文本字段，一般超过4000个字符时使用。

**IntegerField：**整数。

**DecimalField**(max_digits=None, decimal_places=None)：十进制浮点数。

参数max_digits表示总位数。

参数decimal_places表示小数位数。

**FloatField：**浮点数。

**DateField****：**[auto_now=False, auto_now_add=False])：日期。

参数auto_now表示每次保存对象时，自动设置该字段为当前时间，用于"最后一次修改"的时间戳，它总是使用当前日期，默认为false。

参数auto_now_add表示当对象第一次被创建时自动设置当前时间，用于创建的时间戳，它总是使用当前日期，默认为false。

参数auto_now_add和auto_now是相互排斥的，组合将会发生错误。

**TimeField：**时间，参数同DateField。

**DateTimeField：**日期时间，参数同DateField。

**FileField：**上传文件字段。

**ImageField：**继承于FileField，对上传的内容进行校验，确保是有效的图片。

 

**选项**

通过选项实现对字段的约束，选项如下：

**null：**如果为True，表示允许为空，默认值是False。

**blank：**如果为True，则该字段允许为空白，默认值是False。

对比：null是数据库范畴的概念，blank是表单验证证范畴的。

**db_column：**字段的名称，如果未指定，则使用属性的名称。

**db_index：**若值为True, 则在表中会为此字段创建索引，默认值是False。

**default：**默认值。

**primary_key：**若为True，则该字段会成为模型的主键字段，默认值是False，一般作为AutoField的选项使用。

**unique：**如果为True, 这个字段在表中必须有唯一值，默认值是False。

## ***\*查询\****

**查看mysql的日志文件：**

1) sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf 68 69行

2) sudo service mysql restart 重启mysql服务

3) /var/log/mysql/mysql.log 	#mysql操作的记录文件。

4) sudo tail -f /var/log/mysql/mysql.log #实时查看mysql文件的内容。

所有的查询记录都会在里面有记录

模型类.objects

**g****et():返回表中满足条件的****一条且只能有一条****数据。**

**返回一个对象**

如果查到多条数据，则抛异常：MultipleObjectsReturned

查询不到数据，则抛异常：DoesNotExist

例：查询图书id为3的图书信息。

 

**all():返回模型类对应表格中的所有数据。****QuerySet类型****，查询集**

例：查询图书所有信息。

**filter():参数写查询条件，返回满足条件的数据。****QuerySet**

**哪些地方可以写查询的条件** get  filter exclude  都可以用

 

条件格式：

​	模型类属性名__条件名=值

查询图书评论量为34的图书的信息：

**1.**	**判等 exact****。**

例：查询编号为1的图书。

BookInfo.objects.get(id=1) ===  BookInfo.objects.get(id__exact=1)

**2.**	**模糊查询**

例：查询书名包含'传'的图书。contains

BookInfo.objects.filter(btitle__contains='传')

例：查询书名以'部'

结尾的图书 endswith 

开头:startswith

BookInfo.objects.filter(btitle__endswith='部')

**3.**	**空查询** **isnull select \* from booktest_bookinfo where title is not null;**

例：查询书名不为空的图书。isnull 

BookInfo.objects.filter(btitle__isnull=False)

**4.**	**范围查询** in select * from booktest_bookinfo where id in (1,3,5)

例：查询编号为1或3或5的图书。

BookInfo.objects.filter(id__in = [1,3,5])

**5.**	**比较查询** 

例：查询编号大于3的图书。gt(greate than)  大于 lt(less than)小于 gte(equal) 大于等于 lte 小于等于

BookInfo.objects.filter(id__gt = 3)

 

**6.**	**日期查询**

例：查询1980年发表的图书。

BookInfo.objects.filter(bpub_date__year=1980) 1980年以后

BookInfo.objects.filter(bpub_date__moth=5) 5月以后

 

例：查询1980年1月1日后发表的图书。

from datetime import date

BookInfo.objects.filter(bpub_date__gt = date(1980,1,1))

 

**exclude:返回不满足条件的数据****。****QuerySet**  **可以传多个**

例：查询id不为3的图书信息。

BookInfo.objects.exclude(id=3)

BookInfo.objects.exclude(id=[1,2,3])

**o****rde****r_by** ***\*对查询结果进行排序  返回查询集的对象\****   **QuerySet**

**作用：**进行查询结果进行排序。

例：查询所有图书的信息，按照id从小到大进行排序。

BookInfo.objects.all().order_by('id')

BookInfo.objects.order_by('id')

例：查询所有图书的信息，按照id从大到小进行排序。

BookInfo.objects.all().order_by('-id')

例：把id大于3的图书信息按阅读量从大到小排序显示；

BookInfo.objects.filter(id__gt=3).order_by('-bread')

 

安照id从小到大   BookInfo.objects.all().order_by(‘id’)

按照id从大到小	BookInfo.objects.all().order_by(‘-id’) 降序  id前加 - 

Id大于3的图书按阅读量从大到小进行排序  

BookInfo.objects.filter(id__gt = 3).order_by(‘-bread’) 

对一个模型的所有数据进行排序的时候，.all可以省略

 

函数里面可以写多个条件  ， 条件之间是且的关系  

## ***\*F对象\****

**作用：**用于类属性之间的比较条件。

**使用之前需要****先导入**：

from django.db.models import F

例：查询图书阅读量大于评论量图书信息。

BookInfo.objects.filter(bread__gt = F('bcomment'))

例：查询图书阅读量大于2倍评论量图书信息。

BookInfo.objects.filter(bread__gt = F('bcomment')*2)

## ***\*Q对象\****

**作用：**用于查询时的逻辑条件。not and or，可以对Q对象进行&|~操作。

**使用之前需要先导入：**

from django.db.models import Q

例：查询id大于3且阅读量大于30的图书的信息。

BookInfo.objects.filter(id__gt=3, bread__gt=30)  直接写多个条件，默认是且的关系

BookInfo.objects.filter(Q(id__gt=3) & Q(bread__gt=30))   也可以这样写

例：查询id大于3或者阅读量大于30的图书的信息。

BookInfo.objects.filter(Q(id__gt=3) | Q(bread__gt=30))

例：查询id不等于3图书的信息。

BookInfo.objects.filter(~Q(id=3))

## ***\*聚合函数\**** 

**作用：**对查询结果进行聚合操作。

sum count max min avg

**aggregate：调用这个函数来使用聚合。** **返回值是一个字典**

**使用前需先导入****聚合类****：** 

from django.db.models import Sum,Count,Max,Min,Avg

例：查询所有图书的数目。Count  这里省略了.all

BookInfo.objects.aggregate(Count('id')) 写具体的属性

返回值类型: {'id__count': 5}

例：查询所有图书阅读量的总和。 这里省略了.all

BookInfo.objects.aggregate(Sum('bread'))

{'bread__sum': 126}

**count函数** **返回值是一个数字**

作用：统计满足条件数据的数目。

例：统计所有图书的数目。 这里省略了.all

BookInfo.objects.count() 

例：统计id大于3的所有图书的数目。 

BookInfo.objects.filter(id__gt=3).count()  不是针对所有数据

**查询相关函数返回值总结：**

get:		返回一条且只能有一条，返回一个对象 ，参数可以写查询对象

all:	QuerySet 返回所有数据  参数里面什么都不用谢

filter:	QuerySet 返回满足条件的数据 参数中可以写查询条件 

exclude:		QuerySet 返回不满条件的数据  参数中可以写查询条件 

order_by:	对查询结果进行排序 参数中可以写排序字段

F对象用于属性之间的比较；使用前导入

Q对象用于条件之间的逻辑关系  使用前导入

from django.db.models import Sum,Count,Max,Min,Avg

aggregate: 字典 进行聚合操作  进行聚合的时候需要先导入聚合类

count: 数字 返回查询集中数据的数目 

get,filter,exclude参数中可以写查询条件。

对于一个QuerySet 实例对象可以继续调用上面的所有函数

## ***\*查询集\****

all, filter, exclude, order_by调用这些函数会产生一个查询集，可以在查询集上继续调用这些函数。

**查询集特性：**

1） 惰性查询：只有在实际使用查询集中的数据的时候才会发生对数据库的真正查询。

books = BookInfo.objects.all()  这样是不会去数据库进行查询的

books进行打印的时候才会去数据库进行查询

2） 缓存：当使用的是同一个查询集时，第一次的时候会发生实际数据库的查询，然后把结果缓存起来，之后再使用这个查询集时，使用的是缓存中的结果。

books = BookInfo.objects.filter(id__gt=3)  这样是不会去数据库进行查询的

使用的时候才会查询  [x for x in books]   第一次会去数据库查询

再次使用[x for x in books]  的时候不会去查询

 

**限制查询集：**

可以对一个查询集进行取下标或者切片操作来限制查询集的结果。

对一个查询集进行切片会产生一个新的查询集，和原来的无关系

books = BookInfo.objects.all()   创建查询集

books3 = books [0:1]  books3 也为一个查询集  在切片里面不为负数

b[0]就是取出查询集的第一条数据，b[0:1].get()也可取出查询集的第一条数据。如果b[0]不存在，会抛出IndexError异常，

如果b[0:1].get()不存在，会抛出DoesNotExist异常。

多条时抛MultiObjectsReturned

对一个查询集进行切片操作**会产生一个新的查询集**，下标不允许为负数。

**e****xists:****判断一个查询集中是否有数据。True False**

books = BookInfo.objects.all()  

books.**e****xists****()  true代表有数据，false表示查询集无数据**

## ***\*模型类关系\****

1） 一对多关系

例：图书类-英雄类 

models.ForeignKey() 定义在多的类中。

2） 多对多关系

例：新闻类-新闻类型类 体育新闻 国际

models.定义在哪个类中都可以。

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps20.jpg) 

3） 一对一关系

例：员工基本信息类-员工详细信息类. 员工工号

models.OneToOneField定义在哪个类中都可以。

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps21.jpg) 

## ***\*关联查询（\*******\*一对多\*******\*）\****

在一对多关系中，一对应的类我们把它叫做一类，多对应的那个类我们把它叫做多类，我们把多类中定义的建立关联的类属性叫做关联属性。

例：查询图书id为1的所有英雄的信息。

​	book = BookInfo.objects.get(id=1)

​	book.heroinfo_set.all()

**通过模型类查询：**

​	HeroInfo.objects.filter(hbook_id=1)

例：查询id为1的英雄所属图书信息。

​	hero =HeroInfo.objects.get(id=1)

​	hero.hbook

**通过模型类查询：**

BookInfo.objects.filter(heroinfo__id=1)

​	

 

 

**格式：**

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps22.png) 

由一类的对象查询多类的时候：

​	一类的对象.多类名小写_set.all() #查询所用数据

由多类的对象查询一类的时候：

​	多类的对象.关联属性  #查询多类的对象对应的一类的对象

由多类的对象查询一类对象的id时候：

​	多类的对象. 关联属性_id

**通过模型类实现关联查询：**

例：查询图书信息，要求图书中英雄的描述包含'八'。

BookInfo.objects.filter(heroinfo__hcomment__contains='八')

例：查询图书信息，要求图书中的英雄的id大于3.

BookInfo.objects.filter(heroinfo__id__gt=3)

例：查询书名为“天龙八部”的所有英雄。

HeroInfo.objects.filter(hbook__btitle='天龙八部')、

***\*查寻的哪个类，前面写什么类，写关联查询条件时，如果类中没有关系属性，条件需要写对应类的名，如果类中有关系属性，直接写关系属性\****

通过多类的条件查询一类的数据：

​	一类名.objects.filter(多类名小写__多类属性名__条件名) 

通过一类的条件查询多类的数据：

​	多类名.objects.filter(关联属性__一类属性名__条件名)

## ***\*插入、更新和删除\****

调用一个模型类对象的save方法的时候就可以实现对模型类对应数据表的插入和更新。

调用一个模型类对象的delete方法的时候就可以实现对模型类对应数据表数据的删除。

## ***\*自关联\****

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps23.png) 

自关联是一种特殊的一对多的关系。

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps24.jpg) 

案例：显示广州市的上级地区和下级地区。

地区表：id, title, parenteid;

mysql终端中批量执行sql语句：source areas.sql; 

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps25.jpg) 

## ***\*管理器\****

BookInfo.objects.all()->objects是一个什么东西呢？

答：objects是Django帮我自动生成的管理器对象，通过这个管理器可以实现对数据的查询。

objects是models.Manger类的一个对象。自定义管理器之后Django不再帮我们生成默认的objects管理器。

查询一个类表里面的数据  就需要models.Manager类的对象objects

Djano给每一个模型类生成一个objects模型对象  是Manager类的对象

如果不使用他们的，可以自定义一个

 

1) 自定义一个管理器类，这个类继承models.Manger类。

\1. 直接写对象

book = models.Manager()

自定义管理器对象后，他不在会定义objects

使用的时候BookInfo.book.all()

2) 再在具体的模型类里定义一个自定义管理器类的对象。

通过自定义类去继承

class BookInfoManager(models.Manager):

 Pass

class BookInfo(models.Model):

 object = BookInfoManager()

使用：

导入类

from booktest.models import BookInfo

BookInfo.objects

 

自定义管理器类的应用场景：

1） 改变查询的结果集。

比如调用BookInfo.books.all()返回的是没有删除的图书的数据。

可以重写父类的方法；

def all(self):

 books = super().all()  调用父类的方法  返回查询集

books = books.filter(isDelete=False)

return books 

2） 添加额外的方法。

管理器类中定义一个方法帮我们创建对应的模型类对象。

使用self.model()就可以创建一个跟自定义管理器对应的模型类对象。

 

 

 

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps26.jpg) 

每次改完都需重新进交互终端

book = BookInfo.create_book(‘test’,’1990-1-1’)

封装函数： 操作模型类对应的数据表  增删改查的方法都可以写模型管理器里面。

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps27.jpg) 

book = BookInfo.objects.create_book(‘test2’,’1990-1-1’)

 

Manager自带的创建数据的方法，使用的时侯通过关键字传参

book = BookInfo.objects.create(btitle = ‘test2’,bpub, date = ’1990-1-1’)

每一个模型管理器对象都有一个属性；self.model，获取self所在的原型链![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps28.jpg)

即时其他类发生变化，里面的类也无需发生变化

**小结:**

![img](file:///C:\Users\EDZ\AppData\Local\Temp\ksohtml8736\wps29.jpg) 

## **1.** ***\*元选项\****

**Django默认生成的表名：**

​	应用名小写_模型类名小写。

模型类对应的表名已经生成  booktest_bookinfo  当应用名发生变化的时候，找不到booktest了，这时怎么办；

答：
模型类对应的表名不依赖应用的名字；

**元选项：**

需要在模型类中定义一个元类Meta,在里面定义一个类属性db_table就可以指定表名。

Class Meta:

 db_table = ‘bookinfo’ 指定模型类对应的表明  db_table固定的

修改完需要重新执行迁移

先改表名，可以在修改应用名

如果sql里面有之前写的应用名。不想改这个名字，可以在这个类里面定义一个表名

Class Meta:

 db_table = ‘areas’

 