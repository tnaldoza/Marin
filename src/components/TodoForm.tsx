import { type ReactElement, useState } from "react";
import type { Todo, TodoFormData, Priority } from "../types/index.js";
import { Temporal } from "@js-temporal/polyfill";

interface TodoFormProps {
	onAddTodo: (newTodo: Todo) => void;
	nextId: number;
}

export function TodoForm({ onAddTodo, nextId }: TodoFormProps): ReactElement {
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

		onAddTodo(newTodo);

		setFormData({
			title: "",
			notes: "",
			priority: 3,
			dateDue: "",
		});
	};

	return (
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
	);
}
