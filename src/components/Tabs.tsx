import type { ViewTab } from "../types/index.js";
import type { ReactElement } from "react";

interface TabsProps {
	activeTab: ViewTab;
	onTabChange: (tab: ViewTab) => void;
	todosCount: number;
	historyCount: number;
}

export function Tabs({ activeTab, onTabChange, todosCount, historyCount }: TabsProps): ReactElement {
	return (
		<div className="tabs">
			<button
				className={activeTab === "todos" ? "tab active" : "tab"}
				onClick={() => {
					onTabChange("todos");
				}}>
				Todos ({todosCount})
			</button>
			<button
				className={activeTab === "history" ? "tab active" : "tab"}
				onClick={() => {
					onTabChange("history");
				}}>
				History ({historyCount})
			</button>
		</div>
	);
}
