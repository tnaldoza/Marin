import { useState, useEffect, type ReactElement } from "react";
import type { Todo, SortOption, ViewTab, Priority } from "../types/index.js";
import { TodoItem, TodoForm, Tabs, Toolbar } from "../components/index.js";
import { Temporal } from "@js-temporal/polyfill";

interface StoredTodo {
	id: number;
	title: string;
	notes?: string;
	priority: Priority;
	dateAdded: string;
	dateDue?: string;
	dateCompleted?: string;
	dateDeleted?: string;
}

export function TodoApp(): ReactElement {
	const [toDoList, setToDoList] = useState<Todo[]>(() => {
		const stored = localStorage.getItem("marin-todos");

		if (stored === null) {
			return [];
		}

		try {
			const parsed: unknown = JSON.parse(stored);

			if (!Array.isArray(parsed)) {
				console.warn("Invalid data in localStorage: not an array");
				return [];
			}

			const todos = parsed as StoredTodo[];

			return todos.map(
				(todo): Todo => ({
					id: todo.id,
					title: todo.title,
					...(todo.notes !== undefined && todo.notes !== "" && { notes: todo.notes }),
					priority: todo.priority,
					dateAdded: Temporal.Instant.from(todo.dateAdded),
					...(todo.dateDue !== undefined && { dateDue: Temporal.PlainDateTime.from(todo.dateDue) }),
					...(todo.dateCompleted !== undefined && { dateCompleted: Temporal.Instant.from(todo.dateCompleted) }),
					...(todo.dateDeleted !== undefined && { dateDeleted: Temporal.Instant.from(todo.dateDeleted) }),
				})
			);
		} catch (error) {
			console.error("Failed to load todos from local storage:", error);
			return [];
		}
	});
	const [nextId, setNextId] = useState<number>(() => {
		const stored = localStorage.getItem("marin-nextId");
		return stored === null ? 1 : Number(stored);
	});
	const [sortBy, setSortBy] = useState<SortOption>("dateDue");
	const [activeTab, setActiveTab] = useState<ViewTab>("todos");

	// Save todos to localStorage whenever they change
	useEffect(() => {
		try {
			// Convert Temporal objects to strings for storage
			const serializable = toDoList.map((todo) => ({
				...todo,
				dateAdded: todo.dateAdded.toString(),
				dateDue: todo.dateDue?.toString(),
				dateCompleted: todo.dateCompleted?.toString(),
				dateDeleted: todo.dateDeleted?.toString(),
			}));

			localStorage.setItem("marin-todos", JSON.stringify(serializable));
		} catch (error) {
			console.error("Failed to save todos to localStorage:", error);
		}
	}, [toDoList]); // Run this effect whenever toDoList changes

	// Save nextId to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("marin-nextId", String(nextId));
	}, [nextId]);

	const deleteTodo = (todoId: number): void => {
		const todoToDelete = toDoList.find((todo) => todo.id === todoId);
		if (!todoToDelete) return;
		if (window.confirm(`Delete "${todoToDelete.title}"?`)) {
			setToDoList(toDoList.map((todo) => (todo.id === todoId ? { ...todo, dateDeleted: Temporal.Now.instant() } : todo)));
		}
	};

	const deleteCompleted = (): void => {
		const completedCount = toDoList.filter((todo) => todo.dateCompleted !== undefined && todo.dateDeleted === undefined).length;

		if (completedCount === 0) {
			alert("No completed todos to delete!");
			return;
		}

		if (window.confirm(`Delete ${String(completedCount)} completed todo(s)?`)) {
			setToDoList(
				toDoList.map((todo) =>
					todo.dateCompleted !== undefined && todo.dateDeleted === undefined ? { ...todo, dateDeleted: Temporal.Now.instant() } : todo
				)
			);
		}
	};

	const getActiveTodos = (): Todo[] => {
		return toDoList.filter((todo) => !todo.dateDeleted);
	};

	const getAllTodos = (): Todo[] => {
		return toDoList;
	};

	const getSortedTodos = (): Todo[] => {
		const todosToSort = activeTab === "todos" ? getActiveTodos() : getAllTodos();
		const sorted = [...todosToSort];

		switch (sortBy) {
			case "dateDue":
				return sorted.sort((a, b) => {
					if (!a.dateDue && !b.dateDue) return 0;
					if (!a.dateDue) return 1;
					if (!b.dateDue) return -1;
					return Temporal.PlainDateTime.compare(a.dateDue, b.dateDue);
				});
			case "dateAdded":
				return sorted.sort((a, b) => {
					return Temporal.Instant.compare(b.dateAdded, a.dateAdded);
				});
			case "priority":
				return sorted.sort((a, b) => {
					return b.priority - a.priority;
				});
			case "title":
				return sorted.sort((a, b) => {
					return a.title.localeCompare(b.title);
				});
			default:
				return sorted;
		}
	};

	const handleAddTodo = (newTodo: Todo): void => {
		setToDoList([...toDoList, newTodo]);
		setNextId(nextId + 1);
	};

	const toggleComplete = (todoId: number): void => {
		setToDoList(
			toDoList.map((todo) => {
				if (todo.id !== todoId) return todo;

				if (todo.dateCompleted) {
					const { dateCompleted: _, ...rest } = todo;
					return rest;
				}

				return { ...todo, dateCompleted: Temporal.Now.instant() };
			})
		);
	};

	return (
		<div className="page todo-page">
			<header className="page-header">
				<h1>Marin Todo App</h1>
				<p>Manage your tasks with priorities and due dates</p>
			</header>

			<main className="todo-main">
				<TodoForm onAddTodo={handleAddTodo} nextId={nextId} />

				<Tabs activeTab={activeTab} onTabChange={setActiveTab} todosCount={getActiveTodos().length} historyCount={getAllTodos().length} />

				<Toolbar sortBy={sortBy} onSortChange={setSortBy} activeTab={activeTab} onClearCompleted={deleteCompleted} />

				<div className="todo-cards">
					{getSortedTodos().map((todo) => (
						<TodoItem key={todo.id} todo={todo} onToggleComplete={toggleComplete} onDelete={deleteTodo} showControls={activeTab === "todos"} />
					))}
				</div>
			</main>
		</div>
	);
}
