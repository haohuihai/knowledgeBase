# knowledgebase
## 说明

该仓库主要记录一些我在平时遇到的技术知识

## 访问

https://haohuihai.github.io/knowledgebase/

## 不定期更新

### 通过circle来实现自动化构建和部署

其中部署文件在.circleci文件夹下的config.yml中配置的

### 1.1、代码法
    <div style='display:none'>
        哈哈哈哈，看不到我的我隐藏的很深
    </div>
### 1.2、html注释语法
    <!--哈哈哈哈，我是注释，不会在浏览器中显示-->
### 1.3、markdown注释语法
    [//]: # (注释，不会在浏览器中显示)
    [^_^]: # (我是注释)
    [//]: <> (我是注释)
    [comment]: <> (我是注释)
### 代码提交

在main分支上合并是文档主代码，在gh-pages上进行构建

以后提交代码都提交到main上，或者新开分支，合并到main上

### 一些提交命令
git回退到某个commit

git reset --hard HEAD^ 回退到上个版本  ^代表前一个，^^代表前两个 一次类推


git reset --hard commit_id 退到/进到 指定的commit

git push origin HEAD -- force 强退至远程

git回退到某个commit 推送远程

1.先查询对应的提交历史，使用如下命令：

git log --pretty=oneline

2、版本回退，使用如下命令：

git reset --soft commitID //只删除commitID之后的提交记录log，代码的改动还在。

git reset --hard commitID //彻底删除commitID之后所做的改动，代码也一起回退回来了。

(慎重用，用前最好备份一下代码，或者用git diff 生成一个patch)

3.把当前分支push到远程仓库并且让远程仓库和当前分支保持一致,使用如下命令(假定当前分支为master)：

git push -f origin master

在github设置上面，得设置页面展示分支，也就是构建好之后的分支，在构建的时候默认会创建一个预览的分支，选中创建好的那个预览分支就可以了


