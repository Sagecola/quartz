---
publish: true
created: 2026-01-30T22:58:25.128+08:00
modified: 2025-02-26T17:57:04.492+08:00
tags:
  - PPT
  - 代码
cssclasses: ""
---

## Python代码
```python
import os
import zipfile
from pathlib import Path

def create_pptx(folder_path, output_path):
    # 确保文件夹存在
    folder = Path(folder_path)
    if not folder.exists() or not folder.is_dir():
        print(f"文件夹 {folder_path} 不存在或不是一个有效的目录")
        return
    
    # 创建ZIP文件
    try:
        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as pptx_zip:
            for file in folder.rglob('*'):  # rglob会递归遍历文件夹
                if file.is_file():
                    arcname = file.relative_to(folder)  # 计算相对路径
                    pptx_zip.write(file, arcname)
        print(f"PPTX 文件已生成：{output_path}")
    except Exception as e:
        print(f"创建PPTX文件时出错：{e}")

# 使用示例
create_pptx(r"C:\Users\MSA\Desktop\PPT助手", "1.pptx")
```

## 主要功能和解释

### 功能
由于 [[Coze]] 生成的 PPT 文件是包含 XML 等信息的文件夹，故该脚本的功能是将该文件夹中的所有文件压缩成一个 PPTX 格式的 ZIP 文件。通过压缩文件夹中的所有文件，并保留文件的相对路径结构，最终生成一个符合 PPTX 格式的压缩文件。

### 解释
1. 通过`pathlib.Path`的`exists()`和`is_dir()`方法检查用户输入的文件夹路径是否有效且存在。如果文件夹不存在或不是一个有效的目录，脚本会提示错误并退出。
2. 使用`zipfile.ZipFile`创建一个新的压缩文件，并指定其写入模式`'w'`（表示写入，若文件已存在则覆盖），并使用`zipfile.ZIP_DEFLATED`来指定压缩方法。
3. 在压缩过程中，`rglob('*')`用于递归遍历文件夹中的所有文件，返回一个生成器，能够访问文件夹内的所有文件。我们用`relative_to(folder)`来获取相对路径，这样可以保留文件的目录结构。
4. 在压缩文件的过程中，可能会遇到各种问题，例如文件读取错误、权限问题等。为了避免程序崩溃，脚本使用`try...except`语句捕获异常，输出错误信息并终止操作。
5. 如果压缩文件成功创建，脚本会输出成功信息，并告诉用户PPTX文件的保存路径。 

## 使用示例
用户指定文件夹路径（例如：`C:\Users\MSA\Desktop\PPT助手`），脚本会将该文件夹内的所有文件（包括子文件夹中的文件）压缩成`output.pptx`文件。该文件会保留文件的相对路径，方便用户解压后恢复原来的文件结构。