# Agent Instructions for this Monorepo

Welcome! If you are an AI assistant (Antigravity, Cursor, GitHub Copilot, etc.) operating within this monorepo workspace, you MUST adhere to the following strict guidelines:

## 1. Token Usage & Efficiency
- **Be mindful of token consumption.** Do not rewrite or output entire files if you only need to make a small change. Use precision search tools and targeted replace commands.
- **Do not read massive directories or bundle files** blindly. Scope your filesystem searches and operations to specifically what is needed.

## 2. Git & Deployment Operations
- **DO NOT PUSH TO THE REPOSITORY DIRECTLY WITHOUT EXPLICIT APPROVAL.** 
- You may run `git add` and `git commit` to save checkpoints locally.
- However, you must **always ask the user for permission** before running `git push` or interacting with any remote deployment commands.
- Never set `SafeToAutoRun: true` on `git push` commands.

## 3. General Workflow
- Favor small, iterative changes.
- Always provide a quick summary before and after complex codebase refactors.
- Respect the existing aesthetic and architectural patterns of the active project (e.g., the Portfolio's organic storytelling aesthetic, Civic Navigator's structural patterns, etc.).
