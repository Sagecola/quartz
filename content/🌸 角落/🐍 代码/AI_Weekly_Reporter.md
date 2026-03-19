---
publish: true
created: 2026-01-30T22:58:25.125+08:00
modified: 2025-08-10T23:00:08.000+08:00
tags:
  - AI
  - 周记
  - 自动化
cssclasses: ""
---

## Python代码
```python
import os
from datetime import datetime, timedelta
from openai import OpenAI # 用于 OpenAI 和 DeepSeek (兼容 OpenAI 接口)
from anthropic import Anthropic # 用于 Claude
import google.generativeai as genai # 用于 Gemini
import re
from dotenv import load_dotenv

# --- 加载环境变量 ---
load_dotenv()

# --- 配置部分 ---
DIARY_FOLDER = "./1"   # 日记所在路径
WEEKLY_FOLDER = "./2"     # 输出路径
TEMPERATURE = 0.7 # 统一的温度参数

# !!! 在这里指定你想要使用的模型 !!!
# 有效值包括: "deepseek", "openai", "claude", "gemini"
# 例如，如果想用 Gemini，就设置为 SELECTED_MODEL = "gemini"
SELECTED_MODEL = "deepseek" # <--- 在这里修改以选择不同的模型

# --- 初始化不同模型的客户端 ---
# DeepSeek 客户端 (兼容 OpenAI 接口)
deepseek_client = OpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"), # 从 .env 文件获取 API Key
    base_url=os.getenv("DEEPSEEK_BASE_URL") # 提供默认值以防万一 .env 中没有
)

# OpenAI 客户端
openai_client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL") # 提供默认值以防万一 .env 中没有
)

# Anthropic (Claude) 客户端
anthropic_client = Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    base_url=os.getenv("ANTHROPIC_BASE_URL") # 提供默认值以防万一 .env 中没有
)

# Google (Gemini) 客户端
gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)
    # 使用 .env 中的模型名称，如果没有则回退到 'gemini-pro'
    gemini_model_name = os.getenv("GEMINI_MODEL_NAME", 'gemini-2.25-flash') 
    gemini_model = genai.GenerativeModel(gemini_model_name) 
else:
    gemini_model = None # 如果没有配置API Key，则设置为 None

# 将所有可用的模型及其对应的客户端/模型对象存储在一个字典中
MODELS = {
    "deepseek": {
        "client": deepseek_client,
        "model_name": os.getenv("DEEPSEEK_MODEL_NAME", "deepseek-chat"),
        "type": "openai_compatible"
    },
    "openai": {
        "client": openai_client,
        "model_name": os.getenv("OPENAI_MODEL_NAME", "gpt-4.1-mini"),
        "type": "openai_compatible"
    },
    "claude": {
        "client": anthropic_client,
        "model_name": os.getenv("ANTHROPIC_MODEL_NAME", "claude-sonnet-4-20250514"), # 你提供的Claude模型名称
        "type": "anthropic"
    },
    "gemini": {
        "model": gemini_model, # Gemini 的接口与其他略有不同，直接存 model 对象
        "model_name": gemini_model_name, # 使用上面解析出的模型名称
        "type": "gemini"
    }
}

# --- 辅助函数：获取指定日期所在周的起止日期（周一到周日） ---
def get_week_range(date):
    start = date - timedelta(days=date.weekday())  # 周一
    end = start + timedelta(days=6)                # 周日
    return start.replace(hour=0, minute=0, second=0, microsecond=0), \
           end.replace(hour=23, minute=59, second=59, microsecond=999999)

# --- 辅助函数：读取指定日期所在周的日记 ---
def read_weekly_diary(folder, start_date_range, end_date_range):
    work_entries = []
    life_entries = []

    for file in sorted(os.listdir(folder)):
        if not file.endswith(".md"):
            continue

        date_match = re.search(r"\d{4}-\d{2}-\d{2}", file)
        if not date_match:
            continue
        file_date = datetime.strptime(date_match.group(), "%Y-%m-%d")

        if start_date_range <= file_date <= end_date_range:
            with open(os.path.join(folder, file), "r", encoding="utf-8") as f:
                content = f.read()
                # 确保正确匹配“## 工作”和“## 生活”之间的内容
                work_part = re.search(r"## 工作([\s\S]*?)(?=## 生活|$)", content)
                life_part = re.search(r"## 生活([\s\S]*)", content)

                if work_part:
                    work_entries.append(work_part.group(1).strip())
                if life_part:
                    life_entries.append(life_part.group(1).strip())

    return "\n\n".join(work_entries), "\n\n".join(life_entries)

# --- 辅助函数：构建 Prompt ---
def build_prompt(work_text, life_text, start, end):
    # 使用你提供的最新 Prompt 模板
    return f"""
你是一名专业的私人秘书，擅长从详细的每日记录中提炼主题、总结成果，并生成结构化、深思熟虑的周期性报告。你的核心任务是根据我提供的一周内的所有每日日记内容，为我撰写一份全面且富有洞察力的周记。
**要求**：1. 严格按照以下模板结构组织内容；2. 保持内容的连贯性和个人化特色；3. 鼓励深度反思和未来规划；4. 语言自然流畅，具有个人日记的真实感
周记格式如下：

---

时间：{start.strftime('%Y-%m-%d')} ~ {end.strftime('%Y-%m-%d')}

## 工作

### 内容
- 详细描述本周主要的工作任务、项目进展、会议活动等，重点是用一两段话进行一个总结和评估。

### 进展
- 总结本周工作上的成果、完成的目标、解决的问题等，侧重于工作进展。

### 改进
- 反思本周工作中的不足之处、可以优化的流程或方法，提出具体的改进建议。

### 计划
- 基于本周的工作进展情况、日记中可能提及的未完成事项，以及你提炼出的改进点，列出下周明确可执行的工作计划。

## 生活

### 回顾
- 简要回顾这周发生的重要事件和个人经历，无论是快乐的、挑战的还是启发性的，最好是能串联起来，让我的周记更有个人化和个性化的感觉。

### 健康
- 记录这周在身体健康和心理健康方面的实践和感受，包括运动、饮食、休息和任何自我照顾的活动。

### 社交
- 反思这周与家人、朋友和其他重要人际关系的互动，包括任何特别的社交活动、重要对话或感情变化。

### 成长
- 总结这周在个人成长和学习方面的进展，包括阅读、在线课程、工作坊、思维模式的改变等。

### 娱乐
- 列出这周进行的休闲活动、新的尝试或兴趣爱好，包括电影、音乐、游戏、旅行等，描述它们给我带来的乐趣和启发。

### 思考
- 基于整周的记录，进行一次更高维度的反思，重点可以是对生活、工作、社会现象的独特见解，或者是对未来的规划和愿景。如果没有就请你随机生成一些有趣的思考内容。

---

你的回复必须结构清晰、内容深思熟虑。在撰写过程中，如果发现每日日记中缺少某些关键细节（例如，某些部分信息不足以进行有效总结），请通过澄清性问题向我提出，以确保周记的完整性和准确性。保持温暖、专业和反思的语气。

【本周工作日记】：
{work_text}

【本周生活日记】：
{life_text}
"""

# --- 核心修改：统一的 AI 调用函数 ---
def generate_weekly_report(prompt, selected_model_config):
    model_type = selected_model_config["type"]
    model_name = selected_model_config["model_name"]
    weekly_report = None

    print(f"尝试使用模型: {model_name} (类型: {model_type})")

    try:
        # 兼容性检查：如果是 Gemini 模型，确保 gemini_model 对象存在
        if model_type == "gemini" and selected_model_config["model"] is None:
            raise ValueError(f"Gemini 模型未正确初始化，可能是API Key缺失。")
        # 确保所有模型都至少有一个名称
        if model_name is None:
             raise ValueError(f"模型名称未定义。")


        if model_type == "openai_compatible":
            client = selected_model_config["client"]
            response = client.chat.completions.create(
                model=model_name,
                messages=[
                    {"role": "system", "content": "你是一个优秀的写作助手。"},
                    {"role": "user", "content": prompt}
                ],
                temperature=TEMPERATURE
            )
            weekly_report = response.choices[0].message.content
        elif model_type == "anthropic":
            client = selected_model_config["client"]
            response = client.messages.create(
                model=model_name,
                max_tokens=4000, # Claude API required max_tokens
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=TEMPERATURE
            )
            weekly_report = response.content[0].text # Claude 响应结构不同
        elif model_type == "gemini":
            model = selected_model_config["model"]
            # Gemini API 对 system prompt 的处理方式可能不同，这里直接在 prompt 中包含所有指令
            response = model.generate_content(
                prompt, # 对于 generate_content，这里直接传递带指令的 Prompt 字符串
                generation_config=genai.types.GenerationConfig(temperature=TEMPERATURE)
            )
            weekly_report = response.text
        else:
            print(f"不支持的模型类型: {model_type}")
            return None

    except ValueError as ve:
        print(f"模型配置错误: {ve}")
        return "AI 生成周记失败，请检查模型配置和API Key。"
    except Exception as e:
        print(f"调用 {model_name} 模型发生错误: {e}")
        # 打印完整的错误信息，以便调试
        import traceback
        traceback.print_exc() 
        return "AI 生成周记失败，请检查API连接，Prompt内容或模型调用限制。"

    return weekly_report

# --- 辅助函数：保存周记到文件 ---
def save_weekly(content, start_date, model_suffix=""):
    # 根据周的起始日期和使用的模型生成文件名 (例如: 2025-W30-deepseek.md)
    year, week_num, _ = start_date.isocalendar()
    if model_suffix:
        filename = os.path.join(WEEKLY_FOLDER, f"{year}-W{week_num:02}-{model_suffix}.md")
    else:
        filename = os.path.join(WEEKLY_FOLDER, f"{year}-W{week_num:02}.md")
    
    # 确保输出目录存在
    os.makedirs(WEEKLY_FOLDER, exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"周记已保存到 {filename}")


# --- 主执行逻辑 ---
if __name__ == "__main__":
    # 检查 SELECTED_MODEL 是否有效
    if SELECTED_MODEL not in MODELS:
        print(f"配置错误: SELECTED_MODEL '{SELECTED_MODEL}' 不是一个有效的模型名称。")
        print(f"请从以下选项中选择: {', '.join(MODELS.keys())}")
        exit()

    selected_model_config = MODELS[SELECTED_MODEL]
    
    # 进一步检查选定模型是否已经成功初始化（特别是Gemini和Anthropic，它们可能在API Key缺失时初始化失败）
    if SELECTED_MODEL == "gemini" and selected_model_config["model"] is None:
        print("您选择了 Gemini 模型，但其 API Key 未设置或模型未正确初始化。请检查 .env 文件中的 GEMINI_API_KEY。")
        exit()
    # 对于 OpenAI 和 DeepSeek (openai_compatible 类型)，它们的客户端在没有 API Key 时可能不会立即报错，
    # 但会在首次调用时报错。而 Anthropic 和 Gemini 会在初始化时或更早阶段需要 Key。
    # 这里增加一个通用检查，确保 client 或 model 对象存在
    if (selected_model_config["type"] == "openai_compatible" and selected_model_config["client"] is None) or \
       (selected_model_config["type"] == "anthropic" and selected_model_config["client"] is None):
        print(f"您选择了 {SELECTED_MODEL} 模型，但其客户端未正确初始化。请检查 .env 文件中的 {SELECTED_MODEL.upper()}_API_KEY。")
        exit()


    print(f"将使用预设模型：{SELECTED_MODEL}, 具体模型是: {selected_model_config.get('model_name', 'N/A')}")
    
    
    # --- 核心修改：支持日期范围输入 ---
    while True:
        start_date_str = input("请输入您想开始生成周记的日期 (YYYY-MM-DD，留空则从上周周一开始): ").strip()
        if not start_date_str:
            # 默认从上周周一开始
            today = datetime.now()
            start_of_this_week = today - timedelta(days=today.weekday())
            start_date = start_of_this_week - timedelta(weeks=1)
            print(f"未指定起始日期，将从 {start_date.strftime('%Y-%m-%d')} 开始。")
            break
        else:
            try:
                start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
                break
            except ValueError:
                print(f"起始日期格式错误: '{start_date_str}'，请使用 YYYY-MM-DD 格式。")
    
    while True:
        end_date_str = input("请输入您想结束生成周记的日期 (YYYY-MM-DD，留空则批量生成到本周周末): ").strip()
        if not end_date_str:
            # 默认生成到本周周末 (包括本周)
            today = datetime.now()
            start_date_current_week, end_date_current_week = get_week_range(today)
            end_date = end_date_current_week
            print(f"未指定结束日期，将生成到 {end_date.strftime('%Y-%m-%d')}。")
            break
        else:
            try:
                end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
                if end_date < start_date:
                    print("结束日期不能早于起始日期，请重新输入。")
                    continue
                break
            except ValueError:
                print(f"结束日期���式错误: '{end_date_str}'，请使用 YYYY-MM-DD 格式。")

    
    # --- 自动化循环处理每一周 ---
    # current_processing_date 从起始日期所在的周一计算
    current_processing_date_week_start, _ = get_week_range(start_date)

    while current_processing_date_week_start <= end_date: # 循环条件是当前周的周一不晚于结束日期
        # 获取当前处理日期的周范围
        week_start, week_end = get_week_range(current_processing_date_week_start)

        print(f"\n--- 正在处理 {week_start.strftime('%Y-%m-%d')} ~ {week_end.strftime('%Y-%m-%d')} 的周记 ---")

        # 读取该周的日记内容
        work_text, life_text = read_weekly_diary(DIARY_FOLDER, week_start, week_end)

        if not work_text.strip() and not life_text.strip(): # 使用 .strip() 检查是否只含空字符
            print(f"在 '{DIARY_FOLDER}' 文件夹中未找到 {week_start.strftime('%Y-%m-%d')} 至 {week_end.strftime('%Y-%m-%d')} 期间的任何有效日记内容。跳过本周。")
        else:
            # 构建 Prompt
            prompt = build_prompt(work_text, life_text, week_start, week_end)
            print("Prompt 构建完成，开始生成周记...")

            # 调用 AI 生成周记，传入预设的模型配置
            weekly_report = generate_weekly_report(prompt, selected_model_config)

            if weekly_report and "AI 生成周记失败" not in weekly_report:
                print("AI 生成的周记内容已生成。") # 不再直接打印内容，避免屏幕刷屏
                # 保存周记，文件名加上模型后缀
                save_weekly(weekly_report, week_start, SELECTED_MODEL)
            else:
                print(f"未能成功生成 {week_start.strftime('%Y-%m-%d')} ~ {week_end.strftime('%Y-%m-%d')} 的周记。")
        
        # 移动到下一周的开始日期
        current_processing_date_week_start += timedelta(weeks=1)

    print("\n所有指定周期的周记生成任务已完成。")


```

