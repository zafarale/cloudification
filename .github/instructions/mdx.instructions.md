---
description: "Use when writing, editing, or reviewing MDX lesson content in Acert. Covers frontmatter schema, available components and their props, prose style, and content structure rules."
applyTo: "src/content/**/*.mdx"
---

# MDX Lesson Authoring

## Frontmatter Schema

All lessons share one schema. All fields except `title`, `description`, and `order` are optional.

```yaml
---
title: ""              # Full readable title
description: ""        # One sentence, specific — used in cards and SEO meta
order:                 # Integer — controls sidebar order and prev/next navigation
duration:              # Estimated study time in minutes
tags: []               # 3–6 lowercase kebab-case strings
icon: ""               # Iconify name: "logos:aws", "mdi:git", etc.
certifications: []     # Certification program names
sharedWith: []         # common/ files only — tracks that display this lesson e.g. ["aws", "azure"]
sharedConcepts: []     # Slugs of common/ files to show cross-reference banners e.g. ["iam-concepts"]
---
```

## Component Imports

Components are **always locally imported** — no auto-import. Path depth from `src/content/{track}/{sub-track}/` is always `../../../components/mdx/`.

```mdx
import Callout from '../../../components/mdx/Callout.astro';
import KeyPoints from '../../../components/mdx/KeyPoints.astro';
import Quiz from '../../../components/mdx/Quiz.astro';
import CodeTabs from '../../../components/mdx/CodeTabs.astro';
import List from '../../../components/mdx/List.astro';
import CodeComparison from '../../../components/mdx/CodeComparison.astro';
```

Only import what the lesson actually uses.

## Component Reference

### `<Callout>`
Props: `type` (`'info' | 'warning' | 'tip' | 'danger' | 'success'`, default `'info'`), `title` (optional string).

```mdx
<Callout type="warning" title="Watch Out">
  EBS volumes are AZ-locked — you can't attach a volume from us-east-1a to an instance in us-east-1b.
</Callout>
```

Use `info` for context, `warning` for gotchas/traps, `tip` for best practices, `danger` for things that can break production.

### `<KeyPoints>`
Props: `title` (optional, default `'Key Takeaways'`). Children must be a markdown list (`-`).

```mdx
<KeyPoints>
- How instance type families map to workload categories
- The three pricing models and when each is cost-optimal
- How to attach an EBS volume and why it's AZ-locked
</KeyPoints>
```

Always place immediately after the opening paragraph, before the first `---` section separator.

### `<Quiz>`
Props: `question` (string), `options` (array of `{ label: string, correct?: boolean }`), `explanation` (optional string).

```mdx
<Quiz
  question="Which EC2 pricing model offers the largest discount for interruptible workloads?"
  options={[
    { label: "On-Demand" },
    { label: "Reserved Instances" },
    { label: "Spot Instances", correct: true },
    { label: "Savings Plans" },
  ]}
  explanation="Spot Instances use spare EC2 capacity and can be up to 90% cheaper than On-Demand, but can be interrupted with 2 minutes' notice."
/>
```

### `<CodeTabs>`
Props: `tabs` — array of `{ label: string, code: string, lang?: string, icon?: string, emoji?: string }`.

Auto-icons exist for: `macOS`, `Linux`, `Windows`, `Ubuntu`, `npm`, `yarn`, `bun`, `pnpm`, `Docker`, `AWS CLI`, `Azure CLI`, `PowerShell`, `Bash`, `Git`.

```mdx
<CodeTabs tabs={[
  { label: "AWS CLI", lang: "bash", code: `aws s3 cp file.txt s3://my-bucket/` },
  { label: "Terraform", emoji: "🏗️", lang: "hcl", code: `resource "aws_s3_bucket" "example" {\n  bucket = "my-bucket"\n}` },
]} />
```

### `<CodeComparison>`
Props: `leftLabel`, `rightLabel`, `leftColor`, `rightColor`. Uses named slots.

```mdx
<CodeComparison leftLabel="Before" rightLabel="After" leftColor="red" rightColor="green">
  <Fragment slot="left">
  ```python
  # old approach
  ```
  </Fragment>
  <Fragment slot="right">
  ```python
  # new approach
  ```
  </Fragment>
</CodeComparison>
```

### `<List>`
A styled list component. Children are markdown list items.

## Lesson Structure

1. **Opening paragraph** — 2–3 sentences: what the lesson is and why it matters. No heading, no frontmatter repetition.
2. **`<KeyPoints>`** — 4–6 action-phrased bullet points summarising concrete skills gained.
3. **`---`** separator
4. **`##` sections** — each covers one concept, progressively deeper. Use `###` for sub-sections.
5. **`<Quiz>`** at the end — optional, 1–3 questions for factual topics.


## Prose Style

- Target audience: professional developer learning a new domain
- Prefer concrete examples over abstract definitions — show the thing, then name it
- Always promote general concpets to shared lessons in `common/` and reference via `sharedConcepts` — avoid track-specific content that could be shared
- sharedConcepts should be referenced/linked back in detailed track-specific lessons with a Callout banner: "This concept is explained in more detail in [IAM Concepts](/cloud/common/iam-concepts) — check it out if you're new to IAM or want a refresher."
- sharedConcepts and links could exists across tracks — e.g. a common networking concept could be shared between cloud and networking tracks, so the banner would say "This concept is explained in more detail in [TCP/IP Basics](/networking/common/tcp-ip-basics)..." and the sharedConcepts slug would be "tcp-ip-basics" in both tracks' common folders 
- Keep examples realistic: real service names, real config keys, not "foo/bar"
- Use mermaid diagrams for relationships, flows, and hierarchies or explaining ideas, concepts, class hierarchies — not prose lists
- When exaplingin something which has multiple versions (e.g. AWS CLI v1 vs v2), use a CodeComparison component, not a prose list of differences or a table — the visual side-by-side is easier to scan and understand.
- in Programming tutorials when explainign something which has an "old way" and a "new way" (e.g. Java 7 vs Java 8, or Python 2 vs Python 3), use a CodeComparison to show the two approaches side by side, rather than a prose list of differences or a table — the visual comparison is easier to scan and understand. Java Collection Hierrachies highlight the differences between List, Set, and Map interfaces, and the various implementations of each (ArrayList vs LinkedList, HashSet vs TreeSet vs NavigableSet, HashMap vs TreeMap) — may be using codetabs with version titles.
- Do NOT repeat what `<KeyPoints>` says — KeyPoints summarise; body teaches
- Use `**bold**` for key terms on first use, not for emphasis
- Avoid "we will", "let's", "you should" — prefer direct statements: "EC2 stores..." not "Let's look at how EC2 stores..."
- Keep sections focused — if a section needs more than 3 sub-headings, split it into two `##` sections

## Pitfalls

- **Import path depth** — always `../../../` from track sub-track files. Never use aliases.
- **`not-prose` is built into components** — do not add `class="not-prose"` to the component tags themselves; it's already in their templates.
- **`sharedConcepts` slugs must exist** — the banner silently disappears if the slug doesn't match a file in `{track}/common/`. Verify the slug against actual filenames.
- **`sharedWith` only belongs on `common/` files** — don't add it to track-specific lessons.
