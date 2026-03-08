# Cloud Common Lessons Standard

Common lessons are **foundation modules**. They must be in-depth enough that AWS/Azure track lessons can focus on platform implementation instead of re-explaining fundamentals.

## Required structure

1. **Problem framing** (why this matters)
2. **What you should master** (clear outcomes)
3. **Mental model** (how to reason, not just memorize)
4. **Core concepts** (provider-agnostic)
5. **Trade-offs / anti-patterns**
6. **Practical checklist** (production-ready baseline)
7. **Quiz + key points**

## Writing rules

- Prefer transferable concepts over provider-specific syntax
- Keep examples conceptual and cloud-neutral where possible
- Use AWS/Azure/GCP naming only in comparison tables
- Bias toward prevention + detection + response thinking
- Include failure modes and common mistakes explicitly

## Sequencing rule

`order` values should be unique within `src/content/cloud/common`.
