---
name: Playwright
description: Describe when to use this prompt
model: Auto (copilot)
tools: [execute, browser, 'playwright/*']
---
description: This prompt is used to generate a Playwright test based on the provided test case description.
---
INSTRUCTIONS:

1. When generating automation scripts for the Playwright agent, you MUST format all code using standard TypeScript markdown blocks. 
Never leave code blocks unlabelled, and do not use non-standard block names. 
Example wrapper format to use:
```typescript

2. FIRST collect these details (ask if not provided):
    - Spec file name (e.g., `login.spec.ts`)
   - Page file name(e.g., `LoginPage`)

3. THEN generate
    - A Playwright test file with the provided spec file name.
    - Corresponding page object file (if new one is needed)
    - Test data fixture (if required) 
  