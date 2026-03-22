---
publish: true
title: chinese-typeset-polish Skill
description: 按中文与中英混排规范进行排版规范化，并做最小化语义润色，支持正式/学术与对话两种风格模式。
created: 2026-03-22T17:00:00+08:00
modified: 2026-03-22T17:00:00+08:00
tags:
  - skill
  - claude
  - 工具
  - 中文排版
cssclasses: ""
---


# Chinese Typeset and Polish

Apply Chinese copywriting typesetting rules and perform light semantic polishing while preserving original meaning.

Load detailed rules from [references/rules.md](references/rules.md) before editing.

## Workflow

1. Detect input mode.
2. Run mechanical normalization first.
3. Run semantic polishing second.
4. Enforce immutable-content constraints.
5. Output according to mode.

## Detect Input Mode

- `file mode`：user asks to polish a file or gives a concrete file path.
- `dialog mode`：user pastes plain text in chat for polishing.

If ambiguous, infer from context and proceed without blocking.

## Execution Order

1. Apply spacing / fullwidth-halfwidth / punctuation / casing / term rules.
2. Handle rule exceptions with higher priority.
3. Polish wording and sentence flow with minimal edits.

Never start with rewriting style before rule normalization.

## Style Control

- `academic/formal`：precise wording, tighter logic, avoid colloquial fillers.
- `conversational`：natural tone, clear and smooth phrasing.
- If style is not specified, infer from source tone and keep close to original.

## Immutable Constraints

Do not alter these unless user explicitly asks:

- Markdown links URL targets.
- Code blocks, inline code, commands, API names.
- Quoted source text that must stay verbatim.
- User-provided glossary terms that already match canonical casing/spelling.

## Output Policy

- `file mode`：edit the file directly; provide change rationale in chat only.
- `dialog mode`：return:
  1. optimized text
  2. concise "修改说明" grouped by rule category

## Quality Bar

- Preserve meaning.
- Minimize unnecessary rewrites.
- Keep terminology and casing consistent.
- Keep punctuation and spacing globally consistent.
