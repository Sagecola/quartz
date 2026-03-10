---
publish: true
created: 2026-02-02T09:21:36.770+08:00
modified: 2024-07-17T16:58:34.000+08:00
tags:
  - prompt
  - API
  - LLMOps
  - GPTs
cssclasses: ""
---

## 简介
### 什么是Dify
>**Dify 是一个[[📚 知识库/🎴 卡片/LLM]]应用开发平台**，已经有超过10万个应用基于 Dify.AI 构建。它融合了 Backend as Service 和 LLMOps 的理念，涵盖了构建生成式 AI 原生应用所需的核心技术栈，包括一个内置 RAG 引擎。使用 Dify，你**可以基于任何模型自部署类似[[📚 知识库/🎴 卡片/Assistants API]]和[[GPTs]]的能力**。
### 为什么选择Dify 
>Dify 具有模型中立性，相较 LangChain 等硬编码开发库 Dify 是一个完整的、工程化的技术栈，而相较于 OpenAI 的 Assistants API 你可以完全将服务部署在本地。

| 功能         | Dify.AI | Assistants API | LangChain    |
|:----------:|:-------:|:--------------:|:------------:|
| 编程方式       | 面向 API  | 面向 API         | 面向 Python 代码 |
| 生态策略       | 开源      | 封闭且商用          | 开源           |
| RAG 引擎     | 支持      | 支持             | 不支持          |
| Prompt IDE | 包含      | 包含             | 没有           |
| 支持的 LLMs   | 丰富      | 仅 GPT          | 丰富           |
| 本地部署       | 支持      | 不支持            | 不适用          |

