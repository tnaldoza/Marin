# Linters and Formatters Guide

This guide covers linters and formatters for different file types and how to integrate them into your workflow.

## What's the Difference?

**Formatters** - Focus on code style (spacing, indentation, line breaks)

- Prettier (JavaScript, TypeScript, JSON, Markdown, CSS, etc.)
- Black (Python)
- Rustfmt (Rust)

**Linters** - Focus on code quality and finding bugs

- ESLint (JavaScript/TypeScript)
- Markdownlint (Markdown)
- Stylelint (CSS/SCSS)
- Pylint (Python)

## Currently Installed in This Project

### 1. Prettier - Universal Code Formatter

**What it does:** Auto-formats code to a consistent style

**Supported files:** JavaScript, TypeScript, JSON, Markdown, CSS, YAML, HTML

**Config:** `.prettierrc`

**Commands:**

```bash
npm run format         # Format all files
npm run format:check   # Check if files are formatted
```

**Auto-runs:** On commit via lint-staged

### 2. ESLint - JavaScript/TypeScript Linter

**What it does:** Finds bugs and enforces code quality rules

**Supported files:** JavaScript, TypeScript, JSX, TSX

**Config:** `eslint.config.mjs`

**Commands:**

```bash
npm run lint       # Check for linting errors
npm run lint:fix   # Auto-fix linting errors
```

**Auto-runs:** On commit via lint-staged

### 3. TypeScript Compiler - Type Checker

**What it does:** Checks for type errors

**Supported files:** TypeScript files

**Config:** `tsconfig.json`

**Commands:**

```bash
npm run type-check   # Check for type errors
```

**Auto-runs:** On commit via lint-staged

### 4. Markdownlint - Markdown Linter

**What it does:** Enforces consistent markdown style and catches common mistakes

**Supported files:** Markdown (.md)

**Config:** `.markdownlint.json`

**Commands:**

```bash
npm run lint:md        # Check markdown files
npm run lint:md:fix    # Auto-fix markdown issues
```

**Auto-runs:** On commit via lint-staged

## Other Popular Linters and Formatters

### For CSS/SCSS

**Stylelint** - CSS/SCSS linter

```bash
npm install -D stylelint stylelint-config-standard
```

Create `.stylelintrc.json`:

```json
{
	"extends": "stylelint-config-standard"
}
```

Add to package.json scripts:

```json
{
	"scripts": {
		"lint:css": "stylelint \"**/*.{css,scss}\"",
		"lint:css:fix": "stylelint \"**/*.{css,scss}\" --fix"
	}
}
```

Add to `.lintstagedrc.json`:

```json
{
	"*.{css,scss}": ["prettier --write", "stylelint --fix"]
}
```

### For HTML

**HTMLHint** - HTML linter

```bash
npm install -D htmlhint
```

Create `.htmlhintrc`:

```json
{
	"tagname-lowercase": true,
	"attr-lowercase": true,
	"attr-value-double-quotes": true,
	"doctype-first": true,
	"tag-pair": true,
	"spec-char-escape": true,
	"id-unique": true,
	"src-not-empty": true,
	"attr-no-duplication": true
}
```

### For JSON

**JSONLint** - JSON validator (but Prettier handles JSON formatting)

JSON files are already formatted by Prettier in this project.

### For YAML

**yamllint** - YAML linter (Python-based)

YAML files are already formatted by Prettier in this project.

### For SQL

**SQLFluff** - SQL linter and formatter

```bash
pip install sqlfluff
```

Create `.sqlfluff`:

```ini
[sqlfluff]
dialect = postgres
```

### For Python

**Black** - Python formatter

```bash
pip install black
```

**Pylint** - Python linter

```bash
pip install pylint
```

**Flake8** - Python linter (alternative to Pylint)

```bash
pip install flake8
```

### For Rust

**Rustfmt** - Rust formatter (built into Rust)

```bash
cargo fmt
```

**Clippy** - Rust linter (built into Rust)

```bash
cargo clippy
```

### For Go

**gofmt** - Go formatter (built into Go)

```bash
go fmt ./...
```

**golangci-lint** - Go linter

```bash
golangci-lint run
```

### For Java

**Google Java Format** - Java formatter

**Checkstyle** - Java linter

**SpotBugs** - Java bug finder

### For C\#

**dotnet format** - C# formatter (built into .NET CLI)

```bash
dotnet format
```

**.editorconfig** - Cross-language style configuration

## Automated Workflow Tools

### Currently Installed

1. **Husky** - Git hooks manager
2. **lint-staged** - Run linters on staged files only
3. **Commitlint** - Commit message linter
4. **Commitizen** - Interactive commit helper

