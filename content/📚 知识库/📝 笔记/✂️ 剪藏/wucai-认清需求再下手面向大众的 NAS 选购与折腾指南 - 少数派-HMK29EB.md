---
publish: true
created: 2026-02-02T09:21:36.973+08:00
modified: 2024-10-08T09:21:37.000+08:00
cssclasses: ""
---


# 认清需求再下手，面向大众的 NAS 选购与折腾指南 - 少数派 

#Wucai

> [阅读原文](https://sspai.com/post/89214)
> [在五彩中查看](https://marker.dotalk.cn/#/?nx=HMK29EB&vs=1)


## 划线列表

> [!Highlight] 
> <font color="#FFFF83">◇  </font> 总的来讲，对于入门用户，根据预算和盘位需求，选择大品牌的成品 NAS 肯定没错。如果对 NAS 有特殊需求，或追求极致性价比，则可以尝试自行组装 NAS（淘宝咸鱼也有有偿装机的一条龙服务）。

> ^bc653a9



---


## 全文剪藏
**编注：**本文入选「自力更生」征文活动。本次征文选题灵活，只要围绕「自托管」展开即可，软件推荐、经验分享、技术科普、观点评论均可投稿，6 月 23 日前发布投稿文章即可。入围作品均可获得稿酬、Zeabur 订阅、少数派 PRIME 会员等奖励。[**了解详情**](https://sspai.com/post/88807)

---

## 前言

2015 年，一次机缘巧合（其实是买移动硬盘买错了），我有幸接触到了 WD MyCloud。虽然现在看来，它充其量只是块插着网线的移动硬盘，毫无可玩性，但却为我开启了新世界的大门。原来，不只有移动硬盘，个人用户可以部署网络储存。

正值我疯狂追番的年纪，却苦于每次下载好新番后，一遍遍用数据线拷到手机。看过的老番又不舍得删，500G 的硬盘越来越小。MyCloud 的出现解决了彼时所有的需求，我突然发现，NAS 不就是我观影之路、乃至个人储存的终极答案吗。

尝到甜头后，自然诞生了进一步的需求：既然能做到 24 小时在线，为何不可以通过它直接管理下载？除了下载，能否帮我自动备份电脑硬盘的文件？如果我不在家，能不能用流量看我下载好的动画？或者，还能做到更多？

由明确的需求驱动，几年间我尝试了许许多多的 NAS 产品，也探索过大大小小的 Docker 软件。他们有些确实能提高生活品质，但亦有些只是为了折腾 NAS 而创造出的伪需求。好用与否，因人而异。这篇文章中，我从需求出发，简单分享一下 NAS 的使用心得。希望可以对浏览本文的你带来一些启发：如何选购一台 NAS？有了 NAS 又可以做什么？

**声明：**文章中不可避免对品牌及软件有所提及，但没有任何推广成分。

## 硬件与系统：从这里出发

对于新手，直接购买主流品牌的成品 NAS 是推荐的入门方式。这类产品不但有开箱即用的硬件配置（硬盘需要单独购买），还预装了主流的 NAS 系统，即便使用中遇到问题，也能轻松寻求网友或客服或帮助。需要注意的是，各品牌间的系统无法互相兼容，购买前务必提前了解一下它的系统，避免买完发现用起来不顺手。当然，只要避开冷门产品，市面的主流系统都能带来不错的使用体验。

部分品牌如群晖在官网中提供了在线演示，无需注册即可体验大部分功能，强烈建议用户在购买前试用一下：

* 群晖：[https://demo.synology.cn/zh-cn/dsm](https://sspai.com/link?target=https%3A%2F%2Fdemo.synology.cn%2Fzh-cn%2Fdsm)
* 威联通：[https://www.qnap.com.cn/zh-cn/live-demo](https://sspai.com/link?target=https%3A%2F%2Fwww.qnap.com.cn%2Fzh-cn%2Flive-demo)
* 极空间：[https://tiyan.zspace.cn/](https://sspai.com/link?target=https%3A%2F%2Ftiyan.zspace.cn%2F)

![](https://g1proxy.wimg.site/sImnEJ8527z7mzS03lFFnUMLtkphLjiXRW4tKdMEaSHA/https://cdnfile.sspai.com/2024/06/06/7b31bc39cab47e0736628b3a00300225.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

群晖 DSM 在线演示

如果具备一定的使用经验，除了选购成品 NAS，你也可以像组装电脑一样，自己动手组装一台 NAS，因为它们在硬件上本来就高度相似，无非集成度带来的尺寸问题。在操作系统的选择上，除了通过配置补丁来引导群晖 DSM 等系统外（不推荐，有法律风险），也有 Unraid、TrueNAS 及 OpenMediaVault 等专为 NAS 打造的系统，使用体验毫不逊色于成品 NAS。

由于对配置要求较低，家里淘汰的电脑硬件也有机会再次发光发热。即便重新购买，相比同配置的成品 NAS 也会便宜很多。你还可以根据自身需求，实现灵活的配置组合，例如增加独立显卡实现硬件解码、或安装万兆网卡虚拟软路由，解锁 All in boom 的进阶玩法。只要具备一定的基础知识与解决问题的能力，组装 NAS 也不失为一种好的方案。

> 前两年有众多诸如「星际蜗牛」之类的矿渣设备流入市场。它们价格低廉，一度在社区中广泛流行，经常能看到用户分享使用心得。矿渣有风险，上车需谨慎。这类产品通常存在潜在的安全风险，不排除一些明雷暗病，轻则设备损坏，重则硬盘报废。不同的型号也有各种坑需要特别留意：例如「星际蜗牛」供电较差，需自行更换电源；「猫盘」时不时会掉 IP，非常搞人心态。对于这类产品，买来折腾一下尚可，倘若正经储存资料，十分不推荐选择！

总的来讲，对于入门用户，根据预算和盘位需求，选择大品牌的成品 NAS 肯定没错。如果对 NAS 有特殊需求，或追求极致性价比，则可以尝试自行组装 NAS（淘宝咸鱼也有有偿装机的一条龙服务）。不考虑黑群辉的前提，两者简单对比如下：

| | 成品 NAS | 组装 NAS                         |                             |
| -------- | ------------------------------ | --------------------------- |
| 操作系统     | 开箱即用，通常无法更换系统                  | 需要自己安装，但可以随意更换系统            |
| 应用商城     | 自带应用商城，一键安装。部分机型支持安装 Docker 应用 | 无官方商城或官方应用，以开源的 Docker 应用为主 |
| 扩展性      | 「买定离手」，除了中高端设备外不支持硬件升级         | 选择灵活，可随意升降级硬件               |
| 硬盘盘位     | 「买定离手」，除了中高端设备外无法扩展硬盘柜         | 只要接口够，硬盘无上限                 |
| 售后服务     | 售后完善，多支持 7x24 小时服务             | 需要自己研究解决                    |
| 价格       | 价格相对较高                         | 同配置价格更低                     |

### 群晖 Synology

群晖是专业 NAS 市场的领导品牌之一，早在 2000 年于台湾成立。经过 20 多年的技术沉淀，群晖 DSM 在安全性、易用性与美观度上遥遥领先，是当今家用 NAS 的主流选择之一。不过，DSM 在一定程度上导致群晖存在品牌溢价，用高情商说法，这叫为系统付费。当然，在这么多系统中， DSM 也确实好用。

塔式 NAS 中，群晖有 J 系列、Value 系列、Plus 系列与 XS 系列四种可以选择：

* J 系列面向入门用户，群晖唯一的白色外观，不过仅有双盘位型号。CPU 采用 ARM 架构，不支持 Docker，只能安装套件中心的应用，可玩性有限
* Value 系列面向大众用户，1 到 4 盘位均有选择。依旧是 ARM 架构，但今年开始支持 Docker 大受好评，终于不用加钱上 Plus 了
* Plus 与 XS 系列面向高阶用户，盘位选择多样。支持安装 M2 SSD 做缓存盘，部分型号还提供了额外的内存与 PCIE 插槽，甚至还能扩展硬盘柜，当然价格也十分高昂。正面开始采用家族系外观，简洁大方，个人感觉是群晖里最好看的设计

若预算充裕，选购时尽量从 Value 起步，不仅外观更好看，由于原生支持 Docker，软件层面的可玩性也会更高。如果你不会或无法安装 Docker 应用，套件中心也提供了非常丰富的第一方软件。无论是常用的媒体三大件 Video Station、Audio Station 和 Synology Photos，还是小众的 Mail Station 抑或者 Note Station，相信都可以满足你的需求。

除此之外，热门第三方软件也会在商城上架，覆盖面非常广。甚至还可以添加网友分享的自定义源，解锁更多自制应用。

![](https://g1proxy.wimg.site/szzX3eBDXVJaEiEY4XJtEuUGFml_1lMPSUChjQ8SHzV8/https://cdnfile.sspai.com/2024/05/30/4b913bbccbe94b40d9b40f12ee0f1430.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

自定义源的部分应用展示

在 2021 年正式推出 DSM 7.0 后，群晖重做了多款常用软件，不仅有全新的功能加入，UI 也采用了与 7.0 同源的设计风格。例如相册软件 Synology Photos 整合了 Photo Station 与 Synology Moments 的多种功能，无论在人脸识别的准确率，还是手机 APP 的易用性上，均属于相册类软件的第一梯队。

至于部分无缘重做的软件（如 Audio Station 等），则依旧保留着旧版的视觉风格。功能上除了免费以外没什么特色，估计开发团队觉得能用就行吧。好在它们都有不错的第三方软件可以替代，不必非吊死在群晖这棵树上。

![](https://g1proxy.wimg.site/sUkP0r3Bnb9uxqS-7YYa2GvyUPMabLDL-gSLPNd3Nifk/https://cdnfile.sspai.com/2024/05/31/91d2f7cacc1a76a170e2c817768b4cc4.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

群晖 Audio Station 套件

众多高级功能中，Quickconnect 绝对值得单独一提。不需要公网 IP，也不需要复杂的网络设置，只用一个 QuickConnect ID 就能享受安全的外网访问。不过也别高兴太早，国内的网络环境中，实测大多数情况下，Quickconnect 穿透后速度只有可怜的 5 Mbps，顶多适合出门在外救个急。如果对穿透有刚需，还是得用更专业的 [ZeroTier](https://sspai.com/link?target=https%3A%2F%2Fwww.zerotier.com%2F) 或 [DDNSTO](https://sspai.com/link?target=https%3A%2F%2Fwww.ddnsto.com%2F) 等软件。

**总结：**系统的优秀无需多言，丰富的型号也足以满足多样化的使用需求，型号上除了面向小白的入门级 NAS，更有面向~~发烧友~~的机架式服务器可选。对于大多数用户来讲，从群晖入门 NAS 都是一个不错的选择。

### 威联通 QNAP

威联通也是一家专业 NAS 厂商，于 2004 年在台湾成立，曾经与群晖一同占据了国内 NAS 市场的大半江山，也曾是家用领域群晖最大的竞品。威联通在型号的选择上十分丰富，更有独具特色的 NAS 产品：例如自带 3.5 寸与 2.5 寸两种托架的塔式 NAS，同时兼顾了内容储存与高速阵列组建；以及自带双 HDMI 接口的无风扇静音 NAS，支持 4K 输出，简化了电视观影的难度，适合有独特需求的用户选择。

![](https://g1proxy.wimg.site/s0c6RcmHR1-BrguulDLBJmX3spoAZxwr_Cu25aJps88g/https://cdnfile.sspai.com/2024/05/31/17607ce914c6466186a5611aa1defb86.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

我曾使用过老款 HS-210，非常适合租房放在卧室

2021 年，威联通将系统升级到了最新的 QTS 5.0，采用全新 Linux 内核，安全性与稳定性均有所加强。至于宣称「重新设计」的「全新」 UI ，不能说跟 4.0 很相似，只能说一模一样，连图标都没变，单纯调整了一下尺寸大小，真是幽默。设计上依旧保持了 iOS 7 世代的风格，主打一个返璞归真。好在流畅度上确实有优化，这点给个好评。

![](https://g1proxy.wimg.site/sAku5lCAFH0fA2VF-RpVVBqu70NgHIYwG2i7xLuS5m_U/https://cdnfile.sspai.com/2024/05/31/1accd28c915d1a6ede7812975a55798c.jpeg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

QTS 5.0

尽管视觉体验仍需改进，威联通 QTS 在功能与软件层面可不差。作为老牌厂商，威联通的软件商店提供了数量丰富的应用程序，群晖拥有的大部分应用在威联通上都有对应（虽然不好看）。自家的相册应用 Qumagie 在综合 AI 能力下比群晖 Synology Photos 更强大，全新的 UI 也算达到了 **2020** 年的平均水平，值得夸强。

**总结：**如果不在乎 UI，威联通的系统体验与群晖较为相似。同配置的 NAS 价格比群晖更友好，适合追求性价比的用户选购。

### 绿联/极空间等

除了群晖威联通，NAS 届还有绿联、极空间、华为等新晋 NAS 品牌选择。经过几年的发展与迭代，这些产品或多或少积累了一定数量的用户群体。庞大的用户基数意味着厂商会更加重视用户体验，不仅能获取持续的功能和安全更新，也不需要担心突然跑路。由于我自己没有长期使用，干脆把它们放在一起简单介绍。

对于普通用户在意的价格，这类产品优势很大。不仅售价亲民，核心功能也没落下，甚至一些体验比群晖做的更好，例如相册快速备份，以及自动刮削生成海报墙等。手机 APP 的本地化比起大牌更加完善，家里的老人也能快速上手查看照片，学习成本很低。不可否认，对于大多数用户，这类产品足以达到期望值，满足主要的储存与分享需求，毕竟不是所有人都有功夫天天折腾 NAS。

不过要想更进一步，需要考虑的就多了。首先原生应用数量实在有限，更多依赖用户自己安装 Docker 应用。其次细节上也还需要进一步打磨，比如绿联的权限问题一直饱受诟病。就在 6 月初，绿联全新打造的 UGOS Pro 系统尚未开发完成就急于发布，BUG 不断，产品口碑断崖式下跌。上述种种问题都需要时间来优化和完善，并非一蹴而就，只能说未来可期。

软硬件之外，NAS 产品的外观鲜有被人提及。虽然软件层面仍需要时间追赶，但外观设计不依赖产品底蕴，说一句遥遥领先也不为过，可以给台厂一点小小震撼。不少用户买了绿联 NAS 只为一个外形，到手改 BIOS 刷系统一气呵成。希望有一天，心水已久的极空间 P8 也能安装 Unraid 来个绝杀。

![](https://g1proxy.wimg.site/scsKLR1GYqNsqRCmeNbcBjml4CVvzmHhZo8Kjvi9FZRQ/https://cdnfile.sspai.com/2024/05/31/4b7a32a7070e1205cb7f15a76e35399f.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

极空间 P8，真帅！

**总结：**如果预算有限，只有简单的功能需求，可以尝试此类产品。另外，由于国产 NAS 系统正在起步阶段，内容审查制度仍不明朗，偶尔会有风言风语出现，对于需要储存特殊内容的用户务必谨慎考虑。

### Unraid

如果不打算选购成品 NAS，就需要自己动手安装操作系统。常见的 NAS 系统有 Unraid、TrueNAS、OpenMediaVault 等。需要注意的是，这类系统不提供桌面模式，而是通过类似 Dashboard 的后台来管理，初次使用有一定学习成本，需要一定时间上手。

我曾短暂体验过 TrueNAS 与 OpenMediaVault 但浅尝辄止，它们入门门槛较高，也没有吸引我的功能特性。反倒是 Unraid 系统，凭借独特的阵列模式，以及高上限的丰富玩法，这几年在国内社区迅速走红，收获了大量 NAS 用户。

如果你不满足于传统的磁盘阵列，不妨来尝试一下 Unirad，主要优势有三个：

* **冗余：**允许用户选择是否做数据冗余，最高支持 2 块校验盘。做冗余的校验盘不需要在创建阵列时添加，可以随时新增或移除。若移除校验盘，阵列会回到无数据保护的状态，而不影响储存的数据
* **阵列：**阵列内硬盘在 Unraid 中叠加为「储存池」的形式，数据会根据配置规则，向阵列内的一块或多块硬盘中写入。单独移除某块硬盘后，该硬盘或阵列内的数据仍能被正常读取，不会出现一块硬盘损坏造成全部数据丢失的情况
* **缓存：**支持添加多块 SSD 作为缓存盘使用，数据会优先写入缓存盘中确保写入速度。Unraid 会根据定时任务，自动将缓存盘内的数据写入阵列。此外，对于读写敏感的数据（如虚拟机等），你还可以选择将阵列数据反向写入缓存，或数据仅保存在缓存盘内，保证良好的使用体验

![](https://g1proxy.wimg.site/sxApL_VuLrS4sJKbDQ485D1r2NBLLSLOdqItMJf9sW2o/https://cdnfile.sspai.com/2024/06/03/c138b9f17fdb998df3d36869eaf74a79.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

Unraid 文件夹支持设置储存位置及移动选项

这种独特的储存模式，不可避免会带来一定缺点：

* 存在校验盘时，写入数据会同时访问阵列与校验盘，千兆下速度砍半，实测只有 60 MB/s 左右。只得再添加一块 SSD 当缓存盘，让数据先写入到缓存跑满带宽，然后再根据定时任务移动到阵列
* 如果缓存盘加的太小，写满后会导致正在执行的任务强制停止（如下载暂停，或虚拟机报错）。缩短定时任务的间隔时长是一种方案。另外也可以在商城安装 「Mover Tuning」 插件，实现缓存将满时自动移动至阵列
* Unraid 的储存形式决定了它难以实现全盘加密，万一硬盘被盗，数据不设防可以被直接读取。尽管存在 「Duplicati」 等软件实现数据加密，但难以覆盖全盘，还失去了「一块硬盘损坏，其余仍可读写」的特性

如果条件允许，推荐使用校验盘的用户搭配 SSD 使用。除了提高读写速度，还能让下载任务优先保存在缓存盘，配合硬盘自动休眠，减少机械硬盘「炒豆子」的噪音，并降低整机功耗。

> 前置声明：下述内容仅供扩展思路，并非选购建议。
> 
> 矿难结束后，除了矿渣设备外，还有大量 SSD 与机械硬盘流入市场。这类 SSD 通常寿命过半，写入量可达上百乃至上千 TBW （TBW 是固态硬盘的总写入容量，与硬盘寿命挂钩），但价格相比全新便宜的多，二手市场中有一定的销量。尽管我自己曾淘到过一块 500 TBW 的 SN750 2T 当下载缓存（官方寿命为 1200 TBW），用了两年也没出过故障，但仍不推荐任何人选择。矿盘有风险，选择需谨慎。
> 
> 至于机械硬盘，如流通较多的 HC530，尽管没有写入寿命一说，但它们通电时间长，且长期处于高温工作环境，翻车概率较普通硬盘高。即便能长期使用，噪音也会更大，很难放在卧室使用（亲身体验）。借网友的一句话来说，这类产品并非性价比高，单纯只是价格便宜。

作为商业化 NAS 系统，Unraid 需要付费使用，根据提供盘位不同分为 49 和 109 美元的年度订阅，或花 249 美元永久买断。前者的年度订阅到期后仍可以正常使用，但若不支付 36 美元的后续年费，将无法再接收大版本更新。值得一提的是，上述售价是今年 3 月份刚刚调整的，之前不限硬盘数量的 Pro 版只需要 129 美元（幸亏上车早）。

![](https://g1proxy.wimg.site/svxKd9-SmLW0IjhCmTp3Dk6d6AG8XKqPkfgMGXSnbKPs/https://cdnfile.sspai.com/2024/06/03/c49be58abad97bc54c3a1dd433ebcb57.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

Unraid 更新后的订阅价格

**总结：**Unraid 独特的阵列模式并非适合所有人，但若有阵列要求，这种模式别无二家。Docker 与虚拟机支持硬件直通，可以搭建 All in one 平台。不过，Unraid 没有桌面模式，自带的文件管理器聊胜于无，需要安装第三方软件解决；系统配置相对复杂，尤其是各 Docker 的权限设定，需要一定动手能力。总的来讲，Unraid 更适合进阶用户选择。

## 机箱：没有功能，只有好看

在讲软件之前，我想单独用一个大章，谈一下被多数人忽视的机箱选购。本人从事设计行业，对目所能及的东西都有一点点的审美要求（或许有人已经发现了，我在介绍系统时对 UI 十分执着）。而有一个设计优秀的机箱摆在家里，平日里看到也会心情愉悦。

这两年随着 NAS 用户群体的增加，除了银欣、乔思伯等老牌机箱厂，还出现了许多设计优秀的客制化 NAS 机箱，在结构、用料还是外观上都有一定讲究。千万别被「客制化」三个字吓到，不像是键盘圈子，尽管确实存在上千元的全铝机箱，但更多是面向大众用户，价格位于 400 - 800 元之间。我在此抛砖引玉，给打算组装 NAS 的用户一些参考。

### 迷你主机

这类产品其实是一种准系统，出厂时已经包含了必要的硬件，到手后插入内存和硬盘就能使用。它们外观精致，体积小巧，还不用考虑占位，家里随便哪里都可以放的下。型号上除了常见的 Intel NUC 和联想 ThinkCentre Tiny 等大厂机型外，这两年市场上涌现了超多类似产品，不乏有独特的外观设计可以选择（NAS 的一些玩法如硬解存在显卡兼容性问题，因此尽量选择 Intel CPU 的型号）。

![](https://g1proxy.wimg.site/sBaMcSg7ZdyHB4Of-rfrUgt3N8CyYo1ietcJcyn963Yw/https://cdnfile.sspai.com/2024/06/03/ac5f9c02bc5e610079ada6a5ccd4cd71.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

仿 Macintosh 造型的 AYANEO Retro Mini PC AM01

另外，迷你主机除了 M.2 硬盘外，通常最多仅支持一块一块 2.5 寸的 SATA 机械硬盘。目前市面上可选容量最高只有 5TB，而且部分机型无法兼容 15mm 的硬盘高度，购买前需要特别留意。如果对盘位与容量要求不高，完全可以考虑尝试。

推荐度：★★★★☆

### 银欣

![](https://g1proxy.wimg.site/sgJobCZIQU4TRM0oWNJVu5Ik9TY0cHnWRhJp1L2sSriU/https://cdnfile.sspai.com/2024/06/03/dd96915f913b6abffe2c449dcd087008.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

银欣 DS380

在客制化 NAS 机箱兴起前，银欣是少有几个做 NAS 机箱的品牌之一（不讨论全塔机箱），其热门型号 DS380 我愿称之为那几年的年度最佳（毕竟实在没得选了）。DS380 采用 8 盘位设计，兼容 mATX 主板，前面板可以开启，不仅支持上锁保护硬盘被盗，还可以挡住面板指示灯或锁定开机按钮，避免小孩和宠物误触关机（瞧瞧什么叫用户体验）。

机箱整体用料不错，设计语言比较古老，但放到今天依旧能打。实际上手后会感觉质感一般，尤其是两面防尘网结构粗糙，放在今天对不起 800 元的售价。除此之外硬盘区域的散热也存在问题，虽然两颗风扇对着硬盘在吹，但是风道设计不合理，凉风难以穿过硬盘，需要魔改优化。根据我亲身经历，长时间高温会导致硬盘托架的把手软化变形，真的能逼死强迫症。

![](https://g1proxy.wimg.site/sUm5BsBHJ6sGydlBVMXCNSeFWtvinVEZp11vsCT72QG0/https://cdnfile.sspai.com/2024/06/03/8ca5dd7aa3f65eb898a79345a2bf6dad.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

银欣 CS381

银欣在 2018 年推出了另一款 CS381 机箱，依旧是 8 盘位设计，兼容 mATX 主板，不过允许安装更长的显卡及水冷散热。宣传图上看似庞大，实际体积只比 DS380 大出 6L。前两年我非常喜欢这个机箱（心中的白月光），奈何 1700 元的售价始终下不去手。如今好看的客制化机箱太多了，因此也不推荐给普通用户。

推荐度：★★★☆☆（银欣 DS380）

推荐度：★☆☆☆☆（银欣 CS381）

### 乔思伯

作为新晋机箱厂之一，乔思伯主打颜值 + 性价比，在电脑机箱领域推出过多款经典型号。眼看这两年 NAS 市场的火爆，乔思伯不甘落后，陆续发布了 N1 到 N4 四款机箱，兼容 5 - 8 硬盘盘位与 iTX 至 mATX 多种版型。不过这个牌子的部分产品做工一般，会有面板边缘割手的情况，选购具体型号前有必要多看看买家评价。

![](https://g1proxy.wimg.site/sFTGUdF6zi-qiT6XDJMP_eG4_i4q7lFgOjJILzwgoFuU/https://cdnfile.sspai.com/2024/06/04/16539761e64609a21a2204dac3bf3fa3.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

乔思伯 N3

相比后面要介绍的客制化机箱，大厂品牌在兼容性方面的优势极大，例如乔思伯全系 NAS 机箱都支持 SFX 电源，相比 1U 电源选择面更加丰富；防尘设计也十分到位（客制化机箱大多都需要自行加装防尘网，虽然不贵但很麻烦），配合 500 元左右的售价，比较值得入手。

推荐度：★★★★☆

### NBOX

NBOX 是最早推出的客制化 NAS 机箱之一。我还记得作者在博客上下豪言壮志：模组化设计、内置 UPS、硬盘柜扩容、PCIE 拆分等等。从渲染图上看正脸外观简洁，堪称艺术品，放到今天仍是第一梯队。而且首发价只要 699，这价格还犹豫什么，马上交钱上车。

![](https://g1proxy.wimg.site/swRNX0sg6ooOJo77rEnJuNG4ZqFA9poOPIaUgbjMaHKs/https://cdnfile.sspai.com/2024/06/03/5bf4841a95000d5ca0536a1bfa06f9cf.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

NBOX 渲染图（正脸与实机差距不大，但背面堪称灾难）

历经多次改版与跳票后，首批终于发货（我预购晚，还要等几个月）。根据群友反馈来看，氧化效果很棒，倒角开的很漂亮，整机质感确实可以。主板采用倒置设计，构思巧妙，然而结构设计不太合理，若要拆分 PCIE 通道，会导致安装难度会直线上升。

外观方面，机箱正面与宣传图差距不大，但背板跟放弃治疗了一样，开孔毫无美感，不仅无法固定 PCIE 挡板，空置的部分还会留下大洞，只能靠贴贴纸遮挡，属实有点难评。后来作者改进了背板设计，将主板正置并留出多个半高 PCIE 位置，不过需要额外选配。

硬盘扩展柜我记不清有没有卖过，但众筹时画的 UPS 大病肯定是没上过。目前机箱已经停产，估计不会再有后续了。如果对这个机箱感兴趣，可以从咸鱼淘一下二手，不同批次和套件搭配的价格，从 300 至 800 元不等，性价比尚可。

推荐度：★★★☆☆

### TANK

![](https://g1proxy.wimg.site/siSUi6nLNzcoM7F6JrmXTPJSTBgfPYTVnETzlAjz6YKg/https://cdnfile.sspai.com/2024/06/03/f5cf626bfa53afa673ef6cc1fbdf8f6c.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

TANK NAS

TANK NAS 有深浅双色可选，支持横置或竖置。正脸外观偏机甲风，这点见仁见智，不过可能不太好与家庭环境搭配。机箱采用 6 盘位设计，兼容 mATX 主板，能支持全高的 PCIE 这点比较少见。社区中的评价不错，一些小问题作者会采纳并改进，经过多次迭代，现在~~竟然~~已经出到第 6 版了。另外作者还在群里众筹搞了个 D1581 主板，去年终于做出来了，有兴趣可以尝试一下。

总的来讲是个很均衡的机箱，前提你只需要 6 个盘位。机箱售价为 699 元，性价比尚可。

![](https://g1proxy.wimg.site/s1YZQbzEFa-UXXYRfhz5yXbEJEW4AtY2Jby2YHMBiKDY/https://cdnfile.sspai.com/2024/06/03/429643ca20a6a5b6c8331d656aa6d50c.jpg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

TANKC8+8

他们家还有一款 TANKC8+8 机箱颜值也很高，半透明硬盘托架、4 槽位全高 PCIE 设计、兼容 SFX 电源。作者宣称主打性价比，仅售 699 交个朋友。不过从 2022 年鸽到现在，一点动静也没有，不知道还能不能等到。

推荐度：★★★☆☆

### 宝藏盒

又是一款设计独特的 8 盘位机箱，兼容 mATX 主板，但仅支持半高 PCIE 设备。CPU 散热有限高，但可以安装水冷系统。前面板使用木质外壳，根据颜色不同木板材质也有所不同。初期版本顶部采用钢化玻璃，喜欢 RGB 主板的小伙伴有福了（实无卵用，还影响散热，1.2 版本改回了带散热孔的金属板）。

新款机箱优化了硬盘区的风道，散热表现相比旧版有所提高，但一些不合理的开孔依旧没有调整（例如侧面开孔被电源遮挡）。相比其他 NAS 机箱，宝藏盒的前面板可以选购带鱼显示屏（屏幕价格 500 左右），视觉效果炫酷，逼格拉满。机箱售价 689 元，做工与品质对的起售价，可以放心上车。

![](https://g1proxy.wimg.site/sH7pCuIyMN8w2rykj_L0dH893kqbfC4w9RGY_J3c1XT4/https://cdnfile.sspai.com/2024/06/03/643d3a8aedb7301f9eac819025dde014.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

安装屏幕的宝藏盒机箱

作者去年还推出了宝藏盒 Pro 机箱，外观与做工更加精致。不仅兼容 ATX 大主板，更是支持 SFXL 电源。虽然有 7 个 PCIE 槽位但依旧仅支持半高，大显卡又只能观望咯。售价翻倍来到了 1399 元，性价比较低，不建议普通用户选择。

推荐度：★★★★☆（宝藏盒）

推荐度：★★★☆☆（宝藏盒 Pro）

### 星之海

![](https://g1proxy.wimg.site/sTNBIx4iab95VmR2qJJyL6rv36o12nOV0Jn1vxR5r_E4/https://cdnfile.sspai.com/2024/06/04/e5bed1e6d51d9f1b761356bdabee81bf.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

半人马座

据说星之海的作者是机箱行业大佬，辞职出来做的半人马座机箱，没想到反响热烈，于是陆续推出了御夫座、射手座、天蝎座、天箭座等型号，均采用星座命名，覆盖了从 349 到 1199 元不同价位。

低价产品主打性价比，高端产品强调品质与做工，各型号口碑都不错。根据拆解图来看，几款机箱的结构设计比较合理，空间利用率高，甚至还能安装 ATX 电源。无论预算多少都有合适价位的机箱，值得尝试一下。

推荐度：★★★★☆

## 软件：实现你的托管需求

终于到了软件部分。这一章主要分享这几年在影音方面折腾的经验（这也是我对 NAS 的核心需求）。由于篇幅所限，更多有趣的 NAS 软件会在最后简要提及。 

与前两部分一样，在软件选择上，除了功能层面，UI 与用户体验也会作为重要的考量因素。

### 媒体服务器

主流的媒体服务器有三大金刚：Plex、Emby 和 Jellyfin，相信了解 NAS 的用户早已耳熟能详。比起传统的文件夹播放，这类软件提供了更加强大且灵活的解决方案，帮助你管理与访问 NAS 中的影音内容。虽然听起来噱头十足，对普通用户来说，核心功能无非以下两点：

* **媒体库管理：**仅需简单设置就可以自动扫描并组织 NAS 中的电影、电视节目与音乐等内容。搭配软件自动刮削，新手用户也可以轻松创建媒体库，生成壮观的海报墙
* **转码与多平台支持：**无论是智能电视还是机顶盒都可以根据设备实时转码，避免芯片过老或格式兼容导致的卡顿与偏色。另外，出门在外时，也可以手动降低视频码率，适应不同的网络环境，起到节省流量的作用

如果你觉得不过如此，那说明你不是这类软件的目标用户（没有贬义成分）。假如对海报墙不感兴趣，对硬件解码没有刚需，传统的文件夹播放又有何不可？况且越来越多的播放器加入刮削功能，硬件解码也早已不再困难，对于轻度用户已经完全够用。

作为过来人，我不会直言他们是伪需求。存在即有价值，适不适合自己，只有亲自尝试过才知道。不用担心被网上复杂的安装过程劝退，作为面向大众的软件，这些软件在群晖等系统中均可一键安装，只要跟着配置走，即便是小白也能轻松上手。也不用担心订阅问题，除了硬件解码外的基础功能均可免费使用。究竟适不适合自己？待到完全体验后，在下结论也不迟。

尽管 Plex、Emby 与 Jellyfin 三者功能相似，但使用体验上仍存在一定差异。我算不上重度用户，只能从个人角度，浅谈一下三款软件的优劣。

#### Plex

在三款软件中，Plex 是 UI 设计最好看的，也是支持平台最全面的。Plex 安装非常简单，首次使用不要求用户设置远程访问等高级功能（可以按需在设置中启用），步骤十分剪短。此外，在一些播放细节上也比较人性化，例如片头跳过功能就非常实用。

如果你偶尔逛逛 NAS 社区，会发现 Plex 的讨论热度却不及 Emby 与 Jellyfin，主要是因为 2018 年官方停止了对第三方插件的支持。除了官方提供的功能外，难以满足用户的进阶玩法。目前活跃的插件寥寥无几，大多与数据分析有关，实用性不强。

作为媒体库的核心功能，官方的刮削器准确度也有限，大部分海报只能刮削出繁体版本，简体中文的信息缺失较多，需要搭配 TMM 才能达到不错的效果，比较劝退新手用户。

![](https://g1proxy.wimg.site/sJl8twU1dsjrnfoYDFrMtI0W66PTjvHB9Z3DlBuKBnaw/https://cdnfile.sspai.com/2024/06/05/50bf2ab2ed890593e4302b4672d83ed5.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

Plex 默认刮削的海报多为繁体版本

尽管 Plex 全平台兼容这点大受好评，但令人疑惑的是，官方客户端至今仍不能倍速播放，必须得用第三方播放器才能享受这项「先进」功能。然而其他播放器又不能实现硬件转码，说在意这点的用户谨慎选择。话又说回来，既然都用第三方播放器了，又何必执着于 Plex 呢？

Plex 还有一项非常好用的功能就是音乐服务器，我用了三四年，体验非常不错。在音乐管理上，评分系统、资料库电台、智能播放列表等功能均有支持。Plex 还为移动端专门开发了配套的 Plexamp 播放器（无需 Plex Pass 订阅亦可使用基本功能），UI 界面简洁美观，相比 Apple Music 和 Spotify 毫不逊色。不仅实现了网页中的大部分功能，还支持音乐下载后离线播放；在线播放也可以根据网络模式自动转码（遗憾的是最高 OPUS 256K），即使面对 Navidrome 或 Subsonic 等专业音乐服务器依旧能打。

![](https://g1proxy.wimg.site/sP2_II3jEA08RaZb_jEZrHBSOmHuAIr9pCFgkzQ0QRWc/https://cdnfile.sspai.com/2024/06/05/0822779ca8c86d458e053e3096b80776.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

Plexamp 支持跟随专辑封面变色（多种 UI 效果可选）

如果不搭配官方客户端播放，免费版的 Plex 足够使用。除非想要 Plexamp 播放器，那就得开通 Plex Pass 订阅了，年费 39.99 美元，但可以选择 119.99 开启永久，按需选择即可。

#### Emby

Emby 与 Plex 的功能非常相似，尽管 UI 与 APP 设计上稍有逊色于 Plex，不过支持安装第三方插件，仅冲着这一点就甩开了 Plex 几条街。客户端在主流平台均有支持，不仅可以开启倍速播放，解码时的资源占用率也比 Plex 稍低一些。如果对视觉要求不高，也不用音乐服务器，个人更推荐选择 Emby。

Emby 自带有插件商城，不仅可以一键安装上架的插件，Github 里大佬开发的插件也能以文件形式安装，如自动下载中文字幕的 [MeiamSubtitles](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2F91270%2FMeiamSubtitles) 等。但刮削插件较少，如果刚需则需要搭配 Jellyfin 使用。

![](https://g1proxy.wimg.site/sL3EOTL-gmy08JG6gESJ0wzeZM5-BbozA_DUM6PfDhMI/https://cdnfile.sspai.com/2024/06/05/218ff666303f59f8462898748f816bd2.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

Emby 的插件商城

Emby 也有高级会员，叫做 Emby Premiere。与 Plex 相同，永久订阅价格为 119 美元，不过年度订阅需要 54 美元，这不逼着用户上永久吗。当然，这个订阅也不是必须的，只要不使用客户端或硬件解码功能，影片整理与刮削都是免费功能。

#### Jellyfin

如果你用过 Jellyfin 和 Emby，会发现他们的使用逻辑非常相似，实际上 Jellyfin 正是 Emby 的开源分支，甚至部分插件都可以通用。网页端的 UI 还算能看，但 APP 尤其是 TV 版本真的太丑了，好在倍速是支持的。在老电视上用 2 倍速直接播放 4K 电影时，对比 Emby 更加流畅（流畅度只受 APP 影响，与服务器性能无关）。

插件方面，Jellyfin 在刮削上优势极大，无论是豆瓣源的刮削插件 [jellyfin-plugin-metashark](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fcxfksword%2Fjellyfin-plugin-metashark) 还是 bangumi 动画源的 [jellyfin-plugin-bangumi](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fkookxiang%2Fjellyfin-plugin-bangumi) 都很好用，作者也在稳定更新中。当然，你也可以将刮削的内容生成 nro 文件让 Emby 或 Plex 读取，补足刮削层面的短板。提醒一下，如果视频较多，首次向豆瓣源刮削时记得开启防 ban 功能，避免封号。

![](https://g1proxy.wimg.site/s3nDkVf1_c6a6o8TgC0e9orTAU3im_OLsI4OYD9nhmzI/https://cdnfile.sspai.com/2024/06/05/2326ce184a1c976d0ea258f004138919.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

jellyfin-plugin-bangumi 的插件设置

作为开源软件，Jellyfin 无需付费就能使用全部功能。如果平是使用硬解较多，推荐安装 [nyanmisaka](https://sspai.com/link?target=https%3A%2F%2Fhub.docker.com%2Fr%2Fnyanmisaka%2Fjellyfin) 大佬的版本，硬解与 HDR 转 SDR 的效率更高。

在 Github 上，也有几款非官方 APP 出现，例如 iOS 的 [Swiftfin](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fjellyfin%2FSwiftfin) 以及安卓的 [Findroid](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fjarnedemeulemeester%2Ffindroid)，都具备现代化的 UI 视觉。不过功能上还处于早期阶段，暂时不支持硬件解码与倍速播放等。如果有兴趣可以先 Star 一下，给作者一点开发的动力。

#### 其他选择？

如果你问我在用哪一款？不瞒你说，我还在用文件夹双击播放。

回顾这几年，年轻时花了太多的时间在折腾上（尽管折腾本身对我也是一种乐趣），实际却没看过几部电影，而这类软件对动画的支持程度也不令人满意。看似 jellyfin-plugin-bangumi 插件实现了对动画的刮削，实际上，除了 TV 版外，动画还有剧场版、SP、OVA、OPED 等类型，而这些并不适用于电影或电视节目中任何一种规则，难以被媒体服务器分类管理。除此之外，由于 Jellyfin 的 API 限制，部分季度信息仍需手动获取。因此纵使我再喜欢动画海报墙，面对硬盘里近千部动画，唯有一声叹息。

最后不要忘记，折腾软件只是过程。不要执着于伪需求，轻松舒畅的观影才是最重要的！

### 自动化

只需要在豆瓣上点击想看，就会自动帮你搜索资源 → 加入下载队列 → 匹配中文字幕 → 刮削海报封面 → 最后进入媒体服务器。看似复杂的操作，其实早已可以被自动化实现。多年以前，用户就可以通过 [Jackett](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FJackett%2FJackett%2F) 与 [Sonarr](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FSonarr%2FSonarr) 配合实现观影自动化，不过这些软件不仅没有中文界面，相互之间对接复杂，比较劝退小白。

在懒的驱动下，近两年出现了更高级的自动化工具，不仅集成了上述功能，还衍生了更多玩法。以动画为例，较为知名的便是 [AutoBangumi](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FEstrellaXD%2FAuto%5FBangumi)。只需要在相关网站订阅，就可以实现全自动追番，整理完成的名称和目录可以直接被 Plex、Jellyfin 等媒体库软件识别，无需二次刮削。

![](https://g1proxy.wimg.site/sWwW8U-q_26jJbeXbpaLZSr28YrbNMcWSVpduj0XGMoE/https://cdnfile.sspai.com/2024/06/06/094264ee06f260c4efd1c2a27bc88b9b.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

AutoBangumi 首页的追番列表

不过 AutoBangumi 目前只适合追新番，对老番的支持仍不完善。其他自动化软件也没好太多，最靠谱的还是自行下载并整理。对于动画文件的整理，我推荐使用 [BangumiRenamer](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fnuthx%2Fbangumi-renamer) 一键批量操作，节省大量时间。而且动画信息来自 [AniList](https://sspai.com/link?target=https%3A%2F%2Fanilist.co%2F) 与 [Bangumi](https://sspai.com/link?target=https%3A%2F%2Fbangumi.tv%2F) 源，相比豆瓣的内容更加准确。

![](https://g1proxy.wimg.site/sfbdZdGRU3HJFSMp8iA9jo8ppQW6exqnCfCOS_MfmGSo/https://cdnfile.sspai.com/2024/06/06/f2f871b7b7cd07675240d68d9f60c5f5.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

BangumiRenamer 的操作界面，支持多平台使用

### 播放器

随着 Alist、小雅等软件在社交平台快速传播，网盘与 NAS 播放逐渐进入了大众视野。得益于此，视频播放类软件大量增加。尤其是在 iOS 平台，不仅开发成本低，高级功能更是可以卖到近百元，吸引了众多开发者加入。除国外的老牌播放器外，不乏有许多国产精品出现，自带长按倍速、一键截图等功能，为我们带来了多种多样的选择。

上文提过，我平时主要用来看动画，所以对杜比视界或 HDR 要求不高（如果刚需 HDR，目前体验最好的非 Infuse 莫属）。在相同的影片播放中，这些播放器的画面表现差距并不明显，因此选择上会更倾向软件功能。不同平台上，我根据使用体验，简单介绍一下用过的软件：

#### nPlayer

有点「古老」的播放器，我接触 NAS 初期开始就一直在用，是当年为数不多支持倍速与 SMB 的播放器之一。对于双持党来说，还有少见的双平台支持（作者主要开发 iOS 端，安卓功能较少），有段时间换用安卓，刚好实现无缝衔接。这两年作者的更新只在修复 BUG，没有添加新功能，比起后面的软件稍显逊色。

* 平台：安卓、iOS
* 界面：★★☆☆☆
* 挂载：SMB、WebDAV、FTP 等多种，不支持国内网盘
* 倍速：可以设置上下滑动手势调整，不支持长按倍速
* 手势：选项丰富，支持自定义手势功能
* 截图：不支持截图
* 海报墙：无
* 售价：买断制 38 元，有免费版但含广告

#### MX Player

安卓上的老牌播放器之一，本月初被亚马逊收购了。软件仅支持 SMB 连接，外网无法直接使用，需要从文件管理器拉起 MX Player 播放。某一个版本开始更新了 UI 设计，外观上好看了不少。需要留意 iOS 存在同名播放器，不过并非同一款软件。

* 平台：安卓
* 界面：★★★★☆
* 挂载：仅 SMB，不支持网盘
* 倍速：双指上下滑动调整，安装模块或修改版支持长按 3 倍速
* 手势：选项丰富，但只能开启或关闭，不支持自定义功能
* 截图：不支持截图
* 海报墙：无
* 售价：买断制 5.99 美元，有免费版但包含广告

#### Reex

酷安大佬开发的播放器，自带的设置项不多，但兼容 MPV 配置文件，可玩性丰富。少见的支持帧步进功能，拉片随时随地！除此之外还能在播放界面添加自定义按钮，快速开关功能（可以参考酷安网友的分享），推荐安卓用户选择。作者上次更新还是去年 12 月，不过目前版本使用稳定，只是不太会加入新的功能了。

* 平台：安卓
* 界面：★★★☆☆
* 挂载：SMB、WebDAV、FTP，不支持网盘
* 倍速：点开「更多」才能调节倍速。支持自定义长按倍速，还可以开关长按是否震动
* 手势：选项够用，但只能开启或关闭，不支持自定义功能
* 截图：有截图按钮
* 海报墙：无
* 售价：免费，无广告

#### Infuse

![](https://g1proxy.wimg.site/sr-fE-Il-V_pcFRB_2BNvGn3uelMb8NuEwmLECXqhX1k/https://cdnfile.sspai.com/2024/06/06/7861de3f56cfaec4bac416cb43c273c4.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

谈起 NAS 播放器必然离不开 Infuse，苹果平台的口碑王，播放软件的天花板。界面美观，功能强大。格式支持全面，解码能力强悍，自带刮削功能。

* 平台：iOS、Apple TV
* 界面：★★★★★
* 挂载：SMB、WebDAV、FTP 等多种，支持 Plex、Emby、Jellyfin，国内网盘仅支持阿里云
* 倍速：点开「设置」 - 「高级设置」 - 「播放速度」才能调节倍速，不支持长按倍速
* 手势：仅能全局开关，不支持自定义
* 截图：不支持截图
* 海报墙：自带刮削生成海报墙，也可以导入御三家的海报墙
* 售价：免费使用（不订阅不能播放在线视频），年费 88 元，或终身 698 元

#### Fileball

原生 SwiftUI 开发，强迫症一本满足，目前在用中。设置中有几项实验性功能，例如开启弹幕匹配（字幕源 DanDanPlay），对动画的准确率蛮高。缺点是左右滑动步进太长，不容易定位到指定位置。给作者提过意见，但没收到回复，不知道有没有看到。更新非常频繁，不断有新功能加入。

* 平台：iOS、Apple TV
* 界面：★★★★★
* 挂载：SMB、WebDAV、FTP、Alist 等多种，支持 Emby、Jellyfin，网盘支持百度网盘和阿里云
* 倍速：播放界面点击调整，长按倍速支持自定义
* 手势：选项丰富，支持自定义手势功能
* 截图：支持截图
* 海报墙：有但不是核心功能，可以自动刮削，但动画准确率极低
* 售价：免费使用，提供高级功能内购，68 元永久解锁

#### VidHub

对标 Infuse，支持自动刮削与海报墙展示，不过动画支持欠佳（TMDB 源）。之前开发中可以免费使用，今年功能稳定下来，需要强制订阅了。软件下载后好像能免费体验 24 小时（我第二天用就得付费了）。还有款类似软件 HamHub 正处于开发阶段，功能较少，未来可期。如果对海报墙要求不高，iOS 平台更推荐上面的 Fileball。

* 平台：iOS、Apple TV
* 界面：★★★★★
* 挂载：SMB、WebDAV、Alist，支持 Plex、Emby、Jellyfin，网盘支持百度网盘和阿里云
* 倍速：播放界面点击调整，长按倍速支持自定义
* 手势：无法关闭手势，不支持自定义
* 截图：支持普通截图和 GIF 截图
* 海报墙：自带刮削生成海报墙，也可以导入御三家的海报墙
* 售价：年费 38 元，或终身 88 元（新用户好像是 198 元）

#### KODI

KODI 是 XBMC 基金会开发的**开源**视频播放器，支持多种平台，虽然也有移动端，但网上见得比较多的都是安装在智能电视和 Xbox 上。得益于开放的插件社区，KODI 玩法十分多样；对 UI 有要求的用户，也可以在社区选择不同的皮肤安装。

![](https://g1proxy.wimg.site/sYu5DQj6BHzleCr4OqQU2c-xpyDTjUWUZsGN4FYyglI4/https://cdnfile.sspai.com/2024/06/06/1169246b48d85d72c5dc85c875238924.jpg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

[ARCTIC HORIZON 2](https://sspai.com/link?target=https%3A%2F%2Fforum.kodi.tv%2Fshowthread.php%3Ftid%3D367352) 皮肤

不过，这个软件初始设置会比较繁琐，一些插件的安装还需要特殊网络环境，对新手来说不太友好。另外，虽然功能众多，但多数快捷键只能通过键盘或媒体遥控器实现，需要一番折腾才能舒适观影，更适合进阶用户选择。

* 平台：多平台
* 界面：★★★★☆（支持切换皮肤）
* 挂载：通过插件配合 Alist，几乎支持所有方式
* 倍速：支持，但需要配合特殊皮肤或键盘调整
* 截图：支持，但需要用键盘快捷键
* 海报墙：自带刮削生成海报墙，也可以导入 Emby 或 Jellyfin 的海报墙
* 售价：开源软件，免费无广告

#### 网易 Filmly

第一眼看成了 Family。大厂网易开发，在播放器领域确实比较少见，盲猜是程序员做着玩的项目。今年五一上线，目前稳定更新中。初次使用需要手机号登录，支持视频自动刮削。来源只能选择挂在百度网盘和阿里云，无法播放本地或 NAS 中的视频。项目初期功能比较有限，故简单提及，等待后续开发情况。

#### 更多平台？

电脑上的选择就非常多了，由于 Windows 对 SMB 支持良好，上到 Windows Media Player 下到各种 Github 开源播放器都可以胜任。而采用 M 芯片的 macOS 能够安装大部分 iOS 播放器，原生 APP 也有基于 MPV 的 IINA，选择也十分丰富。

说句题外话，如果你和我一样主要看动画，可以尝试 MPV 播放器配合 Anime4K 插件，画质提升显著，观感体验仿佛跨越了一个世代。如果不想折腾配置，网上有大佬制作好的 [MPV Lazy](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fhooke007%2FMPV%5Flazy) 等整合包，开箱即用。

### 其他

除了影音播放外，NAS 还能实现更多有趣的功能，受限于篇幅无法详细展开。文章最后一部分，我以在用的软件为例，简单介绍一下功能，仅做抛砖引玉之用，给耐心看到这里的你一点折腾灵感。

![](https://g1proxy.wimg.site/sTFBL0WlplYfhshfUhOD539oVvFzmXxtcg0_a9dnCVfs/https://cdnfile.sspai.com/2024/06/06/009b08589ba4ea35f0f08f6b077e67b4.png?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp)

目前 Unraid 中安装的软件，之前折腾过不好玩的都删掉了

#### [File Browser](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Ffilebrowser%2Ffilebrowser)

Unraid 文件管理插件非常垃，一定需要再装一个文件管理器。这类软件可选的不多，File Browser 算是使用体验与功能上最好的一款。

[**Glances**](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fnicolargo%2Fglances)

用于监控 NAS 运行信息，如 CPU、内存、磁盘、网络使用情况，以及不同进程和 Docker 的资源占用等。对大多数用户意义不大，我平时都不开的。

#### [hlink](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Flikun7981%2Fhlink)

批量创建硬链接，有图形化界面，相比命令操作更加简单，也不容易出错。对下载和做种的用户十分好用。

#### [Homa Assistant](https://sspai.com/link?target=https%3A%2F%2Fwww.home-assistant.io%2F)

大名鼎鼎的 HA，用于管理智能家居，实现多个硬件联动和自动化。我自己主要是把小米的硬件接入 HomeKit，方便在 iPhone 控制中心操作。

#### [Komga](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fgotson%2Fkomga)

漫画管理插件，类似的还有 [Kavita](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FKareadita%2FKavita) 与 [LANraragi](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FDifegue%2FLANraragi) 等。安卓上用 [Tachiyomi](https://sspai.com/link?target=https%3A%2F%2Ftachiyomi.org%2F) 来阅读体验极佳（因为版权原因删库，但 APP 还可以正常用）。iOS 选择比较少，暂时还没见到好用的，不是要订阅就是体验差。

#### [Librespeed](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Flibrespeed%2Fspeedtest)

网速测试工具，我用来测家里不同位置的网速，在外网也可以测试访问 NAS 的速度。

#### [MT Photos](https://sspai.com/link?target=https%3A%2F%2Fmtmt.tech%2F)

国产照片管理系统，同类 Docker 软件中表现最好，有手机 APP 可以随时访问照片库。使用需要付费，25 元一年或 99 元永久。开源的也有 [PhotoPrism](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fphotoprism%2Fphotoprism) 与 [immich](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fimmich-app%2Fimmich) 等，都尝试过，体验一般。也可以安装黑群辉用它的 Synology Photos，不过我懒得折腾了。

#### [Netdata](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fnetdata%2Fnetdata)

另一个监控 NAS 信息的软件，比 Glances 更全面。我装来折腾玩的，就图一乐。

#### Nginx

家里有公网 IP，可以反向代理需要供公网访问的服务，相比端口转发更加安全，也能用上 HTTPS。不过国内封了 80 和 443 端口，想靠反向代理实现纯网址访问是不行滴。

#### [qBittorrent](https://sspai.com/link?target=https%3A%2F%2Fwww.qbittorrent.org%2F)

下载软件，一直用这个比较顺手。类似的有 [Transmission](https://sspai.com/link?target=https%3A%2F%2Ftransmissionbt.com%2F) 或者 [Aria2](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Faria2%2Faria2) 等。

#### [RSSHub](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FDIYgod%2FRSSHub)

将大部分网站内容转为 RSS 订阅，RSS 爱好者的福音，少数派有不少介绍文章。我还没找到一个好用的 RSS 客户端，暂时搁置了，以后有时间再折腾。

#### [Syncthing](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2Fsyncthing%2Fsyncthing)

即时同步软件，我用来同步公司电脑的资料到 NAS 中，无论是做备份还是偶尔应急都很实用。类似的有 [Resilio](https://sspai.com/link?target=https%3A%2F%2Fwww.resilio.com%2Findividuals%2F) 和[微力同步](https://sspai.com/link?target=https%3A%2F%2Fwww.verysync.com%2F)等。

#### [Tautulli](https://sspai.com/link?target=https%3A%2F%2Fgithub.com%2FTautulli%2FTautulli)

Plex 的第三方插件，我主要拿来导出 Plex 的音乐播放列表。之前 Plex 升级崩过一次，数据全没了，后来就长了个心眼，勤做备份总没错。

#### WebDAV

Unraid 原生没有 WebDAV 功能，只能靠 Docker 实现。WebDAV 协议是我外网访问的主力。

## 结语

早在去年就有尝试写文章的想法，种种原因一直搁置了起来。上个月看到[这篇文章](https://sspai.com/post/88861)，有感而发，写下了近千字的评价。又转念一想，我折腾 NAS 有近 10 年的经验，不如把内容展开，写一篇文章给大家指指路？刚好参加征文活动，一举两得。

磕磕绊绊花了三周的时间，自知文笔不好多次想放弃，但又舍不得就这样躺在草稿箱，最后还是坚持写完了，希望能给第一次接触 NAS 的用户一些帮助。如果你对某一部分感兴趣，在其他社区中也会有许多网友分享部署与使用心得（如 bilibili、什么值得买、我不是矿神、以及各种个人博客），可以进一步阅读，解锁更多新鲜玩法。

[](https://sspai.com/s/JYjP)

162

70

扫码分享

前言

硬件与系统：从这里出发

群晖 Synology

威联通 QNAP

绿联/极空间等

Unraid

机箱：没有功能，只有好看

迷你主机

银欣

乔思伯

NBOX

TANK

宝藏盒

星之海

软件：实现你的托管需求

媒体服务器

自动化

播放器

其他

结语
