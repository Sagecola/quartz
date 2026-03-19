---
publish: true
created: 2026-01-30T22:58:25.125+08:00
modified: 2024-08-06T09:51:33.213+08:00
tags:
  - AssistantsAPI
  - 交互
  - OpenAI
  - 代码
cssclasses: ""
---

## Python代码
```python
from openai import OpenAI
client = OpenAI(api_key='sk-xxx')
  
assistant = client.beta.assistants.create(
  name="Math Tutor",
  instructions="You are a personal math tutor. Write and run code to answer math questions.",
  tools=[{"type": "code_interpreter"}],
  model="gpt-3.5-turbo",
)

thread = client.beta.threads.create()

message = client.beta.threads.messages.create(
  thread_id=thread.id,
  role="user",
  content="I need to solve the equation `3x + 11 = 14`. Can you help me?"
)

## 运行assistants api
run = client.beta.threads.runs.create(
    assistant_id=assistant.id,
    thread_id=thread.id,
    instructions="Please address the user as Jane Doe. The user has a premium account."
)

run = client.beta.threads.runs.retrieve( # 通过thread.id和run.id来查看run的状态
  thread_id=thread.id,
  run_id=run.id
)
print(run)


```

## 主要功能和解释
这是一个简单的脚本，用于与[[OpenAI]]的[[🌸 角落/🐍 代码/Assistants API]]进行交互。在示例中，创建了一个名为"数学导师"的助手，开启了一个对话线程，并在其中发送了用户关于求解方程`3x + 11 = 14`的消息。