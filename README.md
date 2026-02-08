# Marin Todo App

A modern, full-featured todo application built as a hands-on learning project to master React, TypeScript, and modern web development practices.

## Project Goals

This project was created to learn and demonstrate:

- **React Fundamentals** - Components, hooks (useState), state management, controlled components
- **TypeScript** - Interfaces, types, strict mode, optional properties, type safety
- **Modern JavaScript** - ES6+ features, array methods, destructuring, spread operators
- **Temporal API** - Modern date/time handling (replacing legacy Date objects)
- **CSS Skills** - Flexbox, Grid, glass morphism design, responsive layouts
- **Code Quality** - ESLint, Prettier, conventional commits, git hooks
- **Best Practices** - Immutable state updates, derived state, type-safe code

## Features

### Core Functionality

- **Create Todos** - Add tasks with title, notes, priority (1-5), and due dates
- **Mark Complete** - Toggle completion status with custom checkboxes
- **Delete Todos** - Remove individual todos or bulk delete completed ones
- **Smart Sorting** - Sort by date added, due date, priority, or title
- **Tabs Navigation** - Switch between active todos and full history
- **History Tracking** - Soft delete architecture keeps full audit trail

### Design Features

- **Glass Morphism** - Frosted glass effect with backdrop blur
- **Dark Theme** - Beautiful purple gradient with smooth animations
- **Priority Stars** - Visual 1-5 star rating system with glow effects
- **Responsive Design** - Mobile-friendly layout
- **Custom Form Elements** - Styled checkboxes and inputs matching the theme

## Tech Stack

### Core Technologies

- **React 19.2.4** - Component-based UI library
- **TypeScript 5.9.3** - Type-safe JavaScript with strict mode enabled
- **Vite 7.3.1** - Fast build tool and dev server
- **Temporal Polyfill 0.5.1** - Modern date/time API

### Development Tools

- **ESLint** - Linting and code quality rules
- **Prettier** - Automatic code formatting
- **Husky** - Git hooks automation (pre-commit, commit-msg)
- **Lint-staged** - Run linters on staged files only
- **Commitlint** - Enforce conventional commit messages
- **Commitizen** - Interactive commit message prompts

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git** for version control

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/tnaldoza/Marin.git
    cd Marin
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

    This automatically runs `npm run prepare` which installs git hooks via Husky.

3. **Start the development server**:

    ```bash
    npm run dev
    ```

4. **Open your browser** to `http://localhost:5173`

## Available Scripts

### Development

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start Vite development server with HMR |
| `npm run build`   | Build optimized production bundle      |
| `npm run preview` | Preview production build locally       |

### Code Quality

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `npm run lint`       | Run ESLint to check for errors        |
| `npm run lint:fix`   | Auto-fix ESLint errors where possible |
| `npm run format`     | Format all files with Prettier        |
| `npm run type-check` | Run TypeScript compiler type checking |

### Git Workflow

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run commit`  | Interactive commit with Commitizen        |
| `npm run prepare` | Install Husky git hooks (auto on install) |

## Development Workflow

### Making Changes

1. **Create a branch** (optional but recommended):

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make your changes** - Edit code, save files
    - VS Code will auto-format on save (Prettier)
    - ESLint will show errors inline (if Error Lens extension installed)

3. **Check your work**:

    ```bash
    npm run lint        # Check for errors
    npm run type-check  # Verify TypeScript types
    npm run dev         # Test in browser
    ```

### Committing Changes

#### **Option 1: Using Commitizen (Recommended for learning)**

```bash
git add .
npm run commit
```

This opens an interactive prompt that guides you through creating a properly formatted commit:

1. **Select type**: feat, fix, docs, style, refactor, test, chore
2. **Enter scope** (optional): component or file affected
3. **Write description**: Brief summary of changes
4. **Write longer description** (optional): More details
5. **Confirm**: Review and submit

#### **Option 2: Manual commit**

```bash
git add .
git commit -m "feat: add new sorting feature"
```

**Commit Message Format**:

```txt
type(scope?): description

