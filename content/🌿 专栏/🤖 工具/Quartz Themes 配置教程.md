---
publish: true
title: Quartz Themes 配置教程
description: 介绍如何通过 quartz-themes 项目将 Obsidian 主题应用到 Quartz 网站，包含热门主题推荐、GitHub Actions 自动部署配置、本地安装方法以及常见问题解决方案。
created: 2026-03-06T13:59:11.463+08:00
modified: 2026-03-05T14:40:31.000+08:00
tags:
  - Obsidian
  - Quartz
  - 主题
  - 美化
  - github
cssclasses: ""
---


> 本文介绍如何通过 [quartz-themes](https://github.com/saberzero1/quartz-themes) 项目，将 Obsidian 的精美主题应用到你的 Quartz 网站中。
> 
> ⚠️ **注意**：目前 Quartz Syncer 插件**尚未支持**自动主题同步，需要通过修改 GitHub Actions 配置文件来实现。

---

## 📋 一、什么是 Quartz Themes？

**Quartz Themes** 是一个「主题桥接器」项目，它把 Obsidian 社区中数百款精美主题移植到 Quartz 中使用。

### 1.1 核心优势

| 优势 | 说明 |
|------|------|
| **视觉一致性** | 网站和本地 Obsidian 编辑器保持相同风格 |
| **生态复用** | 直接使用 Obsidian 社区成熟的主题，无需重新设计 |
| **一键切换** | 通过简单配置即可更换主题 |
| **深色 / 浅色** | 大部分主题支持自动/手动切换深浅色模式 |

### 1.2 工作原理

```
Obsidian 主题（CSS 变量）
       ↓
[quartz-themes 适配转换]
       ↓
Quartz 可用的 SCSS 文件
       ↓
编译为网站 CSS
       ↓
网站呈现 Obsidian 风格
```

---

## 🎨 二、热门主题推荐

根据支持程度和风格，推荐以下主题：

### 2.1 完全支持（FULL）的主题

| 主题名 | 模式 | 风格 | 适合场景 |
|--------|------|------|----------|
| **abecedarium** | BOTH | 简洁优雅 | 文档 / 博客 |
| **adrenaline** | BOTH | 活力明快 | 个人笔记 |
| **agate** | LIGHT | 清晰明亮 | 长时间阅读 |
| **aura** | BOTH | 现代科技 | 程序员 / 技术 |

### 2.2 社区热门主题（CHECKING 状态但可用）

| 主题名 | 模式 | 风格 | Obsidian 用户熟悉度 |
|--------|------|------|---------------------|
| **catppuccin** | BOTH | 柔和护眼 | ⭐⭐⭐⭐⭐ 超热门 |
| **tokyo-night** | BOTH | 程序员风 | ⭐⭐⭐⭐⭐ 极客最爱 |
| **rose-pine** | BOTH | 温润优雅 | ⭐⭐⭐⭐⭐ 设计推荐 |
| **minimal** | BOTH | 极简主义 | ⭐⭐⭐⭐⭐ 官方推荐 |
| **things** | BOTH | 清爽干净 | ⭐⭐⭐⭐⭐ macOS 风格 |
| **nord** | BOTH | 冷色调 | ⭐⭐⭐⭐ 极客首选 |

### 2.3 主题状态说明

| 状态 | 含义 | 建议 |
|------|------|------|
| **FULL** | 完全支持 | 放心使用 ✅ |
| **PARTIAL** | 部分支持 | 可能有细微样式问题 |
| **COLLECTION** | 包含子主题 | 如 catppuccin 包含多种配色 |
| **CHECKING** | 正在测试 | 可用但可能有小问题 |

---

## 🚀 三、安装主题（GitHub Actions 方式）

这是**最方便**的方式，每次推送会自动应用主题。

### 3.1 修改 deploy.yml

打开你的 Quartz 仓库，找到 `.github/workflows/deploy.yml` 文件，进行以下两处修改：

**修改 1：添加环境变量**

在 `permissions:` **之前**添加：

```yaml
env:
  THEME_NAME: things  # ← 改成你想要的主题名
```

**修改 2：添加主题获取步骤**

在 `npm ci` 之后、`npx quartz build` **之前**添加：

```yaml
      - name: Fetch Quartz Theme
        run: curl -s -S https://raw.githubusercontent.com/saberzero1/quartz-themes/master/action.sh | bash -s -- $THEME_NAME
```

### 3.2 完整示例配置

```yaml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - v4

# 1. 在这里设置主题名
env:
  THEME_NAME: things  # ← 修改成你想要的主题

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
      
      # 2. 在这里获取主题
      - name: Fetch Quartz Theme
        run: curl -s -S https://raw.githubusercontent.com/saberzero1/quartz-themes/master/action.sh | bash -s -- $THEME_NAME
      
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

### 3.3 提交并查看效果

1. 提交修改到 GitHub
2. 等待 Actions 运行完成（约 2-3 分钟）
3. 刷新你的网站，即可看到新主题效果！

---

## 💻 四、本地安装方式

如果你想在本地预览主题效果，可以使用脚本安装。

### 4.1 macOS / Linux

```bash
# 1. 进入 Quartz 文件夹
cd quartz

# 2. 下载安装脚本
curl -s -S -o action.sh https://raw.githubusercontent.com/saberzero1/quartz-themes/master/action.sh

# 3. 添加执行权限
chmod +x action.sh

# 4. 安装主题（以 things 为例）
./action.sh things
```

### 4.2 Windows

```powershell
# 1. 进入 Quartz 文件夹
cd quartz

# 2. 下载安装脚本
curl -s -S -o action.bat https://raw.githubusercontent.com/saberzero1/quartz-themes/master/action.bat

# 3. 运行安装
action.bat things
```

安装成功后，启动本地预览：

```bash
npx quartz sync --serve
```

---

## 🔧 五、手动安装方式

如果不使用脚本，也可以手动安装：

1. **下载主题文件**
   - 访问 https://github.com/saberzero1/quartz-themes/tree/master/themes
   - 找到你想要的主题文件夹
   - 下载 `_index.scss` 文件

2. **放置文件**
   - 在你的 Quartz 仓库创建目录：`quartz/styles/themes/`
   - 将下载的 `_index.scss` 放到该目录

3. **修改 custom.scss**
   - 打开 `quartz/styles/custom.scss`
   - 在 `@use "base";` 之后添加：
     ```scss
     @use "base";
     @use "./themes";  // ← 添加这一行
     ```

---

## ⚠️ 六、重要注意事项

### 6.1 仅深色/仅浅色主题的特殊处理

如果你使用的是 **DARK** 或 **LIGHT** 专用主题（如 `80s-neon`、`agate`），需要修改 `quartz.config.ts`：

```typescript
// quartz.config.ts
export default {
  // ...
  plugins: {
    // ...
    components: {
      // 移除或注释掉 Darkmode 组件
      // Component.Darkmode(),  // ← 注释掉这行
    }
  }
}
```

**原因**：这些主题只有一种配色模式，不需要深浅切换按钮。

### 6.2 COLLECTION 主题的子主题选择

某些主题（如 `catppuccin`、`tokyo-night`）是集合主题，包含多个子主题：

```yaml
# 使用主主题
env:
  THEME_NAME: catppuccin

# 或使用子主题
env:
  THEME_NAME: catppuccin.frappe      # 柔和风格
  # 或 catppuccin.macchiato         # 拿铁风格
  # 或 catppuccin.mocha             # 摩卡风格

# Tokyo Night 系列
env:
  THEME_NAME: tokyo-night            # 标准版
  # 或 tokyo-night-storm            # 风暴版
  # 或 tokyo-night-simple           # 简化版
```

### 6.3 主题与自定义 CSS 的优先级

如果同时使用了主题和 `custom.scss` 自定义样式：

1. 主题样式先加载
2. `custom.scss` 后加载并覆盖
3. 如果需要覆盖主题的某些样式，在 `custom.scss` 中使用 `!important`：
   ```scss
   body {
     --text-normal: #333 !important;  // 强制覆盖主题颜色
   }
   ```

---

## 🔄 七、切换主题

切换主题非常简单，只需修改 `deploy.yml` 中的 `THEME_NAME`：

```yaml
env:
  THEME_NAME: catppuccin  # ← 改成其他主题名
```

提交后等待 Actions 重新部署即可。

### 7.1 快速切换命令（本地）

```bash
# 切换到 Tokyo Night
./action.sh tokyo-night

# 切换到 Rose Pine
./action.sh rose-pine

# 切换到 Minimal
./action.sh minimal
```

---

## ❓ 八、故障排查

### Q1：主题没有生效，还是默认样式

**检查清单**：
1. `deploy.yml` 中的 `THEME_NAME` 是否拼写正确？
2. Actions 日志中是否有 "Fetch Quartz Theme" 步骤？
3. 查看 Actions 日志，主题获取是否成功？

**查看日志方法**：
- 进入仓库 → Actions 标签页
- 点击最新的 workflow 运行记录
- 展开 "Fetch Quartz Theme" 步骤查看输出

### Q2：使用 DARK 专用主题后出现深浅切换按钮

**解决**：按照上文「仅深色/仅浅色主题的特殊处理」，移除 `Component.Darkmode()`。

### Q3：主题颜色和部分自定义样式冲突

**解决**：在 `custom.scss` 中使用 CSS 变量优先级覆盖：

```scss
/* 强制覆盖主题的文字颜色 */
body {
  --text-normal: #2b2b2b !important;
  --text-muted: #666 !important;
}
```

### Q4：如何恢复到 Quartz 默认主题？

**解决**：删除或注释掉 `deploy.yml` 中的主题相关配置：

```yaml
# 删除这两行
# env:
#   THEME_NAME: things

# 删除这个步骤
# - name: Fetch Quartz Theme
#   run: ...
```

然后删除 `quartz/styles/themes/` 目录（如果存在）。

---

## 📚 九、参考链接

- [quartz-themes 项目](https://github.com/saberzero1/quartz-themes)
- [主题兼容性列表](https://github.com/saberzero1/quartz-themes#compatibility)
- [Obsidian 主题社区](https://github.com/obsidianmd/obsidian-releases/blob/master/community-css-themes.json)
- [[🌿 专栏/🤖 工具/Quartz Syncer + GitHub 配置教程]]
