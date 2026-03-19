---
publish: true
title: md_to_word
description: Markdown 转 Word 转换工具
created: 2026-03-18T23:00:57.200+08:00
modified: 2026-03-18T23:00:39.238+08:00
tags:
  - Markdown
  - word
  - 工具
  - 转换
  - Pandoc
cssclasses: ""
---


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个简单易用的 Windows 工具，将 Markdown 文件转换为格式美观的 Word（.docx）文档。

## ✨ 功能特点

- 🚀 **开箱即用** - 内置 Pandoc，无需额外安装依赖
- 📝 **完美支持** Markdown 常用格式：
  - 六级标题、粗体、斜体、删除线
  - 有序/无序列表、任务清单
  - 表格（含对齐方式）
  - 代码块与行内代码
  - 引用块
  - LaTeX 数学公式
  - 超链接与图片
- 🎨 **可自定义样式** - 通过修改 Word 模板控制输出样式
- 🇨🇳 **中文优化** - 模板针对中文排版习惯优化

## 📥 下载使用

### 方式一：下载 Release（推荐）

访问 [Releases](https://github.com/Sagecola/md_to_word/releases) 页面下载最新版本的 `md_to_word.zip`

解压后双击 `md_to_word.exe` 即可使用。

### 方式二：从源码运行

```bash
# 克隆仓库
git clone https://github.com/Sagecola/md_to_word.git
cd md_to_word

# 运行（需要安装 Python 3.x 和 Pandoc）
python md_to_word_converter.py
```

## 🚀 快速开始

1. **编辑** `input.md` 文件，写入你的 Markdown 内容
2. **双击**运行 `md_to_word.exe`
3. **获取**生成的 `output.docx` 文件

### 自定义样式

如需使用自定义 Word 样式：

1. 用 Microsoft Word 打开 `template.docx`
2. 修改样式（标题、正文、表格、列表等）
3. 保存后，生成的文档将自动应用该样式

## 📁 文件说明

```
md_to_word/
├── md_to_word.exe            # 主程序（双击运行）
├── input.md                  # 输入的 Markdown 文件
├── output.docx               # 生成的 Word 文档（自动生成）
├── template.docx             # Word 样式模板（可选）
└── 使用说明.txt              # 详细使用说明
```

## 🙏 致谢

本项目的 Word 模板样式参考了 [Achuan-2/pandoc_docx_template](https://github.com/Achuan-2/pandoc_docx_template) 开源项目，感谢作者详细分享的 Pandoc 模板制作教程！

## 🔨 自行构建

如需自行打包 exe：

```bash
# 安装依赖
pip install pyinstaller

# 进入打包目录
cd dist

# 打包（需先将 pandoc.exe 复制到 dist 目录）
pyinstaller --onefile --name "md_to_word" \
  --add-data "pandoc.exe;." \
  --add-data "template.docx;." \
  md_to_word_converter.py
```

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。

## 🤝 贡献

欢迎 Issue 和 PR！如果你在使用过程中遇到问题，或者有改进建议，请随时提出。

---

**祝使用愉快！** 🎉
