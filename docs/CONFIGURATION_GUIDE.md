# Configuration Guide

This document explains the comprehensive linting and formatting setup for this TypeScript project.

## Overview

This project uses a professional-grade configuration inspired by production codebases, with strict rules to help you learn TypeScript best practices.

## Files Created

### .editorconfig

**Purpose:** Ensures consistent coding styles across different editors and IDEs.

**Key Settings:**

- **Character encoding:** UTF-8 for all files
- **Line endings:** CRLF (Windows standard)
- **Indentation:** Tabs with size 4 for TypeScript/JavaScript
- **Spaces for:** YAML, package.json (npm compatibility)
- **Max line length:** 160 characters (matching Prettier)

**Why it matters:** EditorConfig works across VS Code, IntelliJ, Vim, and more. Settings are applied automatically when you open files.

### eslint.config.mjs

**Purpose:** Comprehensive linting rules for code quality, bug prevention, and security.

**Architecture:** Uses ESLint 9+ flat config format with named configuration objects for better organization.

## ESLint Configuration Details

### 1. Global Ignores

Excludes directories that should never be linted:

- node_modules
- dist/build outputs
- coverage reports
- lock files
- .husky hooks

### 2. Base Configuration

**ESLint Recommended:** Core JavaScript rules that catch common bugs.

**TypeScript Strict:** Enforces strict type checking and stylistic TypeScript patterns.

### 3. JavaScript Configuration

**File patterns:** `**/*.js`, `**/*.mjs`, `**/*.cjs`

**Categories:**

**Bug Prevention (21 rules):**

- `no-debugger` - Never commit debugger statements
- `no-duplicate-imports` - Prevent duplicate imports
- `no-unreachable-loop` - Loops that only run once
- `array-callback-return` - Array methods must return
- `no-promise-executor-return` - Promise executor should not return
- And more...

**Best Practices (10 rules):**

- `eqeqeq` - Always use === and !== (never == or !=)
- `curly` - Always use curly braces
- `no-eval` - eval() is dangerous
- `no-lonely-if` - Use else if instead of else { if }
- And more...

**Modern JavaScript (8 rules):**

- `no-var` - Use let/const, never var
- `prefer-const` - Use const when variable isn't reassigned
- `prefer-arrow-callback` - Use arrow functions
- `prefer-template` - Use template literals
- `object-shorthand` - Use {a} instead of {a: a}
- And more...

**Security (4 rules):**

- `no-eval` - Prevent eval() usage
- `no-script-url` - No javascript: URLs
- `no-restricted-globals` - Block dangerous globals
- Recommend crypto APIs over Math.random()

**Code Quality (5 rules):**

- `no-empty` - No empty blocks
- `no-useless-call` - No unnecessary .call() or .apply()
- `yoda` - Prevent Yoda conditions (5 === x)
- And more...

**Console:**

- `no-console: warn` - Warns on console.log (allows console.warn/error)

### 4. TypeScript Configuration

**File patterns:** `**/*.ts`, `**/*.tsx`, `**/*.mts`, `**/*.cts`

**TypeScript-Specific Rules (17 rules):**

**Type Safety:**

- `no-explicit-any` - Never use any type
- `strict-boolean-expressions` - Strict boolean checks
- `no-non-null-assertion` - No ! operator
- `no-unnecessary-condition` - Remove always-true/false conditions
- `no-floating-promises` - Always handle promises
- `await-thenable` - Only await promises

**Code Quality:**

- `explicit-function-return-type` - All functions must declare return types
- `prefer-nullish-coalescing` - Use ?? instead of ||
- `prefer-optional-chain` - Use ?. for optional properties
- `prefer-readonly` - Use readonly when possible
- `prefer-as-const` - Use as const for literal types

**Import Management:**

- `consistent-type-imports` - Separate type imports
- `no-import-type-side-effects` - Prevent side-effect imports

