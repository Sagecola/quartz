---
publish: true
title: Quartz Syncer + GitHub 配置教程
description: 详细讲解如何使用 Quartz Syncer 插件将 Obsidian 笔记同步到 GitHub Pages，包含完整的配置步骤、常见问题解决方案以及真实踩坑经验分享。适合国内用户的 Quartz + GitHub 部署指南。
created: 2026-03-06T13:59:11.466+08:00
modified: 2026-03-05T14:48:47.000+08:00
tags:
  - Obsidian
  - Quartz
  - GitHub
  - 教程
  - 笔记同步
cssclasses: ""
---


> 本文档基于 [Quartz Syncer](https://github.com/saberzero1/quartz-syncer) 官方文档整理，**结合了本人真实配置过程中的踩坑经验**，针对国内用户的实际情况做了补充和优化。

---

## 📋 一、前置条件

在开始之前，请确保：

1. **Obsidian** 版本 >= 1.11.4（用于安全存储 Token）
2. 拥有一个 **GitHub** 账号（注册地址：https://github.com/signup）
3. **网络环境**：GitHub 在国内访问不稳定，建议准备代理工具，或使用移动热点

---

## 🚀 二、创建 Quartz 仓库

Quartz 是一个静态网站生成器，可以将你的 Obsidian 笔记转换为美观的网站。

### 2.1 使用官方模板创建仓库

直接点击以下链接，使用 Quartz 官方模板创建仓库：

👉 [点击创建 Quartz 仓库](https://github.com/new?template_name=quartz&template_owner=jackyzha0)

**填写信息**：
- **Repository name**：你的仓库名
  - ⚠️ **注意**：如果你用标准格式 `用户名.github.io`，baseUrl 只需填 `用户名.github.io`
  - 如果用其他名字（如 `quartz` 或 `notes`），baseUrl 需要填 `用户名.github.io/仓库名`
- **Description**（可选）：网站描述
- **Public/Private**：
  - 选 **Public**：GitHub Pages 免费，所有人可见
  - 选 **Private**：GitHub Pages 也免费（Pro 用户），内容仅自己可见
- ✅ 勾选 **"Add a README file"**

点击 **"Create repository"**

> 💡 **踩坑提示**：仓库名直接影响后续 baseUrl 的配置，建议一开始就确定好。

---

## 🌐 三、配置 GitHub Pages 自动部署

### 3.1 启用 GitHub Pages

1. 打开刚创建的仓库页面
2. 点击顶部菜单栏的 **Settings（设置）**
3. 左侧菜单找到并点击 **Pages**
4. 在 **Source** 下选择 **GitHub Actions**

### 3.2 添加部署工作流

1. 在仓库页面，点击 **"<> Code"** 标签
2. 点击 **"Add file"** → **"Create new file"**
3. 文件名输入：`.github/workflows/deploy.yml`
4. 将以下内容**完整、一字不改地**复制进去（注意缩进）：

```yaml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - v4

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install Dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. 点击 **"Commit changes..."**
6. 提交信息写："Add deploy workflow"，点击 **"Commit changes"**

> ⚠️ **踩坑提示**：YAML 文件对缩进极其敏感，不要用 Tab，用空格。建议直接复制粘贴，不要手动输入。

---

## 🔑 四、生成 GitHub Access Token

Access Token 相当于"密码"，让 Obsidian 可以安全地推送笔记到 GitHub。

GitHub 提供两种 Token，**推荐用 Fine-grained Token**（更安全）：

### 4.1 Fine-grained Access Token（推荐）

1. 打开链接：https://github.com/settings/personal-access-tokens/new
2. **Token name**：输入名称，如 `Quartz Syncer`
3. **Expiration**：选择过期时间（建议 1 年，到期前会邮件提醒）
4. **Repository access**：选择 **"Only select repositories"**，然后选择你的 Quartz 仓库
5. **Permissions（权限）**：
   - 展开 **Repository permissions**
   - 找到 **Contents**，选择 **Read and write**
6. 点击页面底部的 **"Generate token"**
7. **立即复制 Token**！页面关闭后就看不到了

### 4.2 Classic Access Token（备用）

如果 Fine-grained Token 遇到问题，可以用经典版：

1. 打开链接：https://github.com/settings/tokens/new?scopes=repo
2. **Note**：输入名称，如 `Quartz Syncer`
3. **Expiration**：选择过期时间
4. **Select scopes**：确保勾选 **repo**（全权访问仓库）
5. 点击 **"Generate token"**
6. **立即复制 Token**

> ⚠️ **重要**：Token 只显示一次，务必保存好！如果丢失只能重新生成。

---

## 📦 五、安装 Quartz Syncer 插件

### 5.1 安装插件

1. 打开 Obsidian，按 `Ctrl + P`（Mac 按 `Cmd + P`）打开命令面板
2. 输入 "settings" 打开设置
3. 左侧点击 **"Community plugins（社区插件）"**
4. 关闭 **"Safe mode（安全模式）"**（如果开启的话）
5. 点击 **"Browse（浏览）"**
6. 搜索 **"Quartz Syncer"**
7. 点击 **Install（安装）**，然后点击 **Enable（启用）**

### 5.2 配置插件（Git 设置）

1. 在设置中找到 **"Quartz Syncer"**，点击进入
2. 切换到 **"Git"** 标签页，填写：

| 设置项 | 填写内容 | 示例 |
|--------|----------|------|
| **Remote URL** | 你的仓库 HTTPS 地址 | `https://github.com/用户名/仓库名.git` |
| **Branch** | 分支名 | `v4` 或 `main`（看你创建时用的什么） |
| **Provider** | 提供商 | 选择 **GitHub** |
| **Authentication Type** | 认证方式 | 选择 **Username & Token/Password** |
| **Username** | 用户名 | 你的 GitHub 用户名 |
| **Access Token** | 访问令牌 | 粘贴刚才生成的 Token |

3. 点击 **"Save"**
4. 如果看到 **绿色对勾** ✅，说明连接成功！

> 🔴 **踩坑提示**：如果显示红色错误，请检查：
> - Token 是否复制完整（不要有多余空格）
> - 用户名是否正确（注意大小写）
> - Remote URL 格式是否正确
> - 网络连接是否正常（GitHub 可能需要代理）

---

## ⚙️ 六、配置 Quartz（关键步骤）

**这是最容易踩坑的地方！** 配置不正确会导致同步成功但网站访问异常。

### 6.1 修改 quartz.config.ts

1. 打开 GitHub 仓库页面
2. 找到 `quartz.config.ts` 文件，点击进入
3. 点击右上角的 **编辑图标（铅笔）**
4. 找到以下部分并修改：

```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "你的网站标题",           // ← 修改这里
    baseUrl: "用户名.github.io",        // ← ⚠️ 关键！根据仓库名填写
    defaultDateType: "modified",        // 可选：modified/created/published
    ignorePatterns: ["private", ".obsidian"],  // ← 排除的文件夹
  },
  // ... 其他配置
}
```

**baseUrl 填写规则（重要！）**：

| 仓库名 | baseUrl 应该填 |
|--------|----------------|
| `用户名.github.io` | `用户名.github.io` |
| `quartz` | `用户名.github.io/quartz` |
| `notes` | `用户名.github.io/notes` |

> 🔴 **踩坑实录**：有用户反馈同步成功但网站不显示，就是因为 baseUrl 没加 `/仓库名`！

### 6.2 关于 ignorePatterns（排除文件夹）

如果你不想让某些文件夹出现在网站中，可以在 `ignorePatterns` 中配置：

```typescript
ignorePatterns: [
  "private",      // 排除 private 文件夹
  ".obsidian",    // 排除 .obsidian
  "templates",    // 排除 templates
  "drafts",       // 排除草稿文件夹
],
```

> ⚠️ **重要提示**：**ignorePatterns 排除的文件夹，Dataview 查询也会失效！** 如果你用 Dataview 引用了这些文件夹中的内容，建议改用 `publish: false` 属性代替。

**替代方案 - 使用 publish: false**：
- 不在 ignorePatterns 中排除
- 在文件夹内所有笔记顶部添加：
  ```yaml
  ---
  publish: false
  ---
  ```
- 这样文件会上传到 GitHub，Dataview 可以查询，但不会渲染成网页

5. 点击 **"Commit changes..."** 保存

---

## 📝 七、发布笔记到网站

### 7.1 标记要发布的笔记

Quartz Syncer 默认**不会**自动发布所有笔记，你需要手动标记：

**方法一：使用命令（推荐）**
1. 打开要发布的笔记
2. 按 `Ctrl + P` 打开命令面板
3. 搜索 **"Quartz Syncer: Add publish flag"**
4. 执行后，笔记的 frontmatter 会添加 `publish: true`

**方法二：手动添加**
1. 在笔记顶部点击 **"Add property"**
2. 属性名输入 `publish`
3. 类型选择 **Checkbox（复选框）**
4. 勾选复选框

### 7.2 打开 Publication Center（发布中心）

有三种方式：

1. **命令面板**：按 `Ctrl + P`，搜索 "Quartz Syncer: Open publication center"
2. **左侧图标**：点击左侧栏的水晶图标 💎（默认）
3. **移动端**：点击右下角汉堡菜单 → "Quartz Syncer publication center"

### 7.3 发布笔记

在 Publication Center 中，你会看到几个分类：

| 分类 | 含义 | 操作 |
|------|------|------|
| **Unpublished notes** | 本地有，GitHub 没有的笔记 | 勾选 = 发布 |
| **Changed notes** | 本地和 GitHub 版本不同的笔记 | 勾选 = 更新 |
| **Published notes** | 已发布的笔记 | 勾选 = 取消发布（从网站删除）|
| **Unchanged notes** | 无变化的已发布笔记 | 仅显示，无需操作 |

**操作步骤**：
1. 勾选你想要发布/更新/取消发布的笔记
2. 点击左下角的 **"PUBLISH SELECTED CHANGES"**
3. 等待完成（可能需要几秒到几十秒）

> 💡 **提示**：点击文件名可以查看 Diff（差异对比），确认修改内容。

---

## 🌟 八、访问你的网站

发布成功后，稍等 1-2 分钟（GitHub Pages 部署需要时间），然后访问：

```
https://用户名.github.io/仓库名
```

- 如果你的仓库名是 `用户名.github.io`，直接访问 `https://用户名.github.io`
- 如果看到 404，请检查：
  - GitHub Pages 是否已启用（Settings → Pages）
  - 工作流是否运行成功（Actions 标签页看状态）

---

## ❓ 九、常见问题

### Q1：连接 GitHub 时显示超时/连接错误

**原因**：GitHub 在国内访问不稳定。

**解决方案**：
1. 开启代理工具（Clash / V2Ray 等），并确保代理模式为"全局"或"TUN 模式"
2. 切换到手机热点再试
3. 在 Quartz Syncer 设置中配置 **CORS Proxy**：
   - 可以使用 `https://corsproxy.io/?`
   - 或自建代理服务

### Q2：同步成功但网站显示 404

**检查清单**：
1. `quartz.config.ts` 中的 `baseUrl` 是否配置正确？
   - 非标准仓库名（不是 `用户名.github.io`）必须加 `用户名.github.io/仓库名`
2. GitHub Pages 是否启用？（Settings → Pages → Source 选 GitHub Actions）
3. Actions 工作流是否运行成功？（仓库首页 → Actions 标签页）

### Q3：Token 正确但仍然认证失败

**检查点**：
1. Token 是否已过期
2. Token 是否有仓库的 **Write（写入）** 权限
3. 用户名是否正确（注意大小写）
4. Remote URL 是否为 HTTPS 格式（不是 SSH）

### Q4：Workflow 报错 "CustomOgImages: codepoint not found"

**原因**：笔记中使用了某些特殊表情符号（如 1️⃣ 2️⃣ 3️⃣ 等），Quartz 的 OG 图片生成器无法渲染。

**解决方案**：

**方案 A - 禁用 CustomOgImages 插件（推荐）**：
在 `quartz.config.ts` 中注释掉这一行：
```typescript
emitters: [
  // ... 其他插件
  // Plugin.OgImage(),  // ← 注释掉这一行
],
```

**方案 B - 删除特殊表情符号**：
在 Obsidian 中全局搜索并删除：`1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 0️⃣ #️⃣ *️⃣`

### Q5：只想发布部分笔记

**方法 1**：在 Quartz Syncer 设置中配置 Dataview Query
```
FROM "content" WHERE file.folder != "content/private"
```

**方法 2**：使用 `publish` 属性
- 在不想发布的笔记顶部添加 `publish: false`
- 或者在模板中预设 `publish: false`，需要发布时再改为 `true`

### Q6：笔记里的图片/链接显示不正常

**原因**：Obsidian 链接格式和 Quartz 不兼容。

**解决**：
- 在 `quartz.config.ts` 中设置：
```typescript
Plugin.CrawlLinks({ markdownLinkResolution: "shortest" })
```
- 确保和 Obsidian 设置一致（Settings → Files and links → New link format）

---

## 🔧 十、进阶设置

### 10.1 修改默认发布属性名

如果你不想用 `publish`，可以改成其他名字：

Quartz Syncer 设置 → **Note properties** → **Publish key**

### 10.2 配置特定文件夹发布

默认情况下 Quartz Syncer 会扫描整个仓库，你可以限制只发布特定文件夹：

Quartz Syncer 设置 → **Git** → **Vault root folder**

### 10.3 开启插件集成

如果你使用了以下插件，可以在 **Integrations** 中开启对应支持：

- **Dataview**：解析 Dataview 查询并转换为静态表格
- **Excalidraw**：将绘图转换为 SVG 嵌入
- **Auto Card Link**：链接卡片样式支持

---

## 📚 十一、参考链接

- [Quartz Syncer GitHub](https://github.com/saberzero1/quartz-syncer)
- [Quartz 官方文档](https://quartz.jzhao.xyz/)
- [GitHub Pages 文档](https://docs.github.com/zh/pages)
- [[🌿 专栏/🤖 工具/Quartz Themes 配置教程]]
