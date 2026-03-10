---
publish: true
created: 2026-02-02T15:56:08.242+08:00
modified: 2026-02-02T15:57:40.988+08:00
tags:
  - Notion
  - 头像
  - 风格
  - prompt
cssclasses: ""
---

This document contains the strict prompts used to generate Notion-style avatars with [[Gemini]] AI.

## Photo-to-Avatar Prompt

Used when transforming an uploaded photo into a Notion-style avatar:

```
Transform this photo into a Notion Avatar style illustration with these exact characteristics:
- Pure black and white color scheme only
- Simple black outline strokes for facial contours
- Solid black fill for hair (no gradients, no strokes)
- Minimalist facial features: simple shapes for eyes, single line for nose, simple curve for mouth
- Pure white background (#ffffff) - MUST be solid white, no other colors, no gradients, no transparency
- Cartoon proportions with slightly larger head
- Completely flat design with NO shadows or gradients
- Slight hand-drawn imperfection in lines
- Head and shoulders composition only
- Keep the person's key facial features recognizable but simplified
```

## Text-to-Avatar Prompt

Used when generating an avatar from a text description:

```
Generate a Notion Avatar style portrait illustration based on this description:
- Pure black and white color scheme only
- Simple black outline strokes for facial contours
- Solid black fill for hair (no gradients)
- Minimalist facial features: simple shapes for eyes, single line for nose, simple curve for mouth
- Pure white background (#ffffff) - MUST be solid white, no other colors, no gradients, no transparency
- Cartoon proportions with slightly larger head
- Completely flat design with NO shadows or gradients
- Slight hand-drawn imperfection in lines
- Head and shoulders composition only

User description: [text description]
```

## Key Design Principles

1. **Strict Monochromatic**: Only pure black (#000000) and pure white (#ffffff)
2. **Flat Design**: No gradients, shadows, or depth effects
3. **Minimalist Features**: Simple geometric shapes for facial features
4. **Hand-drawn Aesthetic**: Slight imperfections in stroke lines
5. **Consistent Composition**: Head and shoulders only
6. **No Transparency**: Background must be solid white
