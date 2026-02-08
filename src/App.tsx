import { useState, type ReactElement } from "react";
import type { Todo, TodoFormData, Priority, SortOption, ViewTab } from "./types/index.js";
import { Temporal } from "@js-temporal/polyfill";
import "./App.css";

function App(): ReactElement {
	const [toDoList, setToDoList] = useState<Todo[]>([]);
	const [nextId, setNextId] = useState(1);
	const [sortBy, setSortBy] = useState<SortOption>("dateDue");
	const [activeTab, setActiveTab] = useState<ViewTab>("todos");

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
	const [formData, setFormData] = useState<TodoFormData>({
		title: "",
		notes: "",
		priority: 3,
		dateDue: "",
	});

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (!formData.title.trim()) {
			return;
		}
		const normalizedDateDue = formData.dateDue ? Temporal.PlainDateTime.from(formData.dateDue) : undefined;
		const dateAdded = Temporal.Now.instant();
		const newTodo: Todo = {
			id: nextId,
			title: formData.title,
			priority: formData.priority,
			dateAdded: dateAdded,
			...(formData.notes && { notes: formData.notes }),
			...(normalizedDateDue && { dateDue: normalizedDateDue }),
		};

		setToDoList([...toDoList, newTodo]);
		setNextId(nextId + 1);
		setFormData({
			title: "",
			notes: "",
			priority: 3,
			dateDue: "",
		});
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
		<div className="app">
			<header className="app-header">
				<h1>Marin Todo App</h1>
				<p>Your TypeScript + React Learning Project</p>
			</header>

			<main className="app-main">
				<div className="counter-section">
					<h2>To Do List:</h2>
					<div>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								value={formData.title}
								onChange={(e) => {
									setFormData({ ...formData, title: e.target.value });
								}}
							/>
							<input
								type="datetime-local"
								value={formData.dateDue}
								onChange={(e) => {
									setFormData({ ...formData, dateDue: e.target.value });
								}}
							/>
							<select
								value={formData.priority}
								onChange={(e) => {
									setFormData({ ...formData, priority: Number(e.target.value) as Priority });
								}}>
								<option value={1}>1 - Low</option>
								<option value={2}>2</option>
								<option value={3}>3 - Medium</option>
								<option value={4}>4</option>
								<option value={5}>5 - High</option>
							</select>
							<textarea
								value={formData.notes}
								onChange={(e) => {
									setFormData({ ...formData, notes: e.target.value });
								}}
							/>
							<button type="submit" className="btn btn-primary">
								Add Todo
							</button>
						</form>
					</div>
					<div className="tabs">
						<button
							className={activeTab === "todos" ? "tab active" : "tab"}
							onClick={() => {
								setActiveTab("todos");
							}}>
							Todos ({getActiveTodos().length})
						</button>
						<button
							className={activeTab === "history" ? "tab active" : "tab"}
							onClick={() => {
								setActiveTab("history");
							}}>
							History ({getAllTodos().length})
						</button>
					</div>
					<div className="todo-toolbar">
						<label>
							Sort by:
							<select
								value={sortBy}
								onChange={(e) => {
									setSortBy(e.target.value as SortOption);
								}}>
								<option value="dateAdded">Date Added (Newest)</option>
								<option value="dateDue">Due Date (Soonest)</option>
								<option value="priority">Priority (Highest)</option>
								<option value="title">Title (A-Z)</option>
							</select>
						</label>

						{activeTab === "todos" && (
							<button className="btn btn-danger" onClick={deleteCompleted}>
								🗑️ Clear Completed
							</button>
						)}
					</div>
					<h2>To Do:</h2>
					<div className="todo-cards">
						{getSortedTodos().map((todo) => (
							<div key={todo.id} className="todo-card">
								<h3
									style={{
										textDecoration: todo.dateCompleted ? "line-through" : "none",
									}}>
									{todo.title}
									{todo.dateDeleted && <span className="deleted-badge"> (Deleted)</span>}
								</h3>

								<div className="priority">
									{Array.from({ length: 5 }).map((_, i) => (
										<span key={i}>{i < todo.priority ? "⭐" : "☆"}</span>
									))}
								</div>

								{Boolean(todo.notes) && <p className="notes">{todo.notes}</p>}

								{todo.dateDue && <p className="due-date">Due: {todo.dateDue.toLocaleString()}</p>}

								<p className="date-added">Added: {todo.dateAdded.toLocaleString()}</p>

								{todo.dateCompleted && <p className="completed-date">✓ Completed: {todo.dateCompleted.toLocaleString()}</p>}
								{todo.dateDeleted && <p className="deleted-date">🗑️ Deleted: {todo.dateDeleted.toLocaleString()}</p>}

								{activeTab === "todos" && (
									<>
										<input
											type="checkbox"
											checked={!!todo.dateCompleted}
											onChange={() => {
												toggleComplete(todo.id);
											}}
										/>
										<button
											className="btn btn-danger"
											onClick={() => {
												deleteTodo(todo.id);
											}}>
											🗑️ Delete
										</button>
									</>
								)}
							</div>
						))}
					</div>
				</div>
				<div className="info-section">
					<h2>Getting Started</h2>
					<ul>
						<li>
							Edit <code>src/App.tsx</code> to start building your todo app
						</li>
						<li>Hot reload is enabled - changes appear instantly</li>
						<li>All code is type-checked and linted automatically</li>
					</ul>
				</div>
			</main>
		</div>
	);
}

export default App;