[optional body]
```

**Valid types**:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style/formatting (no logic changes)
- `refactor` - Code restructuring (no behavior changes)
- `test` - Adding or updating tests
- `chore` - Tooling, dependencies, configs

**Examples**:

```bash
feat: add bulk delete completed todos
fix: resolve undefined date sorting bug
docs: update README with installation steps
style: format code with prettier
refactor: extract sorting logic to separate function
```

### What Happens When You Commit

**Pre-commit Hook** (automatic):

1. Husky runs `lint-staged`
2. Prettier formats your staged files
3. ESLint checks for errors
4. If errors found, commit is blocked
5. Fix errors and try again

**Commit-msg Hook** (automatic):

1. Husky runs `commitlint`
2. Validates your commit message format
3. If invalid format, commit is blocked with explanation
4. Fix message and try again

### Pushing Changes

```bash
git push origin your-branch-name
```

Or if on main/master:

```bash
git push origin master
```

## Project Structure

```txt
Marin/
├── .husky/                   # Git hooks
│   ├── pre-commit            # Runs lint-staged before commits
│   └── commit-msg            # Validates commit message format
├── .vscode/                  # VS Code workspace settings
│   ├── settings.json         # Auto-format, linting, theme
│   ├── extensions.json       # Recommended extensions
│   ├── tasks.json            # Custom tasks
│   └── launch.json           # Debug configurations
├── src/
│   ├── types/                # TypeScript type definitions
│   │   ├── todo.ts           # Todo, TodoFormData, Priority types
│   │   ├── sortOptions.ts    # SortOption type
│   │   ├── viewTab.ts        # ViewTab type
│   │   └── index.ts          # Re-exports with .js extensions
│   ├── App.tsx               # Main application component
│   ├── App.css               # Styles with glass morphism
│   ├── main.tsx              # React entry point
│   └── vite-env.d.ts         # Vite type declarations
├── index.html                # HTML template
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript compiler options
├── eslint.config.mjs         # ESLint rules and plugins
├── commitlint.config.cjs     # Commit message rules
├── .prettierrc               # Prettier formatting rules
├── .gitignore                # Files to exclude from git
└── package.json              # Dependencies and scripts
```

## Key Learning Concepts

### React Patterns Used

**Controlled Components**:

Forms where React state is the "single source of truth" - all input values are controlled by state.

**Immutable State Updates**:

Using spread operator and array methods (map, filter) instead of mutating state directly.

**Derived State**:

Computing sorted/filtered lists on render instead of storing multiple state arrays.

**Conditional Rendering**:

Using `&&` operator and ternary expressions to show/hide UI elements.

### TypeScript Features

**Interfaces**:

Define the shape of data objects (Todo, TodoFormData).

**Type Unions**:

`Priority = 1 | 2 | 3 | 4 | 5` restricts to specific values.

**Optional Properties**:

`notes?: string` means the field can be omitted entirely.

**Strict Mode**:

`exactOptionalPropertyTypes` requires omitting optional fields, not setting to undefined.

### CSS Techniques

**Glass Morphism**:

```css
background: rgba(45, 27, 78, 0.4);
backdrop-filter: blur(10px);
```

**Custom Checkboxes**:

Using `appearance: none` and `::after` pseudo-element.

**Flexbox Layouts**:

For form rows, card layouts, and responsive design.

**CSS Variables**:

Could be added for theme colors (future enhancement).

## Design Philosophy

### Glass Morphism Style

The app features a modern glass morphism design:

- **Semi-transparent backgrounds** using `rgba()` with alpha transparency
- **Backdrop blur effects** using `backdrop-filter: blur(10px)`
- **Layered shadows** for depth perception
- **Smooth transitions** on hover and interaction states

### Color Palette

- **Primary Purple**: #7c3aed, #a855f7
- **Dark Background**: #1a0d2e to #0d0618 gradient
- **Accent Colors**:
    - Success (green): #86efac
    - Danger (red): #fca5a5
    - Text (light purple): #e9dW5ff

## Usage Guide

### Creating a Todo

1. **Title** (required) - What needs to be done
2. **Notes** (optional) - Additional details or description
3. **Priority** (1-5) - Select importance level (5 stars = highest)
4. **Due Date** (optional) - When it should be completed
5. Click **Add Todo**

### Managing Todos

**Mark as Complete**:

- Click the checkbox next to a todo
- Completed todos show with strikethrough text
- Click again to mark as incomplete

**Delete a Todo**:

- Click the delete button on any todo card
- Confirmation dialog prevents accidental deletion
- Deleted todos move to History tab

**Bulk Delete Completed**:

- Click "Clear Completed" button in toolbar
- Confirms number of todos to be deleted
- Only deletes completed, non-deleted todos

**Sort Todos**:

- Use dropdown menu to sort by:
    - **Date Added** - Newest first
    - **Due Date** - Soonest first (undated items last)
    - **Priority** - Highest (5 stars) first
    - **Title** - Alphabetical A-Z

**View History**:

- Switch to "History" tab
- See all todos including deleted ones
- Deleted items show completion and deletion timestamps
- Cannot modify items in history view

## Future Enhancements

### Planned Features

- **Local Storage** - Persist todos between browser sessions
- **Drag and Drop** - Reorder todos manually
- **Categories/Tags** - Organize todos by project or context
- **Search** - Find todos by title or notes
- **Filters** - Show only high priority, overdue, etc.
- **Notifications** - Browser notifications for due dates
- **Theme Toggle** - Switch between dark/light modes
- **Export/Import** - Save/load todos as JSON or CSV
- **Keyboard Shortcuts** - Quick actions without mouse
- **Recurring Todos** - Repeat daily/weekly/monthly
- **Subtasks** - Break down todos into smaller steps
- **Heat Map Calendar** - Visualize productivity over time

### Technical Improvements

- **Component Refactoring** - Split App.tsx into smaller components
- **Custom Hooks** - Extract logic (useTodos, useLocalStorage)
- **Context API** - Global state management
- **React Router** - Multi-page navigation
- **Testing** - Unit tests with Vitest, component tests with Testing Library
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Performance** - Memoization, virtualization for large lists
- **PWA** - Offline support, installable app
- **Backend Integration** - API for syncing across devices

## Recommended VS Code Extensions

When you open this project, VS Code will prompt you to install these extensions:

- **ESLint** - Real-time linting feedback
- **Prettier** - Code formatting
- **Error Lens** - Shows errors inline in code
- **GitLens** - Enhanced git features
- **Better Comments** - Syntax highlighting for comment annotations
- **Path IntelliSense** - Autocomplete file paths
- **TypeScript** - Enhanced TypeScript support

## Troubleshooting

### Commit Hooks Failing

If commits are blocked by hooks:

1. **Check ESLint errors**: `npm run lint`
2. **Fix errors**: `npm run lint:fix`
3. **Check formatting**: `npm run format`
4. **Verify commit message**: Must follow conventional format

To skip hooks (not recommended):

```bash
git commit --no-verify -m "message"
```

### TypeScript Errors

Run type checking:

```bash
npm run type-check
```

Common issues:

- Missing `.js` extension on imports (required for ES modules)
- Optional properties set to `undefined` instead of omitted
- Type mismatches in controlled component values

### Port Already in Use

If port 5173 is occupied:

```bash
npm run dev -- --port 3000
```

Or kill the process using port 5173.

## Learning Resources

This project demonstrates patterns from:

- **React Docs**: react.dev
- **TypeScript Handbook**: typescriptlang.org/docs
- **Temporal API**: tc39.es/proposal-temporal
- **Conventional Commits**: conventionalcommits.org
- **CSS Glass Morphism**: various tutorials and examples

## License

ISC

## Author

Built by Terrence Naldoza as a learning project to explore React, TypeScript, and modern web development practices.

---

**Note**: This README is designed to serve as a template for learning. Feel free to use this project structure and workflow as a starting point for your own React applications.
