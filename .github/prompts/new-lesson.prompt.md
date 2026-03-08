---
description: "Scaffold a new MDX lesson file for Acert — generates frontmatter, component imports, and structured content"
argument-hint: "<track> <sub-track> <topic> <order>"
agent: agent
---

Create a new MDX lesson file for the Acert educational platform.

## Inputs

The user will provide some or all of:
- **track** — top-level collection: `cloud`, `programming`, `networking`, `cicd`, `data`
- **sub-track** — folder within the track: e.g. `aws`, `azure`, `java`, `rust`, `fundamentals`, or `common`
- **topic** — what the lesson covers (e.g. "S3 bucket policies", "Rust ownership")
- **order** — integer for the `order` field and filename prefix (e.g. `5` → `05-...`)

If sub-track is `common`, this is a shared lesson that may appear in multiple tracks — ask which tracks it should `sharedWith`.

If any of the above are missing, infer from context or ask before proceeding.

## File Path Rules

Derive the filename as `{order:02d}-{kebab-slug}.mdx`, e.g. order=5, topic="S3 Bucket Policies" → `05-s3-bucket-policies.mdx`.

Place the file at:
- `src/content/{track}/{sub-track}/{filename}` for track-specific lessons
- `src/content/{track}/common/{filename}` for shared lessons

## Import Path Depth

The relative import path to `src/components/mdx/` depends on nesting depth:
- `src/content/{track}/{sub-track}/` (3 levels deep) → `'../../../components/mdx/Component.astro'`
- `src/content/{track}/common/` (also 3 levels deep) → `'../../../components/mdx/Component.astro'`

Always use relative paths. Never use absolute or alias imports.

## Required Output

Generate the complete `.mdx` file content with:

### 1. Frontmatter

```yaml
---
title: ""            # Full readable title
description: ""      # One-sentence summary, specific and scannable
order:               # Integer matching the filename prefix
duration:            # Estimated reading/study time in minutes (5–30)
tags: []             # 3–6 lowercase kebab-case tags
icon: ""             # Iconify icon name e.g. "logos:aws" — omit if unsure
certifications: []   # Relevant cert names, or omit
sharedWith: []       # Only for common/ lessons — list of track names e.g. ["aws", "azure"]
sharedConcepts: []   # Slugs of common/ lessons to cross-reference, or omit
---
```

Omit optional fields if they're not clearly applicable.

### 2. Component Imports

Always import at minimum:
```mdx
import Callout from '../../../components/mdx/Callout.astro';
import KeyPoints from '../../../components/mdx/KeyPoints.astro';
```

Add these only if the lesson content uses them:
```mdx
import Quiz from '../../../components/mdx/Quiz.astro';
import CodeTabs from '../../../components/mdx/CodeTabs.astro';
import List from '../../../components/mdx/List.astro';
import CodeComparison from '../../../components/mdx/CodeComparison.astro';
```

### 3. Lesson Body

Follow this structure:

1. **Opening paragraph** — 2–3 sentences framing what the lesson covers and why it matters. No heading.
2. **`<KeyPoints>` block** — 4–6 bullet points summarising concrete skills the reader will gain. Use action-based phrasing ("How to...", "Why...", "When to use...").
3. **`---` separator**
4. **Content sections** — use `##` headings. Each section should be focused and progressively deeper. Use code blocks, diagrams, or `<Callout>` as appropriate for the topic.
5. **`<Quiz>` block** (optional) — include 2–3 questions if the topic has clear right/wrong facts to test.

## Content Quality Rules

- Keep examples minimal and realistic — no toy examples, no "foo/bar" unless teaching syntax
- Prefer code blocks with language annotations and descriptive comments
- Use `<Callout type="info">` for important context, `<Callout type="warning">` for gotchas
- Cross-reference shared concept lessons with a `<Callout>` pointing to them by name
- Do NOT add prose that's redundant with the KeyPoints — KeyPoints summarise, body teaches
- Target reading level: professional developer learning a new domain, not a student
- Always try to relate concepts and depth with AWS, Azure, and GCP relevant certification curriculum, but sometimes it would be necessary to explain general concepts more than those exams.

## After Creating the File

Report:
- The file path created
- The `order` value and how it fits relative to existing lessons in that sub-track (check the existing files in the directory)
- Whether any `sharedConcepts` slugs were referenced — remind the user to verify those slugs exist in `src/content/{track}/common/`
