import type { Todo } from "../types/todo.js";
import type { ReactElement } from "react";
import type { Temporal } from "@js-temporal/polyfill";

interface TodoItemProps {
	todo: Todo;
	onToggleComplete: (id: number) => void;
	onDelete: (id: number) => void;
	showControls: boolean;
}

export function TodoItem({ todo, onToggleComplete, onDelete, showControls }: TodoItemProps): ReactElement {
	const renderStars = (): string => {
		return "★".repeat(todo.priority) + "☆".repeat(5 - todo.priority);
	};

	const formatInstant = (instant: Temporal.Instant): string => {
		return instant.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	const formatDateTime = (dateTime: Temporal.PlainDateTime): string => {
		return dateTime.toLocaleString("en-us", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	return (
		<div className="todo-card">
			<div className="todo-header">
				<h3 className={todo.dateCompleted ? "completed" : ""}>{todo.title}</h3>
				<span className="priority-stars">{renderStars()}</span>
			</div>

			{Boolean(todo.notes) && <p className="notes">{todo.notes}</p>}

			<div className="todo-meta">
				<span>Added: {formatInstant(todo.dateAdded)}</span>
				{todo.dateDue && <span>Due: {formatDateTime(todo.dateDue)}</span>}
				{todo.dateCompleted && <span className="completed-date">Completed: {formatInstant(todo.dateCompleted)}</span>}
				{todo.dateDeleted && <span className="deleted-date">Deleted: {formatInstant(todo.dateDeleted)}</span>}
			</div>
			{showControls && (
				<div className="todo-controls">
					<input
						type="checkbox"
						checked={todo.dateCompleted !== undefined}
						onChange={() => {
							onToggleComplete(todo.id);
						}}
					/>
					<button
						className="btn btn-danger"
						onClick={() => {
							onDelete(todo.id);
						}}>
						🗑️ Delete
					</button>
				</div>
			)}
		</div>
	);
}
