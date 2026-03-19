---
publish: true
created: 2026-01-30T22:58:25.127+08:00
modified: 2025-03-05T18:30:55.110+08:00
tags:
  - 化学镍水
  - 芬顿
  - 电芬顿
  - 碱次钠
  - 成本
  - 铬水
  - 双氧水
  - 图像识别
cssclasses: ""
---

## Python代码
```python
# This is an example of how to convert all PDF files in a folder to DOCX files.
# 这是一个将文件夹中的所有 PDF 文件转换为 DOCX 文件的示例。

from pdfdeal import Doc2X

# gets API Key from environment variable DOC2X_APIKEY, or you can pass it as a string to the apikey parameter
# 从环境变量 DOC2X_APIKEY 获取 API Key, 或者您可以将其作为字符串传递给 apikey 参数

client = Doc2X(apikey="sk-9236kvp99mwf5qxcr52zggf5qjglq8aw",debug=True)

success, failed, flag = client.pdf2file(
    pdf_file="./1",
    output_path="./2",
    output_format="docx",
)
print(success)
print(failed)
print(flag)
```

## 主要功能和解释
这段代码的主要功能是使用 `pdfdeal` 库中的 `Doc2X` 类，将指定文件夹（`./1`）中的所有 PDF 文件转换为 DOCX 格式，并将转换后的文件保存到另一个指定文件夹（`./2`）。