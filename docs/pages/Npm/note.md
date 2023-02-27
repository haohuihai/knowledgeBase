## 问题

npm安装包失败时：

(1)可能时npm版本过低，需要更新版本

```
npm install -g npm
```

(2)可能是缓存导致的，需要清除npm缓存

```
npm cache verify
npm cache clean --force // 强制清理
npm cache clean
```

通过上述步骤在进行安装，应该没问题了