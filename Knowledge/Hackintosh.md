# Hackintosh 黑苹果

## 前言

- What，什么是黑苹果？就是用较为合理的硬件组装的PC，然后通过技术手段安装MAC OS，可能存在不完美，但完全不影响正常使用。其实可以用任意你想的硬件，但这个稳定性和折腾时间会让你得不偿失。

- How，怎么做黑苹果？在这里推荐按照[Tonymacx86](https://www.tonymacx86.com/)的官网教程去做，真的会为你省下不少时间。

## 目前我的黑苹果

- 公司黑苹果机: 
  - CPU: Intel I3-6100
  - Mobo: Gigabyte  GA-B150M-D3H
  - Graphics: none
  - RAM: Kingston HX318C10F/8(*2)
  - SSD: Samsung SM961(nvme) MZVPW256HEGL-00000
  - HHD: WD 1TB SATA3
  - Monitor: Dell P2417H
  - macOS Sierra 10.12.4
  
- 家用黑苹果机:
  - CPU: Intel I7-4790K
  - Mobo: ASUS Z97-a/usb3.1
  - Graphics: none 
  - RAM: G.SKILL F3-2400C11S-8GSR(*2)
  - SSD: Samsung 850 EVO 250G SATA3
  - HHD: WD 3TB SATA3 64M 
  - Monitor: Samsung T240 (2007年10月1日买的...)
  - macOS Sierra 10.12.3
  


## 黑苹果全套流程

先macOS Sierra完整镜像；通过U盘制作启动盘；改BOIS settings；安装MACC OS 和 驱动程序；最后检查问题。

## i3-6100&ga-b150m-d3h&sm961-nvem实践

因为用nvme接口的SSD当系统盘，原生系统没自带，需要先启动盘上打好补丁。打补丁的工具：[Clover Configuarator](http://www.insanelymac.com/forum/topic/282787-clover-v2-instructions/)

![CloverConfigurator](http://ofx24fene.bkt.clouddn.com//img/book/screenshot-CloverConfigurator.png)