## 主要功能和解释

### 主要功能
- 该 Python 脚本的主要功能是**自动化生成周记**。它通过读取用户指定文件夹中的每日[[日记]]（Markdown 格式），提取工作和生活两大类别的内容，然后利用预设的大语言模型（LLM）根据一个详细的提示词（Prompt）生成结构化的[[周记]]报告，并将其保存到指定路径。

### 解释
1.  **多模型支持与灵活切换**：
    *   脚本集成了多种主流大语言模型API，包括 **OpenAI** (兼容 DeepSeek)、**Anthropic (Claude)**、和 **Google (Gemini)** [1]。
    *   用户可以通过修改 `SELECTED_MODEL` 变量轻松选择要使用的模型，例如 `SELECTED_MODEL = "deepseek"` 即可使用 DeepSeek 模型 [5]。
    *   不同模型的API客户端和调用方式被统一封装在一个 `MODELS` 字��中，确保了代码的模块化和易于扩展性。
2.  **环境变量配置**：
    *   使用 `python-dotenv` 库从 `.env` 文件加载API密钥和模型名称等敏感信息和配置，提升了安全性和灵活性。
3.  **自动化周记内容收集**：
    *   `read_weekly_diary` 函数负责遍历指定日记文件夹（`DIARY_FOLDER`）中的Markdown文件 [4]。
    *   它会根据文件名中的日期判断日记是否属于当前处理的周范围。
    *   通过正则表达式智能地从每日日记中提取“工作”和“生活”两个部分的内容，并将同一类型的内容聚合起来，作为LLM的输入。
