# Documentation

This directory contains all project documentation and guides.

## Available Guides

### [Git Workflow Guide](./GIT_WORKFLOW.md)

Learn how to use the automated Git workflow tools in this project:

- Husky (Git hooks)
- lint-staged (Auto-formatting on commit)
- Commitlint (Commit message validation)
- Commitizen (Interactive commit helper)

**Start here if:** You want to understand how commits work in this project.

### [Configuration Guide](./CONFIGURATION_GUIDE.md)

Comprehensive explanation of ESLint and EditorConfig setup:

- ESLint rules (50+ rules explained)
- TypeScript strict configuration
- Naming conventions
- Security rules
- Common errors and fixes

**Start here if:** You're getting linting errors and want to understand why.

### [Linters and Formatters Guide](./LINTERS_AND_FORMATTERS.md)

Overview of all available linters and formatters:

- Currently installed tools (Prettier, ESLint, Markdownlint)
- Tools for other languages (Python, Rust, Go, C#, etc.)
- Future additions (Stylelint, HTMLHint, etc.)
- IDE integration

**Start here if:** You want to add more linting tools or understand what's available.

## Quick Reference

### Common Commands

```bash
# Formatting
npm run format          # Format all files
npm run format:check    # Check formatting

# Linting
npm run lint            # Lint JavaScript/TypeScript
npm run lint:fix        # Auto-fix linting issues
npm run lint:md         # Lint markdown files
npm run lint:md:fix     # Auto-fix markdown issues

# Type Checking
npm run type-check      # TypeScript type checking

# Committing
npm run commit          # Interactive commit helper
git commit -m "type: message"  # Manual commit
```

### Need Help?

1. Check the relevant guide above
2. Run `npm run lint:fix` to auto-fix issues
3. Look at the error message - most include helpful hints
4. Use `// eslint-disable-next-line rule-name` to disable specific rules (sparingly!)

## Project Structure

```text
E:\WORK\FFB\Marin\
├── docs/                          # Documentation (you are here)
│   ├── README.md                  # This file
│   ├── GIT_WORKFLOW.md           # Git workflow guide
│   ├── CONFIGURATION_GUIDE.md    # ESLint & EditorConfig guide
│   └── LINTERS_AND_FORMATTERS.md # Linters overview
├── .husky/                        # Git hooks
│   ├── pre-commit                # Runs lint-staged
│   └── commit-msg                # Validates commit messages
├── .editorconfig                  # Editor configuration
├── .eslintrc.mjs                  # ESLint configuration
├── .gitignore                     # Git ignore patterns
├── .lintstagedrc.json            # Lint-staged configuration
├── .markdownlint.json            # Markdownlint configuration
├── .markdownlintignore           # Markdownlint ignore patterns
├── .prettierrc                    # Prettier configuration
├── .prettierignore               # Prettier ignore patterns
├── commitlint.config.js          # Commitlint configuration
├── package.json                   # Project dependencies & scripts
└── tsconfig.json                 # TypeScript configuration
```

## Contributing

When adding new documentation:

1. Create a new `.md` file in this `docs/` directory
2. Add a link to it in this README
3. Keep the root directory clean - no loose documentation files