## 安装
### 云服务
Dify为所有人提供了[云服务](http://cloud.dify.ai)，只需一个 GitHub 或 Google 账号即可使用的完整功能。
>目前需要梯子才能使用云服务，相对比较麻烦。
### 社区版
Dify社区版即开源版本，可以通过以下两种方式之一部署 Dify 社区版：
- [Docker Compose 部署](https://docs.dify.ai/v/zh-hans/getting-started/install-self-hosted/docker-compose)
- [本地源码启动](https://docs.dify.ai/v/zh-hans/getting-started/install-self-hosted/local-source-code)
>社区版中，通过 **设置 --> 模型供应商 --> OpenAI --> 编辑 API** 入口处填写目标服务器地址即可实现国内环境中使用OpenAI服务。
## 使用
### 创建应用
#### 应用类型
目前Dify提供了两种应用类型：文本生成型与对话型，区别如下：

| Text      | 文本生成型               | 对话型           |
|:---------:|:-------------------:|:-------------:|
| WebApp 界面 | 表单+结果式              | 聊天式           |
| WebAPI 端点 | completion-messages | chat-messages |
| 交互方式      | 一问一答                | 多轮对话          |
| 流式结果返回    | 支持                  | 支持            |
| 上下文保存     | 当次                  | 持续            |
| 用户输入表单    | 支持                  | 支持            |
| 数据集与插件    | 支持                  | 支持            |
| AI 开场白    | 不支持                 | 支持            |
| 情景举例      | 翻译、判断、索引            | 聊天或一切         |
#### 创建步骤
##### 新建应用
1. 前往主导航**构建应用**页;
2. 点击“创建应用”;
3. 选择对话型或文本生成型应用，并为它起个名字。
![Pasted image 20231124150014](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324865.png)
##### 从配置文件创建
如果你从社区或其它人那里获得了一个模版，可以点击**从应用配置文件创建**，上传后可加载对方应用中的大部分设置项（但目前不包括数据集）。
### 编排应用
#### 文本生成型应用
文本生成型应用是一种能够根据用户提供的提示，自动生成高质量文本的应用。它适用于需要大量文本创作的场景，例如新闻媒体、广告、SEO、市场营销等。
Dify内置的文本生成应用的编排支持：前缀前提示词，变量，上下文和生成更多类似的内容。
##### 编排应用
点击创建好的应用进入概览页，再点击左侧菜单中的**提示词编排**来编排应用。
![Pasted image 20231124151112](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324866.png)
##### 填写前缀提示词
提示词用于对 AI 的回复做出一系列指令和约束。可插入表单变量，例如 `{{input}}`。提示词中的变量的值会替换成用户填写的值。
![Pasted image 20231124151336](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324867.png)
##### 添加上下文
如果应用想基于私有的上下文对话来生成内容，可以用**数据集**功能。在上下文中点 “添加” 按钮来添加数据集。
![Pasted image 20231124151459](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324868.png)
##### 添加功能：生成更多类似的
生成更多类似可以一次生成多条文本，可在此基础上编辑并继续生成。点击 “添加功能” 来打开该功能。
![Pasted image 20231124151543](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324869.png)
##### 调试
我们在右侧 输入变量 和 查询内容 进行调试。点 **“运行”** 按钮 查看运行的结果。
![Pasted image 20231124151610](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324870.png)
如果结果不理想，可以调整提示词和模型参数。点右上角点 模型名称 来设置模型的参数。
![Pasted image 20231124151648](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324871.png)
##### 发布
调试好应用后，点击右上角的 **发布** 按钮来保存当前的设置。
#### 对话型应用
对话型应用采用一问一答模式与用户持续对话，几乎适用于任何场景。
Dify内置的对话型应用的编排支持：对话前提示词，变量，上下文，开场白和下一步问题建议。
##### 编排应用
点击创建好的应用进入概览页，再点击左侧菜单中的**提示词编排**来编排应用。
![Pasted image 20231124152010](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324872.png)
##### 填写前缀提示词
提示词用于对 AI 的回复做出一系列指令和约束。可插入表单变量，例如 `{{input}}`。提示词中的变量的值会替换成用户填写的值。
![Pasted image 20231124152159](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324873.png)
为了更好的体验，我们可以点击下方 “添加功能” 按钮，打开 “对话开场白” 的功能：
![17008113534991](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324874.png)
如需要还可以添加“下一步问题建议”、“语音转文字”、“引用和归属”等功能。
##### 添加上下文
如果应用想基于私有的上下文对话来生成内容，可以用**数据集**功能。在上下文中点 “添加” 按钮来添加数据集。
![Pasted image 20231124151459](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324868.png)
##### 调试
我们在右侧填写 用户输入，输入内容进行调试。
![Pasted image 20231124152521](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324876.png)如果结果不理想，可以调整提示词和模型参数。点右上角点 模型名称 来设置模型的参数。
![1700810804240](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324877.png)
##### 发布
调试好应用后，点击右上角的 **发布** 按钮来保存当前的设置。
#### 外部数据工具
##### 功能介绍
**外部数据工具**帮助开发者使用自有的搜索能力或内部知识库等外部数据作为 LLM 的上下文，通过 API 扩展的方式实现外部数据的获取并嵌入提示词。
##### 具体实现
当终端用户向对话系统提出请求时，平台后端会触发外部数据工具（即调用自己的 API），它会查询用户问题相关的外部信息，如员工资料、实时记录等，通过 API 返回与当前请求相关的部分。平台后端会将返回的结果组装成文本作为上下文注入到提示词中，以输出更加个性化和符合用户需求的回复内容。
##### 操作说明
1. 在使用外部数据工具之前，你需要准备一个 API 和用于鉴权的 API Key，请阅读[外部数据工具](https://docs.dify.ai/v/zh-hans/advanced/extension/api_based_extension/external_data_tool)
2. Dify 提供了集中式的 API 管理，在设置界面统一添加 API 扩展配置后，即可在 Dify 上的各类应用中直接使用。![[Pasted image 20231124155509.png]
3. 以“查询天气”为例，在“新增基于 API 的扩展”对话框输入名字，API 端点，API Key。保存后我们就可以调用 API 了。![Pasted image 20231124155628](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/202406171324878.png)
4. 在提示词编排页面，点击“工具”右侧的“+添加”按钮，在打开的“添加 工具”对话框，填写名称和变量名称（变量名称会被引用到提示词中，请填写英文），以及选择第 2 步中已经添加的基于 API 的扩展。![Pasted image 20231124155743](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/202406171324879.png)
5. 这样就可以把查询到的外部数据拼装到提示词中。比如要查询今天的伦敦天气，可以添加`location` 变量，输入"London"，结合外部数据工具的扩展变量名称`weather_data`，调试输出如下：![Pasted image 20231124155836](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/202406171324880.png)
### 探索
#### 发现
在**发现**中，提供了一些常用的模版应用。这些应用涵盖了人力资源，助手，翻译，编程和写作。
![Pasted image 20231124161055](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324881.png)
#### 智聊
智聊是在大模型的基础上，利用代理（Agent）的能力以及一些工具为大模型赋予了联网实时查询的能力。
智聊支持使用谷歌搜索等插件实现联网搜索等功能。
![Pasted image 20231124161359](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324882.png)
智聊支持数据集。选择了数据集后，用户问的问题和数据集内容有关，模型会从数据集中找答案。目前数据集文档上传单个文档最大是 15MB，总文档数量限制 100 个。
![Pasted image 20231124161423](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171324883.png)
## 进阶
- [提示词编排专家模式 - Dify](https://docs.dify.ai/v/zh-hans/advanced/prompt-engineering)
- [检索增强生成 - Dify](https://docs.dify.ai/v/zh-hans/advanced/retrieval-augment)
- [数据集管理 - Dify](https://docs.dify.ai/v/zh-hans/advanced/datasets)
- [插件 - Dify](https://docs.dify.ai/v/zh-hans/advanced/ai-plugins)（即将推出）
- [API 扩展 - Dify](https://docs.dify.ai/v/zh-hans/advanced/extension/api_based_extension)
- [模型配置 - Dify](https://docs.dify.ai/v/zh-hans/advanced/model-configuration)
## 扩展阅读
- [数据集管理 - Dify](https://docs.dify.ai/v/zh-hans/advanced/datasets#shu-ju-ji-yu-wen-dang)
- [Learn Prompting](https://learnprompting.org/zh-Hans/)
- [ChatGPT Prompt Engineering for Developers](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/)
- [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)