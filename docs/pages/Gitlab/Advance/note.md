# 工具链集成



### 模板库设计



为了实现模板复用，减少重复代码。本次课程开始我们将使用模板库来完成流水线。开始之前还是要把语法学好便于进一步实施。

创建一个git仓库用于存放模板`demo/demo-gitlabci-service ` ，然后创建一个template目录存放所有pipeline的模板，创建一个jobs目录存放job模板。

![images](images/001.png)



这样我们可以将一些maven、ant、gradle、npm工具通过一个job模板和不同的构建命令实现。templates的好处是我们在其中定义了模板流水线，这些流水线可以直接让项目使用。当遇到个性化项目的时候就可以在当前项目创建.gitlab-ci.yml文件来引用模板文件，再进一步实现个性化需要。



### 模板库信息

github : https://github.com/zeyangli/gitlabci-templates






## 集成构建工具



嘿嘿，大家好。 构建工具是用来将代码编译打包成制品的工具。例如前端项目我们一般使用npm进行打包，后端java项目我们一般使用maven、gradle进行打包。构建工具很多很多，但是集成到gitlab中是一样的。所以这里简单介绍使用gitlabCI集成npm/maven完成前后端项目的构建。



###  软件包下载

- [maven软件包下载](http://maven.apache.org/download.cgi)
- [gradle软件包下载](https://downloads.gradle.org/distributions/gradle-5.3-bin.zip)
- [ant软件包下载](https://ant.apache.org/bindownload.cgi)
- [node软件包下载](https://nodejs.org/en/download/)

---



### 环境配置

首先，我们需要在runner机器中安装配置好apache-maven。

```
#解压
tar zxf apache-maven-xxxx.tar.gz  -C /usr/local
tar zxf gradle-xxxx.tar.gz -C /usr/local
tar zxf node-xxxxx.tar.gz -C /usr/local
tar zxf apache-ant-xxxx.tar.gz -C /usr/local

#添加环境变量
vim /etc/profile
export MAVEN_HOME=/usr/local/apache-maven-3.6.0
export ANT_HOME=/usr/local/apache-ant-1.10.5
export GRADLE_HOME=/usr/local/gradle-5.3
export NODE_HOME=/usr/local/node-v10.15.3-linux-x64
export JAVA_HOME=/usr/local/jdk1.8.0_201
export PATH=$PATH:$MAVEN_HOME/bin:$ANT_HOME/bin:$GRADLE_HOME/bin:$NODE_HOME/bin
export PATH=$PATH:$JAVA_HOME/bin

# 生效全局环境变量
source /etc/profile   
```

---



### maven集成模板库配置

我们首先在jobs目录中创建一个build.yml，然后在里面编写build作业模板。

```
.build:
  stage: build
  tags:
    - build
  script: 
    - $BUILD_SHELL
    - ls
```

我们计划将测试相关的job都定义在jobs/test.yml中，我们开始创建并编写test作业。运行测试shell并收集单元测试报告。

```
#单元测试

.test:
  stage: test
  tags:
    - build
  script:
    - $TEST_SHELL
    - ls 
  artifacts:
    reports:
      junit: ${JUNIT_REPORT_PATH}

```



然后我们在template目录中创建maven流水线模板。 templates/java-pipeline.yml

```
include:
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/build.yml'
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/test.yml'

variables:
  BUILD_SHELL: 'mvn clean package  -DskipTests'  ##构建命令
  CACHE_DIR: 'target/'
  TEST_SHELL : 'mvn test'                                   ##测试命令
  JUNIT_REPORT_PATH: 'target/surefire-reports/TEST-*.xml'   ##单元测试报告
  
cache:
  paths:
    - ${CACHE_DIR}
    
stages:
  - build
  - test


build:
  stage: build
  extends: .build

test:
  stage: test
  extends: .test
```



最后我们在项目中添加.gitlab-ci.yml来引用模板构建流水线。

```
include:
    - project: 'cidevops/cidevops-gitlabci-service'
      ref: master
      file: 'templates/java-pipeline.yml'
  
variables:
  BUILD_SHELL: 'mvn clean package  -DskipTests'  
  TEST_SHELL: 'mvn  test'
  CACHE_DIR: 'target/'

```

---

![images](images/003.png)

好的，上面我们已经实现了构建，但是一般还回运行单元测试。接下来我们实现。

----



### npm

template/web-pipeline.yml

```
include:
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/build.yml'
    
variables:
  BUILD_SHELL: 'npm run build'     ##构建命令                                   
  CACHE_DIR  : "dist/"             ##构建缓存
  

cache:
  paths:
    - ${CACHE_DIR}
    - node_modules/
    
stages:
  - install
  - build
  
install:
  stage: install
  script:
    - 'npm install'
    
build:
  stage: build
  extends: .build

```



---


## 集成sonarqube



### 内容

- SonarQube基础简介
- 配置GitLabCI代码扫描
- 配置GitLabCI合并扫描



---

## 准备工作

参考链接：https://docs.sonarqube.org/latest/analysis/gitlab-cicd/

扩展插件：  https://github.com/mc1arke/sonarqube-community-branch-plugin/releases

参考文章：[http://119.3.228.122/jenkins/pipelineintegrated/chapter04/#%E9%85%8D%E7%BD%AE%E5%A4%9A%E5%88%86%E6%94%AF](http://119.3.228.122/jenkins/pipelineintegrated/chapter04/#配置多分支)

Gitlab内置环境变量： http://192.168.1.200:30088/help/ci/variables/README#variables

在SonarQube中创建项目组添加用户，为用户分配权限。使用用户token分析扫描项目。



#### 准备用户

![images](images/04.png)

创建群组

![images](images/01.png)

创建权限模板

![images](images/02.png)

分配权限,一般给这个组中的成员管理员权限

![images](images/03.png)





为项目授权权限模板

![images](images/05.png)



添加token

![images](images/06.png)





### 扫描分析

jobs/codeanalysis.yml

```
.codeanalysis-java:
  stage: code_analysis
  tags:
    - build
  script:
    - echo $CI_MERGE_REQUEST_IID $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME  $CI_MERGE_REQUEST_TARGET_BRANCH_NAME
    - "$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectKey=${CI_PROJECT_NAME} \
                                      -Dsonar.projectName=${CI_PROJECT_NAME} \
                                      -Dsonar.projectVersion=${CI_COMMIT_REF_NAME} \
                                      -Dsonar.ws.timeout=30 \
                                      -Dsonar.projectDescription=${CI_PROJECT_TITLE} \
                                      -Dsonar.links.homepage=${CI_PROJECT_URL} \
                                      -Dsonar.sources=${SCAN_DIR} \
                                      -Dsonar.sourceEncoding=UTF-8 \
                                      -Dsonar.java.binaries=target/classes \
                                      -Dsonar.java.test.binaries=target/test-classes \
                                      -Dsonar.java.surefire.report=target/surefire-reports \
                                      -Dsonar.branch.name=${CI_COMMIT_REF_NAME}"
  artifacts:
    paths:
      - "$ARTIFACT_PATH"

```



template/java-pipeline.yml

```
include:
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/build.yml'
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/test.yml'
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/codeanalysis.yml'

variables:
  BUILD_SHELL: 'mvn clean package  -DskipTests'  ##构建命令
  CACHE_DIR: 'target/'
  TEST_SHELL : 'mvn test'                                   ##测试命令
  JUNIT_REPORT_PATH: 'target/surefire-reports/TEST-*.xml'   ##单元测试报告
  # 代码扫描
  SCANNER_HOME : "/usr/local/buildtools/sonar-scanner-3.2.0.1227-linux"
  SCAN_DIR : "src"
  ARTIFACT_PATH : 'target/*.jar'                            ##制品目录

  
cache:
  paths:
    - ${CACHE_DIR}
    
stages:
  - build
  - test
  - code_analysis


build:
  stage: build
  extends: .build
  rules:
    - when: on_success


test:
  stage: test
  extends: .test
  rules:
    - when: on_success

  
code_analysis:
  stage: code_analysis
  extends: .codeanalysis-java

```





实现效果

![images](images/004.png)



---



### Pull request集成

配置SonarQube，添加gitlabtoken 和服务信息。系统设置 -> pull request。

注意下面的配置在配置文件中定义不生效哦，可能是因为版本的问题导致的。暂且忽略。

```
com.github.mc1arke.sonarqube.plugin.branch.pullrequest.gitlab.token=b8Gs1quX5GSeHwyuMWyY
com.github.mc1arke.sonarqube.plugin.branch.pullrequest.gitlab.url=http://192.168.1.200:30088
sonar.pullrequest.provider=GitlabServer
```

如果你想通过API操作可以参考：

```
curl -u “ $ SONAR_API_TOKEN ” -X POST “ http://sonarqube.example.com/api/settings/set?key=sonar.pullrequest.provider&value=GitlabServer ” 
curl -u “ $ SONAR_API_TOKEN ” -X POST “ http： //sonarqube.example.com/api/settings/set?key=com.github.mc1arke.sonarqube.plugin.branch.pullrequest.gitlab.url&value=http://gitlab.example.com “ 
curl -u ” $ SONAR_API_TOKEN “ -X POST ” http://sonarqube.example.com/api/settings/set?key=com.github.mc1arke.sonarqube.plugin.branch.pullrequest.gitlab.token&value= $ GITLAB_TOKEN “
```



![images](images/10.png)



添加扫描作业，主要是分析参数。

```
.codeanalysis-mr:
  stage: code_analysis
  only:
    - merge_requests
  tags:
    - build
  script:
    - "$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectKey=${CI_PROJECT_NAME} \
                                      -Dsonar.projectName=${CI_PROJECT_NAME} \
                                      -Dsonar.projectVersion=${CI_COMMIT_REF_NAME} \
                                      -Dsonar.ws.timeout=30 \
                                      -Dsonar.projectDescription=${CI_PROJECT_TITLE} \
                                      -Dsonar.links.homepage=${CI_PROJECT_URL} \
                                      -Dsonar.sources=${SCAN_DIR} \
                                      -Dsonar.sourceEncoding=UTF-8 \
                                      -Dsonar.java.binaries=target/classes \
                                      -Dsonar.java.test.binaries=target/test-classes \
                                      -Dsonar.java.surefire.report=target/surefire-reports \
                                      -Dsonar.pullrequest.key=${CI_MERGE_REQUEST_IID} \
                                      -Dsonar.pullrequest.branch=${CI_MERGE_REQUEST_SOURCE_BRANCH_NAME} \
                                      -Dsonar.pullrequest.base=${CI_MERGE_REQUEST_TARGET_BRANCH_NAME}  \
                                      -Dsonar.gitlab.ref_name=${CI_COMMIT_REF_NAME} \
                                      -Dsonar.gitlab.commit_sha=${CI_COMMIT_SHA}  \
                                      -Dsonar.gitlab.project_id=${CI_PROJECT_PATH} \
                                      -Dsonar.pullrequest.gitlab.repositorySlug=$CI_PROJECT_ID "
                                      
                                      #-Dsonar.branch.name=${CI_COMMIT_REF_NAME} -X "


```



templates/java-pipeline.yml

```
include:
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/build.yml'
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/test.yml'
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/codeanalysis.yml'

variables:
  BUILD_SHELL: 'mvn clean package  -DskipTests'  ##构建命令
  CACHE_DIR: 'target/'
  TEST_SHELL : 'mvn test'                                   ##测试命令
  JUNIT_REPORT_PATH: 'target/surefire-reports/TEST-*.xml'   ##单元测试报告
  # 代码扫描
  SCANNER_HOME : "/usr/local/buildtools/sonar-scanner-3.2.0.1227-linux"
  SCAN_DIR : "src"
  ARTIFACT_PATH : 'target/*.jar'                            ##制品目录

  
cache:
  paths:
    - ${CACHE_DIR}
    
stages:
  - build
  - test
  - code_analysis


build:
  stage: build
  extends: .build
  rules:
    - when: on_success


test:
  stage: test
  extends: .test
  rules:
    - when: on_success

  
code_analysis:
  stage: code_analysis
  extends: .codeanalysis-java
  
codeanalysis_mr:
  stage: code_analysis
  extends: .codeanalysis-mr
```



创建合并请求运行流水线，最终效果。

![images](images/11.png)





---


# 制品库集成

## artifactory

```
.build:
  stage: build
  tags:
    - build
  script: 
    - $BUILD_SHELL
    - ls

.deploy-artifact:
  stage: deploy-artifact
  tags:
    - build
  script:
    - curl -u${ARTIFACT_USER}:${ARTIFACT_PASSWD} -T ${ARTIFACT_PATH} "$ARTIFACTORY_URL/$ARTIFACTORY_NAME/$TARGET_FILE_PATH/$TARGET_ARTIFACT_NAME"
```

定义变量

![iamges](images/14.png)

template

```
include:
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/build.yml'
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/test.yml'
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/codeanalysis.yml'

variables:
  BUILD_SHELL: 'mvn clean package  -DskipTests'  ##构建命令
  CACHE_DIR: 'target/'
  TEST_SHELL : 'mvn test'                                   ##测试命令
  JUNIT_REPORT_PATH: 'target/surefire-reports/TEST-*.xml'   ##单元测试报告
  # 代码扫描
  SCANNER_HOME : "/usr/local/buildtools/sonar-scanner-3.2.0.1227-linux"
  SCAN_DIR : "src"
  ARTIFACT_PATH : 'target/*.jar'                            ##制品目录

  #上传制品库
  ARTIFACTORY_URL: "http://192.168.1.200:30082/artifactory"
  ARTIFACTORY_NAME: "cidevops"
  TARGET_FILE_PATH: "$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/$CI_COMMIT_REF_NAME-$CI_COMMIT_SHORT_SHA-$CI_PIPELINE_ID"
  TARGET_ARTIFACT_NAME: "$CI_PROJECT_NAME-$CI_COMMIT_REF_NAME-$CI_COMMIT_SHORT_SHA-$CI_PIPELINE_ID.jar"



cache:
  paths:
    - ${CACHE_DIR}

stages:
  - build
  - test
  - parallel01


build:
  stage: build
  extends: .build
  rules:
    - when: on_success


test:
  stage: test
  extends: .test
  rules:
    - when: on_success


code_analysis:
  stage: parallel01
  extends: .codeanalysis-java

codeanalysis_mr:
  stage: parallel01
  extends: .codeanalysis-mr

deploy_artifact:
  stage: parallel01
  extends: .deploy-artifact
```

![iamges](images/15.png)

![images](images/12.png)

下载制品

```
.down-artifact:
  stage: down-artifact
  tags:
    - build
  script:
    - curl -u${ARTIFACT_USER}:${ARTIFACT_PASSWD} -O "$ARTIFACTORY_URL/$ARTIFACTORY_NAME/$TARGET_FILE_PATH/$TARGET_ARTIFACT_NAME"
    - ls
```

template

```
down_artifact:  
  stage: down_artifact
  extends: .down-artifact
```

---

![images](images/16.png)

---

![iamges](images/17.png)

---

## 镜像仓库

https://cr.console.aliyun.com/cn-beijing/instances/repositories

![images](images/18.png)

```
.build-docker:
  stage: buildimage
  tags:
    - build
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWD  $CI_REGISTRY
    - docker build -t ${IMAGE_NAME} -f ${DOCKER_FILE_PATH} .
    - docker push ${IMAGE_NAME} 
    - docker rmi ${IMAGE_NAME} 
```

```
include:
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/build.yml'
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/test.yml'
  - project: 'cidevops/cidevops-gitlabci-service'
    ref: master
    file: 'jobs/codeanalysis.yml'

variables:
  BUILD_SHELL: 'mvn clean package  -DskipTests'  ##构建命令
  CACHE_DIR: 'target/'
  TEST_SHELL : 'mvn test'                                   ##测试命令
  JUNIT_REPORT_PATH: 'target/surefire-reports/TEST-*.xml'   ##单元测试报告
  # 代码扫描
  SCANNER_HOME : "/usr/local/buildtools/sonar-scanner-3.2.0.1227-linux"
  SCAN_DIR : "src"
  ARTIFACT_PATH : 'target/*.jar'                            ##制品目录

  #上传制品库
  ARTIFACTORY_URL: "http://192.168.1.200:30082/artifactory"
  ARTIFACTORY_NAME: "cidevops"
  TARGET_FILE_PATH: "$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/$CI_COMMIT_REF_NAME-$CI_COMMIT_SHORT_SHA-$CI_PIPELINE_ID"
  TARGET_ARTIFACT_NAME: "$CI_PROJECT_NAME-$CI_COMMIT_REF_NAME-$CI_COMMIT_SHORT_SHA-$CI_PIPELINE_ID.jar"

  #构建镜像
  CI_REGISTRY: 'registry.cn-beijing.aliyuncs.com'
  CI_REGISTRY_USER: '610556220zy'
  #CI_REGISTRY_PASSWD: 'xxxxxxxx.'
  IMAGE_NAME: "$CI_REGISTRY/$CI_PROJECT_PATH:$CI_COMMIT_REF_NAME-$CI_COMMIT_SHORT_SHA-$CI_PIPELINE_ID"
  DOCKER_FILE_PATH: "./Dockerfile"



cache:
  paths:
    - ${CACHE_DIR}

stages:
  - build
  - test
  - parallel01
  - down_artifact


build:
  stage: build
  extends: .build
  rules:
    - when: on_success


test:
  stage: test
  extends: .test
  rules:
    - when: on_success


code_analysis:
  stage: parallel01
  extends: .codeanalysis-java

codeanalysis_mr:
  stage: parallel01
  extends: .codeanalysis-mr

deploy_artifact:
  stage: parallel01
  extends: .deploy-artifact

down_artifact:  
  stage: down_artifact
  extends: .down-artifact


build_image:
  stage: parallel01
  extends: .build-docker
```

![images](images/20.png)

![iamges](images/19.png)

---



# 自动化测试集成





## 开启gitlab pages

vim /etc/gitlab/gitlab.rb

```
##! Define to enable GitLab Pages
pages_external_url "http://pages.gitlab.com/"
gitlab_pages['enable'] = true
gitlab_pages['inplace_chroot'] = true


gitlab-ctl reconfigure
```

更新gitlab.yml文件

```
containers:
  - name: gitlab
  image: gitlab/gitlab-ce:12.9.0-ce.0
  imagePullPolicy: IfNotPresent
  ports:
    - containerPort: 30088
      name: web
      protocol: TCP
    - containerPort: 22
      name: agent
      protocol: TCP
    - containerPort: 80
      name: page
      protocol: TCP
```

开放80端口

```
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: gitlab
  name: gitlab
  namespace: devops
spec:
  type: NodePort
  ports:
    - name: web
      port: 30088
      targetPort: 30088
      nodePort: 30088
    - name: slave
      port: 22
      targetPort: 22
      nodePort: 30022
    - name: page
      port: 80
      targetPort: 80
      nodePort: 80
  selector:
    k8s-app: gitlab
```



![images](images/21.png)



完整的yaml参考github中。



FAQ：未开启chroot

https://gitlab.com/gitlab-org/gitlab-pages/-/issues/129

```
"Failed to bind mount /var/opt/gitlab/gitlab-rails/shared/pages on /tmp/gitlab-pages-1524473513642136363/pages. operation not permitted
```

---



### 运行自动化测试

在这里定义了两个stage，

interface_test作业用于运行自动化测试，此时自动化测试已经配置好ant+jmeter集成所以直接运行ant命令即可。考虑到每个人安装的jmeter环境目录不一致所以可以通过-D选项指定jmeterhome。运行完成接口测试后，测试报告在项目当前目录的`result/htmlfile`中。在此将测试报告整理成制品存放。

pages作业用于将测试报告中的html文件通过pages功能展示。首先获取interface_test作业的制品，然后将测试报告移动到public目录中。最后将public目录作为制品收集，有效期30天。



```
stages:
  - tests
  - deploy
  

interface_test:
  stage: tests
  tags:
    - build
  script:
    - ant -Djmeter.home=/usr/local/buildtools/apache-jmeter-5.2.1
  artifacts:
    paths:
      - result/htmlfile/
  
pages:
  stage: deploy
  dependencies:
    - interface_test
  script:
    - mv result/htmlfile/ public/
  artifacts:
    paths:
      - public
    expire_in: 30 days
  only:
    - master

```



效果：

![images](images/22.png)

---



### 上下游项目触发自动化测试



jobs/test.yml

```
.interfacetest:
  stage: interface_test
  trigger: 
    project: cidevops/cidevops-interfacetest-service
    branch: master
    strategy: depend

```

templates.yml

```
interfact_test:
  stage: interface_test
  extends: .interfacetest

```



![images](images/23.png)



---





## Kubernetes集成



#### 安装helm3

```
https://github.com/helm/helm/releases
tar -zxvf helm-v3.0.0-linux-amd64.tar.gz
mv linux-amd64/helm /usr/local/bin/helm
```



#### 配置chart 存储库

```
## 添加chart存储库
helm repo add gitlab https://charts.gitlab.io

## 验证源
helm repo list

##查询可以安装的gitlab-runner chart
helm search repo -l gitlab/gitlab-runner
```



#### 更新配置信息

```
## 获取相关版本的chart包
helm fetch gitlab/gitlab-runner --version=0.15.0
[root@zeyang-nuc-service ~]# ls
Desktop                        es
Documents                      gitlab-runner-0.15.0.tgz
```



values.yml

```
## GitLab Runner Image
##
## By default it's using gitlab/gitlab-runner:alpine-v{VERSION}
## where {VERSION} is taken from Chart.yaml from appVersion field
##
## ref: https://hub.docker.com/r/gitlab/gitlab-runner/tags/
##
image: gitlab/gitlab-runner:alpine-v12.9.0

## 镜像下载策略
imagePullPolicy: IfNotPresent

## Gitlab服务器地址
gitlabUrl: http://192.168.1.200:30088/

## runner注册token
runnerRegistrationToken: "JRzzw2j1Ji6aBjwvkxAv"

## 终止之前注销所有跑步者
unregisterRunners: true


## 当停止管道时等待其作业终止时间
terminationGracePeriodSeconds: 3600

## Set the certsSecretName in order to pass custom certficates for GitLab Runner to use
## Provide resource name for a Kubernetes Secret Object in the same namespace,
## this is used to populate the /home/gitlab-runner/.gitlab-runner/certs/ directory
## ref: https://docs.gitlab.com/runner/configuration/tls-self-signed.html#supported-options-for-self-signed-certificates
##
# certsSecretName:


## 配置最大并发作业数
concurrent: 10

## 新作业检查间隔
checkInterval: 30

## GitlabRunner日志级别 debug, info, warn, error, fatal, panic
logLevel: info

## Configure GitLab Runner's logging format. Available values are: runner, text, json
## ref: https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-global-section
##
# logFormat:

## For RBAC support:
rbac:
  create: true
  ## Define specific rbac permissions.
  resources: ["pods", "pods/exec", "secrets"]
  verbs: ["get", "list", "watch", "create", "patch", "delete"]

  ## Run the gitlab-bastion container with the ability to deploy/manage containers of jobs
  ## cluster-wide or only within namespace
  clusterWideAccess: false

  ## Use the following Kubernetes Service Account name if RBAC is disabled in this Helm chart (see rbac.create)
  ##
  # serviceAccountName: default

  ## Specify annotations for Service Accounts, useful for annotations such as eks.amazonaws.com/role-arn
  ##
  ## ref: https://docs.aws.amazon.com/eks/latest/userguide/specify-service-account-role.html
  ##
  # serviceAccountAnnotations: {}

## Configure integrated Prometheus metrics exporter
## ref: https://docs.gitlab.com/runner/monitoring/#configuration-of-the-metrics-http-server
metrics:
  enabled: true

## Configuration for the Pods that that the runner launches for each new job
##
runners:
  ## Default container image to use for builds when none is specified
  ##
  image: ubuntu:16.04

  ## Specify one or more imagePullSecrets
  ##
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # imagePullSecrets: []

  ## Specify the image pull policy: never, if-not-present, always. The cluster default will be used if not set.
  ##
  imagePullPolicy: "if-not-present"

  ## Defines number of concurrent requests for new job from GitLab
  ## ref: https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-runners-section
  ## 限制来自GitLab的对新作业的并发请求数
  requestConcurrency: 1

  ## Specify whether the runner should be locked to a specific project: true, false. Defaults to true.
  ##
  locked: false

  ## Specify the tags associated with the runner. Comma-separated list of tags.
  ##
  ## ref: https://docs.gitlab.com/ce/ci/runners/#using-tags
  ##
  tags: "kubernetes-runner,k8s"

  ## Specify if jobs without tags should be run.
  ## If not specified, Runner will default to true if no tags were specified. In other case it will
  ## default to false.
  ##
  ## ref: https://docs.gitlab.com/ce/ci/runners/#allowing-runners-with-tags-to-pick-jobs-without-tags
  ##
  runUntagged: true

  ## Specify whether the runner should only run protected branches.
  ## Defaults to False.
  ##
  ## ref: https://docs.gitlab.com/ee/ci/runners/#protected-runners
  ##
  protected: false

  ## Run all containers with the privileged flag enabled
  ## This will allow the docker:dind image to run if you need to run Docker
  ## commands. Please read the docs before turning this on:
  ## ref: https://docs.gitlab.com/runner/executors/kubernetes.html#using-docker-dind
  ##
  privileged: true

  ## The name of the secret containing runner-token and runner-registration-token
  # secret: gitlab-runner

  ## Namespace to run Kubernetes jobs in (defaults to the same namespace of this release)
  ##
  # namespace:

  ## The amount of time, in seconds, that needs to pass before the runner will
  ## timeout attempting to connect to the container it has just created.
  ## ref: https://docs.gitlab.com/runner/executors/kubernetes.html
  pollTimeout: 180

  ## Set maximum build log size in kilobytes, by default set to 4096 (4MB)
  ## ref: https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-runners-section
  outputLimit: 4096

  ## Distributed runners caching
  ## ref: https://gitlab.com/gitlab-org/gitlab-runner/blob/master/docs/configuration/autoscale.md#distributed-runners-caching
  ##
  ## If you want to use s3 based distributing caching:
  ## First of all you need to uncomment General settings and S3 settings sections.
  ##
  ## Create a secret 's3access' containing 'accesskey' & 'secretkey'
  ## ref: https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/
  ##
  ## $ kubectl create secret generic s3access \
  ##   --from-literal=accesskey="YourAccessKey" \
  ##   --from-literal=secretkey="YourSecretKey"
  ## ref: https://kubernetes.io/docs/concepts/configuration/secret/
  ##
  ## If you want to use gcs based distributing caching:
  ## First of all you need to uncomment General settings and GCS settings sections.
  ##
  ## Access using credentials file:
  ## Create a secret 'google-application-credentials' containing your application credentials file.
  ## ref: https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-runnerscachegcs-section
  ## You could configure
  ## $ kubectl create secret generic google-application-credentials \
  ##   --from-file=gcs-application-credentials-file=./path-to-your-google-application-credentials-file.json
  ## ref: https://kubernetes.io/docs/concepts/configuration/secret/
  ##
  ## Access using access-id and private-key:
  ## Create a secret 'gcsaccess' containing 'gcs-access-id' & 'gcs-private-key'.
  ## ref: https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-runners-cache-gcs-section
  ## You could configure
  ## $ kubectl create secret generic gcsaccess \
  ##   --from-literal=gcs-access-id="YourAccessID" \
  ##   --from-literal=gcs-private-key="YourPrivateKey"
  ## ref: https://kubernetes.io/docs/concepts/configuration/secret/
  cache: {}
    ## General settings
    # cacheType: s3
    # cachePath: "gitlab_runner"
    # cacheShared: true

    ## S3 settings
    # s3ServerAddress: s3.amazonaws.com
    # s3BucketName:
    # s3BucketLocation:
    # s3CacheInsecure: false
    # secretName: s3access

    ## GCS settings
    # gcsBucketName:
    ## Use this line for access using access-id and private-key
    # secretName: gcsaccess
    ## Use this line for access using google-application-credentials file
    # secretName: google-application-credentials

  ## Build Container specific configuration
  ##
  builds: {}
    # cpuLimit: 200m
    # memoryLimit: 256Mi
    # cpuRequests: 100m
    # memoryRequests: 128Mi

  ## Service Container specific configuration
  ##
  services: {}
    # cpuLimit: 200m
    # memoryLimit: 256Mi
    # cpuRequests: 100m
    # memoryRequests: 128Mi

  ## Helper Container specific configuration
  ##
  helpers: {}
    # cpuLimit: 200m
    # memoryLimit: 256Mi
    # cpuRequests: 100m
    # memoryRequests: 128Mi
    # image: gitlab/gitlab-runner-helper:x86_64-latest

  ## Service Account to be used for runners
  ##
  # serviceAccountName:

  ## If Gitlab is not reachable through $CI_SERVER_URL
  ##
  # cloneUrl:

  ## Specify node labels for CI job pods assignment
  ## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
  ##
  # nodeSelector: {}

  ## Specify pod labels for CI job pods
  ##
  # podLabels: {}

  ## Specify annotations for job pods, useful for annotations such as iam.amazonaws.com/role
  # podAnnotations: {}

  ## Configure environment variables that will be injected to the pods that are created while
  ## the build is running. These variables are passed as parameters, i.e. `--env "NAME=VALUE"`,
  ## to `gitlab-runner register` command.
  ##
  ## Note that `envVars` (see below) are only present in the runner pod, not the pods that are
  ## created for each build.
  ##
  ## ref: https://docs.gitlab.com/runner/commands/#gitlab-runner-register
  ##
  # env:
  #   NAME: VALUE


## Configure securitycontext
## ref: http://kubernetes.io/docs/user-guide/security-context/
##
securityContext:
  fsGroup: 65533
  runAsUser: 100


## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources: {}
  # limits:
  #   memory: 256Mi
  #   cpu: 200m
  # requests:
  #   memory: 128Mi
  #   cpu: 100m

## Affinity for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity
##
affinity: {}

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}
  # Example: The gitlab runner manager should not run on spot instances so you can assign
  # them to the regular worker nodes only.
  # node-role.kubernetes.io/worker: "true"

## List of node taints to tolerate (requires Kubernetes >= 1.6)
## Ref: https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/
##
tolerations: []
  # Example: Regular worker nodes may have a taint, thus you need to tolerate the taint
  # when you assign the gitlab runner manager with nodeSelector or affinity to the nodes.
  # - key: "node-role.kubernetes.io/worker"
  #   operator: "Exists"

## Configure environment variables that will be present when the registration command runs
## This provides further control over the registration process and the config.toml file
## ref: `gitlab-runner register --help`
## ref: https://docs.gitlab.com/runner/configuration/advanced-configuration.html
##
# envVars:
#   - name: RUNNER_EXECUTOR
#     value: kubernetes

## list of hosts and IPs that will be injected into the pod's hosts file
hostAliases: []
  # Example:
  # - ip: "127.0.0.1"
  #   hostnames:
  #   - "foo.local"
  #   - "bar.local"
  # - ip: "10.1.2.3"
  #   hostnames:
  #   - "foo.remote"
  #   - "bar.remote"

## Annotations to be added to manager pod
##
podAnnotations: {}
  # Example:
  # iam.amazonaws.com/role: <my_role_arn>

## Labels to be added to manager pod
##
podLabels: {}
  # Example:
  # owner.team: <my_cool_team>

## HPA support for custom metrics:
## This section enables runners to autoscale based on defined custom metrics.
## In order to use this functionality, Need to enable a custom metrics API server by
## implementing "custom.metrics.k8s.io" using supported third party adapter
## Example: https://github.com/directxman12/k8s-prometheus-adapter
##
#hpa: {}
  # minReplicas: 1
  # maxReplicas: 10
  # metrics:
  # - type: Pods
  #   pods:
  #     metricName: gitlab_runner_jobs
  #     targetAverageValue: 400m

```



#### 部署chart

```
## 创建runner
kubectl create ns gitlab-runner
helm install gitlab-runner --namespace gitlab-runner ./gitlab-runner

## 更新
helm upgrade gitlab-runner --namespace gitlab-runner ./gitlab-runner
```



#### 效果

gitlab

![iamges](images/31.png)

kubernetes

![images](images/32.png)



---



### 运行流水线测试

```
image: maven:3.6.3-jdk-8

before_script:
  - ls
  
services:
  - name: mysql:latest
    alias: mysql-1  
  
build:
  image: maven:3.6.3-jdk-8
  stage: build
  tags:
    - k8s
  script:
    - ls
    - sleep 2
    - echo "mvn clean "
    - sleep 10

deploy:
  stage: deploy
  tags:
    - k8s
  script:
    - echo "deploy"
  environment:
    name: production
    url: http://www.baidu.com

```



效果

![images](images/33.png)



---



### FAQ

Q1 未创建rbac

```
ERROR: Job failed (system failure): pods is forbidden: User "system:serviceaccount:gitlab-runner:default" cannot create resource "pods" in API group "" in the namespace "gitlab-runner"
```





### 应用发布集成



### 准备工作

创建名称空间

```
kubectl create ns cidevops
```



准备镜像凭据

```
kubectl create secret docker-registry cidevops \
    --docker-server=registry.cn-beijing.aliyuncs.com \
    --docker-username=xxxx \
    --docker-password=xxxx \
    --docker-email=test@test.com -n cidevops
```



### 配置模板

jobs/deploy.yml

```

.deploy-k8s:
  stage: deploy
  tags:
    - build
  script:
    - sed -i "s#__namespace__#${NAMESPACE}#g" deployment.yaml 
    - sed -i "s#__appname__#${APP_NAME}#g" deployment.yaml 
    - sed -i "s#__containerport__#${CONTAINER_PORT}#g" deployment.yaml 
    - sed -i "s#__nodeport__#${NODE_PORT}#g" deployment.yaml 
    - sed -i "s#__imagename__#${IMAGE_NAME}#g" deployment.yaml 
    - kubectl apply -f deployment.yaml
  after_script:
   - sleep 10
   - kubectl get pod  -n $NAMESPACE

```


template.yml

```
deploy_k8s:
  stage: deploy
  extends: .deploy-k8s
  rules:
    - if: " $RUN_DEPLOY == 'no' "
      when: never
    - if: " $MANUAL_BRANCH  == 'master' "
      when: manual
    - when: always
  environment:
    name: $ENV_NAME
    url: $ENV_URL

```



gitlab-ci.yml

```
  #部署k8s
  NAMESPACE: "$CI_PROJECT_NAMESPACE"
  APP_NAME: "$CI_PROJECT_NAME"
  CONTAINER_PORT: 8081
  NODE_PORT: 30181

```





最终效果

![images](images/24.png)



![images](images/25.png)

----


## 构建环境优化

### runner部署优化

- 添加构建缓存PVC
- 添加工作目录PVC
- 开启自定义构建目录

#### 准备工作

runner配置信息可以通过参数指定，也可以以环境变量方式设置。详细内容可以通过 `gitlab-runner register -h `获取到相关参数和变量名称。

在使用官方提供的runner镜像注册runner，默认的runner配置文件在`/home/gitlab-runner/.gitlab-runner/config.toml`

参考文档：http://s0docs0gitlab0com.icopy.site/runner/executors/kubernetes.html#using-volumes

----

#### 解决构建缓存问题

所谓的构建缓存就是我们在进行maven/npm等构建工具打包时所依赖的包。默认会在私服中获取，加快构建速度可以在本地缓存一份。在此，我们需要创建PVC来持久化构建缓存，加速构建速度。为了节省存储空间决定不在每个项目中存储构建缓存，而是配置全局缓存。

准备本机缓存目录

```
/opt/ci-build-cache
```

首先，创建一个PVC用于挂载到pod中使用。

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ci-build-cache-pv
  namespace: gitlab-runner
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/opt/ci-build-cache"
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ci-build-cache-pvc
  namespace: gitlab-runner
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

使用命令查看验证

```
# kubectl get pvc -n gitlab-runner
NAME                 STATUS   VOLUME              CAPACITY   ACCESS MODES   STORAGECLASS   AGE
ci-build-cache-pvc   Bound    ci-build-cache-pv   10Gi       RWO            manual     5h41m
```

---

OK，pvc准备好了，考虑到不能每次部署runner都手动挂载pvc，需要自定义gitlab-runner chart，优化runner配置。

第一步：编辑value.yml文件，添加构建缓存信息配置。

```
## configure build cache
cibuild:
  cache:
    pvcName: ci-build-cache-pvc
    mountPath: /home/gitlab-runner/ci-build-cache
```

第二步：编辑templates/configmap.yml文件，entrypoint部分添加runner配置。在start之前添加，这样runner在创建构建pod的时候会根据配置挂载pvc。

```
    # add build cache
    cat >>/home/gitlab-runner/.gitlab-runner/config.toml <<EOF
      [[runners.kubernetes.volumes.pvc]]
      name = "{{.Values.cibuild.cache.pvcName}}"
      mount_path = "{{.Values.cibuild.cache.mountPath}}"
    EOF

    # Start the runner
    exec /entrypoint run --user=gitlab-runner \
      --working-directory=/home/gitlab-runner
```

到此gitlab-runner chart部分配置就完成了，接下来可以通过Helm命令进行创建和更新了。

```
helm install gitlab-runner04 ./gitlab-runner --namespace gitlab-runner
helm upgrade gitlab-runner04 ./gitlab-runner --namespace gitlab-runner
```

使用以上命令部署完成后，可以在gitlab admin页面和k8s面板查看runner的状态，确保部署成功。查看pod配置。

![images](images/27.png)

---

部署完成了，后续使用构建工具打包时添加指定缓存目录。例如：maven

```
mvn clean package  -DskipTests -Dmaven.repo.local=/home/gitlab-runner/ci-build-cache/maven  
```

发现构建速度很快证明已经完成构建缓存配置。可以配合查看本地缓存目录是否有更新（目录时间）。

---

#### 解决构建制品问题

在kubernetes中对cache支持一般，我们可以使用artifacts进行代替。但是考虑到artifacts收集制品会占用存储空间，所以准备研究下如何配置统一的缓存。实际上我们可以将repo目录做成持久化。

经过测试，在使用kubernetes执行器创建的构建pod会默认挂载一个空目录。此目录用于存储每次下载的代码，因为是空目录的原因导致后续测试pod无法获取需要重新下载代码，这还不要紧，重要的是构建生成的文件target目录都不存在了导致后续步骤接连失败。

![images](images/28.png)

由于yaml文件都是有官方默认配置的，问题不好定位。这其实是个两年前的问题了。 https://gitlab.com/gitlab-org/gitlab-runner/-/issues/3148 。最后经过分析直接将持久化的pvc挂载到空目录中的某个目录中。需要配置runner自定义构建目录，但是构建目录必须是在$CI_BUILD_DIRS目录里面。

![images](images/29.png)

准备本地的工作目录

```
/opt/ci-build-dir
```

创建repo持久化pvc

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ci-build-dir-pv
  namespace: gitlab-runner
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/opt/ci-build-dir"
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ci-build-dir-pvc
  namespace: gitlab-runner
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

使用命令验证

```
# kubectl get pvc -n gitlab-runner
NAME                 STATUS   VOLUME              CAPACITY   ACCESS MODES   STORAGECLASS   AGE
ci-build-cache-pvc   Bound    ci-build-cache-pv   10Gi       RWO            manual         6h41m
ci-build-dir-pvc     Bound    ci-build-dir-pv     10Gi       RWO            manual         3h11m
```

---

编译values.yaml文件添加注册配置变量。`RUNNER_BUILDS_DIR`定义构建目录。`CUSTOM_BUILD_DIR_ENABLED`开启自定义构建目录配置。

```
envVars:
  - name: RUNNER_BUILDS_DIR
    value: "/home/gitlab-runner/ci-build-dir/"
  - name: CUSTOM_BUILD_DIR_ENABLED
    value: true
```

添加repo目录缓存配置，我们把自定义的构建目录放到默认构建目录的下面builds目录中。

```
## configure build cache
cibuild:
  cache:
    pvcName: ci-build-cache-pvc
    mountPath: /home/gitlab-runner/ci-build-cache
  builds:
    pvcName: ci-build-dir-pvc
    mountPath: /home/gitlab-runner/ci-build-dir/builds
```

编辑templates/configmap.yml

```
    # add build cache
    cat >>/home/gitlab-runner/.gitlab-runner/config.toml <<EOF
      [[runners.kubernetes.volumes.pvc]]
      name = "{{.Values.cibuild.cache.pvcName}}"
      mount_path = "{{.Values.cibuild.cache.mountPath}}"
      [[runners.kubernetes.volumes.pvc]]
      name = "{{.Values.cibuild.builds.pvcName}}"
      mount_path = "{{.Values.cibuild.builds.mountPath}}"
    EOF
```

更新runner

```
helm install gitlab-runner04 ./gitlab-runner --namespace gitlab-runner
helm upgrade gitlab-runner04 ./gitlab-runner --namespace gitlab-runner
```

---

在CI文件中配置，如果不开启自定义构建目录配置会出现错误。

```
variables:
  GIT_CLONE_PATH: $CI_BUILDS_DIR/builds/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/$CI_PIPELINE_ID
```

![images](images/21.png)

---

经过测试在本地的pv中能够看到，下载的代码文件。但是默认每次每个job运行的时候都会获取远程最新的代码，会把构建目录删除掉，此时就需要配置git checkout策略了。其实按照我们目前的场景，不需要每个作业都下载代码。只要第一个作业下载好最新的代码，然后运行流水线即可。当在运行流水线的过程中遇到新代码提交可以放到下次流水线执行。 

需要在ci文件中定义`GIT_CHECKOUT`变量，默认值为true，即每次都需要代码下载。我们将全局配置为false然后在build作业中配置为true。也就实现了只在build作业下载最新代码了。

```
GIT_CHECKOUT: "false" 
```

参考链接：http://s0docs0gitlab0com.icopy.site/ee/ci/yaml/README.html#git-checkout

---

参考文档：

http://s0docs0gitlab0com.icopy.site/runner/executors/kubernetes.html#using-volumes k8srunner配置volume

https://gitlab.com/gitlab-org/gitlab-foss/-/blob/master/.gitlab-ci.yml 企业级ci模板
## 配置Gitlab与K8S集群集成



### 1.系统集成配置

获取证书

```
kubectl config view --raw -o=jsonpath='{.clusters[0].cluster.certificate-authority-data}' | base64 --decode
```

创建admin用户

```
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: gitlab-admin
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: gitlab-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: gitlab-admin
  namespace: kube-system
```

获取用户token

```
kubectl -n kube-system get secret | grep gitlab-admin | awk '{print $1}'
kubectl -n kube-system get secret gitlab-admin-token-2dh62 -o jsonpath='{.data.token}' | base64 --decode
```

进入系统管理 -> Kubernetes -> 添加已存在集群 ，配置证书与token。 默认开源版本只能添加一个集群。

![images](images/22.png)

----



### 2.K8S发布

流水线中添加environment会自动在k8s中创建ns，Kubernetes集成默认为格式为`$CI_PROJECT_NAME-PROJECTID-staging`。对于**非** GitLab管理的集群，可以使用`.gitlab-ci.yml` `environment:kubernetes:namespace`来定制。

```
deploy_k8s:
  image: lucj/kubectl:1.17.2
  tags:
    - k8s
    - kubernetes-runner
  stage: deploy
  script:
    - kubectl config set-cluster my-cluster --server=${KUBE_URL} --certificate-authority="${KUBE_CA_PEM_FILE}"
    - kubectl config set-credentials admin --token=${KUBE_TOKEN}
    - sed -i "s#__namespace__#${NAMESPACE}#g" deployment.yaml 
    - sed -i "s#__appname__#${APP_NAME}#g" deployment.yaml 
    - sed -i "s#__containerport__#${CONTAINER_PORT}#g" deployment.yaml 
    - sed -i "s#__nodeport__#${NODE_PORT}#g" deployment.yaml 
    - sed -i "s#__imagename__#${IMAGE_NAME}#g" deployment.yaml 
    - sed -i "s#__CI_ENVIRONMENT_SLUG__#${CI_ENVIRONMENT_SLUG}#g" deployment.yaml 
    - sed -i "s#__CI_PROJECT_PATH_SLUG__#${CI_PROJECT_PATH_SLUG}#g" deployment.yaml
    - cat deployment.yaml
    - kubectl apply -f deployment.yaml  
  environment:
    name: $ENV_NAME
    url: $ENV_URL

```

集成效果

![images](images/25.png)

![images](images/26.png)





---



### 3.使用web终端：

第一步：增加deployment注解

```
metadata:
  labels:
    k8s-app: __appname__
  name: __appname__
  namespace: __namespace__
  annotations:
    app.gitlab.com/env: __CI_ENVIRONMENT_SLUG__
    app.gitlab.com/app: __CI_PROJECT_PATH_SLUG__
```

第二步：部署前替换注解变量

```
sed -i "s#__CI_ENVIRONMENT_SLUG__#${CI_ENVIRONMENT_SLUG}#g" deployment.yaml 
sed -i "s#__CI_PROJECT_PATH_SLUG__#${CI_PROJECT_PATH_SLUG}#g" deployment.yaml 
```



```
  script:
    - echo "${KUBE_CA_PEM}" > kube_ca.pem
    - kubectl config set-cluster $K8S_CLUSTER_NAME --server=”$KUBE_URL” --certificate-authority="$(pwd)/kube_ca.pem"
    - kubectl config set-credentials $K8S_CLUSTER_NAME --token=”$KUBE_TOKEN”
    - sed -i "s/__CI_ENVIRONMENT_SLUG__/${CI_ENVIRONMENT_SLUG}/" deployment.yaml
    - kubectl apply -f deployment.yaml -l app=${CI_ENVIRONMENT_SLUG}
```



参考文档： https://forum.gitlab.com/t/gitlab-ci-runner-on-kubernetes-unable-to-access-interactive-web-terminal-connection-failure/26987/5  解决无法开启终端问题。

---



![images](images/24.png)

### FAQ

原因是因为权限不够

![images](images/23.png)



创建镜像下载凭据

```
kubectl create secret docker-registry cidevops-java-service-20-staging \
    --docker-server=registry.cn-beijing.aliyuncs.com \
    --docker-username=610556220zy \
    --docker-password=zeyang0914.. \
    --docker-email=test@test.com -n cidevops-java-service-20-staging
```

---



参考文档：

https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-session_server-section

https://s0docs0gitlab0com.icopy.site/ee/ci/interactive_web_terminal/index.html

https://s0docs0gitlab0com.icopy.site/ee/administration/integration/terminal.html#enabling-and-disabling-terminal-support



https://gitlab.com/gitlab-org/charts/gitlab-runner/-/issues/79







## 容器运行流水线





### build

```
build:
  variables:
    GIT_CHECKOUT: "true"
  tags:
    - k8s
  image: maven:3.6.3-jdk-8
  stage: build
  extends: .build
  rules:
    - when: on_success
  after_script:
    - ls target/

```



### test

```
test:
  before_script:
    - ls target/
  tags:
    - k8s
  image: maven:3.6.3-jdk-8
  stage: test
  extends: .test
  rules:
    - when: on_success
  after_script:
    - ls target/
```



### code_analysis

```
code_analysis:
  tags:
    - k8s
  image: sonarsource/sonar-scanner-cli:latest
  stage: parallel01
  script:
    - ls target/
    - echo $CI_MERGE_REQUEST_IID $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME  $CI_MERGE_REQUEST_TARGET_BRANCH_NAME
    - "sonar-scanner -Dsonar.projectKey=${CI_PROJECT_NAME} \
                  -Dsonar.projectName=${CI_PROJECT_NAME} \
                  -Dsonar.projectVersion=${CI_COMMIT_REF_NAME} \
                  -Dsonar.ws.timeout=30 \
                  -Dsonar.projectDescription=${CI_PROJECT_TITLE} \
                  -Dsonar.links.homepage=${CI_PROJECT_URL} \
                  -Dsonar.sources=${SCAN_DIR} \
                  -Dsonar.sourceEncoding=UTF-8 \
                  -Dsonar.java.binaries=target/classes \
                  -Dsonar.java.test.binaries=target/test-classes \
                  -Dsonar.java.surefire.report=target/surefire-reports \
                  -Dsonar.host.url=http://192.168.1.200:30090 \
                  -Dsonar.login=ee2bcb37deeb6dfe3a07fe08fb529559b00c1b7b \
                  -Dsonar.branch.name=${CI_COMMIT_REF_NAME}" 

```

### build_image

```
build_image:
  before_script:
    - ls target/
  tags:
    - k8s
  image: docker:latest
  services:
    - name: docker:dind
  stage: parallel01
  extends: .build-docker
  
```

faq

```
 $ docker build -t ${IMAGE_NAME} -f ${DOCKER_FILE_PATH} .
 Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
 time="2020-05-12T01:41:07Z" level=error msg="failed to dial gRPC: cannot connect to the Docker daemon. Is 'docker daemon' running on this host?: dial unix /var/run/docker.sock: connect: no such file or directory"
```

runner配置

```
# add build cache 
    cat >>/home/gitlab-runner/.gitlab-runner/config.toml <<EOF
      [[runners.kubernetes.volumes.pvc]]
      name = "{{.Values.cibuild.cache.pvcName}}"
      mount_path = "{{.Values.cibuild.cache.mountPath}}"
      [[runners.kubernetes.volumes.pvc]]
      name = "{{.Values.cibuild.builds.pvcName}}"
      mount_path = "{{.Values.cibuild.builds.mountPath}}"
      [[runners.kubernetes.volumes.host_path]]
      name = "docker"
      mount_path = "/var/run/docker.sock"
    EOF
```





### K8S deploy

```
deploy_k8s:
  image: lucj/kubectl:1.17.2
  tags:
    - k8s
    - kubernetes-runner
  stage: deploy
  script:
    - kubectl config set-cluster my-cluster --server=${KUBE_URL} --certificate-authority="${KUBE_CA_PEM_FILE}"
    - kubectl config set-credentials admin --token=${KUBE_TOKEN}
    - sed -i "s#__namespace__#${NAMESPACE}#g" deployment.yaml 
    - sed -i "s#__appname__#${APP_NAME}#g" deployment.yaml 
    - sed -i "s#__containerport__#${CONTAINER_PORT}#g" deployment.yaml 
    - sed -i "s#__nodeport__#${NODE_PORT}#g" deployment.yaml 
    - sed -i "s#__imagename__#${IMAGE_NAME}#g" deployment.yaml 
    - cat deployment.yaml
    - kubectl apply -f deployment.yaml  
  environment:
    name: $ENV_NAME
    url: $ENV_URL

```





### interface_test

```
interfact_test:
  inherit:
    variables: false
  stage: interface_test
  extends: .interfacetest

```

## 流水线构建消息通知



### Pipeline email

编辑/etc/gitlab/gitlab.rb文件开启gitlab email。这里以QQ邮箱为例

```
### GitLab email server settings
###! Docs: https://docs.gitlab.com/omnibus/settings/smtp.html
###! **Use smtp instead of sendmail/postfix.**

gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.qq.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "2560350642@qq.com"
gitlab_rails['smtp_password'] = "avbkthlkpngnebed"
gitlab_rails['smtp_domain'] = "smtp.qq.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true

### Email Settings
gitlab_rails['gitlab_email_enabled'] = true
gitlab_rails['gitlab_email_from'] = '2560350642@qq.com'
gitlab_rails['gitlab_email_display_name'] = 'GitLab Admin'
```

重新配置

```
gitlab-ctl stop
gitlab-ctl reconfigure
gitlab-ctl start
gitlab-ctl status
```

登录gitlab-rails控制台，发送测试邮件。

```
su - git
gitlab-rails console

irb(main):002:0> Notify.test_email('2560350642@qq.com', 'test email', 'gitlab email test').deliver_now


Notify#test_email: processed outbound mail in 0.5ms
Delivered mail 5eba1b04de4e5_12903fe2ca0c79b0519ec@gitlab-995f97976-2nmb4.mail (1055.9ms)
Date: Tue, 12 May 2020 03:41:56 +0000
From: GitLab Admin <2560350642@qq.com>
Reply-To: GitLab Admin <noreply@192.168.1.200>
To: 2560350642@qq.com
Message-ID: <5eba1b04de4e5_12903fe2ca0c79b0519ec@gitlab-995f97976-2nmb4.mail>
Subject: Message Subject
Mime-Version: 1.0
Content-Type: text/html;
 charset=UTF-8
Content-Transfer-Encoding: 7bit
Auto-Submitted: auto-generated
X-Auto-Response-Suppress: All

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p>Message Body And Linuxea.com</p></body></html>

=> #<Mail::Message:70243016426420, Multipart: false, Headers: <Date: Tue, 12 May 2020 03:41:56 +0000>, <From: GitLab Admin <2560350642@qq.com>>, <Reply-To: GitLab Admin <noreply@192.168.1.200>>, <To: 2560350642@qq.com>, <Message-ID: <5eba1b04de4e5_12903fe2ca0c79b0519ec@gitlab-995f97976-2nmb4.mail>>, <Subject: Message Subject>, <Mime-Version: 1.0>, <Content-Type: text/html; charset=UTF-8>, <Content-Transfer-Encoding: 7bit>, <Auto-Submitted: auto-generated>, <X-Auto-Response-Suppress: All>>
```

![images](images/34.png)



----



进入项目 -> settings -> 集成

![images](images/31.png)



配置邮件通知人、通知条件

![images](images/32.png)



运行流水线测试

![images](images/33.png)

----



### 钉钉通知

创建群，群机器人，获取hookurl

![images](images/35.png)



![iamges](images/36.png)





![iamges](images/37.png)

```
dingding:
  stage: .post
  script:
    - " curl 'https://oapi.dingtalk.com/robot/send?access_token=46ea6f8a0ae44f65fadb1d56d4df5f768801d200af58146580ea7619b108b179' \
        -H 'Content-Type: application/json' \
        -d '{\"msgtype\": \"text\",\"text\": {\"content\": \"CICD我就是我, 是不一样的烟火 @1xxxx2\"},\"at\": {\"atMobiles\": [\"15xxxxx72\"], \"isAtAll\": false}}'"

```

参考文档：https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq



![iamges](images/38.png)

---

##  配置使用分布式缓存





## minio

MinIO 是一个基于Apache License v2.0开源协议的对象存储服务。它兼容亚马逊S3云存储服务接口，非常适合于存储大容量非结构化的数据，例如图片、视频、日志文件、备份数据和容器/虚拟机镜像等，而一个对象文件可以是任意大小，从几kb到最大5T不等。

MinIO是一个非常轻量的服务,可以很简单的和其他应用的结合，类似 NodeJS, Redis 或者 MySQL。

官方文档：https://docs.min.io/cn/deploy-minio-on-kubernetes.html 



### 基于Kubernetes部署

准备一个pv用于存储bucket数据。这里我使用的是本地的目录"/data/devops/minio-data"，根据大家不同的环境按需调整即可。

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ci-minio-pv
  namespace: devops
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 50Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/data/devops/minio-data"
---
```



```
kubectl create -f pv.yaml
kubectl get pv -n devops
```



#### Helm Install 

stable/minio	3.0.3  是目前最新的RELEASE版本

修改minio/values.yml中的service端口为80。(可选)

```
service:
  type: ClusterIP
  clusterIP: ~
  port: 80
  nodePort: 31311
  # externalIPs:
  #   - externalIp1
  annotations: {}
```

修改minio/values.yml中的Ingress配置。

```
ingress:
  enabled: true
  annotations:
    kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
    # kubernetes.io/ingress.allow-http: "false"
    # kubernetes.io/ingress.global-static-ip-name: ""
    # nginx.ingress.kubernetes.io/secure-backends: "true"
    # nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
    # nginx.ingress.kubernetes.io/whitelist-source-range: 0.0.0.0/0
  path: /
  hosts:
    - minio.devops.svc.cluster.local
  tls: []
```



```
helm install minio --namespace=devops --set persistence.size=50Gi,persistence.VolumeName=ci-minio-pv,persistence.storageClass=manual ./minio  
```

- persistence.size=50Gi  配置PV的大小为50Gi
- persistence.VolumeName=ci-minio-pv  指定已存在pv名称
- persistence.storageClass=manual 指定pv存储的类型为manual



----

部署成功会提示类似以下信息

```
NOTES:
Minio can be accessed via port 80 on the following DNS name from within your cluster:
minio.devops.svc.cluster.local

To access Minio from localhost, run the below commands:

  1. export POD_NAME=$(kubectl get pods --namespace devops -l "release=minio" -o jsonpath="{.items[0].metadata.name}")

  2. kubectl port-forward $POD_NAME 9000 --namespace devops

Read more about port forwarding here: http://kubernetes.io/docs/user-guide/kubectl/kubectl_port-forward/

You can now access Minio server on http://localhost:9000. Follow the below steps to connect to Minio server with mc client:

  1. Download the Minio mc client - https://docs.minio.io/docs/minio-client-quickstart-guide

  2. mc config host add minio-local http://localhost:9000 AKIAIOSFODNN7EXAMPLE wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY S3v4

  3. mc ls minio-local

Alternately, you can use your browser or the Minio SDK to access the server - https://docs.minio.io/categories/17
```





#### 访问验证

添加hosts解析测试

```
192.168.1.200 minio.devops.svc.cluster.local
```

![images](images/40.png)

---



#### 创建bucket

![iamges](images/41.png)



![iamges](images/42.png)



![iamges](images/43.png)





----



## 配置Runner使用S3存储



官方的runner 配置 examples是这样配置的，指定S3存储相关信息。

参考文档：https://docs.gitlab.com/runner/configuration/autoscale.html#distributed-runners-caching

```
[[runners]]
  limit = 10
  executor = "docker+machine"
  [runners.cache]
    Type = "s3"
    Path = "path/to/prefix"
    Shared = false
    [runners.cache.s3]
      ServerAddress = "s3.example.com"
      AccessKey = "access-key"
      SecretKey = "secret-key"
      BucketName = "runner"
      Insecure = false
```

如果您直接使用的vm或者docker安装的runner，可以直接更新runner的配置文件填写S3信息。如果您使用的是Kuberntes环境部署的runner则需要根据以下配置来修改Helm  chart。

 

步骤1：创建一个secret保存S3的认证信息，由于我的runner在gitlab-runner名称空间，所以这里指定的也是同样的。

```
kubectl create secret generic s3access --namespace=gitlab-runner --from-literal=accesskey="AKIAIOSFODNN7EXAMPLE" --from-literal=secretkey="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
```

步骤2： 编辑helm chart 中的values.yml文件，填写S3配置信息。

```
cache:
    ## General settings
    cacheType: s3
    cachePath: "gitlab-runner"
    cacheShared: true

    ## S3 settings
    s3ServerAddress: minio.devops.svc.cluster.local
    s3BucketName: gitlab-ci-runner-cache
    s3BucketLocation:
    s3CacheInsecure: false
    secretName: s3access
```

- cacheType：  缓存的类型，指定s3
- cachePath：缓存路径，值得是bucket中的目录。可以自定义。
- CacheShared：是否共享，如果存在多个runner则需要开启。
- s3ServerAddress： S3服务器地址，minio域名。
- s3BucketName： S3 bucket的名称，参考上面我们创建的名称。
- s3BucketLocation： Location 默认即可，可选。
- s3CacheInsecure：是否使用https。(这里官方chart有问题，配置的是不管是true还是false都是true，后面会修改)
- secretName：凭据名称， 我们在上面创建的s3凭据。

----

小问题： 发现s3CacheInsecure设置runner 配置 Insecure没有生效，解决方法。

方式一： 声明环境变量（不生效，放弃）

```
--cache-s3-insecure       Use insecure mode (without https) [$CACHE_S3_INSECURE]
```

```
envVars:
  - name: CACHE_S3_INSECURE
    value: false
```

方式二：修改文件templates/_cache.tpl

官方配置的是 这个值如果为true 则为true ，那如果我们要设置false呢？ 很明显没有配置了~~~。

```
 18 {{-       if .Values.runners.cache.s3CacheInsecure }}
 19 - name: CACHE_S3_INSECURE
 20   value: "true"
 21 {{-       end }}
```

改成下面的配置，即不加条件判断，根据s3CacheInsecure 实际的参数值。

```
- name: CACHE_S3_INSECURE
  value: {{ default "" .Values.runners.cache.s3CacheInsecure | quote }}
```



----

ok，上面我们遇到了一些小问题，但都通过自定义helmchart 解决了。 接下来更新我们的runner 配置。

```
helm upgrade gitlab-runner ./gitlab-runner --namespace gitlab-runner
```

更新完成，我们在pod中查看runner配置文件是否正常。大家可以参考以下图片为正常的。

![images](images/39.png)

---



## 运行流水线测试

这条流水线很简单，我们这样配置： 设计两个步骤，build，test。 build打包后会产生target目录。默认在不配置全局缓存的情况下test作业执行的时候是没有target目录的。

```
cache:
  paths:
    - target/
build:
  stage: build
  script:
    - mvn clean package
    - ls 
    
test:
  stage: test
  script:
    - ls 
    - ls target/
```



build作业开始运行，获取缓存。发现缓存不存在，运行任务。

![images](images/44.png)

build作业执行完成，收集缓存到S3。

![images](images/45.png)

test作业开始运行，发现build作业产生的缓存。

![images](images/46.png)

test作业运行完成，上传缓存到S3。

![images](images/47.png)



---

OK，到这里S3缓存已经配置完成了。 我们可以在minio服务中查看生成的数据。

![iamges](images/48.png)



![images](images/49.png)

----



## FAQ 

连接超时问题，这个问题与runners 3CacheInsecure配置参数有关。可以参考上面步骤解决。使用http模式即可。

```
Restoring cache
 Checking cache for default-1...
 WARNING: Retrying...                                error=Get https://minio.devops.svc.cluster.local/gitlab-ci-runner-cache/gitlab-runner/project/20/default-1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20200516%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200516T061458Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b604bdfdda3b26286e714ed3a4073c103f6216f13b4efb12a0c76734160b1fde: dial tcp 10.1.117.2:443: i/o timeout
 WARNING: Retrying...                                error=Get https://minio.devops.svc.cluster.local/gitlab-ci-runner-cache/gitlab-runner/project/20/default-1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20200516%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200516T061458Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b604bdfdda3b26286e714ed3a4073c103f6216f13b4efb12a0c76734160b1fde: dial tcp 10.1.117.2:443: i/o timeout
 FATAL: Get https://minio.devops.svc.cluster.local/gitlab-ci-runner-cache/gitlab-runner/project/20/default-1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=[FILTERED]&X-Amz-Date=20200516T061458Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=[FILTERED] dial tcp 10.1.117.2:443: i/o timeout 
```





