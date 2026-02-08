import { Link } from "react-router-dom";
import type { ReactElement } from "react";

export function Home(): ReactElement {
	return (
		<div className="page home-page">
			<header className="page-header">
				<h1>Marin Todo App</h1>
				<p>A TypeScript + React Learning Project</p>
			</header>
			<section className="features">
				<div className="feature-card">
					<h2>Todo App</h2>
					<p>Manage your tasks with priorities, due dates, and notes</p>
					<Link to="/todos" className="btn btn-primary">
						Go to Todos
					</Link>
				</div>
				<div className="feature-card">
					<h2>Learn React</h2>
					<p>Built to learn React fundamentals, Typescript, and modern web development</p>
				</div>
				<div className="feature-card">
					<h2>Glass Morphism</h2>
					<p>Beautiful dark theme with frosted glass effects and smooth animations</p>
				</div>
			</section>
		</div>
	);
}