### Other Useful Tools

**1. EditorConfig** - Consistent editor settings across different editors

Create `.editorconfig`:

```ini
root = true

[*]
indent_style = tab
indent_size = 4
end_of_line = crlf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[*.{json,yml,yaml}]
indent_style = space
indent_size = 2
```

Most IDEs support EditorConfig natively.

**2. Renovate/Dependabot** - Automated dependency updates

GitHub Actions that create PRs to update dependencies.

**3. GitHub Actions / CI/CD** - Automated checks on push

Example `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push, pull_request]

jobs:
    lint:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
              with:
                  node-version: "18"
            - run: npm ci
            - run: npm run lint
            - run: npm run format:check
            - run: npm run type-check
```

**4. Pre-push hooks** - Run tests before pushing

Add `.husky/pre-push`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run tests before pushing
npm test
```

**5. Danger** - Code review automation

Automates common code review tasks in PRs.

## Recommended Setup for Different Project Types

### React/TypeScript Project (This Project)

- Prettier (formatting)
- ESLint (linting)
- TypeScript (type checking)
- Markdownlint (markdown)
- Husky + lint-staged (automation)
- Commitlint + Commitizen (commit messages)

### React/TypeScript + Styling

Add:

- Stylelint (CSS/SCSS linting)

### Full-Stack TypeScript (Node.js + React)

Same as above, plus:

- ESLint with Node.js rules
- Jest + Testing Library (testing)

### Python Project

- Black (formatting)
- Pylint or Flake8 (linting)
- MyPy (type checking)
- isort (import sorting)
- Pre-commit hooks

### Blazor/C# Project

- dotnet format (formatting)
- EditorConfig (style consistency)
- Roslyn analyzers (linting)
- Built-in .NET testing

## Integration with IDEs

### VS Code

Install these extensions:

1. **ESLint** - Microsoft
2. **Prettier - Code formatter** - Prettier
3. **markdownlint** - David Anson
4. **Error Lens** - Alexander
5. **EditorConfig for VS Code** - EditorConfig

Enable format on save in `.vscode/settings.json`:

```json
{
	"editor.formatOnSave": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
		"source.fixAll.markdownlint": true
	}
}
```

### JetBrains IDEs (IntelliJ, WebStorm, etc.)

- Prettier plugin (built-in in WebStorm)
- ESLint plugin (built-in)
- EditorConfig support (built-in)
- Enable "Run prettier on save"
- Enable "Run ESLint --fix on save"

### Vim/Neovim

- ALE (Asynchronous Lint Engine)
- CoC (Conquer of Completion) with extensions
- null-ls (for Neovim with LSP)

## Best Practices

1. **Format on save** - Configure your IDE to auto-format
2. **Use pre-commit hooks** - Catch issues before committing
3. **Run checks in CI** - Prevent bad code from being merged
4. **Keep configs in version control** - Share settings with team
5. **Document your setup** - Help new contributors onboard
6. **Update regularly** - Keep linters and formatters up to date
7. **Start strict** - Easier to relax rules than to tighten them

## Troubleshooting

### Prettier and ESLint conflict

Install `eslint-config-prettier` to disable ESLint rules that conflict with Prettier:

```bash
npm install -D eslint-config-prettier
```

This project already handles this in `eslint.config.mjs`.

### Linters too slow

- Use lint-staged to only lint changed files (already set up)
- Exclude node_modules and build outputs
- Consider using faster alternatives (e.g., Biome instead of ESLint + Prettier)

### Different developers have different settings

- Use EditorConfig to standardize editor settings
- Document the required IDE extensions
- Use Prettier to auto-format, so personal preferences don't matter

## Alternative All-in-One Tools

**Biome** - Fast all-in-one tool (replaces ESLint + Prettier)

```bash
npm install -D @biomejs/biome
```

Pros:

- Very fast (written in Rust)
- Single tool for linting and formatting
- TypeScript and JavaScript support

Cons:

- Newer, smaller ecosystem
- Less customizable than ESLint

**Rome** - Similar to Biome (project merged with Biome)

## Summary

For learning TypeScript and building foundations:

**Essential:**

- Prettier (formatting)
- ESLint (linting)
- TypeScript (type checking)
- Husky + lint-staged (automation)

**Highly Recommended:**

- Markdownlint (documentation quality)
- Commitlint + Commitizen (commit messages)
- EditorConfig (editor consistency)

**Optional but Useful:**

- Stylelint (if using CSS)
- GitHub Actions (CI/CD)
- Pre-push hooks (run tests)

Your current setup includes all the essentials and recommended tools. You're ready to build professional-quality TypeScript projects!
