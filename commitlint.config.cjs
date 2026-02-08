/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		// Type enum - these are the allowed commit types
		"type-enum": [
			2,
			"always",
			[
				"feat", // New feature
				"fix", // Bug fix
				"docs", // Documentation changes
				"style", // Code style changes (formatting, semicolons, etc.)
				"refactor", // Code refactoring (neither fixes a bug nor adds a feature)
				"perf", // Performance improvements
				"test", // Adding or updating tests
				"build", // Build system or external dependencies
				"ci", // CI configuration changes
				"chore", // Other changes that don't modify src or test files
				"revert", // Revert a previous commit
			],
		],
		// Subject must not be empty
		"subject-empty": [2, "never"],
		// Subject must not end with period
		"subject-full-stop": [2, "never", "."],
		// Subject must be lowercase
		"subject-case": [2, "always", "lower-case"],
		// Header (type + subject) max length
		"header-max-length": [2, "always", 100],
	},
};
