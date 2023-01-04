# windows删除文件时提示 操作无法完成


# windows查看端口号

```shell
  # 查看端口的使用情况
  netstat -aon|findstr 8080
  #根据端口对应的pid删除端口的进场
  taskkill /T /F /PID 12484
```