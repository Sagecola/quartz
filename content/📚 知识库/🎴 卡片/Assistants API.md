---
publish: true
created: 2026-02-02T09:21:36.796+08:00
modified: 2024-07-17T16:58:32.000+08:00
tags:
  - API
  - ChatGPT
  - Agent
cssclasses: ""
---

Assistants API 允许您在自己的应用程序中构建 AI 助手。助手具有指令，并且可以利用模型、工具和文件来响应用户查询。助手 API 当前支持三种类型的工具：代码解释器（Code Interpreter）、文件搜索（File Search）和函数调用（Function calling）。

您可以使用[Assistants playground](https://platform.openai.com/playground?mode=assistant)探索 Assistant API 的功能，或者通过本指南中概述的逐步集成来构建。

## 概览

Assistant API 的典型集成流程如下：
1. 通过定义其自定义指令并选择一个模型来创建助手。如果有帮助，添加文件并启用代码解释器、文件搜索和函数调用等工具。
2. 当用户开始对话时，创建一个线程。
3. 当用户提出问题时，向线程添加消息。
4. 通过调用模型和工具来生成响应，运行助手在线程上。

本入门指南将引导您完成创建和运行使用代码解释器的助手的关键步骤。在这个例子中，我们正在创建一个个人数学导师助手，启用了代码解释器工具。

> [!info]+ 调用助手 API 需要您传递一个 beta HTTP 头。如果您使用 OpenAI 的官方 Python 或 Node.js SDK，这将自动处理。
> 
> `OpenAI-Beta: assistants=v2`

### 第 1 步：创建助手

助手代表一个实体，可以通过多个参数（如 `model`、`instructions` 和 `tools`）配置以响应用户的消息。

**创建助手**

```python
from openai import OpenAI
client = OpenAI()

assistant = client.beta.assistants.create(
  name="Math Tutor",
  instructions="You are a personal math tutor. Write and run code to answer math questions.",
  tools=[{"type": "code_interpreter"}],
  model="gpt-4-turbo",
)
```

### 第 2 步：创建线程

线程代表用户和一个或多个助手之间的对话。当用户（或您的 AI 应用程序）开始与您的助手对话时，您可以创建一个线程。

**创建线程**

```python
thread = client.beta.threads.create()
```

### 第 3 步：向线程添加消息

您的用户或应用程序创建的消息内容被添加为线程中的消息对象。消息可以包含文本和文件。您可以向线程添加的消息数量没有限制——我们会智能地截断任何不适合模型上下文窗口的上下文。

**向线程添加消息**

```python
message = client.beta.threads.messages.create(
  thread_id=thread.id,
  role="user",
  content="I need to solve the equation `3x + 11 = 14`. Can you help me?"
)
```

### 第 4 步：创建运行

一旦所有用户消息都已添加到线程中，您可以使用任何助手运行线程。创建运行使用与助手关联的模型和工具生成响应。这些响应作为消息添加到线程中。

**带流式传输**

您可以使用 Python 和 Node SDK 中的 'create and stream' 助手来创建运行并流式传输响应。

**创建并流式传输运行**

```python
from typing_extensions import override
from openai import AssistantEventHandler

## 首先，我们创建一个 EventHandler 类来定义
## 我们想要如何处理响应流中的事件。

class EventHandler(AssistantEventHandler):    
  @override
  def on_text_created(self, text) -> None:
    print(f"\nassistant > ", end="", flush=True)
      
  @override
  def on_text_delta(self, delta, snapshot):
    print(delta.value, end="", flush=True)
      
  def on_tool_call_created(self, tool_call):
    print(f"\nassistant > {tool_call.type}\n", flush=True)
  
  def on_tool_call_delta(self, delta, snapshot):
    if delta.type == 'code_interpreter':
      if delta.code_interpreter.input:
        print(delta.code_interpreter.input, end="", flush=True)
      if delta.code_interpreter.outputs:
        print(f"\n\noutput >", flush=True)
        for output in delta.code_interpreter.outputs:
          if output.type == "logs":
            print(f"\n{output.logs}", flush=True)

## 然后，我们使用 `stream` SDK 助手
## 与 `EventHandler` 类一起创建运行
## 并流式传输响应。

with client.beta.threads.runs.stream(
  thread_id=thread.id,
  assistant_id=assistant.id,
  instructions="Please address the user as Jane Doe. The user has a premium account.",
  event_handler=EventHandler(),
) as stream:
  stream.until_done()
```

**不带流式传输**

运行是异步的，这意味着您需要通过轮询运行对象来监控它们的状态，直到达到一个终止状态。为了方便，'create and poll' SDK 助手在创建运行和随后轮询其完成状态时都提供了帮助。

**创建运行**

```python
run = client.beta.threads.runs.create_and_poll(
  thread_id=thread.id,
  assistant_id=assistant.id,
  instructions="Please address the user as Jane Doe. The user has a premium account."
)
```

一旦运行完成，您可以列出助手添加到线程中的信息。

```python
if run.status == 'completed': 
  messages = client.beta.threads.messages.list(
    thread_id=thread.id
  )
  print(messages)
else:
  print(run.status)
```

如果您想查看在这次运行中所做的任何工具调用，您可能还想要列出这次运行的运行步骤。

## 如何使用 Assistant API (Beta)

Assistant API 旨在帮助开发者构建能够执行各种任务的强大 AI 助手。

### 主要特性

- **模型定制：** 助手可以使用特定指令调用 OpenAI 的模型，以调整它们的个性和能力。
- **工具访问：** 助手可以并行访问多个工具，包括 OpenAI 托管的工具（如 `code_interpreter` 和 `file_search`）以及您构建/托管的工具（通过函数调用）。
- **持久线程：** 助手可以访问持久线程，以简化 AI 应用程序开发，通过存储消息历史记录和管理上下文长度。
- **文件处理：** 助手可以处理各种格式的文件，创建文件（例如，图像、电子表格），并在它们的消息中引用文件。

### 对象
![Pasted image 20240429161353](https://msa-tuchuang.oss-cn-hangzhou.aliyuncs.com/obsidian/2024/06/202406171322405.png)

| 对象   | 它代表什么                              |
| ---- | ---------------------------------- |
| 助手   | 使用 OpenAI 模型并调用工具的定制 AI            |
| 线程   | 助手和用户之间的对话会话。存储消息并管理截断。            |
| 消息   | 助手或用户创建的消息，可以包含文本、图像和其他文件。         |
| 运行   | 在线程上调用助手，通过调用模型和工具执行任务。            |
| 运行步骤 | 助手作为运行的一部分所采取的步骤的详细信息，包括工具调用或消息创建。 |

### 创建助手

要开始使用，创建助手只需要指定要使用的模型。但您可以进一步自定义助手的行为：
- 使用`Assistant`参数来引导助手的性格，并定义其目标。指令类似于聊天完成API中的系统消息。
- 使用`tools`参数给助手提供最多128个工具的访问权限。您可以让它访问OpenAI托管的工具，如`code_interpreter`和`file_search`，或者通过`calling.tools`调用第三方工具。
- 使用`tool_resources`参数给像`code_interpreter`和`file_search`这样的工具提供文件访问权限。文件需要使用上传端点上传，并且必须将`Filepurpose`设置为`assistants`才能与此API一起使用。

例如，要创建一个能够基于文件创建数据可视化的助手，首先上传一个`.csv`文件。

```python
file = client.files.create(
  file=open("revenue-forecast.csv", "rb"),
  purpose='assistants'
)
```

接下来，创建一个启用了工具的助手，并将文件作为资源提供给`code_interpreter`工具。

```python
assistant = client.beta.assistants.create(
  name="Data visualizer",
  description="You are great at creating beautiful data visualizations. You analyze data present in .csv files, understand trends, and come up with data visualizations relevant to those trends. You also share a brief text summary of the trends observed.",
  model="gpt-4-turbo",
  tools=[{"type": "code_interpreter"}],
  tool_resources={
    "code_interpreter": {
      "file_ids": [file.id]
    }
  }
)
```

您可以将最多20个文件附加到`code_interpreter`工具上，并且可以附加最多10,000个文件到`file_search`工具（使用对象存储）。

每个文件的最大大小不能超过512MB，并且最大令牌数为5,000,000。默认情况下，您的组织上传的所有文件的总大小不能超过100GB，但如果需要，您可以联系我们的支持团队来增加这个限制。

### 管理线程和消息

线程和消息代表助手和用户之间的对话会话。您可以在线程中存储的消息数量没有限制。一旦消息的大小超过模型的上下文窗口，线程将尝试智能截断消息，然后才会完全删除它认为最不重要的消息。

您可以像这样创建一个带有初始消息列表的线程：

```python
thread = client.beta.threads.create(
  messages=[
    {
      "role": "user",
      "content": "根据此文件中的趋势创建3个数据可视化。",
      "attachments": [
        {
          "file_id": file.id,
          "tools": [{"type": "code_interpreter"}]
        }
      ]
    }
  ]
)
```

消息可以包含文本、图像或文件附件。消息是帮助方法，它们将文件添加到线程的 `tool_resources` 中。您也可以选择直接将文件添加到 `thread.tool_resources` 中。目前，用户创建的消息不能包含图像文件，但我们计划在未来增加对此的支持。

#### 上下文窗口管理

Assistant API 自动管理截断，以确保它保持在模型的最大上下文长度内。您可以通过指定您希望运行使用的最多令牌数和/或您希望在运行中包含的最近消息的最大数量来自定义此行为。

#### 最大完成令牌和最大提示令牌

为了控制单个运行中的令牌使用情况，在创建运行时设置 `max_prompt_tokens` 和 `max_completion_tokens`。这些限制适用于运行生命周期中所有完成中使用的总令牌数。

例如，启动一个运行时将 `max_prompt_tokens` 设置为 500 并将 `max_completion_tokens` 设置为 1000 意味着第一次完成将线程截断到 500 个令牌，并将输出限制在 1000 个令牌。如果在第一次完成中使用了 200 个提示令牌和 300 个完成令牌，那么第二次完成将有 300 个提示令牌和 700 个完成令牌的可用限制。

如果完成达到了 `max_completion_tokens` 限制，运行将以 `incomplete` 状态终止，并且详细信息将提供在运行对象的 `incomplete_details` 字段中。

#### 截断策略

您还可以指定一个截断策略来控制线程应如何呈现在模型的上下文窗口中。使用类型为 `auto` 的截断策略将使用 OpenAI 的默认截断策略。使用类型为 `last_messages` 的截断策略将允许您指定要在上下文窗口中包含的最近消息的数量。

#### 消息注释

助手创建的消息可能在其对象的 `content` 数组中包含注释。注释提供了关于您应该如何注释消息文本的信息。

#### 注释类型

- **file_citation**: 文件引用由 `file_search` 工具创建，并定义了助手用来生成响应的特定文件的引用。
- **file_path**: 文件路径注释由 `code_interpreter` 工具创建，并包含对工具生成的文件的引用。

当消息对象中存在注释时，您将看到文本中不可读的模型生成的子字符串，您应该用注释替换这些字符串。这些字符串可能看起来像 `【13†source】` 或 `sandbox:/mnt/data/file.csv`。

以下是一个 Python 代码片段，展示了如何用注释中存在的信息替换这些字符串：

```python
## Retrieve the message object
message = client.beta.threads.messages.retrieve(
  thread_id="...",
  message_id="..."
)
 
## Extract the message content
message_content = message.content[0].text
annotations = message_content.annotations
citations = []
 
## Iterate over the annotations and add footnotes
for index, annotation in enumerate(annotations):
    # Replace the text with a footnote
    message_content.value = message_content.value.replace(annotation.text, f' [{index}]')
 
    # Gather citations based on annotation attributes
    if (file_citation := getattr(annotation, 'file_citation', None)):
        cited_file = client.files.retrieve(file_citation.file_id)
        citations.append(f'[{index}] {file_citation.quote} from {cited_file.filename}')
    elif (file_path := getattr(annotation, 'file_path', None)):
        cited_file = client.files.retrieve(file_path.file_id)
        citations.append(f'[{index}] Click <here> to download {cited_file.filename}')
        # Note: File download functionality not implemented above for brevity
 
## Add footnotes to the end of the message before displaying to user
message_content.value += '\n' + '\n'.join(citations)
```

### 运行和运行步骤

当您在 Thread 中拥有用户所需的所有上下文时，您可以使用您选择的 Assistant 运行 Thread。

```python
run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id=assistant.id
)
```

默认情况下，Run 将使用 Assistant 对象中指定的配置，但在创建 Run 时可以覆盖其中的大部分配置，以增加灵活性：

```python
run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id=assistant.id,
  model="gpt-4-turbo",
  instructions="New instructions that override the Assistant instructions",
  tools=[{"type": "code_interpreter"}, {"type": "file_search"}]
)
```

注意：在创建“运行”期间，无法覆盖与助手关联的内容。您必须使用修改助理终结点来执行此操作。

#### 运行生命周期

运行对象可以具有多个状态。
- **queued**: 首次创建运行或完成时，它们将移至排队状态。他们几乎应该立即转向 `in_progress`。
- **in_progress**: 助手会使用模型和工具来执行步骤。您可以通过检查运行步骤来查看运行所取得的进度。
- **completed**: 跑步成功完成！现在，您可以查看助理添加到话题中的所有消息，以及“运行”执行的所有步骤。您还可以通过向线程添加更多用户消息并创建另一个运行来继续对话。
- **requires_action**: 使用函数调用工具时，一旦模型确定要调用的函数的名称和参数，运行将进入此状态。然后，您必须运行这些函数并提交输出，然后才能继续运行。如果在时间戳通过之前（大约在创建后 10 分钟）未提供输出，则运行将进入过期状态。
- **expired**: 当函数调用输出之前未提交并且运行过期时，会发生这种情况。此外，如果运行执行时间过长，并且超出了时间限制，我们的系统将使运行过期。
- **cancelling**: 您可以尝试使用“取消运行”终结点取消运行。尝试取消成功后，“运行”的状态将变为 `cancelled`。尝试取消，但不能保证取消。
- **cancelled**: 运行已成功取消。
- **failed**: 您可以通过查看“运行”中的 `last_error` 对象来查看失败的原因。失败的时间戳将记录在 `failed_at` 下。
- **incomplete**: 运行因超出最大提示或完成令牌而结束或已达到。您可以通过查看“运行”中的 `incomplete_details` 对象来查看具体原因。

#### 轮询更新

如果不使用流式处理，为了使运行状态保持最新，则必须定期检索 Run 对象。每次检索对象时，都可以检查运行状态，以确定应用程序下一步应执行的操作。

您可以选择使用我们的 Node 和 Python SDK 中的轮询帮助程序来帮助您完成此操作。这些帮助程序将自动轮询 Run 对象，并在 Run 对象处于最终状态时返回该对象。

#### 线程锁

当 Run 处于终端状态时，Thread 将被锁定。这意味着：
- 无法将新消息添加到线程中。
- 无法在线程上创建新运行。

#### 运行步骤

“运行步骤”状态与“运行状态”具有相同的含义。

“运行步骤”对象中的大多数有趣细节都位于 `step_details` 字段中。可以有两种类型的步骤详细信息：
- **message_creation**: 当 Assistant 在线程上创建消息时，将创建此运行步骤。
- **tool_calls**: 此运行步骤是在 Assistant 调用工具时创建的。有关此内容的详细信息，请参阅工具指南的相关部分。

### 数据访问指南

目前，通过 API 创建的助手、线程、消息和向量存储限定在它们被创建的项目范围内。因此，任何拥有该项目 API 密钥访问权限的人都可以在该项目中读取或写入助手、线程、消息和运行。

我们强烈推荐以下数据访问控制措施：

- **实现授权**：在对助手、线程、消息和向量存储进行读取或写入之前，请确保最终用户已被授权。例如，在您的数据库中存储最终用户有权访问的对象 ID，并在使用 API 获取对象 ID 之前进行检查。
- **限制 API 密钥访问**：仔细考虑谁在您的组织中应该拥有 API 密钥并成为项目的一部分。定期审核此列表。API 密钥可以执行包括读取和修改敏感信息（如消息和文件）在内的广泛操作。
- **创建独立账户**：考虑为不同的应用程序创建独立的项目，以便在多个应用程序中隔离数据。