4.  **结构化Prompt构建**：
    *   `build_prompt` 函数根据提取的工作和生活文本以及周的起止日期，构造一个详细、结构化的Prompt。
    *   这个Prompt包含了对AI角色的设定（专业私人秘书），以及周记所需的完整结构和内容要求（工作内容的总结、进展、改进、计划；生活的回顾、健康、社交、成长、娱乐、思考等），确保生成内容的质量和一致性。
5.  **统一的AI调用接口**：
    *   `generate_weekly_report` 函数是核心的AI调用逻辑，它根据 `SELECTED_MODEL` 的类型（OpenAI兼容、Anthropic或Gemini）动态地调用相应的API客户端 [2]。
    *   它处理了不同API的请求和响应结构的差异，并包含了错误处理机制，以便在API调用失败时提供反馈。
6.  **日期范围与批量生成**：
    *   脚本允许用户输入一个起始日期和一个结束日期，然后会自动循环处理该日期范围内的每一周。
    *   如果用户未输入日期，则默认从上周周一批量生成到本周周末。
    *   这使得用户可以方便地一次性生成多周的周记报告，无需手动逐周操作。
7.  **周记保存与命名规范**：
    *   生成的周记内容会被保存到 `WEEKLY_FOLDER`，文件名会包含年份、周数以及所使用的模型名称作为后缀（例如 `2024-W30-deepseek.md`），方便用户识别和管理。
### 总结
- 该脚本提供了一个全面的解决方案，用于将分散的每日笔记转化为结构化、有洞察力的周期性报告。它通过自动化数据聚合、灵活的模型选择和智能的 Prompt 工程，大大减轻了用户手动撰写[[周记]]的负担，并能利用先进的人工智能能力提供高质量的总结和反思。