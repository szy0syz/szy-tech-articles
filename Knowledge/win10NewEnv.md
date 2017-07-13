# 2017.7-Windows开发环境简单安装部署

> 目前手头有一台`Dell Vostro V131`，虽然已经不用Windows且配置略老但偶尔还是要用的，没心思整黑苹果了，直接装Win10-LSTB + bash + cmder环境试试。

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

- 安装

```bash
apt-get install git

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash  
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash  


```


```bash
---------------------------
ConEmu 161022 [64]
---------------------------
ConEmu is unable to download update package.
You may either download new versions manually from
http://www.fosshub.com/ConEmu.html
or let ConEmu retry the downloading.


File download was failed
https://github.com/Maximus5/ConEmu/releases/download/v16.12.06/ConEmuPack.161206.7z
ErrCode=0x00000091

2017-07-13 13:23:32.045



13:23:32.033{4340} Error: Download failed

2017-07-13 13:23:32.033



13:23:32.031{4340} Error: DownloadFile(https://github.com/Maximus5/ConEmu/releases/download/v16.12.06/ConEmuPack.161206.7z) failed, code=12002

2017-07-13 13:23:32.032
---------------------------
重试(R)   取消   
---------------------------

```


  [1]: http://static.zybuluo.com/szy0syz/zul0h8envd7e14vl6j5dboss/screen.jpg
  
