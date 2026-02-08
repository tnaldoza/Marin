// ESLint Flat Config (ESLint 9+)
// This replaces the deprecated .eslintrc format
// Documentation: https://eslint.org/docs/latest/use/configure/configuration-files

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
	// Global ignores - these paths will not be linted at all
	{
		name: "global-ignores",
		ignores: [
			"**/node_modules/**",
			"**/dist/**",
			"**/build/**",
			"**/.git/**",
			"**/coverage/**",
			"**/*.min.js",
			"**/package-lock.json",
			"**/pnpm-lock.yaml",
			"**/yarn.lock",
			"**/.husky/**",
		],
	},

	// Base recommended rules from ESLint
	{
		name: "eslint-recommended",
		...js.configs.recommended,
	},

	// TypeScript recommended rules (strict)
	{
		name: "typescript-strict",
		files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
		extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	// Configuration for all JavaScript files
	{
		name: "javascript-config",
		files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.node,
				...globals.browser,
				...globals.es2021,
			},
			parserOptions: {
				ecmaFeatures: {
					impliedStrict: true,
				},
			},
		},
		rules: {
			// Bug Prevention - These catch potential bugs and logic errors
			"no-debugger": "error", // Never commit debugger statements
			"no-duplicate-imports": "error", // Prevent duplicate imports
			"no-self-compare": "error", // x === x is always true
			"no-template-curly-in-string": "warn", // Catch ${} in regular strings
			"no-unreachable-loop": "error", // Loops that only run once
			"no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_", // Allow unused vars prefixed with _
					varsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"require-atomic-updates": "error", // Race condition in async code
			"array-callback-return": "error", // Array methods must return
			"no-constructor-return": "error", // Constructor should not return
			"no-promise-executor-return": "error", // Promise executor should not return
			"no-unreachable": "error", // Code after return/throw/break/continue
			"no-unsafe-optional-chaining": "error", // Unsafe optional chaining usage

			// Best Practices - These promote better coding patterns
			eqeqeq: ["error", "always"], // Require === and !== (not == or !=)
			"no-eval": "error", // eval() is dangerous
			"no-implied-eval": "error", // setTimeout with string is eval
			"no-new-func": "error", // new Function() is eval-like
			"no-throw-literal": "error", // throw new Error(), not strings
			"prefer-promise-reject-errors": "error", // Reject with Error objects
			"no-return-await": "error", // Redundant return await
			"require-await": "warn", // Async function should have await
			curly: ["error", "all"], // Always use curly braces
			"default-case-last": "error", // Default case should be last
			"no-else-return": "warn", // Unnecessary else after return
			"no-lonely-if": "warn", // else { if } should be else if
			"no-useless-return": "warn", // Return with no value at end of function

			// Modern JavaScript - Enforce ES6+ patterns
			"no-var": "error", // Use let/const, never var
			"prefer-const": "warn", // Use const when variable isn't reassigned
			"prefer-arrow-callback": "warn", // Use arrow functions for callbacks
			"prefer-template": "warn", // Use `${x}` not "string" + x
			"object-shorthand": ["warn", "always"], // {a: a} should be {a}
			"prefer-destructuring": [
				"warn",
				{
					array: false,
					object: true,
				},
			],
			"prefer-rest-params": "error", // Use ...args instead of arguments
			"prefer-spread": "error", // Use ...array instead of .apply()
			"no-useless-concat": "warn", // "a" + "b" should be "ab"

			// Security - Prevent security vulnerabilities
			"no-new-wrappers": "error", // Don't use new String(), new Number(), etc.
			"no-script-url": "error", // No javascript: URLs
			"no-sequences": "error", // Prevent comma operator misuse
			"no-restricted-globals": [
				"error",
				{
					name: "eval",
					message: "eval() is forbidden for security reasons",
				},
			],
			"no-restricted-properties": [
				"error",
				{
					object: "Math",
					property: "random",
					message: "Use crypto.randomBytes() or crypto.getRandomValues() for cryptographically secure random numbers",
				},
			],

			// Code Quality - Maintain consistent code quality
			"no-empty": ["error", { allowEmptyCatch: true }], // No empty blocks (except catch)
			"no-extra-bind": "error", // Unnecessary .bind()
			"no-useless-call": "error", // Unnecessary .call() or .apply()
			"no-useless-computed-key": "error", // {["a"]: 1} should be {a: 1}
			"no-useless-rename": "error", // {a: a} should be {a}
			yoda: ["warn", "never"], // if (x === 5) not if (5 === x)

			// Console - Allow console in development (warn instead of error)
			"no-console": ["warn", { allow: ["warn", "error"] }], // Warn on console.log
		},
	},

	// Configuration for TypeScript files
	{
		name: "typescript-config",
		files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
		rules: {
			// TypeScript-specific strict rules
			"@typescript-eslint/explicit-function-return-type": [
				"error",
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true,
				},
			],
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/strict-boolean-expressions": "error",
			"@typescript-eslint/no-non-null-assertion": "error",
			"@typescript-eslint/prefer-nullish-coalescing": "error",
			"@typescript-eslint/prefer-optional-chain": "error",
			"@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-unnecessary-type-assertion": "error",
			"@typescript-eslint/prefer-readonly": "warn",
			"@typescript-eslint/prefer-as-const": "error",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/await-thenable": "error",
			"@typescript-eslint/no-misused-promises": "error",
			"@typescript-eslint/promise-function-async": "warn",

			// Naming conventions (similar to Java/C# style)
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "interface",
					format: ["PascalCase"],
				},
				{
					selector: "typeAlias",
					format: ["PascalCase"],
				},
				{
					selector: "class",
					format: ["PascalCase"],
				},
				{
					selector: "enum",
					format: ["PascalCase"],
				},
				{
					selector: "enumMember",
					format: ["PascalCase", "UPPER_CASE"],
				},
				{
					selector: "variable",
					format: ["camelCase", "UPPER_CASE", "PascalCase"],
					leadingUnderscore: "allow",
				},
				{
					selector: "function",
					format: ["camelCase", "PascalCase"],
				},
				{
					selector: "parameter",
					format: ["camelCase"],
					leadingUnderscore: "allow",
				},
				{
					selector: "method",
					format: ["camelCase"],
				},
				{
					selector: "property",
					format: ["camelCase", "PascalCase", "UPPER_CASE"],
					leadingUnderscore: "allow",
				},
			],

			// Code quality for TypeScript
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{
					prefer: "type-imports",
					fixStyle: "separate-type-imports",
				},
			],
			"@typescript-eslint/consistent-type-exports": "warn",
			"@typescript-eslint/no-import-type-side-effects": "error",

			// Disable base rules that are handled by TypeScript
			"no-unused-vars": "off",
			"no-undef": "off",
			"no-redeclare": "off",
		},
	},

	// Configuration for React/JSX files
	{
		name: "react-config",
		files: ["**/*.tsx", "**/*.jsx"],
		plugins: {
			react,
			"react-hooks": reactHooks,
			"jsx-a11y": jsxA11y,
		},
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			// React recommended rules
			...react.configs.recommended.rules,
			...react.configs["jsx-runtime"].rules,
			...reactHooks.configs.recommended.rules,

			// React-specific rules
			"react/react-in-jsx-scope": "off", // Not needed with React 17+
			"react/prop-types": "off", // Use TypeScript for prop validation
			"react/jsx-uses-react": "off", // Not needed with React 17+
			"react/jsx-uses-vars": "error",
			"react/jsx-key": "error",
			"react/jsx-no-duplicate-props": "error",
			"react/jsx-no-undef": "error",
			"react/no-children-prop": "error",
			"react/no-danger-with-children": "error",
			"react/no-deprecated": "error",
			"react/no-direct-mutation-state": "error",
			"react/no-unescaped-entities": "warn",
			"react/self-closing-comp": "warn",

			// React Hooks rules
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",

			// Accessibility rules
			"jsx-a11y/alt-text": "warn",
			"jsx-a11y/anchor-has-content": "warn",
			"jsx-a11y/anchor-is-valid": "warn",
			"jsx-a11y/aria-props": "warn",
			"jsx-a11y/aria-role": "warn",
			"jsx-a11y/click-events-have-key-events": "warn",
			"jsx-a11y/heading-has-content": "warn",
			"jsx-a11y/img-redundant-alt": "warn",
			"jsx-a11y/no-static-element-interactions": "warn",
		},
	},

	// Configuration for test files (when you add testing)
	{
		name: "test-files",
		files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx", "**/__tests__/**/*.ts", "**/__tests__/**/*.tsx"],
		languageOptions: {
			globals: {
				...globals.jest,
				...globals.node,
			},
		},
		rules: {
			// Relax rules for test files
			"no-console": "off", // Allow console in tests
			"@typescript-eslint/no-explicit-any": "off", // Allow any in tests
			"@typescript-eslint/no-non-null-assertion": "off", // Allow ! in tests
			"@typescript-eslint/explicit-function-return-type": "off", // No need for explicit returns in tests
		},
	},

	// Configuration for config files
	{
		name: "config-files",
		files: ["**/*.config.js", "**/*.config.mjs", "**/*.config.ts"],
		rules: {
			"no-console": "off", // Allow console in config files
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
);