**Naming Conventions (Enforces Java/C# style):**

- **Interfaces:** PascalCase (UserInterface, TodoItem)
- **Type Aliases:** PascalCase (UserType, TodoStatus)
- **Classes:** PascalCase (TodoService, UserController)
- **Enums:** PascalCase (Status, Priority)
- **Enum Members:** PascalCase or UPPER_CASE (Active, IN_PROGRESS)
- **Variables:** camelCase, UPPER_CASE (const), or PascalCase (components)
- **Functions:** camelCase or PascalCase (React components)
- **Parameters:** camelCase
- **Methods:** camelCase
- **Properties:** camelCase, PascalCase, or UPPER_CASE

### 5. React/JSX Configuration

**File patterns:** `**/*.tsx`, `**/*.jsx`

**Status:** Placeholder for React rules (add when you install React)

### 6. Test Files Configuration

**File patterns:**

- `**/*.test.ts`, `**/*.test.tsx`
- `**/*.spec.ts`, `**/*.spec.tsx`
- `**/__tests__/**/*.ts`

**Relaxed Rules:**

- Console allowed
- `any` type allowed
- Non-null assertions allowed
- No explicit return types required

**Rationale:** Tests need more flexibility for mocking and assertions.

### 7. Config Files Configuration

**File patterns:** `**/*.config.js`, `**/*.config.mjs`, `**/*.config.ts`

**Relaxed Rules:**

- Console allowed
- No explicit return types required

**Rationale:** Configuration files are often simple and don't need strict type annotations.

## Comparison with Previous Setup

### Previous eslint.config.mjs

```javascript
// Simpler configuration
export default tseslint.config(js.configs.recommended, ...tseslint.configs.strictTypeChecked);
```

### New eslint.config.mjs

```javascript
// Comprehensive configuration with:
// - Named configuration objects
// - 50+ additional rules
// - Security rules
// - Naming conventions
// - File-specific configurations
// - Detailed comments
```

**Key Additions:**

1. **Named configs** - Each configuration has a name for better error reporting
2. **Security rules** - Prevent eval(), unsafe random numbers, etc.
3. **Modern JavaScript** - Enforce ES6+ patterns
4. **Naming conventions** - Java/C#-style naming for TypeScript
5. **File-specific rules** - Different rules for tests, config files, etc.
6. **Better documentation** - Every rule has a comment explaining what it does

## Rule Severity Levels

- **error** - Prevents committing code (blocks pre-commit hook)
- **warn** - Shows warning but allows commit (good for learning)
- **off** - Rule is disabled

## How to Use

### During Development

Your IDE (VS Code) will show errors and warnings in real-time:

- Red squiggles = errors
- Yellow squiggles = warnings

### Before Committing

Pre-commit hook automatically runs:

1. Prettier formats your code
2. ESLint checks for errors
3. TypeScript checks types

If any errors exist, commit is blocked.

### Manual Commands

```bash
npm run lint           # Check all files
npm run lint:fix       # Auto-fix what can be fixed
npm run type-check     # TypeScript type checking only
npm run format         # Format all files with Prettier
```

## Common ESLint Errors and How to Fix

### 1. "no-console" - Unexpected console statement

**Problem:**

```typescript
console.log("Debug info");
```

**Fix:**

Use proper logging or return values:

```typescript
// For debugging during development
console.warn("Debug info"); // Allowed

// For production
return { debug: "Debug info" };
```

### 2. "no-explicit-any" - Unexpected any

**Problem:**

```typescript
function doSomething(data: any) {}
```

**Fix:**

Use specific types:

```typescript
function doSomething(data: string | number) {}
// Or
function doSomething(data: unknown) {
	if (typeof data === "string") {
		// handle string
	}
}
```

### 3. "explicit-function-return-type" - Missing return type

**Problem:**

```typescript
function add(a: number, b: number) {
	return a + b;
}
```

**Fix:**

Add return type:

```typescript
function add(a: number, b: number): number {
	return a + b;
}
```

### 4. "prefer-const" - Variable never reassigned

**Problem:**

```typescript
let name = "John";
console.log(name);
```

**Fix:**

```typescript
const name = "John";
console.log(name);
```

### 5. "no-var" - Unexpected var

**Problem:**

```typescript
var count = 0;
```

**Fix:**

```typescript
const count = 0;
// or
let count = 0;
```

### 6. "eqeqeq" - Expected ===

**Problem:**

```typescript
if (value == 5) {
}
```

**Fix:**

```typescript
if (value === 5) {
}
```

### 7. "naming-convention" - Invalid naming

**Problem:**

```typescript
interface user {
	name: string;
}
```

**Fix:**

```typescript
interface User {
	name: string;
}
```

## Disabling Rules (Use Sparingly)

### Disable for one line

```typescript
// eslint-disable-next-line no-console
console.log("One-time debug");
```

### Disable for entire file

```typescript
/* eslint-disable no-console */
// File code here
```

### Disable specific rule for block

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
function legacyFunction(data: any) {
	// Legacy code
}
/* eslint-enable @typescript-eslint/no-explicit-any */
```

**Warning:** Only disable rules when absolutely necessary. The strict rules are there to teach you good practices!

## VS Code Integration

### Recommended Extensions

1. **ESLint** (dbaeumer.vscode-eslint)
2. **Prettier** (esbenp.prettier-vscode)
3. **EditorConfig** (editorconfig.editorconfig)
4. **Error Lens** (usernamehw.errorlens) - Shows errors inline

### Workspace Settings

Create `.vscode/settings.json`:

```json
{
	"editor.formatOnSave": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit"
	},
	"eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
	"typescript.tsdk": "node_modules/typescript/lib"
}
```

## Why These Strict Rules?

### Learning Benefits

1. **Type Safety** - Strict rules force you to think about types
2. **Security** - Learn security best practices early
3. **Consistency** - Code looks the same everywhere
4. **Best Practices** - Industry-standard patterns
5. **Transferable Skills** - These rules match professional codebases

### Industry Standards

Companies like Google, Microsoft, Airbnb, and Netflix use similar strict ESLint configurations. Learning these now prepares you for professional development.

## Customizing Rules

### To Make Rules Less Strict

Edit `eslint.config.mjs` and change severity:

```javascript
rules: {
    "@typescript-eslint/explicit-function-return-type": "warn", // Changed from "error"
}
```

### To Add New Rules

```javascript
rules: {
    "new-rule-name": "error",
}
```

### To Disable a Rule

```javascript
rules: {
    "rule-to-disable": "off",
}
```

## Resources

- [ESLint Rules Reference](https://eslint.org/docs/latest/rules/)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [EditorConfig Specification](https://editorconfig.org/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## Summary

You now have a professional-grade linting setup that will:

1. Catch bugs before they happen
2. Enforce TypeScript best practices
3. Teach you security-conscious coding
4. Maintain consistent code style
5. Prepare you for production codebases

The strict rules might feel restrictive at first, but they're designed to teach you good habits that will make you a better developer!
