# Git Workflow Guide

This project uses automated tools to maintain code quality and consistent commit messages. This guide explains how everything works and how to use it.

## Tools Overview

### 1. Husky - Git Hooks Manager

Automatically runs scripts at specific Git events (before commit, before push, etc.)

### 2. lint-staged - Stage File Linter

Only lints and formats files you're about to commit (much faster!)

### 3. Commitlint - Commit Message Validator

Enforces [Conventional Commits](https://www.conventionalcommits.org/) format

### 4. Commitizen - Interactive Commit Helper

Guides you through writing proper commit messages

---

## How It Works

**When you run `git commit`**

1. **Pre-commit Hook** (`.husky/pre-commit`)
    - Runs `lint-staged` on your staged files
    - Automatically formats code with Prettier
    - Runs ESLint and fixes auto-fixable issues
    - Runs TypeScript type checking
    - **Commit is blocked** if any checks fail

2. **Commit-msg Hook** (`.husky/commit-msg`)
    - Validates your commit message format
    - **Commit is blocked** if format is invalid

---

## Conventional Commit Format

Every commit message must follow this format:

```text
<type>: <subject>

[optional body]

[optional footer]
```

### Valid Types:

| Type       | Description                         | Example                              |
| ---------- | ----------------------------------- | ------------------------------------ |
| `feat`     | New feature                         | `feat: add user login`               |
| `fix`      | Bug fix                             | `fix: resolve null pointer error`    |
| `docs`     | Documentation only                  | `docs: update README`                |
| `style`    | Code style (formatting, semicolons) | `style: fix indentation`             |
| `refactor` | Code refactoring                    | `refactor: extract validation logic` |
| `perf`     | Performance improvement             | `perf: optimize query performance`   |
| `test`     | Add/update tests                    | `test: add unit tests for auth`      |
| `build`    | Build system/dependencies           | `build: upgrade react to v18`        |
| `ci`       | CI configuration                    | `ci: add GitHub Actions workflow`    |
| `chore`    | Other changes                       | `chore: update .gitignore`           |
| `revert`   | Revert previous commit              | `revert: undo feature X`             |

### Rules:

- Type must be lowercase
- Subject must be lowercase
- Subject cannot end with a period
- Subject should be concise (< 100 characters)

### Good Examples:

```bash
feat: add user authentication
fix: resolve login validation bug
docs: update installation instructions
refactor: extract email validation to helper
```

### Bad Examples:

```bash
"Added stuff"              # No type, subject not lowercase
"Feat: Add feature"        # Subject not lowercase
"fix: Fixed the bug."      # Subject ends with period
"update"                   # No type
```

---

## How to Commit (Two Methods)

### Method 1: Interactive Commitizen (Recommended for Learning)

Use the interactive helper that guides you through the process:

```bash
# Stage your files
git add .

# Use commitizen
npm run commit
```

You'll be prompted with questions:

1. Select the type of change
2. Write a short description
3. Add a longer description (optional)
4. List breaking changes (optional)
5. Reference issues (optional)

**Pros:**

- Can't make format mistakes
- Learns you the conventional commit types
- Great for beginners

### Method 2: Manual Commit (Faster when you know the format)

```bash
# Stage your files
git add .

# Commit manually
git commit -m "feat: add todo list component"
```

**Pros:**

- Faster once you know the format
- More control

**Cons:**

- You must follow the format exactly
- Commitlint will block invalid messages

---

## What Happens Automatically

### On `git commit`:

- Prettier formats your code
- ESLint fixes auto-fixable issues
- TypeScript checks for type errors
- Commit message is validated

### Manual Commands (if needed):

```bash
# Format all files
npm run format

# Check formatting without changing files
npm run format:check

# Lint all files
npm run lint

# Lint and auto-fix
npm run lint:fix

# TypeScript type check
npm run type-check
```

---

## Typical Workflow Example

```bash
# 1. Make your changes
# ... edit files ...

# 2. Stage files
git add src/components/TodoList.tsx

# 3. Commit with commitizen (recommended for learning)
npm run commit

# Or commit manually
git commit -m "feat: add todo list component"

# 4. Push
git push
```

---

## Troubleshooting

### Commit is blocked by pre-commit hook

**Problem:** Prettier, ESLint, or TypeScript found issues

**Solution:**

1. Check the error messages in the terminal
2. Fix the issues manually, or run:

    ```bash
    npm run lint:fix
    npm run format
    ```

3. Re-stage the files: `git add .`
4. Try committing again

### Commit is blocked by commit-msg hook

**Problem:** Your commit message doesn't follow the conventional format

**Solution:**

- Use `npm run commit` to avoid format mistakes
- Or check your message follows the format: `type: subject`
- Valid types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

### Want to skip hooks (NOT RECOMMENDED)

```bash
# Skip all hooks (use only in emergencies)
git commit --no-verify -m "emergency fix"
```

**Warning:** Only use `--no-verify` when absolutely necessary (CI/CD issues, emergency hotfixes, etc.)

---

## Best Practices

1. **Commit often, commit small**
    - Small, focused commits are easier to review and revert

2. **Write meaningful commit messages**
    - Good: `feat: add user authentication with JWT`
    - Bad: `fix: fixed stuff`

3. **Use the right type**
    - `feat` for new features
    - `fix` for bug fixes
    - `refactor` when improving code without changing functionality

4. **Stage related changes together**
    - Group related changes in one commit
    - Use `git add <specific-file>` instead of `git add .` when needed

5. **Use the body for complex changes**

    ```bash
    git commit -m "feat: add user authentication" -m "Implemented JWT-based auth with refresh tokens. Added middleware for protected routes."
    ```

---

## Reusing This Setup in Other Projects

To reuse this exact setup in a new project:

1. **Copy these files to your new project:**

    ```text
    .husky/
    .lintstagedrc.json
    commitlint.config.js
    .prettierrc
    .prettierignore
    eslint.config.mjs
    ```

2. **Install dependencies:**

    ```bash
    npm install -D husky lint-staged @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog prettier eslint @eslint/js typescript-eslint
    ```

3. **Add to package.json:**

    ```json
    {
    	"scripts": {
    		"commit": "cz",
    		"prepare": "husky"
    	},
    	"config": {
    		"commitizen": {
    			"path": "cz-conventional-changelog"
    		}
    	}
    }
    ```

4. **Initialize Husky:**

    ```bash
    npx husky init
    ```

5. **Done!** Your new project now has the same workflow.

---

## Learn More

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Commitlint](https://commitlint.js.org/)

---

## Why This Setup Matters

This setup teaches you professional development practices:

1. **Code Quality** - Automatic formatting and linting prevents bugs
2. **Consistency** - Everyone on the team writes code the same way
3. **Git History** - Clear commit messages make it easy to understand changes
4. **Automation** - Less manual work, fewer mistakes
5. **Industry Standard** - Used by companies like Google, Microsoft, Netflix

These tools are used in professional environments. Learning them now will make you a better developer!
