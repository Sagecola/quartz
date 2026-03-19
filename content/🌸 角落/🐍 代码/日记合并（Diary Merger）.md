---
publish: true
created: 2026-01-30T22:58:25.131+08:00
modified: 2024-08-06T09:50:21.643+08:00
tags:
  - 日记
  - 合并
  - 代码
cssclasses: ""
---

## Python代码
```python
import os
from pathlib import Path

## 指定日记文件所在目录
diary_dir = "./1"

## 创建输出文件
work_output_file = Path("merged_work_diary.md")
work_output_file.touch(exist_ok=True)

life_output_file = Path("merged_life_diary.md")
life_output_file.touch(exist_ok=True)

for file in os.listdir(diary_dir):
    if file.endswith(".md"):
        file_path = os.path.join(diary_dir, file)
        with open(file_path, "r", encoding="utf-8") as in_file:
            lines = in_file.readlines()

            # 找到"工作"和"生活"标题的位置
            work_start_index = None
            life_start_index = None
            for i in range(len(lines)):
                if lines[i].startswith("## 工作"):
                    work_start_index = i
                elif lines[i].startswith("## 生活"):
                    life_start_index = i

            # 写入工作内容到输出文件
            if work_start_index is not None:
                with work_output_file.open("a", encoding="utf-8") as out_file:
                    out_file.write(f"{os.path.splitext(file)[0]}\n\n")
                    work_end_index = life_start_index if life_start_index is not None else len(lines)
                    out_file.writelines(lines[work_start_index:work_end_index])
                    out_file.write("\n\n")  # 日记之间用空行分隔

            # 写入生活内容到输出文件
            if life_start_index is not None:
                with life_output_file.open("a", encoding="utf-8") as out_file:
                    out_file.write(f"{os.path.splitext(file)[0]}\n\n")
                    out_file.writelines(lines[life_start_index:])
                    out_file.write("\n\n")  # 日记之间用空行分隔

print("日记合并完成!")
```

## 主要功能和解释
这段Python脚本的主要功能是将指定目录中的多个Markdown格式的日记文件按照特定规则合并到两个输出文件中，一个是工作日记文件(`merged_work_diary.md`)，另一个是生活日记文件(`merged_life_diary.md`)。

脚本的执行步骤如下：
1. 首先，指定了日记文件所在的目录为当前目录下的一个名为`1`的文件夹。
2. 创建了两个输出文件`merged_work_diary.md`和`merged_life_diary.md`，如果这两个文件已经存在，则不会覆盖。
3. 遍历指定目录中的所有文件，对于以`.md`结尾的文件：
   - 打开文件并逐行读取内容。
   - 查找每个文件中"工作"和"生活"标题的位置。
   - 将工作部分的内容写入到工作日记输出文件中，从"工作"标题开始到"生活"标题之前（如果存在）或文件结尾。
   - 将生活部分的内容写入到生活日记输出文件中，从"生活"标题开始到文件结尾。
   - 每个日记之间用一个空行分隔。
4. 最后输出"日记合并完成!"。