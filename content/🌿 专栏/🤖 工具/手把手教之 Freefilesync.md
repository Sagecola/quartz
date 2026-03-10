---
publish: true
created: 2026-02-02T09:21:36.086+08:00
modified: 2026-01-30T11:29:49.000+08:00
tags:
  - 备份
  - 同步
  - 工具
  - 教程
cssclasses: ""
---

> 本文基于模板写成，感谢模板提供者：[@彦初 Echo](https://www.yuque.com/chenyanchu)

FreeFileSync 是一款免费的文件同步软件，可以帮助用户轻松地同步文件和文件夹。它可以让用户比较两个文件夹，并将新文件复制到另一个文件夹中，以便保持两个文件夹的内容完全一致。

## 🔍 备份的困境

毫无疑问，对现代人来说，数据是相当重要的部分，因此备份数据显得尤为重要。目前人们选择的备份方案大致可分为本地备份和云端备份，其中本地备份多为移动硬盘或 NAS 等冷备份，云端备份多使用云服务商提供的云端服务，如百度网盘、OneDrive、坚果云等。然而无论是本地还是云端均有一定的风险，因此建议二者都使用。

作者目前均在 OneDrive 上工作，以满足不同电脑之间同步的要求，然后隔一段时间将云端内容备份到本地。然而在备份过程中遇到了困难，每次都是把本地的内容删除之后再将云盘内容复制粘贴到本地，不仅麻烦且浪费时间。因此，作者开始寻求一款能够增量同步的软件，FreeFileSync 就是目前的答案。

> 作者注：有机会会写一篇关于多端同步的教程。

## 📘 FreeFileSync 介绍

FreeFileSync 可以帮助用户轻松地同步文件和文件夹，支持多种（双向/单向）同步方式、历史版本、定时自动监控等等。不同于市面上同类软件，FreeFileSync 最大的特点是——免费！开源！

> 作者注：没钱没办法哈哈哈哈哈。

## 🚀 下载并安装

打开地址 ☞ [FreeFileSync](https://freefilesync.org/download.php)，选择对应的平台（Windows、Linux、Mac 等）下载即可。

打开下载好的程序安装即可，注意不要安装在 C 盘。

> 作者注：之前用了一段时间后感觉很不错，虽然是免费的也还是捐赠 10 块钱，支持下软件开发者，然后收到了一个捐赠版 FreeFileSync，功能和免费版完全一致，多了一个自动更新功能，因此我更推荐你直接用我的捐赠版 ☞ [FreeFileSync](https://freefilesync.org/thank-you.php?tx=pi_3Lqv3nCzcI78D03q0NdqcYhC)（直接点进网站下载即可）。

## 👣 如何使用？

这部分会结合使用场景做一些简单的功能介绍。

### 1. 界面

打开绿色的 FreeFileSync 图标，软件支持中文，可通过 Tools → Language 进行切换。

软件主页面主要包括：①菜单栏（完整的功能列表）、②配置文件及展示区（当前配置及概要）、③同步区 A（同步文件信息 A）、④同步区 B（同步文件信息 B）、⑤同步文件夹设置（可配置多个需要同步的文件夹）、⑥同步参数设置（可设置**比较规则**、**过滤规则**和**同步规则**）。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29369225/1675228935653-a1cb4d70-8ea3-4b41-aafe-2c1951dca5bf.png#averageHue=%23efede8&clientId=u43978f3c-b3e1-4&from=paste&height=394&id=u04f946f4&originHeight=1188&originWidth=1778&originalType=url&ratio=1&rotation=0&showTitle=false&size=711217&status=done&style=none&taskId=u32ed5d85-8d7e-42b9-b419-e2c4e9c3db9&title=&width=590)

**图 1**

### 2. 手动同步

Ⅰ、在同步文件夹设置区**左侧**点击「浏览」选择**源文件夹路径**，**右侧**点击「浏览」选择**目标文件夹路径**。

> 比如，我想要将桌面的测试文件夹中的内容同步到 D 盘相应位置，那我在左边选择路径：桌面 → 测试（文件夹），右侧选择路径：D 盘 → 测试（文件夹），如图 2 所示。

Ⅱ、然后点击上方「比较」按钮，此时我们可以看到同步区 A 和 B 出现了我们选择的各自文件夹内的文件。

**PS：** 默认比较方式为文件时间和大小，比如两个文件夹中都有一个名字为 A 的 Word，最新时间均为 2023.2.1，大小均为 1 M，即这**两个文件一模一样，那么将不会在同步区中显示**（因为不需要同步）；如果两个**同名文件 A 大小或时间不一样，那么会在同步区中显示**。

**PPS：** 如果你需要更改比较规则，如只需要比较文件最新时间，那么你可以在「比较」按钮右侧的蓝色齿轮那边修改。

> 点击「比较」后，左侧同步区 A 中显示的是桌面测试文件夹中的文件，右侧同步区 B 中显示的是 D 盘测试文件夹中的文件，如图 2 所示。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29369225/1675230267071-51359ff2-7972-41f8-b596-e8c73255076f.png#averageHue=%23f7f2ed&clientId=u43978f3c-b3e1-4&from=paste&height=394&id=uc711dd6b&originHeight=891&originWidth=1332&originalType=binary&ratio=1&rotation=0&showTitle=false&size=155920&status=done&style=none&taskId=uf2f24cf5-d618-43db-8f8e-104fc00e6c7&title=&width=589)

**图 2**

Ⅲ、接下来就是同步了，根据需要可以选择不同的同步规则，一共有「双向」、「镜像」、「更新」和「自定义」四种同步规则，你可以在绿色齿轮右边小箭头处选择所需要的规则。选择好规则后点击「同步」按钮同步即可。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29369225/1675231910086-aabc6a78-6f33-4909-9930-ad189693b8e8.png#averageHue=%23efeeed&clientId=u43978f3c-b3e1-4&from=paste&height=225&id=ufb858307&originHeight=337&originWidth=509&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36263&status=done&style=none&taskId=u68ae113b-bc52-40a0-8d96-02d1a953308&title=&width=339.3333333333333)

**图 3**

Ⅳ、分别介绍一下「双向」、「镜像」和「更新」的含义，如果你需要更贴合自身的规则可以点击绿色齿轮自行设置。

#### 双向

当你选择「双向同步」的时候，软件就会执行源文件夹、目标文件夹两个文件夹的任一数据变动都会自动同步。根据作者实测，当没有同名文件时，软件会在源文件夹和目标文件夹中补齐自己没有的文件；当有同名文件时，会保留最新的文件并在两个文件夹中同步。

> 举例：如图 4-1 所示，同步前，桌面测试文件夹中有文件 1 和 2，D 盘测试文件夹中有文件 2 和 3，其中文件 2 同名但是 D 盘中的更新一点（如图 4-1 框中显示的那样，右边 D 盘测试文件夹中的文件 2 修改时间更晚一点）。 点击「比较」，会显示有差异的文件，不用管，我们选择双向规则，然后点击「同步」。如图 4-2 所示，等同步完成后，我们可以看到桌面和 D 盘测试文件夹中均有文件 1、2 和 3，其中文件 2 是修改时间更晚的那个，之前桌面中修改时间早一点的文件 2 会被放入回收站中。

![1675233573795.jpg](https://cdn.nlark.com/yuque/0/2023/jpeg/29369225/1675233581328-31d4b833-507b-478a-b275-3b9db519f47a.jpeg#averageHue=%23f8f8f7&clientId=u43978f3c-b3e1-4&from=paste&height=326&id=u8c9250b7&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=280136&status=done&style=none&taskId=u171da53a-699c-4889-b300-3142f53606c&title=&width=579)

**图 4-1**

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29369225/1675233828333-f51b7581-5d7c-48f5-b882-efd5e38eacdf.png#averageHue=%23f8f8f7&clientId=u43978f3c-b3e1-4&from=paste&height=326&id=u7596d2ed&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=215814&status=done&style=none&taskId=u283b0035-3445-4483-ae00-3ff5d22ba20&title=&width=579)

**图 4-2**

#### 镜像

当你选择「镜像同步」的时候，软件就会执行以下操作：①删除目标文件夹中的文件；②将源文件夹中的内容复制到目标文件夹中。

> 举例：如图 5-1 所示，同步前，桌面测试文件夹中有文件 1、2 和 3，D 盘测试文件夹中有文件 2，其中文件 2 同名但是 D 盘中的修改时间更晚一点。 点击「比较」，会显示有差异的文件，不用管，我们选择镜像规则，然后点击「同步」。如图 5-2 所示，等同步完成后，我们可以看到桌面和 D 盘测试文件夹中均有文件 1、2 和 3，其中文件 2 是桌面中修改时间早一点那个，即镜像同步为使目标文件夹和源文件夹一样。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29369225/1675234676777-82069043-99a9-440d-a3d0-36447a356ee9.png#averageHue=%23f8f8f7&clientId=u43978f3c-b3e1-4&from=paste&height=330&id=ufd73763e&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=219027&status=done&style=none&taskId=u8a455df3-aab2-43d1-adda-2cbf3d55212&title=&width=587)

**图 5-1**

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29369225/1675234729832-adf83ec7-dec1-4299-8c46-78c090c224c5.png#averageHue=%23f8f8f7&clientId=u43978f3c-b3e1-4&from=paste&height=333&id=ue641168d&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=211316&status=done&style=none&taskId=u3ff1c410-6712-4ff3-b06a-92d7184df00&title=&width=592)

**图 5-2**

#### 更新

当你选择「更新同步」的时候，软件就会将目标文件夹中没有的文件从源文件夹中复制到目标文件夹中。

> 举例：如图 6-1 所示，同步前，桌面测试文件夹中有文件 1、2 和 3，D 盘测试文件夹中有文件 2 和 3，其中文件 2 同名但是 D 盘中的修改时间更晚一点。 点击「比较」，会显示有差异的文件，不用管，我们选择更新规则，然后点击「同步」。如图 6-2 所示，等同步完成后，我们可以看到桌面和 D 盘测试文件夹中均有文件 1、2 和 3，其中文件 2 仍然是各自文件夹中的原始版本，说明更新只会将目标文件夹中没有的文件复制过来。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29369225/1675235085392-21108ed5-6065-454f-8301-9131d330234c.png#averageHue=%23f8f7f7&clientId=u43978f3c-b3e1-4&from=paste&height=330&id=u9d0cd19f&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=218966&status=done&style=none&taskId=u425e82cd-b0da-4d7a-98d2-7259fa3fcfa&title=&width=587)

**图 6-1**

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29369225/1675235222012-2234e7ed-c249-4cc2-89fe-814f3884cc31.png#averageHue=%23f8f8f7&clientId=u43978f3c-b3e1-4&from=paste&height=330&id=uf8958b75&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=213451&status=done&style=none&taskId=ueffa692e-8e9f-4075-9541-19f5ab04482&title=&width=586)

**图 6-2**

#### Tips

以上操作学会后，恭喜你，基本可以无障碍使用 FreeFileSync 同步功能了。

在同步过程中会遇到删除或者覆盖等操作，如果你误操作可能会造成损失，但是没关系，软件本身会将被删除或覆盖的文件放入回收站中，你可以在那里找到文件，并恢复。但是我更建议你设置一个文件夹用来存放这些文件的历史版本，操作如下：打开软件 → 点击绿色齿轮 → 点击历史版本 → 选择指定文件夹（用于存放被删除或覆盖的文件，以便找回）→ 命名规则选择时间戳（文件夹）→ 限制文件历史版本数（设不设随你）。这样的话你可以在设置的文件夹中找到被删除的文件。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29369225/1675236550946-1e67e802-606e-4b29-8fd1-32fedff03d88.png#averageHue=%23f5efee&clientId=u43978f3c-b3e1-4&from=paste&height=428&id=u3cecd8ac&originHeight=759&originWidth=1033&originalType=binary&ratio=1&rotation=0&showTitle=false&size=119013&status=done&style=none&taskId=u5052c655-0439-4daf-b679-d85d2e20d8f&title=&width=582.6666870117188)

**图 7**

### 3. 自动同步

由于作者水平有限，目前这方面的内容还不会。嗯，就是这么理直气壮。

## ⛳ 最后，作者的话

其实这个软件的同步功能相当丰富，等我学会了更多再来更新本教程。如果你有啥不懂的，问我就行。