import type { ReactElement } from "react";
import type { SortOption, ViewTab } from "../types/index.js";

interface ToolbarProps {
	sortBy: SortOption;
	onSortChange: (option: SortOption) => void;
	activeTab: ViewTab;
	onClearCompleted: () => void;
}

export function Toolbar({ sortBy, onSortChange, activeTab, onClearCompleted }: ToolbarProps): ReactElement {
	return (
		<div className="todo-toolbar">
			<label>
				Sort by:
				<select
					value={sortBy}
					onChange={(e) => {
						onSortChange(e.target.value as SortOption);
					}}>
					<option value="dateAdded">Date Added (Newest)</option>
					<option value="dateDue">Due Date (Soonest)</option>
					<option value="priority">Priority (Highest)</option>
					<option value="title">Title (A-Z)</option>
				</select>
			</label>

			{activeTab === "todos" && (
				<button className="btn btn-danger" onClick={onClearCompleted}>
					🗑️ Clear Completed
				</button>
			)}
		</div>
	);
}
