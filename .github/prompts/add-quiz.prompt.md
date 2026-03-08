---
description: "Add or improve a Quiz block on an existing MDX lesson — generates well-structured Quiz components with good distractors and explanations"
argument-hint: "[number of questions]"
agent: agent
---

Add a `<Quiz>` component block to the currently open MDX lesson file.

## Context

Read the currently open file to understand:
- The topic and key concepts covered
- Whether a `<Quiz>` already exists (if so, improve or extend it)
- Whether `Quiz` is already imported at the top of the file

## Number of Questions

The user may specify a number of questions as an argument. Default to **2–3 questions** if not specified. Maximum 5 questions per lesson.

## Quiz Component API

```mdx
<Quiz
  question="..."
  options={[
    { label: "..." },
    { label: "...", correct: true },
    { label: "..." },
    { label: "..." },
  ]}
  explanation="..."
/>
```

Rules:
- Exactly **one** option must have `correct: true`
- Always include **3 or 4 options** (not 2, not 5)
- Always include an `explanation` — this is what makes the quiz educational
- Each `<Quiz>` is a separate component call, one per question

## Import

If `Quiz` is not already imported, add it to the imports block at the top of the file:
```mdx
import Quiz from '../../../components/mdx/Quiz.astro';
```

Match the relative path depth of the other imports already in the file.

## Question Quality Rules

Write questions that test **understanding**, not memorisation:
- Prefer "Which of the following is the best approach for X?" over "What does acronym Y stand for?"
- Distractors (wrong answers) must be **plausible** — a learner who half-understood the concept might choose them
- Do NOT make wrong answers obviously wrong (e.g. irrelevant services, made-up names)
- Explanations should clarify **why the correct answer is right** AND **why the most tempting distractor is wrong**

**Good question patterns:**
- "A developer needs to [scenario]. Which approach is most appropriate?"
- "Which [service/feature] is best suited for [workload characteristic]?"
- "What happens when [condition]?"
- "Which statement about [concept] is correct?"

**Avoid:**
- True/false framed as multiple choice ("Which of these is NOT...")
- Questions answered directly by a heading in the lesson (too easy)
- Questions requiring knowledge from outside this lesson

## Placement

Place all `<Quiz>` blocks at the **end of the file**, after all prose sections. If there are multiple questions, place them one after another — no headings between them.

## Output

Make the minimal necessary edits to the file:
1. Add Quiz import if missing
2. Append the Quiz blocks at the end of the file

Report which questions were added and confirm the import was updated if needed.
