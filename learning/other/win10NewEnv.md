---
sidebar: false
---

# Windows开发环境简单安装部署

> 2017.7-目前手头有一台`Dell Vostro V131`，虽然已经不用Windows且配置略老但偶尔还是要用的，没心思整黑苹果了，直接装Win10-LSTB + bash + cmder环境试试。

- 先从msdnitellyou下载系统镜像`Windows 10 Enterprise 2016 LTSB (x64) - DVD`

- 安装完毕，又是很怀念的windows log~

![screen.jpg-106.4kB][1]

- `win + i`启用 [设置] - [更新和安全] - [针对开发者人员]
- [x] [开发者模式]

- [控制面板] - [程序] - [删除程序] - [启用或关闭windows功能]
- [x] `适用于Linux的windows子系统`

- 启动`bash.exe`安装

- 安装cmder，修改[Settings] - [Startup] - [Command line] = `%windir%\system32\bash.exe ~ -cur_console:p:n`

- 更新Ubuntu系统

```bash
sudo apt-get update
sudo apt-get install build-essential libssl-dev  
```

- 安装&更新

```bash
apt-get install git

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash  
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash  

```

- 更新ConEmu终端模拟器https://www.fosshub.com/ConEmu.html



  [1]: http://static.zybuluo.com/szy0syz/zul0h8envd7e14vl6j5dboss/screen.jpg
  
